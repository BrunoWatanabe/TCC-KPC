# Keyphrase Curation Platform — Frontend

**KPC Frontend** é a interface web da plataforma de curadoria de keyphrases. Implementada em **React + Vite** com arquitetura **MVVM** (Model-View-ViewModel), consome a API do backend KPC e oferece Storybook para documentação visual de componentes.

---

## Sumário

- [Visão geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura do projeto](#estrutura-do-projeto)
  - [`src-mvvm/` — Aplicação principal (MVVM)](#src-mvvm--aplicação-principal-mvvm)
  - [`estilo_story/` — Storybook e catálogo de componentes](#estilo_story--storybook-e-catálogo-de-componentes)
  - [`launcher/` — Scripts de inicialização](#launcher--scripts-de-inicialização)
  - [`docs/` — Documentação](#docs--documentação)
  - [Arquivos da raiz](#arquivos-da-raiz)
- [Inicialização](#inicialização)
  - [Manual](#1-manual)
  - [Via scripts (`launcher/`)](#2-via-scripts-launcher)
  - [Via Docker](#3-via-docker)
- [API — Endpoints consumidos](#api--endpoints-consumidos)
- [Segurança](#segurança)
- [Configuração](#configuração)
- [Desenvolvimento](#desenvolvimento)

---

## Visão geral

O frontend KPC oferece uma interface completa para o fluxo de curadoria de keyphrases:

- **Login** com autenticação JWT
- **Seleção de tópico** disponível para o anotador
- **Clustering** — visualização e movimentação de keyphrases entre clusters
- **Seleção de clusters e keyphrases** — escolha dos melhores clusters/keyphrases
- **Curação final** — definição de aliases e ordenação curada
- **Storybook** — catálogo isolado de componentes para desenvolvimento e testes

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    KPC Frontend (React)                 │
│                                                         │
│  ┌──────────────────┐  ┌─────────────────────────────┐  │
│  │   VIEWS          │  │   VIEWMODELS                │  │
│  │   (Pages +       │◄─┤   (Hooks + Stores)          │  │
│  │    Components)   │  │   - useAuth                  │  │
│  │   - LoginView    │  │   - useTopicSelectionVM      │  │
│  │   - TopicSelect  │  │   - useKeyphraseClusteringVM │  │
│  │   - Keyphrase    │  │   - useKeyphraseClustersVM   │  │
│  │     Clustering   │  │   - useCuratedKeyphrasesVM   │  │
│  │   - Keyphrase    │  │                              │  │
│  │     Clusters     │  │   ┌─────────────────────┐    │  │
│  │   - Curated      │  │   │   STORES (Zustand)  │    │  │
│  │     Keyphrases   │  │   │ - useAuthStore      │    │  │
│  └──────────────────┘  │   │ - useTopicStore     │    │  │
│         │              │   │ - useFlowStore      │    │  │
│         │              │   └─────────────────────┘    │  │
│  ┌──────────────────┐  └─────────────────────────────┘  │
│  │   MODELS         │              │                    │
│  │   (Services +    │◄─────────────┘                    │
│  │    Entities)     │                                   │
│  │   - AuthService  │         ╔══════════════════╗      │
│  │   - TopicService │◄────────║  Backend KPC     ║      │
│  │   - ClusterService│        ║  (FastAPI :3132) ║      │
│  │   - KeyphraseSvc │         ╚══════════════════╝      │
│  └──────────────────┘                                   │
└─────────────────────────────────────────────────────────┘
```

### Tecnologias principais

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **React** | 18.2.0 | Biblioteca de UI |
| **Vite** | 5.x | Bundler e dev server |
| **Material UI (MUI)** | 5.14.15 | Design system e componentes |
| **Zustand** | 5.0.8 | Gerenciamento de estado global |
| **React Router** | 7.9.4 | Roteamento SPA |
| **Axios** | 1.12.2 | HTTP client |
| **Storybook** | 9.1.7 | Catálogo de componentes |
| **Vitest** | 3.2.4 | Testes unitários |

---

## Estrutura do projeto

```
kpc-frontend/
├── src-mvvm/                    # 🏗️ Aplicação principal (MVVM)
│   ├── mainMVVM.jsx             # Entry point
│   ├── AppMVVM.jsx              # Componente raiz (rotas, tema, providers)
│   ├── index.css / styles.css   # Estilos globais
│   ├── index.html               # Página HTML para dev/build
│   ├── models/                  # Camada Model (dados e lógica de negócio)
│   │   ├── index.js             # Exportações centralizadas
│   │   ├── entities/            # Entidades de domínio
│   │   │   ├── User.js          # Usuário
│   │   │   ├── Topic.js         # Tópico
│   │   │   ├── Keyphrase.js     # Keyphrase
│   │   │   └── Cluster.js       # Cluster
│   │   ├── services/            # Serviços HTTP (API calls)
│   │   │   ├── AuthService.js   # Autenticação (login JWT)
│   │   │   ├── TopicService.js  # Tópicos
│   │   │   ├── ClusterService.js # Clusters
│   │   │   ├── KeyphraseService.js # Keyphrases
│   │   │   └── AnnotationService.js # Arquivos de anotação
│   │   └── business/            # Modelos de negócio
│   │       ├── ClusterSortingModel.js    # Ordenação de clusters
│   │       ├── ClusterAliasSortingModel.js # Ordenação por alias
│   │       ├── ClusterDataModel.js       # Dados de cluster
│   │       └── KeyphraseSortingModel.js  # Ordenação de keyphrases
│   ├── viewmodels/              # Camada ViewModel (estado + lógica)
│   │   ├── index.js             # Exportações centralizadas
│   │   ├── stores/              # Stores globais (Zustand)
│   │   │   ├── useAuthStore.js  # Estado de autenticação
│   │   │   ├── useTopicStore.js # Estado de tópicos
│   │   │   ├── useFlowStore.js  # Estado do fluxo da aplicação
│   │   │   └── useSyncStore.js  # Sincronização entre telas
│   │   └── hooks/               # Custom hooks (por fluxo)
│   │       ├── useAuth.js       # ViewModel de login
│   │       ├── useTopicSelectionViewModel.js  # VM de seleção de tópico
│   │       ├── useKeyphraseClusteringViewModel.js # VM de clustering
│   │       ├── useKeyphraseClustersViewModel.js   # VM de seleção de clusters
│   │       └── useCuratedKeyphrasesViewModel.js   # VM de curação final
│   └── views/                   # Camada View (componentes visuais)
│       ├── index.js             # Exportações centralizadas
│       ├── components/          # Componentes reutilizáveis
│       │   ├── Button.jsx
│       │   ├── Chip.jsx
│       │   ├── ClusterCard.jsx
│       │   ├── Dialog.jsx
│       │   ├── KeyphraseItem.jsx
│       │   ├── TextField.jsx
│       │   ├── AdjudicatorClusterChips.jsx
│       │   └── index.js
│       ├── layouts/             # Layouts da aplicação
│       │   ├── AuthLayout.jsx   # Layout da tela de login
│       │   ├── MainLayout.jsx   # Layout principal (após login)
│       │   └── index.js
│       └── pages/               # Páginas do fluxo
│           ├── LoginView.jsx              # Tela de login
│           ├── TopicSelectionView.jsx     # Seleção de tópico
│           ├── KeyphraseClusteringView.jsx # Clustering
│           ├── KeyphraseClustersView.jsx   # Seleção de clusters
│           ├── CuratedKeyphrasesView.jsx   # Curação final
│           └── index.js
│   └── shared/                  # Recursos compartilhados
│       ├── config.js            # Configuração (API base URL, etc.)
│       ├── index.js             # Exportações
│       └── enums/               # Enums e constantes
│           ├── ClusterSorting.js
│           ├── KeyphraseSorting.js
│           └── index.js
├── estilo_story/                # 📚 Storybook e catálogo visual
│   ├── index.html               # Página HTML do Storybook
│   ├── package.json             # Dependências do Storybook
│   ├── vite.config.js           # Configuração Vite
│   ├── .storybook/              # Configuração do Storybook
│   │   ├── main.js              # Addons, stories location
│   │   ├── preview.js           # Preview config
│   │   └── vitest.setup.js      # Setup de testes
│   └── src/
│       ├── components/          # Componentes React com stories
│       │   ├── Login.jsx
│       │   ├── TopicSelect.jsx
│       │   ├── KeyphraseClustering.jsx
│       │   ├── KeyphraseClusteringList.jsx
│       │   ├── KeyphraseClusteringSimple.jsx
│       │   ├── KeyphraseClusters.jsx
│       │   ├── KeyphraseClusterSelector.jsx
│       │   ├── KeyphraseControls.jsx
│       │   ├── CuratedKeyphrases.jsx
│       │   ├── CuratedKeyphrasesContainer.jsx
│       │   └── old/             # Versões antigas de componentes
│       ├── stories/             # Histórias (stories) do Storybook
│       │   ├── Button.stories.js
│       │   ├── Header.stories.js
│       │   ├── Page.stories.js
│       │   ├── Login.stories.js
│       │   ├── TopicSelect.stories.js
│       │   ├── KeyphraseClustering.stories.js
│       │   ├── KeyphraseClusters.stories.js
│       │   ├── CuratedKeyphrases.stories.js
│       │   ├── CuratedKeyphrasesContainer.stories.jsx
│       │   ├── KeyphraseClusteringContainer.stories.jsx
│       │   ├── KeyphraseClustersContainer.stories.jsx
│       │   ├── Configure.mdx
│       │   └── assets/          # Assets das histórias
│       ├── stores/              # Stores (Zustand) para Storybook
│       │   ├── useKeyphraseClustering.js
│       │   ├── useKeyphraseClusters.js
│       │   └── useCuratedKeyphrases.js
│       └── models/              # ViewModels no Storybook
│           ├── KeyphraseCurationViewModel.ts
│           └── TESTING_GUIDE.md
├── launcher/                    # 🚀 Scripts de inicialização
│   ├── common.sh                # Funções compartilhadas (bootstrap, portas)
│   ├── start.sh                 # Inicia o frontend (local ou docker)
│   ├── stop.sh                  # Para execução
│   ├── status.sh                # Verifica status
│   └── Dockerfile               # Imagem Docker (nginx + build)
├── docs/                        # 📖 Documentação
│   ├── ARQUITETURA_MVVM.md      # Arquitetura MVVM detalhada
│   ├── GUIA_TESTE_EXECUCAO.md   # Guia de execução e validação
│   ├── MELHORIAS_LOGIN_PAGE.md  # Evolução da página de login
│   ├── PLANO_ACAO_MVVM.md       # Plano de migração MVVM
│   ├── PLANO_ACAO_MVVM_PROGRESS.md # Acompanhamento da migração
│   └── UNIFIED_API_INTEGRATION.md   # Integração unificada com API
├── .storybook/                  # Config Storybook do workspace
│   ├── main.js
│   ├── preview.js
│   └── vitest.setup.js
├── .env                         # 🔐 Variáveis de ambiente local (NÃO versionar)
├── .gitignore                   # Arquivos ignorados pelo git
├── .dockerignore                # Arquivos ignorados pelo Docker
├── package.json                 # Dependências e scripts
├── package-lock.json            # Lockfile (versionar)
├── package_bkp.json             # Backup do package.json
├── vite.config.js               # Config Vite (build UMD de componentes)
├── vite.mvvm.config.js          # Config Vite (aplicação MVVM)
├── index.html                   # HTML base (legado)
├── index.mvvm.html              # HTML alternativo para MVVM
├── tsconfig.json                # Config TypeScript
├── tsconfig.node.json           # Config TS para Node
└── openapi.json                 # Contrato da API backend
```

---

## Inicialização

### 1. Manual

```bash
cd kpc-frontend
npm install
npm run dev:mvvm          # Aplicação MVVM → http://127.0.0.1:5174
npm run storybook         # Storybook → http://127.0.0.1:6006
```

Outros comandos:

```bash
npm run build:mvvm        # Build de produção MVVM → dist-mvvm/
npm run preview:mvvm      # Preview do build
npm run build-storybook   # Build estático do Storybook → storybook-static/
```

### 2. Via scripts (`launcher/`)

```bash
bash launcher/start.sh local     # Inicia localmente
bash launcher/start.sh docker    # Inicia em container
bash launcher/status.sh          # Status dos processos
bash launcher/stop.sh            # Para execução
```

### 3. Via Docker

```bash
bash launcher/start.sh docker
```

O `Dockerfile` faz o build de produção e serve com nginx na porta configurada (padrão: `5174`).

---

## API — Endpoints consumidos

O frontend consome os seguintes endpoints do backend KPC (http://localhost:3132):

| Serviço | Endpoint | Método | Função |
|---------|----------|--------|--------|
| **AuthService** | `/users/login` | POST | Login (form-urlencoded) |
| **AuthService** | `/users/whoami` | GET | Usuário logado |
| **TopicService** | `/topic/{username}/list` | GET | Lista tópicos do usuário |
| **TopicService** | `/topic/{username}/{topic}` | GET | Dados do tópico |
| **ClusterService** | `/topic/clusters/{username}/{topic}` | GET | Clusters do tópico |
| **ClusterService** | `/topic/clusters/{username}/{topic}/{sorting}` | GET | Clusters ordenados |
| **ClusterService** | `/clusters/cluster_sorting_options/{username}` | GET | Opções de ordenação |
| **KeyphraseService** | `/topic/keyphrase_clustering/{username}/{topic}` | GET | Clustering de keyphrases |
| **KeyphraseService** | `/keyphrases/get_keyphrase_sorting_by_value/{username}/{order}` | GET | Ordenação por valor |
| **AnnotationService** | `/annotation_files/{username}/list` | GET | Arquivos de anotação |
| **AnnotationService** | `/topic/cluster_selection/{username}/{topic}` | GET | Seleção de clusters |
| **AnnotationService** | `/topic/keyphrases_selection/{username}/{topic}` | GET | Seleção de keyphrases |
| **AnnotationService** | `/topic/keyphrases_aliases/{username}/{topic}` | GET | Aliases de keyphrases |
| **AnnotationService** | `/topic/curated_keyphrases/{username}/{topic}` | GET | Keyphrases curadas |
| **AnnotationService** | `/topic/save_annotation/{username}/{topic}/{task}` | PUT | Salvar anotação |
| **AnnotationService** | `/topic/move_to_cluster/{username}/{topic}/{kp_id}/{cluster_id}` | PUT | Mover keyphrase |

---

## Segurança

### ⚠️ Riscos identificados e corrigidos para publicação

| Item | Status | Descrição |
|------|--------|-----------|
| `node_modules/` | ✅ Removido do tracking | 44.471 arquivos — **NUNCA versionar** |
| `.env` | ✅ Removido do tracking | Contém `REACT_APP_API_URL` |
| `venv/` | ✅ Removido do tracking | Ambiente virtual Python |
| `estilo_story/node_modules/` | ✅ Removido do tracking | 19.552 arquivos |
| `package-lock.json` | ✅ Mantido | Necessário para reprodutibilidade |
| `openapi.json` | ✅ Mantido | Apenas especificação da API |

### 🔒 Boas práticas

- O token JWT é armazenado no `localStorage` pelo `AuthService` → nunca enviado para outros domínios
- A URL base da API (`http://localhost:3132`) está hardcoded em `config.js` — considere usar variáveis de ambiente para produção
- CORS configurado no backend com `allow_origins = ["*"]` → restringir em produção

### Check-list antes do push público

```bash
# Verificar se há arquivos sensíveis no staging
git status

# Confirmar que node_modules/ não está no cache
git ls-files --cached | grep node_modules | wc -l   # deve ser 0

# Confirmar que .env não está no cache
git ls-files --cached | grep '\.env$'              # deve ser vazio
```

---

## Configuração

A configuração principal está em `src-mvvm/shared/config.js`:

```js
export const API_BASE_URL = 'http://localhost:3132';
export const ENDPOINTS = {
  LOGIN: '/users/login',
};
export const config = {
  curated_keyphrases_length: 20,
  max_clusters: 10,
  min_cluster_size: 2,
};
```

O arquivo `.env` local (já no `.gitignore`) pode conter:

```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

> **Atenção:** as variáveis `REACT_APP_*` não são lidas automaticamente pelo Vite (que espera `VITE_*`). A configuração efetiva está em `config.js`.

---

## Desenvolvimento

### Scripts disponíveis

```bash
npm run dev:mvvm          # Servidor de desenvolvimento (porta 5174)
npm run storybook         # Storybook (porta 6006)
npm run build:mvvm        # Build de produção
npm run preview:mvvm      # Preview do build
npm run build-storybook   # Build estático do Storybook
```

### Estrutura MVVM

A aplicação segue o padrão **MVVM** (Model-View-ViewModel):

1. **Model** (`models/`) — entidades de domínio (`entities/`), serviços HTTP (`services/`), lógica de negócio (`business/`)
2. **ViewModel** (`viewmodels/`) — stores Zustand (`stores/`) e custom hooks (`hooks/`) que expõem estado e ações para as views
3. **View** (`views/`) — componentes React puramente visuais, subdivididos em `pages/`, `components/` e `layouts/`

### Fluxo de dados

```
View (React) ──► ViewModel (Hook/Store) ──► Model (Service) ──► API Backend
     ▲                                                              │
     └──────────────────── Dados (resposta) ◄────────────────────────┘
```

### Testes

```bash
# Executar testes via Vitest (requer Storybook configurado)
npx vitest run
```

---

## Documentação adicional

- [`docs/ARQUITETURA_MVVM.md`](./docs/ARQUITETURA_MVVM.md) — Detalhamento completo da arquitetura MVVM
- [`docs/GUIA_TESTE_EXECUCAO.md`](./docs/GUIA_TESTE_EXECUCAO.md) — Guia de validação do sistema
- [`docs/MELHORIAS_LOGIN_PAGE.md`](./docs/MELHORIAS_LOGIN_PAGE.md) — Evolução da página de login
- [`docs/PLANO_ACAO_MVVM.md`](./docs/PLANO_ACAO_MVVM.md) — Plano de migração MVVM
- [`docs/UNIFIED_API_INTEGRATION.md`](./docs/UNIFIED_API_INTEGRATION.md) — Integração com a API

---

## Observações

- Porta padrão do frontend MVVM: **5174**
- Porta do Storybook: **6006**
- Backend esperado em: **http://localhost:3132**
- O frontend usa **import maps** e arquivos `.jsx` sem TypeScript na camada visual
- O arquivo `package_bkp.json` é uma cópia de segurança do `package.json`
