# Protocolo de Pesquisa

**UNIVERSIDADE FEDERAL DE GOIÁS — INSTITUTO DE INFORMÁTICA — PROGRAMA DE PÓS-GRADUAÇÃO EM CIÊNCIA DA COMPUTAÇÃO**

**DISCIPLINA:** CCO0448 – Engenharia de Software
**PROFESSOR:** Valdemar Vicente Graciano Neto
**TURMA:** A
**PARTICIPANTES:** Daired
**DATA:** 14 de maio de 2026

---

## INFORMAÇÕES GERAIS

| Campo | Descrição |
|-------|-----------|
| **TÍTULO** | Ressurreição da Engenharia Orientada a Modelos com Auxílio de Agentes de IA e Desenvolvimento Orientado a Especificações – Um Estudo Experimental sobre Qualidade de Código e Redução de Dívida Técnica |
| **TEMA** | Estudo empírico experimental sobre a combinação de Engenharia Orientada a Modelos (MDE), Desenvolvimento Orientado a Especificações (SDD) e um pipeline de três agentes de IA (Arquiteto, Developer e Juiz) para produção de código frontend de alta qualidade com redução de dívida técnica. |
| **DESCRIÇÃO** | O intuito deste estudo consiste em investigar se a combinação de MDE com SDD, orquestrada por um pipeline de três agentes de IA, produz código frontend de maior qualidade, maior fidelidade ao modelo e menor dívida técnica em comparação ao desenvolvimento assistido por IA sem modelagem estruturada. Para isso, será realizado um experimento controlado em ciclos de sprint (Scrum), onde cada commit dispara o Agente Juiz, que verifica inconsistências entre modelo e código, abre issues para inconsistências detectadas e bloqueia o merge até a resolução. |

---

## CONTEXTUALIZAÇÃO E MOTIVAÇÃO

O desenvolvimento de software assistido por Inteligência Artificial tem ganhado crescente atenção, especialmente com o avanço dos Modelos de Linguagem de Grande Escala (LLMs). No entanto, observou-se em projetos práticos que, na ausência de uma modelagem clara e de técnicas estruturadas de controle sobre o código gerado por IA, o desenvolvimento sofre atrasos significativos e perda de qualidade de código. Este problema foi particularmente evidente no desenvolvimento de um frontend realizado do zero, onde a falta de um modelo forte resultou em retrabalho e acúmulo de dívida técnica.

A Engenharia Orientada a Modelos (MDE) — que propõe o uso de modelos como artefatos centrais do desenvolvimento — perdeu espaço com a ascensão dos métodos ágeis, sendo considerada por muitos como uma abordagem pesada e de difícil adoção. Contudo, o cenário atual com agentes de IA capazes de interpretar e gerar artefatos a partir de modelos resgata o potencial da MDE, especialmente quando combinada com o Desenvolvimento Orientado a Especificações (SDD), que enfatiza a rastreabilidade entre especificação, modelo e código.

Neste contexto, esta pesquisa propõe um pipeline de três agentes de IA:

1. **Agente Arquiteto**: trabalha colaborativamente com o aluno para produzir e refinar o modelo UML (diagramas de classes, sequência, atividades) a partir das especificações.

2. **Agente Developer**: trabalha colaborativamente com o aluno para gerar código frontend a partir do modelo estabelecido.

3. **Agente Juiz**: atua como mecanismo de verificação contínua, detectando inconsistências entre modelo e código a cada commit, conduzindo uma "audiência" entre os agentes Arquiteto e Developer para justificar decisões, e bloqueando merges até que inconsistências sejam resolvidas.

O processo ocorre em ciclos de sprint (Scrum), onde cada commit dispara o Agente Juiz. Este modelo visa não apenas melhorar a qualidade do código gerado, mas também controlar e reduzir a dívida técnica acumulada ao longo do desenvolvimento.

---

## OBJETIVOS

### Objetivo Geral

Avaliar e comparar a qualidade do código frontend gerado, a fidelidade ao modelo e a dívida técnica acumulada quando se utiliza um pipeline de três agentes de IA (Arquiteto, Developer e Juiz) baseado em MDE+SDD, em comparação com o desenvolvimento assistido por IA sem modelagem estruturada.

### Objetivo GQM (Goal-Question-Metric)

Esta pesquisa busca **analisar** o pipeline de agentes de IA com MDE+SDD com o propósito de **avaliar** a qualidade do código gerado, o alinhamento entre modelo e código, e a dívida técnica acumulada sob a perspectiva de **pesquisadores e desenvolvedores** no contexto de um **experimento controlado com ciclos de sprint**, no qual o Agente Juiz atua como mecanismo de verificação contínua e bloqueio de inconsistências.

---

## QUESTÕES DE PESQUISA

### QP1: O pipeline de agentes de IA (Arquiteto, Developer, Juiz) produz código frontend de maior qualidade (em termos de complexidade ciclomática, cobertura de testes e taxa de regressão) em comparação ao desenvolvimento assistido por IA sem modelagem estruturada?

**Rationale (justificativa):** Ao responder a esta pergunta, espera-se obter evidências empíricas sobre se a abordagem proposta — que combina modelagem estruturada com verificação automatizada por agente Juiz — resulta em código tecnicamente superior àquele produzido com intervenção humana direta e sem modelo formal.

### QP2: Qual é o nível de alinhamento (cobertura do modelo, precisão da implementação, divergência semântica e over-engineering) alcançado pelo pipeline de agentes, e como esse alinhamento evolui ao longo das sprints?

**Rationale (justificativa):** Espera-se que a resposta a esta pergunta forneça evidências sobre a eficácia do Agente Juiz em manter a consistência entre modelo e código, bem como sobre a capacidade do modelo gerado colaborativamente de servir como "âncora" para o desenvolvimento.

### QP3: O Agente Juiz é eficaz na detecção de inconsistências entre modelo e código, com alta precisão e revocação, e sua atuação contribui para a redução da dívida técnica ao longo do tempo?

**Rationale (justificativa):** Ao responder a esta pergunta, espera-se avaliar o desempenho do Agente Juiz como mecanismo de controle de qualidade, identificando seus acertos (verdadeiros positivos e verdadeiros negativos) e erros (falsos positivos e falsos negativos), bem como seu impacto na redução da dívida técnica acumulada por sprint.

### QP4: Quais são os pontos fortes e fracos do pipeline de agentes observados durante o processo (taxa de rejeição de commits, churn do modelo, satisfação dos desenvolvedores)?

**Rationale (justificativa):** Ao responder a esta pergunta, espera-se identificar aspectos processuais que facilitam ou dificultam a adoção da abordagem proposta, fornecendo subsídios para refinamentos futuros e para a compreensão de sua aplicabilidade em diferentes contextos.

---

## MÉTODO DE PESQUISA

**Experimento controlado**, pois o objetivo é estabelecer uma relação causal entre o uso do pipeline de agentes de IA com MDE+SDD (variável independente) e as métricas de qualidade de código, alinhamento modelo-código, e dívida técnica (variáveis dependentes). O experimento ocorrerá em ciclos de sprint (Scrum), com duração estimada de 1 a 2 semanas cada.

---

## PARTICIPANTES

O estudo envolverá dois grupos de participantes com papéis distintos:

### Grupo 1 — Desenvolvedores (Alunos Pesquisadores)

| Papel | Responsabilidade |
|-------|------------------|
| Agente Arquiteto + Aluno X | Modelagem colaborativa do frontend utilizando UML textual (PlantUML) |
| Agente Developer + Aluno Daired | Codificação colaborativa do frontend a partir do modelo estabelecido |

**Critérios de inclusão:**
- Conhecimento avançado em desenvolvimento frontend (React, Angular ou Vue.js)
- Experiência prévia com UML e modelagem de software
- Disponibilidade para participar de todas as sprints do experimento

### Grupo 2 — Avaliadores (Juízes Humanos)

| Papel | Responsabilidade |
|-------|------------------|
| Agente Juiz + Professores Orientadores | Validar as decisões do Agente Juiz nas audiências, atuando como árbitros humanos |

**Critérios de inclusão:**
- Experiência comprovada em Engenharia de Software (mínimo 5 anos)
- Conhecimento em MDE, SDD e metodologias ágeis
- Disponibilidade para participar das audiências de validação

**Número de participantes esperado:** 2 desenvolvedores (alunos pesquisadores) + 2 a 3 avaliadores (professores orientadores e convidados)

---

## VARIÁVEIS DE CONTROLE

| Variável | Descrição | Estratégia de Controle |
|----------|-----------|------------------------|
| Casos de uso e requisitos | Conjunto de requisitos funcionais do frontend a ser desenvolvido | Fixo para todas as sprints; documentado previamente |
| Linguagem de programação | TypeScript/JavaScript com framework React (ou equivalente) | Definida antes do início do experimento |
| Ferramenta de modelagem | PlantUML para diagramas UML textuais | Fixa durante todo o experimento |
| Processo de desenvolvimento | Scrum com sprints de duração fixa | Mesmo processo para todo o experimento |
| Ambiente de desenvolvimento | Mesmo repositório, ferramentas de CI/CD | Configurado antes do início |

---

## VARIÁVEIS INDEPENDENTES

| Variável | Descrição | Níveis/Tratamentos |
|----------|-----------|---------------------|
| Pipeline de agentes de IA | Combinação de Agente Arquiteto, Developer e Juiz com MDE+SDD | **Com pipeline** (tratamento experimental) vs. **Sem pipeline** (controle — desenvolvimento assistido por IA sem modelagem estruturada) |

*Nota:* O estudo poderá ser conduzido em duas fases (cruzado ou com baseline) para comparar os dois tratamentos.

---

## VARIÁVEIS DEPENDENTES

| Variável | Descrição | Métrica Associada |
|----------|-----------|-------------------|
| Qualidade do código | Saúde técnica do frontend gerado | Complexidade ciclomática média; cobertura de testes; taxa de regressão |
| Alinhamento modelo-código | Fidelidade do código ao modelo UML e especificação | Cobertura do modelo; precisão da implementação; divergência semântica; over-engineering |
| Dívida técnica | Issues abertas pelo Juiz não resolvidas | Dívida por sprint; tempo de resolução de inconsistências |
| Eficácia do Agente Juiz | Precisão e revocação do agente na detecção de inconsistências | Precisão; recall; F1-score; taxas de falso positivo e falso negativo |
| Eficiência do processo | Métricas do fluxo de trabalho | Velocidade de entrega; taxa de rejeição de branch; churn do modelo |

---

## AVALIAÇÃO E MÉTRICAS

O estudo compreende **quatro grupos de métricas**, organizados conforme a taxonomia estabelecida no documento de planejamento do TCC.

---

### Grupo A — Métricas de Qualidade do Agente Juiz

Estas métricas avaliam se o Agente Juiz está detectando inconsistências corretamente. A base é a matriz de confusão adaptada ao domínio do TCC.

#### A1: Matriz de Confusão do Juiz

Cada atuação do Juiz em um commit gera um dos quatro cenários:

| Cenário | Nome | Descrição |
|---------|------|-----------|
| **TP** | Detecção Verdadeira Positiva | O Juiz detectou uma inconsistência que realmente existe. Decisão correta de inconsistência. |
| **TN** | Detecção Verdadeira Negativa | O Juiz não detectou inconsistência onde de fato não existe. Decisão correta de aprovação. |
| **FP** | Falso Positivo | O Juiz detectou uma inconsistência que não existia. Apontou problema onde não havia. |
| **FN** | Falso Negativo | O Juiz não detectou uma inconsistência que existia. Deixou passar um problema real. |

**Observação:** Falsos negativos são mais graves que falsos positivos, pois deixam dívida técnica se acumular silenciosamente. Falsos positivos geram fricção desnecessária no processo, mas são recuperáveis na audiência entre agentes.

#### A2: Precisão do Juiz (Precision)

Mede: *Dos alarmes disparados, quantos eram reais?*
Precisão = TP / (TP + FP)

text

**Target:** ≥ 0,85 — alta precisão evita que o Juiz "trave" a branch com falsos alarmes.

#### A3: Revocação do Juiz (Recall / Sensibilidade)

Mede: *Das inconsistências reais, quantas o Juiz encontrou?*
Recall = TP / (TP + FN)

text

**Target:** ≥ 0,80 — alta revocação é essencial para não deixar dívida técnica escapar.

#### A4: F1-Score do Juiz

Média harmônica entre Precisão e Recall.
F1 = 2 × (Precisão × Recall) / (Precisão + Recall)

text

**Target:** ≥ 0,82

#### A5: Taxa de Falso Negativo (FNR)

Mede: *Que fração das inconsistências reais o Juiz deixou escapar?*
FNR = FN / (TP + FN)

text

**Target:** ≤ 0,20

#### A6: Taxa de Falso Positivo (FPR)

Mede: *Que fração das aprovações válidas o Juiz incorretamente barrou?*
FPR = FP / (FP + TN)

text

**Target:** ≤ 0,15

#### A7: Taxa de Concordância na Audiência

Mede: *Em que percentual das audiências o veredicto do Juiz coincidiu com a avaliação dos professores (árbitros humanos)?*
Concordância = (Veredictos alinhados com árbitros) / (Total de audiências)

text

**Target:** ≥ 0,80

#### A8: Qualidade da Justificativa (Rubrica 0–4)

Avaliação qualitativa, feita pelos professores, da adequação do argumento produzido na audiência.

| Pontuação | Descrição |
|-----------|-----------|
| 0 | Sem justificativa |
| 1 | Justificativa vaga ou irrelevante |
| 2 | Justificativa parcialmente coerente |
| 3 | Justificativa coerente e bem fundamentada |
| 4 | Justificativa excelente com evidências no modelo/spec |

**Target:** ≥ 3

---

### Grupo B — Métricas de Alinhamento Modelo-Código

#### B1: Cobertura do Modelo

Mede: *Que percentual dos elementos modelados foi implementado no código?*
Cobertura = (Elementos implementados / Elementos modelados) × 100

text

**Elementos contados:** classes, métodos, atributos, relacionamentos em PlantUML.

| Status | Range |
|--------|-------|
| 🟢 Excelente | 95–100% |
| 🟡 Aceitável | 80–94% |
| 🔴 Crítico | < 80% |

#### B2: Precisão da Implementação

Mede: *Das implementações realizadas, quantas estão corretas em relação ao modelo?*
Precisão = (Implementações corretas / Implementações totais) × 100

text

| Status | Range |
|--------|-------|
| 🟢 Excelente | 90–100% |
| 🟡 Aceitável | 75–89% |
| 🔴 Crítico | < 75% |

#### B3: Divergência Semântica

Mede: *Que percentual das implementações não faz o que o modelo/spec especifica?*
Divergência = (Comportamentos divergentes / Total de implementações) × 100

text

**Tipos de divergência por severidade:**

| Tipo | Severidade |
|------|-----------|
| Regra funcional (RF) violada | 🔴 Crítico |
| Comportamento não modelado executado | 🟠 Alto |
| Exceção não documentada lançada | 🟡 Médio |
| Lógica invertida (condições trocadas) | 🔴 Crítico |

| Status | Range |
|--------|-------|
| 🟢 Excelente | 0% |
| 🟡 Aceitável | 1–5% |
| 🔴 Crítico | > 5% |

#### B4: Over-Engineering

Mede: *Que percentual do código implementado não está no modelo?*
Over-Engineering = (Código não modelado / Total de código) × 100

text

| Status | Range |
|--------|-------|
| 🟢 Excelente | 0–10% |
| 🟡 Aceitável | 11–20% |
| 🔴 Crítico | > 20% |

#### B5: Score Geral de Alinhamento

Métrica sintética que combina as quatro anteriores em um único índice de 0 a 100.
Score = (Cobertura × 0,35) + (Precisão × 0,35) + ((100 − Divergência) × 0,20) + ((100 − Over-Engineering) × 0,10)

text

| Range | Status |
|-------|--------|
| 90–100 | 🟢 Excelente |
| 75–89 | 🟡 Bom |
| 60–74 | 🟠 Inadequado |
| < 60 | 🔴 Crítico |

#### B6: Rastreabilidade (Traceability Coverage)

Mede: *Que percentual dos requisitos funcionais pode ser rastreado de ponta a ponta?*
Rastreabilidade = (RFs com cadeia completa RF→Modelo→Código→Teste) / (Total de RFs) × 100

text

**Target:** ≥ 90%

---

### Grupo C — Métricas de Qualidade de Código

#### C1: Dívida Técnica Acumulada por Sprint

Mede a quantidade de issues abertas pelo Juiz que ficaram pendentes ao final de cada sprint.
Dívida por Sprint = Issues abertas pelo Juiz não resolvidas ao final da sprint

text

#### C2: Tempo de Resolução de Inconsistências

Mede: *Quanto tempo leva para uma issue aberta pelo Juiz ser fechada?*
Tempo médio de resolução = Σ(tempo_fechamento − tempo_abertura) / Total de issues

text

**Target:** Tendência de queda ao longo das sprints.

#### C3: Complexidade Ciclomática Média

Medida clássica de complexidade de código. Ferramentas como ESLint com regras de complexidade.
Complexidade Ciclomática Média = Σ(complexidade por função) / Número de funções

text

**Target:** Média ≤ 10 por função/método.

#### C4: Cobertura de Testes
Cobertura de Testes = (Linhas cobertas por testes / Total de linhas) × 100

text

**Target:** ≥ 70%

#### C5: Taxa de Regressão

Mede: *Que percentual de funcionalidades previamente aprovadas quebrou após um commit?*
Regressão = (Testes que passavam e agora falham) / (Total de testes que passavam antes) × 100

text

**Target:** ≤ 5%

---

### Grupo D — Métricas de Processo

#### D1: Velocidade de Entrega por Sprint

Mede o throughput do processo.
Velocidade = Σ(Story Points entregues na sprint) / Duração da sprint

text

#### D2: Taxa de Rejeição de Branch pelo Juiz
Taxa de Rejeição = (Commits rejeitados pelo Juiz) / (Total de commits) × 100

text

**Esperado:** Queda ao longo das sprints.

#### D3: Taxa de Revisão de Modelo (Churn do Modelo)

Mede quantas vezes o modelo UML precisou ser revisado após um ciclo de codificação iniciar.
Churn do Modelo = Revisões de modelo iniciadas pelo Developer / Total de sprints

text

#### D4: Satisfação do Desenvolvedor (Qualitativa)

Questionário Likert (1–5) aplicado ao final de cada sprint para avaliar:
- Clareza do modelo como guia de codificação
- Utilidade do feedback do Juiz
- Carga cognitiva percebida do processo
- Confiança na qualidade do código produzido

**Target:** ≥ 4/5

---

## HIPÓTESES

### H01 (Hipótese Nula Principal)
Não há diferença significativa na qualidade do código gerado, no alinhamento modelo-código e na dívida técnica acumulada quando se utiliza o pipeline de agentes de IA com MDE+SDD em comparação ao desenvolvimento assistido por IA sem modelagem estruturada.

### HA1 (Hipótese Alternativa Principal)
Há diferença significativa na qualidade do código gerado, no alinhamento modelo-código e na dívida técnica acumulada quando se utiliza o pipeline de agentes de IA com MDE+SDD em comparação ao desenvolvimento assistido por IA sem modelagem estruturada.

### H02 (Hipótese Nula Secundária — Agente Juiz)
O Agente Juiz não apresenta precisão e revocação superiores a 0,80 na detecção de inconsistências entre modelo e código.

### HA2 (Hipótese Alternativa Secundária — Agente Juiz)
O Agente Juiz apresenta precisão e revocação superiores a 0,80 na detecção de inconsistências entre modelo e código.

---

## MATERIAIS

| Material | Descrição |
|----------|-----------|
| Repositório Git | Para versionamento do código e rastreabilidade dos commits |
| Sistema de issues | GitHub Issues ou Jira para registro das inconsistências |
| PlantUML | Para criação dos diagramas UML textuais |
| Framework frontend | React com TypeScript (a definir) |
| Ferramentas de análise estática | ESLint, Prettier, SonarQube |
| Ferramenta de cobertura de testes | Jest + Testing Library com `--coverage` |
| Scripts de automação | Para cálculo automático das métricas |
| Agentes de IA | Implementados via API com prompts padronizados |

---

## ESTRATÉGIAS DE CONSTRUÇÃO DO PROMPT

### Agente Arquiteto
- **Few-shot:** Exemplos de diagramas UML (PlantUML) bem estruturados
- **Prompt em português:** Especificações em português
- **Iterativo:** Modelagem refinada em ciclos com feedback

### Agente Developer
- **Few-shot:** Exemplos de código bem estruturado a partir de diagramas
- **Prompt em português:** Descrições em português
- **Contexto:** Incluir o modelo UML gerado pelo Arquiteto

### Agente Juiz
- **Zero-shot inicial:** Detectar inconsistências sem exemplos prévios
- **Com feedback:** Aprender com as audiências

---

## TAREFAS EXECUTADAS

### Por Sprint

| Tarefa | Responsável | Descrição |
|--------|-------------|-----------|
| Planejamento da sprint | Ambos alunos | Definir backlog da sprint |
| Modelagem (se necessário) | Agente Arquiteto + Aluno X | Atualizar/refinar modelo UML |
| Codificação | Agente Developer + Aluno Daired | Gerar código a partir do modelo |
| Commit | Aluno Daired | Realizar commit do código |
| Verificação do Juiz | Agente Juiz | Executar após cada commit |
| Audiência (se inconsistência) | Agentes + Professores | Justificar inconsistência |
| Resolução de issues | Alunos | Corrigir inconsistências |
| Merge | Alunos | Realizar merge apenas quando consistente |
| Revisão de final de sprint | Ambos + Professores | Coletar métricas, aplicar questionários |

---

## CHECKLISTS PARA COLETA DE DADOS HUMANOS E VERIFICAÇÕES DE PROJETO

---

### Checklist 1 — Avaliação de Audiência do Agente Juiz

*Preenchido pelos professores (árbitros humanos) para cada inconsistência detectada.*

| ID | Item de Verificação | Resposta |
|----|---------------------|----------|
| AUD-01 | ID da inconsistência (issue) | __________ |
| AUD-02 | Sprint em que ocorreu | __________ |
| AUD-03 | Data/hora da audiência | __________ |
| AUD-04 | Componente/arquivo envolvido | __________ |
| AUD-05 | Tipo de inconsistência detectada | ☐ Sintaxe ☐ Semântica ☐ Estrutural ☐ Comportamental |
| AUD-06 | O Juiz classificou corretamente o tipo? | ☐ Sim ☐ Não |
| AUD-07 | Veredicto do Juiz? | ☐ Inconsistência legítima ☐ Decisão consciente |
| AUD-08 | Você (árbitro) concorda com o veredicto? | ☐ Sim ☐ Não |
| AUD-09 | Se discordou, qual seria seu veredicto? | ☐ Inconsistência legítima ☐ Decisão consciente |
| AUD-10 | Argumento do Agente Arquiteto foi coerente? (1-5) | __ |
| AUD-11 | Argumento do Agente Developer foi coerente? (1-5) | __ |
| AUD-12 | Houve consenso entre os agentes? | ☐ Sim ☐ Não ☐ Parcial |
| AUD-13 | Qualidade da justificativa final (0-4) | __ |
| AUD-14 | Evidências apresentadas | ☐ Modelo ☐ Código ☐ Especificação ☐ Nenhuma |
| AUD-15 | Tempo total da audiência (minutos) | __ min |
| AUD-16 | Comentários adicionais | __________ |

---

### Checklist 2 — Avaliação de Alinhamento Modelo-Código

*Preenchido pelos alunos com validação dos professores.*

| ID | Item de Verificação | Valor |
|----|---------------------|-------|
| ALI-01 | Sprint | __________ |
| ALI-02 | Componente/módulo avaliado | __________ |
| ALI-03 | Número total de classes modeladas | __ |
| ALI-04 | Número total de classes implementadas | __ |
| ALI-05 | Número total de métodos modelados | __ |
| ALI-06 | Número total de métodos implementados | __ |
| ALI-07 | Número total de atributos modelados | __ |
| ALI-08 | Número total de atributos implementados | __ |
| ALI-09 | Cobertura do modelo calculada (B1) | __% |
| ALI-10 | Número de implementações corretas | __ |
| ALI-11 | Número total de implementações | __ |
| ALI-12 | Precisão da implementação calculada (B2) | __% |
| ALI-13 | Número de comportamentos divergentes | __ |
| ALI-14 | Divergência semântica calculada (B3) | __% |
| ALI-15 | Lista de divergências identificadas | __________ |
| ALI-16 | Linhas de código não modeladas | __ LOC |
| ALI-17 | Linhas de código totais | __ LOC |
| ALI-18 | Over-Engineering calculado (B4) | __% |
| ALI-19 | Score Geral de Alinhamento (B5) | __ |
| ALI-20 | Requisitos funcionais totais no escopo | __ |
| ALI-21 | RFs com rastreabilidade completa | __ |
| ALI-22 | Rastreabilidade calculada (B6) | __% |

---

### Checklist 3 — Avaliação de Qualidade do Código

*Coletado automaticamente por ferramentas, com validação manual.*

| ID | Item de Verificação | Valor | Ferramenta |
|----|---------------------|-------|------------|
| COD-01 | Sprint | __________ | - |
| COD-02 | Data da coleta | __________ | - |
| COD-03 | Complexidade ciclomática média (C3) | __ | ESLint / radon |
| COD-04 | Complexidade máxima (pior função) | __ | ESLint / radon |
| COD-05 | % funções com complexidade > 10 | __% | ESLint / radon |
| COD-06 | Cobertura de testes (linhas) (C4) | __% | Jest --coverage |
| COD-07 | Cobertura de testes (instruções) | __% | Jest --coverage |
| COD-08 | Cobertura de testes (branches) | __% | Jest --coverage |
| COD-09 | Número total de testes | __ | Jest |
| COD-10 | Número de testes que passam | __ | Jest |
| COD-11 | Número de testes que falham | __ | Jest |
| COD-12 | Testes que passavam e agora falham | __ | Comparação |
| COD-13 | Taxa de regressão calculada (C5) | __% | - |
| COD-14 | Issues abertas pelo Juiz (nova dívida) | __ | Sistema de issues |
| COD-15 | Issues anteriores não resolvidas | __ | Sistema de issues |
| COD-16 | Total de issues abertas (dívida total) | __ | - |
| COD-17 | Tempo médio de resolução (esta sprint) | __ h | Timestamps |
| COD-18 | Tempo médio de resolução (acumulado) | __ h | - |

---

### Checklist 4 — Métricas de Processo

| ID | Item de Verificação | Valor |
|----|---------------------|-------|
| PRO-01 | Sprint | __________ |
| PRO-02 | Data de início da sprint | __________ |
| PRO-03 | Data de término da sprint | __________ |
| PRO-04 | Duração da sprint (dias úteis) | __ dias |
| PRO-05 | Total de story points planejados | __ SP |
| PRO-06 | Total de story points entregues | __ SP |
| PRO-07 | Velocidade de entrega (D1) | __ SP/dia |
| PRO-08 | Total de commits na sprint | __ |
| PRO-09 | Commits rejeitados pelo Juiz | __ |
| PRO-10 | Commits aprovados após resolução | __ |
| PRO-11 | Taxa de rejeição de branch (D2) | __% |
| PRO-12 | Versões do modelo (início da sprint) | __ |
| PRO-13 | Versões do modelo (final da sprint) | __ |
| PRO-14 | Revisões de modelo iniciadas | __ |
| PRO-15 | Churn do modelo (D3) | __ revisões/sprint |
| PRO-16 | Número de audiências realizadas | __ |
| PRO-17 | Tempo total em audiências (minutos) | __ min |

---

### Checklist 5 — Questionário de Satisfação do Desenvolvedor (D4)

*Aplicado ao final de cada sprint. Escala Likert 1-5.*

| ID | Pergunta | Resposta (1-5) |
|----|----------|----------------|
| SAT-01 | **Clareza do modelo como guia de codificação:** O modelo UML foi claro e útil para orientar a codificação? | __ |
| SAT-02 | **Utilidade do feedback do Juiz:** O feedback do Agente Juiz foi útil para melhorar o código? | __ |
| SAT-03 | **Carga cognitiva percebida:** Manter consistência exigiu muito esforço mental? (1=muito pouco, 5=muito excessivo) | __ |
| SAT-04 | **Confiança na qualidade:** Você confia que o código produzido está alinhado com o modelo e tem boa qualidade? | __ |
| SAT-05 | **Facilidade de uso do pipeline:** A interação com os agentes foi intuitiva e fácil? | __ |
| SAT-06 | **Velocidade do processo:** O pipeline acelerou ou desacelerou o desenvolvimento? (1=muito mais lento, 5=muito mais rápido) | __ |
| SAT-07 | **Aprendizado percebido:** Você aprendeu algo novo com este processo? | __ |
| SAT-08 | **Intenção de reuso:** Você usaria este pipeline novamente em um projeto futuro? | __ |

**Questões abertas:**

| ID | Pergunta | Resposta |
|----|----------|----------|
| SAT-09 | Pontos fracos identificados: | __________ |
| SAT-10 | Sugestões de melhoria: | __________ |

---

### Checklist 6 — Avaliação da Qualidade da Justificativa (Rubrica A8 Detalhada)

*Preenchido pelos professores para cada audiência.*

| Critério | Peso | Pontuação (0-4) |
|----------|------|-----------------|
| Clareza e estrutura | 25% | __ |
| Fundamentação em evidências | 30% | __ |
| Rigor técnico | 25% | __ |
| Conclusão e encaminhamento | 20% | __ |

**Cálculo da pontuação final (0-4):**
Pontuação Final = (Clareza × 0,25) + (Evidências × 0,30) + (Rigor × 0,25) + (Conclusão × 0,20)

text

**Nota final (0-4):** ____

---

### Checklist 7 — Rastreabilidade RF→Modelo→Código→Teste (B6)

| ID do RF | Descrição | Modelado? | Implementado? | Testado? | Cadeia Completa? |
|----------|-----------|-----------|---------------|----------|------------------|
| RF001 | __________ | ☐ Sim ☐ Não | ☐ Sim ☐ Não | ☐ Sim ☐ Não | ☐ Sim ☐ Não |
| RF002 | __________ | ☐ Sim ☐ Não | ☐ Sim ☐ Não | ☐ Sim ☐ Não | ☐ Sim ☐ Não |
| RF003 | __________ | ☐ Sim ☐ Não | ☐ Sim ☐ Não | ☐ Sim ☐ Não | ☐ Sim ☐ Não |
| ... | ... | ... | ... | ... | ... |

**Total de RFs no escopo:** ____
**Total de RFs com cadeia completa:** ____
**Rastreabilidade (B6):** ____%

---

### Checklist 8 — Registro de Configuração do Experimento

*Preenchido antes do início e atualizado quando houver mudanças.*

| ID | Item | Valor | Data |
|----|------|-------|------|
| CFG-01 | Versão do Agente Arquiteto | __________ | ______ |
| CFG-02 | Versão do Agente Developer | __________ | ______ |
| CFG-03 | Versão do Agente Juiz | __________ | ______ |
| CFG-04 | Parâmetros de temperatura dos LLMs | __________ | ______ |
| CFG-05 | Parâmetros de max_tokens | __________ | ______ |
| CFG-06 | Versão do prompt (Arquiteto) | __________ | ______ |
| CFG-07 | Versão do prompt (Developer) | __________ | ______ |
| CFG-08 | Versão do prompt (Juiz) | __________ | ______ |
| CFG-09 | Framework frontend | __________ | ______ |
| CFG-10 | Versão do framework | __________ | ______ |
| CFG-11 | Linguagem de programação | __________ | ______ |
| CFG-12 | Ferramenta de modelagem | PlantUML | ______ |
| CFG-13 | Repositório Git (URL) | __________ | ______ |
| CFG-14 | Sistema de issues | __________ | ______ |
| CFG-15 | Ferramenta de CI/CD | __________ | ______ |
| CFG-16 | Duração planejada de cada sprint | __ dias | ______ |
| CFG-17 | Número total de sprints planejadas | __ | ______ |

---

## SÍNTESE DAS MÉTRICAS POR SPRINT

Ao final de cada sprint, consolidar os seguintes indicadores:

| Grupo | Métrica | Target | Valor Obtido | Status |
|-------|---------|--------|--------------|--------|
| A | Precisão do Juiz | ≥ 0,85 | ____ | 🟢/🔴 |
| A | Recall do Juiz | ≥ 0,80 | ____ | 🟢/🔴 |
| A | F1-Score | ≥ 0,82 | ____ | 🟢/🔴 |
| A | Concordância | ≥ 0,80 | ____ | 🟢/🔴 |
| B | Cobertura do Modelo | ≥ 95% | ____ | 🟢/🟡/🔴 |
| B | Precisão da Implementação | ≥ 90% | ____ | 🟢/🟡/🔴 |
| B | Score Geral Alinhamento | ≥ 90 | ____ | 🟢/🟡/🔴 |
| C | Dívida Técnica (acumulada) | Decrescente | ____ | 📈/📉 |
| C | Taxa de Regressão | ≤ 5% | ____ | 🟢/🔴 |
| D | Satisfação (média) | ≥ 4/5 | ____ | 🟢/🔴 |

---

## BENEFÍCIOS E CONTRIBUIÇÕES ESPERADAS

| Benefício | Descrição |
|-----------|-----------|
| Evidência empírica | Sobre a eficácia da combinação de MDE+SDD com agentes de IA para geração de código frontend |
| Protocolo de pesquisa replicável | Para avaliação de pipelines de agentes de IA em tarefas de engenharia de software |
| Métricas validadas | Conjunto de métricas para avaliação de agentes de IA como "juízes" de consistência |
| Compreensão dos pontos fortes/fracos | Identificação das dimensões em que o pipeline é mais ou menos eficaz |
| Contribuição prática | Diretrizes para adoção de abordagens híbridas (modelagem + IA) em desenvolvimento frontend |

---

## LIMITAÇÕES E AMEAÇAS À VALIDADE

### Ameaças à validade interna

| Ameaça | Estratégia de Mitigação |
|--------|-------------------------|
| Vazamento/contaminação de dados | Utilizar especificações originais; documentar versões e datas |
| Viés dos pesquisadores | Prompts baseados em literatura; registrar todas as versões |
| Efeito Hawthorne | Realizar baseline com desenvolvimento sem pipeline |

### Ameaças à validade externa

| Ameaça | Estratégia de Mitigação |
|--------|-------------------------|
| Generalização para outros contextos | Reconhecer limitação; discutir transferabilidade |
| Especificidade dos participantes | Reconhecer limitação; sugerir replicações |

### Ameaças à validade de constructo

| Ameaça | Estratégia de Mitigação |
|--------|-------------------------|
| Operacionalização inadequada | Utilizar métricas validadas na literatura |
| Efeito de testes | Incluir baseline e tratar aprendizado como variável |

### Ameaças à validade de conclusão

| Ameaça | Estratégia de Mitigação |
|--------|-------------------------|
| Natureza não determinística dos LLMs | Reportar versões, datas, parâmetros; fornecer pacote de replicação |
| Pequeno tamanho amostral | Reconhecer limitação; tratar como evidências exploratórias |
| Confiabilidade da avaliação humana | Usar rubricas detalhadas e múltiplos avaliadores |

---

## REFERÊNCIAS

[1] SHULL, Forrest; SINGER, Janice; SJØBERG, Dag I. K. (eds.). *Guide to Advanced Empirical Software Engineering*. London: Springer-Verlag London Limited, 2008.

[2] WOHLIN, Claes; RUNESON, Per; HOST, Martin; OHLSSON, Magnus; REGNELL, Björn; WESSLEN, Anders. *Experimentation in Software Engineering*. Berlin: Springer, 2012.

[3] BALTES, Sebastian et al. *Guidelines for Empirical Studies in Software Engineering involving Large Language Models*. 2025. Disponível em: https://arxiv.org/abs/2508.15503

[4] TEIXEIRA, E.; FONSECA, L.; SOARES, S. Threats to validity in controlled experiments in software engineering: what the experts say and why this is relevant. In: SIMPÓSIO BRASILEIRO DE ENGENHARIA DE SOFTWARE (SBES), 32., 2018, São Carlos. *Proceedings...* New York: ACM, 2018. p. 52-61.

[5] BASILI, Victor R.; SHULL, Forrest; LANUBILE, Filippo. Building knowledge through families of experiments. *IEEE Transactions on Software Engineering*, v. 25, n. 4, p. 456-473, 1999.

[6] KITCHENHAM, Barbara et al. Preliminary guidelines for empirical research in software engineering. *IEEE Transactions on Software Engineering*, v. 28, n. 8, p. 721-734, 2002.

---

**Data de elaboração:** 14 de maio de 2026
**Versão:** 1.0
**Status:** Rascunho para revisão do orientador