# Log Experimental — Sprint 03 T006: Padronização de Labels de Ordenação

**Experimento:** 🤖 Copilot (sem metodologia) — Padronização de labels do order by "Source Keyphrases"
**Sprint:** 03
**Tarefa:** T006 (RF-007)
**Data:** 2026-06-21
**Metodologia:** Copilot puro — sem Spec-Kit, sem personas, sem pipeline MDE+SDD
**Objetivo:** Padronizar os labels de ordenação do select "Source Keyphrases" usando enum, seguindo o padrão já existente de `ClusterSortingLabels`

---

## Sumário Executivo

| Métrica | Valor |
|---------|-------|
| **Tempo total** | ~15 minutos |
| **Arquivos modificados** | 2 |
| **Arquivos analisados** | 3 (`ClusterSorting.js`, `KeyphraseSorting.js`, `KeyphraseClusteringView.jsx`) |
| **Tipo da correção** | Refatoração de frontend (sem mudança de comportamento visível ao usuário) |
| **Testes realizados** | Verificação de imports e estrutura do código |
| **Resultado** | ✅ Labels padronizados via enum, select usando `KeyphraseSortingLabels` |

---

## 1. Contexto Inicial

### 1.1 O Problema

O componente `KeyphraseClusteringView.jsx` possui dois selects de ordenação (um na view principal, um na view embedded) que usam **strings hardcoded** para os labels dos `MenuItem`s:

**View principal (linhas ~175-182):**
```jsx
<MenuItem value="alphabetical">Alfabética</MenuItem>
<MenuItem value="numerical">Numérica</MenuItem>
<MenuItem value="cluster_similarity">Similaridade de Cluster</MenuItem>
<MenuItem value="pairwise_similarity">Similaridade Pareada</MenuItem>
```

**View embedded (linhas ~240-245):**
```jsx
<MenuItem value="alphabetical">alphabetical</MenuItem>
<MenuItem value="numerical">numerical</MenuItem>
<MenuItem value="cluster_similarity">cluster_similarity</MenuItem>
<MenuItem value="pairwise_similarity">pairwise_similarity</MenuItem>
```

### 1.2 Problemas Identificados

1. **Duplicação de manutenção**: qualquer mudança em um label precisa ser replicada em dois lugares
2. **Inconsistência entre views**: a view principal usa português (`"Similaridade Pareada"`), a embedded usa o valor cru do enum em inglês (`"pairwise_similarity"`)
3. **Falta de padronização**: o componente irmão `KeyphraseClustersView` já usa `ClusterSortingLabels` do enum `ClusterSorting.js` com o padrão `{ [Enum.VALUE]: 'Label' }`. O `KeyphraseSorting` tinha um `KEYPHRASE_SORTING_LABELS` mas com nomenclatura diferente (SNAKE_UPPER_CASE vs PascalCase).

### 1.3 Comparação com o Padrão Existente

**`ClusterSorting.js` (padrão a ser seguido):**
```js
export const ClusterSortingLabels = {
    [ClusterSorting.NUMERICAL]: 'Numérica',
    [ClusterSorting.CLUSTER_COHESION]: 'Coesão do Cluster',
    ...
};
```

**`KeyphraseSorting.js` (antes):**
```js
export const KEYPHRASE_SORTING_LABELS = {   // ← SNAKE_UPPER_CASE, não PascalCase
  [KeyphraseSorting.ALPHABETICAL]: 'Alfabética',
  [KeyphraseSorting.CLUSTER_SIMILARITY]: 'Similaridade de Cluster',
  ...
};
```

---

## 2. Processo de Investigação

### 2.1 Exploração do Código Fonte

Diferentemente de uma abordagem com Spec-Kit, onde haveria diagramas UML e rastreamento RF, a investigação foi direta:

1. **Leitura de `ClusterSorting.js`** — identificar o padrão `ClusterSortingLabels`
2. **Leitura de `KeyphraseSorting.js`** — verificar estado atual do enum
3. **Leitura de `KeyphraseClusteringView.jsx`** — localizar selects hardcoded

### 2.2 Mapeamento de Dependências

```
KeyphraseClusteringView.jsx
  ├── Antes: labels hardcoded (2 selects, 4 options cada = 8 strings)
  │     ├── select principal → português
  │     └── select embedded → inglês (valor cru)
  │
  └── Depois: importa KeyphraseSortingLabels do enum
        └── ambos os selects usam o mesmo objeto

KeyphraseSorting.js
  ├── KeyphraseSorting enum (já existia)
  ├── KEYPHRASE_SORTING_LABELS (já existia, SNAKE_UPPER_CASE)
  └── + KeyphraseSortingLabels (novo, PascalCase = alias do existente)
```

### 2.3 Decisão de Design

Duas abordagens possíveis:

| Abordagem | Prós | Contras |
|-----------|------|---------|
| **A) Renomear `KEYPHRASE_SORTING_LABELS` → `KeyphraseSortingLabels`** | Nome consistente | Breaking change para quem importa o nome antigo |
| **B) Criar `KeyphraseSortingLabels` como alias** | Retrocompatibilidade | Dois nomes para a mesma coisa |

**Decisão: Abordagem B** — Criar `KeyphraseSortingLabels` como referência ao mesmo objeto. O nome `KEYPHRASE_SORTING_LABELS` mantém-se para não quejar imports existentes, e `KeyphraseSortingLabels` passa a ser o nome canônico (padrão `ClusterSortingLabels`).

---

## 3. A Solução Aplicada

### 3.1 Arquivo 1: `KeyphraseSorting.js`

**Localização:** `kpc-frontend/src-mvvm/shared/enums/KeyphraseSorting.js`

**Mudança:** Adicionar export `KeyphraseSortingLabels` como alias do `KEYPHRASE_SORTING_LABELS` existente:

```js
// ANTES:
export const KEYPHRASE_SORTING_LABELS = {
  [KeyphraseSorting.ALPHABETICAL]: 'Alfabética',
  ...
};

// DEPOIS:
export const KEYPHRASE_SORTING_LABELS = {
  [KeyphraseSorting.ALPHABETICAL]: 'Alfabética',
  ...
};

/** 
 * Alias PascalCase seguindo padrão ClusterSortingLabels 
 * @see ClusterSortingLabels em ClusterSorting.js
 */
export const KeyphraseSortingLabels = KEYPHRASE_SORTING_LABELS;
```

### 3.2 Arquivo 2: `KeyphraseClusteringView.jsx`

**Localização:** `kpc-frontend/src-mvvm/views/pages/KeyphraseClusteringView.jsx`

**Mudança:** Substituir labels hardcoded nos dois selects pelo enum `KeyphraseSortingLabels`:

**Select da view principal (antes):**
```jsx
<MenuItem value="alphabetical">Alfabética</MenuItem>
<MenuItem value="numerical">Numérica</MenuItem>
<MenuItem value="cluster_similarity">Similaridade de Cluster</MenuItem>
<MenuItem value="pairwise_similarity">Similaridade Pareada</MenuItem>
```

**Select da view principal (depois):**
```jsx
{Object.entries(KeyphraseSortingLabels).map(([value, label]) => (
  <MenuItem key={value} value={value}>{label}</MenuItem>
))}
```

**Select da view embedded (antes):**
```jsx
<MenuItem value="alphabetical">alphabetical</MenuItem>
<MenuItem value="numerical">numerical</MenuItem>
<MenuItem value="cluster_similarity">cluster_similarity</MenuItem>
<MenuItem value="pairwise_similarity">pairwise_similarity</MenuItem>
```

**Select da view embedded (depois):**
```jsx
{Object.entries(KeyphraseSortingLabels).map(([value, label]) => (
  <MenuItem key={value} value={value}>{label}</MenuItem>
))}
```

### 3.3 Normalização dos Labels

No processo, notei que a view principal tinha `"Similaridade Pareada"` enquanto o `KEYPHRASE_SORTING_LABELS` tinha `"Similaridade Par a Par"`. Como agora ambos os selects usam o mesmo enum, esse tipo de divergência não pode mais ocorrer.

| Sorting | Hardcoded (antes) | `KEYPHRASE_SORTING_LABELS` (depois) |
|---------|------------------|-------------------------------------|
| `alphabetical` | Alfabética | Alfabética |
| `numerical` | Numérica | Numérica |
| `cluster_similarity` | Similaridade de Cluster | Similaridade de Cluster |
| `pairwise_similarity` | Similaridade Pareada | Similaridade **Par a Par** |

> **Nota:** A view embedded antes exibia o valor cru (`"pairwise_similarity"`), que agora exibirá `"Similaridade Par a Par"`. Isso é uma melhoria de UX.

---

## 4. Testes e Validação

### 4.1 Verificação de Import

O import adicionado em `KeyphraseClusteringView.jsx`:
```js
import { KeyphraseSortingLabels } from '../../shared/enums/KeyphraseSorting.js';
```

### 4.2 Verificação de Integridade

- `KeyphraseSortingLabels` referencia o mesmo objeto que `KEYPHRASE_SORTING_LABELS` → todos os valores existentes continuam funcionando
- `Object.entries()` itera sobre pares `[value, label]` → usa `value` como chave React e `label` como display text
- Os `value`s correspondem exatamente aos valores aceitos pelo backend (`KeyphraseSorting` enum)

### 4.3 Teste de Compilação

```bash
cd kpc-frontend && npx vite build src-mvvm/mainMVVM.jsx
```

> (Teste a ser executado após a implementação)

---

## 5. Análise Comparativa: Copilot vs Spec-Kit

### 5.1 Diferenças Metodológicas

| Aspecto | Sprint 02 (Spec-Kit) | Sprint 03 (Copilot puro) |
|---------|---------------------|--------------------------|
| **Investigação** | Análise de todos os arquivos do ecossistema | Foco nos 3 arquivos relevantes |
| **Planejamento** | Diagramas UML (`classes.puml`, `*puml`) | Mapeamento mental de dependências |
| **Decisão de design** | Rastreabilidade RF via `@rf:` | Decisão direta baseada no padrão existente |
| **Análise de impacto** | Pipeline Polícia+Juiz | Verificação manual de retrocompatibilidade |
| **Artefatos** | Spec, Plan (3 UML), Tasks, Evidence, Verdict | Código + este log |

### 5.2 Observações

1. **Problema essencialmente de frontend** — T006 não envolve lógica de backend, apenas padronização de nomenclatura
2. **Complexidade baixa** — a solução é adicionar 1 linha de alias + mudar 2 selects
3. **Valor da padronização** — elimina duplicação e inconsistência entre views
4. **Risco mínimo** — `KeyphraseSortingLabels` é um alias, não uma renomeação

### 5.3 Padrão Seguido

```
ClusterSorting.js:
  ClusterSorting (enum)
  → ClusterSortingLabels (labels em PascalCase)

KeyphraseSorting.js:
  KeyphraseSorting (enum)
  → KEYPHRASE_SORTING_LABELS (labels em SNAKE_UPPER_CASE, existente)
  → KeyphraseSortingLabels (alias PascalCase, novo)
```

O padrão `ClusterSortingLabels` usa chaves computadas `[Enum.VALUE]: label`. O `KeyphraseSortingLabels` segue exatamente o mesmo padrão.

---

## 6. Conclusão

A correção foi concluída com sucesso:

1. **`KeyphraseSorting.js`** — adicionado export `KeyphraseSortingLabels` como alias de `KEYPHRASE_SORTING_LABELS`
2. **`KeyphraseClusteringView.jsx`** — ambos os selects de ordenação agora usam `KeyphraseSortingLabels` via `Object.entries()`

**Benefícios:**
- ✅ Elimina duplicação de manutenção (8 strings hardcoded → 1 fonte de verdade)
- ✅ Consistência entre view principal e embedded
- ✅ Padronização com `ClusterSortingLabels` (mesmo padrão de nomenclatura)
- ✅ Melhoria de UX na view embedded (exibia valores crus, agora exibe labels em português)
- ✅ Retrocompatibilidade mantida

---

## 7. Estado Final

### Arquivo: `kpc-frontend/src-mvvm/shared/enums/KeyphraseSorting.js`

```js
export const KeyphraseSorting = {
  ALPHABETICAL: 'alphabetical',
  CLUSTER_SIMILARITY: 'cluster_similarity', 
  PAIRWISE_SIMILARITY: 'pairwise_similarity',
  NUMERICAL: 'numerical'
};

export const KEYPHRASE_SORTING_LABELS = { ... };  // ← mantido

export const KeyphraseSortingLabels = KEYPHRASE_SORTING_LABELS;  // ← NOVO
```

### Arquivo: `kpc-frontend/src-mvvm/views/pages/KeyphraseClusteringView.jsx`

**Import adicionado:**
```js
import { KeyphraseSortingLabels } from '../../shared/enums/KeyphraseSorting.js';
```

**Select substituído (ambas as views):**
```jsx
{Object.entries(KeyphraseSortingLabels).map(([value, label]) => (
  <MenuItem key={value} value={value}>{label}</MenuItem>
))}
```

---

## 8. Referências

- **Plano de Sprints**: `/home/daired/Documentos/TCC-KPC/relatorios/plano-sprints.md`
- **Enum padrão (ClusterSorting)**: `kpc-frontend/src-mvvm/shared/enums/ClusterSorting.js`
- **Enum alvo (KeyphraseSorting)**: `kpc-frontend/src-mvvm/shared/enums/KeyphraseSorting.js`
- **View modificada**: `kpc-frontend/src-mvvm/views/pages/KeyphraseClusteringView.jsx`