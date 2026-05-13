#!/usr/bin/env bash

set -euo pipefail

LAUNCHER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$LAUNCHER_DIR/.." && pwd)"
BACKEND_LAUNCHER="$PROJECT_ROOT/kpc-backend/launcher"
FRONTEND_LAUNCHER="$PROJECT_ROOT/kpc-frontend/launcher"

log() {
    printf '%s\n' "$*"
}

die() {
    printf 'Erro: %s\n' "$*" >&2
    exit 1
}

find_terminal() {
    local term

    for term in gnome-terminal konsole xterm alacritty kitty terminator; do
        if command -v "$term" >/dev/null 2>&1; then
            echo "$term"
            return 0
        fi
    done

    return 1
}

open_terminal_with_command() {
    local terminal="$1"
    local title="$2"
    local command="$3"

    case "$terminal" in
        gnome-terminal)
            gnome-terminal -- bash -c "cd '$PROJECT_ROOT' && $command; bash" &
            ;;
        konsole)
            konsole --title "$title" -e bash -c "cd '$PROJECT_ROOT' && $command; bash" &
            ;;
        xterm)
            xterm -title "$title" -e bash -c "cd '$PROJECT_ROOT' && $command; bash" &
            ;;
        alacritty)
            alacritty --title "$title" -e bash -c "cd '$PROJECT_ROOT' && $command; bash" &
            ;;
        kitty)
            kitty --title "$title" bash -c "cd '$PROJECT_ROOT' && $command; bash" &
            ;;
        terminator)
            terminator --title "$title" -c "cd '$PROJECT_ROOT' && $command; bash" &
            ;;
        *)
            return 1
            ;;
    esac
}

show_menu() {
    printf '\n'
    printf 'KPC Launcher Geral - Dual Terminal\n'
    printf '1) Bootstrap local\n'
    printf '2) Docker\n'
    printf '3) Sair\n'
    printf 'Escolha uma opcao: '
}

mode="${1:-}"

case "$mode" in
    local|bootstrap)
        mode="local"
        ;;
    docker)
        ;;
    "")
        while true; do
            show_menu
            read -r choice
            case "$choice" in
                1)
                    mode="local"
                    break
                    ;;
                2)
                    mode="docker"
                    break
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

terminal="$(find_terminal)" || die "Nenhum terminal compativel encontrado. Instale gnome-terminal, konsole, xterm ou alacritty."

log "Abrindo duas terminais em modo ${mode}..."

backend_cmd="bash '$BACKEND_LAUNCHER/start.sh' '$mode'"
frontend_cmd="bash '$FRONTEND_LAUNCHER/start.sh' '$mode'"

open_terminal_with_command "$terminal" "KPC Backend ($mode)" "$backend_cmd"
sleep 1
open_terminal_with_command "$terminal" "KPC Frontend ($mode)" "$frontend_cmd"

log "Dois terminais abertos. Backend e frontend em execucao."
