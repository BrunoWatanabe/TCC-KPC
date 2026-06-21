# Relatório de Evidências — Sprint 03 T006

**Feature:** S3T006
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
| — | 🆕 NOVA | EVD-S3T006-R1-001 |
| — | 🆕 NOVA | EVD-S3T006-R1-002 |
| — | 🆕 NOVA | EVD-S3T006-R1-003 |
| — | 🆕 NOVA | EVD-S3T006-R1-004 |
| — | 🆕 NOVA | EVD-S3T006-R1-005 |

### Verificação Prévia: Itens SEM Evidências

Os seguintes itens da checklist foram verificados e **não apresentam inconsistências**:

| Checklist | Resultado |
|-----------|-----------|
| CHK-CLASS-01: Classes/componentes modelados existem no código | ✅ Todos presentes |
| CHK-CLASS-02: Componentes modelados têm pasta/arquivo | ✅ Todos presentes |
| CHK-CLASS-03: Componentes no código sem modelo | ✅ Nenhum não modelado detectado |
| CHK-METH-01: Funções modeladas existem no código | ✅ Todas presentes |
| CHK-METH-02: Assinaturas compatíveis | ✅ Compatíveis |
| CHK-ATTR-01: Props modeladas existem no código | ✅ Todas as 13 props (`KeyphraseClusteringViewProps`) presentes |
| CHK-ATTR-02: Valores do enum correspondem | ✅ 4 valores idênticos entre modelo e código |
| CHK-SEQ-01: Fluxo renderização selects | ✅ `Object.entries(KeyphraseSortingLabels).map()` em ambos os selects |
| CHK-SEQ-02: Fluxo interação do usuário | ✅ `onKeyphraseOrderChange(e.target.value)` — valor do enum passado |
| CHK-SEQ-03: Ordem das chamadas no diagrama | ✅ Import → Object.entries → map → MenuItem |
| CHK-RF-01: RF-007 associado a KeyphraseSortingLabels | ✅ Tags `@rf: RF-007` presentes nos 3 diagramas |
| CHK-RF-02: Tags @rf: nos locais corretos | ✅ `classes.puml`, `components.puml`, `sequence.puml` com RF-007 |
| CHK-OVER-01: isValidKeyphraseSorting, getDefaultKeyphraseSorting, KEYPHRASE_SORTING_TYPES | ✅ Modelados como classes separadas no `.puml` (dentro do escopo) |

### Evidências da Rodada

---

### EVD-S3T006-R1-001 — TAG_MODEL_AUSENTE {#evd-r1-001}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `TAG_MODEL_AUSENTE` |
| **severidade** | BAIXA |
| **RF Associado** | RF-007 |
| **descrição** | O arquivo `shared/enums/KeyphraseSorting.js` não possui anotação `// @model:` referenciando os diagramas PlantUML da Sprint 03 T006. O export `KeyphraseSortingLabels` (criado no T006) não tem rastreabilidade reversa para o modelo. |
| **localização_modelo** | `classes.puml:39-46` (Labels), `components.puml:62-75` (KeyphraseSortingEnum) |
| **localização_código** | `KeyphraseSorting.js:1` (topo do arquivo) |
| **detalhes** | A persona Developer (R3 — Rastreabilidade Reversa) exige `// @model: <path>` em todo arquivo de código. O arquivo `KeyphraseSorting.js` não possui nenhuma anotação `@model:`. Isto se aplica tanto ao item novo (`KeyphraseSortingLabels`, linha 71) quanto aos itens preexistentes (`KeyphraseSorting`, `KEYPHRASE_SORTING_LABELS`, `KEYPHRASE_SORTING_TYPES`, `isValidKeyphraseSorting`, `getDefaultKeyphraseSorting`). |

#### Depoimento do Arquiteto (ARG-S3T006-R1-001)
> O modelo em `classes.puml` define `KeyphraseSortingLabels` como alias PascalCase, seguindo o padrão `ClusterSortingLabels`, tudo rastreado a RF-007 via `@rf:`. Como Arquiteto, espero que o código contenha `// @model:` annotations apontando para o diagrama que modelei. O arquivo `KeyphraseSorting.js` inteiro está sem rastreabilidade reversa, incluindo o novo export `KeyphraseSortingLabels` que é o core do RF-007. Isso quebra a cadeia de rastreabilidade que o pipeline Spec-Kit exige.

#### Depoimento do Developer (DEP-S3T006-R1-001)
> O código em `KeyphraseSorting.js` foi implementado pelo Copilot em modo livre (sem metodologia Spec-Kit), conforme documentado em `log-copilot-sprint3-t006.md`. Como não havia a exigência de `@model:` annotations no fluxo adotado (experimento Copilot puro), essas anotações não foram geradas. Reconheço que, no pipeline Spec-Kit, elas deveriam estar presentes. A ausência é consequência da metodologia experimental, não um erro de implementação.

---

### EVD-S3T006-R1-002 — TAG_MODEL_AUSENTE {#evd-r1-002}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `TAG_MODEL_AUSENTE` |
| **severidade** | BAIXA |
| **RF Associado** | RF-007 |
| **descrição** | O arquivo `views/pages/KeyphraseClusteringView.jsx` não possui anotação `// @model:` referenciando os diagramas PlantUML da Sprint 03 T006. O componente `KeyphraseClusteringView` utiliza `KeyphraseSortingLabels` em ambos os selects de ordenação (view principal e embedded), mas não há rastreabilidade reversa. |
| **localização_modelo** | `classes.puml:7-30` (KeyphraseClusteringView), `sequence.puml` (fluxo completo) |
| **localização_código** | `KeyphraseClusteringView.jsx:1` (topo do arquivo) |
| **detalhes** | O import de `KeyphraseSortingLabels` está presente na linha 24 do JSX, mas não há comentário `// @model:` associando o componente ao modelo. Todos os 13 props do componente correspondem exatamente ao modelado em `KeyphraseClusteringViewProps`, mas sem a annotation de rastreabilidade. |

#### Depoimento do Arquiteto (ARG-S3T006-R1-002)
> O componente `KeyphraseClusteringView` e suas props estão detalhadamente modelados em `classes.puml:7-30`. O diagrama de sequência `sequence.puml` mostra o fluxo completo de renderização dos selects com `KeyphraseSortingLabels`. A implementação em JSX segue fielmente o modelo — ambos os selects usam `Object.entries(KeyphraseSortingLabels).map(...)`. No entanto, a ausência de `// @model:` annotations quebra a rastreabilidade reversa necessária para que futuras manutenções do código localizem o diagrama correspondente.

#### Depoimento do Developer (DEP-S3T006-R1-002)
> O componente `KeyphraseClusteringView.jsx` foi modificado pelo Copilot em modo experimental, sem o pipeline Spec-Kit. As alterações foram mínimas e cirúrgicas: substituição das 8 linhas de `MenuItem` hardcoded (4 na view principal + 4 na embedded) por 2 blocos de `Object.entries(KeyphraseSortingLabels).map(...)`. Como não houve geração de `@model:` annotations no fluxo experimental, elas estão ausentes. A implementação em si está correta e consistente com o modelo.

---

### EVD-S3T006-R1-003 — TAG_MODEL_AUSENTE {#evd-r1-003}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `TAG_MODEL_AUSENTE` |
| **severidade** | BAIXA |
| **RF Associado** | RF-007 |
| **descrição** | O arquivo `models/business/KeyphraseSortingModel.js` não possui anotação `// @model:` referenciando os diagramas PlantUML da Sprint 03 T006. A classe `KeyphraseSortingModel` é referenciada no modelo, mas o código não tem rastreabilidade reversa. |
| **localização_modelo** | `classes.puml:71-76` (KeyphraseSortingModel), `components.puml:46-59` (SortingModel) |
| **localização_código** | `KeyphraseSortingModel.js:1` (topo do arquivo) |
| **detalhes** | `KeyphraseSortingModel` importa `KeyphraseSorting` e `KEYPHRASE_SORTING_TYPES` do enum, e é referenciado pelo diagrama de componentes como parte da camada Model/Business. Não foi modificado diretamente pelo T006 (a alteração foi apenas no enum), mas ainda carece de `@model:` annotation. |

#### Depoimento do Arquiteto (ARG-S3T006-R1-003)
> O modelo `classes.puml` inclui `KeyphraseSortingModel` como parte da camada de domínio, e `components.puml` o posiciona na camada Model/Business Layer. Embora este arquivo não tenha sido modificado pelo T006, ele faz parte do ecossistema modelado. A ausência de `@model:` annotation é uma falha de rastreabilidade que se aplica a todo o código do workspace, não apenas aos arquivos modificados na sprint.

#### Depoimento do Developer (DEP-S3T006-R1-003)
> `KeyphraseSortingModel.js` não foi modificado pelo T006. A alteração do RF-007 foi estritamente em `KeyphraseSorting.js` (adição do alias) e `KeyphraseClusteringView.jsx` (substituição dos selects). Se a política exige `@model:` em TODOS os arquivos do ecossistema, esta é uma dívida técnica preexistente, não introduzida pela sprint.

---

### EVD-S3T006-R1-004 — METODO_EXTRAS {#evd-r1-004}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `METODO_EXTRAS` |
| **severidade** | MÉDIA |
| **RF Associado** | — |
| **descrição** | O método `loadAllSortings()` existe em `KeyphraseSortingModel.js` (linha 51), mas **não** está modelado em `classes.puml`. Este método privado carrega todas as 4 ordenações em paralelo usando `Promise.all` e `topicService.listKeyphraseClusters`. |
| **localização_modelo** | Não consta (ausente do modelo) |
| **localização_código** | `KeyphraseSortingModel.js:51` |
| **detalhes** | O modelo lista apenas `initialize(username, topicName): Promise` e `getKeyphrasesBySorting(sortingType): array`. O método `#loadAllSortings()` (privado, chamado internamente por `initialize()`) não está representado. A assinatura é `async loadAllSortings()`, retorna `Promise<void>`, e itera sobre `KEYPHRASE_SORTING_TYPES` fazendo requisições HTTP paralelas. |

#### Depoimento do Arquiteto (ARG-S3T006-R1-004)
> O modelo `classes.puml:71-76` especifica `KeyphraseSortingModel` com `initialize()` e `getKeyphrasesBySorting()` apenas. O método `loadAllSortings()` é um detalhe de implementação que não está representado. Como Arquiteto, entendo que o método poderia ser modelado como operação privada, mas sua ausência não invalida o modelo — o comportamento público (`initialize()` carregar dados) está correto. A decisão de modelar ou não métodos privados é uma escolha de granularidade do modelo.

#### Depoimento do Developer (DEP-S3T006-R1-004)
> `loadAllSortings()` é um método auxiliar privado que implementa o carregamento paralelo prometido por `initialize()`. Ele não faz parte da interface pública da classe e foi implementado como detalhe interno de orquestração. O fato de não estar modelado não afeta a correção ou a usabilidade da classe. Se o Arquiteto desejar incluí-lo no modelo para completude, posso adicioná-lo — mas considero que métodos privados de implementação não precisam necessariamente constar do modelo.

---

### EVD-S3T006-R1-005 — ATRIBUTO_EXTRAS {#evd-r1-005}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | `ATRIBUTO_EXTRAS` |
| **severidade** | MÉDIA |
| **RF Associado** | — |
| **descrição** | A classe `KeyphraseSortingModel` possui dois atributos no código que **não** estão modelados em `classes.puml`: `lastUpdated` (Date) e `loadingProgress` (objeto com flags booleanas para cada tipo de ordenação). |
| **localização_modelo** | Não consta (ausente do modelo) |
| **localização_código** | `KeyphraseSortingModel.js:16-26` |
| **detalhes** | O modelo lista os atributos `sortedKeyphrases`, `username`, `topicName` e `isLoading`. No código existem adicionalmente: `this.lastUpdated = null` (timestamp da última atualização, linha 17) e `this.loadingProgress = { [KeyphraseSorting.ALPHABETICAL]: false, ... }` (controle de progresso individual por tipo, linhas 19-24). |

#### Depoimento do Arquiteto (ARG-S3T006-R1-005)
> O modelo `classes.puml` especifica os atributos essenciais de `KeyphraseSortingModel`. `lastUpdated` e `loadingProgress` são atributos de implementação que não estavam no escopo do modelo. Como Arquiteto, entendo que poderiam ser adicionados ao modelo para completude, mas sua ausência não invalida o comportamento modelado — `initialize()` ainda carrega dados e `getKeyphrasesBySorting()` ainda retorna arrays.

#### Depoimento do Developer (DEP-S3T006-R1-005)
> `lastUpdated` e `loadingProgress` são atributos de instrumentação implementados como parte da classe original, não introduzidos pelo T006. `lastUpdated` registra quando os dados foram carregados pela última vez (útil para cache). `loadingProgress` permite rastrear o progresso individual de cada uma das 4 ordenações carregadas em paralelo (útil para feedback de UI). Ambos são detalhes de implementação que não afetam o comportamento funcional modelado.

---

## Notas Adicionais

### Evidências Verificadas e Consideradas Consistentes

Os seguintes elementos foram verificados e **confirmados como consistentes** entre modelo e código:

| Elemento | Modelo | Código | Status |
|----------|--------|--------|--------|
| `KeyphraseSortingLabels` (alias) | `classes.puml:39-46` | `KeyphraseSorting.js:71` | ✅ `export const KeyphraseSortingLabels = KEYPHRASE_SORTING_LABELS` |
| `KeyphraseSorting` (4 valores) | `classes.puml:33-38` | `KeyphraseSorting.js:11-16` | ✅ `ALPHABETICAL`, `NUMERICAL`, `CLUSTER_SIMILARITY`, `PAIRWISE_SIMILARITY` |
| `KeyphraseClusteringView` props (13) | `classes.puml:19-31` | `KeyphraseClusteringView.jsx:27-44` | ✅ Todos os props presentes com nomes e tipos compatíveis |
| Select view principal | `classes.puml:14-18` | `KeyphraseClusteringView.jsx:169-178` | ✅ `Object.entries(KeyphraseSortingLabels).map(...)` |
| Select view embedded | `classes.puml:22-27` | `KeyphraseClusteringView.jsx:236-243` | ✅ Mesmo padrão `Object.entries(KeyphraseSortingLabels).map(...)` |
| `onKeyphraseOrderChange('cluster_similarity')` | `sequence.puml:83-85` | `KeyphraseClusteringView.jsx:173` | ✅ `onKeyphraseOrderChange(e.target.value)` |
| `ClusterSortingLabels` (padrão) | `classes.puml:56-62` | `ClusterSorting.js:8-14` | ✅ Mesmo padrão de chaves computadas |
| `KeyphraseSortingModel` | `classes.puml:71-76` | `KeyphraseSortingModel.js:10` | ✅ Classe exportada com constructor |
| `initialize(username, topicName)` | `classes.puml:74` | `KeyphraseSortingModel.js:35` | ✅ `async initialize(username, topicName)` |
| `getKeyphrasesBySorting(sortingType)` | `classes.puml:75` | `KeyphraseSortingModel.js:89` | ✅ Assinatura compatível |

### Itens Fora do Escopo (Não Reportados como Evidências)

Os seguintes itens foram considerados mas **não geraram evidências separadas** por serem cobertos pelo modelo ou por serem repetições do mesmo padrão:

- `KEYPHRASE_SORTING_TYPES`, `isValidKeyphraseSorting`, `getDefaultKeyphraseSorting` estão modelados como classes separadas em `classes.puml:48-54`. A representação como classes UML para funções/constantes é uma escolha de modelagem válida, não uma inconsistência.
- `renderKeyphrasesList()` e `renderContent()` estão modelados em `classes.puml:10-11` como métodos privados. Sua implementação detalhada (JSX interno) não precisa estar no modelo — apenas a existência e assinatura.
- `generateClusterOptions()` é um helper interno dentro de `renderKeyphrasesList()`, coberto pela modelagem do método pai.

---

## Referências

- **Modelo (classes.puml):** `relatorios/sprint3-t006/model/classes.puml`
- **Modelo (sequence.puml):** `relatorios/sprint3-t006/model/sequence.puml`
- **Modelo (components.puml):** `relatorios/sprint3-t006/model/components.puml`
- **Código (KeyphraseSorting.js):** `kpc-frontend/src-mvvm/shared/enums/KeyphraseSorting.js`
- **Código (KeyphraseClusteringView.jsx):** `kpc-frontend/src-mvvm/views/pages/KeyphraseClusteringView.jsx`
- **Código (KeyphraseSortingModel.js):** `kpc-frontend/src-mvvm/models/business/KeyphraseSortingModel.js`
- **Código (ClusterSorting.js):** `kpc-frontend/src-mvvm/shared/enums/ClusterSorting.js`
- **Log experimental:** `relatorios/sprint3-t006/log-copilot-sprint3-t006.md`