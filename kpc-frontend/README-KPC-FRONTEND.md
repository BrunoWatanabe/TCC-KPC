# KPC Frontend

Frontend do KPC (Keyphrase Curation Platform), responsavel pela interface web de login, selecao de topico, clustering, selecao de clusters, curacao final e Storybook de componentes.

Este arquivo e a documentacao principal do frontend. Os READMEs antigos que ficavam em subpastas foram consolidados aqui para facilitar o uso, a manutencao e a navegacao.

## Sumario

- [1. Visao geral](#1-visao-geral)
- [2. Inicializacao](#2-inicializacao)
  - [2.1 Manual](#21-manual)
  - [2.2 Via scripts](#22-via-scripts)
- [3. Estrutura do frontend](#3-estrutura-do-frontend)
  - [3.1 Arquivos da raiz](#31-arquivos-da-raiz)
  - [3.2 src-mvvm](#32-src-mvvm)
  - [3.3 estilo_story](#33-estilo_story)
  - [3.4 launcher](#34-launcher)
  - [3.5 docs](#35-docs)

<a id="1-visao-geral"></a>
## 1. Visao geral

O frontend e implementado em React com Vite e tem dois focos principais:

1. A aplicacao principal em arquitetura MVVM, localizada em [src-mvvm](src-mvvm).
2. A biblioteca visual e a documentacao de componentes via Storybook, localizada em [estilo_story](estilo_story).

O fluxo principal conversa com o backend KPC em `http://localhost:3132` por padrao, conforme configurado em [src-mvvm/shared/config.js](src-mvvm/shared/config.js). O ponto de entrada da aplicacao MVVM e [src-mvvm/mainMVVM.jsx](src-mvvm/mainMVVM.jsx), enquanto o Storybook usa a estrutura separada dentro de [estilo_story](estilo_story).

## 2. Inicializacao

Antes de iniciar, garanta que as dependencias estejam instaladas com `npm install`. O frontend usa `package.json` na raiz e tambem possui scripts de bootstrap via launcher.

<a id="21-manual"></a>
### 2.1 Manual

Use este caminho quando quiser subir a aplicacao sem depender dos atalhos do launcher.

```bash
cd kpc-frontend
npm install
npm run dev:mvvm
```

Opcionalmente, para abrir a interface de Storybook:

```bash
npm run storybook
```

Se precisar alterar o backend consumido pelo frontend, ajuste [src-mvvm/shared/config.js](src-mvvm/shared/config.js) e atualize `api_base_url`.

Tambem e possivel usar os modos de preview e build:

```bash
npm run build:mvvm
npm run preview:mvvm
```

<a id="22-via-scripts"></a>
### 2.2 Via scripts

O diretorio [launcher](launcher) automatiza bootstrap, checagem de portas, execucao local e execucao via Docker.

Comandos principais:

```bash
bash launcher/start.sh local
bash launcher/start.sh docker
bash launcher/status.sh
bash launcher/stop.sh
```

Os mesmos fluxos tambem estao expostos no `package.json`:

```bash
npm run launcher:local
npm run launcher:docker
npm run launcher:dual:local
npm run launcher:dual:docker
```

Resumo do modo local:

- Instala dependencias com `npm ci` quando necessario.
- Sobe o frontend MVVM na porta `5174` por padrao.
- Finaliza processos antigos que estejam usando a porta configurada.

Resumo do modo Docker:

- Constrói a imagem definida em [launcher/Dockerfile](launcher/Dockerfile).
- Sobe o container com o frontend exposto na porta configurada.

## 3. Estrutura do frontend

<a id="31-arquivos-da-raiz"></a>
### 3.1 Arquivos da raiz

- [package.json](package.json): scripts de desenvolvimento, build, Storybook e launcher.
- [package-lock.json](package-lock.json): bloqueio exato das dependencias instaladas.
- [vite.config.js](vite.config.js): configuracao do build da biblioteca de componentes em formato UMD.
- [vite.mvvm.config.js](vite.mvvm.config.js): configuracao principal do frontend MVVM, com porta, aliases e build da SPA.
- [tsconfig.json](tsconfig.json) e [tsconfig.node.json](tsconfig.node.json): configuracao do TypeScript para os arquivos do projeto.
- [index.html](index.html): pagina base usada pelo fluxo principal.
- [index.mvvm.html](index.mvvm.html): pagina alternativa para o fluxo MVVM.
- [openapi.json](openapi.json): contrato da API usado para integracao com o backend e validacoes.
- [package_bkp.json](package_bkp.json): copia de seguranca do package.json.
- [.env](.env): configuracao local do frontend, se utilizada no ambiente.
- [.dockerignore](.dockerignore): exclusao de arquivos no build da imagem Docker.

<a id="32-src-mvvm"></a>
### 3.2 src-mvvm

Diretorio principal da aplicacao React em MVVM.

- [mainMVVM.jsx](src-mvvm/mainMVVM.jsx): entry point da aplicacao MVVM.
- [AppMVVM.jsx](src-mvvm/AppMVVM.jsx): orquestra rotas, layout, tema e conexao entre views e viewmodels.
- [styles.css](src-mvvm/styles.css) e [index.css](src-mvvm/index.css): estilos globais do frontend MVVM.
- `models/`: camada de dominio e acesso a dados.
  - [index.js](src-mvvm/models/index.js): exporta entidades, services e modelos de negocio.
  - `business/`: modelos de ordenacao, dados e alias de clusters.
  - `entities/`: entidades de dominio como usuario, topico, keyphrase e cluster.
  - `services/`: integracoes com a API do backend.
- `viewmodels/`: stores e hooks que concentram estado e logica de apresentacao.
  - [index.js](src-mvvm/viewmodels/index.js): exporta os stores e hooks principais.
  - `stores/`: estado global da aplicacao.
  - `hooks/`: viewmodels por fluxo da interface.
- `views/`: camada visual da arquitetura MVVM.
  - [index.js](src-mvvm/views/index.js): exporta layouts, componentes e paginas.
  - `components/`: componentes reutilizaveis da UI.
  - `layouts/`: composicao visual da aplicacao.
  - `pages/`: paginas do fluxo, como login, selecao de topico e curacao.
- `shared/`: configuracao e utilitarios compartilhados.
  - [config.js](src-mvvm/shared/config.js): base de configuracao do frontend, incluindo URL da API e parametros de curacao.

<a id="33-estilo_story"></a>
### 3.3 estilo_story

Diretorio dedicado ao Storybook e ao catalogo visual dos componentes.

- `.storybook/`: configuracao do Storybook.
- `src/components/`: componentes React usados nas historias.
- `src/stories/`: historias, docs e exemplos visuais dos componentes.
- `src/models/`: modelos auxiliares usados no Storybook e na documentacao dos componentes.
- [package.json](estilo_story/package.json): scripts especificos do ambiente de Storybook.
- [vite.config.js](estilo_story/vite.config.js): configuracao Vite da estrutura de Storybook.

O `estilo_story` existe para demonstrar e testar a interface isoladamente, incluindo estados de botao, headers, pages e componentes de curacao.

<a id="34-launcher"></a>
### 3.4 launcher

Scripts de operacao do frontend.

- [common.sh](launcher/common.sh): faz bootstrap das dependencias, checa portas, executa modo local e modo Docker.
- [start.sh](launcher/start.sh): ponto de entrada para iniciar com menu interativo, modo local ou Docker.
- [status.sh](launcher/status.sh): mostra o estado dos processos de frontend e do container.
- [stop.sh](launcher/stop.sh): encerra os processos do frontend e o container, se existir.
- [Dockerfile](launcher/Dockerfile): imagem usada para executar o frontend em container.

<a id="35-docs"></a>
### 3.5 docs

Documentacao de apoio do frontend.

- [ARQUITETURA_MVVM.md](docs/ARQUITETURA_MVVM.md): explicacao da arquitetura MVVM adotada.
- [GUIA_TESTE_EXECUCAO.md](docs/GUIA_TESTE_EXECUCAO.md): guia de execucao e validacao.
- [MELHORIAS_LOGIN_PAGE.md](docs/MELHORIAS_LOGIN_PAGE.md): evolucao da pagina de login.
- [PLANO_ACAO_MVVM.md](docs/PLANO_ACAO_MVVM.md) e [PLANO_ACAO_MVVM_PROGRESS.md](docs/PLANO_ACAO_MVVM_PROGRESS.md): plano e acompanhamento da migracao.
- [UNIFIED_API_INTEGRATION.md](docs/UNIFIED_API_INTEGRATION.md): integracao unificada com a API.

## Observacoes

- A porta padrao do frontend MVVM e `5174`.
- O backend esperado por padrao roda em `3132`.
- Se voce alterar dependencias, rode `npm install` novamente.
- Se quiser comparar o fluxo MVVM com o Storybook, use `npm run dev:mvvm` e `npm run storybook` em paralelo.
