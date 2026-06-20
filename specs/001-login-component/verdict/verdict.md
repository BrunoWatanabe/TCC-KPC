# Veredicto — Login Component

**Feature:** 001-login-component
**Total de Rodadas:** 1

---

## 🔵 Rodada Atual: R1

**Data:** 2026-06-19
**Rodadas Anteriores:** Nenhuma (rodada inicial)

### Sumário da Rodada

| Métrica | Valor |
|---------|-------|
| Total Evidências Julgadas | 6 |
| DE (Developer Errado) | 6 |
| AE (Arquiteto Errado) | 0 |
| AMBOS | 0 |
| NE (Ninguém Errado) | 0 |
| Evidências RESOLVIDAS | — |
| Gates Aprovados | 1 |
| Gates Negados | 1 |

### Árvore de Veredictos

| Rodada Anterior | Decisão Ant. | Status | Rodada Atual | Decisão Atual |
|----------------|--------------|--------|--------------|---------------|
| — | — | 🆕 NOVA | VER-001-R1-001 | DE |
| — | — | 🆕 NOVA | VER-001-R1-002 | DE |
| — | — | 🆕 NOVA | VER-001-R1-003 | DE |
| — | — | 🆕 NOVA | VER-001-R1-004 | DE |
| — | — | 🆕 NOVA | VER-001-R1-005 | DE |
| — | — | 🆕 NOVA | VER-001-R1-006 | DE |

---

## Rodada 1: R1

**Data:** 2026-06-19

### VER-001-R1-001 — Julgamento de EVD-001-R1-001

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **Evidência** | EVD-001-R1-001 — TAG_MODEL_AUSENTE |
| **Status Evidência** | NOVA |
| **RF Associado** | RF-001, RF-005 |
| **Depoimento Arquiteto** | ARG-001-R1-001 |
| **Depoimento Developer** | DEP-001-R1-001 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
O modelo (`login-classes.puml:117`) define corretamente Config com `@rf:`. A CONST-R3 exige `// @model:` em todo arquivo. O Arquiteto confirma modelo correto. Developer reconhece omissão.

**Sentença:** Developer deve adicionar `// @model: specs/001-login-component/model/login-classes.puml` no topo de `shared/config.js`.

---

### VER-001-R1-002 — Julgamento de EVD-001-R1-002

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **Evidência** | EVD-001-R1-002 — NOME_HOOK_DIVERGENTE |
| **Status Evidência** | NOVA |
| **RF Associado** | RF-001 |
| **Depoimento Arquiteto** | ARG-001-R1-002 |
| **Depoimento Developer** | DEP-001-R1-002 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
Modelo nomeia `useAuth` consistentemente em 3 diagramas. CONST-R2 exige fidelidade ao modelo. Developer reconhece divergência.

**Sentença:** Developer renomear para `useAuth` OU solicitar atualização do modelo. Ambos devem estar alinhados.

---

### VER-001-R1-003 — Julgamento de EVD-001-R1-003

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **Evidência** | EVD-001-R1-003 — OVER_ENGINEERING_ENTITY_USER |
| **Status Evidência** | NOVA |
| **RF Associado** | RF-001, RF-006 |
| **Depoimento Arquiteto** | ARG-001-R1-003 |
| **Depoimento Developer** | DEP-001-R1-003 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
Modelo específica 2 atributos + 1 método. Código tem 5+ atributos e 13+ métodos. CONST-R2 NON-NEGOTIABLE violada. Funcionalidades de sprints futuras não devem ser implementadas sem modelo.

**Sentença:** Developer refatorar `User.js` para APENAS `username`, `token`, `fromApiResponse()`. Demais métodos remover ou branch separada.

---

### VER-001-R1-004 — Julgamento de EVD-001-R1-004

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **Evidência** | EVD-001-R1-004 — OVER_ENGINEERING_AUTH_SERVICE |
| **Status Evidência** | NOVA |
| **RF Associado** | RF-001, RF-005 |
| **Depoimento Arquiteto** | ARG-001-R1-004 |
| **Depoimento Developer** | DEP-001-R1-004 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
Modelo especifica apenas `login()`. Código tem 17 métodos. CONST-R2 violada.

**Sentença:** Developer refatorar `AuthService.js` para expor APENAS `login()` como método público. Remover ou mover `basicLogin`, `logout`, `whoami`, `listUsers` etc.

---

### VER-001-R1-005 — Julgamento de EVD-001-R1-005

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **Evidência** | EVD-001-R1-005 — OVER_ENGINEERING_USE_AUTH_STORE |
| **Status Evidência** | NOVA |
| **RF Associado** | RF-001, RF-006 |
| **Depoimento Arquiteto** | ARG-001-R1-005 |
| **Depoimento Developer** | DEP-001-R1-005 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
Modelo especifica 3 ações. Código tem 13. Getters não modelados violam CONST-R2.

**Sentença:** Developer remover ações não modeladas (`updateUser`, `canAccessTopic`, `isAdmin`, etc.) do store.

---

### VER-001-R1-006 — Julgamento de EVD-001-R1-006

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **Evidência** | EVD-001-R1-006 — BUG_MAX_ROWS_TEXFIELD |
| **Status Evidência** | NOVA |
| **RF Associado** | RF-001 |
| **Depoimento Arquiteto** | ARG-001-R1-006 |
| **Depoimento Developer** | DEP-001-R1-006 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
`ReferenceError` de `maxRows` no `TextField.jsx`. Bug exclusivo do código, independente do modelo. Developer reconhece.

**Sentença:** Developer adicionar `maxRows` à desestruturação de props (com valor padrão) ou remover referência.

---

### Ações Corretivas Recomendadas

| Prioridade | Ação | Responsável |
|-----------|------|-------------|
| 🔴 Alta | Corrigir ReferenceError `maxRows` | Developer |
| 🔴 Alta | Refatorar `User.js` — escopo mínimo | Developer |
| 🔴 Alta | Refatorar `AuthService.js` — só `login()` | Developer |
| 🟡 Média | Remover ações não modeladas do store | Developer |
| 🟡 Média | Adicionar `// @model:` em config.js | Developer |
| 🟢 Baixa | Alinhar nomenclatura hook (ou modelo) | Developer + Arquiteto |

---

### Gates da Constituição

| Gate | Status |
|------|--------|
| GATE-01 — Planejamento Obrigatório | ✅ APROVADO |
| GATE-03 — Over-engineering Bloqueia Merge | ❌ NEGADO (3 over-engineering) |