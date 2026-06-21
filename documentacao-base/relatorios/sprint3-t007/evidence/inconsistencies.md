# Relatório de Evidências — Sprint 03 T007

**Feature:** S3T007
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
| — | 🆕 NOVA | EVD-S3T007-R1-001 |
| — | 🆕 NOVA | EVD-S3T007-R1-002 |
| — | 🆕 NOVA | EVD-S3T007-R1-003 |
| — | 🆕 NOVA | EVD-S3T007-R1-004 |
| — | 🆕 NOVA | EVD-S3T007-R1-005 |

### Verificação Prévia: Itens SEM Evidências

Os seguintes itens da checklist foram verificados e **não apresentam inconsistências**:

| Checklist | Resultado |
|-----------|-----------|
| CHK-CLASS-01: Classes/componentes modelados existem no código | ✅ Todos presentes |
| CHK-CLASS-02: Componentes modelados têm pasta/arquivo | ✅ Todos presentes |
| CHK-CLASS-03: Componentes no código sem modelo | ✅ Nenhum não modelado detectado |
| CHK-METH-01: Métodos/funções modelados existem no código | ✅ Todos presentes |
| CHK-METH-02: Assinaturas compatíveis | ✅ Compatíveis |
| CHK-ATTR-01: Atributos modelados existem | ✅ Todos presentes |
| CHK-ATTR-02: Tipos correspondem | ✅ Correspondem |
| CHK-SEQ-01: Fluxo pairwise_similarity com algoritmo T007 | ✅ 3 etapas modeladas e implementadas |
| CHK-SEQ-02: Ordem das chamadas no diagrama | ✅ Correspondem à pilha real |
| CHK-SEQ-03: Verificação de reciprocidade (best_data[2] == kid) | ✅ Modelada em classes.puml, sequence.puml e components.puml |
| CHK-RF-01: RF-008 associado a PAIRWISE_SIMILARITY | ✅ Tags @rf: RF-008 nos 3 diagramas |
| CHK-RF-02: Tags @rf: nos locais corretos | ✅ classes.puml, sequence.puml, components.puml com RF-008 |
| CHK-OVER-01: Código de agrupamento não modelado | ✅ Algoritmo T007 completamente modelado |
| CHK-OVER-02: Métodos não modelados (sprint anterior) | ⚠️ Ver evidências EVD-004 e EVD-005 |

### Evidências da Rodada

---

### EVD-S3T007-R1-001 — TAG_MODEL_AUSENTE {#evd-r1-001}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `TAG_MODEL_AUSENTE` |
| **severidade** | BAIXA |
| **RF Associado** | RF-008 |
| **descrição** | O arquivo `model/cluster.py` não possui anotação `// @model:` referenciando os diagramas PlantUML da Sprint 03 T007. O método `get_keyphrase_descriptions()` foi modificado com o algoritmo T007 (pós-processamento de pares recíprocos), e a classe `KeyphraseClustering` como um todo carece de rastreabilidade reversa. |
| **localização_modelo** | `classes.puml:44-52` (KeyphraseClustering), `classes.puml:72-95` (algoritmo T007) |
| **localização_código** | `cluster.py:1` (topo do arquivo) |
| **detalhes** | A persona Developer (R3 — Rastreabilidade Reversa) exige `// @model: <path>` em todo arquivo de código. O arquivo `cluster.py` não possui nenhuma `@model:` annotation, seja para os diagramas da Sprint 02 (pairwise-similarity-fix) ou para os diagramas da Sprint 03 T007. Nem mesmo os comentários `# T007 — Sprint 03:` (presentes nas linhas 478, 495, 513) servem como rastreabilidade formal, pois não referenciam um arquivo `.puml` específico. |

#### Depoimento do Arquiteto (ARG-S3T007-R1-001)
> O modelo em `classes.puml` detalha o algoritmo T007 com as estruturas `temp_list`, `id_to_data`, `visited` e `grouped_list`, além das 3 etapas documentadas no note bottom de `KeyphraseClustering::get_keyphrase_descriptions()`. O diagrama de sequência `sequence.puml` mostra o fluxo completo com 33 passos detalhados. Como Arquiteto, espero que o código contenha `// @model:` annotations apontando para estes diagramas. As anotações `# T007 — Sprint 03:` são úteis como comentários de contexto, mas não substituem a rastreabilidade formal que o pipeline Spec-Kit exige.

#### Depoimento do Developer (DEP-S3T007-R1-001)
> O algoritmo T007 em `cluster.py:475-520` foi implementado pelo Copilot em modo livre (sem metodologia Spec-Kit), conforme log experimental. O código contém comentários `# T007 — Sprint 03:` e `# Etapa 1/2/3:` que documentam o propósito e a estrutura do algoritmo, mas não referenciam arquivos `.puml` específicos. No fluxo experimental adotado, não houve geração de `@model:` annotations — este é um subproduto esperado da metodologia Copilot puro. A implementação em si está correta: 140/140 pares recíprocos adjacentes conforme validado.

---

### EVD-S3T007-R1-002 — TAG_MODEL_AUSENTE {#evd-r1-002}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `TAG_MODEL_AUSENTE` |
| **severidade** | BAIXA |
| **RF Associado** | RF-008 |
| **descrição** | O arquivo `controller/annotation.py` não possui anotação `// @model:` referenciando os diagramas da Sprint 03 T007. O método `get_keyphrase_clustering()` delega a chamada para `cluster_annotation.get_keyphrase_descriptions()` que executa o algoritmo T007. |
| **localização_modelo** | `classes.puml:25-37` (AnnotationController), `components.puml:32-42` (AnnotationComponent) |
| **localização_código** | `annotation.py:35` (método `get_keyphrase_clustering()`) |
| **detalhes** | O arquivo `annotation.py` não possui `@model:` annotations para nenhuma sprint, incluindo a Sprint 02 (onde faz parte do pipeline) e Sprint 03 T007. Embora o método `get_keyphrase_clustering()` não tenha sido modificado diretamente pelo T007, ele faz parte da cadeia de chamadas que executa o algoritmo. |

#### Depoimento do Arquiteto (ARG-S3T007-R1-002)
> `AnnotationController.get_keyphrase_clustering()` é o ponto de entrada da controller que orquestra a chamada ao algoritmo T007. Está modelado em `classes.puml` e `components.puml` dentro do escopo RF-008. A ausência de `@model:` annotation impede a rastreabilidade reversa — um desenvolvedor futuro que ler este código não saberá que diagrama o define.

#### Depoimento do Developer (DEP-S3T007-R1-002)
> `annotation.py` não foi modificado pelo T007. O método `get_keyphrase_clustering()` já existia e delega a chamada para o model. A alteração do RF-008 foi estritamente no branch `PAIRWISE_SIMILARITY` de `get_keyphrase_descriptions()` em `cluster.py`. Se a política exige `@model:` em TODOS os arquivos do ecossistema, esta é uma dívida técnica preexistente, não introduzida pela sprint.

---

### EVD-S3T007-R1-003 — TAG_MODEL_AUSENTE {#evd-r1-003}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `TAG_MODEL_AUSENTE` |
| **severidade** | BAIXA |
| **RF Associado** | RF-008 |
| **descrição** | O arquivo `api/topic.py` não possui anotação `// @model:` referenciando os diagramas da Sprint 03 T007. O endpoint `list_keyphrase_clusters()` (linha 169) recebe a requisição `GET /keyphrase_clustering/{username}/{topic}/pairwise_similarity` e inicia toda a cadeia de chamadas que executa o algoritmo T007. |
| **localização_modelo** | `classes.puml:7-10` (TopicAPI), `components.puml:19-28` (TopicComponent) |
| **localização_código** | `topic.py:169` (endpoint `list_keyphrase_clusters()`) |
| **detalhes** | O arquivo `topic.py` possui `// @model:` apenas para a Sprint 02 (pairwise-similarity-fix), visível no retorno do método `list_clusters()` — `# @model: specs/002-pairwise-similarity-fix/model/classes.puml`. No entanto, não há `@model:` annotation para os diagramas da Sprint 03 T007. O endpoint `list_keyphrase_clusters()` não está coberto por nenhuma anotação de rastreabilidade. |

#### Depoimento do Arquiteto (ARG-S3T007-R1-003)
> O endpoint `list_keyphrase_clusters()` está modelado em `classes.puml:7-10` e `components.puml:19-28`, ambos com tag `@rf: RF-008`. A rota é o ponto de entrada HTTP para o algoritmo T007. A ausência de `@model:` neste endpoint é particularmente crítica porque a Sprint 02 já havia estabelecido o padrão de anotação em `topic.py` (no método `list_clusters()`), mas o método irmão `list_keyphrase_clusters()` ficou sem cobertura.

#### Depoimento do Developer (DEP-S3T007-R1-003)
> O método `list_keyphrase_clusters()` em `topic.py:169` não foi modificado pelo T007. Ele já existia na base de código e já implementava a lógica de validação, conversão de parâmetros e delegação para `AnnotationController.get_keyphrase_clustering()`. A alteração do RF-008 ocorreu exclusivamente no model (`cluster.py`), não na API layer. A presença de `@model:` annotation no método `list_clusters()` (Sprint 02) mas não em `list_keyphrase_clusters()` reflete que cada sprint anotou apenas o que modificou diretamente.

---

### EVD-S3T007-R1-004 — METODO_EXTRAS {#evd-r1-004}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `METODO_EXTRAS` |
| **severidade** | MÉDIA |
| **RF Associado** | — |
| **descrição** | O método `get_keyphrase_similarity_with_clusters(keyphrase)` existe em `cluster.py` (linha ~330) na classe `KeyphraseClustering`, mas **não** está modelado em `classes.puml`. Este método calcula a similaridade de uma keyphrase com todos os clusters e é usado internamente por `to_list()` (linha 412) para popular a coluna `cluster_most_similar` usada na ordenação `CLUSTER_SIMILARITY`. Embora não seja diretamente o algoritmo T007, faz parte do ecossistema de `to_list()` que alimenta o fluxo de pairwise_similarity. |
| **localização_modelo** | Não consta (ausente do modelo) |
| **localização_código** | `cluster.py:~330` |
| **detalhes** | O método é público (`def get_keyphrase_similarity_with_clusters(self, keyphrase: Keyphrase)`) e retorna uma `list[tuple]` ordenada por similaridade descendente. É chamado por `to_list()` para cada keyphrase, e seu resultado aparece na coluna 4 do array de rows (`cluster_most_similar`) e coluna 5 (`cluster_similarity`). Estes dados são usados pelo branch `CLUSTER_SIMILARITY` de `get_keyphrase_descriptions()`, não pelo branch `PAIRWISE_SIMILARITY` que contém o algoritmo T007. |

#### Depoimento do Arquiteto (ARG-S3T007-R1-004)
> O modelo da Sprint 03 T007 tem escopo limitado ao algoritmo de pares recíprocos (RF-008). O método `get_keyphrase_similarity_with_clusters()` é anterior à sprint e não faz parte do fluxo `PAIRWISE_SIMILARITY` — ele serve ao branch `CLUSTER_SIMILARITY`. Portanto, sua ausência no modelo é esperada: o modelo cobre apenas o escopo do RF-008. Como Arquiteto, entendo que este método não deveria gerar evidência de inconsistência.

#### Depoimento do Developer (DEP-S3T007-R1-004)
> `get_keyphrase_similarity_with_clusters()` é um método preexistente, não modificado pelo T007. Ele aparece no método `to_list()` como fonte dos dados de `cluster_most_similar` (coluna 4) e `cluster_similarity` (coluna 5), que são colunas auxiliares na matriz de dados. O algoritmo T007 opera exclusivamente sobre as colunas 0-3 (`id`, `content`, `best_pair_id`, `similarity`). Se o Arquiteto desejar modelá-lo em sprints futuras, concordo — mas não faz parte do RF-008.

---

### EVD-S3T007-R1-005 — METODO_EXTRAS {#evd-r1-005}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `METODO_EXTRAS` |
| **severidade** | MÉDIA |
| **RF Associado** | — |
| **descrição** | Os métodos `get_pairwise_cluster_similarity()` (linha ~368) e `get_cluster_similarity_matrix()` (linha ~350) existem em `cluster.py` na classe `KeyphraseClustering`, mas **não** estão modelados em `classes.puml`. Estes métodos são usados pelo branch `PAIRWISE_SIMILARITY` de `get_clusters()` (para ordenação de clusters, não de keyphrases), e estão no mesmo arquivo que o algoritmo T007. |
| **localização_modelo** | Não constam (ausentes do modelo) |
| **localização_código** | `cluster.py:~350` (get_cluster_similarity_matrix), `cluster.py:~368` (get_pairwise_cluster_similarity) |
| **detalhes** | `get_cluster_similarity_matrix()` constrói uma matriz N×N de similaridade entre clusters. `get_pairwise_cluster_similarity()` usa `PairwiseSimilarity` para encontrar pares de clusters similares e retorna um dict associando cada cluster ao seu mais similar. Estes métodos são chamados pelo branch `PAIRWISE_SIMILARITY` de `get_clusters()` (método irmão de `get_keyphrase_descriptions()`, focado em clusters). Não participam do fluxo T007. |

#### Depoimento do Arquiteto (ARG-S3T007-R1-005)
> Estes métodos pertencem ao ecossistema de `get_clusters()` (cluster sorting), não de `get_keyphrase_descriptions()` (keyphrase sorting). São operações sobre a matriz de similaridade entre clusters, implementadas em sprints anteriores. O modelo da Sprint 03 T007 cobre exclusivamente o algoritmo de pares recíprocos em `get_keyphrase_descriptions()`. Métodos de cluster similarity matrix não estão no escopo e não deveriam gerar evidência.

#### Depoimento do Developer (DEP-S3T007-R1-005)
> `get_cluster_similarity_matrix()` e `get_pairwise_cluster_similarity()` são métodos preexistentes, não modificados pelo T007. Eles operam no domínio de *cluster similarity* (similaridade entre clusters), enquanto o T007 opera no domínio de *keyphrase pairwise similarity* (similaridade entre pares de keyphrases). Embora ambos estejam em `cluster.py`, são funcionalmente independentes — o T007 não os chama e não depende deles.

---

## Notas Adicionais

### Evidências Verificadas e Consideradas Consistentes

Os seguintes elementos foram verificados e **confirmados como consistentes** entre modelo e código:

| Elemento | Modelo | Código | Status |
|----------|--------|--------|--------|
| `get_keyphrase_descriptions(PAIRWISE_SIMILARITY)` — Etapa 1: temp_list | `classes.puml:76-80` + `sequence.puml:72-87` | `cluster.py:478-487` | ✅ `temp_list.append((_id, description, keyphrase[2], keyphrase[3]))` |
| `get_keyphrase_descriptions(PAIRWISE_SIMILARITY)` — Etapa 2: id_to_data | `classes.puml:83-87` + `sequence.puml:96` | `cluster.py:490` | ✅ `id_to_data = {item[0]: item for item in temp_list}` |
| `get_keyphrase_descriptions(PAIRWISE_SIMILARITY)` — Etapa 2: visited | `classes.puml:89-93` + `sequence.puml:97` | `cluster.py:491` | ✅ `visited = set()` |
| `get_keyphrase_descriptions(PAIRWISE_SIMILARITY)` — Etapa 2: grouped_list | `classes.puml:95-99` + `sequence.puml:98` | `cluster.py:492` | ✅ `grouped_list = []` |
| Verificação `best_data[2] == kid` | `classes.puml:102` + `sequence.puml:116-121` + `components.puml:120` | `cluster.py:500` | ✅ `if best_data[2] == kid:  # recíproco!` |
| `get_keyphrase_descriptions(PAIRWISE_SIMILARITY)` — Etapa 3: dict | `classes.puml:104-106` + `sequence.puml:142` | `cluster.py:513` | ✅ `{item[0]: item[1] for item in grouped_list}` |
| `get_keyphrase_list(sort_by)` → `to_list(sort_column=3, reverse=True)` | `classes.puml:46` | `cluster.py:452-455` | ✅ `keyphrase_list = self.to_list(sort_column=3, reverse=True)` |
| `KeyphraseSorting.PAIRWISE_SIMILARITY` | `classes.puml:39` | `keyphrase.py:171` | ✅ `PAIRWISE_SIMILARITY = 'pairwise_similarity'` |
| `list_keyphrase_clusters()` endpoint | `classes.puml:8` | `topic.py:169` | ✅ `async def list_keyphrase_clusters(...)` |
| `AnnotationController.get_keyphrase_clustering(sort_by)` → dict | `classes.puml:26` | `annotation.py:35` | ✅ Chama `cluster_annotation.get_keyphrase_descriptions(sort_by)` |
| `Keyphrase.get_description(suffix)` | `classes.puml:63` | `keyphrase.py:25` | ✅ `def get_description(self, complement=None, show_id=True)` |
| Conversão dict→array em topic.py | `sequence.puml:156-157` | `topic.py:198-205` | ✅ `clusters_array = [] ... keyphrase_clustering = clusters_array` |

### Detalhe: Condição de Reciprocidade no Modelo vs Código

A condição central do RF-008 é a verificação de reciprocidade `best_data[2] == kid`. Segue a correspondência exata:

**Código** (`cluster.py:500`):
```python
if best_data[2] == kid:  # B's best_pair == A
```

**Modelo** (`classes.puml:102`):
```
best_data[2] == kid
```

**Modelo** (`sequence.puml:116-121`):
```
alt best_data[2] == kid (RECÍPROCO!)
  grouped_list.append(A)
  grouped_list.append(B)
```

**Modelo** (`components.puml:120`):
```
best_data[2] == A[0]
```

✅ **Consistente** — a condição é a mesma em todos os artefatos.

### Padrão Observado: Comportamento Diferente entre get_clusters e get_keyphrase_descriptions

O `cluster.py` possui duas famílias de métodos de ordenação com nomes similares:

| Método | Propósito | Modificado pelo T007? |
|--------|-----------|:---------------------:|
| `get_clusters(sort_by)` | Ordena **objetos Cluster** por coesão/similaridade | ❌ Não (T004/T005) |
| `get_keyphrase_descriptions(sort_by)` | Ordena **descrições de keyphrases** | ✅ Sim (T007 — algoritmo de pares) |
| `get_keyphrase_list(sort_by)` | Lista ordenada para processamento interno | ❌ Não (usado pelo T007) |
| `to_list(header, sort_column, reverse)` | Matriz base de keyphrases | ❌ Não (usado pelo T007) |

É importante notar que `get_clusters()` e `get_keyphrase_descriptions()` são métodos diferentes na mesma classe, com propósitos diferentes (clusters vs keyphrases), mas com nomes que podem causar confusão. O modelo `classes.puml` lista ambos.

---

## Referências

- **Modelo (classes.puml):** `relatorios/sprint3-t007/model/classes.puml`
- **Modelo (sequence.puml):** `relatorios/sprint3-t007/model/sequence.puml`
- **Modelo (components.puml):** `relatorios/sprint3-t007/model/components.puml`
- **Código (cluster.py):** `kpc-backend/src/keyphrase_curation/model/cluster.py`
- **Código (annotation.py):** `kpc-backend/src/keyphrase_curation/controller/annotation.py`
- **Código (topic.py):** `kpc-backend/src/keyphrase_curation/api/topic.py`
- **Código (keyphrase.py):** `kpc-backend/src/keyphrase_curation/model/keyphrase.py`
- **Log experimental:** `relatorios/sprint3-t007/log-copilot-sprint3-t007.md`