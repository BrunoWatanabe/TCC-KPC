---
description: "Override do plano de implementação — Mescla o fluxo nativo do Spec-Kit com a Persona Arquiteto para garantir que toda sprint produza modelos PlantUML rastreáveis."
agent: speckit.plan.override
extends: speckit.plan
---

# Implementation Plan: Pairwise Similarity Serialization Fix 🐍🏗️

**Branch**: `002-pairwise-similarity-fix` | **Date**: 2026-06-20 | **Spec**: `specs/002-pairwise-similarity-fix/spec.md`

**Input**: Feature specification from `/specs/002-pairwise-similarity-fix/spec.md`

**Note**: Este template é um **override** do `.specify/templates/plan-template.md`. Ele mantém 100% da funcionalidade nativa do `/speckit.plan` e **adiciona** as diretrizes da **Persona Arquiteto** (`.github/prompts/persona-arquiteto.md`). A IA deve executar todo o fluxo padrão do Spec-Kit vestindo o chapéu de Arquiteto, gerando os artefatos de modelagem junto com o plano.

---

## 🧠 Instrução para a IA

> **IMPORTANTE**: Você está executando o comando nativo `/speckit.plan` do Spec-Kit. Mantenha **todas** as capacidades originais: setup, load context, constitution check, fases 0-1-2, hooks de extensão, etc. **ADICIONALMENTE**, você deve incorporar as regras da **Persona Arquiteto** contidas em `.github/prompts/persona-arquiteto.md`. Isso significa que, ao final do planejamento, você deve ter gerado ou atualizado os artefatos de modelagem UML (PlantUML) em `specs/<feature>/model/`.

### Resumo das Regras da Persona Arquiteto (aplicar DURANTE o plano)

1. **Analisar Especificações**: Leia a `spec.md` e extraia todos os RFs (Requisitos Funcionais) que precisam de modelagem.
2. **Modelar com PlantUML**: Gere diagramas de classes, componentes e/ou sequência em `specs/<feature>/model/`.
3. **Rastreabilidade**: Cada elemento deve conter tag `@rf:<ID>`.
4. **Simplicidade**: Modele apenas o necessário. Sem over-modelling.
5. **Documentar Decisões**: Inclua no plano as decisões arquiteturais tomadas.

---

## Summary

Corrigir o erro `PydanticSerializationError: Unable to serialize unknown type: <class 'numpy.int64'>` no endpoint `GET /topic/clusters/{username}/{topic}/pairwise_similarity` do backend FastAPI. O erro ocorre porque a rota retorna `clusters_meta_info` contendo valores numpy (`numpy.int64`, `numpy.float64`) que o Pydantic/FastAPI não consegue serializar. A solução é criar um conversor `NumpyConverter.to_native()` que percorre recursivamente a estrutura de dados convertendo tipos numpy para tipos Python nativos.

**CONST-R1 atualizada**: A constituição agora exige modelagem MDE+SDD também para o backend. Esta sprint gera diagramas PlantUML para o fluxo de serialização.

## Technical Context

**Language/Version**: Python 3.12, FastAPI 0.115.12, NumPy

**Primary Dependencies**: FastAPI, NumPy, Pydantic, Uvicorn

**Modeling Tool**: PlantUML (diagramas em `specs/002-pairwise-similarity-fix/model/`)

**Storage**: N/A (correção de serialização)

**Testing**: Teste manual com `curl` para validar HTTP 200

**Target Platform**: Backend FastAPI (servidor HTTP)

**Project Type**: Correção de bug no backend Python

**Performance Goals**: N/A

**Constraints**: 
- Estrutura do JSON de resposta NÃO DEVE ser alterada (RF-005)
- Demais ordenações (NUMERICAL, CLUSTER_COHESION, CENTROID_SIMILARITY) NÃO DEVEM ser afetadas (RF-007)
- Nenhuma alteração no frontend (RF-008)
- Conversão deve ser global/reutilizável (RF-006)

**Scale/Scope**: Sprint 02 — correção pontual de serialização numpy no backend `kpc-backend/`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Justificativa |
|------|--------|---------------|
| **GATE-01 — Planejamento Obrigatório** | ✅ APROVADO | CONST-R1 atualizada cobre backend. Spec em `specs/002-pairwise-similarity-fix/spec.md` com RF-003..RF-008. Diagramas `.puml` serão gerados na Fase 1. |
| **GATE-02 — Análise Pré-Merge** | ⏳ Pós-implementação | Será verificado após implementação. |
| **GATE-03 — Over-engineering Bloqueia Merge** | ✅ APROVADO | Correção de bug no backend. Escopo limitado a RF-003..RF-008. |

**Princípios Constitucionais Aplicáveis**:
- ✅ **CONST-R1 — MDE+SDD First**: Spec existe. Diagramas serão gerados na Fase 1 (backend).
- ✅ **CONST-R2 — Zero Over-Engineering**: Correção limitada ao necessário.
- ✅ **CONST-R3 — Rastreabilidade Obrigatória**: Tags `@rf:` nos diagramas.
- ✅ **CONST-R6 — Constituição como Árbitro Final**: Decisões documentadas.

---

## 📐 Artefatos de Modelagem (Override — Persona Arquiteto)

Esta seção é **adicional** ao template nativo. Ela documenta os artefatos PlantUML que serão gerados durante a Fase 1 (Design).

### Diagramas Planejados

| Diagrama | Arquivo | RFs Cobertos | Descrição |
|----------|---------|--------------|-----------|
| Classes | `specs/002-pairwise-similarity-fix/model/classes.puml` | RF-003 | Endpoint pairwise_similarity + NumpyConverter + tipos envolvidos |
| Sequência | `specs/002-pairwise-similarity-fix/model/sequence.puml` | RF-003 | Fluxo de serialização antes/depois da correção |
| Componentes | `specs/002-pairwise-similarity-fix/model/components.puml` | RF-003 | Dependências entre módulos (Controller → Converter → Response) |

### Rastreabilidade RF → Modelo

| RF | Elemento Modelado | Diagrama |
|----|-------------------|----------|
| RF-003 | `ClusterEndpoint`, `list_clusters()` | classes.puml, sequence.puml, components.puml |
| RF-003 | `NumpyConverter.to_native()` | classes.puml, components.puml |
| RF-003 | Fluxo serialização (antes/depois) | sequence.puml |
| RF-003 | `PairwiseSimilarity.get_pairwise_similarity()` | classes.puml |
| RF-003 | `JSONResponse` (FastAPI) | components.puml |

### Regras Aplicadas

- ✅ **R1 — Fidelidade à Spec**: Todos os elementos modelados têm RF correspondente na spec
- ✅ **R2 — Rastreabilidade**: Tags `@rf:` inseridas em cada elemento
- ✅ **R4 — Simplicidade**: Apenas o necessário para cobrir RF-003

### Decisão Arquitetural

1. **Abordagem**: Criar `NumpyConverter.to_native()` como função utilitária reutilizável que percorre recursivamente dicts/lists convertendo `numpy.integer` → `int`, `numpy.floating` → `float`, `numpy.ndarray` → `list`
2. **Local**: `src/keyphrase_curation/util/json_encoder.py`
3. **Reúso**: A mesma função será usada na Sprint 03 para `centroid_similarity`
4. **Aplicação**: Chamar `NumpyConverter.to_native()` no retorno do controller, antes da serialização Pydantic

---

## Project Structure

### Documentation (this feature)

```text
specs/002-pairwise-similarity-fix/
├── spec.md               # Especificação funcional (RF-003 a RF-008)
├── plan.md               # Este arquivo (output do /speckit.plan)
├── model/                # 📐 Artefatos de modelagem (Persona Arquiteto)
│   ├── classes.puml      # Diagrama de classes (@rf: RF-003)
│   ├── sequence.puml     # Diagrama de sequência (@rf: RF-003)
│   └── components.puml   # Diagrama de componentes (@rf: RF-003)
├── research.md           # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
└── tasks.md              # Phase 2 output
```

### Source Code (kpc-backend)

```text
kpc-backend/src/keyphrase_curation/
├── api/
│   ├── main.py           # FastAPI app
│   ├── topic.py          # 🔧 Rota /clusters/{username}/{topic}/{cluster_order}
│   └── cluster.py        # Rotas auxiliares de cluster
├── util/
│   ├── pairwise_similarity.py   # Fonte de numpy.int64
│   └── json_encoder.py          # 🔧 NOVO — NumpyConverter
├── model/
│   ├── cluster.py        # Geração de matrizes numpy
│   └── annotation.py     # ClusterAnnotation
└── controller/
    └── annotation.py     # Monta clusters_meta_info
```

---

## ⚠️ Instrução Final para a IA

1. Execute o **Setup** e **Load Context** normalmente (`setup-plan.sh`, ler FEATURE_SPEC, constitution)
2. Preencha todas as seções nativas do template (Technical Context, Constitution Check, Phases)
3. **Durante a Fase 1 (Design)**, **adicionalmente**:
   - Leia `.github/prompts/persona-arquiteto.md` para orientação detalhada
   - Crie os arquivos `.puml` em `specs/002-pairwise-similarity-fix/model/`
   - Garanta rastreabilidade RF → modelo em cada elemento
   - Atualize a seção "📐 Artefatos de Modelagem" acima
4. Complete a **Fase 2 (Tasks)** normalmente via `/speckit.tasks`
5. Execute os **Post-Execution Hooks** normalmente
6. Reporte ao final, incluindo: "📐 Modelagem concluída — diagramas em `specs/002-pairwise-similarity-fix/model/"`