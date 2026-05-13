#!/usr/bin/env bash

set -euo pipefail

LAUNCHER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$LAUNCHER_DIR/.." && pwd)"
VENV_DIR="$PROJECT_ROOT/venv"
VENV_PYTHON="$VENV_DIR/bin/python"
BOOTSTRAP_STAMP="$VENV_DIR/.kpc-bootstrap-stamp"
LOCAL_PORT="${KPC_PORT:-3132}"
DOCKER_IMAGE_TAG="${KPC_DOCKER_IMAGE:-kpc-backend-launcher:latest}"
DOCKER_CONTAINER_NAME="${KPC_DOCKER_CONTAINER:-kpc-backend-launcher}"

log() {
    printf '%s\n' "$*"
}

warn() {
    printf 'Aviso: %s\n' "$*" >&2
}

die() {
    printf 'Erro: %s\n' "$*" >&2
    exit 1
}

require_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        die "Comando '$1' nao encontrado."
    fi
}

has_command() {
    command -v "$1" >/dev/null 2>&1
}

ensure_secret_key() {
    local env_file="$1"

    if grep -Eq '^SECRET_KEY=(""|)$' "$env_file"; then
        local secret_key
        secret_key="$(python3 - <<'PY'
import secrets
print(secrets.token_urlsafe(48))
PY
)"

        python3 - "$env_file" "$secret_key" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
secret_key = sys.argv[2]
lines = path.read_text().splitlines()
updated = False
new_lines = []

for line in lines:
    if line.startswith('SECRET_KEY='):
        new_lines.append(f'SECRET_KEY="{secret_key}"')
        updated = True
    else:
        new_lines.append(line)

if not updated:
    new_lines.append(f'SECRET_KEY="{secret_key}"')

path.write_text('\n'.join(new_lines) + '\n')
PY

        warn "SECRET_KEY vazio; um novo valor foi gerado em .env."
    fi
}

ensure_env_files() {
    require_command python3

    if [[ ! -f "$PROJECT_ROOT/.env" ]]; then
        [[ -f "$PROJECT_ROOT/.env.template" ]] || die "Arquivo .env.template nao encontrado."
        cp "$PROJECT_ROOT/.env.template" "$PROJECT_ROOT/.env"
        warn "Arquivo .env criado a partir do template."
    fi

    ensure_secret_key "$PROJECT_ROOT/.env"

    if [[ ! -f "$PROJECT_ROOT/dataset/attributions.toml" ]]; then
        [[ -f "$PROJECT_ROOT/dataset/attributions.template.toml" ]] || die "Arquivo dataset/attributions.template.toml nao encontrado."
        cp "$PROJECT_ROOT/dataset/attributions.template.toml" "$PROJECT_ROOT/dataset/attributions.toml"
        warn "Arquivo dataset/attributions.toml criado a partir do template."
    fi
}

ensure_submodules() {
    require_command git

    if [[ ! -f "$PROJECT_ROOT/.gitmodules" ]]; then
        return 0
    fi

    log "Sincronizando e inicializando submodulos Git."
    (
        cd "$PROJECT_ROOT"
        git submodule sync --recursive
        git submodule update --init --recursive --force
    )
}

ensure_venv() {
    require_command python3

    python3 - <<'PY'
import sys
if sys.version_info < (3, 9):
    raise SystemExit('Python 3.9 ou superior e necessario.')
PY

    if [[ ! -x "$VENV_PYTHON" ]]; then
        log "Criando ambiente virtual em venv/."
        python3 -m venv "$VENV_DIR"
    fi
}

ensure_local_dependencies() {
    local needs_bootstrap=0

    if [[ ! -f "$BOOTSTRAP_STAMP" ]]; then
        needs_bootstrap=1
    elif [[ "$PROJECT_ROOT/requirements.txt" -nt "$BOOTSTRAP_STAMP" ]]; then
        needs_bootstrap=1
    elif [[ "$PROJECT_ROOT/pyproject.toml" -nt "$BOOTSTRAP_STAMP" ]]; then
        needs_bootstrap=1
    fi

    if [[ "$needs_bootstrap" -eq 1 ]]; then
        log "Instalando dependencias locais."
        "$VENV_PYTHON" -m pip install --upgrade pip setuptools wheel
        "$VENV_PYTHON" -m pip install -r "$PROJECT_ROOT/requirements.txt"

        if ! "$VENV_PYTHON" -m pip install -e "$PROJECT_ROOT/reactpy-material"; then
            warn "Falha ao instalar reactpy-material. Tentando sincronizar submodulos novamente."
            ensure_submodules
            "$VENV_PYTHON" -m pip install -e "$PROJECT_ROOT/reactpy-material"
        fi

        if ! "$VENV_PYTHON" -m pip install -e "$PROJECT_ROOT"; then
            warn "Instalacao editavel do projeto falhou; o PYTHONPATH sera usado como fallback."
        fi

        touch "$BOOTSTRAP_STAMP"
    fi
}

validate_local_runtime() {
    PYTHONPATH="$PROJECT_ROOT/src" "$VENV_PYTHON" - <<'PY'
import importlib

modules = ["numpy", "reactpy_material", "keyphrase_curation"]
for module_name in modules:
    importlib.import_module(module_name)
PY
}

list_port_pids() {
    local port="$1"

    if has_command lsof; then
        lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true
        return 0
    fi

    if has_command ss; then
        ss -ltnp "sport = :$port" 2>/dev/null | grep -o 'pid=[0-9]*' | cut -d= -f2 | sort -u || true
        return 0
    fi

    return 0
}

ensure_local_port_free() {
    local pids
    local pid
    local args

    pids="$(list_port_pids "$LOCAL_PORT")"
    [[ -n "$pids" ]] || return 0

    while read -r pid; do
        [[ -n "$pid" ]] || continue
        args="$(ps -p "$pid" -o args= 2>/dev/null || true)"
        if [[ "$args" == *"run.py"* || "$args" == *"uvicorn"* || "$args" == *"keyphrase_curation"* ]]; then
            warn "Encerrando processo antigo do backend na porta ${LOCAL_PORT}: PID ${pid}."
            kill "$pid" 2>/dev/null || true
        else
            die "A porta ${LOCAL_PORT} ja esta em uso por outro processo: PID ${pid}."
        fi
    done <<< "$pids"
}

run_local_app() {
    ensure_env_files
    ensure_submodules
    ensure_venv
    ensure_local_dependencies
    validate_local_runtime
    ensure_local_port_free

    log "Iniciando backend em modo local na porta ${LOCAL_PORT}."
    exec env \
        KPC_HOST="${KPC_LOCAL_HOST:-127.0.0.1}" \
        KPC_PORT="$LOCAL_PORT" \
        KPC_RELOAD="${KPC_RELOAD:-0}" \
        PYTHONPATH="$PROJECT_ROOT/src" \
        "$VENV_PYTHON" "$PROJECT_ROOT/run.py"
}

check_docker_runtime() {
    require_command docker
    if ! docker info >/dev/null 2>&1; then
        die "Docker esta instalado, mas o daemon nao esta ativo."
    fi
}

build_docker_image() {
    log "Montando imagem Docker ${DOCKER_IMAGE_TAG}."
    docker build \
        -f "$PROJECT_ROOT/launcher/Dockerfile" \
        -t "$DOCKER_IMAGE_TAG" \
        "$PROJECT_ROOT"
}

run_docker_app() {
    ensure_env_files
    ensure_submodules
    check_docker_runtime
    build_docker_image

    log "Iniciando backend via Docker na porta ${LOCAL_PORT}."
    if [[ "${KPC_DOCKER_DETACHED:-0}" == "1" ]]; then
        docker run -d --rm \
            --name "$DOCKER_CONTAINER_NAME" \
            -p "${LOCAL_PORT}:3132" \
            -e KPC_HOST="0.0.0.0" \
            -e KPC_PORT="3132" \
            -e KPC_RELOAD="0" \
            -v "$PROJECT_ROOT:/app" \
            "$DOCKER_IMAGE_TAG"
    else
        exec docker run --rm \
            --name "$DOCKER_CONTAINER_NAME" \
            -p "${LOCAL_PORT}:3132" \
            -e KPC_HOST="0.0.0.0" \
            -e KPC_PORT="3132" \
            -e KPC_RELOAD="0" \
            -v "$PROJECT_ROOT:/app" \
            "$DOCKER_IMAGE_TAG"
    fi
}

show_status() {
    local local_pid
    local uvicorn_pid
    local docker_pid

    local_pid="$(pgrep -f "$PROJECT_ROOT/run.py|keyphrase_curation.api.main" || true)"
    uvicorn_pid="$(pgrep -f "$VENV_DIR/bin/uvicorn" || true)"
    if command -v docker >/dev/null 2>&1; then
        docker_pid="$(docker ps --filter "name=${DOCKER_CONTAINER_NAME}" --format '{{.ID}}' 2>/dev/null || true)"
    else
        docker_pid=""
    fi

    if [[ -n "$local_pid" ]]; then
        log "[RUNNING] Run script PID: $local_pid"
    else
        log "[STOPPED] Run script not running"
    fi

    if [[ -n "$uvicorn_pid" ]]; then
        log "[RUNNING] Uvicorn PID: $uvicorn_pid"
    else
        log "[STOPPED] Uvicorn not running"
    fi

    if [[ -n "$docker_pid" ]]; then
        log "[RUNNING] Docker container: $docker_pid"
    else
        log "[STOPPED] Docker container not running"
    fi
}

stop_all() {
    local local_pid
    local uvicorn_pid

    local_pid="$(pgrep -f "$PROJECT_ROOT/run.py|keyphrase_curation.api.main" || true)"
    uvicorn_pid="$(pgrep -f "$VENV_DIR/bin/uvicorn" || true)"

    if [[ -n "$local_pid" ]]; then
        pkill -f "$PROJECT_ROOT/run.py|keyphrase_curation.api.main"
    fi

    if [[ -n "$uvicorn_pid" ]]; then
        pkill -f "$VENV_DIR/bin/uvicorn"
    fi

    if command -v docker >/dev/null 2>&1 && docker ps --filter "name=${DOCKER_CONTAINER_NAME}" --format '{{.ID}}' | grep -q .; then
        docker stop "$DOCKER_CONTAINER_NAME" >/dev/null
    fi
}
