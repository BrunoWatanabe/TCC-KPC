# Protocolo de Pesquisa

**UNIVERSIDADE FEDERAL DE GOIÁS — INSTITUTO DE INFORMÁTICA — CIÊNCIA DA COMPUTAÇÃO**

**DISCIPLINA:** Projeto Final de Curso 2

**PROFESSOR:** Marcelo Akira Inuzuka

**PARTICIPANTES:** Daired

---

## Sumario

1. [Informacoes Gerais](#1-informacoes-gerais)
2. [Contextualizacao e Motivacao](#2-contextualizacao-e-motivacao)
   - 2.1 [O Problema do Codigo Gerado por IA sem Estrutura](#21-o-problema-do-codigo-gerado-por-ia-sem-estrutura)
   - 2.2 [O Resgate da Engenharia Orientada a Modelos (MDE)](#22-o-resgate-da-engenharia-orientada-a-modelos-mde)
   - 2.3 [A Lacuna: Integracao entre MDE, SDD e Agentes de IA](#23-a-lacuna-integracao-entre-mde-sdd-e-agentes-de-ia)
   - 2.4 [O Pipeline Proposto: Spec-Kit com Quatro Personas de IA](#24-o-pipeline-proposto-spec-kit-com-quatro-personas-de-ia)
   - 2.5 [Caso de Uso: Keyphrase Curation Platform (KPC)](#25-caso-de-uso-keyphrase-curation-platform-kpc)
   - 2.6 [Delineamento Experimental](#26-delineamento-experimental)
3. [Objetivos](#3-objetivos)
   - 3.1 [Objetivo Geral](#31-objetivo-geral)
   - 3.2 [Objetivo GQM (Goal-Question-Metric)](#32-objetivo-gqm-goal-question-metric)
4. [Questoes de Pesquisa](#4-questoes-de-pesquisa)
   - 4.1 [QP1: Eficacia do Pipeline de Verificacao (Policia e Juiz)](#41-qp1-eficacia-do-pipeline-de-verificacao-policia-e-juiz)
   - 4.2 [QP2: Evolucao das Inconsistencias entre Rodadas](#42-qp2-evolucao-das-inconsistencias-entre-rodadas)
5. [Metodo de Pesquisa](#5-metodo-de-pesquisa)
   - 5.1 [Tipo de Pesquisa](#51-tipo-de-pesquisa)
   - 5.2 [Estrutura do Experimento](#52-estrutura-do-experimento)
   - 5.3 [Pipeline de Verificacao (Objeto de Estudo)](#53-pipeline-de-verificacao-objeto-de-estudo)
   - 5.4 [Sistema de Rodadas](#54-sistema-de-rodadas)
   - 5.5 [Instrumentos e Materiais](#55-instrumentos-e-materiais)
   - 5.6 [Procedimento](#56-procedimento)
6. [Participantes](#6-participantes)
   - 6.1 [Humano Piloto](#61-humano-piloto)
   - 6.2 [Participacao Futura](#62-participacao-futura)
7. [Os Agentes do Pipeline](#7-os-agentes-do-pipeline)
8. [Variaveis do Experimento](#8-variaveis-do-experimento)
   - 8.1 [Variavel Independente](#81-variavel-independente)
   - 8.2 [Variaveis Dependentes](#82-variaveis-dependentes)
   - 8.3 [Variaveis de Controle](#83-variaveis-de-controle)
9. [Avaliacao e Metricas](#9-avaliacao-e-metricas)
   - 9.1 [Matriz de Classificacao da Policia](#91-matriz-de-classificacao-da-policia)
   - 9.2 [Matriz de Decisao do Juiz](#92-matriz-de-decisao-do-juiz)
   - 9.3 [Metricas Extraiveis dos Artefatos](#93-metricas-extraiveis-dos-artefatos)
     - 9.3.1 [Metricas de Evidencias (Policia)](#931-metricas-de-evidencias-policia)
     - 9.3.2 [Metricas de Vereditos (Juiz)](#932-metricas-de-vereditos-juiz)
     - 9.3.3 [Metricas de Processo](#933-metricas-de-processo)
   - 9.4 [Metricas com Arbitros Humanos (Trabalho Futuro)](#94-metricas-com-arbitros-humanos-trabalho-futuro)
     - 9.4.1 [Metricas da Policia (Matriz VP/FP/FN/VN)](#941-metricas-da-policia-matriz-vpfpfnvn)
     - 9.4.2 [Metricas do Juiz (Matriz DE/AE/AMBOS/NE)](#942-metricas-do-juiz-matriz-deaeambosne)
10. [Hipotese](#10-hipotese)
    - 10.1 [H1: Capacidade de Deteccao (Policia)](#101-h1-capacidade-de-deteccao-policia)
    - 10.2 [H2: Capacidade de Decisao (Juiz)](#102-h2-capacidade-de-decisao-juiz)
    - 10.3 [H3: Iteratividade do Pipeline](#103-h3-iteratividade-do-pipeline)
11. [Materiais](#11-materiais)
12. [Estrategia de Construcao das Personas](#12-estrategia-de-construcao-das-personas)
13. [Fontes de Extracao de Dados Nao Humanos](#13-fontes-de-extracao-de-dados-nao-humanos)
14. [Checklists para Coleta de Dados Humanos](#14-checklists-para-coleta-de-dados-humanos)
    - 14.1 [Checklist da Policia - Evidencias Apontadas (VP/FP)](#141-checklist-da-policia---evidencias-apontadas-vpfp)
    - 14.2 [Checklist da Policia - Evidencias Nao Apontadas (FN/VN)](#142-checklist-da-policia---evidencias-nao-apontadas-fnvn)
    - 14.3 [Checklist do Juiz (DE/AE/AMBOS/NE)](#143-checklist-do-juiz-deaeambosne)
15. [Contribuicoes Esperadas](#15-contribuicoes-esperadas)
16. [Limitacoes e Ameacas a Validade](#16-limitacoes-e-ameacas-a-validade)
    - 16.1 [Ameacas a Validade Interna](#161-ameacas-a-validade-interna)
    - 16.2 [Ameacas a Validade Externa](#162-ameacas-a-validade-externa)
    - 16.3 [Ameacas a Validade de Constructo](#163-ameacas-a-validade-de-constructo)
    - 16.4 [Ameacas a Validade de Conclusao](#164-ameacas-a-validade-de-conclusao)
17. [Referencias](#17-referencias)

---

## 1. Informacoes Gerais

| Campo | Descricao |
|-------|-----------|
| **TITULO** | Integracao entre Engenharia Orientada a Modelos e Desenvolvimento Orientado a Especificacoes com Suporte de Agentes de IA: Um Estudo Experimental sobre o Pipeline Spec-Kit com Quatro Personas para Verificacao de Consistencia em uma Plataforma de Curadoria de Keyphrases |
| **TEMA** | Estudo empirico experimental sobre a integracao entre Engenharia Orientada a Modelos (MDE) e Desenvolvimento Orientado a Especificacoes (SDD), mediada pelo framework Spec-Kit e por quatro agentes de IA especializados (Arquiteto, Developer, Policia, Juiz), aplicada a uma plataforma real de curadoria de keyphrases (KPC). O estudo investiga a eficacia do pipeline como um todo na producao de codigo frontend e backend, com enfase na avaliacao do sistema de verificacao de inconsistencias entre modelo UML e codigo implementado, bem como o nivel de alinhamento alcancado entre ambos ao longo de multiplos ciclos de desenvolvimento. |
| **DESCRICAO** | O presente estudo tem por objetivo investigar a eficacia de um pipeline de desenvolvimento que integra o framework Spec-Kit (Spec-Driven Development) a quatro personas de IA especializadas -- Arquiteto (modelagem UML), Developer (implementacao fiel ao modelo), Policia (coleta de evidencias de inconsistencias) e Juiz (julgamento fundamentado) -- para a producao de codigo em uma plataforma real de curadoria de keyphrases (KPC). O experimento foi conduzido em tres ciclos de sprint, cada um representando uma abordagem distinta: (i) duas sprints utilizando o pipeline completo MDE+SDD com Spec-Kit e as quatro personas; (ii) uma sprint utilizando exclusivamente o GitHub Copilot sem metodologia formal, seguida de analise retroativa com as quatro personas. O estudo delimita-se a avaliacao da qualidade do pipeline de verificacao (Policia + Juiz) por meio de metricas como precisao, revocacao, taxa de acerto do juiz e concordancia com arbitros humanos, bem como o alinhamento modelo-codigo mensurado por cobertura do modelo, precisao da implementacao, divergencia semantica, over-engineering e rastreabilidade. |
| **ABORDAGEM** | MDE (Model-Driven Engineering) combinada com SDD (Spec-Driven Development), utilizando o framework Spec-Kit como ferramenta pratica de orquestracao do pipeline, integrando quatro personas de IA (Arquiteto, Developer, Policia, Juiz) como camada adicional de comportamento sobre os comandos nativos do Spec-Kit. |
| **CASO DE USO** | KPC (Keyphrase Curation Platform) -- uma plataforma de curadoria de keyphrases com backend FastAPI e frontend React + MVVM, que oferece extracao, geracao, clustering, anotacao colaborativa e adjudicacao de keyphrases em textos argumentativos sobre oito topicos (aborto, clonagem, pena de morte, controle de armas, legalizacao da maconha, salario minimo, energia nuclear, uniformes escolares). |
| **FERRAMENTA PRINCIPAL** | Spec-Kit (framework open-source da GitHub para Spec-Driven Development), integrado a quatro arquivos de instrucao de agentes de IA (`persona-arquiteto.md`, `persona-developer.md`, `persona-policia.md`, `persona-juiz.md`) que definem o comportamento especializado de cada persona no pipeline. |
| **PARTICIPANTE** | Humano piloto unico (Daired), responsavel por operar o pipeline Spec-Kit, acionar os comandos nativos, interagir com as quatro personas de IA e conduzir o experimento nos tres ciclos de sprint. |
| **SPRINTS** | Tres sprints: Sprint 01 (MDE+SDD com Spec-Kit - refatoracao do componente de Login), Sprint 02 (MDE+SDD com Spec-Kit - correcao de serializacao numpy no backend), Sprint 03 (Copilot sem metodologia + analise retroativa com Spec-Kit - correcao de ordenacao, labels e pareamento). |

---

## 2. Contextualizacao e Motivacao

### 2.1 O Problema do Codigo Gerado por IA sem Estrutura

O desenvolvimento de software assistido por Inteligencia Artificial tem ganhado
crescente atencao, especialmente com o avanco dos Modelos de Linguagem de Grande
Escala (LLMs). Ferramentas como GitHub Copilot, ChatGPT e outras oferecem
capacidade sem precedentes de geracao de codigo a partir de descricoes em
linguagem natural, aumentando significativamente a produtividade dos
desenvolvedores em tarefas rotineiras.

No entanto, observou-se em projetos praticos que, na ausencia de uma modelagem
clara e de tecnicas estruturadas de controle sobre o codigo gerado por IA, o
desenvolvimento sofre atrasos significativos e perda de qualidade de codigo.
Problemas como duplicacao de funcionalidades, implementacao de codigo nao
solicitado (over-engineering), inconsistencia arquitetural e falta de
rastreabilidade entre requisitos e implementacao tornam-se frequentes. A
ausencia de uma "ancora" que mantenha o codigo alinhado a especificacao e ao
projeto arquitetural leva a um crescimento desordenado da base de codigo,
dificultando a manutencao e evolucao do sistema.

### 2.2 O Resgate da Engenharia Orientada a Modelos (MDE)

A Engenharia Orientada a Modelos (MDE) -- que propoe o uso de modelos como
artefatos centrais do desenvolvimento, a partir dos quais o codigo e derivado
de forma sistematica -- perdeu espaco com a ascensao dos metodos ageis e a
percepcao de que a modelagem detalhada seria custosa e de baixo retorno
pratico. Contudo, o cenario atual com agentes de IA capazes de interpretar e
gerar artefatos a partir de modelos resgata o potencial da MDE, especialmente
quando combinada com o Desenvolvimento Orientado a Especificacoes (SDD).

A SDD propoe que a especificacao -- e nao o codigo -- seja o artefato central
do desenvolvimento, funcionando como uma "fonte unica de verdade" a partir da
qual todos os demais artefatos (modelos, tarefas, codigo, testes) sao
derivados e verificados. Esta abordagem ganhou um impulso significativo com o
surgimento do Spec-Kit, um framework open-source desenvolvido pela GitHub que
fornece um conjunto de comandos nativos (especificacao, planejamento, geracao
de tarefas, implementacao e analise) para orquestrar o fluxo SDD.

### 2.3 A Lacuna: Integracao entre MDE, SDD e Agentes de IA

Apesar dos avancos individuais em cada uma destas areas, observa-se uma lacuna
na literatura e na pratica: a integracao sistematica entre MDE, SDD e agentes
de IA especializados em um pipeline coeso e reprodutivel. Especificamente, nao
foi encontrado um estudo que combine:

- Um **framework pratico de SDD** (Spec-Kit) como orquestrador do fluxo de
  desenvolvimento;
- **Quatro agentes de IA especializados** com responsabilidades distintas e
  complementares (Arquiteto para modelagem, Developer para implementacao fiel,
  Policia para coleta de evidencias de inconsistencia, Juiz para julgamento
  fundamentado);
- Um **sistema de rodadas iterativas** que permita a correcao progressiva de
  inconsistencias entre modelo e codigo ao longo de multiplos ciclos;
- Um **conjunto de metricas** para avaliar tanto a qualidade do pipeline de
  verificacao (Policia + Juiz) quanto o nivel de alinhamento entre modelo e
  codigo alcancado.

### 2.4 O Pipeline Proposto: Spec-Kit com Quatro Personas de IA

Neste contexto, esta pesquisa propoe e avalia um pipeline de desenvolvimento
que integra o framework Spec-Kit a quatro personas de IA especializadas,
criando um fluxo sistematico de especificacao, modelagem, implementacao e
verificacao em multiplas rodadas iterativas:

1. **Persona Arquiteto**: Ativada durante o comando `/speckit.plan`, e
   responsavel por traduzir requisitos funcionais em modelos UML precisos
   utilizando PlantUML, garantindo rastreabilidade entre cada elemento
   modelado e seu requisito funcional de origem por meio da tag `@rf:`.

2. **Persona Developer**: Ativada durante o comando `/speckit.implement`, e
   responsavel por traduzir os modelos UML em codigo funcional seguindo
   rigidamente o que foi modelado. O principio fundamental e o "zero
   over-engineering": nada e implementado sem contraparte no modelo. Cada
   arquivo de codigo recebe um marcador `// @model:` que referencia o diagrama
   de origem.

3. **Persona Policia**: Ativada durante o comando `/speckit.analyze`, e
   responsavel por investigar e documentar evidencias de inconsistencia entre
   o modelo UML e o codigo implementado. A Policia nao julga, nao decide e
   nao altera nenhum artefato -- apenas coleta evidencias estruturadas com
   localizacao exata (arquivo:linha), tipo de inconsistencia e severidade, e
   simula automaticamente os depoimentos do Arquiteto e do Developer sobre
   cada evidencia.

4. **Persona Juiz**: Ativada automaticamente apos a conclusao da investigacao
   da Policia, no mesmo comando `/speckit.analyze`, e responsavel por ler o
   relatorio de evidencias e proferir uma decisao fundamentada para cada
   evidencia. O Juiz utiliza uma arvore de decisao que considera quatro
   possibilidades: Developer Errado (DE), Arquiteto Errado (AE), Ambos
   Errados (AMBOS) ou Ninguem Errado (NE).

A principal inovacao deste pipeline e a **separacao das responsabilidades de
coleta de evidencias e de julgamento** em dois agentes distintos (Policia e
Juiz), permitindo uma avaliacao mais precisa e imparcial de cada etapa do
processo de verificacao de consistencia. Adicionalmente, o sistema opera em
**rodadas iterativas**: cada execucao do pipeline produz evidencias e
vereditos que se acumulam ao longo do tempo, e uma arvore de rastreamento
pai-filho conecta evidencias que persistem entre rodadas, permitindo
acompanhar a evolucao da correcao de inconsistencias.

### 2.5 Caso de Uso: Keyphrase Curation Platform (KPC)

Para viabilizar a avaliacao experimental do pipeline, este estudo utiliza a
Keyphrase Curation Platform (KPC) como caso de uso. A KPC e uma plataforma
real de curadoria de keyphrases, composta por:

- **Backend** (`kpc-backend/`): API REST implementada em Python com FastAPI,
  oferecendo endpoints para extracao, geracao, clustering, anotacao
  colaborativa e adjudicacao de keyphrases em textos argumentativos sobre oito
  topicos (aborto, clonagem, pena de morte, controle de armas, legalizacao da
  maconha, salario minimo, energia nuclear, uniformes escolares).
- **Frontend** (`kpc-frontend/`): Interface web implementada em React 18 com
  Vite 5 e Material UI 5, utilizando arquitetura MVVM (Model-View-ViewModel)
  com Zustand para gerenciamento de estado global e React Router para
  navegacao SPA.

A escolha da KPC como caso de uso justifica-se por sua complexidade moderada e
por sua arquitetura multicamadas (frontend + backend), que permite exercitar
todo o escopo de modelagem do Arquiteto e de implementacao do Developer em
ambas as frentes.

### 2.6 Delineamento Experimental

O experimento foi conduzido em tres ciclos de sprint, cada um representando
uma abordagem distinta:

- **Sprint 01 (MDE+SDD com Spec-Kit e 4 personas):** Refatoracao do componente
  de Login do frontend KPC para arquitetura MVVM, utilizando o pipeline
  completo com Spec-Kit e as quatro personas. Foram realizadas tres rodadas de
  analise (R1, R2, R3) ate que todas as evidencias fossem resolvidas.
- **Sprint 02 (MDE+SDD com Spec-Kit e 4 personas):** Correcao de um bug de
  serializacao numpy no backend (`PydanticSerializationError` para
  `numpy.int64`), utilizando o mesmo pipeline completo. Foram realizadas duas
  rodadas de analise (R1, R2).
- **Sprint 03 (Copilot sem metodologia + analise retroativa com Spec-Kit):**
  Correcoes de ordenacao, padronizacao de labels e agrupamento de pares
  reciprocos implementadas exclusivamente via chat com GitHub Copilot, sem
  metodologia formal. Posteriormente, aplicou-se analise retroativa com as
  quatro personas do Spec-Kit sobre os logs experimentais para gerar
  artefatos de modelagem, evidencias e vereditos, permitindo comparacao com
  as Sprints 01 e 02.

Este delineamento permite nao apenas avaliar a eficacia do pipeline MDE+SDD
com Spec-Kit e quatro personas, mas tambem compara-lo com uma abordagem
alternativa (Copilot sem metodologia), gerando evidencias sobre os beneficios
e limitacoes de cada estrategia.

---

## 3. Objetivos

### 3.1 Objetivo Geral

Avaliar a eficacia do pipeline de verificacao composto pelas personas Policia
(coleta de evidencias) e Juiz (julgamento fundamentado) na deteccao e decisao
sobre inconsistencias entre modelo UML e codigo implementado, no contexto de
um fluxo de desenvolvimento que integra MDE, SDD, o framework Spec-Kit e
quatro personas de IA especializadas (Arquiteto, Developer, Policia, Juiz).

### 3.2 Objetivo GQM (Goal-Question-Metric)

Esta pesquisa busca **analisar** o pipeline de verificacao (Policia + Juiz)
integrado ao framework Spec-Kit e as quatro personas com o proposito de
**avaliar** a capacidade do sistema de detectar e julgar inconsistencias
entre modelo e codigo sob a perspectiva de **pesquisadores** no contexto de
um **experimento controlado com ciclos de sprint** aplicado a uma plataforma
real de curadoria de keyphrases (KPC).

---

## 4. Questoes de Pesquisa

### 4.1 QP1: Eficacia do Pipeline de Verificacao (Policia e Juiz)

O pipeline composto pelas personas Policia (coleta de evidencias) e Juiz
(decisao fundamentada) e capaz de detectar e julgar corretamente inconsistencias
entre modelo UML e codigo implementado?

**Rationale:** Busca-se avaliar a capacidade do pipeline de verificacao em
produzir evidencias (Policia) e decisoes (Juiz) uteis para identificar
desalinhamentos entre o que foi modelado e o que foi implementado.

### 4.2 QP2: Evolucao das Inconsistencias entre Rodadas

Como as inconsistencias entre modelo e codigo evoluem ao longo de multiplas
rodadas de execucao do pipeline de verificacao?

**Rationale:** Busca-se verificar se o sistema de rodadas iterativas
(cumulativo, com arvore pai-filho) permite acompanhar a correcao progressiva
de inconsistencias ao longo do tempo, independentemente da abordagem de
desenvolvimento utilizada (MDE+SDD ou Copilot sem metodologia).

---

## 5. Metodo de Pesquisa

### 5.1 Tipo de Pesquisa

Pesquisa experimental controlada, conduzida por meio de estudo de caso unico
com a plataforma KPC como objeto de estudo. O experimento visa observar o
comportamento do pipeline de verificacao (Policia + Juiz) em diferentes
contextos de desenvolvimento, sem a pretensao de generalizacao estatistica.

### 5.2 Estrutura do Experimento

O experimento foi organizado em tres ciclos de sprint, cada um com uma
abordagem distinta:

| Ciclo | Abordagem | Escopo | Rodadas de Analise |
|-------|-----------|--------|-------------------|
| Sprint 01 | MDE+SDD com Spec-Kit e 4 personas | Refatoracao do componente de Login (frontend) | 3 rodadas (R1, R2, R3) |
| Sprint 02 | MDE+SDD com Spec-Kit e 4 personas | Correcao de serializacao numpy (backend) | 2 rodadas (R1, R2) |
| Sprint 03 | Copilot sem metodologia + analise retroativa | Correcao de ordenacao, labels e pareamento | 1 rodada cada tarefa |

### 5.3 Pipeline de Verificacao (Objeto de Estudo)

O objeto central do experimento e o pipeline de verificacao composto por duas
personas de IA:

1. **Persona Policia:** Responsavel por comparar o modelo UML (PlantUML) com
   o codigo implementado, coletando evidencias estruturadas de inconsistencia.
   Cada evidencia inclui tipo, severidade, localizacao exata (arquivo:linha)
   e depoimentos simulados do Arquiteto e do Developer.

2. **Persona Juiz:** Responsavel por analisar o relatorio de evidencias
   gerado pela Policia e proferir uma decisao fundamentada para cada
   evidencia, utilizando quatro categorias: Developer Errado (DE), Arquiteto
   Errado (AE), Ambos Errados (AMBOS) ou Ninguem Errado (NE).

Ambas as personas sao operadas por um mesmo humano piloto, que aciona os
comandos do Spec-Kit e interpreta os resultados.

### 5.4 Sistema de Rodadas

O pipeline opera em multiplas rodadas iterativas. A cada rodada:
- A Policia verifica se as evidencias da rodada anterior foram corrigidas;
- Evidencias corrigidas sao marcadas como RESOLVIDAS;
- Evidencias nao corrigidas persistem com novo ID e link `parent:` para a
  evidencia original;
- Novas evidencias sao adicionadas;
- O Juiz julga apenas as evidencias da rodada atual.

### 5.5 Instrumentos e Materiais

| Item | Descricao |
|------|-----------|
| Framework Spec-Kit | Comandos nativos: `constitution`, `specify`, `plan`, `tasks`, `implement`, `analyze` |
| Arquivos de persona | `persona-arquiteto.md`, `persona-developer.md`, `persona-policia.md`, `persona-juiz.md` |
| Modelagem UML | PlantUML para diagramas de classes, componentes e sequencia |
| Caso de uso | KPC (backend FastAPI + frontend React/MVVM) |
| Registro de dados | Artefatos em `evidence/inconsistencies.md` e `verdict/verdict.md` |

### 5.6 Procedimento

Para cada sprint, o procedimento executado foi:

1. **Constituicao:** Definir principios do projeto com `/speckit.constitution`.
2. **Especificacao:** Gerar requisitos funcionais com `/speckit.specify`.
3. **Planejamento:** Planejar a sprint e modelar diagramas UML com o Arquiteto
   via `/speckit.plan`.
4. **Tarefas:** Gerar tarefas estruturadas com `/speckit.tasks`.
5. **Implementacao:** Implementar o codigo com o Developer via
   `/speckit.implement`.
6. **Analise:** Executar a Policia e o Juiz automaticamente com
   `/speckit.analyze`, gerando evidencias e vereditos.
7. **Correcao:** Aplicar as correcoes indicadas pelos vereditos e repetir a
   analise ate que nao haja mais evidencias ou o criterio de parada seja
   atingido.

Para a Sprint 03, o procedimento foi:
1. Implementar as correcoes via chat com GitHub Copilot (sem Spec-Kit).
2. Aplicar a analise retroativa com as quatro personas do Spec-Kit sobre os
   logs experimentais.

## 6. Participantes

### 6.1 Humano Piloto

O experimento foi conduzido por um unico participante, o aluno-pesquisador
Daired, que desempenhou todos os papeis operacionais do pipeline:

| Papel | Responsabilidade |
|-------|------------------|
| Operador do Spec-Kit | Acionamento e interpretacao dos comandos nativos (`constitution`, `specify`, `plan`, `tasks`, `implement`, `analyze`) |
| Interlocutor do Arquiteto | Refinamento colaborativo dos diagramas UML (PlantUML) durante o `/speckit.plan` |
| Interlocutor do Developer | Conducao da implementacao do codigo a partir dos modelos durante o `/speckit.implement` |
| Operador da Policia | Execucao da varredura de evidencias de inconsistencia entre modelo e codigo |
| Operador do Juiz | Analise das evidencias e proferimento dos vereditos fundamentados |

O mesmo humano piloto operou tanto a Policia quanto o Juiz, garantindo
coerencia na interpretacao das evidencias e evitando variaveis de confusao
relacionadas a diferentes niveis de expertise entre operadores. A separacao
dos papeis e funcional (diferentes responsabilidades e protocolos), nao
operacional.

### 6.2 Participacao Futura

O protocolo original preve a participacao de arbitros humanos (professores
orientadores) para validar as decisoes do Juiz, atuando como uma segunda
instancia de avaliacao. Esta etapa nao foi executada neste experimento devido
a restricoes de tempo e escopo, sendo registrada como trabalho futuro.

**Número de participantes esperado:** 1 desenvolvedores + 2 a 3 avaliadores.

---

## 7. Os Agentes do Pipeline

As quatro personas de IA que compoem o pipeline ja foram descritas em detalhe
nas secoes anteriores. Esta secao apresenta apenas uma tabela-resumo dos
papeis, comandos e artefatos para consulta rapida.

| Persona | Comando Spec-Kit | Responsabilidade | Artefato Gerado |
|---------|------------------|------------------|-----------------|
| Arquiteto | `/speckit.plan` | Modelagem UML (PlantUML) com rastreabilidade `@rf:` | `model/*.puml` |
| Developer | `/speckit.implement` | Implementacao fiel ao modelo, zero over-engineering | Codigo com `// @model:` |
| Policia | `/speckit.analyze` | Coleta de evidencias de inconsistencia + depoimentos ARG-/DEP- | `evidence/inconsistencies.md` |
| Juiz | `/speckit.analyze` (automatico apos Policia) | Julgamento fundamentado (DE, AE, AMBOS, NE) | `verdict/verdict.md` |

**Nota:** A arvore de decisao do Juiz e o checklist de verificacao da Policia
estao detalhados nos arquivos de persona em `.github/prompts/`.

---

## 8. Variaveis do Experimento

### 8.1 Variavel Independente

A presenca ou ausencia do pipeline MDE+SDD com Spec-Kit e quatro personas
como abordagem de desenvolvimento:

| Nivel | Descricao | Sprints |
|-------|-----------|---------|
| Com pipeline | Uso do Spec-Kit + 4 personas (Arquiteto, Developer, Policia, Juiz) | Sprint 01, Sprint 02 |
| Sem pipeline | Uso exclusivo do GitHub Copilot via chat, sem metodologia formal | Sprint 03 |

### 8.2 Variaveis Dependentes

As metricas observadas sao as evidencias e vereditos produzidos pelo pipeline
de verificacao (Policia + Juiz):

- Quantidade e tipos de evidencias coletadas por rodada (NOVA, PERSISTE, RESOLVIDA)
- Distribuicao dos vereditos do Juiz (DE, AE, AMBOS, NE)
- Numero de rodadas necessarias para resolucao das inconsistencias

### 8.3 Variaveis de Controle

| Variavel | Estrategia |
|----------|------------|
| Caso de uso | KPC fixo para todas as sprints |
| Linguagens | Python (backend) e JavaScript/React (frontend) |
| Ferramenta de modelagem | PlantUML |
| Ambiente | Mesmo hardware e configuracao de software |
| Operador | Mesmo humano piloto (Daired) para todas as sprints |

---

## 9. Avaliacao e Metricas

### 9.1 Matriz de Classificacao da Policia

A Policia coleta evidencias de inconsistencia entre modelo e codigo. Cada
evidencia pode ser classificada conforme a matriz de confusao abaixo.

| Categoria | Codigo | O que ocorreu |
|-----------|--------|---------------|
| Verdadeiro Positivo | VP | A Policia apontou uma inconsistencia, e a inconsistencia realmente existia. |
| Falso Positivo | FP | A Policia apontou uma inconsistencia, mas a inconsistencia nao existia (falso alarme). |
| Falso Negativo | FN | A Policia nao apontou inconsistencia, mas a inconsistencia existia (omissao). |
| Verdadeiro Negativo | VN | A Policia nao apontou inconsistencia, e realmente nao havia inconsistencia. |

### 9.2 Matriz de Decisao do Juiz

O Juiz profere um veredito para cada evidencia, escolhendo entre quatro
possibilidades: DE (Developer Errado), AE (Arquiteto Errado), AMBOS (Ambos
Errados) ou NE (Ninguem Errado). A acuracia do Juiz e medida comparando seu
veredito com a decisao correta definida por um arbitro humano.

| Decisao do Juiz | Decisao Correta (Arbitro) | Resultado |
|-----------------|---------------------------|-----------|
| DE | DE | Acerto |
| DE | AE, AMBOS, NE | Erro |
| AE | AE | Acerto |
| AE | DE, AMBOS, NE | Erro |
| AMBOS | AMBOS | Acerto |
| AMBOS | DE, AE, NE | Erro |
| NE | NE | Acerto |
| NE | DE, AE, AMBOS | Erro |

### 9.3 Metricas Extraiveis dos Artefatos

As metricas a seguir sao calculadas diretamente dos arquivos gerados pelo
pipeline (`evidence/inconsistencies.md` e `verdict/verdict.md`), sem necessidade
de arbitros humanos.

#### 9.3.1 Metricas de Evidencias (Policia)

| ID | Metrica | Formula / Descricao | Fonte |
|----|---------|---------------------|-------|
| M1 | Volume de evidencias | Quantidade total de evidencias coletadas por sprint/rodada | [NE-01](#ne-01) |
| M2 | Volume por status | Quantidade de evidencias NOVAS, PERSISTEM, RESOLVIDAS por rodada | [NE-01](#ne-01) |
| M3 | Distribuicao por tipo | Proporcao de cada tipo de evidencia (METODO_AUSENTE, OVER_ENGINEERING, etc.) | [NE-01](#ne-01) |
| M4 | Distribuicao por severidade | Proporcao de evidencias ALTA, MEDIA, BAIXA | [NE-01](#ne-01) |
| M5 | Taxa de resolucao acumulada | Evidencias RESOLVIDAS / Total de evidencias (todas as rodadas) | [NE-01](#ne-01), [NE-02](#ne-02) |
| M6 | Taxa de persistencia | Evidencias PERSISTEM / Total de evidencias na rodada | [NE-01](#ne-01) |
| M7 | Arvore de evidencias | Mapeamento pai-filho entre evidencias que persistem entre rodadas | [NE-01](#ne-01) |

#### 9.3.2 Metricas de Vereditos (Juiz)

| ID | Metrica | Formula / Descricao | Fonte |
|----|---------|---------------------|-------|
| M8 | Volume de vereditos | Quantidade total de vereditos proferidos por sprint/rodada | [NE-02](#ne-02) |
| M9 | Distribuicao de vereditos | Proporcao de DE, AE, AMBOS, NE por sprint/rodada | [NE-02](#ne-02) |
| M10 | Vereditos por tipo de evidencia | Relacao entre o tipo de evidencia e o veredito correspondente | [NE-01](#ne-01), [NE-02](#ne-02) |
| M11 | Vereditos por severidade | Relacao entre a severidade da evidencia e o veredito correspondente | [NE-01](#ne-01), [NE-02](#ne-02) |

#### 9.3.3 Metricas de Processo

| ID | Metrica | Formula / Descricao | Fonte |
|----|---------|---------------------|-------|
| M12 | Numero de rodadas | Quantidade de rodadas necessarias para resolver todas as evidencias | [NE-01](#ne-01), [NE-02](#ne-02) |
| M13 | Ciclo vida da evidencia | Quantas rodadas cada evidencia leva para ser resolvida | [NE-01](#ne-01) |
| M14 | Taxa de reincidencia | Evidencias REABERTAS / Total de evidencias | [NE-01](#ne-01) |
| M15 | Densidade de evidencias | Evidencias coletadas / Quantidade de elementos modelados | [NE-01](#ne-01), [NE-03](#ne-03) |

### 9.4 Metricas com Arbitros Humanos (Trabalho Futuro)

As metricas a seguir dependem da participacao de arbitros humanos para
classificar cada evidencia/veredito segundo as matrizes das secoes 9.1 e 9.2,
utilizando os checklists da secao 14. Foram definidas no protocolo original
mas nao foram executadas neste experimento, sendo registradas como trabalho futuro.

#### 9.4.1 Metricas da Policia (Matriz VP/FP/FN/VN)

| ID | Metrica | Formula | Descricao | Fonte |
|----|---------|---------|-----------|-------|
| M16 | Precisao da Policia | VP / (VP + FP) | Proporcao de evidencias corretas entre todas que a Policia reportou | [CHK-POL-AP](#141-checklist-da-policia---evidencias-apontadas-vpfp) |
| M17 | Revocacao da Policia | VP / (VP + FN) | Proporcao de inconsistencias reais que a Policia conseguiu detectar | [CHK-POL-AP](#141-checklist-da-policia---evidencias-apontadas-vpfp) e [CHK-POL-NA](#142-checklist-da-policia---evidencias-nao-apontadas-fnvn) |
| M18 | Especificidade da Policia | VN / (VN + FP) | Proporcao de ausencias de inconsistencia corretamente identificadas | [CHK-POL-AP](#141-checklist-da-policia---evidencias-apontadas-vpfp) e [CHK-POL-NA](#142-checklist-da-policia---evidencias-nao-apontadas-fnvn) |
| M19 | F1-Score da Policia | 2 x (Precisao x Revocacao) / (Precisao + Revocacao) | Media harmonica entre precisao e revocacao | [CHK-POL-AP](#141-checklist-da-policia---evidencias-apontadas-vpfp) e [CHK-POL-NA](#142-checklist-da-policia---evidencias-nao-apontadas-fnvn) |
| M20 | Acerto global da Policia | (VP + VN) / (VP + VN + FP + FN) | Proporcao de acertos entre todas as decisoes da Policia | [CHK-POL-AP](#141-checklist-da-policia---evidencias-apontadas-vpfp) e [CHK-POL-NA](#142-checklist-da-policia---evidencias-nao-apontadas-fnvn) |
| M21 | Taxa de Falso Positivo | FP / (FP + VN) | Proporcao de alarmes falsos entre todas as ausencias reais | [CHK-POL-AP](#141-checklist-da-policia---evidencias-apontadas-vpfp) e [CHK-POL-NA](#142-checklist-da-policia---evidencias-nao-apontadas-fnvn) |
| M22 | Taxa de Falso Negativo | FN / (FN + VP) | Proporcao de omissoes entre todas as inconsistencias reais | [CHK-POL-AP](#141-checklist-da-policia---evidencias-apontadas-vpfp) e [CHK-POL-NA](#142-checklist-da-policia---evidencias-nao-apontadas-fnvn) |

#### 9.4.2 Metricas do Juiz (Matriz DE/AE/AMBOS/NE)

| ID | Metrica | Formula / Descricao | Descricao | Fonte |
|----|---------|---------------------|-----------|-------|
| M23 | Acerto global do Juiz | Vereditos corretos / Total de vereditos | Proporcao de vereditos que coincidem com a decisao correta do arbitro | [CHK-JUI](#143-checklist-do-juiz-deaeambosne) |
| M24 | Acerto por categoria | Vereditos corretos de cada tipo / Total de vereditos daquele tipo | Acerto especifico para DE, AE, AMBOS e NE | [CHK-JUI](#143-checklist-do-juiz-deaeambosne) |
| M25 | Matriz de confusao do Juiz | Tabela 4x4 cruzando veredito vs decisao correta | Permite identificar padroes de erro | [CHK-JUI](#143-checklist-do-juiz-deaeambosne) |
| M26 | Kappa de Cohen | Medida de concordancia ajustada ao acaso entre Juiz e arbitro | Nivel de concordancia alem do esperado pelo acaso | [CHK-JUI](#143-checklist-do-juiz-deaeambosne) |
| M27 | Taxa de Concordancia por Severidade | Proporcao de acertos do Juiz agrupada por severidade da evidencia (ALTA, MEDIA, BAIXA) | Avalia se o Juiz tem melhor desempenho em evidencias mais graves | [CHK-JUI](#143-checklist-do-juiz-deaeambosne) |
| M28 | Distribuicao de Vereditos por Tipo de Evidencia | Proporcao de cada veredito (DE, AE, AMBOS, NE) para cada tipo de evidencia | Identifica padroes de decisao do Juiz associados a cada tipo de inconsistencia | [CHK-JUI](#143-checklist-do-juiz-deaeambosne) |
| M29 | Proporcao de Vereditos "AMBOS" | Evidencias com veredito AMBOS / Total de evidencias | Indica a frequencia com que o Juiz atribui responsabilidade compartilhada | [CHK-JUI](#143-checklist-do-juiz-deaeambosne) |

---

## 10. Hipotese

### 10.1 H1: Capacidade de Deteccao (Policia)

A Policia e capaz de coletar evidencias de inconsistencia entre modelo UML
e codigo implementado, produzindo um relatorio estruturado com tipo,
severidade e localizacao dos desalinhamentos encontrados.

### 10.2 H2: Capacidade de Decisao (Juiz)

O Juiz e capaz de proferir vereditos fundamentados para cada evidencia
coletada, utilizando a arvore de decisao e os depoimentos ARG-/DEP- para
classificar a responsabilidade entre DE, AE, AMBOS ou NE.

### 10.3 H3: Iteratividade do Pipeline

O sistema de rodadas iterativas permite a resolucao progressiva de
inconsistencias, conforme evidenciado pela transicao de evidencias do
status PERSISTE para RESOLVIDA entre rodadas consecutivas.

---

## 11. Materiais

| Material | Descricao |
|----------|-----------|
| Spec-Kit | Framework open-source da GitHub para Spec-Driven Development (SDD), utilizado para orquestrar os comandos nativos do pipeline |
| GitHub Copilot | Assistente de codigo baseado em LLM, utilizado na Sprint 03 como abordagem sem metodologia |
| PlantUML | Ferramenta de modelagem UML textual, utilizada pelo Arquiteto para gerar diagramas de classes, componentes e sequencia |
| KPC (caso de uso) | Plataforma real de curadoria de keyphrases com backend FastAPI e frontend React+MVVM, utilizada como objeto de estudo |
| Arquivos de persona | Quatro arquivos Markdown (`persona-arquiteto.md`, `persona-developer.md`, `persona-policia.md`, `persona-juiz.md`) que definem o comportamento de cada agente de IA |
| VS Code | Ambiente de desenvolvimento integrado onde o experimento foi conduzido |
| Git | Sistema de versionamento para registro do historico de alteracoes e artefatos gerados |

---

## 12. Estrategia de Construcao das Personas

Cada persona de IA foi definida por meio de um arquivo Markdown de instrucoes
(`.github/prompts/persona-<nome>.md`) que especifica: proposito, responsabilidades,
regras, formato de entrada/saida e integracao com o Spec-Kit. Nao foram
utilizadas tecnicas de few-shot ou exemplos no prompt -- o comportamento
especializado de cada persona e guiado exclusivamente pelas instrucoes
contidas em seu arquivo.

| Persona | Arquivo | Comportamento Definido |
|---------|---------|------------------------|
| Arquiteto | `persona-arquiteto.md` | Modelagem UML com PlantUML, rastreabilidade `@rf:`, escopo frontend+backend |
| Developer | `persona-developer.md` | Implementacao fiel ao modelo, zero over-engineering, tags `@model:` |
| Policia | `persona-policia.md` | Coleta sistematica de evidencias, checklist de verificacao, depoimentos ARG-/DEP- |
| Juiz | `persona-juiz.md` | Arvore de decisao (DE, AE, AMBOS, NE), fundamentacao obrigatoria, sistema de rodadas |

Os arquivos completos de cada persona estao disponiveis em `.github/prompts/`.

---

## 13. Fontes de Extracao de Dados Nao Humanos

As fontes abaixo sao os artefatos gerados pelo pipeline dos quais as metricas
M1 a M15 (secao 9.3) sao extraidas diretamente, sem necessidade de arbitros.

| ID | Fonte | Conteudo | Metricas Associadas |
|----|-------|----------|---------------------|
| NE-01 {#ne-01} | `evidence/inconsistencies.md` | Evidencias coletadas pela Policia por sprint/rodada, com tipo, severidade, status (NOVA/PERSISTE/RESOLVIDA/REABERTA), arvore pai-filho e depoimentos ARG-/DEP- | M1, M2, M3, M4, M5, M6, M7, M10, M11, M12, M13, M14, M15 |
| NE-02 {#ne-02} | `verdict/verdict.md` | Vereditos proferidos pelo Juiz por sprint/rodada, com decisoes (DE, AE, AMBOS, NE) e fundamentacao | M5, M8, M9, M10, M11, M12, M13 |
| NE-03 {#ne-03} | `model/*.puml` | Diagramas UML (classes, componentes, sequencia) gerados pelo Arquiteto com tags `@rf:` | M15 |

---

## 14. Checklists para Coleta de Dados Humanos

### 14.1 Checklist da Policia - Evidencias Apontadas (VP/FP)

**Objetivo:** Classificar cada evidencia **apontada** pela Policia como Verdadeiro Positivo (VP) ou Falso Positivo (FP).

**Metricas associadas:** M16, M17, M18, M19, M20, M21, M22.

| Item | Pergunta | Resposta |
|------|----------|----------|
| EVD-ID | ID da evidencia analisada | __________ |
| POL-AP-01 | A inconsistencia apontada pela Policia realmente existia? | ( ) Sim (VP) ( ) Nao (FP) |
| POL-AP-02 | O tipo de inconsistencia atribuido pela Policia esta correto? | ( ) Sim ( ) Nao |
| POL-AP-03 | A localizacao (arquivo:linha) da evidencia esta precisa? | ( ) Sim ( ) Nao |

### 14.2 Checklist da Policia - Evidencias Nao Apontadas (FN/VN)

**Objetivo:** Para cada evidencia **nao apontada** pela Policia, classificar como Falso Negativo (FN) ou Verdadeiro Negativo (VN).

**Metricas associadas:** M17, M18, M19, M20, M21, M22.

| Item | Pergunta | Resposta |
|------|----------|----------|
| EVD-ID | ID da evidencia analisada (se aplicavel) ou descricao do ponto verificado | __________ |
| POL-NA-01 | Havia alguma inconsistencia real entre modelo e codigo neste ponto que a Policia **nao** detectou? | ( ) Sim (FN) ( ) Nao (VN) |
| POL-NA-02 | Se sim (FN), descreva a inconsistencia omitida: | __________ |
| POL-NA-03 | Se nao (VN), descreva brevemente o que foi verificado e considerado consistente: | __________ |
| POL-NA-04 | (arquivo:linha) Modelo | __________ |
| POL-NA-05 | (arquivo:linha) Código | __________ |

### 14.3 Checklist do Juiz (DE/AE/AMBOS/NE)

**Objetivo:** Avaliar a correcao da decisao do Juiz para cada evidencia.

**Metricas associadas:** M23, M24, M25, M26, M27, M28, M29.

| Item | Pergunta | Resposta |
|------|----------|----------|
| VER-ID | ID do veredito analisado | __________ |
| JUI-01 | Decisao proferida pelo Juiz | ( ) DE ( ) AE ( ) AMBOS ( ) NE |
| JUI-02 | Decisao correta (conforme arbitro) | ( ) DE ( ) AE ( ) AMBOS ( ) NE |
| JUI-03 | O Juiz utilizou corretamente as evidencias disponiveis? | ( ) Sim ( ) Parcialmente ( ) Nao |
| JUI-04 | O depoimento do Arquiteto (ARG-) foi considerado na decisao? | ( ) Sim ( ) Parcialmente ( ) Nao |
| JUI-05 | O depoimento do Developer (DEP-) foi considerado na decisao? | ( ) Sim ( ) Parcialmente ( ) Nao |
| JUI-06 | A decisao esta de acordo com a arvore de decisao definida? | ( ) Sim ( ) Nao |

---

## 15. Contribuicoes Esperadas

| Contribuicao | Descricao |
|--------------|-----------|
| Pipeline integrado MDE+SDD com 4 personas | Proposicao e demonstracao pratica de um pipeline que integra o framework Spec-Kit a quatro personas de IA especializadas, criando um fluxo sistematico de especificacao, modelagem, implementacao e verificacao |
| Separacao Policia/Juiz | Evidencias sobre a viabilidade de separar as responsabilidades de coleta de evidencias e de julgamento em dois agentes distintos no contexto de verificacao de consistencia entre modelo e codigo |
| Sistema de rodadas iterativas | Mecanismo cumulativo de rastreamento de evidencias entre rodadas (arvore pai-filho) que permite acompanhar a evolucao da correcao de inconsistencias |
| Conjunto de metricas | Definicao de metricas extraiveis dos artefatos do pipeline (M1 a M15) e metricas com arbitros humanos (M16 a M29) para avaliacao do pipeline de verificacao |
| Protocolo replicavel | Documentacao detalhada do delineamento experimental, materiais, instrumentos e procedimentos, permitindo reproducao e extensao por outros pesquisadores |
| Caso de uso real | Aplicacao do pipeline a uma plataforma real de curadoria de keyphrases (KPC), demonstrando sua viabilidade em um contexto de engenharia de software com complexidade moderada |

---

## 16. Limitacoes e Ameacas a Validade

### 16.1 Ameacas a Validade Interna

| Ameaca | Impacto |
|--------|---------|
| Unico operador | O mesmo humano piloto operou todas as personas (Arquiteto, Developer, Policia, Juiz), o que pode introduzir vies de interpretacao nas evidencias e vereditos |
| Natureza nao deterministicas dos LLMs | Diferentes execucoes do mesmo prompt podem produzir resultados distintos, afetando a reproducibilidade |
| Conhecimento preco do codigo | O operador ja conhecia o codigo base da KPC antes do experimento, o que pode ter influenciado as decisoes |

### 16.2 Ameacas a Validade Externa

| Ameaca | Impacto |
|--------|---------|
| Caso unico | O experimento foi aplicado a uma unica plataforma (KPC), limitando a generalizacao dos resultados para outros contextos |
| Unico participante | Resultados dependentes da experiencia e conhecimento de um unico individuo |
| Escopo limitado | Tres sprints com escopos especificos podem nao representar a diversidade de cenarios de desenvolvimento |

### 16.3 Ameacas a Validade de Constructo

| Ameaca | Impacto |
|--------|---------|
| Ausencia de arbitros humanos | As metricas M16 a M29 (precisao, revocacao, acerto do Juiz) nao foram calculadas por falta de avaliadores externos |
| Definicao de inconsistencia | A classificacao de uma divergencia como "inconsistencia" depende da interpretacao do operador, sem validacao externa |

### 16.4 Ameacas a Validade de Conclusao

| Ameaca | Impacto |
|--------|---------|
| Tamanho amostral reduzido | O numero de evidencias e vereditos coletados e insuficiente para analises estatisticas robustas |
| Ausencia de grupo controle | A comparacao entre abordagens (MDE+SDD vs. Copilot) e baseada em sprints diferentes com escopos distintos, nao em um controle pareado |

---

## 17. Referencias

[1] SHULL, Forrest; SINGER, Janice; SJØBERG, Dag I. K. (eds.). *Guide to Advanced Empirical Software Engineering*. London: Springer-Verlag, 2008.

[2] WOHLIN, Claes et al. *Experimentation in Software Engineering*. Berlin: Springer, 2012.

[3] BALTES, Sebastian et al. *Guidelines for Empirical Studies in Software Engineering involving Large Language Models*. 2025. arXiv:2508.15503.

[4] TEIXEIRA, E.; FONSECA, L.; SOARES, S. Threats to validity in controlled experiments in software engineering. In: *SBES 2018*. ACM, 2018. p. 52-61.

[5] BASILI, Victor R.; SHULL, Forrest; LANUBILE, Filippo. Building knowledge through families of experiments. *IEEE TSE*, v. 25, n. 4, p. 456-473, 1999.

[6] KITCHENHAM, Barbara et al. Preliminary guidelines for empirical research in software engineering. *IEEE TSE*, v. 28, n. 8, p. 721-734, 2002.

---