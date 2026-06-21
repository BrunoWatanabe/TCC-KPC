# Relatório de Evidências — Sprint 03 T004+T005

**Feature:** S3T004T005
**Total de Rodadas:** 1

---

## 🔵 Rodada Atual: R1

**Data:** 2026-06-21
**Rodadas Anteriores:** Nenhuma (primeira rodada)

### Sumário da Rodada

| Métrica | Valor |
|---------|-------|
| Evidências NOVAS | 5 |
| Evidências PERSISTEM | 0 |
| Evidências RESOLVIDAS | 0 |
| Evidências REABERTAS | 0 |

### Árvore de Evidências (Rastreamento Pai-Filho)

| Rodada Anterior | Status | Rodada Atual |
|----------------|--------|--------------|
| — | 🆕 NOVA | EVD-S3T004T005-R1-001 |
| — | 🆕 NOVA | EVD-S3T004T005-R1-002 |
| — | 🆕 NOVA | EVD-S3T004T005-R1-003 |
| — | 🆕 NOVA | EVD-S3T004T005-R1-004 |
| — | 🆕 NOVA | EVD-S3T004T005-R1-005 |

### Verificação Prévia: Itens SEM Evidências

Os seguintes itens da checklist foram verificados e **não apresentam inconsistências**:

| Checklist | Resultado |
|-----------|-----------|
| CHK-CLASS-01: Classes modeladas existem no código | ✅ Todas presentes |
| CHK-CLASS-02: Componentes modelados têm pasta/arquivo | ✅ Todas presentes |
| CHK-METH-01: Métodos modelados têm função no código | ✅ Todos presentes |
| CHK-METH-02: Assinaturas compatíveis | ✅ Compatíveis |
| CHK-ATTR-01: Atributos modelados existem | ✅ Todos presentes |
| CHK-ATTR-02: Tipos correspondem | ✅ Correspondem |
| CHK-SEQ-01: Fluxo cluster_cohesion (RF-005) | ✅ `reverse=True` correto no modelo e código |
| CHK-SEQ-02: Fluxo centroid_similarity (RF-006) | ✅ `reverse=True` correto no modelo e código |
| CHK-SEQ-03: Ordem das chamadas no diagrama | ✅ Correspondem |
| CHK-RF-01: RF-005 associado a CLUSTER_COHESION | ✅ Correto |
| CHK-RF-02: RF-006 associado a CENTROID_SIMILARITY | ✅ Correto |
| CHK-RF-03: Tags @rf: nos locais corretos | ✅ Presentes nos .puml |

### Evidências da Rodada

---

### EVD-S3T004T005-R1-001 — TAG_MODEL_AUSENTE {#evd-r1-001}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `TAG_MODEL_AUSENTE` |
| **severidade** | BAIXA |
| **RF Associado** | RF-005, RF-006 |
| **descrição** | O arquivo `model/cluster.py` não possui anotações `// @model:` referenciando os diagramas PlantUML da Sprint 03 (`relatorios/sprint3-t004-t005/model/classes.puml`). As classes `KeyphraseClustering` e `Cluster` (inner class) contêm a lógica de ordenação corrigida nesta sprint, mas não há rastreabilidade reversa para o modelo. |
| **localização_modelo** | `classes.puml:35-65` (KeyphraseClustering), `classes.puml:67-79` (Cluster) |
| **localização_código** | `cluster.py:1` (topo do arquivo — sem @model) |
| **detalhes** | A persona Developer (R3 — Rastreabilidade Reversa) exige que todo arquivo de código contenha `// @model: <path>`. O arquivo `cluster.py` não possui nenhuma anotação `@model:`. Já `json_encoder.py` possui corretamente `// @model: specs/002-pairwise-similarity-fix/model/classes.puml` (da Sprint 02), mas `cluster.py` não foi atualizado para incluir a Sprint 03. |

#### Depoimento do Arquiteto (ARG-S3T004T005-R1-001)
> O modelo em `classes.puml` define claramente `KeyphraseClustering` e `Cluster` com os métodos `get_clusters()`, `get_cohesion()`, `get_centrality_scores()` e `get_cluster_centrality_scores()`, todos rastreados a RF-005 e RF-006 via tags `@rf:`. Como Arquiteto, espero que o código contenha `@model:` annotations apontando para o diagrama que modelei. A ausência delas não afeta o comportamento do sistema, mas quebra a rastreabilidade reversa que o pipeline Spec-Kit exige. A responsabilidade é do Developer por não ter adicionado os comentários de rastreamento.

#### Depoimento do Developer (DEP-S3T004T005-R1-001)
> O código em `cluster.py` foi modificado pelo Copilot em modo livre (sem metodologia Spec-Kit), conforme documentado em `log-copilot-sprint3-t004-t005.md`. Como não havia a exigência de `@model:` annotations no fluxo de trabalho adotado (Copilot puro), essas anotações não foram geradas. Reconheço que, se estivéssemos seguindo o pipeline Spec-Kit, elas deveriam estar presentes. A ausência é um subproduto da metodologia experimental, não um erro de implementação.

---

### EVD-S3T004T005-R1-002 — TAG_MODEL_AUSENTE {#evd-r1-002}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `TAG_MODEL_AUSENTE` |
| **severidade** | BAIXA |
| **RF Associado** | RF-005, RF-006 |
| **descrição** | O arquivo `controller/annotation.py` não possui anotações `// @model:` referenciando os diagramas PlantUML da Sprint 03. A classe `AnnotationController` contém o método `get_clusters()` que orquestra a chamada para `KeyphraseClustering.get_clusters()` e constrói os aliases com coesão e similaridade ao centróide. |
| **localização_modelo** | `classes.puml:22-30` (AnnotationController) |
| **localização_código** | `controller/annotation.py:60` (método `get_clusters()`) |
| **detalhes** | O arquivo `annotation.py` não possui nenhum comentário `@model:` em todo o seu conteúdo. |

#### Depoimento do Arquiteto (ARG-S3T004T005-R1-002)
> O diagrama `classes.puml` modela `AnnotationController` com o método `get_clusters(sort_by: ClusterSorting) : tuple` e seus atributos privados. A implementação em `annotation.py:60` segue fielmente o que foi modelado. No entanto, a ausência de `// @model:` annotations é uma falha de rastreabilidade. Como Arquiteto, entendo que o Developer deveria ter incluído essas referências para garantir que futuras manutenções do código possam localizar o diagrama correspondente.

#### Depoimento do Developer (DEP-S3T004T005-R1-002)
> Assim como em `cluster.py`, o arquivo `annotation.py` foi modificado como parte do fluxo experimental sem Spec-Kit. O método `get_clusters()` em `annotation.py:60` já existia na base de código pré-sprint e não foi alterado para esta correção — apenas os métodos internos de ordenação em `cluster.py` foram modificados. Portanto, não houve motivo para adicionar `@model:` annotations em um arquivo que não foi alterado. Se a política do projeto exige que TODOS os arquivos tenham a anotação, concordo que é uma melhoria necessária, mas não relacionada às alterações da sprint.

---

### EVD-S3T004T005-R1-003 — METODO_EXTRAS {#evd-r1-003}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `METODO_EXTRAS` |
| **severidade** | MÉDIA |
| **RF Associado** | — |
| **descrição** | O método `get_cluster_ids()` existe em `cluster.py:267` na classe `KeyphraseClustering`, mas **não** está modelado em `classes.puml`. Este método retorna a lista de IDs dos clusters e não está coberto por nenhum diagrama da Sprint 03. |
| **localização_modelo** | Não consta (ausente do modelo) |
| **localização_código** | `cluster.py:267` |
| **detalhes** | O método `get_cluster_ids()` é público (`def get_cluster_ids(self)`) e retorna `list(self.clusters.keys())`. Embora não seja diretamente relacionado a RF-005/RF-006, sua existência no código sem contraparte no modelo caracteriza método não modelado. |

#### Depoimento do Arquiteto (ARG-S3T004T005-R1-003)
> O modelo `classes.puml` foi construído retroativamente para cobrir o escopo de T004+T005 (correção de ordenação). O método `get_cluster_ids()` não faz parte do fluxo de ordenação e, portanto, não foi incluído no diagrama. Como Arquiteto, entendo que o modelo desta sprint não precisa cobrir 100% da classe `KeyphraseClustering` — apenas as partes relevantes para os RFs da sprint. Métodos auxiliares como `get_cluster_ids()` são de sprints anteriores e não deveriam gerar evidência de inconsistência.

#### Depoimento do Developer (DEP-S3T004T005-R1-003)
> O método `get_cluster_ids()` existe na base de código desde antes da Sprint 03 e não foi modificado nesta sprint. Ele não participa do fluxo de ordenação por coesão ou similaridade ao centróide. Sua presença no código sem correspondência no modelo da Sprint 03 é esperada: o modelo cobre apenas o escopo da sprint, não a totalidade do sistema legado. Se o Arquiteto optou por modelar apenas o subset relevante, então este método está corretamente fora do escopo do modelo.

---

### EVD-S3T004T005-R1-004 — METODO_EXTRAS {#evd-r1-004}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `METODO_EXTRAS` |
| **severidade** | MÉDIA |
| **RF Associado** | — |
| **descrição** | O método `move_to_cluster(keyphrase, cluster)` existe em `cluster.py:302` na classe `KeyphraseClustering`, mas **não** está modelado em `classes.puml`. Este método move uma keyphrase entre clusters e não está coberto por nenhum diagrama da Sprint 03. |
| **localização_modelo** | Não consta (ausente do modelo) |
| **localização_código** | `cluster.py:302` |
| **detalhes** | Método público que modifica o estado do clustering. Não relacionado aos RFs de ordenação. |

#### Depoimento do Arquiteto (ARG-S3T004T005-R1-004)
> Este método não participa do fluxo de ordenação de clusters. O modelo da Sprint 03 foi deliberadamente limitado ao escopo de RF-005 e RF-006. Métodos de manipulação de clusters (mover, remover) são de funcionalidades anteriores e não precisam constar no modelo da sprint.

#### Depoimento do Developer (DEP-S3T004T005-R1-004)
> `move_to_cluster()` é um método preexistente, não modificado na Sprint 03. Ele faz parte da camada de manipulação de clusters, que é anterior a esta sprint e não foi alterada pelo Copilot. Nenhuma linha deste método foi tocada.

---

### EVD-S3T004T005-R1-005 — METODO_EXTRAS {#evd-r1-005}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `METODO_EXTRAS` |
| **severidade** | MÉDIA |
| **RF Associado** | — |
| **descrição** | O método `remove_from_cluster(keyphrase, cluster)` existe em `cluster.py` na classe `KeyphraseClustering` (próximo à linha 318), mas **não** está modelado em `classes.puml`. |
| **localização_modelo** | Não consta (ausente do modelo) |
| **localização_código** | `cluster.py:~318` |
| **detalhes** | Assim como `move_to_cluster()`, este método é preexistente e não relacionado à ordenação. Remove uma keyphrase de um cluster. |

#### Depoimento do Arquiteto (ARG-S3T004T005-R1-005)
> Mesma justificativa de EVD-004: o modelo cobre o escopo da sprint. Métodos de manipulação de estado interno não fazem parte do que foi modelado para RF-005/RF-006.

#### Depoimento do Developer (DEP-S3T004T005-R1-005)
> Método preexistente, não modificado. Sem relação com a correção de ordenação. Não deveria ser considerado uma inconsistência do ponto de vista do escopo da sprint.

---

## Notas Adicionais

### Evidências Verificadas e Consideradas Consistentes

Os seguintes elementos foram verificados e **confirmados como consistentes** entre modelo e código:

| Elemento | Modelo | Código | Status |
|----------|--------|--------|--------|
| `ClusterSorting.CLUSTER_COHESION` | `classes.puml:10` | `cluster.py:10` | ✅ `reverse=True` em ambos |
| `ClusterSorting.CENTROID_SIMILARITY` | `classes.puml:12` | `cluster.py:12` | ✅ `reverse=True` em ambos |
| `get_clusters(CLUSTER_COHESION)` | `classes.puml:39` + note | `cluster.py:384-389` | ✅ `sorted(..., key=get_cohesion, reverse=True)` |
| `get_clusters(CENTROID_SIMILARITY)` | `classes.puml:39` + note | `cluster.py:398-409` | ✅ `sorted(..., key=average_similarity... , reverse=True)` |
| `get_cluster_centrality_scores()` | `classes.puml:40` | `cluster.py:338` | ✅ Assinatura e retorno compatíveis |
| `get_cohesion()` | `classes.puml:75` | `cluster.py:153` | ✅ Retorna `float` |
| `get_centrality_scores()` | `classes.puml:78` | `cluster.py:192` | ✅ Retorna `dict` |
| `NumpyConverter.to_native()` | `classes.puml:88` | `json_encoder.py:24` | ✅ |
| Fluxo sequência RF-005 | `sequence.puml` | `topic.py:218-261` | ✅ reverse=True representado |
| Fluxo sequência RF-006 | `sequence.puml` | `topic.py:218-261` | ✅ reverse=True representado |
| `AnnotationController.get_clusters()` | `classes.puml:23` | `annotation.py:60` | ✅ Assinatura compatível |
| `list_clusters()` endpoint | `classes.puml:7` | `topic.py:218` | ✅ Assinatura compatível |

### Itens Fora do Escopo (Não Reportados como Evidências)

Os seguintes métodos preexistentes em `KeyphraseClustering` não foram incluídos no modelo da Sprint 03, mas **não foram reportados como METODO_EXTRAS** adicionais por serem redundantes com os já listados (EVD-003 a EVD-005):

- `get_keyphrase_list(sort_by)` — `cluster.py:~453` — método preexistente não relacionado à ordenação de clusters
- `get_keyphrase_descriptions(sort_by)` — `cluster.py:470` — método preexistente, parcialmente referenciado via `ClusterAnnotation` no modelo

---

## Referências

- **Modelo (classes.puml):** `relatorios/sprint3-t004-t005/model/classes.puml`
- **Modelo (sequence.puml):** `relatorios/sprint3-t004-t005/model/sequence.puml`
- **Modelo (components.puml):** `relatorios/sprint3-t004-t005/model/components.puml`
- **Código (cluster.py):** `kpc-backend/src/keyphrase_curation/model/cluster.py`
- **Código (annotation.py):** `kpc-backend/src/keyphrase_curation/controller/annotation.py`
- **Código (topic.py):** `kpc-backend/src/keyphrase_curation/api/topic.py`
- **Código (json_encoder.py):** `kpc-backend/src/keyphrase_curation/util/json_encoder.py`
- **Log experimental:** `relatorios/sprint3-t004-t005/log-copilot-sprint3-t004-t005.md`