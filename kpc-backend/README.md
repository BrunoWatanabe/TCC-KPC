# Keyphrase Curation

Annotation tool to curate keyphrases

## Functionalities
* Extraction of keyphrases with some tools:
   * Keybert
   * Rake
   * Spacy
   * TextRank
   * Yake
* Generation of keyphrases using prompts using GPT
* Annotation support with Sentence Bert:
   * Keyphrase similarity
   * Cluster similarity
   * Centroid similarity
* Management of annotation process:
   * Separated profiles: annotator and adjudicator
   * Authentication of users
   * Attribution of tasks to users
   * Control of pipeline:
      * Keyphrase Clustering
      * Cluster Selection
      * Keyphrase Selection

## Requirements
* Python == 3.9
* PIP >= 20.3.4

## Setup

Download source code with git:
```bash
git clone https://gitlab.com/ivato/argument-mapping/keyphrase_curation
```

Create virtual environment:
```bash
cd keyphrase_curation
python3 -m venv venv
source venv/bin/activate
```

Install requirements:

```bash
pip install -r requirements.txt
```

Make this installation as an editable package
```bash
pip install -e .
# With this command, executables and libraries is available for the system, preventing setting of PYTHONPATH variable
```

Install reactpy-material module:
```bash
cd keyphrase_curation
git submodule add https://github.com/williamneto/reactpy-material
cd reactpy-material
pip install -e .
```

## Configuration

Copy and edit .env file
```bash
cp .env.template .env
# edit the config variables
```

Copy and edit attributions.toml file
```bash
cd dataset
cp attributions.template.toml attributions.toml
# edit and change the settings
```

## Execution

For interactive execution, run:
```bash
bash launcher/start.sh local
```

Finally, you can open your browser in URL:
* https://localhost:3132


### Background execution

For background execution, run:
```bash
bash launcher/start.sh local
```

If you want to show execution status, run:
```bash
bash launcher/status.sh
```

If you want to stop execution, run:
```bash
bash launcher/stop.sh
```

## Novo inicializador

Um launcher organizado foi adicionado em `launcher/` com duas opcoes:

```bash
bash launcher/start.sh local
bash launcher/start.sh docker
```

Se voce chamar `bash launcher/start.sh` sem argumento, um menu interativo pergunta qual modo usar.

O modo Docker faz verificacoes antes de subir: confirma `docker`, testa o daemon e inicializa os submodulos e arquivos de ambiente quando necessario.

Os arquivos legados `start`, `status`, `stop`, `Dockerfile` e `docker-compose.yml` do root foram removidos para manter o backend centralizado em `launcher/`.
