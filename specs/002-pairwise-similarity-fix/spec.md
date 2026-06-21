# Feature Specification: Pairwise Similarity Serialization Fix

**Feature Branch**: `002-pairwise-similarity-fix`

**Created**: 2026-06-20

**Status**: Draft — Correções R1 → R2

**Input**: Sprint 02 do experimento KPC. Correção de bug no backend (`kpc-backend/`) — endpoint `GET /topic/clusters/{username}/{topic}/{cluster_order}` com `cluster_order=pairwise_similarity` retorna 500 por falha de serialização de tipos numpy.

---

## Correções da Rodada 1 (Pós-Veredito)

**Data**: 2026-06-20
**Rodada Anterior**: R1 (encerrada em 2026-06-20)
**Veredito de Referência**: `verdict/verdict.md` — 1 evidência AMBOS (Developer + Arquiteto), 1 evidência AE (Arquiteto)
**Natureza**: Correção de alcance do `NumpyConverter.to_native()` — aplicação incompleta no retorno da API

### Problema

O `NumpyConverter.to_native()` foi aplicado APENAS em `clusters_meta_info` (conforme modelo original), mas o campo `clusters` do retorno também contém valores numpy propagados via `cluster_data`, `cluster_selection` e `keyphrases_selection`. O log do servidor confirma que `PydanticSerializationError: numpy.int64` AINDA OCORRE após a correção original. O Juiz decidiu AMBOS (Developer + Arquiteto) para a correção incompleta e AE (Arquiteto) para o modelo insuficiente.

### Evidências

| ID | Tipo | Decisão | Descrição |
|----|------|---------|-----------|
| EVD-002-R1-001 | CORRECAO_INCOMPLETA | **AMBOS** | `NumpyConverter` aplicado apenas em `clusters_meta_info`, mas `clusters` também contém numpy |
| EVD-002-R1-002 | MODELO_INSUFICIENTE | **AE** | Modelo `sequence.puml` especifica conversão apenas em `clusters_meta_info`, não em toda a estrutura de retorno |

### Resumo das Correções

| RF | Descrição | Decisão | Prioridade |
|----|-----------|---------|------------|
| RF-003-C1 | Aplicar `NumpyConverter.to_native()` em **todo o dicionário de retorno** do endpoint — não apenas em `clusters_meta_info`. A conversão deve cobrir a estrutura completa: `return {"sorting_applied": ..., "clusters": ..., "clusters_meta_info": ...}`. | AMBOS | P1 (crítico) |
| RF-003-C2 | Atualizar diagrama de sequência `sequence.puml` para mostrar conversão aplicada em todo o dicionário de retorno, não apenas em `clusters_meta_info`. Adicionar `@rf: RF-003-C1` na etapa de conversão. | AE | P1 |

> **Nota:** RFs originais (RF-003 a RF-007) permanecem inalterados. Esta atualização adiciona apenas RFs de correção com sufixo `-C`.

---

## Análise da Causa Raiz

O pipeline de dados que gera o erro é:

```
util/pairwise_similarity.py:get_pairwise_similarity()
  ↓ retorna Lista[List[int|float]] onde int são numpy.int64, float são numpy.float64
model/cluster.py:get_pairwise_cluster_similarity()
  ↓ propaga numpy.int64/float64 → dict com keys int64, values float64
model/cluster.py:get_clusters()
  ↓ insere dict em clusters_meta_info
controller/annotation.py:get_clusters()
  ↓ lê clusters_meta_info, adiciona average_cohesion
api/topic.py:list_clusters()
  ↓ retorna {"clusters": ..., "clusters_meta_info": ...} ← AQUI FALHA (PydanticSerializationError)
```

**Rota real afetada**: `api/topic.py:214` — `@router.get("/clusters/{username}/{topic}/{cluster_order}")` — **não** é uma rota `/pairwise_similarity` dedicada. O parâmetro `cluster_order` recebe o valor `pairwise_similarity` e o endpoint monta `clusters_meta_info` com valores numpy vindos de `get_pairwise_cluster_similarity()`.

**Ponto exato de conversão necessária**: `model/cluster.py:332-348` — método `get_pairwise_cluster_similarity()`. Os valores `pair[0]+1`, `pair[1]+1` (numpy.int64) e `pair[2]` (numpy.float64) precisam ser convertidos para `int()` e `float()` nativos.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visualização de clusters por Pairwise Similarity (Priority: P1)

O usuário, após selecionar um tópico na tela de seleção, acessa a tela de clusters e escolhe a ordenação por "Pairwise Similarity". O frontend faz uma requisição ao endpoint `GET /topic/clusters/{username}/{topic}/pairwise_similarity` (que mapeia para a rota `/clusters/{username}/{topic}/{cluster_order}` com `cluster_order=pairwise_similarity`). Atualmente o backend retorna 500 com `PydanticSerializationError`, impedindo a visualização. Após a correção, o usuário deve ver os clusters ordenados por similaridade pairwise sem erro.

**Why this priority**: P1 — O erro 500 bloqueia completamente o uso da ordenação "Pairwise Similarity", que é uma das opções principais de visualização de clusters. Sem ela, o usuário perde funcionalidade essencial da tela de clusters.

**Independent Test**: Pode ser testado chamando o endpoint diretamente via `curl http://localhost:3132/topic/clusters/daired/cloning/pairwise_similarity` e verificando retorno HTTP 200 com JSON válido.

**Acceptance Scenarios**:

1. **Given** um usuário autenticado com dados de clustering disponíveis, **When** o endpoint `GET /topic/clusters/{username}/{topic}/pairwise_similarity` é chamado, **Then** retorna HTTP 200 com corpo JSON válido e sem erros de serialização.
2. **Given** a resposta JSON do endpoint, **When** o corpo é inspecionado com `json.loads()`, **Then** todos os valores numéricos são tipos Python nativos (`int`, `float`) — nenhum valor é do tipo `numpy.int64`, `numpy.float32` ou `numpy.float64`.
3. **Given** o frontend de clusters carregado, **When** o usuário seleciona a ordenação "Pairwise Similarity", **Then** os clusters são exibidos corretamente sem erro no console do navegador.

---

### User Story 2 — Outras ordenações continuam funcionando (Priority: P2)

As demais ordenações de clusters (NUMERICAL, CLUSTER_COHESION, CENTROID_SIMILARITY) devem continuar funcionando normalmente após a correção, sem serem afetadas pelas alterações.

**Why this priority**: P2 — Embora não seja o alvo da correção, é essencial garantir que a correção não introduza regressões. A confiança no sistema como um todo depende de que as funcionalidades existentes permaneçam intactas.

**Independent Test**: Pode ser testado chamando o endpoint com outros parâmetros de ordenação e verificando que mantêm o comportamento esperado.

**Acceptance Scenarios**:

1. **Given** a correção aplicada, **When** o endpoint é chamado com `cluster_order = "numerical"`, **Then** retorna HTTP 200 com a estrutura de resposta idêntica ao comportamento anterior.
2. **Given** a correção aplicada, **When** o endpoint é chamado com `cluster_order = "cluster_cohesion"`, **Then** retorna HTTP 200 com JSON válido.
3. **Given** a correção aplicada, **When** o endpoint é chamado com `cluster_order = "centroid_similarity"`, **Then** retorna HTTP 200 com JSON válido.

---

### User Story 3 — Correção de alcance do NumpyConverter pós-veredito (Priority: P1)

Após a Rodada 1 do pipeline de verificação, o Juiz identificou que o `NumpyConverter.to_native()` foi aplicado apenas em `clusters_meta_info`, mas `clusters` também contém valores numpy propagados via `cluster_data`, `cluster_selection` e `keyphrases_selection`. O endpoint ainda retorna HTTP 500. O Developer precisa aplicar a conversão em todo o dicionário de retorno, e o Arquiteto precisa atualizar o modelo para refletir o escopo correto.

**Why this priority**: P1 — O endpoint AINDA retorna 500 após a correção original. Sem esta correção, o GATE-03 (SC-001) continua falhando e o merge é bloqueado.

**Independent Test**: Pode ser testado chamando `curl http://localhost:3132/topic/clusters/daired/cloning/pairwise_similarity` e verificando HTTP 200 + JSON sem tipos numpy.

**Acceptance Scenarios**:

1. **Given** o endpoint `list_clusters()` em `api/topic.py`, **When** o `NumpyConverter.to_native()` é aplicado a todo o dicionário de retorno (RF-003-C1), **Then** o `PydanticSerializationError` não ocorre mais.
2. **Given** o código corrigido, **When** `curl http://localhost:3132/topic/clusters/daired/cloning/pairwise_similarity` é chamado, **Then** retorna HTTP 200 com JSON contendo apenas tipos nativos Python em TODOS os campos (`sorting_applied`, `clusters`, `clusters_meta_info`).
3. **Given** o modelo `sequence.puml` (RF-003-C2), **When** a etapa de conversão é atualizada para `to_native(result)` ou `to_native(clusters) + to_native(clusters_meta_info)`, **Then** o diagrama reflete o escopo completo da correção.

---

### Edge Cases

- O endpoint é chamado sem dados de clustering disponíveis (tópico vazio ou sem clusters) — deve retornar 200 com lista/clusters vazios.
- A matriz de similaridade contém apenas valores `-inf` (todos os elementos resetados) — `numpy.argmax` e `numpy.unravel_index` podem retornar `(0, 0)`; o tratamento em `get_max_pair_similarity` já lida com este caso retornando `None`, e a resposta final não deve conter valores numpy.
- Cenário em que há elementos não pareados (apenas 1 elemento restante) — o código atual trata este caso com `row = [id, -1, 0]` onde `id` é `numpy.int64` da iteração anterior. A correção precisa garantir que este `id` seja convertido para `int` nativo.
- API chamada com token inválido ou expirado — deve retornar 403 (comportamento existente, não alterado).
- **Correção (RF-003-C1)**: Se `NumpyConverter.to_native()` for aplicado a todo o dicionário de retorno, a conversão deve funcionar mesmo se `clusters` ou `clusters_meta_info` estiverem vazios.
- **Correção (RF-003-C2)**: O modelo `sequence.puml` deve refletir o escopo completo — não deve mostrar conversão apenas em `clusters_meta_info`.

## Requirements *(mandatory)*

### Functional Requirements

- **RF-003**: O endpoint `GET /topic/clusters/{username}/{topic}/{cluster_order}` (rota em `api/topic.py:214`) DEVE retornar HTTP 200 com JSON válido quando `cluster_order=pairwise_similarity`, sem erros de serialização.
- **RF-004**: Todos os valores do tipo `numpy.int64`, `numpy.float32` e `numpy.float64` DEVEM ser convertidos para seus equivalentes Python nativos (`int`, `float`) antes da serialização JSON. A conversão DEVE ocorrer no método `get_pairwise_cluster_similarity()` em `model/cluster.py:332-348`, onde os valores `pair[0]+1`, `pair[1]+1` e `pair[2]` são inseridos no dicionário de resultado.
- **RF-005**: A estrutura do JSON de resposta (`{"clusters": ..., "clusters_meta_info": ...}`) DEVE permanecer idêntica — o contrato da API não DEVE ser alterado, apenas os tipos internos dos valores são convertidos.
- **RF-006**: A correção DEVE ser aplicada exclusivamente no backend (`kpc-backend/src/keyphrase_curation/`). Nenhuma alteração no frontend (`kpc-frontend/`) é necessária.
- **RF-007**: As demais ordenações de clusters (NUMERICAL, CLUSTER_COHESION, CENTROID_SIMILARITY) NÃO DEVEM ser afetadas pela correção — DEVEM continuar retornando HTTP 200 com JSON válido.

### RFs de Correção (Rodada 1 → Rodada 2)

Estes requisitos são correções determinadas pelo Juiz no veredito da Rodada 1.

- **RF-003-C1** (P1 — Correção incompleta): O sistema DEVE aplicar `NumpyConverter.to_native()` em **todo o dicionário de retorno** do endpoint `list_clusters()` em `api/topic.py`, não apenas em `clusters_meta_info`. A conversão DEVE cobrir a estrutura completa do `return` (campos `sorting_applied`, `clusters` e `clusters_meta_info`). A abordagem recomendada é aplicar `NumpyConverter.to_native()` diretamente no dicionário de retorno. *Origem: EVD-002-R1-001 (AMBOS).*
- **RF-003-C2** (P1 — Modelo insuficiente): O sistema (Arquiteto) DEVE atualizar o diagrama de sequência `sequence.puml` para mostrar a conversão aplicada em toda a estrutura de retorno, não apenas em `clusters_meta_info`. A etapa de conversão DEVE ser renomeada para refletir o escopo completo (`to_native(result)` ou `to_native(clusters) + to_native(clusters_meta_info)`), com tag `@rf: RF-003-C1`. *Origem: EVD-002-R1-002 (AE).*

### Key Entities *(include if feature involves data)*

- **ClusterMetaInfo**: Dicionário que armazena metadados sobre pares de clusters. Para pairwise similarity, contém `similar_cluster` (ID do cluster similar — deve ser `int` nativo) e `similarity` (valor de similaridade — deve ser `float` nativo). Originado em `get_pairwise_cluster_similarity()` em `model/cluster.py`.
- **PairwiseSimilarity**: Serviço utilitário em `util/pairwise_similarity.py` que calcula pares de similaridade a partir de uma matriz. Método `get_pairwise_similarity()` retorna lista de tripletos `[elemento_a, elemento_b, similaridade]`. Os valores de `elemento_a`, `elemento_b` e `similaridade` são tipos numpy (`numpy.int64`, `numpy.float64`) e precisam de conversão.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O endpoint `GET /topic/clusters/{username}/{topic}/pairwise_similarity` retorna HTTP 200 com JSON válido em 100% das chamadas com dados válidos.
- **SC-002**: 0 erros de `PydanticSerializationError` ou `TypeError` relacionados a tipos numpy no backend após a correção.
- **SC-003**: O JSON de resposta, quando processado por `json.loads()`, contém apenas tipos nativos Python (`int`, `float`, `str`, `list`, `dict`, `bool`, `None`).
- **SC-004**: As outras 3 ordenações de clusters permanecem funcionais — nenhuma regressão é introduzida.
- **SC-005**: Nenhuma alteração no frontend é necessária — a aplicação continua funcionando sem modificações no lado cliente.
- **SC-006** (Correção R1→R2): O endpoint retorna HTTP 200 com JSON válido APÓS aplicar `NumpyConverter.to_native()` em todo o dicionário de retorno.
- **SC-007** (Correção R1→R2): GATE-03 (SC-001) transiciona de FALHOU para APROVADO após RF-003-C1.

## Assumptions

- A raiz do problema está nos valores `numpy.int64` e `numpy.float64` gerados em `util/pairwise_similarity.py:69-99` (`get_pairwise_similarity()`) que propagam via `model/cluster.py:332-348` (`get_pairwise_cluster_similarity()`) até o retorno da API.
- A rota real afetada é `api/topic.py:214` (`/clusters/{username}/{topic}/{cluster_order}`) com `cluster_order=pairwise_similarity` — não uma rota `/pairwise_similarity` dedicada.
- O `clusters_meta_info` retornado por `get_clusters()` em `model/cluster.py` é incluído diretamente na resposta JSON da API (`"clusters_meta_info": clusters_meta_info`), o que expõe os valores numpy à serialização.
- **Ponto de correção recomendado**: aplicar `NumpyConverter.to_native()` no dicionário completo de retorno em `api/topic.py`. Esta abordagem cobre todos os campos de uma vez.
- O backend utiliza Python com NumPy, FastAPI e Pydantic.
- Os arquivos em `view/` (ipywidgets) não fazem parte da API REST e não precisam de alteração.
- **Correções**: O `NumpyConverter` já existe em `util/json_encoder.py` e suporta conversão recursiva de dicts, lists, tuples, sets — aplicar no `return` inteiro é suficiente e não exige novas implementações.