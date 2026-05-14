# TCC-KPC — Visão geral e instruções de inicialização

Este repositório agrupa o Spec-Kit (framework de especificação/agents) e a plataforma Keyphrase Curation (frontend + backend). Abaixo há um README único e consolidado na raiz que explica cada pasta importante e como iniciar o frontend e o backend (manual e via scripts). READMEs específicos das subpastas permanecem onde existem e estão linkados.

**Sumário**

1. [Visão geral](#1-visao-geral)
2. [Tutorial de inicialização](#2-tutorial-de-inicializacao)
  2.1 [Backend — manual](#21-backend-manual)
  2.2 [Backend — via scripts / Docker](#22-backend-scripts)
  2.3 [Frontend — manual](#23-frontend-manual)
  2.4 [Frontend — via scripts / Docker](#24-frontend-scripts)
3. [Estrutura do repositório](#3-estrutura-do-repositorio)
  3.1 [kpc-backend](#31-kpc-backend)
  3.2 [kpc-frontend](#32-kpc-frontend)
  3.3 [kpc-spec-kit](#33-kpc-spec-kit)
  3.4 [launcher (raiz)](#34-launcher)
  3.5 [outros diretórios importantes](#35-outros)
4. [Links e READMEs das subpastas](#4-links-readmes)
5. [Contribuição e notas rápidas](#5-contribuicao)

---

<a name="1-visao-geral"></a>
## 1. Visão geral

O repositório contém:

- `kpc-backend/`: backend Python (extração, anotações, embeddings, API).
- `kpc-frontend/`: frontend MVVM (React/Vite) + Storybook.
- `kpc-spec-kit/`: framework de especificações, agentes e templates (SDD/MDE).
- `launcher/` (raiz): scripts utilitários para orquestrar execução local ou via Docker (varre frontend/backend conforme modo).

As documentações detalhadas de cada componente estão nos READMEs locais das pastas listadas abaixo; neste README você tem um resumo e os passos principais de inicialização.

---

<a name="2-tutorial-de-inicializacao"></a>
## 2. Tutorial de inicialização

Observação: alguns diretórios fornecem scripts (`launcher/start.sh`, `launcher/status.sh`, `launcher/stop.sh`) para facilitar a inicialização local e em Docker. Nos exemplos abaixo, os caminhos assumem que você está na raiz do repositório.

<a name="21-backend-manual"></a>
### 2.1 Backend — manual

Pré-requisitos: Python 3.9+, `pip`, `git` e (opcional) Docker.

```bash
cd kpc-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# (opcional) instalar em modo editável
pip install -e .

# Copiar arquivos de configuração e ajustar
cp .env.template .env
cd dataset
cp attributions.template.toml attributions.toml
# inicializar submódulos, se necessário
git submodule update --init --recursive
```

Executar (modo manual depende do ponto de entrada disponível — o `launcher/` oferece fluxos padronizados):

```bash
# se existir um run.py ou similar
python run.py
# ou usar o launcher local (recomendado para fluxos definidos)
bash launcher/start.sh local
```

<a name="22-backend-scripts"></a>
### 2.2 Backend — via scripts / Docker

Use os scripts em `kpc-backend/launcher/`:

```bash
cd kpc-backend
bash launcher/start.sh local    # roda localmente
bash launcher/start.sh docker   # prepara e roda via Docker
bash launcher/status.sh         # checa status
bash launcher/stop.sh           # para execução
```

O modo `docker` do launcher valida Docker e prepara arquivos de ambiente.

---

<a name="23-frontend-manual"></a>
### 2.3 Frontend — manual

Pré-requisitos: `node` (>=16/18), `npm` ou `pnpm`.

```bash
cd kpc-frontend
npm install
npm run dev:mvvm     # sobe a aplicação MVVM (porta padrão 5174)

# abrir Storybook (opcional)
npm run storybook
```

Se precisar buildar/preview:

```bash
npm run build:mvvm
npm run preview:mvvm
```

<a name="24-frontend-scripts"></a>
### 2.4 Frontend — via scripts / Docker

Use o `launcher/` do frontend (na pasta `kpc-frontend/launcher`):

```bash
cd kpc-frontend
bash launcher/start.sh local
bash launcher/start.sh docker
bash launcher/status.sh
bash launcher/stop.sh

# ou via package.json helpers
npm run launcher:local
npm run launcher:docker
```

Resumo: o launcher trata bootstrap de dependências, checagem de portas e execução local ou em container.

---

<a name="3-estrutura-do-repositorio"></a>
## 3. Estrutura do repositório

<a name="31-kpc-backend"></a>
### 3.1 kpc-backend

- Função: lógica do servidor, extração de keyphrases, pipelines de anotação, embeddings e API.
- Onde ver documentação completa: [kpc-backend/README.md](kpc-backend/README.md)
- Principais arquivos/dirs: `dataset/`, `notebooks/`, `scripts/`, `src/`, `tests/`, `.env.template`, `requirements.txt`, `pyproject.toml`, `run.py`, `launcher/`.

<a name="32-kpc-frontend"></a>
### 3.2 kpc-frontend

- Função: interface MVVM em React (Vite) e biblioteca de componentes (Storybook).
- Documentação completa: [kpc-frontend/README.md](kpc-frontend/README.md)
- Principais itens: `src-mvvm/` (aplicação), `estilo_story/` (Storybook), `launcher/` (scripts), `vite.*.config.js`, `openapi.json`.

<a name="33-kpc-spec-kit"></a>
### 3.3 kpc-spec-kit

- Função: templates, agentes, documentação e governança para SDD/MDE e processos de especificação.
- Leia: [kpc-spec-kit/README.md](kpc-spec-kit/README.md) e [kpc-spec-kit/SPEC-KIT-README.md](kpc-spec-kit/SPEC-KIT-README.md)

<a name="34-launcher"></a>
### 3.4 launcher (raiz)

- Função: scripts utilitários que podem orquestrar execução de componentes do repositório (local ou Docker).
- Use para fluxos dual (frontend+backend) quando disponível.

<a name="35-outros"></a>
### 3.5 outros diretórios importantes

- `src-mvvm/`: código MVVM usado pelo frontend (link interno em `kpc-frontend`).
- `reactpy-material/` e `reactpy-material-akira/`: bibliotecas de componentes ReactPy usadas em partes do projeto.
- `kpc-spec-kit/docs/` e `kpc-spec-kit/.github/agents/`: documentação e agentes do framework.

---

<a name="4-links-readmes"></a>
## 4. Links e READMEs das subpastas

- Backend: [kpc-backend/README.md](kpc-backend/README.md)
- Frontend: [kpc-frontend/README.md](kpc-frontend/README.md)
- Spec-Kit: [kpc-spec-kit/README.md](kpc-spec-kit/README.md)
- Frontend Storybook: veja a pasta `kpc-frontend/estilo_story/` (não há README separado)
- Launcher (raiz): [launcher/README.md](launcher/README.md)

Observação: se uma subpasta tiver README com explicações mais detalhadas, abra o link correspondente — estes arquivos permanecem para documentação específica e não foram removidos.

---

<a name="5-contribuicao"></a>
## 5. Contribuição e notas rápidas

- Antes de contribuir, rode os testes e verifique o fluxo desejado (frontend ou backend).
- Não comite arquivos sensíveis como `.env` ou `dataset/attributions.toml` com dados privados.
- Para dúvidas sobre execução, abra uma issue ou consulte os READMEs locais linkados acima.

---
