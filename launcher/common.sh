#!/usr/bin/env bash

set -euo pipefail

LAUNCHER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$LAUNCHER_DIR/.." && pwd)"
BACKEND_LAUNCHER="$PROJECT_ROOT/kpc-backend/launcher"
FRONTEND_LAUNCHER="$PROJECT_ROOT/kpc-frontend/launcher"
BACKEND_START="$BACKEND_LAUNCHER/start.sh"
BACKEND_STATUS="$BACKEND_LAUNCHER/status.sh"
BACKEND_STOP="$BACKEND_LAUNCHER/stop.sh"
FRONTEND_START="$FRONTEND_LAUNCHER/start.sh"
FRONTEND_STATUS="$FRONTEND_LAUNCHER/status.sh"
FRONTEND_STOP="$FRONTEND_LAUNCHER/stop.sh"
BACKEND_PORT="${KPC_BACKEND_PORT:-3132}"
FRONTEND_PORT="${KPC_FRONTEND_PORT:-5174}"

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

port_is_listening() {
    local port="$1"

    [[ -n "$(list_port_pids "$port")" ]]
}

wait_for_port() {
    local port="$1"
    local label="$2"
    local monitored_pid="${3:-}"
    local timeout_seconds="${4:-120}"
    local elapsed=0

    while [[ "$elapsed" -lt "$timeout_seconds" ]]; do
        if [[ -n "$monitored_pid" ]] && ! kill -0 "$monitored_pid" 2>/dev/null; then
            die "$label encerrou antes de abrir a porta ${port}."
        fi

        if port_is_listening "$port"; then
            return 0
        fi

        sleep 1
        elapsed=$((elapsed + 1))
    done

    die "$label nao iniciou dentro de ${timeout_seconds}s."
}

stop_backend() {
    if [[ -f "$BACKEND_STOP" ]]; then
        bash "$BACKEND_STOP"
    fi
}

stop_frontend() {
    if [[ -f "$FRONTEND_STOP" ]]; then
        bash "$FRONTEND_STOP"
    fi
}

stop_all() {
    stop_backend
    stop_frontend
}

show_status() {
    log 'Backend:'
    bash "$BACKEND_STATUS"
    printf '\n'
    log 'Frontend:'
    bash "$FRONTEND_STATUS"
}

run_stack() {
    local mode="$1"
    local backend_pid

    case "$mode" in
        local|bootstrap|docker)
            ;;
        *)
            die "Modo invalido: $mode. Use local ou docker."
            ;;
    esac

    trap 'stop_all' EXIT INT TERM

    log "Preparando stack KPC em modo ${mode}."
    stop_all

    log 'Iniciando backend primeiro.'
    if [[ "$mode" == "docker" ]]; then
        KPC_SKIP_INITIAL_STOP=1 KPC_DOCKER_DETACHED=1 bash "$BACKEND_START" "$mode"
        wait_for_port "$BACKEND_PORT" 'Backend'
    else
        KPC_SKIP_INITIAL_STOP=1 bash "$BACKEND_START" "$mode" &
        backend_pid=$!
        wait_for_port "$BACKEND_PORT" 'Backend' "${backend_pid:-}"
    fi

    log 'Iniciando frontend em seguida.'
    KPC_SKIP_INITIAL_STOP=1 bash "$FRONTEND_START" "$mode"

    wait "$backend_pid" || true
}