# Protocolo de Pesquisa

**UNIVERSIDADE FEDERAL DE GOIÁS — INSTITUTO DE INFORMÁTICA — CIÊNCIA DA COMPUTAÇÃO**

**DISCIPLINA:** Projeto Final de Curso 2

**PROFESSOR:** Marcelo Akira Inuzuka

**PARTICIPANTES:** Daired

**DATA ATUALIZAÇÃO:** 20/05/2026

**Versão:** 5.0 (Rubrica Padronizada)

**Status:** Protocolo para revisão do orientador

---

## Sumário

1. [Informações Gerais](#1-informações-gerais)
2. [Contextualização e Motivação](#2-contextualização-e-motivação)
3. [Objetivos](#3-objetivos)
   - 3.1 [Objetivo Geral](#31-objetivo-geral)
   - 3.2 [Objetivo GQM](#32-objetivo-gqm)
4. [Questões de Pesquisa](#4-questões-de-pesquisa)
   - 4.1 [QP1: Eficácia do Agente QA](#41-qp1-eficácia-do-agente-qa)
   - 4.2 [QP2: Alinhamento Modelo-Código](#42-qp2-alinhamento-modelo-código)
5. [Método de Pesquisa](#5-método-de-pesquisa)
6. [Participantes](#6-participantes)
   - 6.1 [Grupo 1 — Desenvolvedores](#61-grupo-1--desenvolvedores-alunos-pesquisadores)
   - 6.2 [Grupo 2 — Avaliadores](#62-grupo-2--avaliadores-árbitros-humanos)
7. [Variáveis de Controle](#7-variáveis-de-controle)
8. [Variáveis Independentes](#8-variáveis-independentes)
9. [Variáveis Dependentes](#9-variáveis-dependentes)
10. [Avaliação e Métricas](#10-avaliação-e-métricas)
    - 10.1 [Rubrica Padronizada (0-4)](#101-rubrica-padronizada-0-4)
    - 10.2 [Grupo A — Qualidade do Agente QA](#102-grupo-a--métricas-de-qualidade-do-agente-qa)
        - A1: Matriz de Confusão
        - A2: Precisão (Precision)
        - A3: Revocação (Recall)
        - A4: F1-Score
        - A5: Taxa de Falso Negativo (FNR)
        - A6: Taxa de Falso Positivo (FPR)
        - A7: Taxa de Concordância
        - A8: Qualidade da Justificativa
    - 10.3 [Grupo B — Alinhamento Modelo-Código](#103-grupo-b--métricas-de-alinhamento-modelo-código)
        - B1: Cobertura do Modelo
        - B2: Precisão da Implementação
        - B3: Divergência Semântica
        - B4: Over-Engineering
        - B5: Score Geral de Alinhamento
        - B6: Rastreabilidade
    - 10.4 [Resumo das Métricas](#104-resumo-das-métricas)
11. [Síntese das Métricas por Sprint](#11-síntese-das-métricas-por-sprint)
12. [Hipóteses](#12-hipóteses)
    - 12.1 [Hipótese Nula — Agente QA](#121-hipótese-nula--agente-qa)
    - 12.2 [Hipótese Alternativa — Agente QA](#122-hipótese-alternativa--agente-qa)
    - 12.3 [Hipótese Nula — Alinhamento](#123-hipótese-nula--alinhamento)
    - 12.4 [Hipótese Alternativa — Alinhamento](#124-hipótese-alternativa--alinhamento)
13. [Materiais](#13-materiais)
14. [Estratégias de Construção do Prompt](#14-estratégias-de-construção-do-prompt)
15. [Tarefas Executadas](#15-tarefas-executadas)
16. [Fontes de Extração de Dados Não Humanos](#16-fontes-de-extração-de-dados-não-humanos)
    - 16.1 [NE-01: Logs do Agente QA](#161-ne-01-logs-do-agente-qa)
    - 16.2 [NE-02: Parser de Modelos UML (PlantUML)](#162-ne-02-parser-de-modelos-uml-plantuml)
    - 16.3 [NE-03: Parser de Código Fonte (AST)](#163-ne-03-parser-de-código-fonte-ast)
    - 16.4 [Resumo das Fontes de Dados Não Humanos](#164-resumo-das-fontes-de-dados-não-humanos)
17. [Checklists para Coleta de Dados Humanos](#17-checklists-para-coleta-de-dados-humanos)
    - 17.1 [Checklist 1 — Audiência do QA](#171-checklist-1--avaliação-de-audiência-do-agente-qa)
    - 17.2 [Checklist 2 — Alinhamento Modelo-Código](#172-checklist-2--avaliação-de-alinhamento-modelo-código)
    - 17.3 [Checklist 3 — Configuração do Experimento](#173-checklist-3--registro-de-configuração-do-experimento)
18. [Benefícios e Contribuições Esperadas](#18-benefícios-e-contribuições-esperadas)
19. [Limitações e Ameaças à Validade](#19-limitações-e-ameaças-à-validade)
    - 19.1 [Ameaças à Validade Interna](#191-ameaças-à-validade-interna)
    - 19.2 [Ameaças à Validade Externa](#192-ameaças-à-validade-externa)
    - 19.3 [Ameaças à Validade de Constructo](#193-ameaças-à-validade-de-constructo)
    - 19.4 [Ameaças à Validade de Conclusão](#194-ameaças-à-validade-de-conclusão)
20. [Referências](#20-referências)

---

## 1. Informações Gerais

| Campo | Descrição |
|-------|-----------|
| **TÍTULO** | Modernização da Engenharia Orientada a Modelos com Auxílio de Agentes de IA e Desenvolvimento Orientado a Especificações – Um Estudo Experimental sobre Qualidade de Agente de QA e Alinhamento Modelo-Código |
| **TEMA** | Estudo empírico experimental sobre a combinação de Engenharia Orientada a Modelos (MDE), Desenvolvimento Orientado a Especificações (SDD) e um pipeline de três agentes de IA (Arquiteto, Developer e QA) para produção de código frontend, com foco na avaliação da eficácia do Agente QA e no alinhamento entre modelo e código. |
| **DESCRIÇÃO** | O intuito deste estudo consiste em investigar a eficácia do Agente QA na detecção de inconsistências entre modelo e código, bem como o nível de alinhamento alcançado pelo pipeline de agentes. Para isso, será realizado um experimento controlado em ciclos de sprint (Scrum), onde cada commit dispara o Agente QA, que verifica inconsistências, abre issues e bloqueia o merge até resolução. O escopo do estudo está delimitado à avaliação da qualidade do agente e do alinhamento modelo-código. |

---

## 2. Contextualização e Motivação

O desenvolvimento de software assistido por Inteligência Artificial tem ganhado crescente atenção, especialmente com o avanço dos Modelos de Linguagem de Grande Escala (LLMs). No entanto, observou-se em projetos práticos que, na ausência de uma modelagem clara e de técnicas estruturadas de controle sobre o código gerado por IA, o desenvolvimento sofre atrasos significativos e perda de qualidade de código.

A Engenharia Orientada a Modelos (MDE) — que propõe o uso de modelos como artefatos centrais do desenvolvimento — perdeu espaço com a ascensão dos métodos ágeis. Contudo, o cenário atual com agentes de IA capazes de interpretar e gerar artefatos a partir de modelos resgata o potencial da MDE, especialmente quando combinada com o Desenvolvimento Orientado a Especificações (SDD).

Neste contexto, esta pesquisa propõe um pipeline de três agentes de IA:

1. **Agente Arquiteto**: trabalha colaborativamente com o aluno para produzir e refinar o modelo UML (PlantUML).
2. **Agente Developer**: trabalha colaborativamente com o aluno para gerar código frontend a partir do modelo.
3. **Agente QA**: atua como mecanismo de verificação contínua, detectando inconsistências entre modelo e código.

O foco deste estudo está na **avaliação da eficácia do Agente QA** e no **alinhamento entre modelo e código** alcançado pelo pipeline.

---

## 3. Objetivos

### 3.1 Objetivo Geral

Avaliar a eficácia do Agente QA na detecção de inconsistências entre modelo e código, bem como o nível de alinhamento alcançado pelo pipeline de agentes de IA (Arquiteto, Developer e QA) baseado em MDE+SDD.

### 3.2 Objetivo GQM (Goal-Question-Metric)

Esta pesquisa busca **analisar** o pipeline de agentes de IA com MDE+SDD com o propósito de **avaliar** a eficácia do Agente QA e o alinhamento entre modelo e código sob a perspectiva de **pesquisadores e desenvolvedores** no contexto de um **experimento controlado com ciclos de sprint**.

---

## 4. Questões de Pesquisa

### 4.1 QP1: Eficácia do Agente QA

O Agente QA é eficaz na detecção de inconsistências entre modelo e código, apresentando alta precisão e revocação?

**Rationale:** Ao responder a esta pergunta, espera-se avaliar o desempenho do Agente QA como mecanismo de controle de qualidade, identificando seus acertos (TP e TN) e erros (FP e FN), bem como sua capacidade de discriminar corretamente entre inconsistências legítimas e decisões conscientes.

### 4.2 QP2: Alinhamento Modelo-Código

Qual é o nível de alinhamento entre modelo e código alcançado pelo pipeline de agentes, e como esse alinhamento evolui ao longo das sprints?

**Rationale:** Espera-se que a resposta forneça evidências sobre a capacidade do modelo gerado colaborativamente de servir como "âncora" para o desenvolvimento, bem como sobre a eficácia do Agente QA em manter a consistência entre modelo e código ao longo do tempo, medido por métricas de cobertura, precisão, divergência semântica e over-engineering.

---

## 5. Método de Pesquisa

**Experimento controlado**, pois o objetivo é estabelecer uma relação entre o uso do pipeline de agentes de IA com MDE+SDD (variável independente) e as métricas de eficácia do Agente QA e alinhamento modelo-código (variáveis dependentes). O experimento ocorrerá em ciclos de sprint (Scrum), com duração estimada de 1 a 2 semanas cada.

---

## 6. Participantes

### 6.1 Grupo 1 — Desenvolvedores (Alunos Pesquisadores)

| Papel | Responsabilidade |
|-------|------------------|
| Agente Arquiteto + Aluno X | Modelagem colaborativa do frontend utilizando UML textual (PlantUML) |
| Agente Developer + Aluno Daired | Codificação colaborativa do frontend a partir do modelo estabelecido |

**Critérios de inclusão:** Conhecimento avançado em desenvolvimento frontend, experiência prévia com UML, disponibilidade para todas as sprints.

### 6.2 Grupo 2 — Avaliadores (Árbitros Humanos)

| Papel | Responsabilidade |
|-------|------------------|
| Professores Orientadores | Validar as decisões do Agente QA nas audiências, atuando como árbitros humanos |

**Critérios de inclusão:** Experiência comprovada em Engenharia de Software (mínimo 5 anos), conhecimento em MDE, SDD e metodologias ágeis.

**Número de participantes esperado:** 2 desenvolvedores + 2 a 3 avaliadores.

---

## 7. Variáveis de Controle

| Variável | Estratégia de Controle |
|----------|------------------------|
| Casos de uso e requisitos | Fixo para todas as sprints; documentado previamente |
| Linguagem de programação | Definida antes do início do experimento |
| Ferramenta de modelagem | PlantUML fixa durante todo o experimento |
| Processo de desenvolvimento | Scrum com sprints de duração fixa |
| Ambiente de desenvolvimento | Configurado antes do início |

---

## 8. Variáveis Independentes

| Variável | Níveis/Tratamentos |
|----------|---------------------|
| Pipeline de agentes de IA | **Com pipeline** (tratamento experimental) vs. **Sem pipeline** (controle) |

---

## 9. Variáveis Dependentes

| Variável | Métrica Associada |
|----------|-------------------|
| Eficácia do Agente QA | Precisão; recall; F1-score; taxas de FP e FN; concordância |
| Alinhamento modelo-código | Cobertura do modelo; precisão da implementação; divergência semântica; over-engineering |

---

## 10. Avaliação e Métricas

### 10.1 Rubrica Padronizada (0-4)

Todas as métricas quantitativas deste protocolo seguem a seguinte rubrica padronizada de avaliação, sem o uso de emoticons ou símbolos subjetivos:

| Pontuação | Classificação | Critério Geral |
|-----------|---------------|----------------|
| 0 | Muito Baixo (MB) | Desempenho muito abaixo do esperado; não atende aos requisitos mínimos |
| 1 | Baixo (B) | Desempenho abaixo do esperado; atende parcialmente aos requisitos mínimos |
| 2 | Regular (R) | Desempenho na média esperada; atende aos requisitos mínimos |
| 3 | Bom (B) | Desempenho acima do esperado; atende plenamente aos requisitos |
| 4 | Excelente (E) | Desempenho muito acima do esperado; excede os requisitos |

---

### 10.2 Grupo A — Métricas de Qualidade do Agente QA

#### A1: Matriz de Confusão do QA

| Cenário | Nome | Descrição |
|---------|------|-----------|
| **TP** | Verdadeiro Positivo | QA detectou inconsistência que realmente existe |
| **TN** | Verdadeiro Negativo | QA não detectou inconsistência onde não existe |
| **FP** | Falso Positivo | QA detectou inconsistência que não existia |
| **FN** | Falso Negativo | QA não detectou inconsistência que existia |

**Fonte dos dados:** [Checklist 1 — Avaliação de Audiência do Agente QA](#171-checklist-1--avaliação-de-audiência-do-agente-qa) (itens AUD-06, AUD-07, AUD-08, AUD-09)

**Rubrica de Avaliação:**

| Pontuação | Critério |
|-----------|----------|
| 0 | Matriz não registrada ou registros inconsistentes em mais de 50% dos casos |
| 1 | Matriz registrada, mas com inconsistências em 25-50% dos casos |
| 2 | Matriz completa, com consistência em 75-89% dos casos |
| 3 | Matriz completa, com consistência em 90-94% dos casos |
| 4 | Matriz completa, com consistência em 95-100% dos casos |

---

#### A2: Precisão do QA (Precision)

`Precisão = TP / (TP + FP)`

**Fonte dos dados:** [Checklist 1](#171-checklist-1--avaliação-de-audiência-do-agente-qa) (contagem de TP e FP)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Precisão < 0,50 |
| 1 | 0,50 ≤ Precisão < 0,70 |
| 2 | 0,70 ≤ Precisão < 0,85 |
| 3 | 0,85 ≤ Precisão < 0,95 |
| 4 | Precisão ≥ 0,95 |

---

#### A3: Revocação do QA (Recall)

`Recall = TP / (TP + FN)`

**Fonte dos dados:** [Checklist 1](#171-checklist-1--avaliação-de-audiência-do-agente-qa) (contagem de TP e FN)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Recall < 0,50 |
| 1 | 0,50 ≤ Recall < 0,70 |
| 2 | 0,70 ≤ Recall < 0,80 |
| 3 | 0,80 ≤ Recall < 0,90 |
| 4 | Recall ≥ 0,90 |

---

#### A4: F1-Score do QA

`F1 = 2 × (Precisão × Recall) / (Precisão + Recall)`

**Fonte dos dados:** Calculado a partir das métricas A2 e A3

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | F1-Score < 0,50 |
| 1 | 0,50 ≤ F1-Score < 0,70 |
| 2 | 0,70 ≤ F1-Score < 0,82 |
| 3 | 0,82 ≤ F1-Score < 0,90 |
| 4 | F1-Score ≥ 0,90 |

---

#### A5: Taxa de Falso Negativo (FNR)

`FNR = FN / (TP + FN)`

**Fonte dos dados:** [Checklist 1](#171-checklist-1--avaliação-de-audiência-do-agente-qa) (itens onde QA não detectou inconsistência existente)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | FNR > 0,40 |
| 1 | 0,30 < FNR ≤ 0,40 |
| 2 | 0,20 < FNR ≤ 0,30 |
| 3 | 0,10 < FNR ≤ 0,20 |
| 4 | FNR ≤ 0,10 |

---

#### A6: Taxa de Falso Positivo (FPR)

`FPR = FP / (FP + TN)`

**Fonte dos dados:** [Checklist 1](#171-checklist-1--avaliação-de-audiência-do-agente-qa) (itens onde QA detectou inconsistência inexistente)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | FPR > 0,30 |
| 1 | 0,20 < FPR ≤ 0,30 |
| 2 | 0,15 < FPR ≤ 0,20 |
| 3 | 0,10 < FPR ≤ 0,15 |
| 4 | FPR ≤ 0,10 |

---

#### A7: Taxa de Concordância na Audiência

`Concordância = (Veredictos alinhados com árbitros) / (Total de audiências)`

**Fonte dos dados:** [Checklist 1](#171-checklist-1--avaliação-de-audiência-do-agente-qa) (item AUD-08)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Concordância < 0,50 |
| 1 | 0,50 ≤ Concordância < 0,70 |
| 2 | 0,70 ≤ Concordância < 0,80 |
| 3 | 0,80 ≤ Concordância < 0,90 |
| 4 | Concordância ≥ 0,90 |

---

#### A8: Qualidade da Justificativa

**Fonte dos dados:** [Checklist 1](#171-checklist-1--avaliação-de-audiência-do-agente-qa) (item AUD-13, com cálculo ponderado)

**Rubrica de Avaliação:**

| Pontuação | Descrição |
|-----------|-----------|
| 0 | Sem justificativa ou justificativa ininteligível |
| 1 | Justificativa vaga, sem estrutura clara ou sem relação com o caso |
| 2 | Justificativa parcialmente coerente, mas com lacunas ou inconsistências |
| 3 | Justificativa coerente e bem fundamentada, com evidências adequadas |
| 4 | Justificativa excelente, com múltiplas evidências cruzadas (modelo + código + spec) |

---

### 10.3 Grupo B — Métricas de Alinhamento Modelo-Código

#### B1: Cobertura do Modelo

`Cobertura = (Elementos implementados / Elementos modelados) × 100`

**Elementos contados:** classes, métodos, atributos, relacionamentos em PlantUML.

**Fonte dos dados:** [Checklist 2 — Avaliação de Alinhamento Modelo-Código](#172-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-03 a ALI-09)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Cobertura < 60% |
| 1 | 60% ≤ Cobertura < 80% |
| 2 | 80% ≤ Cobertura < 90% |
| 3 | 90% ≤ Cobertura < 95% |
| 4 | Cobertura ≥ 95% |

---

#### B2: Precisão da Implementação

`Precisão = (Implementações corretas / Implementações totais) × 100`

**Fonte dos dados:** [Checklist 2](#172-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-10 a ALI-12)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Precisão < 60% |
| 1 | 60% ≤ Precisão < 75% |
| 2 | 75% ≤ Precisão < 85% |
| 3 | 85% ≤ Precisão < 90% |
| 4 | Precisão ≥ 90% |

---

#### B3: Divergência Semântica

`Divergência = (Comportamentos divergentes / Total de implementações) × 100`

**Tipos de divergência:** regra funcional violada, comportamento não modelado, exceção não documentada, lógica invertida.

**Fonte dos dados:** [Checklist 2](#172-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-13 a ALI-15)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Divergência > 15% |
| 1 | 10% < Divergência ≤ 15% |
| 2 | 5% < Divergência ≤ 10% |
| 3 | 1% < Divergência ≤ 5% |
| 4 | Divergência = 0% |

---

#### B4: Over-Engineering

`Over-Engineering = (Código não modelado / Total de código) × 100`

**Fonte dos dados:** [Checklist 2](#172-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-16 a ALI-18) + [NE-03](#163-ne-03-parser-de-código-fonte-ast)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Over-Engineering > 25% |
| 1 | 20% < Over-Engineering ≤ 25% |
| 2 | 10% < Over-Engineering ≤ 20% |
| 3 | 5% < Over-Engineering ≤ 10% |
| 4 | Over-Engineering ≤ 5% |

---

#### B5: Score Geral de Alinhamento

`Score = (Cobertura × 0,35) + (Precisão × 0,35) + ((100 − Divergência) × 0,20) + ((100 − Over-Engineering) × 0,10)`

**Fonte dos dados:** Calculado a partir das métricas B1, B2, B3, B4

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor do Score) |
|-----------|---------------------------|
| 0 | Score < 50 |
| 1 | 50 ≤ Score < 60 |
| 2 | 60 ≤ Score < 75 |
| 3 | 75 ≤ Score < 90 |
| 4 | Score ≥ 90 |

---

#### B6: Rastreabilidade

`Rastreabilidade = (RFs com cadeia completa RF→Modelo→Código) / (Total de RFs) × 100`

**Fonte dos dados:** [Checklist 2](#172-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-20 a ALI-22)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Rastreabilidade < 60% |
| 1 | 60% ≤ Rastreabilidade < 75% |
| 2 | 75% ≤ Rastreabilidade < 85% |
| 3 | 85% ≤ Rastreabilidade < 90% |
| 4 | Rastreabilidade ≥ 90% |

---

### 10.4 Resumo das Métricas

| Grupo | ID | Métrica | Unidade | Fonte Principal | Rubrica (0-4) |
|-------|-----|---------|---------|-----------------|----------------|
| A | A1 | Matriz de Confusão | Qualitativo | Checklist 1 | Consistência dos registros |
| A | A2 | Precisão (Precision) | 0-1 | Checklist 1 | Valor da métrica |
| A | A3 | Revocação (Recall) | 0-1 | Checklist 1 | Valor da métrica |
| A | A4 | F1-Score | 0-1 | Calculado (A2,A3) | Valor da métrica |
| A | A5 | Taxa de Falso Negativo (FNR) | 0-1 | Checklist 1 | Valor da métrica |
| A | A6 | Taxa de Falso Positivo (FPR) | 0-1 | Checklist 1 | Valor da métrica |
| A | A7 | Taxa de Concordância | 0-1 | Checklist 1 | Valor da métrica |
| A | A8 | Qualidade da Justificativa | 0-4 | Checklist 1 | Rubrica específica |
| B | B1 | Cobertura do Modelo | % | Checklist 2 + NE-02/NE-03 | Valor da métrica |
| B | B2 | Precisão da Implementação | % | Checklist 2 + NE-03 | Valor da métrica |
| B | B3 | Divergência Semântica | % | Checklist 2 | Valor da métrica |
| B | B4 | Over-Engineering | % | Checklist 2 + NE-03 | Valor da métrica |
| B | B5 | Score Geral de Alinhamento | 0-100 | Calculado (B1-B4) | Valor do score |
| B | B6 | Rastreabilidade | % | Checklist 2 | Valor da métrica |

---

## 11. Síntese das Métricas por Sprint

Ao final de cada sprint, consolidar os seguintes indicadores:

| Grupo | Métrica | Pontuação (0-4) | Classificação |
|-------|---------|-----------------|---------------|
| A | Precisão do QA | __ | MB / B / R / B / E |
| A | Recall do QA | __ | MB / B / R / B / E |
| A | F1-Score | __ | MB / B / R / B / E |
| A | Concordância | __ | MB / B / R / B / E |
| A | Qualidade da Justificativa (média) | __ | MB / B / R / B / E |
| B | Cobertura do Modelo | __ | MB / B / R / B / E |
| B | Precisão da Implementação | __ | MB / B / R / B / E |
| B | Score Geral de Alinhamento | __ | MB / B / R / B / E |
| B | Rastreabilidade | __ | MB / B / R / B / E |

**Legenda:** MB = Muito Baixo (0), B = Baixo (1), R = Regular (2), B = Bom (3), E = Excelente (4)

**Observação:** As métricas A2 a A7 e B1 a B4 devem ser convertidas para a rubrica padronizada (0-4) conforme as tabelas da Seção 10 antes de serem consolidadas nesta síntese.

---

## 12. Hipóteses

### 12.1 Hipótese Nula — Agente QA (H01)
O Agente QA não apresenta precisão e revocação superiores a 0,80 na detecção de inconsistências entre modelo e código.

### 12.2 Hipótese Alternativa — Agente QA (HA1)
O Agente QA apresenta precisão e revocação superiores a 0,80 na detecção de inconsistências entre modelo e código.

### 12.3 Hipótese Nula — Alinhamento (H02)
O pipeline de agentes não produz alinhamento modelo-código com score superior a 75 (nível "Bom" na rubrica 0-4).

### 12.4 Hipótese Alternativa — Alinhamento (HA2)
O pipeline de agentes produz alinhamento modelo-código com score superior a 75 (nível "Bom" na rubrica 0-4).

---

## 13. Materiais

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

## 14. Estratégias de Construção do Prompt

| Agente | Estratégia |
|--------|-----------|
| Arquiteto | Few-shot com exemplos de diagramas; prompt em português; iterativo |
| Developer | Few-shot com exemplos de código; contexto inclui modelo UML |
| QA | Zero-shot inicial; aprendizado com audiências |

---

## 15. Tarefas Executadas

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

## 16. Fontes de Extração de Dados Não Humanos

Este capítulo descreve as fontes automatizadas de coleta de dados que **não dependem de intervenção humana**, utilizadas para alimentar as métricas dos Grupos A e B.

---

### 16.1 NE-01: Logs do Agente QA

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Registros automáticos gerados pelo Agente QA durante a verificação de inconsistências |
| **Dados extraídos** | ID do commit, inconsistências detectadas (tipo, localização, severidade), veredicto inicial |
| **Métricas relacionadas** | A1 a A8 |
| **Ferramenta de extração** | Sistema de logging do Agente QA (saída em JSON) |
| **Script de automação** | `scripts/extract-qa-logs.py` |
| **Frequência de coleta** | A cada execução do Agente QA (trigger por commit) |
| **Local de armazenamento** | Banco de dados de métricas (`qa_audits` table) |

---

### 16.2 NE-02: Parser de Modelos UML (PlantUML)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Script para extrair elementos dos diagramas PlantUML |
| **Dados extraídos** | Classes, métodos, atributos, relacionamentos, parâmetros de métodos |
| **Métricas relacionadas** | B1, B2, B6 |
| **Ferramenta de extração** | Python com regex e parsing de texto estruturado (PlantUML) |
| **Script de automação** | `scripts/parse-plantuml.py` |
| **Frequência de coleta** | A cada atualização do modelo (início e fim de sprint) |
| **Local de armazenamento** | Arquivo JSON (`model_elements_<sprint>.json`) |

---

### 16.3 NE-03: Parser de Código Fonte (AST)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Script para extrair elementos do código fonte via Análise de Sintaxe Abstrata (AST) |
| **Dados extraídos** | Classes, métodos, atributos, parâmetros, tipos de retorno |
| **Métricas relacionadas** | B1, B2, B4 |
| **Ferramenta de extração** | `tree-sitter` (TypeScript/JavaScript) |
| **Script de automação** | `scripts/parse-code-ast.py` |
| **Frequência de coleta** | A cada commit (via CI) e ao final de cada sprint |
| **Local de armazenamento** | Arquivo JSON (`code_elements_<commit>.json`) |

---

### 16.4 Resumo das Fontes de Dados Não Humanos

| ID | Nome | Métricas | Automação | Formato de Saída |
|----|------|----------|-----------|------------------|
| NE-01 | Logs do Agente QA | A1 a A8 | Script | JSON → Banco de dados |
| NE-02 | Parser PlantUML | B1, B2, B6 | Script | JSON |
| NE-03 | Parser AST | B1, B2, B4 | CI + Script | JSON |

---

## 17. Checklists para Coleta de Dados Humanos

---

### 17.1 Checklist 1 — Avaliação de Audiência do Agente QA

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

### 17.2 Checklist 2 — Avaliação de Alinhamento Modelo-Código

*Preenchido pelos alunos com validação dos professores.*

| ID | Item | Valor | Fonte |
|----|------|-------|-------|
| ALI-01 | Sprint | __________ | - |
| ALI-02 | Componente/módulo | __________ | - |
| ALI-03 | Classes modeladas | __ | NE-02 |
| ALI-04 | Classes implementadas | __ | NE-03 |
| ALI-05 | Métodos modelados | __ | NE-02 |
| ALI-06 | Métodos implementados | __ | NE-03 |
| ALI-07 | Atributos modelados | __ | NE-02 |
| ALI-08 | Atributos implementados | __ | NE-03 |
| ALI-09 | Cobertura do modelo (B1) | __% | Calculado |
| ALI-10 | Implementações corretas | __ | Validação manual |
| ALI-11 | Total de implementações | __ | NE-03 |
| ALI-12 | Precisão da implementação (B2) | __% | Calculado |
| ALI-13 | Comportamentos divergentes | __ | Validação manual |
| ALI-14 | Divergência semântica (B3) | __% | Calculado |
| ALI-15 | Lista de divergências identificadas | __________ | Validação manual |
| ALI-16 | Linhas de código não modeladas | __ LOC | NE-03 |
| ALI-17 | Linhas de código totais | __ LOC | NE-03 |
| ALI-18 | Over-Engineering (B4) | __% | Calculado |
| ALI-19 | Score Geral de Alinhamento (B5) | __ | Calculado |
| ALI-20 | Total de RFs no escopo | __ | Documento de requisitos |
| ALI-21 | RFs com rastreabilidade completa | __ | NE-02 + NE-03 |
| ALI-22 | Rastreabilidade (B6) | __% | Calculado |

---

### 17.3 Checklist 3 — Registro de Configuração do Experimento

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

## 18. Benefícios e Contribuições Esperadas

| Benefício | Descrição |
|-----------|-----------|
| Evidência empírica | Sobre a eficácia de agentes de IA como mecanismos de QA em pipelines MDE+SDD |
| Protocolo replicável | Para avaliação de agentes de QA em tarefas de verificação de consistência |
| Métricas validadas | Conjunto de métricas para avaliação de agentes de IA como "juízes" de consistência |
| Compreensão do alinhamento | Identificação dos fatores que afetam o alinhamento modelo-código |

---

## 19. Limitações e Ameaças à Validade

### 19.1 Ameaças à Validade Interna

| Ameaça | Mitigação |
|--------|-----------|
| Vazamento/contaminação de dados | Especificações originais; documentar versões |
| Viés dos pesquisadores | Prompts baseados em literatura; registrar versões |
| Efeito Hawthorne | Baseline com desenvolvimento sem pipeline |

### 19.2 Ameaças à Validade Externa

| Ameaça | Mitigação |
|--------|-----------|
| Generalização | Reconhecer limitação; discutir transferabilidade |
| Especificidade dos participantes | Reconhecer limitação; sugerir replicações |

### 19.3 Ameaças à Validade de Constructo

| Ameaça | Mitigação |
|--------|-----------|
| Operacionalização inadequada | Métricas validadas na literatura |
| Efeito de testes | Incluir baseline; tratar aprendizado como variável |

### 19.4 Ameaças à Validade de Conclusão

| Ameaça | Mitigação |
|--------|-----------|
| Natureza não determinística dos LLMs | Reportar versões, datas, parâmetros; pacote de replicação |
| Pequeno tamanho amostral | Reconhecer; tratar como evidências exploratórias |
| Confiabilidade da avaliação humana | Rubrica detalhada; múltiplos avaliadores |

---

## 20. Referências

[1] SHULL, Forrest; SINGER, Janice; SJØBERG, Dag I. K. (eds.). *Guide to Advanced Empirical Software Engineering*. London: Springer-Verlag, 2008.

[2] WOHLIN, Claes et al. *Experimentation in Software Engineering*. Berlin: Springer, 2012.

[3] BALTES, Sebastian et al. *Guidelines for Empirical Studies in Software Engineering involving Large Language Models*. 2025. arXiv:2508.15503.

[4] TEIXEIRA, E.; FONSECA, L.; SOARES, S. Threats to validity in controlled experiments in software engineering. In: *SBES 2018*. ACM, 2018. p. 52-61.

[5] BASILI, Victor R.; SHULL, Forrest; LANUBILE, Filippo. Building knowledge through families of experiments. *IEEE TSE*, v. 25, n. 4, p. 456-473, 1999.

[6] KITCHENHAM, Barbara et al. Preliminary guidelines for empirical research in software engineering. *IEEE TSE*, v. 28, n. 8, p. 721-734, 2002.

---