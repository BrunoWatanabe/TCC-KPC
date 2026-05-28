# Protocolo de Pesquisa

**UNIVERSIDADE FEDERAL DE GOIÁS — INSTITUTO DE INFORMÁTICA — CIÊNCIA DA COMPUTAÇÃO**

**DISCIPLINA:** Projeto Final de Curso 2

**PROFESSOR:** Marcelo Akira Inuzuka

**PARTICIPANTES:** Daired

**DATA ATUALIZAÇÃO:** 28/05/2026

**Versão:** 8.0

**Status:** Protocolo com separação dos agentes Polícia e Juiz

---

## Sumário

1. [Informações Gerais](#1-informações-gerais)
2. [Contextualização e Motivação](#2-contextualização-e-motivação)
3. [Objetivos](#3-objetivos)
   - 3.1 [Objetivo Geral](#31-objetivo-geral)
   - 3.2 [Objetivo GQM](#32-objetivo-gqm)
4. [Questões de Pesquisa](#4-questões-de-pesquisa)
   - 4.1 [QP1: Eficácia do Pipeline de Agentes](#41-qp1-eficácia-do-pipeline-de-agentes-polícia-e-juiz)
   - 4.2 [QP2: Alinhamento Modelo-Código](#42-qp2-alinhamento-modelo-código)
5. [Método de Pesquisa](#5-método-de-pesquisa)
6. [Participantes](#6-participantes)
   - 6.1 [Grupo 1 — Desenvolvedores](#61-grupo-1--desenvolvedores-alunos-pesquisadores)
   - 6.2 [Grupo 2 — Avaliadores (Árbitros Humanos)](#62-grupo-2--avaliadores-árbitros-humanos)
   - 6.3 [Grupo 3 — Humano Piloto (Polícia + Juiz)](#63-grupo-3--humano-piloto-polícia--juiz)
7. [Os Agentes do Pipeline](#7-os-agentes-do-pipeline)
   - 7.1 [Agente Arquiteto](#71-agente-arquiteto)
   - 7.2 [Agente Developer](#72-agente-developer)
   - 7.3 [Agente Polícia de Inconsistências](#73-agente-polícia-de-inconsistências)
   - 7.4 [Agente Juiz de Inconsistências](#74-agente-juiz-de-inconsistências)
   - 7.5 [Fluxo de Decisão do Juiz](#75-fluxo-de-decisão-do-juiz)
8. [Variáveis de Controle](#8-variáveis-de-controle)
9. [Variáveis Independentes](#9-variáveis-independentes)
10. [Variáveis Dependentes](#10-variáveis-dependentes)
11. [Avaliação e Métricas](#11-avaliação-e-métricas)
    - 11.1 [Rubrica Padronizada (0-4)](#111-rubrica-padronizada-0-4)
    - 11.2 [Grupo A — Qualidade do Pipeline Polícia+Juiz](#112-grupo-a--métricas-de-qualidade-do-pipeline-políciajuiz)
        - [A1: Matriz de Confusão do Juiz](#a1-matriz-de-confusão-do-juiz)
        - [A2: Matriz de Decisão do Juiz](#a2-matriz-de-decisão-do-juiz)
        - [A3: Precisão da Polícia (Precision)](#a3-precisão-da-polícia-precision)
        - [A4: Revocação da Polícia (Recall)](#a4-revocação-da-polícia-recall)
        - [A5: F1-Score da Polícia](#a5-f1-score-da-polícia)
        - [A6: Taxa de Acerto do Juiz (Accuracy)](#a6-taxa-de-acerto-do-juiz-accuracy)
        - [A7: Taxa de Concordância com Árbitros](#a7-taxa-de-concordância-com-árbitros)
        - [A8: Qualidade das Evidências Coletadas (Polícia)](#a8-qualidade-das-evidências-coletadas-polícia)
        - [A9: Qualidade da Decisão (Juiz)](#a9-qualidade-da-decisão-juiz)
        - [A10: Tempo Médio de Processamento (Polícia+Juiz)](#a10-tempo-médio-de-processamento-políciajuiz)
    - 11.3 [Grupo B — Métricas de Alinhamento Modelo-Código](#113-grupo-b--métricas-de-alinhamento-modelo-código)
        - [B1: Cobertura do Modelo](#b1-cobertura-do-modelo)
        - [B2: Precisão da Implementação](#b2-precisão-da-implementação)
        - [B3: Divergência Semântica](#b3-divergência-semântica)
        - [B4: Over-Engineering](#b4-over-engineering)
        - [B5: Score Geral de Alinhamento](#b5-score-geral-de-alinhamento)
        - [B6: Rastreabilidade](#b6-rastreabilidade)
    - 11.4 [Resumo das Métricas](#114-resumo-das-métricas)
12. [Síntese das Métricas por Sprint](#12-síntese-das-métricas-por-sprint)
13. [Hipóteses](#13-hipóteses)
14. [Materiais](#14-materiais)
15. [Estratégias de Construção do Prompt](#15-estratégias-de-construção-do-prompt)
16. [Tarefas Executadas](#16-tarefas-executadas)
17. [Fontes de Extração de Dados Não Humanos](#17-fontes-de-extração-de-dados-não-humanos)
18. [Checklists para Coleta de Dados Humanos](#18-checklists-para-coleta-de-dados-humanos)
19. [Benefícios e Contribuições Esperadas](#19-benefícios-e-contribuições-esperadas)
20. [Limitações e Ameaças à Validade](#20-limitações-e-ameaças-à-validade)
21. [Referências](#21-referências)

---

## 1. Informações Gerais

| Campo | Descrição |
|-------|-----------|
| **TÍTULO** | Modernização da Engenharia Orientada a Modelos com Auxílio de Agentes de IA e Desenvolvimento Orientado a Especificações – Um Estudo Experimental sobre Pipeline de Agentes Polícia e Juiz para Verificação de Consistência |
| **TEMA** | Estudo empírico experimental sobre a combinação de Engenharia Orientada a Modelos (MDE), Desenvolvimento Orientado a Especificações (SDD) e um pipeline de quatro agentes de IA (Arquiteto, Developer, Polícia e Juiz) para produção de código frontend, com foco na avaliação da eficácia do pipeline de verificação de inconsistências e no alinhamento entre modelo e código. |
| **DESCRIÇÃO** | O intuito deste estudo consiste em investigar a eficácia de um pipeline de dois agentes especializados — Polícia (coleta de evidências) e Juiz (decisão) — na detecção e julgamento de inconsistências entre modelo e código, bem como o nível de alinhamento alcançado pelo pipeline completo de agentes. Para isso, será realizado um experimento controlado em ciclos de sprint (Scrum), onde cada commit dispara o Agente Polícia para coletar evidências, seguidas da atuação do Agente Juiz para analisar as evidências e tomar decisão. Ambos os agentes são operados pelo mesmo humano piloto. O escopo do estudo está delimitado à avaliação da qualidade do pipeline de verificação e do alinhamento modelo-código. |

---

## 2. Contextualização e Motivação

O desenvolvimento de software assistido por Inteligência Artificial tem ganhado crescente atenção, especialmente com o avanço dos Modelos de Linguagem de Grande Escala (LLMs). No entanto, observou-se em projetos práticos que, na ausência de uma modelagem clara e de técnicas estruturadas de controle sobre o código gerado por IA, o desenvolvimento sofre atrasos significativos e perda de qualidade de código.

A Engenharia Orientada a Modelos (MDE) — que propõe o uso de modelos como artefatos centrais do desenvolvimento — perdeu espaço com a ascensão dos métodos ágeis. Contudo, o cenário atual com agentes de IA capazes de interpretar e gerar artefatos a partir de modelos resgata o potencial da MDE, especialmente quando combinada com o Desenvolvimento Orientado a Especificações (SDD).

Neste contexto, esta pesquisa propõe um pipeline de quatro agentes de IA:

1. **Agente Arquiteto**: trabalha colaborativamente com o aluno para produzir e refinar o modelo UML (PlantUML).
2. **Agente Developer**: trabalha colaborativamente com o aluno para gerar código frontend a partir do modelo.
3. **Agente Polícia de Inconsistências**: atua na coleta sistemática de evidências sobre possíveis inconsistências entre modelo e código.
4. **Agente Juiz de Inconsistências**: analisa as evidências coletadas pela Polícia, considera os argumentos do Arquiteto e do Developer, e profere uma decisão.

A principal inovação deste estudo é a **separação das responsabilidades de coleta de evidências e de julgamento** em dois agentes distintos, permitindo uma avaliação mais precisa de cada etapa do processo de verificação de consistência. Ambos os agentes são operados pelo mesmo humano piloto, garantindo coerência na aplicação dos critérios.

---

## 3. Objetivos

### 3.1 Objetivo Geral

Avaliar a eficácia do pipeline de dois agentes especializados (Polícia e Juiz) na detecção e julgamento de inconsistências entre modelo e código, bem como o nível de alinhamento alcançado pelo pipeline completo de agentes (Arquiteto, Developer, Polícia e Juiz) baseado em MDE+SDD.

### 3.2 Objetivo GQM (Goal-Question-Metric)

Esta pesquisa busca **analisar** o pipeline de agentes de IA com MDE+SDD com o propósito de **avaliar** a eficácia do sistema de verificação de inconsistências (Polícia + Juiz) e o alinhamento entre modelo e código sob a perspectiva de **pesquisadores e desenvolvedores** no contexto de um **experimento controlado com ciclos de sprint**.

---

## 4. Questões de Pesquisa

### 4.1 QP1: Eficácia do Pipeline de Agentes (Polícia e Juiz)

O pipeline composto pelo Agente Polícia (coleta de evidências) e Agente Juiz (decisão) é eficaz na detecção e julgamento de inconsistências entre modelo e código?

**Rationale:** Ao responder a esta pergunta, espera-se avaliar separadamente:
- A capacidade da Polícia em coletar evidências completas e relevantes (precisão e revocação das evidências)
- A capacidade do Juiz em analisar corretamente as evidências e proferir decisões adequadas (taxa de acerto)
- A qualidade da separação das responsabilidades entre os dois agentes

### 4.2 QP2: Alinhamento Modelo-Código

Qual é o nível de alinhamento entre modelo e código alcançado pelo pipeline completo de agentes, e como esse alinhamento evolui ao longo das sprints?

**Rationale:** Espera-se que a resposta forneça evidências sobre a capacidade do modelo gerado colaborativamente de servir como "âncora" para o desenvolvimento, bem como sobre a eficácia do sistema de verificação (Polícia+Juiz) em manter a consistência entre modelo e código ao longo do tempo.

---

## 5. Método de Pesquisa

**Experimento controlado**, pois o objetivo é estabelecer uma relação entre o uso do pipeline de agentes de IA com MDE+SDD (variável independente) e as métricas de eficácia do sistema de verificação e alinhamento modelo-código (variáveis dependentes). O experimento ocorrerá em ciclos de sprint (Scrum), com duração estimada de 1 a 2 semanas cada.

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
| Professores Orientadores | Validar as decisões do Agente Juiz nas audiências, atuando como árbitros humanos |

**Critérios de inclusão:** Experiência comprovada em Engenharia de Software (mínimo 5 anos), conhecimento em MDE, SDD e metodologias ágeis.

### 6.3 Grupo 3 — Humano Piloto (Polícia + Juiz)

| Papel | Responsabilidade |
|-------|------------------|
| Humano Piloto | Opera tanto o Agente Polícia quanto o Agente Juiz, seguindo os protocolos definidos para cada papel |

**Critérios de inclusão:** Treinamento específico nos protocolos de atuação da Polícia e do Juiz, conhecimento em Engenharia de Software, imparcialidade no julgamento.

**Justificativa para o mesmo humano piloto:** Manter o mesmo operador para ambos os agentes garante coerência na interpretação das inconsistências e evita variáveis de confusão relacionadas a diferentes níveis de expertise entre operadores. A separação dos papéis é funcional (diferentes agentes com diferentes responsabilidades), não operacional.

**Número de participantes esperado:** 2 desenvolvedores + 2 a 3 avaliadores + 1 humano piloto.

---

## 7. Os Agentes do Pipeline

### 7.1 Agente Arquiteto

| Propriedade | Descrição |
|-------------|-----------|
| **Responsabilidade** | Produzir e refinar modelos UML (PlantUML) a partir das especificações |
| **Interação** | Colaborativa com o Aluno X |
| **Entrada** | Especificações de requisitos, feedback do Developer |
| **Saída** | Diagramas PlantUML atualizados |

### 7.2 Agente Developer

| Propriedade | Descrição |
|-------------|-----------|
| **Responsabilidade** | Gerar código frontend a partir do modelo estabelecido |
| **Interação** | Colaborativa com o Aluno Daired |
| **Entrada** | Modelos UML do Arquiteto, especificações |
| **Saída** | Código fonte implementado |

### 7.3 Agente Polícia de Inconsistências

| Propriedade | Descrição |
|-------------|-----------|
| **Responsabilidade** | Coletar evidências sistemáticas sobre possíveis inconsistências entre modelo e código |
| **Natureza** | Investigativa — não toma decisões, apenas reúne provas |
| **Entrada** | Modelo UML (PlantUML), código fonte, especificações |
| **Saída** | Relatório de evidências (lista de possíveis inconsistências com justificativa e artefatos de suporte) |
| **Operador** | Humano piloto |
| **Atuação** | A cada commit, executado antes do Juiz |

**Princípios de atuação da Polícia:**

| Princípio | Descrição |
|-----------|-----------|
| Imparcialidade | Coleta todas as evidências, independentemente de favorecer o Arquiteto ou o Developer |
| Exaustividade | Busca identificar todas as possíveis inconsistências, mesmo as de baixa severidade |
| Rastreabilidade | Cada evidência deve ser vinculada a artefatos específicos (linha do modelo, linha do código, trecho da spec) |
| Objetividade | Evidências devem ser factuais, não opinativas |

### 7.4 Agente Juiz de Inconsistências

| Propriedade | Descrição |
|-------------|-----------|
| **Responsabilidade** | Analisar as evidências coletadas pela Polícia, considerar argumentos do Arquiteto e Developer, e proferir decisão |
| **Natureza** | Decisória — julga com base nas provas apresentadas |
| **Entrada** | Relatório de evidências da Polícia, argumentos do Arquiteto e Developer |
| **Saída** | Decisão fundamentada sobre cada inconsistência |
| **Operador** | Humano piloto (mesmo da Polícia) |
| **Atuação** | Após a Polícia concluir a coleta de evidências e após os agentes Arquiteto e Developer apresentarem seus argumentos |

### 7.5 Fluxo de Decisão do Juiz

O Agente Juiz analisa cada inconsistência reportada pela Polícia e profere uma decisão dentre quatro possíveis:

| Decisão | Código | Descrição | Consequência |
|---------|--------|-----------|--------------|
| **Developer Errado** | DE | O código implementado está incorreto em relação ao modelo; o modelo está correto | Developer deve corrigir o código |
| **Arquiteto Errado** | AE | O modelo está incorreto ou incompleto; o código implementado está correto | Arquiteto deve corrigir o modelo |
| **Ambos Errados** | AE | Tanto o modelo quanto o código apresentam problemas; ambos estão incorretos | Ambos devem corrigir seus artefatos |
| **Ninguém Errado** | NE | Não há inconsistência real; a diferença entre modelo e código é uma decisão consciente e justificada | Nenhuma ação necessária; registrar decisão como consciente |

**Critérios para cada decisão:**

| Decisão | Condição Necessária |
|---------|---------------------|
| Developer Errado | Modelo está correto E código não implementa o que o modelo especifica |
| Arquiteto Errado | Código está correto E modelo não reflete a implementação E a implementação está de acordo com a especificação |
| Ambos Errados | Modelo está incorreto E código também está incorreto (ou não implementa o modelo) |
| Ninguém Errado | Modelo e código são consistentes, OU a diferença é justificada por decisão de projeto documentada |

---

## 8. Variáveis de Controle

| Variável | Estratégia de Controle |
|----------|------------------------|
| Casos de uso e requisitos | Fixo para todas as sprints; documentado previamente |
| Linguagem de programação | Definida antes do início do experimento |
| Ferramenta de modelagem | PlantUML fixa durante todo o experimento |
| Processo de desenvolvimento | Scrum com sprints de duração fixa |
| Ambiente de desenvolvimento | Configurado antes do início |

---

## 9. Variáveis Independentes

| Variável | Níveis/Tratamentos |
|----------|---------------------|
| Pipeline de agentes de IA | **Com pipeline** (tratamento experimental) vs. **Sem pipeline** (controle) |

---

## 10. Variáveis Dependentes

| Variável | Métrica Associada |
|----------|-------------------|
| Eficácia da coleta de evidências (Polícia) | Precisão, revocação, qualidade das evidências |
| Eficácia do julgamento (Juiz) | Taxa de acerto, concordância com árbitros, qualidade da decisão |
| Alinhamento modelo-código | Cobertura do modelo; precisão da implementação; divergência semântica; over-engineering |

---

## 11. Avaliação e Métricas

### 11.1 Rubrica Padronizada (0-4)

Todas as métricas quantitativas deste protocolo seguem a seguinte rubrica padronizada de avaliação:

| Pontuação | Classificação | Critério Geral |
|-----------|---------------|----------------|
| 0 | Muito Baixo (MB) | Desempenho muito abaixo do esperado; não atende aos requisitos mínimos |
| 1 | Baixo (B) | Desempenho abaixo do esperado; atende parcialmente aos requisitos mínimos |
| 2 | Regular (R) | Desempenho na média esperada; atende aos requisitos mínimos |
| 3 | Bom (B) | Desempenho acima do esperado; atende plenamente aos requisitos |
| 4 | Excelente (E) | Desempenho muito acima do esperado; excede os requisitos |

---

### 11.2 Grupo A — Métricas de Qualidade do Pipeline Polícia+Juiz

As métricas deste grupo são calculadas **por sprint**, considerando exclusivamente as **inconsistências detectadas nos artefatos da sprint corrente**.

---

#### A1: Matriz de Confusão do Juiz

| Cenário | Nome | Descrição |
|---------|------|-----------|
| **TP** | Verdadeiro Positivo | Inconsistência real detectada pela Polícia e corretamente confirmada pelo Juiz |
| **TN** | Verdadeiro Negativo | Ausência de inconsistência corretamente identificada pela Polícia e Juiz |
| **FP** | Falso Positivo | Polícia detectou inconsistência inexistente OU Juiz confirmou incorretamente |
| **FN** | Falso Negativo | Inconsistência real que não foi detectada pela Polícia (não chegou ao Juiz) |

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (itens AUD-06 a AUD-09, POL-01 a POL-04)

---

#### A2: Matriz de Decisão do Juiz

Para cada inconsistência real (verdadeiro positivo), o Juiz profere uma decisão. A matriz de decisão compara a decisão do Juiz com a decisão correta (definida pelos árbitros humanos):

| Decisão do Juiz | Decisão Correta (Árbitro) | Classificação |
|-----------------|---------------------------|---------------|
| DE (Developer Errado) | DE | Acerto |
| DE | AE | Erro (tipo 1) |
| DE | AE (Ambos Errados) | Erro (tipo 2) |
| DE | NE | Erro (tipo 3) |
| AE (Arquiteto Errado) | AE | Acerto |
| AE | DE | Erro |
| AE | AE | Erro |
| AE | NE | Erro |
| AE (Ambos Errados) | AE | Acerto |
| AE | DE | Erro |
| AE | AE | Erro |
| AE | NE | Erro |
| NE (Ninguém Errado) | NE | Acerto |
| NE | DE | Erro |
| NE | AE | Erro |
| NE | AE | Erro |

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (itens AUD-10, AUD-11, AUD-12)

---

#### A3: Precisão da Polícia (Precision)

`Precisão_Polícia = TP_Polícia / (TP_Polícia + FP_Polícia)`

Onde:
- `TP_Polícia`: inconsistências reais que a Polícia detectou e reportou
- `FP_Polícia`: inconsistências inexistentes que a Polícia reportou

**Target:** ≥ 0,85

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (itens POL-01 a POL-04)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Precisão < 0,50 |
| 1 | 0,50 ≤ Precisão < 0,70 |
| 2 | 0,70 ≤ Precisão < 0,85 |
| 3 | 0,85 ≤ Precisão < 0,95 |
| 4 | Precisão ≥ 0,95 |

---

#### A4: Revocação da Polícia (Recall)

`Recall_Polícia = TP_Polícia / (TP_Polícia + FN_Polícia)`

Onde:
- `TP_Polícia`: inconsistências reais que a Polícia detectou e reportou
- `FN_Polícia`: inconsistências reais que a Polícia NÃO detectou

**Target:** ≥ 0,90

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (itens POL-05 a POL-07)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Recall < 0,50 |
| 1 | 0,50 ≤ Recall < 0,70 |
| 2 | 0,70 ≤ Recall < 0,80 |
| 3 | 0,80 ≤ Recall < 0,90 |
| 4 | Recall ≥ 0,90 |

---

#### A5: F1-Score da Polícia

`F1_Polícia = 2 × (Precisão × Recall) / (Precisão + Recall)`

**Fonte dos dados:** Calculado a partir das métricas [A3](#a3-precisão-da-polícia-precision) e [A4](#a4-revocação-da-polícia-recall)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | F1 < 0,50 |
| 1 | 0,50 ≤ F1 < 0,70 |
| 2 | 0,70 ≤ F1 < 0,82 |
| 3 | 0,82 ≤ F1 < 0,90 |
| 4 | F1 ≥ 0,90 |

---

#### A6: Taxa de Acerto do Juiz (Accuracy)

`Acerto_Juiz = (Decisões corretas) / (Total de decisões proferidas)`

Decisões corretas são aquelas em que o veredicto do Juiz coincide com o veredicto do árbitro humano.

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (itens AUD-10, AUD-11)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Acerto < 0,50 |
| 1 | 0,50 ≤ Acerto < 0,70 |
| 2 | 0,70 ≤ Acerto < 0,80 |
| 3 | 0,80 ≤ Acerto < 0,90 |
| 4 | Acerto ≥ 0,90 |

---

#### A7: Taxa de Concordância com Árbitros

`Concordância = (Decisões alinhadas com árbitros) / (Total de audiências)`

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (item AUD-11)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Concordância < 0,50 |
| 1 | 0,50 ≤ Concordância < 0,70 |
| 2 | 0,70 ≤ Concordância < 0,80 |
| 3 | 0,80 ≤ Concordância < 0,90 |
| 4 | Concordância ≥ 0,90 |

---

#### A8: Qualidade das Evidências Coletadas (Polícia)

Avaliação qualitativa da completude, relevância e rastreabilidade das evidências coletadas pela Polícia para cada inconsistência reportada.

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (itens POL-08 a POL-11)

**Rubrica de Avaliação:**

| Pontuação | Descrição |
|-----------|-----------|
| 0 | Sem evidências ou evidências irrelevantes/inutilizáveis |
| 1 | Evidências incompletas, sem rastreabilidade ou com lacunas graves |
| 2 | Evidências adequadas, mas com alguma lacuna de rastreabilidade |
| 3 | Evidências completas, relevantes e com rastreabilidade adequada |
| 4 | Evidências excelentes, múltiplas fontes, rastreabilidade completa e explícita |

---

#### A9: Qualidade da Decisão (Juiz)

Avaliação qualitativa da fundamentação da decisão do Juiz, considerando clareza, uso das evidências e alinhamento com os critérios estabelecidos.

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (itens JUI-01 a JUI-04)

**Rubrica de Avaliação:**

| Pontuação | Descrição |
|-----------|-----------|
| 0 | Sem fundamentação ou decisão injustificável |
| 1 | Fundamentação vaga, não utiliza evidências adequadamente |
| 2 | Fundamentação adequada, mas com alguma fragilidade |
| 3 | Fundamentação clara e bem fundamentada nas evidências |
| 4 | Fundamentação excelente, com análise criteriosa de todas as evidências |

---

#### A10: Tempo Médio de Processamento (Polícia+Juiz)

`Tempo_Processamento = Tempo_Polícia + Tempo_Juiz`

Medido em minutos, desde o disparo do pipeline (após commit) até a decisão final do Juiz.

**Fonte dos dados:** [Checklist 1](#181-checklist-1--avaliação-de-audiência-polícia--juiz) (itens POL-12, JUI-05)

**Rubrica de Avaliação:**

| Pontuação | Critério (Tempo por inconsistência) |
|-----------|-------------------------------------|
| 0 | > 30 minutos por inconsistência |
| 1 | 20-30 minutos por inconsistência |
| 2 | 15-20 minutos por inconsistência |
| 3 | 10-15 minutos por inconsistência |
| 4 | < 10 minutos por inconsistência |

---

### 11.3 Grupo B — Métricas de Alinhamento Modelo-Código

As métricas deste grupo são calculadas **por sprint**, considerando **apenas os fragmentos de modelo e código correspondentes às tarefas planejadas e executadas naquela sprint**.

---

#### B1: Cobertura do Modelo

`Cobertura = (Elementos implementados / Elementos modelados) × 100`

**Fonte dos dados:** [Checklist 2](#182-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-03 a ALI-09)

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

**Fonte dos dados:** [Checklist 2](#182-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-10 a ALI-12)

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

**Fonte dos dados:** [Checklist 2](#182-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-13 a ALI-15)

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

**Fonte dos dados:** [Checklist 2](#182-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-16 a ALI-18)

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

**Fonte dos dados:** Calculado a partir das métricas [B1](#b1-cobertura-do-modelo), [B2](#b2-precisão-da-implementação), [B3](#b3-divergência-semântica) e [B4](#b4-over-engineering)

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

**Fonte dos dados:** [Checklist 2](#182-checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-20 a ALI-22)

**Rubrica de Avaliação:**

| Pontuação | Critério (Valor da Métrica) |
|-----------|-----------------------------|
| 0 | Rastreabilidade < 60% |
| 1 | 60% ≤ Rastreabilidade < 75% |
| 2 | 75% ≤ Rastreabilidade < 85% |
| 3 | 85% ≤ Rastreabilidade < 90% |
| 4 | Rastreabilidade ≥ 90% |

---

### 11.4 Resumo das Métricas

| Grupo | ID | Métrica | Unidade | Escopo | Fonte Principal |
|-------|-----|---------|---------|--------|-----------------|
| A | [A1](#a1-matriz-de-confusão-do-juiz) | Matriz de Confusão do Juiz | Qualitativo | Sprint | CH-01 |
| A | [A2](#a2-matriz-de-decisão-do-juiz) | Matriz de Decisão | Qualitativo | Sprint | CH-01 |
| A | [A3](#a3-precisão-da-polícia-precision) | Precisão da Polícia | 0-1 | Sprint | CH-01 |
| A | [A4](#a4-revocação-da-polícia-recall) | Revocação da Polícia | 0-1 | Sprint | CH-01 |
| A | [A5](#a5-f1-score-da-polícia) | F1-Score da Polícia | 0-1 | Sprint | Calculado |
| A | [A6](#a6-taxa-de-acerto-do-juiz-accuracy) | Acerto do Juiz | 0-1 | Sprint | CH-01 |
| A | [A7](#a7-taxa-de-concordância-com-árbitros) | Concordância | 0-1 | Sprint | CH-01 |
| A | [A8](#a8-qualidade-das-evidências-coletadas-polícia) | Qualidade das Evidências | 0-4 | Sprint | CH-01 |
| A | [A9](#a9-qualidade-da-decisão-juiz) | Qualidade da Decisão | 0-4 | Sprint | CH-01 |
| A | [A10](#a10-tempo-médio-de-processamento-políciajuiz) | Tempo de Processamento | minutos | Sprint | CH-01 |
| B | [B1](#b1-cobertura-do-modelo) | Cobertura do Modelo | % | Sprint | CH-02 + NE-02/NE-03 |
| B | [B2](#b2-precisão-da-implementação) | Precisão da Implementação | % | Sprint | CH-02 |
| B | [B3](#b3-divergência-semântica) | Divergência Semântica | % | Sprint | CH-02 |
| B | [B4](#b4-over-engineering) | Over-Engineering | % | Sprint | CH-02 + NE-03 |
| B | [B5](#b5-score-geral-de-alinhamento) | Score Geral | 0-100 | Sprint | Calculado |
| B | [B6](#b6-rastreabilidade) | Rastreabilidade | % | Sprint | CH-02 |

---

## 12. Síntese das Métricas por Sprint

| Grupo | Métrica | Pontuação (0-4) | Classificação |
|-------|---------|-----------------|---------------|
| A | Precisão da Polícia (A3) | __ | MB/B/R/B/E |
| A | Revocação da Polícia (A4) | __ | MB/B/R/B/E |
| A | F1-Score da Polícia (A5) | __ | MB/B/R/B/E |
| A | Acerto do Juiz (A6) | __ | MB/B/R/B/E |
| A | Concordância (A7) | __ | MB/B/R/B/E |
| A | Qualidade das Evidências (A8) | __ | MB/B/R/B/E |
| A | Qualidade da Decisão (A9) | __ | MB/B/R/B/E |
| B | Cobertura do Modelo (B1) | __ | MB/B/R/B/E |
| B | Precisão da Implementação (B2) | __ | MB/B/R/B/E |
| B | Score Geral de Alinhamento (B5) | __ | MB/B/R/B/E |
| B | Rastreabilidade (B6) | __ | MB/B/R/B/E |

---

## 13. Hipóteses

### H01: Pipeline de Verificação (Polícia + Juiz)
O pipeline composto pelo Agente Polícia e Agente Juiz não apresenta eficácia superior a 0,80 (nível "Bom") nas métricas de precisão, revocação e acerto.

### HA1: Pipeline de Verificação (Polícia + Juiz)
O pipeline composto pelo Agente Polícia e Agente Juiz apresenta eficácia superior a 0,80 (nível "Bom") nas métricas de precisão, revocação e acerto.

### H02: Alinhamento Modelo-Código
O pipeline completo de agentes não produz alinhamento modelo-código com score superior a 75 (nível "Bom" na rubrica 0-4).

### HA2: Alinhamento Modelo-Código
O pipeline completo de agentes produz alinhamento modelo-código com score superior a 75 (nível "Bom" na rubrica 0-4).

---

## 14. Materiais

| Material | Descrição |
|----------|-----------|
| Repositório Git | Versionamento e rastreabilidade |
| Sistema de issues | GitHub Issues ou Jira |
| PlantUML | Diagramas UML textuais |
| Framework frontend | React com TypeScript |
| Scripts de automação | Cálculo automático de métricas |
| Agentes de IA | API com prompts padronizados |

---

## 15. Estratégias de Construção do Prompt

| Agente | Estratégia |
|--------|-----------|
| Arquiteto | Few-shot com exemplos de diagramas; prompt em português; iterativo |
| Developer | Few-shot com exemplos de código; contexto inclui modelo UML |
| Polícia | Protocolo sistemático de verificação; checklists de evidências; foco em rastreabilidade |
| Juiz | Análise baseada em critérios; árvore de decisão documentada; fundamentação obrigatória |

---

## 16. Tarefas Executadas

### Por Sprint

| Tarefa | Responsável |
|--------|-------------|
| Planejamento da sprint | Ambos alunos |
| Modelagem | Agente Arquiteto + Aluno X |
| Codificação | Agente Developer + Aluno Daired |
| Commit | Aluno Daired |
| Coleta de evidências (Polícia) | Agente Polícia (humano piloto) |
| Análise de argumentos (Arquiteto/Developer) | Agentes Arquiteto/Developer |
| Julgamento (Juiz) | Agente Juiz (humano piloto) |
| Resolução de issues | Alunos |
| Merge | Alunos |
| Revisão final | Ambos + Professores |

---

## 17. Fontes de Extração de Dados Não Humanos

| ID | Nome | Métricas | Automação | Formato de Saída |
|----|------|----------|-----------|------------------|
| NE-01 | Logs da Polícia | A1, A2, A3, A4, A8, A10 | Script | JSON |
| NE-02 | Logs do Juiz | A1, A2, A6, A7, A9, A10 | Script | JSON |
| NE-03 | Parser PlantUML | B1, B2, B6 | Script | JSON |
| NE-04 | Parser AST | B1, B2, B4 | CI + Script | JSON |
| NE-05 | Sistema de Controle de Versão | A10, contexto | Git API | JSON |
| NE-06 | Sistema de Issues | Contexto | API | JSON |

---

## 18. Checklists para Coleta de Dados Humanos

### 18.1 Checklist 1 — Avaliação de Audiência (Polícia + Juiz)

*Preenchido pelos professores (árbitros humanos) para cada inconsistência.*

**Parte 1 — Identificação**

| ID | Item | Resposta |
|----|------|----------|
| AUD-01 | ID da inconsistência | __________ |
| AUD-02 | Sprint | __________ |
| AUD-03 | Data/hora da audiência | __________ |
| AUD-04 | Componente/arquivo | __________ |

**Parte 2 — Atuação da Polícia**

| ID | Item | Resposta |
|----|------|----------|
| POL-01 | A Polícia detectou alguma inconsistência neste artefato? | ☐ Sim ☐ Não |
| POL-02 | Se sim, quantas inconsistências foram reportadas? | __ |
| POL-03 | A(s) inconsistência(s) reportada(s) realmente existe(m)? | ☐ Todas ☐ Parcialmente ☐ Nenhuma |
| POL-04 | Houve inconsistência real que a Polícia NÃO detectou? | ☐ Sim ☐ Não |
| POL-05 | Se sim, quantas? | __ |
| POL-06 | A Polícia classificou corretamente o tipo da inconsistência? | ☐ Sim ☐ Não ☐ Não se aplica |
| POL-07 | As evidências coletadas foram suficientes para análise? | ☐ Sim ☐ Parcialmente ☐ Não |
| POL-08 | As evidências eram rastreáveis (link para artefato específico)? | ☐ Todas ☐ Algumas ☐ Nenhuma |
| POL-09 | As evidências eram objetivas (fatos, não opiniões)? | ☐ Todas ☐ Algumas ☐ Nenhuma |
| POL-10 | Qualidade geral das evidências (0-4) | __ |
| POL-11 | Tempo gasto pela Polícia (minutos) | __ |

**Parte 3 — Atuação do Juiz**

| ID | Item | Resposta |
|----|------|----------|
| JUI-01 | Decisão do Juiz | ☐ DE ☐ AE ☐ AE ☐ NE |
| JUI-02 | Decisão correta (conforme árbitro) | ☐ DE ☐ AE ☐ AE ☐ NE |
| JUI-03 | O Juiz utilizou as evidências corretamente? | ☐ Sim ☐ Parcialmente ☐ Não |
| JUI-04 | Fundamentação do Juiz foi clara e coerente? (0-4) | __ |
| JUI-05 | Tempo gasto pelo Juiz (minutos) | __ |
| JUI-06 | Argumento do Arquiteto foi relevante? (0-4) | __ |
| JUI-07 | Argumento do Developer foi relevante? (0-4) | __ |
| JUI-08 | Comentários adicionais | __________ |

**Parte 4 — Concordância Geral**

| ID | Item | Resposta |
|----|------|----------|
| AUD-10 | Decisão do Juiz coincide com a do árbitro? | ☐ Sim ☐ Não |
| AUD-11 | Se não, qual a decisão correta? | ☐ DE ☐ AE ☐ AE ☐ NE |
| AUD-12 | Houve consenso entre Arquiteto e Developer? | ☐ Sim ☐ Não ☐ Parcial |

---

### 18.2 Checklist 2 — Avaliação de Alinhamento Modelo-Código

| ID | Item | Valor | Fonte |
|----|------|-------|-------|
| ALI-01 | Sprint | __________ | - |
| ALI-02 | Componente/módulo | __________ | - |
| ALI-03 | Classes modeladas | __ | NE-03 |
| ALI-04 | Classes implementadas | __ | NE-04 |
| ALI-05 | Métodos modelados | __ | NE-03 |
| ALI-06 | Métodos implementados | __ | NE-04 |
| ALI-07 | Atributos modelados | __ | NE-03 |
| ALI-08 | Atributos implementados | __ | NE-04 |
| ALI-09 | Cobertura do modelo (B1) | __% | Calculado |
| ALI-10 | Implementações corretas | __ | Validação manual |
| ALI-11 | Total de implementações | __ | NE-04 |
| ALI-12 | Precisão da implementação (B2) | __% | Calculado |
| ALI-13 | Comportamentos divergentes | __ | Validação manual |
| ALI-14 | Divergência semântica (B3) | __% | Calculado |
| ALI-15 | Lista de divergências | __________ | Manual |
| ALI-16 | Linhas não modeladas | __ LOC | NE-04 |
| ALI-17 | Linhas totais | __ LOC | NE-04 |
| ALI-18 | Over-Engineering (B4) | __% | Calculado |
| ALI-19 | Score Geral (B5) | __ | Calculado |
| ALI-20 | Total de RFs no escopo | __ | Documento |
| ALI-21 | RFs com rastreabilidade completa | __ | NE-03+NE-04 |
| ALI-22 | Rastreabilidade (B6) | __% | Calculado |

---

### 18.3 Checklist 3 — Registro de Configuração do Experimento

| ID | Item | Valor | Data |
|----|------|-------|------|
| CFG-01 | Versão do Agente Arquiteto | __________ | ______ |
| CFG-02 | Versão do Agente Developer | __________ | ______ |
| CFG-03 | Versão do Agente Polícia | __________ | ______ |
| CFG-04 | Versão do Agente Juiz | __________ | ______ |
| CFG-05 | Temperatura dos LLMs | __________ | ______ |
| CFG-06 | max_tokens | __________ | ______ |
| CFG-07 | Versão do prompt (Arquiteto) | __________ | ______ |
| CFG-08 | Versão do prompt (Developer) | __________ | ______ |
| CFG-09 | Versão do prompt (Polícia) | __________ | ______ |
| CFG-10 | Versão do prompt (Juiz) | __________ | ______ |
| CFG-11 | Framework frontend | __________ | ______ |
| CFG-12 | Ferramenta de modelagem | PlantUML | ______ |
| CFG-13 | Repositório Git (URL) | __________ | ______ |
| CFG-14 | Duração da sprint (dias) | __ | ______ |
| CFG-15 | Total de sprints planejadas | __ | ______ |

---

### 18.4 Resumo dos Checklists de Dados Humanos

| ID | Nome | Métricas | Responsável | Frequência |
|----|------|----------|-------------|------------|
| CH-01 | Avaliação de Audiência (Polícia+Juiz) | A1 a A10 | Professores | A cada inconsistência |
| CH-02 | Alinhamento Modelo-Código | B1 a B6 | Alunos + Professores | Final de cada sprint |
| CH-03 | Configuração do Experimento | Contexto | Alunos | Pré-experimento e mudanças |

---

## 19. Benefícios e Contribuições Esperadas

| Benefício | Descrição |
|-----------|-----------|
| Separação de responsabilidades | Evidências sobre os benefícios de separar coleta de evidências e julgamento em pipelines de verificação |
| Protocolo replicável | Para avaliação de pipelines de dois estágios (coleta + decisão) |
| Métricas de eficácia | Conjunto de métricas para avaliar separadamente a qualidade da coleta e do julgamento |
| Compreensão do alinhamento | Identificação dos fatores que afetam o alinhamento modelo-código |

---

## 20. Limitações e Ameaças à Validade

### 20.1 Ameaças à Validade Interna

| Ameaça | Mitigação |
|--------|-----------|
| Vazamento/contaminação de dados | Especificações originais; documentar versões |
| Viés do humano piloto (mesmo operador para Polícia e Juiz) | Protocolos rígidos de separação; auditoria das decisões |
| Efeito Hawthorne | Baseline com desenvolvimento sem pipeline |

### 20.2 Ameaças à Validade Externa

| Ameaça | Mitigação |
|--------|-----------|
| Generalização | Reconhecer limitação; discutir transferabilidade |
| Especificidade dos participantes | Reconhecer limitação; sugerir replicações |

### 20.3 Ameaças à Validade de Constructo

| Ameaça | Mitigação |
|--------|-----------|
| Operacionalização inadequada | Métricas validadas na literatura |
| Confusão entre papéis (Polícia vs Juiz) | Protocolos claros; treinamento específico |

### 20.4 Ameaças à Validade de Conclusão

| Ameaça | Mitigação |
|--------|-----------|
| Natureza não determinística dos LLMs | Reportar versões, datas, parâmetros |
| Pequeno tamanho amostral | Reconhecer; tratar como evidências exploratórias |
| Confiabilidade da avaliação humana | Rubrica detalhada; múltiplos avaliadores |

---

## 21. Referências

[1] SHULL, Forrest; SINGER, Janice; SJØBERG, Dag I. K. (eds.). *Guide to Advanced Empirical Software Engineering*. London: Springer-Verlag, 2008.

[2] WOHLIN, Claes et al. *Experimentation in Software Engineering*. Berlin: Springer, 2012.

[3] BALTES, Sebastian et al. *Guidelines for Empirical Studies in Software Engineering involving Large Language Models*. 2025. arXiv:2508.15503.

[4] TEIXEIRA, E.; FONSECA, L.; SOARES, S. Threats to validity in controlled experiments in software engineering. In: *SBES 2018*. ACM, 2018. p. 52-61.

[5] BASILI, Victor R.; SHULL, Forrest; LANUBILE, Filippo. Building knowledge through families of experiments. *IEEE TSE*, v. 25, n. 4, p. 456-473, 1999.

[6] KITCHENHAM, Barbara et al. Preliminary guidelines for empirical research in software engineering. *IEEE TSE*, v. 28, n. 8, p. 721-734, 2002.

---

**Data de elaboração:** 28/05/2026
**Versão:** 8.0
**Status:** Protocolo com separação Polícia/Juiz (mesmo humano piloto)