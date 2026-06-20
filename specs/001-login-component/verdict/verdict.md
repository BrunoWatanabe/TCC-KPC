# Veredicto — Login Component

**Feature:** 001-login-component
**Total de Rodadas:** 3

---

## 🔵 Rodada Atual: R3

**Data:** 2026-06-20
**Rodada Anterior:** R2

### Observação

Rodada 3 focou exclusivamente em correção de runtime (ST001.2) em **arquivos legados** de `src-mvvm/` que estavam **fora do escopo do modelo** da Sprint 01. Seis arquivos consumidores legados tiveram seus imports corrigidos (T-C9 a T-C15). Nenhum arquivo modelado foi alterado. Nenhuma evidência nova foi gerada. Nenhuma evidência anterior foi reaberta.

### Sumário da Rodada

| Métrica | Valor |
|---------|-------|
| Total Evidências Julgadas (novas) | 0 |
| Evidências RESOLVIDAS R1 | 6 (todas mantidas) |
| Evidências PERSISTEM | 0 |
| Evidências REABERTAS | 0 |
| DE (Developer Errado) | 0 |
| AE (Arquiteto Errado) | 0 |
| AMBOS | 0 |
| NE (Ninguém Errado) | N/A (sem novas evidências) |
| Gates Aprovados | 2 (GATE-01 ✅, GATE-03 ✅) |
| Gates Negados | 0 |

### Árvore de Veredictos (R3)

| Evidência R1 | Decisão R1 | Decisão R2 | Status R3 |
|--------------|------------|------------|-----------|
| EVD-001-R1-001 | DE | NE | ✅ AINDA RESOLVIDA |
| EVD-001-R1-002 | DE | NE | ✅ AINDA RESOLVIDA |
| EVD-001-R1-003 | DE | NE | ✅ AINDA RESOLVIDA |
| EVD-001-R1-004 | DE | NE | ✅ AINDA RESOLVIDA |
| EVD-001-R1-005 | DE | NE | ✅ AINDA RESOLVIDA |
| EVD-001-R1-006 | DE | NE | ✅ AINDA RESOLVIDA |

### Decisão Consolidada

Nenhuma evidência nova para julgar. A Rodada 3 foi uma correção de runtime sem impacto no alinhamento modelo-vs-código. Os 6 vereditos NE da Rodada 2 permanecem válidos. O GATE-03 permanece ✅ APROVADO.

**Sentença consolidada:** Nenhuma ação adicional necessária. O alinhamento modelo-código está preservado.

---

## 🔵 Rodada Atual: R2

**Data:** 2026-06-19
**Rodada Anterior:** R1

### Sumário da Rodada

| Métrica | Valor |
|---------|-------|
| Total Evidências Julgadas | 6 |
| Evidências RESOLVIDAS | 6 |
| Evidências PERSISTEM | 0 |
| DE (Developer Errado) | 0 |
| AE (Arquiteto Errado) | 0 |
| AMBOS | 0 |
| NE (Ninguém Errado) | 6 |
| Gates Aprovados | 2 |
| Gates Negados | 0 |

### Árvore de Veredictos

| Rodada Anterior | Decisão Ant. | Status | Rodada Atual | Decisão Atual |
|----------------|--------------|--------|--------------|---------------|
| VER-001-R1-001 | DE | ✅ RESOLVIDA | VER-001-R2-001 | NE |
| VER-001-R1-002 | DE | ✅ RESOLVIDA | VER-001-R2-002 | NE |
| VER-001-R1-003 | DE | ✅ RESOLVIDA | VER-001-R2-003 | NE |
| VER-001-R1-004 | DE | ✅ RESOLVIDA | VER-001-R2-004 | NE |
| VER-001-R1-005 | DE | ✅ RESOLVIDA | VER-001-R2-005 | NE |
| VER-001-R1-006 | DE | ✅ RESOLVIDA | VER-001-R2-006 | NE |

---

## 🔵 Rodada 1: R1

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

---

## 🔵 Rodada 2: R2

**Data:** 2026-06-19
**Rodada Anterior:** R1

### Sumário da Rodada

| Métrica | Valor |
|---------|-------|
| Total Evidências Julgadas | 6 |
| Evidências RESOLVIDAS | 6 |
| Evidências PERSISTEM | 0 |
| DE (Developer Errado) | 0 |
| AE (Arquiteto Errado) | 0 |
| AMBOS | 0 |
| NE (Ninguém Errado) | 6 |
| Gates Aprovados | 2 (GATE-01, GATE-03) |
| Gates Negados | 0 |

### Árvore de Veredictos (R2)

| Evidência R1 | Decisão R1 | Status | Veredicto R2 | Decisão R2 |
|--------------|------------|--------|--------------|------------|
| EVD-001-R1-001 | DE | ✅ RESOLVIDA | VER-001-R2-001 | NE |
| EVD-001-R1-002 | DE | ✅ RESOLVIDA | VER-001-R2-002 | NE |
| EVD-001-R1-003 | DE | ✅ RESOLVIDA | VER-001-R2-003 | NE |
| EVD-001-R1-004 | DE | ✅ RESOLVIDA | VER-001-R2-004 | NE |
| EVD-001-R1-005 | DE | ✅ RESOLVIDA | VER-001-R2-005 | NE |
| EVD-001-R1-006 | DE | ✅ RESOLVIDA | VER-001-R2-006 | NE |

---

### VER-001-R2-001 — Julgamento de EVD-001-R2-001

| Campo | Valor |
|-------|-------|
| **parent** | VER-001-R1-001 |
| **Evidência** | EVD-001-R2-001 — TAG_MODEL_AUSENTE |
| **Status Evidência** | RESOLVIDA |
| **RF Associado** | RF-001, RF-005 (RF-001-C4) |
| **Depoimento Arquiteto** | ARG-001-R2-001 |
| **Depoimento Developer** | DEP-001-R2-001 |

**Decisão:** `NE — Ninguém Errado`

**Fundamentação:**
A evidência EVD-001-R1-001 (tag ausente) foi verificado em R2. O código `shared/config.js:1` agora contém `// @model: specs/001-login-component/model/login-classes.puml` conforme exigido por CONST-R3 e RF-001-C4. O modelo (`login-classes.puml:117`) permanece inalterado e correto. Ambos os lados estão consistentes. O depoimento do Arquiteto (ARG-001-R2-001) confirma a correção. O Depoimento do Developer (DEP-001-R2-001) confirma que a tag foi adicionada.

**Sentença:** Nenhuma ação necessária. A correção foi aplicada com sucesso.

---

### VER-001-R2-002 — Julgamento de EVD-001-R2-002

| Campo | Valor |
|-------|-------|
| **parent** | VER-001-R1-002 |
| **Evidência** | EVD-001-R2-002 — NOME_HOOK_DIVERGENTE |
| **Status Evidência** | RESOLVIDA |
| **RF Associado** | RF-001 (RF-001-C6) |
| **Depoimento Arquiteto** | ARG-001-R2-002 |
| **Depoimento Developer** | DEP-001-R2-002 |

**Decisão:** `NE — Ninguém Errado`

**Fundamentação:**
A evidência EVD-001-R1-002 (nome divergente) foi verificado em R2. O hook foi renomeado de `useLoginViewModel` para `useAuth` — arquivo renomeado para `viewmodels/hooks/useAuth.js`, função exportada como `useAuth`, todos os imports em `AppMVVM.jsx` e `viewmodels/index.js` atualizados. O nome agora corresponde exatamente ao modelado em `login-classes.puml:64-72`. Não há referências remanescentes a `useLoginViewModel`. O depoimento do Arquiteto (ARG-001-R2-002) confirma alinhamento. Developer (DEP-001-R2-002) confirma correção.

**Sentença:** Nenhuma ação necessária. A correção foi aplicada com sucesso.

---

### VER-001-R2-003 — Julgamento de EVD-001-R2-003

| Campo | Valor |
|-------|-------|
| **parent** | VER-001-R1-003 |
| **Evidência** | EVD-001-R2-003 — OVER_ENGINEERING_ENTITY_USER |
| **Status Evidência** | RESOLVIDA |
| **RF Associado** | RF-001, RF-006 (RF-001-C1) |
| **Depoimento Arquiteto** | ARG-001-R2-003 |
| **Depoimento Developer** | DEP-001-R2-003 |

**Decisão:** `NE — Ninguém Errado`

**Fundamentação:**
A evidência EVD-001-R1-003 (over-engineering em User.js) foi verificada em R2. O arquivo `models/entities/User.js` foi refatorado para conter APENAS `constructor(username, token)`, atributos `username` e `token`, e método `fromApiResponse(username, accessToken)`. Todos os atributos extras (`attributions`) e métodos extras (`canAccessTopic`, `getAssignedTopics`, `isAdmin`, `toAuthHeaders`, `getAnnotationFiles`, `getAnnotationProfile`, `isValid`, `toJSON`, `fromJSON`) foram removidos. O código corresponde exatamente ao modelado em `login-classes.puml:105-109`. CONST-R2 restaurada.

**Sentença:** Nenhuma ação necessária. CONST-R2 restaurada para a entidade User.

---

### VER-001-R2-004 — Julgamento de EVD-001-R2-004

| Campo | Valor |
|-------|-------|
| **parent** | VER-001-R1-004 |
| **Evidência** | EVD-001-R2-004 — OVER_ENGINEERING_AUTH_SERVICE |
| **Status Evidência** | RESOLVIDA |
| **RF Associado** | RF-001, RF-005 (RF-001-C2) |
| **Depoimento Arquiteto** | ARG-001-R2-004 |
| **Depoimento Developer** | DEP-001-R2-004 |

**Decisão:** `NE — Ninguém Errado`

**Fundamentação:**
A evidência EVD-001-R1-004 (over-engineering em AuthService.js) foi verificada em R2. O arquivo `models/services/AuthService.js` foi refatorado para expor APENAS `login(username, password)` como método público. Os métodos `getCurrentToken()` e `makeRequest()` permanecem como privados (uso interno de `login()`), o que é aceitável pois não violam o contrato público modelado. Métodos removidos: `basicLogin`, `logout`, `whoami`, `validatePassword`, `listUsers`, `isAuthenticated`, `clearAuthentication`, `saveAuthenticationToken`, `getAuthenticatedUser`, `updateAuthenticatedUser`. Singleton `authService` removido. CONST-R2 restaurada.

**Sentença:** Nenhuma ação necessária. CONST-R2 restaurada para AuthService.

---

### VER-001-R2-005 — Julgamento de EVD-001-R2-005

| Campo | Valor |
|-------|-------|
| **parent** | VER-001-R1-005 |
| **Evidência** | EVD-001-R2-005 — OVER_ENGINEERING_USE_AUTH_STORE |
| **Status Evidência** | RESOLVIDA |
| **RF Associado** | RF-001, RF-006 (RF-001-C3) |
| **Depoimento Arquiteto** | ARG-001-R2-005 |
| **Depoimento Developer** | DEP-001-R2-005 |

**Decisão:** `NE — Ninguém Errado`

**Fundamentação:**
A evidência EVD-001-R1-005 (over-engineering em useAuthStore) foi verificada em R2. O store `useAuthStore.js` agora expõe APENAS as 3 ações modeladas: `login`, `logout`, `clearError`. As ações `updateUser`, `getCurrentUser`, `getToken`, `getIsAuthenticated`, `getCurrentUsername`, `canAccessTopic`, `isAdmin`, `getAuthHeaders`, `reset` foram removidas. A ação `initialize` foi mantida com documentação explícita (`@note`) explicando sua necessidade para `onRehydrateStorage` do Zustand, o que é aceitável como exceção documentada (conforme sentença do veredito R1). CONST-R2 restaurada.

**Sentença:** Nenhuma ação necessária. CONST-R2 restaurada para useAuthStore. Recomenda-se que o Arquiteto atualize o modelo para incluir `initialize` como ação interna.

---

### VER-001-R2-006 — Julgamento de EVD-001-R2-006

| Campo | Valor |
|-------|-------|
| **parent** | VER-001-R1-006 |
| **Evidência** | EVD-001-R2-006 — BUG_MAX_ROWS_TEXFIELD |
| **Status Evidência** | RESOLVIDA |
| **RF Associado** | RF-001 (RF-001-C5) |
| **Depoimento Arquiteto** | ARG-001-R2-006 |
| **Depoimento Developer** | DEP-001-R2-006 |

**Decisão:** `NE — Ninguém Errado`

**Fundamentação:**
A evidência EVD-001-R1-006 (bug maxRows) foi verificada em R2. O componente `TextField.jsx` agora inclui `maxRows = undefined` na desestruturação de props (linha 23). O `ReferenceError` está resolvido. O componente aceita `maxRows` como opcional com valor padrão `undefined`, que é o comportamento esperado. O depoimento do Developer (DEP-001-R2-006) confirma a correção. O depoimento do Arquiteto (ARG-001-R2-006) confirma que a correção é satisfatória.

**Sentença:** Nenhuma ação necessária. Bug corrigido.

---

### Gates da Constituição — Rodada 2

| Gate | Status | Justificativa |
|------|--------|---------------|
| GATE-01 — Planejamento Obrigatório | ✅ APROVADO | `/speckit.plan` executado antes do implement. |
| GATE-03 — Over-engineering Bloqueia Merge | ✅ **APROVADO** | Todas as 3 evidências de over-engineering (EVD-001-R1-003, EVD-001-R1-004, EVD-001-R1-005) foram corrigidas e verificadas como RESOLVIDAS em R2. CONST-R2 restaurada. Merge liberado. |

---

## 🔵 Rodada 3: R3

**Data:** 2026-06-20
**Rodada Anterior:** R2

### Julgamento Consolidado

A Rodada 3 não gerou novas evidências. As correções de runtime (ST001.2) foram em arquivos legados fora do escopo do modelo da Sprint 01. Nenhum arquivo modelado foi alterado. Todas as 6 evidências da Rodada 1 permanecem RESOLVIDAS.

| Veredito R2 | Evidência | Status R3 |
|-------------|-----------|-----------|
| VER-001-R2-001 (NE) | EVD-001-R2-001 — TAG_MODEL_AUSENTE | ✅ AINDA RESOLVIDA |
| VER-001-R2-002 (NE) | EVD-001-R2-002 — NOME_HOOK_DIVERGENTE | ✅ AINDA RESOLVIDA |
| VER-001-R2-003 (NE) | EVD-001-R2-003 — OVER_ENGINEERING_USER | ✅ AINDA RESOLVIDA |
| VER-001-R2-004 (NE) | EVD-001-R2-004 — OVER_ENGINEERING_AUTH_SERVICE | ✅ AINDA RESOLVIDA |
| VER-001-R2-005 (NE) | EVD-001-R2-005 — OVER_ENGINEERING_STORE | ✅ AINDA RESOLVIDA |
| VER-001-R2-006 (NE) | EVD-001-R2-006 — BUG_MAX_ROWS | ✅ AINDA RESOLVIDA |

**Decisão:** Nenhum novo julgamento necessário. Verificado que o estado de integridade dos arquivos modelados permanece intacto.

### Gates da Constituição — Rodada 3

| Gate | Status |
|------|--------|
| GATE-01 — Planejamento Obrigatório | ✅ APROVADO |
| GATE-03 — Over-engineering Bloqueia Merge | ✅ APROVADO (mantido) |