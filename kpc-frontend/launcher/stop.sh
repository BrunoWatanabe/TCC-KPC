#!/usr/bin/env bash

set -euo pipefail

LAUNCHER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$LAUNCHER_DIR/common.sh"

stop_all