# TCC-KPC — Keyphrase Curation Platform

**Plataforma de curadoria de keyphrases com suporte a anotação colaborativa, clustering semântico e especificação orientada por modelos (Spec-Driven Development).**

Este repositório reúne o backend (API FastAPI), frontend (React + MVVM), o framework Spec-Kit (SDD/MDE) e toda a documentação de pesquisa do projeto de TCC.

---

## Sumário

- [Visão geral](#visão-geral)
- [Repositórios e READMEs](#repositórios-e-readmes)
- [Estrutura do repositório](#estrutura-do-repositório)
  - [`kpc-backend/` — Servidor e API](#kpc-backend--servidor-e-api)
  - [`kpc-frontend/` — Interface web](#kpc-frontend--interface-web)
  - [`spec-kit-main/` — Framework de especificação](#spec-kit-main--framework-de-especificação)
  - [`specs/` — Especificações das features](#specs--especificações-das-features)
  - [`documentacao-base/` — Pesquisa e relatórios](#documentacao-base--pesquisa-e-relatórios)
  - [Raiz do repositório](#raiz-do-repositório)
- [Inicialização rápida](#inicialização-rápida)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Segurança — checklist para publicação](#segurança--checklist-para-publicação)
- [Licença](#licença)

---

## Visão geral

O projeto KPC (Keyphrase Curation) é um sistema para **extração, clustering, anotação e curadoria de keyphrases** em textos argumentativos. Ele foi desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC) com foco em:

1. **Extração e geração** de keyphrases (KeyBERT, RAKE, YAKE, spaCy, LLMs)
2. **Embeddings semânticos** com Sentence-BERT
3. **Clustering** com múltiplos critérios de ordenação (coesão, similaridade por pares, centróide)
4. **Anotação colaborativa** entre múltiplos anotadores
5. **Adjudicação** para consolidação de anotações
6. **Desenvolvimento orientado por especificações** (Spec-Driven Development) usando o Spec-Kit

---

## Repositórios e READMEs

Cada componente possui seu próprio README detalhado:

| Componente | README | Descrição |
|-----------|--------|-----------|
| **Backend** | [`kpc-backend/README-KPC-BACKEND.md`](./kpc-backend/README-KPC-BACKEND.md) | API FastAPI, banco de dados, scripts, testes |
| **Frontend** | [`kpc-frontend/README-KPC-FRONTEND.md`](./kpc-frontend/README-KPC-FRONTEND.md) | Interface React MVVM, Storybook, componentes |
| **Spec-Kit** | [`spec-kit-main/README.md`](./spec-kit-main/README.md) | Framework SDD da GitHub |
| **Relatórios** | [`documentacao-base/relatorios/README.md`](./documentacao-base/relatorios/README.md) | Pesquisa, atas, fluxos |
| **Raiz** | **(este arquivo)** | Visão geral do repositório |

---

## Estrutura do repositório

```
TCC-KPC/
├── kpc-backend/                  # 🖥️ Backend (Python/FastAPI)
│   ├── src/keyphrase_curation/   #   Código-fonte principal
│   │   ├── api/                  #   Endpoints REST (FastAPI routers)
│   │   ├── controller/           #   Lógica de negócio
│   │   ├── model/                #   Modelos de domínio
│   │   ├── components/           #   Interface ReactPy
│   │   ├── view/                 #   Views legadas (Jupyter)
│   │   └── util/                 #   Utilitários (JWT, similaridade)
│   ├── dataset/                  #   Dados do projeto
│   │   ├── texts/                #   Textos fonte (8 tópicos)
│   │   ├── keyphrases/           #   Extraídas, geradas, embeddings
│   │   ├── annotations/          #   Anotações por usuário
│   │   └── scrapped/             #   Dados brutos scrappados
│   ├── scripts/                  #   Utilitários (extração, embeddings)
│   ├── notebooks/                #   Jupyter Notebooks
│   ├── tests/                    #   Testes automatizados
│   ├── launcher/                 #   Scripts de inicialização
│   ├── reactpy-material/         #   Submódulo ReactPy
│   └── README-KPC-BACKEND.md     #   Documentação do backend
│
├── kpc-frontend/                 # 🎨 Frontend (React/Vite)
│   ├── src-mvvm/                 #   Aplicação principal (MVVM)
│   │   ├── models/               #   Entidades, serviços, business
│   │   ├── viewmodels/           #   Stores (Zustand) e hooks
│   │   ├── views/                #   Páginas, layouts, componentes
│   │   └── shared/               #   Config, enums, constantes
│   ├── estilo_story/             #   Storybook e catálogo visual
│   ├── launcher/                 #   Scripts de inicialização
│   ├── docs/                     #   Documentação (arquitetura, plano)
│   └── README-KPC-FRONTEND.md    #   Documentação do frontend
│
├── spec-kit-main/                # 📋 Framework Spec-Kit (SDD)
│   ├── src/                      #   Código-fonte do framework
│   ├── templates/                #   Templates de especificação
│   ├── presets/                  #   Presets de configuração
│   ├── agents/                   #   Agentes de IA (ghost-agents)
│   ├── docs/                     #   Documentação oficial
│   └── README.md                 #   Documentação do Spec-Kit
│
├── specs/                        # 📐 Especificações das features
│   ├── 001-login-component/      #   Sprint 01 — Login MVVM
│   │   ├── spec.md               #   Especificação funcional
│   │   ├── plan.md               #   Plano de implementação
│   │   ├── tasks.md              #   Tarefas detalhadas
│   │   ├── model/                #   Diagramas PlantUML
│   │   ├── checklists/           #   Checklists de qualidade
│   │   ├── evidence/             #   Evidências de análise
│   │   └── verdict/              #   Vereditos
│   ├── 002-pairwise-similarity-fix/ # Sprint 02 — Correção numpy
│   │   ├── spec.md
│   │   ├── plan.md
│   │   ├── tasks.md
│   │   ├── model/
│   │   ├── evidence/
│   │   └── verdict/
│   └── sprint-template/          #   Template para novas sprints
│
├── documentacao-base/            # 📚 Documentação acadêmica
│   ├── relatorios/               #   Relatórios de pesquisa
│   │   ├── fluxo-personas-speckit.md #  Fluxo Spec-Kit + personas
│   │   ├── plano-sprints.md      #   Plano de sprints
│   │   └── sprint3-*/            #   Relatórios de sprints
│   └── PlantUML_Language_Reference_Guide_en.pdf
│
├── .github/                      # 🤖 Configuração do GitHub
│   ├── copilot-instructions.md   #   Instruções para GitHub Copilot
│   ├── agents/                   #   Agentes Spec-Kit
│   └── prompts/                  #   Prompts das personas
│
├── .specify/                     # ⚙️ Configuração do Spec-Kit CLI
├── .gitignore                    # Arquivos ignorados pelo git
├── .dockerignore                 # Arquivos ignorados pelo Docker
├── package.json                  # Scripts npm da raiz
└── README.md                     # Este arquivo
```

---

## Detalhamento dos componentes

### `kpc-backend/` — Servidor e API

Backend da plataforma, implementado em **Python com FastAPI**. Responsável por:

- **API REST** com autenticação JWT + bcrypt
- **Extração** de keyphrases (KeyBERT, RAKE, YAKE, spaCy, TextRank)
- **Geração** via LLM (OpenAI ChatGPT)
- **Embeddings** semânticos (Sentence-BERT)
- **Clustering** com NetworkX e similaridade por pares
- **Interface web** alternativa com ReactPy
- **Scripts utilitários** para pipelines de dados
- **Testes** com pytest

> 👉 Leia mais: [`kpc-backend/README-KPC-BACKEND.md`](./kpc-backend/README-KPC-BACKEND.md)

### `kpc-frontend/` — Interface web

Frontend implementado em **React 18 + Vite 5 + Material UI 5**, utilizando:

- **Arquitetura MVVM** (Model-View-ViewModel)
- **Zustand** para estado global
- **React Router** para navegação SPA
- **Axios** para requisições HTTP
- **Storybook 9** para catálogo de componentes
- **Vitest** para testes

O fluxo principal inclui: login → seleção de tópico → clustering → seleção de clusters → curação final.

> 👉 Leia mais: [`kpc-frontend/README-KPC-FRONTEND.md`](./kpc-frontend/README-KPC-FRONTEND.md)

### `spec-kit-main/` — Framework de especificação

O [Spec-Kit](https://github.com/github/spec-kit) é um framework open source da GitHub para **Spec-Driven Development (SDD)**. Ele fornece:

- **Templates** de especificação, plano e tarefas
- **Agentes de IA** para automatizar o pipeline de desenvolvimento
- **Presets** de configuração para diferentes tipos de projeto
- **CLI** (`speckit`) para geração e verificação de artefatos

Neste projeto, o Spec-Kit é usado para:

1. **`/speckit.specify`** — Gerar especificações funcionais
2. **`/speckit.plan`** — Criar planos com diagramas PlantUML
3. **`/speckit.tasks`** — Gerar tarefas detalhadas
4. **`/speckit.implement`** — Implementar conforme especificação
5. **`/speckit.analyze`** — Analisar consistência modelo-vs-código

> 👉 Leia mais: [`spec-kit-main/README.md`](./spec-kit-main/README.md)

### `specs/` — Especificações das features

Contém as especificações geradas pelo Spec-Kit para cada sprint/feature:

| Sprint | Feature | Status |
|--------|---------|--------|
| **001** | Login Component (frontend MVVM) | ✅ Implementado |
| **002** | Pairwise Similarity Serialization Fix (backend) | ✅ Implementado |

Cada especificação inclui: `spec.md`, `plan.md`, `tasks.md`, diagramas PlantUML, evidências, checklists e vereditos.

### `documentacao-base/` — Pesquisa e relatórios

Materiais acadêmicos e relatórios do TCC:

- `relatorios/fluxo-personas-speckit.md` — Guia do fluxo Spec-Kit + 4 personas de IA
- `relatorios/plano-sprints.md` — Planejamento das sprints do experimento
- `relatorios/sprint3-*` — Relatórios detalhados de cada sprint

### Raiz do repositório

| Arquivo/Pasta | Descrição |
|--------------|-----------|
| `.github/` | Configuração do GitHub Copilot (instruções, agentes, prompts de personas) |
| `.specify/` | Configuração do Spec-Kit CLI (extensões, integrações, scripts) |
| `.gitignore` | Arquivos ignorados — `.env`, `node_modules/`, `venv/`, dados sensíveis |
| `.dockerignore` | Arquivos ignorados pelo Docker |
| `package.json` | Scripts npm auxiliares para launcher |
| `src-mvvm/` | Código MVVM do frontend (pasta antiga, substituída por `kpc-frontend/src-mvvm/`) |

---

## Inicialização rápida

### Backend

```bash
cd kpc-backend

# Manual
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.template .env
# Editar .env com SECRET_KEY e OPENAI_API_TOKEN
bash launcher/start.sh local

# Ou via Docker
bash launcher/start.sh docker
```

API disponível em `http://127.0.0.1:3132/api/docs`.

### Frontend

```bash
cd kpc-frontend
npm install
npm run dev:mvvm          # http://127.0.0.1:5174
npm run storybook         # http://127.0.0.1:6006 (opcional)
```

---

## Segurança — checklist para publicação

### ✅ Itens verificados e corrigidos

| Item | Status | Descrição |
|------|--------|-----------|
| `node_modules/` (kpc-frontend) | ✅ Removido | ~44k arquivos removidos do tracking |
| `estilo_story/node_modules/` | ✅ Removido | ~19k arquivos removidos do tracking |
| `venv/` (kpc-frontend) | ✅ Removido | ~1.7k arquivos Python removidos |
| `.env` (kpc-frontend) | ✅ Removido | Contém `REACT_APP_API_URL` |
| `.env` (kpc-backend) | ✅ No `.gitignore` | Contém `SECRET_KEY` e `OPENAI_API_TOKEN` |
| `notebooks/token.json` | ✅ Removido | Token OAuth Google real |
| `login_response.json` | ✅ Removido | JWT real |
| `attributions.toml` | ✅ No `.gitignore` | Hashes bcrypt de senhas |
| `notebooks/attributions.json` | ✅ Removido | Mapeamento de anotadores |
| `cloning_agreement.tsv` | ✅ Removido | Dados de pesquisa |
| `*.bkp.kpc` (8 arquivos) | ✅ Removido | Backups de anotações |
| `dataset/annotations/new/` | ✅ No `.gitignore` | Anotações em andamento |
| `dataset/attributions.toml` | ✅ No `.gitignore` | Senhas hasheadas |

### 🔍 Verificação final

Antes de fazer o push público, execute:

```bash
cd /caminho/para/TCC-KPC

# Checar arquivos sensíveis no staging
git status

# Garantir que não há node_modules/ no cache
git ls-files --cached | grep node_modules | wc -l   # deve ser 0

# Garantir que não há .env no cache
git ls-files --cached | grep '\.env$'               # deve ser vazio

# Garantir que não há venv/ no cache
git ls-files --cached | grep '^venv/' | wc -l       # deve ser 0
```

> **⚠️ Importante:** Alguns arquivos sensíveis ainda existem no **histórico do git**. Para removê-los completamente (incluindo do histórico), use:
> ```bash
> # Exemplo para login_response.json (REPETIR PARA CADA ARQUIVO SENSÍVEL)
> git filter-branch --force --index-filter \
>   "git rm --cached --ignore-unmatch kpc-frontend/login_response.json" \
>   --prune-empty --tag-name-filter cat -- --all
> ```
> Considere usar o [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) para uma limpeza mais eficiente.

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [`LICENSE`](LICENSE) para detalhes (se aplicável).

---

## Contatos e referências

- **Documentação do backend**: [`kpc-backend/README-KPC-BACKEND.md`](./kpc-backend/README-KPC-BACKEND.md)
- **Documentação do frontend**: [`kpc-frontend/README-KPC-FRONTEND.md`](./kpc-frontend/README-KPC-FRONTEND.md)
- **Framework Spec-Kit**: [`spec-kit-main/README.md`](./spec-kit-main/README.md)
- **Relatórios de pesquisa**: [`documentacao-base/relatorios/README.md`](./documentacao-base/relatorios/README.md)
- **Especificações das features**: [`specs/`](./specs)
