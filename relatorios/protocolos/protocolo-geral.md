# Protocolo de Pesquisa

**UNIVERSIDADE FEDERAL DE GOIÁS — INSTITUTO DE INFORMÁTICA — CIÊNCIA DA COMPUTAÇÃO**

**DISCIPLINA:** Projeto Final de Curso 2

**PROFESSOR:** Marcelo Akira Inuzuka

**PARTICIPANTES:** Daired

**DATA ATUALIZAÇÃO:** 20/05/2026

**Versão:** 4.0 (Escopo Reduzido)

**Status:** Protocolo inicial a ser revisado.

---

## Sumário

1. [Informações Gerais](#informações-gerais)
2. [Contextualização e Motivação](#contextualização-e-motivação)
3. [Objetivos](#objetivos)
4. [Questões de Pesquisa](#questões-de-pesquisa)
5. [Método de Pesquisa](#método-de-pesquisa)
6. [Participantes](#participantes)
7. [Variáveis de Controle](#variáveis-de-controle)
8. [Variáveis Independentes](#variáveis-independentes)
9. [Variáveis Dependentes](#variáveis-dependentes)
10. [Avaliação e Métricas](#avaliação-e-métricas)
    - [Grupo A — Qualidade do Agente QA](#grupo-a--métricas-de-qualidade-do-agente-qa)
    - [Grupo B — Alinhamento Modelo-Código](#grupo-b--métricas-de-alinhamento-modelo-código)
11. [Hipóteses](#hipóteses)
12. [Materiais](#materiais)
13. [Estratégias de Construção do Prompt](#estratégias-de-construção-do-prompt)
14. [Tarefas Executadas](#tarefas-executadas)
15. [Fontes de Extração de Dados Não Humanos](#fontes-de-extração-de-dados-não-humanos)
16. [Checklists para Coleta de Dados Humanos](#checklists-para-coleta-de-dados-humanos)
    - [Checklist 1 — Audiência do QA](#checklist-1--avaliação-de-audiência-do-agente-qa)
    - [Checklist 2 — Alinhamento Modelo-Código](#checklist-2--avaliação-de-alinhamento-modelo-código)
    - [Checklist 3 — Configuração do Experimento](#checklist-3--registro-de-configuração-do-experimento)
17. [Síntese das Métricas por Sprint](#síntese-das-métricas-por-sprint)
18. [Benefícios e Contribuições Esperadas](#benefícios-e-contribuições-esperadas)
19. [Limitações e Ameaças à Validade](#limitações-e-ameaças-à-validade)
20. [Referências](#referências)

---

## Informações Gerais

| Campo | Descrição |
|-------|-----------|
| **TÍTULO** | Modernização da Engenharia Orientada a Modelos com Auxílio de Agentes de IA e Desenvolvimento Orientado a Especificações – Um Estudo Experimental sobre Qualidade de Agente de QA e Alinhamento Modelo-Código |
| **TEMA** | Estudo empírico experimental sobre a combinação de Engenharia Orientada a Modelos (MDE), Desenvolvimento Orientado a Especificações (SDD) e um pipeline de três agentes de IA (Arquiteto, Developer e QA) para produção de código frontend, com foco na avaliação da eficácia do Agente QA e no alinhamento entre modelo e código. |
| **DESCRIÇÃO** | O intuito deste estudo consiste em investigar a eficácia do Agente QA na detecção de inconsistências entre modelo e código, bem como o nível de alinhamento alcançado pelo pipeline de agentes. Para isso, será realizado um experimento controlado em ciclos de sprint (Scrum), onde cada commit dispara o Agente QA, que verifica inconsistências, abre issues e bloqueia o merge até resolução. O escopo do estudo está delimitado à avaliação da qualidade do agente e do alinhamento modelo-código. |

---

## Contextualização e Motivação

O desenvolvimento de software assistido por Inteligência Artificial tem ganhado crescente atenção, especialmente com o avanço dos Modelos de Linguagem de Grande Escala (LLMs). No entanto, observou-se em projetos práticos que, na ausência de uma modelagem clara e de técnicas estruturadas de controle sobre o código gerado por IA, o desenvolvimento sofre atrasos significativos e perda de qualidade de código.

A Engenharia Orientada a Modelos (MDE) — que propõe o uso de modelos como artefatos centrais do desenvolvimento — perdeu espaço com a ascensão dos métodos ágeis. Contudo, o cenário atual com agentes de IA capazes de interpretar e gerar artefatos a partir de modelos resgata o potencial da MDE, especialmente quando combinada com o Desenvolvimento Orientado a Especificações (SDD).

Neste contexto, esta pesquisa propõe um pipeline de três agentes de IA:

1. **Agente Arquiteto**: trabalha colaborativamente com o aluno para produzir e refinar o modelo UML (PlantUML).
2. **Agente Developer**: trabalha colaborativamente com o aluno para gerar código frontend a partir do modelo.
3. **Agente QA**: atua como mecanismo de verificação contínua, detectando inconsistências entre modelo e código.

O foco deste estudo está na **avaliação da eficácia do Agente QA** e no **alinhamento entre modelo e código** alcançado pelo pipeline.

---

## Objetivos

### Objetivo Geral

Avaliar a eficácia do Agente QA na detecção de inconsistências entre modelo e código, bem como o nível de alinhamento alcançado pelo pipeline de agentes de IA (Arquiteto, Developer e QA) baseado em MDE+SDD.

### Objetivo GQM (Goal-Question-Metric)

Esta pesquisa busca **analisar** o pipeline de agentes de IA com MDE+SDD com o propósito de **avaliar** a eficácia do Agente QA e o alinhamento entre modelo e código sob a perspectiva de **pesquisadores e desenvolvedores** no contexto de um **experimento controlado com ciclos de sprint**.

---

## Questões de Pesquisa

### QP1: O Agente QA é eficaz na detecção de inconsistências entre modelo e código, apresentando alta precisão e revocação?

**Rationale:** Ao responder a esta pergunta, espera-se avaliar o desempenho do Agente QA como mecanismo de controle de qualidade, identificando seus acertos (TP e TN) e erros (FP e FN), bem como sua capacidade de discriminar corretamente entre inconsistências legítimas e decisões conscientes.

### QP2: Qual é o nível de alinhamento entre modelo e código alcançado pelo pipeline de agentes, e como esse alinhamento evolui ao longo das sprints?

**Rationale:** Espera-se que a resposta forneça evidências sobre a capacidade do modelo gerado colaborativamente de servir como "âncora" para o desenvolvimento, bem como sobre a eficácia do Agente QA em manter a consistência entre modelo e código ao longo do tempo, medido por métricas de cobertura, precisão, divergência semântica e over-engineering.

---

## Método de Pesquisa

**Experimento controlado**, pois o objetivo é estabelecer uma relação entre o uso do pipeline de agentes de IA com MDE+SDD (variável independente) e as métricas de eficácia do Agente QA e alinhamento modelo-código (variáveis dependentes). O experimento ocorrerá em ciclos de sprint (Scrum), com duração estimada de 1 a 2 semanas cada.

---

## Participantes

### Grupo 1 — Desenvolvedores (Alunos Pesquisadores)

| Papel | Responsabilidade |
|-------|------------------|
| Agente Arquiteto + Aluno X | Modelagem colaborativa do frontend utilizando UML textual (PlantUML) |
| Agente Developer + Aluno Daired | Codificação colaborativa do frontend a partir do modelo estabelecido |

**Critérios de inclusão:** Conhecimento avançado em desenvolvimento frontend, experiência prévia com UML, disponibilidade para todas as sprints.

### Grupo 2 — Avaliadores (Árbitros Humanos)

| Papel | Responsabilidade |
|-------|------------------|
| Professores Orientadores | Validar as decisões do Agente QA nas audiências, atuando como árbitros humanos |

**Critérios de inclusão:** Experiência comprovada em Engenharia de Software (mínimo 5 anos), conhecimento em MDE, SDD e metodologias ágeis.

**Número de participantes esperado:** 2 desenvolvedores + 2 a 3 avaliadores.

---

## Variáveis de Controle

| Variável | Estratégia de Controle |
|----------|------------------------|
| Casos de uso e requisitos | Fixo para todas as sprints; documentado previamente |
| Linguagem de programação | Definida antes do início do experimento |
| Ferramenta de modelagem | PlantUML fixa durante todo o experimento |
| Processo de desenvolvimento | Scrum com sprints de duração fixa |
| Ambiente de desenvolvimento | Configurado antes do início |

---

## Variáveis Independentes

| Variável | Níveis/Tratamentos |
|----------|---------------------|
| Pipeline de agentes de IA | **Com pipeline** (tratamento experimental) vs. **Sem pipeline** (controle) |

---

## Variáveis Dependentes

| Variável | Métrica Associada |
|----------|-------------------|
| Eficácia do Agente QA | Precisão; recall; F1-score; taxas de FP e FN; concordância |
| Alinhamento modelo-código | Cobertura do modelo; precisão da implementação; divergência semântica; over-engineering |

---

## Avaliação e Métricas

---

### Grupo A — Métricas de Qualidade do Agente QA

---

#### A1: Matriz de Confusão do QA

| Cenário | Nome | Descrição |
|---------|------|-----------|
| **TP** | Verdadeiro Positivo | QA detectou inconsistência que realmente existe |
| **TN** | Verdadeiro Negativo | QA não detectou inconsistência onde não existe |
| **FP** | Falso Positivo | QA detectou inconsistência que não existia |
| **FN** | Falso Negativo | QA não detectou inconsistência que existia |

**Fonte dos dados:** [Checklist 1 — Avaliação de Audiência do Agente QA](#checklist-1--avaliação-de-audiência-do-agente-qa) (itens AUD-06, AUD-07, AUD-08, AUD-09)

---

#### A2: Precisão do QA (Precision)

`Precisão = TP / (TP + FP)`

**Target:** ≥ 0,85

**Fonte dos dados:** [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) (contagem de TP e FP)

---

#### A3: Revocação do QA (Recall)

`Recall = TP / (TP + FN)`

**Target:** ≥ 0,80

**Fonte dos dados:** [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) (contagem de TP e FN)

---

#### A4: F1-Score do QA

`F1 = 2 × (Precisão × Recall) / (Precisão + Recall)`

**Target:** ≥ 0,82

**Fonte dos dados:** Calculado a partir das métricas A2 e A3

---

#### A5: Taxa de Falso Negativo (FNR)

`FNR = FN / (TP + FN)`

**Target:** ≤ 0,20

**Fonte dos dados:** [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) (itens onde QA não detectou inconsistência existente)

---

#### A6: Taxa de Falso Positivo (FPR)

`FPR = FP / (FP + TN)`

**Target:** ≤ 0,15

**Fonte dos dados:** [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) (itens onde QA detectou inconsistência inexistente)

---

#### A7: Taxa de Concordância na Audiência

`Concordância = (Veredictos alinhados com árbitros) / (Total de audiências)`

**Target:** ≥ 0,80

**Fonte dos dados:** [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) (item AUD-08)

---

#### A8: Qualidade da Justificativa (Rubrica 0–4)

| Pontuação | Descrição |
|-----------|-----------|
| 0 | Sem justificativa |
| 1 | Justificativa vaga ou irrelevante |
| 2 | Justificativa parcialmente coerente |
| 3 | Justificativa coerente e bem fundamentada |
| 4 | Justificativa excelente com evidências |

**Target:** ≥ 3

**Fonte dos dados:** [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) (item AUD-13, com cálculo ponderado)

---

### Grupo B — Métricas de Alinhamento Modelo-Código

---

#### B1: Cobertura do Modelo

`Cobertura = (Elementos implementados / Elementos modelados) × 100`

| Status | Range |
|--------|-------|
| 🟢 Excelente | 95–100% |
| 🟡 Aceitável | 80–94% |
| 🔴 Crítico | < 80% |

**Fonte dos dados:** [Checklist 2 — Avaliação de Alinhamento Modelo-Código](#checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-03 a ALI-09)

---

#### B2: Precisão da Implementação

`Precisão = (Implementações corretas / Implementações totais) × 100`

| Status | Range |
|--------|-------|
| 🟢 Excelente | 90–100% |
| 🟡 Aceitável | 75–89% |
| 🔴 Crítico | < 75% |

**Fonte dos dados:** [Checklist 2](#checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-10 a ALI-12)

---

#### B3: Divergência Semântica

`Divergência = (Comportamentos divergentes / Total de implementações) × 100`

| Status | Range |
|--------|-------|
| 🟢 Excelente | 0% |
| 🟡 Aceitável | 1–5% |
| 🔴 Crítico | > 5% |

**Fonte dos dados:** [Checklist 2](#checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-13 a ALI-15)

---

#### B4: Over-Engineering

`Over-Engineering = (Código não modelado / Total de código) × 100`

| Status | Range |
|--------|-------|
| 🟢 Excelente | 0–10% |
| 🟡 Aceitável | 11–20% |
| 🔴 Crítico | > 20% |

**Fonte dos dados:** [Checklist 2](#checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-16 a ALI-18) + [NE-03](#fonte-ne-03-parser-de-código-fonte-ast)

---

#### B5: Score Geral de Alinhamento

`Score = (Cobertura × 0,35) + (Precisão × 0,35) + ((100 − Divergência) × 0,20) + ((100 − Over-Engineering) × 0,10)`

| Range | Status |
|-------|--------|
| 90–100 | 🟢 Excelente |
| 75–89 | 🟡 Bom |
| 60–74 | 🟠 Inadequado |
| < 60 | 🔴 Crítico |

**Fonte dos dados:** Calculado a partir das métricas B1, B2, B3, B4

---

#### B6: Rastreabilidade

`Rastreabilidade = (RFs com cadeia completa RF→Modelo→Código) / (Total de RFs) × 100`

**Target:** ≥ 90%

**Fonte dos dados:** [Checklist 2](#checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-20 a ALI-22)

---

## Hipóteses

### H01 (Hipótese Nula — Agente QA)
O Agente QA não apresenta precisão e revocação superiores a 0,80 na detecção de inconsistências entre modelo e código.

### HA1 (Hipótese Alternativa — Agente QA)
O Agente QA apresenta precisão e revocação superiores a 0,80 na detecção de inconsistências entre modelo e código.

### H02 (Hipótese Nula — Alinhamento)
O pipeline de agentes não produz alinhamento modelo-código com score superior a 75 (nível "Bom").

### HA2 (Hipótese Alternativa — Alinhamento)
O pipeline de agentes produz alinhamento modelo-código com score superior a 75 (nível "Bom").

---

## Materiais

| Material | Descrição |
|----------|-----------|
| Repositório Git | Versionamento e rastreabilidade |
| Sistema de issues | GitHub Issues ou Jira |
| PlantUML | Diagramas UML textuais |
| Framework frontend | React com TypeScript |
| Análise estática | ESLint, Prettier, SonarQube |
| Scripts de automação | Cálculo automático de métricas |
| Agentes de IA | API com prompts padronizados |

---

## Estratégias de Construção do Prompt

| Agente | Estratégia |
|--------|-----------|
| Arquiteto | Few-shot com exemplos de diagramas; prompt em português; iterativo |
| Developer | Few-shot com exemplos de código; contexto inclui modelo UML |
| QA | Zero-shot inicial; aprendizado com audiências |

---

## Tarefas Executadas

### Por Sprint

| Tarefa | Responsável |
|--------|-------------|
| Planejamento da sprint | Ambos alunos |
| Modelagem | Agente Arquiteto + Aluno X |
| Codificação | Agente Developer + Aluno Daired |
| Commit | Aluno Daired |
| Verificação do QA | Agente QA |
| Audiência | Agentes + Professores |
| Resolução de issues | Alunos |
| Merge | Alunos |
| Revisão final | Ambos + Professores |

---

## Fontes de Extração de Dados Não Humanos

Este capítulo descreve as fontes automatizadas de coleta de dados que **não dependem de intervenção humana**, utilizadas para alimentar as métricas dos Grupos A e B.

---

### Fonte NE-01: Logs do Agente QA

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Registros automáticos gerados pelo Agente QA durante a verificação de inconsistências. |
| **Dados extraídos** | ID do commit verificado, inconsistências detectadas (tipo, localização, severidade), veredicto inicial. |
| **Métricas relacionadas** | [A1 a A8 (todas as métricas do Grupo A)](#grupo-a--métricas-de-qualidade-do-agente-qa) |
| **Ferramenta de extração** | Sistema de logging do Agente QA (saída em JSON) |
| **Script de automação** | `scripts/extract-qa-logs.py` |
| **Frequência de coleta** | A cada execução do Agente QA (trigger por commit) |
| **Local de armazenamento** | Banco de dados de métricas (`qa_audits` table) |

---

### Fonte NE-02: Parser de Modelos UML (PlantUML)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Script para extrair elementos dos diagramas PlantUML (classes, métodos, atributos, relacionamentos). |
| **Dados extraídos** | Lista de classes, métodos por classe, atributos por classe, tipos de relacionamento, parâmetros de métodos. |
| **Métricas relacionadas** | [B1 (Cobertura do Modelo)](#b1-cobertura-do-modelo), [B2 (Precisão)](#b2-precisão-da-implementação), [B6 (Rastreabilidade)](#b6-rastreabilidade) |
| **Ferramenta de extração** | Python com regex e parsing de texto estruturado (PlantUML) |
| **Script de automação** | `scripts/parse-plantuml.py` |
| **Frequência de coleta** | A cada atualização do modelo (início e fim de sprint) |
| **Local de armazenamento** | Arquivo JSON (`model_elements_<sprint>.json`) |

---

### Fonte NE-03: Parser de Código Fonte (AST)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Script para extrair elementos do código fonte via Análise de Sintaxe Abstrata (AST). |
| **Dados extraídos** | Lista de classes, métodos, atributos, parâmetros, tipos de retorno. |
| **Métricas relacionadas** | [B1 (Cobertura)](#b1-cobertura-do-modelo), [B2 (Precisão)](#b2-precisão-da-implementação), [B4 (Over-Engineering)](#b4-over-engineering) |
| **Ferramenta de extração** | `tree-sitter` (TypeScript/JavaScript) |
| **Script de automação** | `scripts/parse-code-ast.py` |
| **Frequência de coleta** | A cada commit (via CI) e ao final de cada sprint |
| **Local de armazenamento** | Arquivo JSON (`code_elements_<commit>.json`) |

---

### Resumo das Fontes de Dados Não Humanos

| ID da Fonte | Nome | Métricas que Alimenta | Automação |
|-------------|------|----------------------|-----------|
| NE-01 | Logs do Agente QA | A1 a A8 | Script |
| NE-02 | Parser PlantUML | B1, B2, B6 | Script |
| NE-03 | Parser AST de Código | B1, B2, B4 | Script |

---

## Checklists para Coleta de Dados Humanos

---

### Checklist 1 — Avaliação de Audiência do Agente QA

*Preenchido pelos professores (árbitros humanos) para cada inconsistência detectada.*

| ID | Item | Resposta |
|----|------|----------|
| AUD-01 | ID da inconsistência | __________ |
| AUD-02 | Sprint | __________ |
| AUD-03 | Data/hora | __________ |
| AUD-04 | Componente/arquivo | __________ |
| AUD-05 | Tipo de inconsistência | ☐ Sintaxe ☐ Semântica ☐ Estrutural ☐ Comportamental |
| AUD-06 | QA classificou corretamente o tipo? | ☐ Sim ☐ Não |
| AUD-07 | Veredicto do QA | ☐ Inconsistência legítima ☐ Decisão consciente |
| AUD-08 | Árbitro concorda? | ☐ Sim ☐ Não |
| AUD-09 | Se discordou, seu veredicto | ☐ Inconsistência legítima ☐ Decisão consciente |
| AUD-10 | Argumento do Arquiteto foi coerente? (1-5) | __ |
| AUD-11 | Argumento do Developer foi coerente? (1-5) | __ |
| AUD-12 | Houve consenso entre os agentes? | ☐ Sim ☐ Não ☐ Parcial |
| AUD-13 | Qualidade da justificativa final (0-4) | __ |
| AUD-14 | Evidências apresentadas | ☐ Modelo ☐ Código ☐ Especificação ☐ Nenhuma |
| AUD-15 | Tempo da audiência (minutos) | __ |
| AUD-16 | Comentários adicionais | __________ |

---

### Checklist 2 — Avaliação de Alinhamento Modelo-Código

*Preenchido pelos alunos com validação dos professores.*

| ID | Item | Valor | Fonte |
|----|------|-------|-------|
| ALI-01 | Sprint | __________ | - |
| ALI-02 | Componente/módulo | __________ | - |
| ALI-03 | Classes modeladas | __ | [NE-02](#fonte-ne-02-parser-de-modelos-uml-plantuml) |
| ALI-04 | Classes implementadas | __ | [NE-03](#fonte-ne-03-parser-de-código-fonte-ast) |
| ALI-05 | Métodos modelados | __ | [NE-02](#fonte-ne-02-parser-de-modelos-uml-plantuml) |
| ALI-06 | Métodos implementados | __ | [NE-03](#fonte-ne-03-parser-de-código-fonte-ast) |
| ALI-07 | Atributos modelados | __ | [NE-02](#fonte-ne-02-parser-de-modelos-uml-plantuml) |
| ALI-08 | Atributos implementados | __ | [NE-03](#fonte-ne-03-parser-de-código-fonte-ast) |
| ALI-09 | Cobertura do modelo (B1) | __% | Calculado |
| ALI-10 | Implementações corretas | __ | Validação manual |
| ALI-11 | Total de implementações | __ | [NE-03](#fonte-ne-03-parser-de-código-fonte-ast) |
| ALI-12 | Precisão da implementação (B2) | __% | Calculado |
| ALI-13 | Comportamentos divergentes | __ | Validação manual |
| ALI-14 | Divergência semântica (B3) | __% | Calculado |
| ALI-15 | Lista de divergências identificadas | __________ | Validação manual |
| ALI-16 | Linhas de código não modeladas | __ LOC | [NE-03](#fonte-ne-03-parser-de-código-fonte-ast) |
| ALI-17 | Linhas de código totais | __ LOC | [NE-03](#fonte-ne-03-parser-de-código-fonte-ast) |
| ALI-18 | Over-Engineering (B4) | __% | Calculado |
| ALI-19 | Score Geral de Alinhamento (B5) | __ | Calculado |
| ALI-20 | Total de RFs no escopo | __ | Documento de requisitos |
| ALI-21 | RFs com rastreabilidade completa | __ | [NE-02](#fonte-ne-02-parser-de-modelos-uml-plantuml) + [NE-03](#fonte-ne-03-parser-de-código-fonte-ast) |
| ALI-22 | Rastreabilidade (B6) | __% | Calculado |

---

### Checklist 3 — Registro de Configuração do Experimento

*Preenchido antes do início e atualizado quando houver mudanças.*

| ID | Item | Valor | Data |
|----|------|-------|------|
| CFG-01 | Versão do Agente Arquiteto | __________ | ______ |
| CFG-02 | Versão do Agente Developer | __________ | ______ |
| CFG-03 | Versão do Agente QA | __________ | ______ |
| CFG-04 | Temperatura dos LLMs | __________ | ______ |
| CFG-05 | max_tokens | __________ | ______ |
| CFG-06 | Versão do prompt (Arquiteto) | __________ | ______ |
| CFG-07 | Versão do prompt (Developer) | __________ | ______ |
| CFG-08 | Versão do prompt (QA) | __________ | ______ |
| CFG-09 | Framework frontend | __________ | ______ |
| CFG-10 | Versão do framework | __________ | ______ |
| CFG-11 | Linguagem de programação | __________ | ______ |
| CFG-12 | Ferramenta de modelagem | PlantUML | ______ |
| CFG-13 | Repositório Git (URL) | __________ | ______ |
| CFG-14 | Sistema de issues | __________ | ______ |
| CFG-15 | Duração da sprint (dias) | __ | ______ |
| CFG-16 | Total de sprints planejadas | __ | ______ |

---

## Síntese das Métricas por Sprint

| Grupo | Métrica | Target | Valor | Status | Fonte |
|-------|---------|--------|-------|--------|-------|
| A | Precisão do QA | ≥ 0,85 | __ | 🟢/🔴 | [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) |
| A | Recall do QA | ≥ 0,80 | __ | 🟢/🔴 | [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) |
| A | F1-Score | ≥ 0,82 | __ | 🟢/🔴 | [NE-01](#fonte-ne-01-logs-do-agente-qa) |
| A | Concordância | ≥ 0,80 | __ | 🟢/🔴 | [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-qa) |
| B | Cobertura do Modelo | ≥ 95% | __ | 🟢/🟡/🔴 | [Checklist 2](#checklist-2--avaliação-de-alinhamento-modelo-código) |
| B | Precisão da Implementação | ≥ 90% | __ | 🟢/🟡/🔴 | [Checklist 2](#checklist-2--avaliação-de-alinhamento-modelo-código) |
| B | Score Geral | ≥ 75 | __ | 🟢/🟡/🔴/🔴 | Calculado |

---

## Benefícios e Contribuições Esperadas

| Benefício | Descrição |
|-----------|-----------|
| Evidência empírica | Sobre a eficácia de agentes de IA como mecanismos de QA em pipelines MDE+SDD |
| Protocolo replicável | Para avaliação de agentes de QA em tarefas de verificação de consistência |
| Métricas validadas | Conjunto de métricas para avaliação de agentes de IA como "juízes" de consistência |
| Compreensão do alinhamento | Identificação dos fatores que afetam o alinhamento modelo-código |

---

## Limitações e Ameaças à Validade

### Ameaças à validade interna

| Ameaça | Mitigação |
|--------|-----------|
| Vazamento/contaminação de dados | Especificações originais; documentar versões |
| Viés dos pesquisadores | Prompts baseados em literatura; registrar versões |
| Efeito Hawthorne | Baseline com desenvolvimento sem pipeline |

### Ameaças à validade externa

| Ameaça | Mitigação |
|--------|-----------|
| Generalização | Reconhecer limitação; discutir transferabilidade |
| Especificidade dos participantes | Reconhecer limitação; sugerir replicações |

### Ameaças à validade de constructo

| Ameaça | Mitigação |
|--------|-----------|
| Operacionalização inadequada | Métricas validadas na literatura |
| Efeito de testes | Incluir baseline; tratar aprendizado como variável |

### Ameaças à validade de conclusão

| Ameaça | Mitigação |
|--------|-----------|
| Natureza não determinística dos LLMs | Reportar versões, datas, parâmetros; pacote de replicação |
| Pequeno tamanho amostral | Reconhecer; tratar como evidências exploratórias |
| Confiabilidade da avaliação humana | Rubrica detalhada; múltiplos avaliadores |

---

## Referências

[1] SHULL, Forrest; SINGER, Janice; SJØBERG, Dag I. K. (eds.). *Guide to Advanced Empirical Software Engineering*. London: Springer-Verlag, 2008.

[2] WOHLIN, Claes et al. *Experimentation in Software Engineering*. Berlin: Springer, 2012.

[3] BALTES, Sebastian et al. *Guidelines for Empirical Studies in Software Engineering involving Large Language Models*. 2025. arXiv:2508.15503.

[4] TEIXEIRA, E.; FONSECA, L.; SOARES, S. Threats to validity in controlled experiments in software engineering. In: *SBES 2018*. ACM, 2018. p. 52-61.

[5] BASILI, Victor R.; SHULL, Forrest; LANUBILE, Filippo. Building knowledge through families of experiments. *IEEE TSE*, v. 25, n. 4, p. 456-473, 1999.

[6] KITCHENHAM, Barbara et al. Preliminary guidelines for empirical research in software engineering. *IEEE TSE*, v. 28, n. 8, p. 721-734, 2002.

---

**Data de elaboração:** 20/05/2026
**Versão:** 4.0 (Escopo Reduzido)
**Status:** Protocolo para revisão do orientador