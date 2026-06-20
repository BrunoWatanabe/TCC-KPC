# Relatório de Evidências — Login Component

**Feature:** 001-login-component
**Total de Rodadas:** 1

---

## 🔵 Rodada Atual: R1

**Data:** 2026-06-19
**Rodadas Anteriores:** Nenhuma (rodada inicial)

### Sumário da Rodada

| Métrica | Valor |
|---------|-------|
| Evidências NOVAS | 6 |
| Evidências PERSISTEM | 0 |
| Evidências RESOLVIDAS | 0 |
| Evidências REABERTAS | 0 |

### Árvore de Evidências

| Rodada Anterior | Status | Rodada Atual |
|----------------|--------|--------------|
| — | 🆕 NOVA | EVD-001-R1-001 |
| — | 🆕 NOVA | EVD-001-R1-002 |
| — | 🆕 NOVA | EVD-001-R1-003 |
| — | 🆕 NOVA | EVD-001-R1-004 |
| — | 🆕 NOVA | EVD-001-R1-005 |
| — | 🆕 NOVA | EVD-001-R1-006 |

---

## 🔵 Rodada 1: R1

**Data:** 2026-06-19

### Evidências da Rodada

### EVD-001-R1-001 — TAG_MODEL_AUSENTE {#evd-R1-001}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | TAG_MODEL_AUSENTE |
| **severidade** | MEDIA |
| **RF Associado** | RF-001, RF-005 |
| **descrição** | Arquivo `shared/config.js` não possui tag `// @model:` conforme exigido por T001.1. |
| **localização_modelo** | `login-classes.puml:117` — classe `Config` com `@rf:` tags |
| **localização_código** | `shared/config.js:1-6` — ausência de `// @model:` |
| **detalhes** | A task T001.1 exige explicitamente a tag `// @model: specs/001-login-component/model/login-classes.puml` no topo do arquivo. O arquivo `config.js` existe e exporta `API_BASE_URL` e `ENDPOINTS.LOGIN`, mas não contém o comentário de rastreabilidade. |

#### Depoimento Arquiteto (ARG-001-R1-001)
> **Posição:** Modelo correto.
> **Justificativa:** A classe `Config` foi modelada em `login-classes.puml:117` com `@rf:`. O modelo está completo. A tag ausente no código não invalida o modelo, mas quebra CONST-R3.

#### Depoimento Developer (DEP-001-R1-001)
> **Posição:** Reconhece omissão.
> **Justificativa:** O arquivo já tinha JSDoc próprio. Durante a refatoração não adicionou `// @model:`.

---

### EVD-001-R1-002 — NOME_HOOK_DIVERGENTE {#evd-R1-002}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | NOME_DIVERGENTE |
| **severidade** | MEDIA |
| **RF Associado** | RF-001 |
| **descrição** | Hook modelado como `useAuth` implementado como `useLoginViewModel`. |
| **localização_modelo** | `login-classes.puml:64-72` — `useAuth` |
| **localização_código** | `viewmodels/hooks/useLoginViewModel.js:11` — `useLoginViewModel` |
| **detalhes** | Modelo nomeia `useAuth` consistentemente em todos os 3 diagramas. Plano (`plan.md`) também usa `useAuth`. Código implementa `useLoginViewModel`. |

#### Depoimento Arquiteto (ARG-001-R1-002)
> **Posição:** Modelo correto. Nomenclatura consistente.
> **Justificativa:** `useAuth` segue padrão React (use- + domínio). A divergência partiu da implementação.

#### Depoimento Developer (DEP-001-R1-002)
> **Posição:** Reconhece divergência.
> **Justificativa:** Seguiu padrão do projeto (`useAuthStore` → `useLoginViewModel`). Deveria ter alinhado com o modelo.

---

### EVD-001-R1-003 — OVER_ENGINEERING_ENTITY_USER {#evd-R1-003}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | OVER_ENGINEERING |
| **severidade** | ALTA |
| **RF Associado** | RF-001, RF-006 |
| **descrição** | `User` implementa 3 atributos e 12 métodos extras não modelados. |
| **localização_modelo** | `login-classes.puml:105-109` — 2 attr + 1 método |
| **localização_código** | `models/entities/User.js:7-197` — 5 attr + 13 métodos |
| **detalhes** | Modelo especifica `username`, `token`, `fromApiResponse`. Código adiciona `attributions`, `isAuthenticated`, `canAccessTopic`, `getAssignedTopics`, `isAdmin`, `toAuthHeaders`, `getAnnotationFiles`, etc. Violação de CONST-R2. |

#### Depoimento Arquiteto (ARG-001-R1-003)
> **Posição:** Modelo correto para Sprint 01.
> **Justificativa:** Sprint 01 cobre apenas RF-001. Atributos e métodos extras não fazem parte do escopo.

#### Depoimento Developer (DEP-001-R1-003)
> **Posição:** Reconhece over-engineering.
> **Justificativa:** Reaproveitou `User.js` legado. Manteve métodos por comodidade para sprints futuras. Deveria ter limitado ao modelado.

---

### EVD-001-R1-004 — OVER_ENGINEERING_AUTH_SERVICE {#evd-R1-004}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | OVER_ENGINEERING |
| **severidade** | ALTA |
| **RF Associado** | RF-001, RF-005 |
| **descrição** | `AuthService` implementa 16 métodos a mais que o modelado. |
| **localização_modelo** | `login-classes.puml:96-98` — apenas `login()` |
| **localização_código** | `models/services/AuthService.js` — 17 métodos |
| **detalhes** | Modelo especifica apenas `login(username, password): Promise<string>`. Código adiciona `basicLogin`, `logout`, `whoami`, `validatePassword`, `listUsers`, `saveAuthenticationToken`, etc. |

#### Depoimento Arquiteto (ARG-001-R1-004)
> **Posição:** Modelo minimalista e correto.
> **Justificativa:** RF-001 exige apenas `login()`. Nenhum dos outros métodos faz parte do contrato da Sprint 01.

#### Depoimento Developer (DEP-001-R1-004)
> **Posição:** Reconhece over-engineering.
> **Justificativa:** `AuthService` veio do serviço legado com 6 APIs de usuário. Manteve métodos para não quebrar dependências.

---

### EVD-001-R1-005 — OVER_ENGINEERING_USE_AUTH_STORE {#evd-R1-005}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | OVER_ENGINEERING |
| **severidade** | MEDIA |
| **RF Associado** | RF-001, RF-006 |
| **descrição** | `useAuthStore` implementa 10 ações extras não modeladas. |
| **localização_modelo** | `login-classes.puml:48-60` — 3 ações |
| **localização_código** | `viewmodels/stores/useAuthStore.js` — 13 ações |
| **detalhes** | Modelo especifica `login`, `logout`, `clearError`. Código adiciona `updateUser`, `getCurrentUser`, `getToken`, `canAccessTopic`, `isAdmin`, `getAuthHeaders`, `reset`, `initialize`, etc. |

#### Depoimento Arquiteto (ARG-001-R1-005)
> **Posição:** Modelo correto.
> **Justificativa:** Ações extras (`canAccessTopic`, `isAdmin`) pertencem a sprints futuras e não deveriam estar na Sprint 01.

#### Depoimento Developer (DEP-001-R1-005)
> **Posição:** Reconhece over-engineering.
> **Justificativa:** Reaproveitou store legado. Manteve ações por comodidade. Ações são getters que não alteram fluxo principal.

---

### EVD-001-R1-006 — BUG_MAX_ROWS_TEXFIELD {#evd-R1-006}

| Campo | Valor |
|-------|-------|
| **parent** | — |
| **status** | NOVA |
| **tipo** | BUG_CODIGO |
| **severidade** | ALTA |
| **RF Associado** | RF-001 |
| **descrição** | `TextField.jsx` referencia `maxRows` sem desestruturar, causa ReferenceError. |
| **localização_modelo** | `login-classes.puml:28-34` — sem `maxRows` |
| **localização_código** | `views/components/TextField.jsx:22` — `maxRows` não definido |
| **detalhes** | `maxRows` é passado ao MUI TextField sem estar na desestruturação de props. `ReferenceError: maxRows is not defined`. |

#### Depoimento Arquiteto (ARG-001-R1-006)
> **Posição:** Modelo não cobre e não deveria.
> **Justificativa:** `maxRows` não é necessário para RF-001. O bug é exclusivamente do código.

#### Depoimento Developer (DEP-001-R1-006)
> **Posição:** Reconhece bug.
> **Justificativa:** Componente reutilizado do legado. `maxRows` foi esquecido na desestruturação.

---

### Checklist de Verificação — Rodada 1

| ID | Item | Status |
|----|------|--------|
| CHK-CLASS-01 | Classes modeladas → implementadas | ✅ / ⚠️ (EVD-R1-002) |
| CHK-CLASS-03 | Classes no código sem modelo | ✅ |
| CHK-METH-01 | Métodos modelados → implementados | ⚠️ (EVD-R1-003, EVD-R1-004, EVD-R1-005) |
| CHK-ATTR-01 | Atributos modelados → props | ✅ |
| CHK-SEQ-01 | Fluxos modelados → implementados | ✅ |
| CHK-DEP-01 | Tags `// @model:` presentes | ❌ config.js (EVD-R1-001) |
| CHK-DEP-02 | Depoimentos coletados | ✅ |