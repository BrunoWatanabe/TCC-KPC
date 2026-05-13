# Launcher (Backend + Frontend)

> Guia rápido para iniciar o stack KPC (backend + frontend) localmente ou via Docker.

Localização dos scripts: [launcher/](launcher)

Principais scripts
- `launcher/start.sh` — Orquestrador geral (um terminal): `local` ou `docker`.
- `launcher/start-dual-terminal.sh` — Abre 2 terminais (backend + frontend).
- `launcher/status.sh` — Exibe estado atual (processos + containers).
- `launcher/stop.sh` — Para todos os processos/containers do stack.

Como funciona
- Modo local: o `start.sh local` faz `stop_all`, sobe o backend (local) e, quando a porta estiver pronta, sobe o frontend.
- Modo Docker: o `start.sh docker` sobe imagens Docker do backend e frontend. Quando orquestrado pelo launcher geral, o backend é iniciado em modo detached para permitir que o frontend suba em seguida.
- `start-dual-terminal.sh` abre duas janelas de terminal (se suportado) — ideal para visualizar logs independentes.

Exemplos de uso

1) Start em um único terminal (local):

```bash
bash launcher/start.sh local
```

2) Start em um único terminal (docker):

```bash
bash launcher/start.sh docker
```

3) Start em dois terminais (local):

```bash
bash launcher/start-dual-terminal.sh local
```

4) Start em dois terminais (docker):

```bash
bash launcher/start-dual-terminal.sh docker
```

Status e parada

```bash
bash launcher/status.sh   # Verifica execução local e containers
bash launcher/stop.sh     # Encerra tudo (processos e containers)
```

Variáveis de ambiente úteis
- `KPC_BACKEND_PORT` — porta do backend (padrão 3132)
- `KPC_FRONTEND_PORT` — porta do frontend (padrão 5174)
- `KPC_SKIP_INITIAL_STOP=1` — usado internamente para evitar que sub-launchers façam `stop_all` quando orquestrados pela raiz
- `KPC_DOCKER_DETACHED=1` — força backend Docker a rodar em detached (usado pelo launcher geral)

Logs e diagnóstico
- Logs do backend (quando em Docker): `docker logs kpc-backend-launcher`
- Logs do frontend (quando em Docker): `docker logs kpc-frontend-launcher`
- Ver containers: `docker ps --filter 'name=kpc-'`
- Se porta estiver em uso: verifique com `lsof -i :<porta>` ou `ss -ltnp` e finalize processos que não pertençam ao KPC.

Notas e recomendações
- O launcher tenta proteger contra processos residuais (faz `stop_all` antes de subir). Se você preferir manter serviços rodando, use `KPC_SKIP_INITIAL_STOP=1` ao chamar os scripts diretamente.
- Para o script `start-dual-terminal.sh` funcionar automaticamente, tenha instalado um dos terminais suportados: `gnome-terminal`, `konsole`, `xterm`, `alacritty`, `kitty` ou `terminator`.
- Em ambientes CI ou servidores sem GUI, prefira `start.sh docker` com containers gerenciados por `docker-compose` ou orquestrador externo.

Problemas comuns
- Backend sobe mas frontend não: em Docker, verifique se o backend foi iniciado em detached (launcher geral faz isso automaticamente). Caso rode manualmente, inicie o backend com `-d` ou abra terminal separado para o frontend.
- Permissão negada ao executar sub-scripts: os launchers chamam os sub-scripts via `bash` quando necessário, então não é obrigatório marcar os arquivos como executáveis, mas é recomendado `chmod +x` para conveniência.

Se quiser, eu adiciono atalhos no `package.json` do frontend/backend para chamar os scripts (`npm run launcher:local`, etc.).

----
Arquivo gerado automaticamente pelo assistente — ajuste conforme sua preferência.
