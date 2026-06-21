# Keyphrase Curation Platform — Backend

**KPC Backend** é o servidor da plataforma de curadoria de keyphrases. Ele fornece uma API REST (FastAPI) para extração, geração, clustering, anotação e adjudicação de keyphrases, além de uma interface web interativa construída com ReactPy.

---

## Sumário

- [Visão geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura do projeto](#estrutura-do-projeto)
  - [`src/` — Código-fonte](#src--código-fonte)
  - [`dataset/` — Base de dados](#dataset--base-de-dados)
  - [`scripts/` — Utilitários](#scripts--utilitários)
  - [`notebooks/` — Experimentos e análise](#notebooks--experimentos-e-análise)
  - [`tests/` — Testes automatizados](#tests--testes-automatizados)
  - [`docs/` — Documentação](#docs--documentação)
  - [`launcher/` — Scripts de inicialização](#launcher--scripts-de-inicialização)
- [Tutorial de inicialização](#tutorial-de-inicialização)
  - [Manual (ambiente local)](#1-manual-ambiente-local)
  - [Via scripts (`launcher/`)](#2-via-scripts-launcher)
  - [Via Docker](#3-via-docker)
- [API REST — Endpoints](#api-rest--endpoints)
- [Autenticação e segurança](#autenticação-e-segurança)
- [Configuração](#configuração)
- [Desenvolvimento e testes](#desenvolvimento-e-testes)
- [Licença](#licença)

---

## Visão geral

A plataforma KPC foi desenvolvida para apoiar a curadoria de keyphrases em textos argumentativos. Ela permite:

- **Extração automática** de keyphrases usando KeyBERT, RAKE, spaCy, TextRank e YAKE.
- **Geração por LLM** via prompts para ChatGPT (OpenAI).
- **Clustering** de keyphrases baseado em embeddings (Sentence-BERT) com suporte a múltiplas ordenações (coesão, similaridade por pares, similaridade por centróide).
- **Anotação colaborativa**: múltiplos anotadores podem classificar keyphrases em clusters.
- **Adjudicação**: consolidação das anotações de diferentes usuários.
- **Interface web interativa** com ReactPy para o fluxo de anotação.

---

## Arquitetura

```
┌──────────────┐     ┌──────────────────────────────────────────────┐
│  Cliente     │     │            KPC Backend (FastAPI)             │
│  (ReactPy)   │◄───►│                                              │
│  (Swagger)   │     │  ┌─────────┐  ┌────────────┐  ┌──────────┐  │
└──────────────┘     │  │  API    │  │ Controller │  │  Model   │  │
                     │  │  Layer  │──►│   Layer    │──►│  Layer   │  │
                     │  └─────────┘  └────────────┘  └──────────┘  │
                     │       │              │               │       │
                     │  ┌─────────┐  ┌────────────┐  ┌──────────┐  │
                     │  │ Security │  │ Annotation │  │ Dataset  │  │
                     │  │  (JWT)  │  │ Controller │  │ (TOML)   │  │
                     │  └─────────┘  └────────────┘  └──────────┘  │
                     └──────────────────────────────────────────────┘
```

**Tecnologias principais:**
- **FastAPI** — Framework web assíncrono (Python 3.9+)
- **ReactPy** — Interface reativa no backend (componentes Python → HTML/JS)
- **Sentence-BERT** — Embeddings para similaridade semântica
- **JWT + bcrypt** — Autenticação stateless
- **TOML** — Configuração de atribuições de usuários
- **NumPy / NetworkX** — Computação de similaridade e clustering

---

## Estrutura do projeto

```
kpc-backend/
├── src/
│   └── keyphrase_curation/
│       ├── __init__.py          # Inicialização do config (dotenv)
│       ├── extractor.py         # Extração de keyphrases (KeyBERT, RAKE, YAKE, spaCy)
│       ├── generator.py         # Geração via LLM (ChatGPT/OpenAI)
│       ├── api/                 # Camada de API REST (FastAPI routers)
│       │   ├── main.py          # App FastAPI, middlewares, rotas
│       │   ├── api_server.py    # Classe ApiServer (wrapper uvicorn)
│       │   ├── user.py          # Login, logout, listagem de usuários
│       │   ├── topic.py         # CRUD de tópicos, clustering, anotações
│       │   ├── cluster.py       # Opções de ordenação de clusters
│       │   ├── keyphrase.py     # Opções de ordenação de keyphrases
│       │   └── annotation_file.py # Arquivos de anotação por usuário
│       ├── controller/          # Lógica de negócio
│       │   ├── user_attribution.py # Gerencia atribuições de usuários
│       │   └── annotation.py    # Controlador de anotações (clusters, seleções)
│       ├── model/               # Modelos de domínio
│       │   ├── annotation.py    # Tasks, KeyphraseCurationFile, ClusterAnnotation
│       │   ├── cluster.py       # ClusterSorting, KeyphraseClustering, Cluster
│       │   ├── keyphrase.py     # Keyphrase, KeyphraseEmbeddings, KeyphraseSorting
│       │   └── user_attribution.py # Leitura do attributions.toml
│       ├── components/          # Componentes ReactPy (interface web)
│       │   ├── app.py           # App principal, rotas ReactPy
│       │   ├── login.py         # Tela de login (ReactPy)
│       │   ├── login_internal.py # Login interno
│       │   ├── topic.py         # Seleção de tópico
│       │   ├── curation.py      # Curadoria de keyphrases
│       │   ├── keyphrase_clustering.py # Clustering UI
│       │   ├── keyphrase_clusters.py   # Visualização de clusters
│       │   ├── curated_keyphrases.py   # Keyphrases curadas
│       │   ├── adjudicator_chip.py     # Chip de adjudicação
│       │   ├── adjudicator_clusters.py # Clusters do adjudicator
│       │   └── mui.py           # Componentes Material UI wrappers
│       ├── view/                # Views legadas (ipywidgets/Jupyter)
│       │   ├── app.py
│       │   ├── cluster_annotation.py
│       │   └── user_data.py
│       └── util/                # Utilitários
│           ├── security.py      # JWT, bcrypt, OAuth2
│           ├── pairwise_similarity.py # Matriz de similaridade por pares
│           ├── json_encoder.py  # Conversor numpy → Python nativo
│           └── fixture.py       # Import de fixtures de teste
├── dataset/
│   ├── attributions.toml        # 👤 Atribuições de usuários (IGNORADO pelo git)
│   ├── attributions.template.toml # Template para attributions.toml
│   ├── annotations/             # Anotações por usuário (.json e .kpc)
│   │   ├── akira/
│   │   ├── alexandre/
│   │   ├── daired/
│   │   ├── victor/
│   │   └── new/                 # Anotações em andamento (ignorado)
│   ├── keyphrases/
│   │   ├── collected/           # Keyphrases coletadas (.tsv por tópico)
│   │   ├── curated/             # Keyphrases curadas (.kpc por tópico)
│   │   ├── embeddings/          # Embeddings pré-computados (.pkl)
│   │   ├── extracted/           # Keyphrases extraídas automaticamente
│   │   └── generated/           # Keyphrases geradas por LLM
│   ├── scrapped/                # Dados brutos scrappados (.tsv)
│   └── texts/                   # Textos fonte organizados por tópico
│       ├── abortion/
│       ├── cloning/
│       ├── death_penalty/
│       ├── gun_control/
│       ├── marijuana_legalization/
│       ├── minimum_wage/
│       ├── nuclear_energy/
│       └── school_uniforms/
├── scripts/                     # Scripts utilitários
│   ├── agreement.py             # Cálculo de acordo entre anotadores
│   ├── extract_keyphrases.py    # Extração em lote
│   ├── generate_embbedings.py   # Geração de embeddings
│   ├── generate_keyphrases.py   # Geração via LLM
│   ├── keyphrases_tsv_to_json.py # Conversão TSV → JSON
│   ├── kpc_to_json.py           # Conversão .kpc → .json
│   └── print_selected_keyphrases.py # Impressão de keyphrases selecionadas
├── notebooks/                   # Jupyter Notebooks
│   ├── new/                     # Notebooks atuais
│   │   ├── cluster.ipynb
│   │   ├── keyphase.ipynb
│   │   ├── login.ipynb
│   │   └── topic.ipynb
│   ├── old/                     # Notebooks históricos
│   └── *.ipynb                  # Notebooks avulsos (anotador, matching, etc.)
├── tests/                       # Testes automatizados (pytest)
│   ├── cluster_annotation_test.py
│   ├── keyphrase_clustering_test.py
│   ├── keyphrase_embeddings_test.py
│   ├── fixtures/                # Fixtures de dados para testes
│   └── samples/                 # Amostras de dados
├── docs/                        # Documentação complementar
│   ├── cluster_annotation.md
│   └── user_data.md
├── launcher/                    # Scripts de inicialização
│   ├── start.sh                 # Inicia o backend (local ou docker)
│   ├── stop.sh                  # Para o backend
│   ├── status.sh                # Verifica status
│   ├── common.sh                # Funções compartilhadas
│   └── Dockerfile               # Imagem Docker
├── reactpy-material/            # Submódulo: componentes Material UI para ReactPy
├── reactpy-material-akira/      # Submódulo: fork com customizações
├── .env                         # 🔐 Variáveis de ambiente (NÃO versionar)
├── .env.template                # Template para .env
├── .gitignore                   # Arquivos ignorados pelo git
├── .dockerignore                # Arquivos ignorados pelo Docker
├── requirements.txt             # Dependências Python (pinned)
├── pyproject.toml               # Metadados do pacote Python
├── package.json                 # Scripts npm auxiliares
├── run.py                       # Entry point alternativo
└── openapi.json                 # Especificação OpenAPI exportada
```

---

## Tutorial de inicialização

### 1. Manual (ambiente local)

**Pré-requisitos:** Python 3.9+, pip, Git

```bash
cd kpc-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -e .                      # instala como pacote editável
cp .env.template .env                 # configure suas variáveis
cp dataset/attributions.template.toml dataset/attributions.toml
git submodule update --init --recursive  # se for usar a interface ReactPy
```

Edite `.env` com suas configurações (especialmente `SECRET_KEY` e `OPENAI_API_TOKEN`).

### 2. Via scripts (`launcher/`)

```bash
bash launcher/start.sh local     # modo interativo
bash launcher/start.sh docker    # modo Docker (requer Docker instalado)
bash launcher/status.sh          # verificar status
bash launcher/stop.sh            # parar execução
```

### 3. Via Docker

```bash
bash launcher/start.sh docker
```

O `Dockerfile` usa `python:3.11-slim` e expõe a porta `3132`.

---

## API REST — Endpoints

Com o servidor rodando (padrão: `http://127.0.0.1:3132`):

| Recurso               | URL                                     |
|-----------------------|-----------------------------------------|
| **Swagger UI** (docs) | `http://127.0.0.1:3132/api/docs`        |
| **OpenAPI spec**      | `http://127.0.0.1:3132/openapi.json`    |
| **Interface ReactPy** | `http://127.0.0.1:3132/`                |

### Autenticação

| Método | Rota                           | Descrição                    |
|--------|--------------------------------|------------------------------|
| POST   | `/users/login`                 | Login (form) → JWT+cookie    |
| GET    | `/users/basic_login`           | Login via HTTP Basic Auth    |
| GET    | `/users/logout`                | Logout (limpa cookie)        |
| GET    | `/users/list`                  | Lista usuários               |
| GET    | `/users/whoami`                | Retorna usuário logado       |

### Tópicos

| Método | Rota                                      | Descrição                              |
|--------|-------------------------------------------|----------------------------------------|
| GET    | `/topic/{username}/list`                  | Tópicos do usuário                     |
| GET    | `/topic/{username}/{topic}`               | Dados do tópico                        |
| GET    | `/topic/keyphrase_clustering/{username}/{topic}` | Clustering de keyphrases       |
| GET    | `/topic/clusters/{username}/{topic}`      | Clusters do tópico                     |
| PUT    | `/topic/move_to_cluster/{username}/{topic}/{keyphrase_id}/{cluster_id}` | Move keyphrase para cluster |
| PUT    | `/topic/save_annotation/{username}/{topic}/{task}` | Salva anotação                |
| GET    | `/topic/cluster_selection/{username}/{topic}` | Seleção de clusters                |
| GET    | `/topic/keyphrases_selection/{username}/{topic}` | Seleção de keyphrases          |
| GET    | `/topic/keyphrases_aliases/{username}/{topic}` | Aliases de keyphrases            |
| GET    | `/topic/curated_keyphrases/{username}/{topic}` | Keyphrases curadas              |
| GET    | `/topic/clusters/{username}/{topic}/<sorting>` | Clusters ordenados (numerical, cluster_cohesion, pairwise_similarity, centroid_similarity) |

### Clusters

| Método | Rota                                      | Descrição                              |
|--------|-------------------------------------------|----------------------------------------|
| GET    | `/clusters/cluster_sorting_options/{username}` | Opções de ordenação              |
| GET    | `/clusters/get_cluster_sorting_by_value/{username}/{order}` | Ordenação por valor |

### Keyphrases

| Método | Rota                                      | Descrição                              |
|--------|-------------------------------------------|----------------------------------------|
| GET    | `/keyphrases/list`                        | Lista keyphrases                       |
| GET    | `/keyphrases/get_keyphrase_sorting_by_value/{username}/{order}` | Ordenação por valor |

### Arquivos de anotação

| Método | Rota                                      | Descrição                              |
|--------|-------------------------------------------|----------------------------------------|
| GET    | `/annotation_files/{username}/list`       | Arquivos de anotação do usuário        |

A porta pode ser alterada definindo a variável `KPC_PORT` (ex.: `export KPC_PORT=8000`).

---

## Autenticação e segurança

O sistema utiliza **JWT (JSON Web Tokens)** com bcrypt para hash de senhas.

- As senhas são armazenadas como hashes `$2b$` no `dataset/attributions.toml`.
- O token JWT é gerado com `HS256` e expiração configurável (`ACCESS_TOKEN_EXPIRE_MINUTES`, padrão: 2880 min = 48h).
- O cookie `Authorization` é do tipo `httponly`.
- A **interface ReactPy** usa autenticação via cookie; a **API REST** pode usar `Authorization: Bearer <token>`.

### ⚠️ Segurança ao publicar no GitHub

Antes de tornar o repositório público, **verifique os seguintes pontos**:

| Item | Status | Ação necessária |
|------|--------|-----------------|
| `.env` | ✅ No `.gitignore` | Contém `SECRET_KEY` e `OPENAI_API_TOKEN` — não versionar |
| `dataset/attributions.toml` | ✅ No `.gitignore` | Contém hashes de senha reais |
| `notebooks/token.json` | ✅ Removido do git | Continha token OAuth real do Google — **NUNCA versionar** |
| `login_response.json` | ✅ Removido do git | Continha JWT real — **NUNCA versionar** |
| `notebooks/attributions.json` | ✅ Removido do git | Contém mapeamento de anotadores |
| `dataset/annotations/new/` | ✅ No `.gitignore` | Dados de anotação em andamento |
| `venv/` | ✅ No `.gitignore` | Ambiente virtual local |
| `dataset/attributions.template.toml` | ✅ Template apenas | **Use hashes placeholder** para publicação |
| `openapi.json` | ⚠️ Público | Apenas especificação da API, sem dados sensíveis |

> **Antes do primeiro commit público**, execute:
> ```bash
> # Verificar se há arquivos sensíveis no staging
> git status
> # Se necessário, remover do cache e adicionar ao .gitignore
> git rm --cached arquivo_sensivel.json
> # Regerar SECRET_KEY no .env local
> python -c "import secrets; print(secrets.token_urlsafe(32))"
> ```

---

## Configuração

As variáveis de ambiente são carregadas de `.env` pelo `python-dotenv`:

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `OPENAI_API_TOKEN` | Token da API OpenAI | — |
| `OPENAI_API_TEMPERATURE` | Temperatura do modelo | `0.2` |
| `OPENAI_API_MODEL` | Modelo OpenAI | `gpt-3.5-turbo` |
| `OPENAI_API_MAX_TOKENS` | Máximo de tokens | `1000` |
| `SECRET_KEY` | Chave secreta para assinatura JWT | — |
| `SECURITY_ALGORITHM` | Algoritmo JWT | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Expiração do token (minutos) | `2880` |
| `DATASET_RELATIVE_PATH` | Caminho relativo para dataset | `dataset` |
| `ATTRIBUTIONS_FILENAME` | Nome do arquivo de atribuições | `attributions.toml` |
| `COOKIE_DOMAIN` | Domínio do cookie | `localhost` |
| `COOKIE_PATH` | Path do cookie | `/` |
| `CLUSTER_IDS_LENGTH` | Tamanho dos IDs de cluster | `33` |
| `CURATED_KEYPHRASES_LENGTH` | Tamanho de keyphrases curadas | `16` |

---

## Desenvolvimento e testes

```bash
# Ativar ambiente virtual
source .venv/bin/activate

# Instalar dependências de desenvolvimento
pip install -r requirements.txt

# Executar testes
pytest -q

# Executar lint (ruff)
ruff check src/

# Verificar tipagem (mypy)
mypy src/
```

### Testes disponíveis

- `cluster_annotation_test.py` — Testes de anotação de clusters
- `keyphrase_clustering_test.py` — Testes de clustering
- `keyphrase_embeddings_test.py` — Testes de embeddings

### Scripts utilitários

```bash
# Extrair keyphrases de textos
python scripts/extract_keyphrases.py

# Gerar embeddings
python scripts/generate_embbedings.py

# Gerar keyphrases via LLM
python scripts/generate_keyphrases.py

# Calcular acordo entre anotadores
python scripts/agreement.py
```

---

## Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes (se aplicável).

---

## Contatos e referências

- Documentação adicional: [`docs/`](./docs)
- Notebooks de experimentos: [`notebooks/new/`](./notebooks/new)
- Especificação OpenAPI: [`openapi.json`](./openapi.json)
- Submódulos:
  - [reactpy-material](https://github.com/williamneto/reactpy-material.git)
  - [reactpy-material-akira](https://github.com/marceloakira/reactpy-material.git)
