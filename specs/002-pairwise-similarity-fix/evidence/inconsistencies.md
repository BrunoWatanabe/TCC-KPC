# Relatório de Evidências — Pairwise Similarity Serialization Fix

**Feature:** 002-pairwise-similarity-fix
**Total de Rodadas:** 1

---

## 🔵 Rodada Atual: R1

**Data:** 2026-06-20
**Rodadas Anteriores:** Nenhuma (rodada inicial)

### Sumário da Rodada

| Métrica | Valor |
|---------|-------|
| Evidências NOVAS | 2 |
| Evidências PERSISTEM | 0 |
| Evidências RESOLVIDAS | 0 |
| Evidências REABERTAS | 0 |

### Árvore de Evidências

| Rodada Anterior | Status | Rodada Atual |
|----------------|--------|--------------|
| — | 🆕 NOVA | EVD-002-R1-001 |
| — | 🆕 NOVA | EVD-002-R1-002 |

---

## 🔵 Rodada 1: R1

**Data:** 2026-06-20

### Evidências da Rodada

### EVD-002-R1-001 — CORRECAO_INCOMPLETA_CLUSTERS {#evd-R1-001}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | CORRECAO_INCOMPLETA |
| **severidade** | CRITICA |
| **RF Associado** | RF-003, RF-004 |
| **descrição** | `NumpyConverter.to_native()` aplicado APENAS em `clusters_meta_info`, mas `clusters` também contém valores numpy. Log do servidor confirma `PydanticSerializationError: numpy.int64` ainda ocorre. |
| **localização_modelo** | `classes.puml` — `TopicRouter --> NumpyConverter : <<aplica>>` |
| **localização_código** | `api/topic.py:266-268` — conversão aplicada apenas em `clusters_meta_info` |
| **detalhes** | O log do servidor mostra que `pairwise_similarity` ainda retorna HTTP 500 com `PydanticSerializationError: Unable to serialize unknown type: <class 'numpy.int64'>`. A conversão cobre apenas `clusters_meta_info`, mas `clusters` (retornado por `_process_clusters_to_array()`) também carrega valores numpy propagados via `cluster_data`, `cluster_selection`, e `keyphrases_selection` que contêm tipos numpy. |

#### Depoimento Arquiteto (ARG-002-R1-001)
> **Posição:** O modelo está correto — especifica que `NumpyConverter.to_native()` deve ser aplicado ao dado antes de serializar.
> **Justificativa:** O modelo (`sequence.puml:78-89`) mostra o fluxo "Depois" com `to_native(clusters_meta_info)` sendo chamado antes do return. No entanto, o diagrama de sequência foca no `clusters_meta_info` como portador principal dos valores numpy, mas não considera que `clusters` também pode conter tipos numpy. O Arquiteto reconhece que o modelo poderia ser mais explícito sobre a necessidade de conversão em toda a estrutura de retorno.

#### Depoimento Developer (DEP-002-R1-001)
> **Posição:** Reconhece que a correção está incompleta.
> **Justificativa:** O Developer aplicou `NumpyConverter.to_native()` especificamente em `clusters_meta_info` conforme o modelo e a task T002.2. No entanto, o log do servidor mostra que `clusters` também contém valores numpy que não foram convertidos. O Developer deveria ter aplicado a conversão em todo o dicionário de retorno (`return NumpyConverter.to_native({...})`) ou também em `clusters`. O modelo não explicitava essa necessidade, e a task T002.2 focava apenas em `clusters_meta_info`.

---

### EVD-002-R1-002 — MODELO_FOCA_APENAS_META_INFO {#evd-R1-002}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | MODELO_INSUFICIENTE |
| **severidade** | ALTA |
| **RF Associado** | RF-003 |
| **descrição** | O modelo `sequence.puml` e `classes.puml` especificam conversão apenas em `clusters_meta_info`, mas o retorno da API inclui `clusters` (dict → array) que também carrega valores numpy. O escopo da conversão no modelo é insuficiente. |
| **localização_modelo** | `sequence.puml:78` — `to_native(clusters_meta_info)` |
| **localização_código** | `api/topic.py:258-263` — `return {"sorting_applied", "clusters", "clusters_meta_info"}` |
| **detalhes** | O `clusters` é processado por `_process_clusters_to_array()` que usa `_build_cluster_object()` e `_process_keyphrases_selection()`. Estes métodos propagam `cluster_data`, `cluster_selection`, e `keyphrases_selection` que contêm tipos numpy vindos de `get_pairwise_cluster_similarity()`. O modelo deveria especificar conversão em todo o objeto de retorno, não apenas em `clusters_meta_info`. |

#### Depoimento Arquiteto (ARG-002-R1-002)
> **Posição:** Reconhece que o modelo poderia ser mais abrangente.
> **Justificativa:** O Arquiteto modelou a conversão no `clusters_meta_info` por ser o portador direto dos valores numpy de `get_pairwise_cluster_similarity()`. Não previu que `clusters` também propagaria valores numpy via as cadeias de `cluster_data`. O modelo deveria ser atualizado para aplicar `to_native()` em todo o dicionário de retorno ou em ambos `clusters` e `clusters_meta_info`.

#### Depoimento Developer (DEP-002-R1-002)
> **Posição:** Seguiu estritamente o modelo.
> **Justificativa:** O Developer implementou exatamente o que foi modelado: `NumpyConverter.to_native(clusters_meta_info)` conforme `sequence.puml:78`. O modelo não especificava conversão em `clusters`, e a task T002.2 instruía especificamente converter `clusters_meta_info`. O Developer argumenta que seguiu CONST-R2 (fidelidade ao modelo) e que a omissão está no escopo do modelo, não na implementação.

---

## Checklist de Verificação — Rodada 1

| ID | Item | Status |
|----|------|--------|
| CHK-CLASS-01 | Classes modeladas → implementadas | ✅ `NumpyConverter` em `util/json_encoder.py` |
| CHK-METH-01 | Métodos modelados → implementados | ✅ `to_native()`, `_convert_value()` implementados |
| CHK-METH-02 | Assinaturas compatíveis | ✅ |
| CHK-SEQ-01 | Fluxo modelado → implementado | ❌ **Faltou aplicar em `clusters`** (EVD-002-R1-001) |
| CHK-DEP-01 | Tags `# @model:` presentes | ✅ `util/json_encoder.py`, `api/topic.py` |
| CHK-INT-01 | Endpoint retorna HTTP 200 | ❌ **Retorna HTTP 500** (EVD-002-R1-001) |

---

## Resumo da Rodada

| Métrica | Valor |
|---------|-------|
| Total de Evidências | 2 |
| Severidade CRITICA | 1 (EVD-002-R1-001 — correção incompleta) |
| Severidade ALTA | 1 (EVD-002-R1-002 — modelo insuficiente) |
| CHK-INT-01 (validação curl) | ❌ HTTP 500 — `numpy.int64` não serializado |