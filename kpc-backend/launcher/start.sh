#!/usr/bin/env bash

set -euo pipefail

LAUNCHER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$LAUNCHER_DIR/common.sh"

show_menu() {
    printf '\n'
    printf 'KPC Backend Launcher\n'
    printf '1) Bootstrap local\n'
    printf '2) Docker\n'
    printf '3) Sair\n'
    printf 'Escolha uma opcao: '
}

case "${1:-}" in
    local|bootstrap)
        if [[ "${KPC_SKIP_INITIAL_STOP:-0}" != "1" ]]; then
            stop_all
        fi
        run_local_app
        ;;
    docker)
        if [[ "${KPC_SKIP_INITIAL_STOP:-0}" != "1" ]]; then
            stop_all
        fi
        run_docker_app
        ;;
    "")
        while true; do
            show_menu
            read -r choice
            case "$choice" in
                1)
                    run_local_app
                    ;;
                2)
                    run_docker_app
                    ;;
                3)
                    exit 0
                    ;;
                *)
                    printf 'Opcao invalida.\n' >&2
                    ;;
            esac
        done
        ;;
    *)
        printf 'Uso: %s [local|docker]\n' "$0" >&2
        exit 1
        ;;
esac
