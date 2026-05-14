# Keyphrase Curation — Backend

Este repositório contém o backend da ferramenta de curadoria de keyphrases (anotações, extração, clustering e interface administrativa).

Sumário
-------

- [Visão geral](#visao-geral)
- [Tutorial de inicialização](#tutorial-inicializacao)
  - [Inicialização manual (ambiente local)](#inicializacao-manual)
  - [Inicialização via scripts (`launcher/`)](#inicializacao-via-scripts)
  - [Inicialização via Docker (opcional)](#inicializacao-via-docker)
- [Estrutura do projeto (explicação de pastas e arquivos importantes)](#estrutura-do-projeto)
- [Configuração (variáveis, arquivos de exemplo)](#configuracao)
- [Execução e comandos úteis](#execucao-e-comandos-uteis)
- [Desenvolvimento e testes](#desenvolvimento-e-testes)
- [Notas finais / boas práticas](#notas-finais--boas-praticas)
- [Contatos e referências](#contatos-e-referencias)

<a id="visao-geral"></a>
Visão geral
-----------

O backend fornece:

- Extração de keyphrases com ferramentas como KeyBERT, RAKE, spaCy, TextRank e YAKE.
- Geração de keyphrases por prompts (ex.: integração com LLMs).
- Suporte a anotações com embeddings (Sentence-BERT) para similaridade e clustering.
- Fluxo de gerenciamento de anotações (perfis, atribuição de tarefas, controle de pipeline).

<a id="tutorial-inicializacao"></a>
Tutorial de inicialização
-------------------------

<a id="inicializacao-manual"></a>
1) Inicialização manual (ambiente local)

Pré-requisitos

- Python 3.9 (recomendado)
- pip
- Git
- (Opcional) Docker para o modo `docker`

```bash
cd kpc-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# se desejar instalar como pacote editável
pip install -e .
```

Em seguida copie os arquivos de configuração e edite-os:

```bash
cp .env.template .env
# editar .env conforme necessário
cd dataset
cp attributions.template.toml attributions.toml
# ajustar attributions.toml
```

<a id="inicializacao-via-scripts"></a>
2) Inicialização via scripts (`launcher/`)

O diretório `launcher/` contém scripts organizados para iniciar o backend nos modos suportados.

- Executar localmente (interativo ou em background):

```bash
bash launcher/start.sh local
```

- Executar com Docker (faz verificações e prepara submódulos):

```bash
bash launcher/start.sh docker
```

- Verificar status:

```bash
bash launcher/status.sh
```

- Parar a execução:

```bash
bash launcher/stop.sh
```

Se `start.sh` for executado sem argumento, ele exibirá um menu interativo para escolher o modo.

<a id="inicializacao-via-docker"></a>
3) Inicialização via Docker (resumo)

O modo `docker` do `launcher/start.sh` valida a presença do Docker, testa o daemon e inicializa submódulos/arquivos de ambiente quando necessário. Recomenda-se usar esse modo em produção/local com contêineres.

<a id="estrutura-do-projeto"></a>
Estrutura do projeto
--------------------

Aqui estão as pastas e arquivos mais importantes e o que fazem:

- `dataset/`
  - Contém dados usados no fluxo de curadoria: `attributions.toml`, anotações, keyphrases (coletadas/curadas/embeddings), e textos por tópico.
  - `attributions.template.toml` → template para criar `dataset/attributions.toml`.

- `docs/`
  - Documentação específica, por exemplo `cluster_annotation.md` e `user_data.md`.

- `guideline/`
  - Guias e templates relacionados às anotações.

- `launcher/`
  - Scripts de inicialização: `start.sh`, `status.sh`, `stop.sh`, `common.sh` e `Dockerfile` de apoio.
  - Use esses scripts para iniciar o sistema localmente ou com Docker.

- `notebooks/`
  - Notebooks Jupyter com experimentos, análise e ferramentas auxiliares (anotador, matching, etc.).

- `reactpy-material/` e `reactpy-material-akira/`
  - Submódulos / módulos ReactPy usados pela interface. Observação: os READMEs locais foram consolidados neste README principal.

- `scripts/`
  - Scripts utilitários para extração, geração de embeddings, conversões e processamento, por exemplo: `generate_embbedings.py`, `extract_keyphrases.py`, `generate_keyphrases.py`.

- `src/`
  - Código-fonte Python principal, incluindo o pacote `keyphrase_curation` com a lógica do backend.

- `tests/`
  - Testes unitários e fixtures para validar componentes principais.

- Arquivos importantes no root do backend:
  - `.env.template` → modelo de variáveis de ambiente (copiar para `.env`).
  - `requirements.txt` → dependências Python para instalação.
  - `pyproject.toml` → metadados do pacote Python.
  - `package.json` → dependências/ tarefas JS (se necessário para submódulos front-end).
  - `run.py` → ponto de entrada auxiliar (se presente) para execução direta.
  - `openapi.json` → especificação da API (se usada pela interface).

<a id="configuracao"></a>
Configuração
-------------

- Copie `.env.template` para `.env` e ajuste variáveis (portas, caminhos, credenciais de serviços externos, chaves de API de LLMs, etc.).
- Copie `dataset/attributions.template.toml` para `dataset/attributions.toml` e ajuste conforme o projeto.
- Se o projeto usa submódulos Git, inicialize-os:

```bash
git submodule update --init --recursive
```

<a id="execucao-e-comandos-uteis"></a>
Execução e comandos úteis
------------------------

- Iniciar local (interativo): `bash launcher/start.sh local`
- Iniciar com Docker: `bash launcher/start.sh docker`
- Parar: `bash launcher/stop.sh`
- Status: `bash launcher/status.sh`
- Ativar ambiente Python manualmente (sem launcher): veja a seção "Inicialização manual".

<a id="desenvolvimento-e-testes"></a>
Desenvolvimento
---------------

- Instale as dependências de desenvolvimento do `requirements.txt`.
- Rode os testes com pytest (ex.: `pytest -q`).
- Para desenvolvimento front-end nos submódulos, consulte os respectivos diretórios `reactpy-material/` e `reactpy-material-akira/`.

<a id="notas-finais--boas-praticas"></a>
Notas finais / boas práticas
---------------------------

- Mantenha as variáveis sensíveis fora do repositório — use `.env` local e não commite esse arquivo.
- Use `launcher/` para fluxos repetíveis de inicialização e debugging.
- Se for executar em produção com Docker, garanta que as variáveis de ambiente e volumes estejam bem configurados.

<a id="contatos-e-referencias"></a>
Contatos e referências
----------------------

Caso precise de mais informações sobre a arquitetura interna, consulte os arquivos em `docs/` e os notebooks em `notebooks/` para exemplos operacionais.

---

