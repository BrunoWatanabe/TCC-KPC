#!/usr/bin/env bash

set -euo pipefail

LAUNCHER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$LAUNCHER_DIR/.." && pwd)"
NODE_MODULES_DIR="$PROJECT_ROOT/node_modules"
BOOTSTRAP_STAMP="$NODE_MODULES_DIR/.kpc-bootstrap-stamp"
LOCAL_PORT="${KPC_PORT:-5174}"
STORYBOOK_PORT="${KPC_STORYBOOK_PORT:-6006}"
LOCAL_HOST="${KPC_LOCAL_HOST:-127.0.0.1}"
DOCKER_IMAGE_TAG="${KPC_DOCKER_IMAGE:-kpc-frontend-launcher:latest}"
DOCKER_CONTAINER_NAME="${KPC_DOCKER_CONTAINER:-kpc-frontend-launcher}"

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

ensure_dependencies() {
    require_command node
    require_command npm

    if [[ ! -f "$PROJECT_ROOT/package-lock.json" ]]; then
        die "Arquivo package-lock.json nao encontrado."
    fi

    if [[ ! -f "$BOOTSTRAP_STAMP" ]] || [[ "$PROJECT_ROOT/package.json" -nt "$BOOTSTRAP_STAMP" ]] || [[ "$PROJECT_ROOT/package-lock.json" -nt "$BOOTSTRAP_STAMP" ]]; then
        log "Instalando dependencias do frontend."
        (cd "$PROJECT_ROOT" && npm ci --no-audit --no-fund)
        mkdir -p "$NODE_MODULES_DIR"
        touch "$BOOTSTRAP_STAMP"
    fi
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

process_matches_launcher() {
    local pid="$1"
    local args

    args="$(ps -p "$pid" -o args= 2>/dev/null || true)"
    [[ "$args" == *"vite.mvvm.config.js"* ]] || [[ "$args" == *"storybook dev"* ]] || [[ "$args" == *"npm run dev:mvvm"* ]] || [[ "$args" == *"npm run storybook"* ]]
}

ensure_local_port_free() {
    local pids
    local pid

    pids="$(list_port_pids "$LOCAL_PORT")"
    [[ -n "$pids" ]] || return 0

    while read -r pid; do
        [[ -n "$pid" ]] || continue
        if process_matches_launcher "$pid"; then
            warn "Encerrando processo antigo do frontend na porta ${LOCAL_PORT}: PID ${pid}."
            kill "$pid" 2>/dev/null || true
        else
            die "A porta ${LOCAL_PORT} ja esta em uso por outro processo: PID ${pid}."
        fi
    done <<< "$pids"
}

run_local_app() {
    ensure_dependencies
    ensure_local_port_free

    log "Iniciando frontend em modo local na porta ${LOCAL_PORT}."
    cd "$PROJECT_ROOT"
    exec env \
        KPC_HOST="$LOCAL_HOST" \
        KPC_PORT="$LOCAL_PORT" \
        npm run dev:mvvm -- --host "$LOCAL_HOST" --port "$LOCAL_PORT" --strictPort
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
    check_docker_runtime
    build_docker_image

    log "Iniciando frontend via Docker na porta ${LOCAL_PORT}."
    exec docker run --rm \
        --name "$DOCKER_CONTAINER_NAME" \
        -p "${LOCAL_PORT}:${LOCAL_PORT}" \
        -e CI="1" \
        -e BROWSER="none" \
        -e KPC_HOST="0.0.0.0" \
        -e KPC_PORT="$LOCAL_PORT" \
        "$DOCKER_IMAGE_TAG"
}

show_status() {
    local local_pid
    local storybook_pid
    local docker_pid

    local_pid="$(pgrep -f 'vite.mvvm.config.js|npm run dev:mvvm' || true)"
    storybook_pid="$(pgrep -f 'storybook dev|npm run storybook' || true)"
    if command -v docker >/dev/null 2>&1; then
        docker_pid="$(docker ps --filter "name=${DOCKER_CONTAINER_NAME}" --format '{{.ID}}' 2>/dev/null || true)"
    else
        docker_pid=""
    fi

    if [[ -n "$local_pid" ]]; then
        log "[RUNNING] Vite/Dev PID: $local_pid"
    else
        log "[STOPPED] Vite/Dev not running"
    fi

    if [[ -n "$storybook_pid" ]]; then
        log "[RUNNING] Storybook PID: $storybook_pid"
    else
        log "[STOPPED] Storybook not running"
    fi

    if [[ -n "$docker_pid" ]]; then
        log "[RUNNING] Docker container: $docker_pid"
    else
        log "[STOPPED] Docker container not running"
    fi
}

stop_all() {
    local pids
    local pid

    pids="$(pgrep -f 'vite.mvvm.config.js|npm run dev:mvvm|storybook dev|npm run storybook' || true)"
    if [[ -n "$pids" ]]; then
        while read -r pid; do
            [[ -n "$pid" ]] || continue
            kill "$pid" 2>/dev/null || true
        done <<< "$pids"
    fi

    if command -v docker >/dev/null 2>&1 && docker ps --filter "name=${DOCKER_CONTAINER_NAME}" --format '{{.ID}}' | grep -q .; then
        docker stop "$DOCKER_CONTAINER_NAME" >/dev/null
    fi
}