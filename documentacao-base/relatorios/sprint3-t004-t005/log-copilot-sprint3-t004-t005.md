# Log Experimental — Sprint 03 T004: Correção de Ordenação de Clusters

**Experimento:** 🤖 Copilot (sem metodologia) — Correção de ordenação via chat direto
**Sprint:** 03
**Tarefa:** T004 (RF-005) + T005 (RF-006)
**Data:** 2026-06-21
**Metodologia:** Copilot puro — sem Spec-Kit, sem personas, sem pipeline MDE+SDD
**Objetivo:** Testar a produtividade e qualidade do Copilot agindo livremente, sem amarras metodológicas

---

## Sumário Executivo

| Métrica | Valor |
|---------|-------|
| **Tempo total** | ~25 minutos |
| **Arquivos modificados** | 1 (`model/cluster.py`) |
| **Linhas alteradas** | 2 (troca de `reverse=False` → `reverse=True` em 2 locais) |
| **Endpoints corrigidos** | 2 (`cluster_cohesion` + `centroid_similarity`) |
| **Testes realizados** | Sim — `curl` com validação de ordenação descendente |
| **Resultado** | ✅ Ambos os endpoints retornando ordem descendente (maior → menor) |

---

## 1. Contexto Inicial

### 1.1 O Problema

Os endpoints `GET /topic/clusters/{username}/{topic}/cluster_cohesion` e `GET /topic/clusters/{username}/{topic}/centroid_similarity` estavam retornando os clusters ordenados do **menor para o maior valor** (ordem ascendente). O comportamento desejado é **do maior para o menor** (ordem descendente), pois:
- Clusters com maior coesão são mais interessantes para curadoria
- Clusters com maior similaridade ao centróide são mais coerentes
- O frontend espera os "melhores" clusters primeiro

### 1.2 Causa Raiz

No método `get_clusters()` da classe `KeyphraseClustering` em `model/cluster.py`, as constantes de ordenação `reverse=False` nos `sorted()` estavam configuradas para ascendente:

```python
# cluster_cohesion (ANTES - ascendente)
clusters = list(sorted(
    self.clusters.values(),
    key=lambda x: x.get_cohesion(), reverse=False))

# centroid_similarity (ANTES - ascendente)
clusters = list(sorted(
    self.clusters.values(),
    key=lambda x: clusters_meta_info[x.id]['average_similarity_from_centroid'],
    reverse=False))
```

### 1.3 Impacto

- Frontend recebia clusters menos relevantes primeiro
- UX prejudicada: usuário precisava scrollar até o final para ver os clusters mais coesos
- Comportamento inconsistente com `pairwise_similarity` (que já usava `reverse=True` corretamente)

---

## 2. Processo de Investigação

### 2.1 Exploração do Código

Diferentemente do pipeline Spec-Kit (Sprint 02), onde há um `/speckit.plan` com diagramas UML e rastreamento RF → modelo, nesta Sprint o processo foi direto:

1. **Leitura do arquivo `model/cluster.py`** — localizar o método `get_clusters()` e as constantes de ordenação
2. **Leitura do arquivo `api/topic.py`** — confirmar como os endpoints `cluster_cohesion` e `centroid_similarity` chamam `get_clusters()`
3. **Leitura do `ClusterSorting` enum** — confirmar os valores `CLUSTER_COHESION` e `CENTROID_SIMILARITY`

### 2.2 Árvore de Chamadas

```
api/topic.py: list_clusters()
  └── AnnotationController.get_clusters(sorting)
       └── cluster_annotation.get_clusters(sort_by)
            ├── ClusterSorting.CLUSTER_COHESION → sorted(..., reverse=False) ❌
            └── ClusterSorting.CENTROID_SIMILARITY → sorted(..., reverse=False) ❌
```

Note que `pairwise_similarity` já estava correto com `reverse=True`. A inconsistência ocorreu porque `cluster_cohesion` e `centroid_similarity` foram implementados com o mesmo padrão (`reverse=False`) sem considerar a semântica desejada.

### 2.3 Raciocínio da Solução

Era um problema trivial de engenharia de software: inverter o parâmetro `reverse` de `False` para `True` em duas chamadas de `sorted()`.

- **cluster_cohesion**: ordena por `x.get_cohesion()` → valor numérico de coesão do cluster. `reverse=True` coloca os mais coesos primeiro.
- **centroid_similarity**: ordena por `average_similarity_from_centroid` → similaridade média ao centróide. `reverse=True` coloca os mais similares primeiro.

---

## 3. A Solução Aplicada

### 3.1 Arquivo Modificado

**`/home/daired/Documentos/TCC-KPC/kpc-backend/src/keyphrase_curation/model/cluster.py`**

### 3.2 Mudança 1 — cluster_cohesion (linha ~387)

**Antes:**
```python
elif sort_by.name == ClusterSorting.CLUSTER_COHESION.name:
    clusters = list(sorted(
        self.clusters.values(),
        key=lambda x: x.get_cohesion(), reverse=False))
```

**Depois:**
```python
elif sort_by.name == ClusterSorting.CLUSTER_COHESION.name:
    # Sprint 03 — T004: Corrigir ordenação ascendente → descendente
    # Antes: reverse=False (coesão mais baixa → mais alta)
    # Depois: reverse=True  (coesão mais alta → mais baixa)
    clusters = list(sorted(
        self.clusters.values(),
        key=lambda x: x.get_cohesion(), reverse=True))
```

### 3.3 Mudança 2 — centroid_similarity (linha ~410)

**Antes:**
```python
elif sort_by.name == ClusterSorting.CENTROID_SIMILARITY.name:
    clusters_meta_info = self.get_cluster_centrality_scores()
    clusters = list(sorted(
        self.clusters.values(),
        key=lambda x:
        clusters_meta_info[x.id]['average_similarity_from_centroid'],
        reverse=False))
```

**Depois:**
```python
elif sort_by.name == ClusterSorting.CENTROID_SIMILARITY.name:
    # Sprint 03 — T005: Corrigir ordenação ascendente → descendente
    # Antes: reverse=False (similaridade mais baixa → mais alta)
    # Depois: reverse=True  (similaridade mais alta → mais baixa)
    clusters_meta_info = self.get_cluster_centrality_scores()
    clusters = list(sorted(
        self.clusters.values(),
        key=lambda x:
        clusters_meta_info[x.id]['average_similarity_from_centroid'],
        reverse=True))
```

### 3.3.1 Por que T005 foi incluído junto com T004?

Embora o plano de sprints divida RF-005 (T004) e RF-006 (T005) como tarefas separadas, a correção de ambos ocorreu no mesmo arquivo (`model/cluster.py`) com o mesmo padrão de erro (`reverse=False`). Como a Sprint 03 é um experimento de "Copilot sem metodologia", não há rigidez de pipeline — a correção conjunta é mais eficiente e consistente.

---

## 4. Testes e Validação

### 4.1 Ciclo de Teste

1. **Parar backend**: `lsof -ti :3132 | xargs kill -9`
2. **Reiniciar backend**: `cd kpc-backend && PYTHONPATH="$PWD/src" venv/bin/python run.py &`
3. **Autenticar**: `POST /users/login` com `username=daired&password=sCQA5dUe`
4. **Testar T004**: `GET /topic/clusters/daired/cloning/cluster_cohesion`
5. **Testar T005**: `GET /topic/clusters/daired/cloning/centroid_similarity`

### 4.2 Resultado — cluster_cohesion (T004)

```
Sorting applied: cluster_cohesion
Valores de coesao: [1.0, 1.0, 1.0, 0.92, 0.75, 0.61, 0.49, 0.26, 0.1, 0.0, ...]
ORDEM DESCENDENTE (maior -> menor)? ✅ True
```

### 4.3 Resultado — centroid_similarity (T005)

```
Sorting applied: centroid_similarity
Valores de average_similarity: [1.0, 1.0, 1.0, 0.92, 0.75, 0.74, 0.66, 0.47, 0.1, 0.0, ...]
ORDEM DESCENDENTE (maior -> menor)? ✅ True
```

### 4.4 Verificação Visual (cluster_cohesion)

| Posição | Cluster | Coesão | Keyphrases |
|---------|---------|--------|------------|
| 1º | Cluster 5 | 1.00 | genetic(137), genetic(94) |
| 2º | Cluster 4 | 1.00 | cell_research(134) |
| 3º | Cluster 12 | 1.00 | Reproductive technology(2) |
| 4º | Cluster 33 | 0.92 | cloneing(63), cloning(103) |
| 5º | Cluster 10 | 0.75 | Conservation of endangered species(17), Species preservation(8) |
| ... | ... | ... | ... |
| 33º | Cluster 32 | 0.00 | (vazio) |

---

## 5. Análise Comparativa: Copilot vs Spec-Kit

### 5.1 Diferenças Metodológicas

| Aspecto | Sprint 02 (Spec-Kit) | Sprint 03 (Copilot puro) |
|---------|---------------------|--------------------------|
| **Planejamento** | `/speckit.plan` com diagramas UML (classes.puml, sequence.puml, components.puml) | Nenhum — análise direta do código |
| **Especificação** | `/speckit.specify` gera `spec.md` com RFs numerados | RFs definidos no plano de sprints |
| **Rastreabilidade** | `// @model:` annotations ligando código ao modelo UML | Nenhuma |
| **Tarefas** | `/speckit.tasks` gera `tasks.md` com dependências | Tarefas definidas no plano de sprints |
| **Implementação** | `/speckit.implement` (persona Developer) | Edição manual via chat |
| **Análise** | `/speckit.analyze` (Polícia + Juiz) com evidências e veredito | Nenhuma |
| **Over-engineering** | GATE-03 verifica código mínimo necessário | Sem verificação formal |

### 5.2 Observações sobre Produtividade

| Métrica | Sprint 02 (Spec-Kit) | Sprint 03 (Copilot puro) |
|---------|---------------------|--------------------------|
| **Tempo planejado** | ~4h | ~4h |
| **Tempo real** | Multiplas rodadas de análise | ~25 min |
| **Artefatos gerados** | Spec, Plan (3 UML), Tasks, Código, Evidence, Verdict | Código + este log |
| **Qualidade** | Validada por 2 personas (Polícia + Juiz) | Validada por teste curl |
| **Contexto necessário** | Pipeline completo com múltiplos arquivos | 1 arquivo (`cluster.py`) |

### 5.3 Complexidade do Problema

É importante notar que a Sprint 03 resolveu um problema **significativamente mais simples** que a Sprint 02:
- **Sprint 02**: Serialização numpy → exigiu criação de `NumpyConverter.to_native()` em novo arquivo `json_encoder.py`, modificação em `api/topic.py`, 3 diagramas UML
- **Sprint 03**: Troca de `reverse=False` → `reverse=True` em 2 linhas, 1 arquivo

A diferença de complexidade favorece o Copilot puro neste caso, mas esconde que problemas mais complexos (como a serialização numpy) podem se beneficiar mais do pipeline Spec-Kit.

### 5.4 Riscos Não Endereçados

Diferentemente do Spec-Kit, o Copilot puro **não** realizou:
- **Análise de impacto**: verificar se outros endpoints ou o frontend dependem da ordem ascendente
- **Consistência entre sortings**: verificar se todos os `ClusterSorting` usam a mesma convenção
- **Testes de regressão**: garantir que `numerical`, `pairwise_similarity` não foram afetados
- **Rastreabilidade**: não há ligação entre o código e um requisito formal

---

## 6. Estado Final dos ClusterSortings

| Sorting | reverse | Ordem | Status |
|---------|---------|-------|--------|
| `NUMERICAL` | N/A (list direta) | Por ID do cluster | ✅ OK (não foi alterado) |
| `CLUSTER_COHESION` | `reverse=True` | Maior coesão → menor | ✅ Corrigido (era `False`) |
| `PAIRWISE_SIMILARITY` | `reverse=True` | Maior similaridade → menor | ✅ OK (já estava correto) |
| `CENTROID_SIMILARITY` | `reverse=True` | Maior avg similarity → menor | ✅ Corrigido (era `False`) |

---

## 7. Conclusão

A correção foi bem-sucedida. Ambos os endpoints agora retornam clusters em ordem descendente (maior → menor valor), consistente com o comportamento esperado e com o endpoint `pairwise_similarity`.

O experimento demonstra que, para problemas pontuais e bem delimitados (troca de parâmetro em 2 linhas), o Copilot puro é extremamente eficiente — ~25 minutos vs. múltiplas horas do pipeline Spec-Kit. No entanto, para problemas que exigem análise de impacto, validação cruzada ou rastreabilidade de requisitos, o Spec-Kit oferece salvaguardas que o Copilot puro não possui.

---

## 8. Referências

- **Plano de Sprints**: `/home/daired/Documentos/TCC-KPC/relatorios/plano-sprints.md`
- **Código fonte**: `/home/daired/Documentos/TCC-KPC/kpc-backend/src/keyphrase_curation/model/cluster.py`
- **API topic**: `/home/daired/Documentos/TCC-KPC/kpc-backend/src/keyphrase_curation/api/topic.py`
- **Sprint 02 (Spec-Kit)**: `specs/002-pairwise-similarity-fix/`
