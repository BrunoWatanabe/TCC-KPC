# KPC Spec-Kit

Framework do projeto KPC para desenvolvimento guiado por especificacao, modelagem e rastreabilidade. O objetivo e manter o alinhamento entre requisitos, modelos, implementacao, testes e validacao de qualidade, seguindo o protocolo experimental descrito em [protocolo-geral](../relatorios/protocolos/protocolo-geral.md).

Este arquivo e a documentacao principal do Spec-Kit. Os READMEs antigos em subpastas foram consolidados aqui para evitar duplicidade e facilitar a navegacao.

## Sumario

- [1. Visao geral](#1-visao-geral)
- [2. Inicializacao](#2-inicializacao)
  - [2.1 Requisitos](#21-requisitos)
  - [2.2 Setup manual](#22-setup-manual)
  - [2.3 Fluxo inicial do framework](#23-fluxo-inicial-do-framework)
- [3. Como usar](#3-como-usar)
  - [3.1 Criar uma feature](#31-criar-uma-feature)
  - [3.2 Planejar](#32-planejar)
  - [3.3 Implementar](#33-implementar)
  - [3.4 Validar](#34-validar)
  - [3.5 Converter tarefas em issues](#35-converter-tarefas-em-issues)
- [4. Estrutura do Spec-Kit](#4-estrutura-do-spec-kit)
  - [4.1 Arquivos da raiz](#41-arquivos-da-raiz)
  - [4.2 .github](#42-github)
  - [4.3 .specify](#43-specify)
  - [4.4 docs](#44-docs)
  - [4.5 qa](#45-qa)
  - [4.6 Diagramas e rastreabilidade](#46-diagramas-e-rastreabilidade)
- [5. Agentes](#5-agentes)
- [6. Fases do projeto](#6-fases-do-projeto)
- [7. Comandos e scripts uteis](#7-comandos-e-scripts-uteis)

<a id="1-visao-geral"></a>
## 1. Visao geral

O Spec-Kit organiza o trabalho em torno de quatro pilares:

1. Especificacao estruturada com templates reutilizaveis.
2. Modelagem formal com PlantUML e convencoes de rastreabilidade.
3. Agentes especializados para arquiteto, desenvolvimento e QA.
4. Validacao continua com relatorios, metadados e convencoes de nomenclatura.
5. Fluxo por sprint e por commit com gate de QA e evidencias de alinhamento.

O framework esta integrado ao ecossistema KPC e conversa com o backend em [kpc-backend](../kpc-backend) e o frontend em [kpc-frontend](../kpc-frontend).

<a id="2-inicializacao"></a>
## 2. Inicializacao

<a id="21-requisitos"></a>
### 2.1 Requisitos

Antes de usar o Spec-Kit, garanta que os componentes basicos do ambiente estejam disponiveis:

- Git.
- VS Code.
- GitHub Copilot ou o conjunto de agentes configurado no repositorio.
- PlantUML e Graphviz, se for gerar ou validar diagramas localmente.
- O repositorio KPC ja clonado no workspace.

<a id="22-setup-manual"></a>
### 2.2 Setup manual

Se o ambiente ainda nao estiver preparado, o caminho basico e abrir o projeto e conferir a estrutura principal:

```bash
cd TCC-KPC/kpc-spec-kit
ls
```

Se estiver inicializando o workspace a partir do projeto maior, verifique se as pastas do KPC estao disponiveis:

```bash
cd TCC-KPC
ls
```

Os artefatos mais importantes do Spec-Kit ficam na raiz deste diretorio, em [docs](docs), [qa](qa) e [.specify](.specify).

<a id="23-fluxo-inicial-do-framework"></a>
### 2.3 Fluxo inicial do framework

O ponto de partida recomendado e este ciclo:

1. Ler esta visao geral e o detalhamento dos arquivos principais.
2. Seguir as instrucoes dos agentes em [.github/agents](.github/agents).
3. Usar os templates em [.specify/templates](.specify/templates) para criar spec, tasks, acceptance e traceability.
4. Validar o alinhamento com os relatorios em [qa/reports](qa/reports).

<a id="3-como-usar"></a>
## 3. Como usar

<a id="31-criar-uma-feature"></a>
### 3.1 Criar uma feature

Use o fluxo de especificacao quando surgir uma nova funcionalidade:

```bash
cp .specify/templates/kpc-spec-initial.md specs/<feature>/spec.md
cp .specify/templates/kpc-tasks-initial.md specs/<feature>/tasks.md
cp .specify/templates/kpc-traceability-initial.md specs/<feature>/traceability.md
cp .specify/templates/kpc-acceptance-initial.md specs/<feature>/acceptance.md
```

O objetivo e partir de templates consistentes e preencher:

- requisitos funcionais e nao funcionais;
- diagramas PlantUML;
- rastreabilidade entre requisitos, modelos, codigo e testes;
- criterios de aceitacao.

<a id="32-planejar"></a>
### 3.2 Planejar

Depois da especificacao, o fluxo segue para a decomposicao do trabalho.

Ferramentas e artefatos relevantes:

- [docs/FASE3_INTEGRACAO.md](docs/FASE3_INTEGRACAO.md): integracao SDD + MDE.
- [.github/agents/developer.md](.github/agents/developer.md): orienta a criacao de tasks e a implementacao.
- [.specify/scripts/bash/setup-plan.sh](.specify/scripts/bash/setup-plan.sh): prepara o plano de implementacao.
- [.specify/scripts/bash/setup-tasks.sh](.specify/scripts/bash/setup-tasks.sh): prepara a decomposicao em tarefas.

<a id="33-implementar"></a>
### 3.3 Implementar

O desenvolvedor deve seguir o plano e os agentes definidos no repositorio.

Passos tipicos:

1. Ler a spec aprovada.
2. Gerar ou atualizar tasks.md.
3. Implementar o codigo com rastreabilidade.
4. Criar testes unitarios e de integracao conforme necessario.

<a id="34-validar"></a>
### 3.4 Validar

A validacao e feita com o agente de QA e com os relatorios de alinhamento.

Use os artefatos abaixo:

- [.github/agents/qa.md](.github/agents/qa.md): instrucoes de validacao.
- [qa/reports](qa/reports): relatorios e saidas de alinhamento.
- [docs/FASE5_METRICAS.md](docs/FASE5_METRICAS.md): leitura executiva das metricas.
- [METRICAS-ALINHAMENTO.md](METRICAS-ALINHAMENTO.md): definicao tecnica das metricas.
- A validacao cobre os grupos A, B, C e D do protocolo geral.

<a id="35-converter-tarefas-em-issues"></a>
### 3.5 Converter tarefas em issues

O framework tambem inclui automacao para transformar tarefas em issues quando necessario, usando os prompts e agentes de integracao em [.github/prompts](.github/prompts) e [.github/agents](.github/agents).

<a id="4-estrutura-do-spec-kit"></a>
## 4. Estrutura do Spec-Kit

<a id="41-arquivos-da-raiz"></a>
### 4.1 Arquivos da raiz

- [README.md](README.md): visao geral rapida do framework.
- [AGENTS.md](AGENTS.md): governanca e coordenacao dos agentes.
- [SPEC-KIT-README.md](SPEC-KIT-README.md): documentacao completa do Spec-Kit.
- [STATUS-PROJETO.md](STATUS-PROJETO.md): status geral das fases e andamento.
- [MODELS.md](MODELS.md): definicao dos modelos PlantUML oficiais.
- [TRACEABILITY-CONVENTIONS.md](TRACEABILITY-CONVENTIONS.md): convencoes de rastreabilidade.
- [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md): padroes de nomenclatura.
- [METRICAS-ALINHAMENTO.md](METRICAS-ALINHAMENTO.md): definicao tecnica das metricas.

<a id="42-github"></a>
### 4.2 .github

- [.github/copilot-instructions.md](.github/copilot-instructions.md): instrucoes globais para o Copilot.
- [.github/agents/architect.md](.github/agents/architect.md): agente arquiteto.
- [.github/agents/developer.md](.github/agents/developer.md): agente desenvolvedor.
- [.github/agents/qa.md](.github/agents/qa.md): agente de QA.
- [.github/agents/speckit.*](.github/agents): agentes especializados da propria extensao do framework.
- [.github/prompts/speckit.*](.github/prompts): prompts correspondentes aos agentes e fluxos.

<a id="43-specify"></a>
### 4.3 .specify

Esse e o diretorio operacional do framework.

- [.specify/templates](.specify/templates): templates iniciais de spec, tasks, acceptance, traceability, plan e constitution.
- [.specify/scripts/bash](.specify/scripts/bash): scripts de suporte para verificacao de prerequisitos, criacao de feature, setup de plan e setup de tasks.
- [.specify/extensions](.specify/extensions): extensoes e integracoes do Spec-Kit.
- [.specify/integrations](.specify/integrations): manifests de integracao.
- [.specify/workflows](.specify/workflows): definicao dos fluxos de trabalho.
- [.specify/diagrams](.specify/diagrams): diagramas e artefatos gerados.

<a id="44-docs"></a>
### 4.4 docs

Documentacao por fase e guias estruturais do framework.

- [docs/FASE1_ESTRUTURA.md](docs/FASE1_ESTRUTURA.md): fase 1, estrutura inicial.
- [docs/FASE2_AGENTES.md](docs/FASE2_AGENTES.md): fase 2, sistema de agentes.
- [docs/FASE3_INTEGRACAO.md](docs/FASE3_INTEGRACAO.md): fase 3, integracao SDD + MDE.
- [docs/FASE5_METRICAS.md](docs/FASE5_METRICAS.md): fase 5, metricas de alinhamento.
- [docs/AGENTS.md](docs/AGENTS.md): complementos de governanca.
- [relatorios/protocolos/protocolo-geral.md](../relatorios/protocolos/protocolo-geral.md): base experimental e criterios de avaliacao.
- [docs/MODELS.md](docs/MODELS.md): detalhamento adicional dos modelos.
- [docs/NAMING-CONVENTIONS.md](docs/NAMING-CONVENTIONS.md): padroes de nomeacao.
- [docs/TRACEABILITY-CONVENTIONS.md](docs/TRACEABILITY-CONVENTIONS.md): rastreabilidade.
- [docs/STATUS-PROJETO.md](docs/STATUS-PROJETO.md): acompanhamento do status.

<a id="45-qa"></a>
### 4.5 qa

- [qa/reports](qa/reports): relatorios de qualidade, alinhamento e validacao.

<a id="46-diagramas-e-rastreabilidade"></a>
### 4.6 Diagramas e rastreabilidade

Os artefatos centrais de modelagem sao:

- [MODELS.md](MODELS.md): descreve os modelos de Use Case, Class, Sequence e Component.
- [TRACEABILITY-CONVENTIONS.md](TRACEABILITY-CONVENTIONS.md): liga requisitos, modelos, codigo e testes.
- [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md): padrao para nomes de arquivos, requisitos e entidades.

<a id="5-agentes"></a>
## 5. Agentes

O framework usa tres papeis principais:

1. Arquiteto: define a especificacao, diagramas e rastreabilidade.
2. Desenvolvedor: transforma a especificacao em tasks, codigo e testes.
3. QA: valida alinhamento, detecta divergencias e emite relatorios.

Leituras recomendadas:

- [.github/agents/architect.md](.github/agents/architect.md)
- [.github/agents/developer.md](.github/agents/developer.md)
- [.github/agents/qa.md](.github/agents/qa.md)
- [AGENTS.md](AGENTS.md)

<a id="6-fases-do-projeto"></a>
## 6. Fases do projeto

Resumo do estado do framework:

- Fase 1: estrutura inicial.
- Fase 2: sistema de agentes.
- Fase 3: integracao SDD + MDE.
- Fase 5: metricas de alinhamento.
- Fases 4, 6, 7, 8 e 9: evolucao futura, automacao, pesquisa e consolidacao.

Detalhes completos estao em [STATUS-PROJETO.md](STATUS-PROJETO.md).

<a id="7-comandos-e-scripts-uteis"></a>
## 7. Comandos e scripts uteis

### Scripts bash do Spec-Kit

Os scripts em [.specify/scripts/bash](.specify/scripts/bash) cobrem o fluxo principal do framework:

- [check-prerequisites.sh](.specify/scripts/bash/check-prerequisites.sh): valida prerequisitos e documentos disponiveis.
- [create-new-feature.sh](.specify/scripts/bash/create-new-feature.sh): cria o esqueleto de uma nova feature.
- [setup-plan.sh](.specify/scripts/bash/setup-plan.sh): prepara o plano de implementacao.
- [setup-tasks.sh](.specify/scripts/bash/setup-tasks.sh): prepara a decomposicao em tarefas.

### Comandos de uso pratico

```bash
# verificar prerequisitos da feature
./.specify/scripts/bash/check-prerequisites.sh --help

# criar nova feature
./.specify/scripts/bash/create-new-feature.sh "Adicionar autenticacao no fluxo"

# preparar plano
./.specify/scripts/bash/setup-plan.sh

# preparar tarefas
./.specify/scripts/bash/setup-tasks.sh
```

### Fluxo recomendado no VS Code

1. Abrir a feature branch ou a area de trabalho do KPC.
2. Gerar a spec com os templates do Spec-Kit.
3. Criar o plano e as tasks.
4. Implementar e validar com os agentes.
