# Protocolo de Pesquisa

**UNIVERSIDADE FEDERAL DE GOIÁS — INSTITUTO DE INFORMÁTICA — PROGRAMA DE PÓS-GRADUAÇÃO EM CIÊNCIA DA COMPUTAÇÃO**

**DISCIPLINA:** CCO0448 – Engenharia de Software
**PROFESSOR:** Valdemar Vicente Graciano Neto
**TURMA:** A
**PARTICIPANTES:** Daired
**DATA:** 14 de maio de 2026

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
    - [Grupo A — Qualidade do Agente Juiz](#grupo-a--métricas-de-qualidade-do-agente-juiz)
    - [Grupo B — Alinhamento Modelo-Código](#grupo-b--métricas-de-alinhamento-modelo-código)
    - [Grupo C — Qualidade de Código](#grupo-c--métricas-de-qualidade-de-código)
    - [Grupo D — Processo](#grupo-d--métricas-de-processo)
11. [Hipóteses](#hipóteses)
12. [Materiais](#materiais)
13. [Estratégias de Construção do Prompt](#estratégias-de-construção-do-prompt)
14. [Tarefas Executadas](#tarefas-executadas)
15. [Fontes de Extração de Dados Não Humanos](#fontes-de-extração-de-dados-não-humanos)
16. [Checklists para Coleta de Dados Humanos](#checklists-para-coleta-de-dados-humanos)
    - [Checklist 1 — Audiência do Juiz](#checklist-1--avaliação-de-audiência-do-agente-juiz)
    - [Checklist 2 — Alinhamento Modelo-Código](#checklist-2--avaliação-de-alinhamento-modelo-código)
    - [Checklist 3 — Qualidade do Código](#checklist-3--avaliação-de-qualidade-do-código)
    - [Checklist 4 — Métricas de Processo](#checklist-4--métricas-de-processo)
    - [Checklist 5 — Satisfação do Desenvolvedor](#checklist-5--questionário-de-satisfação-do-desenvolvedor-d4)
    - [Checklist 6 — Rubrica de Justificativa](#checklist-6--avaliação-da-qualidade-da-justificativa-rubrica-a8-detalhada)
    - [Checklist 7 — Rastreabilidade](#checklist-7--rastreabilidade-rfmodelocódigoteste-b6)
    - [Checklist 8 — Configuração do Experimento](#checklist-8--registro-de-configuração-do-experimento)
17. [Síntese das Métricas por Sprint](#síntese-das-métricas-por-sprint)
18. [Benefícios e Contribuições Esperadas](#benefícios-e-contribuições-esperadas)
19. [Limitações e Ameaças à Validade](#limitações-e-ameaças-à-validade)
20. [Referências](#referências)

---

## Informações Gerais

| Campo | Descrição |
|-------|-----------|
| **TÍTULO** | Ressurreição da Engenharia Orientada a Modelos com Auxílio de Agentes de IA e Desenvolvimento Orientado a Especificações – Um Estudo Experimental sobre Qualidade de Código e Redução de Dívida Técnica |
| **TEMA** | Estudo empírico experimental sobre a combinação de Engenharia Orientada a Modelos (MDE), Desenvolvimento Orientado a Especificações (SDD) e um pipeline de três agentes de IA (Arquiteto, Developer e Juiz) para produção de código frontend de alta qualidade com redução de dívida técnica. |
| **DESCRIÇÃO** | O intuito deste estudo consiste em investigar se a combinação de MDE com SDD, orquestrada por um pipeline de três agentes de IA, produz código frontend de maior qualidade, maior fidelidade ao modelo e menor dívida técnica em comparação ao desenvolvimento assistido por IA sem modelagem estruturada. Para isso, será realizado um experimento controlado em ciclos de sprint (Scrum), onde cada commit dispara o Agente Juiz, que verifica inconsistências entre modelo e código, abre issues para inconsistências detectadas e bloqueia o merge até a resolução. |

---

## Contextualização e Motivação

O desenvolvimento de software assistido por Inteligência Artificial tem ganhado crescente atenção, especialmente com o avanço dos Modelos de Linguagem de Grande Escala (LLMs). No entanto, observou-se em projetos práticos que, na ausência de uma modelagem clara e de técnicas estruturadas de controle sobre o código gerado por IA, o desenvolvimento sofre atrasos significativos e perda de qualidade de código. Este problema foi particularmente evidente no desenvolvimento de um frontend realizado do zero, onde a falta de um modelo forte resultou em retrabalho e acúmulo de dívida técnica.

A Engenharia Orientada a Modelos (MDE) — que propõe o uso de modelos como artefatos centrais do desenvolvimento — perdeu espaço com a ascensão dos métodos ágeis, sendo considerada por muitos como uma abordagem pesada e de difícil adoção. Contudo, o cenário atual com agentes de IA capazes de interpretar e gerar artefatos a partir de modelos resgata o potencial da MDE, especialmente quando combinada com o Desenvolvimento Orientado a Especificações (SDD), que enfatiza a rastreabilidade entre especificação, modelo e código.

Neste contexto, esta pesquisa propõe um pipeline de três agentes de IA:

1. **Agente Arquiteto**: trabalha colaborativamente com o aluno para produzir e refinar o modelo UML (diagramas de classes, sequência, atividades) a partir das especificações.
2. **Agente Developer**: trabalha colaborativamente com o aluno para gerar código frontend a partir do modelo estabelecido.
3. **Agente Juiz**: atua como mecanismo de verificação contínua, detectando inconsistências entre modelo e código a cada commit, conduzindo uma "audiência" entre os agentes Arquiteto e Developer para justificar decisões, e bloqueando merges até que inconsistências sejam resolvidas.

O processo ocorre em ciclos de sprint (Scrum), onde cada commit dispara o Agente Juiz. Este modelo visa não apenas melhorar a qualidade do código gerado, mas também controlar e reduzir a dívida técnica acumulada ao longo do desenvolvimento.

---

## Objetivos

### Objetivo Geral

Avaliar e comparar a qualidade do código frontend gerado, a fidelidade ao modelo e a dívida técnica acumulada quando se utiliza um pipeline de três agentes de IA (Arquiteto, Developer e Juiz) baseado em MDE+SDD, em comparação com o desenvolvimento assistido por IA sem modelagem estruturada.

### Objetivo GQM (Goal-Question-Metric)

Esta pesquisa busca **analisar** o pipeline de agentes de IA com MDE+SDD com o propósito de **avaliar** a qualidade do código gerado, o alinhamento entre modelo e código, e a dívida técnica acumulada sob a perspectiva de **pesquisadores e desenvolvedores** no contexto de um **experimento controlado com ciclos de sprint**, no qual o Agente Juiz atua como mecanismo de verificação contínua e bloqueio de inconsistências.

---

## Questões de Pesquisa

### QP1: O pipeline de agentes de IA produz código frontend de maior qualidade em comparação ao desenvolvimento assistido por IA sem modelagem estruturada?

**Rationale:** Ao responder a esta pergunta, espera-se obter evidências empíricas sobre se a abordagem proposta — que combina modelagem estruturada com verificação automatizada por agente Juiz — resulta em código tecnicamente superior.

### QP2: Qual é o nível de alinhamento alcançado pelo pipeline de agentes, e como esse alinhamento evolui ao longo das sprints?

**Rationale:** Espera-se que a resposta forneça evidências sobre a eficácia do Agente Juiz em manter a consistência entre modelo e código.

### QP3: O Agente Juiz é eficaz na detecção de inconsistências, com alta precisão e revocação, e sua atuação contribui para a redução da dívida técnica?

**Rationale:** Espera-se avaliar o desempenho do Agente Juiz como mecanismo de controle de qualidade e seu impacto na redução da dívida técnica.

### QP4: Quais são os pontos fortes e fracos do pipeline observados durante o processo?

**Rationale:** Espera-se identificar aspectos processuais que facilitam ou dificultam a adoção da abordagem proposta.

---

## Método de Pesquisa

**Experimento controlado**, pois o objetivo é estabelecer uma relação causal entre o uso do pipeline de agentes de IA com MDE+SDD (variável independente) e as métricas de qualidade de código, alinhamento modelo-código, e dívida técnica (variáveis dependentes). O experimento ocorrerá em ciclos de sprint (Scrum), com duração estimada de 1 a 2 semanas cada.

---

## Participantes

### Grupo 1 — Desenvolvedores (Alunos Pesquisadores)

| Papel | Responsabilidade |
|-------|------------------|
| Agente Arquiteto + Aluno X | Modelagem colaborativa do frontend utilizando UML textual (PlantUML) |
| Agente Developer + Aluno Daired | Codificação colaborativa do frontend a partir do modelo estabelecido |

**Critérios de inclusão:** Conhecimento avançado em desenvolvimento frontend, experiência prévia com UML, disponibilidade para todas as sprints.

### Grupo 2 — Avaliadores (Juízes Humanos)

| Papel | Responsabilidade |
|-------|------------------|
| Agente Juiz + Professores Orientadores | Validar as decisões do Agente Juiz nas audiências, atuando como árbitros humanos |

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
| Qualidade do código | Complexidade ciclomática; cobertura de testes; taxa de regressão |
| Alinhamento modelo-código | Cobertura do modelo; precisão; divergência semântica; over-engineering |
| Dívida técnica | Dívida por sprint; tempo de resolução de inconsistências |
| Eficácia do Agente Juiz | Precisão; recall; F1-score; taxas de FP e FN |
| Eficiência do processo | Velocidade de entrega; taxa de rejeição; churn do modelo |

---

## Avaliação e Métricas

---

### Grupo A — Métricas de Qualidade do Agente Juiz

---

#### A1: Matriz de Confusão do Juiz

| Cenário | Nome | Descrição |
|---------|------|-----------|
| **TP** | Verdadeiro Positivo | Juiz detectou inconsistência que realmente existe |
| **TN** | Verdadeiro Negativo | Juiz não detectou inconsistência onde não existe |
| **FP** | Falso Positivo | Juiz detectou inconsistência que não existia |
| **FN** | Falso Negativo | Juiz não detectou inconsistência que existia |

**Fonte dos dados:** [Checklist 1 — Avaliação de Audiência do Agente Juiz](#checklist-1--avaliação-de-audiência-do-agente-juiz) (itens AUD-06, AUD-07, AUD-08, AUD-09)

---

#### A2: Precisão do Juiz (Precision)

`Precisão = TP / (TP + FP)`

**Target:** ≥ 0,85

**Fonte dos dados:** [Checklist 1 — Avaliação de Audiência do Agente Juiz](#checklist-1--avaliação-de-audiência-do-agente-juiz) (contagem de TP e FP a partir dos registros de audiência)

---

#### A3: Revocação do Juiz (Recall)

`Recall = TP / (TP + FN)`

**Target:** ≥ 0,80

**Fonte dos dados:** [Checklist 1 — Avaliação de Audiência do Agente Juiz](#checklist-1--avaliação-de-audiência-do-agente-juiz) (contagem de TP e FN)

---

#### A4: F1-Score do Juiz

`F1 = 2 × (Precisão × Recall) / (Precisão + Recall)`

**Target:** ≥ 0,82

**Fonte dos dados:** Calculado a partir das métricas A2 e A3

---

#### A5: Taxa de Falso Negativo (FNR)

`FNR = FN / (TP + FN)`

**Target:** ≤ 0,20

**Fonte dos dados:** [Checklist 1 — Avaliação de Audiência do Agente Juiz](#checklist-1--avaliação-de-audiência-do-agente-juiz) (itens onde Juiz não detectou inconsistência existente)

---

#### A6: Taxa de Falso Positivo (FPR)

`FPR = FP / (FP + TN)`

**Target:** ≤ 0,15

**Fonte dos dados:** [Checklist 1 — Avaliação de Audiência do Agente Juiz](#checklist-1--avaliação-de-audiência-do-agente-juiz) (itens onde Juiz detectou inconsistência inexistente)

---

#### A7: Taxa de Concordância na Audiência

`Concordância = (Veredictos alinhados com árbitros) / (Total de audiências)`

**Target:** ≥ 0,80

**Fonte dos dados:** [Checklist 1 — Avaliação de Audiência do Agente Juiz](#checklist-1--avaliação-de-audiência-do-agente-juiz) (item AUD-08)

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

**Fonte dos dados:** [Checklist 6 — Avaliação da Qualidade da Justificativa](#checklist-6--avaliação-da-qualidade-da-justificativa-rubrica-a8-detalhada) (cálculo ponderado dos quatro critérios)

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

**Fonte dos dados:** [Checklist 2 — Avaliação de Alinhamento Modelo-Código](#checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-10 a ALI-12)

---

#### B3: Divergência Semântica

`Divergência = (Comportamentos divergentes / Total de implementações) × 100`

| Status | Range |
|--------|-------|
| 🟢 Excelente | 0% |
| 🟡 Aceitável | 1–5% |
| 🔴 Crítico | > 5% |

**Fonte dos dados:** [Checklist 2 — Avaliação de Alinhamento Modelo-Código](#checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-13 a ALI-15)

---

#### B4: Over-Engineering

`Over-Engineering = (Código não modelado / Total de código) × 100`

| Status | Range |
|--------|-------|
| 🟢 Excelente | 0–10% |
| 🟡 Aceitável | 11–20% |
| 🔴 Crítico | > 20% |

**Fonte dos dados:** [Checklist 2 — Avaliação de Alinhamento Modelo-Código](#checklist-2--avaliação-de-alinhamento-modelo-código) (itens ALI-16 a ALI-18) + [Fonte de Extração de Dados Não Humanos — Análise Estática de Código](#fonte-de-extração-de-dados-não-humanos--análise-estática-de-código)

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

`Rastreabilidade = (RFs com cadeia completa) / (Total de RFs) × 100`

**Target:** ≥ 90%

**Fonte dos dados:** [Checklist 7 — Rastreabilidade RF→Modelo→Código→Teste](#checklist-7--rastreabilidade-rfmodelocódigoteste-b6)

---

### Grupo C — Métricas de Qualidade de Código

---

#### C1: Dívida Técnica Acumulada por Sprint

`Dívida por Sprint = Issues abertas pelo Juiz não resolvidas ao final da sprint`

**Fonte dos dados:** [Fonte de Extração de Dados Não Humanos — Sistema de Issues](#fonte-de-extração-de-dados-não-humanos--sistema-de-issues) + [Checklist 3 — Avaliação de Qualidade do Código](#checklist-3--avaliação-de-qualidade-do-código) (itens COD-14 a COD-16)

---

#### C2: Tempo de Resolução de Inconsistências

`Tempo médio = Σ(tempo_fechamento − tempo_abertura) / Total de issues`

**Target:** Tendência de queda

**Fonte dos dados:** [Fonte de Extração de Dados Não Humanos — Sistema de Issues](#fonte-de-extração-de-dados-não-humanos--sistema-de-issues) (timestamps de criação e fechamento) + [Checklist 3](#checklist-3--avaliação-de-qualidade-do-código) (itens COD-17, COD-18)

---

#### C3: Complexidade Ciclomática Média

`Complexidade Média = Σ(complexidade por função) / Número de funções`

**Target:** ≤ 10

**Fonte dos dados:** [Fonte de Extração de Dados Não Humanos — Análise Estática de Código](#fonte-de-extração-de-dados-não-humanos--análise-estática-de-código) (via ESLint, radon ou ferramenta similar) + [Checklist 3](#checklist-3--avaliação-de-qualidade-do-código) (itens COD-03 a COD-05)

---

#### C4: Cobertura de Testes

`Cobertura = (Linhas cobertas / Total de linhas) × 100`

**Target:** ≥ 70%

**Fonte dos dados:** [Fonte de Extração de Dados Não Humanos — Framework de Testes](#fonte-de-extração-de-dados-não-humanos--framework-de-testes) (Jest com `--coverage`) + [Checklist 3](#checklist-3--avaliação-de-qualidade-do-código) (itens COD-06 a COD-08)

---

#### C5: Taxa de Regressão

`Regressão = (Testes que passavam e agora falham) / (Total de testes que passavam antes) × 100`

**Target:** ≤ 5%

**Fonte dos dados:** [Fonte de Extração de Dados Não Humanos — Framework de Testes](#fonte-de-extração-de-dados-não-humanos--framework-de-testes) (comparação entre execuções de testes) + [Checklist 3](#checklist-3--avaliação-de-qualidade-do-código) (itens COD-09 a COD-13)

---

### Grupo D — Métricas de Processo

---

#### D1: Velocidade de Entrega por Sprint

`Velocidade = Σ(Story Points entregues) / Duração da sprint`

**Fonte dos dados:** [Checklist 4 — Métricas de Processo](#checklist-4--métricas-de-processo) (itens PRO-05 a PRO-07)

---

#### D2: Taxa de Rejeição de Branch

`Taxa de Rejeição = (Commits rejeitados) / (Total de commits) × 100`

**Esperado:** Queda ao longo das sprints

**Fonte dos dados:** [Fonte de Extração de Dados Não Humanos — Sistema de Controle de Versão](#fonte-de-extração-de-dados-não-humanos--sistema-de-controle-de-versão) (Git hooks e logs) + [Checklist 4](#checklist-4--métricas-de-processo) (itens PRO-08 a PRO-11)

---

#### D3: Churn do Modelo

`Churn do Modelo = Revisões de modelo iniciadas pelo Developer / Total de sprints`

**Fonte dos dados:** [Fonte de Extração de Dados Não Humanos — Sistema de Controle de Versão](#fonte-de-extração-de-dados-não-humanos--sistema-de-controle-de-versão) (histórico de commits no diretório de modelos) + [Checklist 4](#checklist-4--métricas-de-processo) (itens PRO-12 a PRO-15)

---

#### D4: Satisfação do Desenvolvedor

Questionário Likert (1–5) avaliando: clareza do modelo, utilidade do feedback, carga cognitiva, confiança na qualidade.

**Target:** ≥ 4/5

**Fonte dos dados:** [Checklist 5 — Questionário de Satisfação do Desenvolvedor](#checklist-5--questionário-de-satisfação-do-desenvolvedor-d4) (itens SAT-01 a SAT-10)

---

## Hipóteses

### H01 (Hipótese Nula Principal)
Não há diferença significativa na qualidade do código gerado, no alinhamento modelo-código e na dívida técnica acumulada quando se utiliza o pipeline de agentes.

### HA1 (Hipótese Alternativa Principal)
Há diferença significativa na qualidade do código gerado, no alinhamento modelo-código e na dívida técnica acumulada quando se utiliza o pipeline de agentes.

### H02 (Hipótese Nula Secundária)
O Agente Juiz não apresenta precisão e revocação superiores a 0,80.

### HA2 (Hipótese Alternativa Secundária)
O Agente Juiz apresenta precisão e revocação superiores a 0,80.

---

## Materiais

| Material | Descrição |
|----------|-----------|
| Repositório Git | Versionamento e rastreabilidade |
| Sistema de issues | GitHub Issues ou Jira |
| PlantUML | Diagramas UML textuais |
| Framework frontend | React com TypeScript |
| Análise estática | ESLint, Prettier, SonarQube |
| Cobertura de testes | Jest + Testing Library |
| Scripts de automação | Cálculo automático de métricas |
| Agentes de IA | API com prompts padronizados |

---

## Estratégias de Construção do Prompt

| Agente | Estratégia |
|--------|-----------|
| Arquiteto | Few-shot com exemplos de diagramas; prompt em português; iterativo |
| Developer | Few-shot com exemplos de código; contexto inclui modelo UML |
| Juiz | Zero-shot inicial; aprendizado com audiências |

---

## Tarefas Executadas

### Por Sprint

| Tarefa | Responsável |
|--------|-------------|
| Planejamento da sprint | Ambos alunos |
| Modelagem | Agente Arquiteto + Aluno X |
| Codificação | Agente Developer + Aluno Daired |
| Commit | Aluno Daired |
| Verificação do Juiz | Agente Juiz |
| Audiência | Agentes + Professores |
| Resolução de issues | Alunos |
| Merge | Alunos |
| Revisão final | Ambos + Professores |

---

## Fontes de Extração de Dados Não Humanos

Este capítulo descreve todas as fontes automatizadas de coleta de dados que **não dependem de intervenção humana** (ou seja, não são checklists preenchidos manualmente). Essas fontes alimentam as métricas dos Grupos A, B, C e D, complementando os dados coletados por meio dos checklists.

---

### Fonte NE-01: Sistema de Controle de Versão (Git)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Repositório Git utilizado para versionamento do código fonte, modelos e documentação. |
| **Dados extraídos** | Histórico de commits, autores, datas, mensagens, arquivos alterados, hashes de commit. |
| **Métricas relacionadas** | [D2 (Taxa de Rejeição de Branch)](#d2-taxa-de-rejeição-de-branch), [D3 (Churn do Modelo)](#d3-churn-do-modelo), [C2 (Tempo de Resolução)](#c2-tempo-de-resolução-de-inconsistências) |
| **Ferramenta de extração** | `git log`, `git diff`, `git rev-list`, GitHub API |
| **Script de automação** | `scripts/extract-git-metrics.sh` |
| **Frequência de coleta** | A cada commit (trigger do Agente Juiz) e ao final de cada sprint |
| **Local de armazenamento** | Banco de dados de métricas (via script de ETL) |

---

### Fonte NE-02: Sistema de Issues (GitHub Issues / Jira)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Sistema de rastreamento de issues onde o Agente Juiz registra inconsistências detectadas. |
| **Dados extraídos** | ID da issue, data de criação, data de fechamento, status (aberta/fechada), labels, comentários, assignee. |
| **Métricas relacionadas** | [C1 (Dívida Técnica)](#c1-dívida-técnica-acumulada-por-sprint), [C2 (Tempo de Resolução)](#c2-tempo-de-resolução-de-inconsistências) |
| **Ferramenta de extração** | GitHub API, Jira REST API |
| **Script de automação** | `scripts/extract-issues-metrics.py` |
| **Frequência de coleta** | A cada interação do Agente Juiz e ao final de cada sprint |
| **Local de armazenamento** | Banco de dados de métricas |

---

### Fonte NE-03: Análise Estática de Código

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Ferramentas de análise estática para extrair métricas de complexidade e qualidade do código fonte. |
| **Dados extraídos** | Complexidade ciclomática por função, linhas de código por função, número de funções/métodos, duplicação de código, violações de estilo. |
| **Métricas relacionadas** | [C3 (Complexidade Ciclomática)](#c3-complexidade-ciclomática-média), [B4 (Over-Engineering)](#b4-over-engineering) (parcialmente) |
| **Ferramenta de extração** | ESLint (`complexity` rule), radon (Python), SonarQube Scanner |
| **Script de automação** | `scripts/run-static-analysis.sh` |
| **Frequência de coleta** | A cada commit (via CI) e ao final de cada sprint |
| **Local de armazenamento** | Banco de dados de métricas (via parser dos relatórios JSON) |

---

### Fonte NE-04: Framework de Testes (Jest)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Framework de testes executado automaticamente no pipeline de CI/CD. |
| **Dados extraídos** | Número total de testes, testes que passam, testes que falham, cobertura de linhas, instruções e branches. |
| **Métricas relacionadas** | [C4 (Cobertura de Testes)](#c4-cobertura-de-testes), [C5 (Taxa de Regressão)](#c5-taxa-de-regressão) |
| **Ferramenta de extração** | Jest com `--coverage --json` |
| **Script de automação** | `scripts/run-tests-and-extract.sh` |
| **Frequência de coleta** | A cada commit (via CI) e ao final de cada sprint |
| **Local de armazenamento** | Banco de dados de métricas (via parser do JSON de saída do Jest) |

---

### Fonte NE-05: Pipeline de CI/CD (GitHub Actions / GitLab CI)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Pipeline de integração contínua que executa automaticamente as verificações a cada commit. |
| **Dados extraídos** | Status de cada job (sucesso/falha), tempo de execução, logs de saída, artefatos gerados. |
| **Métricas relacionadas** | [D2 (Taxa de Rejeição de Branch)](#d2-taxa-de-rejeição-de-branch) (indiretamente), [C5 (Regressão)](#c5-taxa-de-regressão) |
| **Ferramenta de extração** | GitHub Actions API, GitLab CI API |
| **Script de automação** | `scripts/extract-ci-metrics.py` |
| **Frequência de coleta** | A cada execução de pipeline (trigger por commit) |
| **Local de armazenamento** | Banco de dados de métricas |

---

### Fonte NE-06: Parser de Modelos UML (PlantUML)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Script para extrair elementos dos diagramas PlantUML (classes, métodos, atributos, relacionamentos). |
| **Dados extraídos** | Lista de classes, métodos por classe, atributos por classe, tipos de relacionamento, parâmetros de métodos. |
| **Métricas relacionadas** | [B1 (Cobertura do Modelo)](#b1-cobertura-do-modelo), [B2 (Precisão)](#b2-precisão-da-implementação), [B6 (Rastreabilidade)](#b6-rastreabilidade) |
| **Ferramenta de extração** | Python com regex e parsing de texto estruturado (PlantUML) |
| **Script de automação** | `scripts/parse-plantuml.py` |
| **Frequência de coleta** | A cada atualização do modelo (início e fim de sprint, e quando houver revisões) |
| **Local de armazenamento** | Arquivo JSON (`model_elements_<sprint>.json`) e banco de dados |

---

### Fonte NE-07: Parser de Código Fonte (AST)

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Script para extrair elementos do código fonte via Análise de Sintaxe Abstrata (AST). |
| **Dados extraídos** | Lista de classes, métodos, atributos, parâmetros, tipos de retorno, chamadas de método. |
| **Métricas relacionadas** | [B1 (Cobertura do Modelo)](#b1-cobertura-do-modelo), [B2 (Precisão)](#b2-precisão-da-implementação), [B4 (Over-Engineering)](#b4-over-engineering) |
| **Ferramenta de extração** | Python com `ast` module (para Python) ou `tree-sitter` (para TypeScript/JavaScript) |
| **Script de automação** | `scripts/parse-code-ast.py` |
| **Frequência de coleta** | A cada commit (via CI) e ao final de cada sprint |
| **Local de armazenamento** | Arquivo JSON (`code_elements_<commit>.json`) e banco de dados |

---

### Fonte NE-08: Logs do Agente Juiz

| Propriedade | Descrição |
|-------------|-----------|
| **Descrição** | Registros automáticos gerados pelo Agente Juiz durante a verificação de inconsistências. |
| **Dados extraídos** | ID do commit verificado, inconsistências detectadas (tipo, localização, severidade), veredicto inicial. |
| **Métricas relacionadas** | [A1 a A8 (todas as métricas do Grupo A)](#grupo-a--métricas-de-qualidade-do-agente-juiz) |
| **Ferramenta de extração** | Sistema de logging do Agente Juiz (saída em JSON) |
| **Script de automação** | `scripts/extract-juiz-logs.py` |
| **Frequência de coleta** | A cada execução do Agente Juiz (trigger por commit) |
| **Local de armazenamento** | Banco de dados de métricas (`juiz_audits` table) |

---

### Resumo das Fontes de Dados Não Humanos

| ID da Fonte | Nome | Métricas que Alimenta | Automação |
|-------------|------|----------------------|-----------|
| NE-01 | Sistema de Controle de Versão | D2, D3, C2 | Script + API |
| NE-02 | Sistema de Issues | C1, C2 | Script + API |
| NE-03 | Análise Estática de Código | C3, B4 | CI + Script |
| NE-04 | Framework de Testes | C4, C5 | CI + Script |
| NE-05 | Pipeline de CI/CD | D2, C5 | API |
| NE-06 | Parser PlantUML | B1, B2, B6 | Script |
| NE-07 | Parser AST de Código | B1, B2, B4 | Script |
| NE-08 | Logs do Agente Juiz | A1 a A8 | Script |

---

## Checklists para Coleta de Dados Humanos

---

### Checklist 1 — Avaliação de Audiência do Agente Juiz

*Preenchido pelos professores para cada inconsistência detectada.*

| ID | Item | Resposta |
|----|------|----------|
| AUD-01 | ID da inconsistência | __________ |
| AUD-02 | Sprint | __________ |
| AUD-03 | Data/hora | __________ |
| AUD-04 | Componente/arquivo | __________ |
| AUD-05 | Tipo de inconsistência | ☐ Sintaxe ☐ Semântica ☐ Estrutural ☐ Comportamental |
| AUD-06 | Juiz classificou corretamente o tipo? | ☐ Sim ☐ Não |
| AUD-07 | Veredicto do Juiz | ☐ Inconsistência legítima ☐ Decisão consciente |
| AUD-08 | Árbitro concorda? | ☐ Sim ☐ Não |
| AUD-09 | Se discordou, seu veredicto | ☐ Inconsistência legítima ☐ Decisão consciente |
| AUD-10 | Argumento do Arquiteto (1-5) | __ |
| AUD-11 | Argumento do Developer (1-5) | __ |
| AUD-12 | Consenso entre agentes? | ☐ Sim ☐ Não ☐ Parcial |
| AUD-13 | Qualidade da justificativa (0-4) | __ |
| AUD-14 | Evidências apresentadas | ☐ Modelo ☐ Código ☐ Especificação ☐ Nenhuma |
| AUD-15 | Tempo da audiência (min) | __ |
| AUD-16 | Comentários | __________ |

---

### Checklist 2 — Avaliação de Alinhamento Modelo-Código

| ID | Item | Valor |
|----|------|-------|
| ALI-01 | Sprint | __________ |
| ALI-02 | Componente | __________ |
| ALI-03 | Classes modeladas | __ |
| ALI-04 | Classes implementadas | __ |
| ALI-05 | Métodos modelados | __ |
| ALI-06 | Métodos implementados | __ |
| ALI-07 | Atributos modelados | __ |
| ALI-08 | Atributos implementados | __ |
| ALI-09 | Cobertura (B1) | __% |
| ALI-10 | Implementações corretas | __ |
| ALI-11 | Total de implementações | __ |
| ALI-12 | Precisão (B2) | __% |
| ALI-13 | Comportamentos divergentes | __ |
| ALI-14 | Divergência (B3) | __% |
| ALI-15 | Lista de divergências | __________ |
| ALI-16 | Linhas não modeladas | __ LOC |
| ALI-17 | Linhas totais | __ LOC |
| ALI-18 | Over-Engineering (B4) | __% |
| ALI-19 | Score Geral (B5) | __ |
| ALI-20 | Total de RFs | __ |
| ALI-21 | RFs com rastreabilidade completa | __ |
| ALI-22 | Rastreabilidade (B6) | __% |

---

### Checklist 3 — Avaliação de Qualidade do Código

| ID | Item | Valor | Ferramenta |
|----|------|-------|------------|
| COD-01 | Sprint | __________ | - |
| COD-02 | Data da coleta | __________ | - |
| COD-03 | Complexidade média (C3) | __ | [NE-03](#fonte-ne-03-análise-estática-de-código) |
| COD-04 | Complexidade máxima | __ | [NE-03](#fonte-ne-03-análise-estática-de-código) |
| COD-05 | % funções com complexidade > 10 | __% | [NE-03](#fonte-ne-03-análise-estática-de-código) |
| COD-06 | Cobertura linhas (C4) | __% | [NE-04](#fonte-ne-04-framework-de-testes) |
| COD-07 | Cobertura instruções | __% | [NE-04](#fonte-ne-04-framework-de-testes) |
| COD-08 | Cobertura branches | __% | [NE-04](#fonte-ne-04-framework-de-testes) |
| COD-09 | Total de testes | __ | [NE-04](#fonte-ne-04-framework-de-testes) |
| COD-10 | Testes que passam | __ | [NE-04](#fonte-ne-04-framework-de-testes) |
| COD-11 | Testes que falham | __ | [NE-04](#fonte-ne-04-framework-de-testes) |
| COD-12 | Testes que regrediram | __ | Comparação entre sprints |
| COD-13 | Taxa de regressão (C5) | __% | [NE-04](#fonte-ne-04-framework-de-testes) |
| COD-14 | Issues novas (dívida) | __ | [NE-02](#fonte-ne-02-sistema-de-issues-github-issues--jira) |
| COD-15 | Issues anteriores não resolvidas | __ | [NE-02](#fonte-ne-02-sistema-de-issues-github-issues--jira) |
| COD-16 | Dívida total | __ | - |
| COD-17 | Tempo médio resolução (esta sprint) | __ h | [NE-02](#fonte-ne-02-sistema-de-issues-github-issues--jira) |
| COD-18 | Tempo médio resolução (acumulado) | __ h | [NE-02](#fonte-ne-02-sistema-de-issues-github-issues--jira) |

---

### Checklist 4 — Métricas de Processo

| ID | Item | Valor | Fonte |
|----|------|-------|-------|
| PRO-01 | Sprint | __________ | - |
| PRO-02 | Data início | __________ | - |
| PRO-03 | Data término | __________ | - |
| PRO-04 | Duração (dias) | __ | - |
| PRO-05 | Story points planejados | __ | Planejamento da sprint |
| PRO-06 | Story points entregues | __ | Revisão da sprint |
| PRO-07 | Velocidade (D1) | __ SP/dia | Calculado |
| PRO-08 | Total de commits | __ | [NE-01](#fonte-ne-01-sistema-de-controle-de-versão-git) |
| PRO-09 | Commits rejeitados | __ | [NE-08](#fonte-ne-08-logs-do-agente-juiz) |
| PRO-10 | Commits aprovados | __ | [NE-08](#fonte-ne-08-logs-do-agente-juiz) |
| PRO-11 | Taxa de rejeição (D2) | __% | Calculado |
| PRO-12 | Versões modelo (início) | __ | [NE-06](#fonte-ne-06-parser-de-modelos-uml-plantuml) |
| PRO-13 | Versões modelo (final) | __ | [NE-06](#fonte-ne-06-parser-de-modelos-uml-plantuml) |
| PRO-14 | Revisões de modelo | __ | [NE-01](#fonte-ne-01-sistema-de-controle-de-versão-git) |
| PRO-15 | Churn do modelo (D3) | __ | Calculado |
| PRO-16 | Número de audiências | __ | [NE-08](#fonte-ne-08-logs-do-agente-juiz) |
| PRO-17 | Tempo total em audiências (min) | __ | [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-juiz) |

---

### Checklist 5 — Questionário de Satisfação do Desenvolvedor (D4)

*Escala Likert 1-5.*

| ID | Pergunta | Resposta |
|----|----------|----------|
| SAT-01 | Clareza do modelo como guia | __ |
| SAT-02 | Utilidade do feedback do Juiz | __ |
| SAT-03 | Carga cognitiva (1=pouco, 5=excessivo) | __ |
| SAT-04 | Confiança na qualidade | __ |
| SAT-05 | Facilidade de uso do pipeline | __ |
| SAT-06 | Velocidade do processo (1=lento, 5=rápido) | __ |
| SAT-07 | Aprendizado percebido | __ |
| SAT-08 | Intenção de reuso | __ |

**Questões abertas:**

| ID | Pergunta | Resposta |
|----|----------|----------|
| SAT-09 | Pontos fracos identificados | __________ |
| SAT-10 | Sugestões de melhoria | __________ |

---

### Checklist 6 — Avaliação da Qualidade da Justificativa (Rubrica A8 Detalhada)

| Critério | Peso | Pontuação (0-4) |
|----------|------|-----------------|
| Clareza e estrutura | 25% | __ |
| Fundamentação em evidências | 30% | __ |
| Rigor técnico | 25% | __ |
| Conclusão e encaminhamento | 20% | __ |

**Cálculo:** `Final = (Clareza × 0,25) + (Evidências × 0,30) + (Rigor × 0,25) + (Conclusão × 0,20)`

**Nota final (0-4):** ____

---

### Checklist 7 — Rastreabilidade RF→Modelo→Código→Teste (B6)

| ID do RF | Descrição | Modelado? | Implementado? | Testado? | Cadeia Completa? |
|----------|-----------|-----------|---------------|----------|------------------|
| RF001 | __________ | ☐ ☐ | ☐ ☐ | ☐ ☐ | ☐ ☐ |
| RF002 | __________ | ☐ ☐ | ☐ ☐ | ☐ ☐ | ☐ ☐ |
| RF003 | __________ | ☐ ☐ | ☐ ☐ | ☐ ☐ | ☐ ☐ |

**Total de RFs:** ____ | **Com cadeia completa:** ____ | **Rastreabilidade:** ____%

---

### Checklist 8 — Registro de Configuração do Experimento

| ID | Item | Valor | Data |
|----|------|-------|------|
| CFG-01 | Versão Agente Arquiteto | __________ | ______ |
| CFG-02 | Versão Agente Developer | __________ | ______ |
| CFG-03 | Versão Agente Juiz | __________ | ______ |
| CFG-04 | Temperatura dos LLMs | __________ | ______ |
| CFG-05 | max_tokens | __________ | ______ |
| CFG-06 | Versão prompt (Arquiteto) | __________ | ______ |
| CFG-07 | Versão prompt (Developer) | __________ | ______ |
| CFG-08 | Versão prompt (Juiz) | __________ | ______ |
| CFG-09 | Framework frontend | __________ | ______ |
| CFG-10 | Versão do framework | __________ | ______ |
| CFG-11 | Linguagem de programação | __________ | ______ |
| CFG-12 | Ferramenta de modelagem | PlantUML | ______ |
| CFG-13 | Repositório Git (URL) | __________ | ______ |
| CFG-14 | Sistema de issues | __________ | ______ |
| CFG-15 | Ferramenta de CI/CD | __________ | ______ |
| CFG-16 | Duração da sprint (dias) | __ | ______ |
| CFG-17 | Total de sprints planejadas | __ | ______ |

---

## Síntese das Métricas por Sprint

| Grupo | Métrica | Target | Valor | Status | Fonte |
|-------|---------|--------|-------|--------|-------|
| A | Precisão do Juiz | ≥ 0,85 | __ | 🟢/🔴 | [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-juiz) |
| A | Recall do Juiz | ≥ 0,80 | __ | 🟢/🔴 | [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-juiz) |
| A | F1-Score | ≥ 0,82 | __ | 🟢/🔴 | [NE-08](#fonte-ne-08-logs-do-agente-juiz) |
| A | Concordância | ≥ 0,80 | __ | 🟢/🔴 | [Checklist 1](#checklist-1--avaliação-de-audiência-do-agente-juiz) |
| B | Cobertura do Modelo | ≥ 95% | __ | 🟢/🟡/🔴 | [Checklist 2](#checklist-2--avaliação-de-alinhamento-modelo-código) |
| B | Precisão da Implementação | ≥ 90% | __ | 🟢/🟡/🔴 | [Checklist 2](#checklist-2--avaliação-de-alinhamento-modelo-código) |
| B | Score Geral | ≥ 90 | __ | 🟢/🟡/🔴 | Calculado |
| C | Dívida Técnica | Decrescente | __ | 📈/📉 | [NE-02](#fonte-ne-02-sistema-de-issues-github-issues--jira) |
| C | Taxa de Regressão | ≤ 5% | __ | 🟢/🔴 | [NE-04](#fonte-ne-04-framework-de-testes) |
| D | Satisfação (média) | ≥ 4/5 | __ | 🟢/🔴 | [Checklist 5](#checklist-5--questionário-de-satisfação-do-desenvolvedor-d4) |

---

## Benefícios e Contribuições Esperadas

| Benefício | Descrição |
|-----------|-----------|
| Evidência empírica | Sobre eficácia do pipeline MDE+SDD com agentes de IA |
| Protocolo replicável | Para avaliação de pipelines de agentes de IA |
| Métricas validadas | Para avaliação de agentes como "juízes" de consistência |
| Pontos fortes/fracos | Identificação das dimensões de eficácia do pipeline |
| Contribuição prática | Diretrizes para adoção de abordagens híbridas |

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
| Confiabilidade da avaliação humana | Rubricas detalhadas; múltiplos avaliadores |

---

## Referências

[1] SHULL, Forrest; SINGER, Janice; SJØBERG, Dag I. K. (eds.). *Guide to Advanced Empirical Software Engineering*. London: Springer-Verlag, 2008.

[2] WOHLIN, Claes et al. *Experimentation in Software Engineering*. Berlin: Springer, 2012.

[3] BALTES, Sebastian et al. *Guidelines for Empirical Studies in Software Engineering involving Large Language Models*. 2025. arXiv:2508.15503.

[4] TEIXEIRA, E.; FONSECA, L.; SOARES, S. Threats to validity in controlled experiments in software engineering. In: *SBES 2018*. ACM, 2018. p. 52-61.

[5] BASILI, Victor R.; SHULL, Forrest; LANUBILE, Filippo. Building knowledge through families of experiments. *IEEE TSE*, v. 25, n. 4, p. 456-473, 1999.

[6] KITCHENHAM, Barbara et al. Preliminary guidelines for empirical research in software engineering. *IEEE TSE*, v. 28, n. 8, p. 721-734, 2002.

---

**Data de elaboração:** 14 de maio de 2026
**Versão:** 2.0 (com fontes de dados hiperlinkadas)
**Status:** Rascunho para revisão do orientador