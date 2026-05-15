# Relatório de Métricas para Avaliação do Framework MDE+SDD com Agentes de IA

**TCC**: Ressurreição da Engenharia Orientada a Modelos com Auxílio de Agentes de IA e Desenvolvimento Orientado a Especificações  
**Autores**: Daired
**Versão**: 1.0 — Mai/2026  
**Status**: Rascunho — Planejamento de Pesquisa

---

## 1. Introdução e Contexto

Este documento mapeia e propõe o conjunto de métricas a ser utilizado na avaliação experimental do TCC. O trabalho investiga se a combinação de **Engenharia Orientada a Modelos (MDE)** com **Desenvolvimento Orientado a Especificações (SDD)**, orquestrada por um pipeline de três agentes de IA (Arquiteto, Developer e Juiz), produz código frontend de maior qualidade, maior fidelidade ao modelo e menor dívida técnica em comparação ao desenvolvimento assistido por IA sem modelagem estruturada.

A hipótese central é: *um modelo forte gerado colaborativamente (Agente Arquiteto + Aluno) serve de âncora para o código gerado (Agente Developer + Aluno), e um agente Juiz atuando em cada commit mantém a consistência entre ambos, reduzindo retrabalho e dívida técnica*.

O experimento ocorre em ciclos de sprint (Scrum), onde cada commit dispara o Agente Juiz, que abre issues para inconsistências detectadas e bloqueia o merge até a resolução.

---

## 2. Taxonomia das Métricas

As métricas estão organizadas em quatro grupos, correspondendo às dimensões avaliadas no experimento:

| Grupo | O que mede | Onde se aplica |
|-------|-----------|----------------|
| **A — Qualidade do Juiz** | Precisão do agente de detecção de inconsistências | Pipeline de agentes |
| **B — Alinhamento Modelo-Código** | Fidelidade do código ao modelo UML/especificação | Produto gerado |
| **C — Qualidade de Código** | Saúde técnica do frontend gerado | Produto gerado |
| **D — Processo** | Eficiência do fluxo MDE+SDD com agentes | Sprint/processo |

---

## 3. Grupo A — Métricas de Qualidade do Agente Juiz

Estas métricas avaliam se o Agente Juiz está detectando inconsistências corretamente. A base é a matriz de confusão clássica adaptada ao domínio do TCC.

### 3.1 Matriz de Confusão do Juiz

Cada atuação do Juiz em um commit gera um dos quatro cenários:

| Cenário | Nome | Descrição |
|---------|------|-----------|
| **TP** | Detecção Verdadeira Positiva | O Juiz detectou uma inconsistência que **realmente existe**. Decisão correta de inconsistência. |
| **TN** | Detecção Verdadeira Negativa | O Juiz **não detectou** inconsistência onde de fato **não existe**. Decisão correta de aprovação. |
| **FP** | Falso Positivo | O Juiz detectou uma inconsistência que **não existia**. Apontou problema onde não havia. |
| **FN** | Falso Negativo | O Juiz **não detectou** uma inconsistência que **existia**. Deixou passar um problema real. |

> **Observação sobre FP vs FN no contexto do TCC**: Falsos negativos são mais graves que falsos positivos, pois deixam dívida técnica se acumular silenciosamente. Falsos positivos geram fricção desnecessária no processo, mas são recuperáveis na audiência entre agentes.

### 3.2 Métricas Derivadas da Matriz

#### Precisão do Juiz (Precision)
Mede: *Dos alarmes disparados, quantos eram reais?*

```
Precisão = TP / (TP + FP)
```

**Target**: ≥ 0,85 — alta precisão evita que o Juiz "trave" a branch com falsos alarmes e desmotive o time.

---

#### Revocação do Juiz (Recall / Sensibilidade)
Mede: *Das inconsistências reais, quantas o Juiz encontrou?*

```
Recall = TP / (TP + FN)
```

**Target**: ≥ 0,80 — alta revocação é essencial para não deixar dívida técnica escapar.

---

#### F1-Score do Juiz
Média harmônica entre Precisão e Recall. Equilibra as duas métricas em um único número.

```
F1 = 2 × (Precisão × Recall) / (Precisão + Recall)
```

**Target**: ≥ 0,82

---

#### Taxa de Falso Negativo (FNR)
Mede: *Que fração das inconsistências reais o Juiz deixou escapar?*

```
FNR = FN / (TP + FN)
```

**Target**: ≤ 0,20 — diretamente relacionado ao acúmulo de dívida técnica.

---

#### Taxa de Falso Positivo (FPR)
Mede: *Que fração das aprovações válidas o Juiz incorretamente barrou?*

```
FPR = FP / (FP + TN)
```

**Target**: ≤ 0,15 — taxas altas indicam que o Juiz é excessivamente conservador e gera fricção de processo.

---

### 3.3 Qualidade das Decisões na Audiência

O Agente Juiz não apenas detecta — ele conduz uma "audiência" onde Arquiteto e Developer justificam a inconsistência. A decisão final (inconsistência legítima vs. decisão consciente) também deve ser medida.

#### Taxa de Concordância na Audiência
Mede: *Em que percentual das audiências o veredicto do Juiz coincidiu com a avaliação dos professores (árbitros humanos)?*

```
Concordância = (Veredictos alinhados com árbitros) / (Total de audiências)
```

**Target**: ≥ 0,80

---

#### Qualidade da Justificativa (Rubrica 0–4)
Avaliação qualitativa, feita pelos professores, da adequação do argumento produzido na audiência.

| Pontuação | Descrição |
|-----------|-----------|
| 0 | Sem justificativa |
| 1 | Justificativa vaga ou irrelevante |
| 2 | Justificativa parcialmente coerente |
| 3 | Justificativa coerente e bem fundamentada |
| 4 | Justificativa excelente com evidências no modelo/spec |

---

## 4. Grupo B — Métricas de Alinhamento Modelo-Código

Estas métricas, parcialmente definidas em `METRICAS-ALINHAMENTO.md`, medem a fidelidade do código gerado ao modelo UML e à especificação SDD.

### 4.1 Cobertura do Modelo

Mede: *Que percentual dos elementos modelados foi implementado no código?*

```
Cobertura = (Elementos implementados / Elementos modelados) × 100
```

Elementos contados: classes, métodos, atributos em PlantUML.

| Status | Range |
|--------|-------|
| 🟢 Excelente | 95–100% |
| 🟡 Aceitável | 80–94% |
| 🔴 Crítico | < 80% |

---

### 4.2 Precisão da Implementação

Mede: *Das implementações realizadas, quantas estão corretas em relação ao modelo?* (assinatura, tipo de retorno, comportamento por testes)

```
Precisão da Impl. = (Implementações corretas / Implementações totais) × 100
```

| Status | Range |
|--------|-------|
| 🟢 Excelente | 90–100% |
| 🟡 Aceitável | 75–89% |
| 🔴 Crítico | < 75% |

---

### 4.3 Divergência Semântica

Mede: *Que percentual das implementações não faz o que o modelo/spec especifica?*

```
Divergência = (Comportamentos divergentes / Total de implementações) × 100
```

Tipos de divergência por severidade:

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

---

### 4.4 Over-Engineering

Mede: *Que percentual do código implementado não está no modelo?* (escopo quebrado)

```
Over-Engineering = (Código não modelado / Total de código) × 100
```

Interpretação importante: código de suporte técnico (helpers internos, utilitários de infraestrutura) pode ser excluído do numerador se documentado como "não modelável por convenção".

| Status | Range |
|--------|-------|
| 🟢 Excelente | 0–10% |
| 🟡 Aceitável | 11–20% |
| 🔴 Crítico | > 20% |

---

### 4.5 Score Geral de Alinhamento

Métrica sintética que combina as quatro anteriores em um único índice de 0 a 100.

```
Score = (Cobertura × 0,35) + (Precisão_Impl × 0,35)
      + ((100 − Divergência) × 0,20)
      + ((100 − Over-Engineering) × 0,10)
```

| Range | Status |
|-------|--------|
| 90–100 | 🟢 Excelente |
| 75–89 | 🟡 Bom |
| 60–74 | 🟠 Inadequado |
| < 60 | 🔴 Crítico |

---

### 4.6 Rastreabilidade (Traceability Coverage)

Mede: *Que percentual dos requisitos funcionais pode ser rastreado de ponta a ponta* (RF → Modelo → Código → Teste)?

```
Rastreabilidade = (RFs com cadeia completa RF→Modelo→Código→Teste) / (Total de RFs) × 100
```

Esta métrica é essencial para validar a premissa do SDD de que toda implementação deve ser justificável por uma especificação.

**Target**: ≥ 90%

---

## 5. Grupo C — Métricas de Qualidade de Código

Métricas técnicas do frontend gerado, independentes do alinhamento com modelo.

### 5.1 Dívida Técnica Acumulada por Sprint

Mede a quantidade de issues abertas pelo Juiz que ficaram pendentes ao final de cada sprint.

```
Dívida por Sprint = Issues abertas pelo Juiz não resolvidas ao final da sprint
```

A evolução desta métrica ao longo das sprints é um dos indicadores centrais do TCC para mostrar se o pipeline de agentes controla (ou não) o acúmulo de dívida.

**Forma de coleta**: Automática via integração do Agente Juiz com o sistema de issues do repositório.

---

### 5.2 Tempo de Resolução de Inconsistências

Mede: *Quanto tempo (em commits ou horas) leva para uma issue aberta pelo Juiz ser fechada?*

```
Tempo médio de resolução = Σ(tempo_fechamento − tempo_abertura) / Total de issues
```

**Target**: Tendência de queda ao longo das sprints (time aprendendo com o feedback do Juiz).

---

### 5.3 Complexidade Ciclomática

Medida clássica de complexidade de código. Ferramentas como `radon` (Python), `complexity-report` (JS) ou equivalentes para a stack do frontend.

Acompanhar a **média por componente** e a **tendência por sprint**.

**Target de referência**: Média ≤ 10 por função/método.

---

### 5.4 Cobertura de Testes

```
Cobertura de Testes = (Linhas cobertas por testes / Total de linhas) × 100
```

Relevante especialmente para validar a Precisão da Implementação (Métrica 4.2), pois esta depende dos testes passando.

**Target**: ≥ 70% (frontend tem historicamente cobertura menor que backend).

---

### 5.5 Taxa de Regressão

Mede: *Que percentual de funcionalidades previamente aprovadas quebrou após um commit?*

```
Regressão = (Testes que passavam e agora falham) / (Total de testes que passavam antes)
```

---

## 6. Grupo D — Métricas de Processo

Avaliam a eficiência do fluxo MDE+SDD+Agentes em comparação a uma linha de base.

### 6.1 Velocidade de Entrega por Sprint (Story Points / Tempo)

Mede o throughput do processo com e sem o pipeline de agentes (se houver fase de baseline).

---

### 6.2 Taxa de Rejeição de Branch pelo Juiz

```
Taxa de Rejeição = (Commits rejeitados pelo Juiz) / (Total de commits) × 100
```

Uma taxa muito alta pode indicar que o Arquiteto e o Developer estão desalinhados. Espera-se queda ao longo das sprints.

---

### 6.3 Taxa de Revisão de Modelo (Churn do Modelo)

Mede quantas vezes o modelo UML precisou ser revisado após um ciclo de codificação iniciar.

```
Churn do Modelo = Revisões de modelo iniciadas pelo Developer / Total de sprints
```

Alta frequência pode indicar submodelagem inicial; baixa pode indicar rigidez excessiva.

---

### 6.4 Satisfação do Desenvolvedor (Qualitativa)

Questionário Likert (1–5) aplicado ao final de cada sprint para avaliar:

- Clareza do modelo como guia de codificação
- Utilidade do feedback do Juiz
- Carga cognitiva percebida do processo
- Confiança na qualidade do código produzido

---

## 7. Resumo Consolidado das Métricas

| ID | Métrica | Grupo | Tipo | Target |
|----|---------|-------|------|--------|
| A1 | Precisão do Juiz | Juiz | Quantitativo | ≥ 0,85 |
| A2 | Recall do Juiz | Juiz | Quantitativo | ≥ 0,80 |
| A3 | F1-Score do Juiz | Juiz | Quantitativo | ≥ 0,82 |
| A4 | Taxa de Falso Negativo | Juiz | Quantitativo | ≤ 0,20 |
| A5 | Taxa de Falso Positivo | Juiz | Quantitativo | ≤ 0,15 |
| A6 | Concordância na Audiência | Juiz | Quantitativo | ≥ 0,80 |
| A7 | Qualidade da Justificativa | Juiz | Qualitativo (rubrica) | ≥ 3/4 |
| B1 | Cobertura do Modelo | Alinhamento | Quantitativo | ≥ 95% |
| B2 | Precisão da Implementação | Alinhamento | Quantitativo | ≥ 90% |
| B3 | Divergência Semântica | Alinhamento | Quantitativo | ≤ 5% |
| B4 | Over-Engineering | Alinhamento | Quantitativo | ≤ 10% |
| B5 | Score Geral de Alinhamento | Alinhamento | Sintético | ≥ 90 |
| B6 | Rastreabilidade RF→Código→Teste | Alinhamento | Quantitativo | ≥ 90% |
| C1 | Dívida Técnica por Sprint | Código | Quantitativo | Tendência decrescente |
| C2 | Tempo de Resolução de Issues | Código | Quantitativo | Tendência decrescente |
| C3 | Complexidade Ciclomática Média | Código | Quantitativo | ≤ 10 |
| C4 | Cobertura de Testes | Código | Quantitativo | ≥ 70% |
| C5 | Taxa de Regressão | Código | Quantitativo | ≤ 5% |
| D1 | Velocidade de Entrega | Processo | Quantitativo | Referência interna |
| D2 | Taxa de Rejeição de Branch | Processo | Quantitativo | Tendência decrescente |
| D3 | Churn do Modelo | Processo | Quantitativo | Referência interna |
| D4 | Satisfação do Desenvolvedor | Processo | Qualitativo (Likert) | ≥ 4/5 |

---

## 8. Plano de Coleta e Automação

### Por Commit (Automático — Agente Juiz)
- A1, A2, A3, A4, A5 — derivados dos registros de detecção do Juiz
- B1, B2, B3, B4, B5 — calculados por scripts de parsing (PlantUML → AST → comparação)
- C1 — contagem de issues abertas sem resolução
- D2 — proporção de commits rejeitados

### Por Sprint (Manual + Automático)
- A6, A7 — avaliação pelos professores nas audiências registradas
- B6 — revisão da matriz de rastreabilidade
- C2 — média calculada a partir de timestamps das issues
- C3, C4 — ferramentas de análise estática rodadas na branch de release da sprint
- C5 — comparação de resultados de testes entre sprints
- D1 — contagem de story points entregues
- D3 — diff do modelo UML entre início e fim da sprint
- D4 — questionário Likert aplicado aos dois alunos

---

## 9. Recomendações de Pesquisa

A seguir, tópicos e termos de busca sugeridos para embasar teoricamente as métricas deste documento.

### 9.1 MDE e Qualidade de Código
- *"Model-Driven Engineering code quality metrics"*
- *"UML model conformance code generation"*
- *"Model-to-code traceability"*
- Autores de referência: Jean Bézivin, Bran Selic (MDA/MDE)

### 9.2 Avaliação de Agentes de IA em Engenharia de Software
- *"LLM agents software engineering evaluation"*
- *"AI code generation quality metrics"*
- *"SWE-bench evaluation methodology"*

### 9.3 Detecção de Inconsistências Modelo-Código
- *"Model-code inconsistency detection"*
- *"Architectural drift detection software"*
- *"Design conformance checking automated"*

### 9.4 Métricas de Dívida Técnica
- *"Technical debt measurement metrics"*
- *"Software quality metrics agile sprint"*
- Martin Fowler — *"TechnicalDebt"* (refactoring.com)

### 9.5 SDD (Specification-Driven Development)
- *"Specification-driven development metrics"*
- *"BDD behavior-driven development quality"*
- *"Formal specification code correctness"*

### 9.6 Métricas de Avaliação de LLM como Juiz
- *"LLM as judge evaluation reliability"*
- *"LLM judge false positive false negative"*
- *"ARES RAG evaluation framework"* (referência para sistemas de avaliação automática)

---

## 10. Próximos Passos

- [ ] Revisar targets das métricas com o professor orientador
- [ ] Implementar scripts de parsing PlantUML → JSON e AST → JSON (Grupo B)
- [ ] Configurar integração do Agente Juiz com sistema de issues do repositório
- [ ] Definir rubrica final de avaliação de qualidade de justificativas (Métrica A7)
- [ ] Criar template de questionário Likert para Métrica D4
- [ ] Conduzir sprint piloto para calibrar baseline das métricas de processo (D1, D3)
- [ ] Iniciar revisão bibliográfica pelos termos de pesquisa da Seção 9

---

*Documento de planejamento de métricas — TCC Daired — Mai/2026*
