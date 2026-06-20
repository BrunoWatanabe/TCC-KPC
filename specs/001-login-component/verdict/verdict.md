# Veredicto — Login Component (Sprint 01)

**Sprint:** Sprint 01
**Feature:** 001-login-component
**Julgado em:** 2026-06-19
**ID do Julgamento:** VER-REL-001-001

---

## Metadados do Julgamento

| Campo | Valor |
|-------|-------|
| JUI-R01 (Relatório lido) | ✅ `evidence/inconsistencies.md` |
| JUI-R02 (Árvore aplicada) | ✅ |
| JUI-R03 (Veredicto emitido) | ✅ |
| Total de Evidências Julgadas | 6 |
| Total DE (Developer Errado) | 6 |
| Total AE (Arquiteto Errado) | 0 |
| Total AMBOS | 0 |
| Total NE (Ninguém Errado) | 0 |

---

## Vereditos

### VER-001-001 — Julgamento de EVD-001-001

| Campo | Valor |
|-------|-------|
| **Evidência Referenciada** | EVD-001-001 — TAG_MODEL_AUSENTE |
| **RF Associado** | RF-001, RF-005 |
| **Depoimento Arquiteto** | ARG-001-001 |
| **Depoimento Developer** | DEP-001-001 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
O modelo (`login-classes.puml:117`) define corretamente a classe `Config` com rastreabilidade `@rf:`. A task T001.1 exige explicitamente a tag `// @model:` no topo do arquivo `shared/config.js`, e a Constituição (CONST-R3) determina que todo arquivo de código fonte DEVE conter `// @model:` referenciando seu diagrama de origem. O depoimento do Arquiteto (ARG-001-001) confirma que o modelo está correto. O Developer (DEP-001-001) reconhece a omissão. A ausência da tag não afeta a funcionalidade, mas quebra a cadeia de rastreabilidade.

**Sentença:** Developer deve adicionar `// @model: specs/001-login-component/model/login-classes.puml` no topo de `shared/config.js`.

---

### VER-001-002 — Julgamento de EVD-001-002

| Campo | Valor |
|-------|-------|
| **Evidência Referenciada** | EVD-001-002 — NOME_HOOK_DIVERGENTE |
| **RF Associado** | RF-001 |
| **Depoimento Arquiteto** | ARG-001-002 |
| **Depoimento Developer** | DEP-001-002 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
O modelo (`login-classes.puml:64-72`) nomeia o hook como `useAuth` de forma consistente em todos os três diagramas (classes, componentes, sequência). O plano (`plan.md`) também referencia `useAuth` na seção Project Structure. A implementação criou `useLoginViewModel` com nome divergente. O depoimento do Arquiteto (ARG-001-002) confirma que o modelo está correto e a nomenclatura foi consistente. O Developer (DEP-001-002) reconhece a divergência e justifica com base em padrões locais do projeto, mas a regra CONST-R2 (fidelidade ao modelo) prevalece sobre preferências de nomenclatura. Funcionalmente o hook está correto, mas o nome não corresponde ao modelado.

**Sentença:** Developer deve renomear o hook para `useAuth` (arquivo `useLoginViewModel.js` → `useAuth.js`, função `useLoginViewModel` → `useAuth`) OU solicitar ao Arquiteto que atualize o modelo para refletir o nome real. Qualquer que seja a escolha, os dois devem estar alinhados.

---

### VER-001-003 — Julgamento de EVD-001-003

| Campo | Valor |
|-------|-------|
| **Evidência Referenciada** | EVD-001-003 — OVER_ENGINEERING_ENTITY_USER |
| **RF Associado** | RF-001, RF-006 |
| **Depoimento Arquiteto** | ARG-001-003 |
| **Depoimento Developer** | DEP-001-003 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
O modelo (`login-classes.puml:105-109`) especifica estritamente 2 atributos (`username`, `token`) e 1 método estático (`fromApiResponse`) para a entidade `User`, condizente com o escopo da Sprint 01 (RF-001 apenas). O código implementa 3 atributos adicionais e 12 métodos extras. O depoimento do Arquiteto (ARG-001-003) confirma que o modelo está correto e completo para a sprint. O Developer (DEP-001-003) reconhece o over-engineering e justifica com reaproveitamento de código legado. A CONST-R2 (Zero Over-Engineering) é NON-NEGOTIABLE: funcionalidades de sprints futuras não devem ser implementadas antes do modelo correspondente. Isso distorce a métrica central do experimento.

**Sentença:** Developer deve refatorar `User.js` para conter APENAS os atributos (`username`, `token`) e método (`fromApiResponse(username, accessToken)`) previstos no modelo. Os demais métodos devem ser removidos ou preservados em branch separada para implementação futura mediante novo modelo.

---

### VER-001-004 — Julgamento de EVD-001-004

| Campo | Valor |
|-------|-------|
| **Evidência Referenciada** | EVD-001-004 — OVER_ENGINEERING_AUTH_SERVICE |
| **RF Associado** | RF-001, RF-005 |
| **Depoimento Arquiteto** | ARG-001-004 |
| **Depoimento Developer** | DEP-001-004 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
O modelo (`login-classes.puml:96-98`) especifica exclusivamente o método `login(username, password): Promise<string>` para `AuthService`. A implementação contém 17 métodos — 16 a mais que o modelado. O depoimento do Arquiteto (ARG-001-004) confirma que o modelo é minimalista e correto para o RF-001. O Developer (DEP-001-004) reconhece o over-engineering e justifica com a manutenção de compatibilidade com código legado. A CONST-R2 é clara: a implementação DEVE ser estritamente limitada ao que está modelado.

**Sentença:** Developer deve refatorar `AuthService.js` para expor APENAS o método `login(username, password)` como contrato público da Sprint 01. Métodos auxiliares privados (como `makeRequest`) podem permanecer internos, mas não devem ser exportados. Métodos como `basicLogin`, `logout`, `whoami`, `validatePassword`, `listUsers`, `saveAuthenticationToken`, `getAuthenticatedUser`, etc. devem ser removidos ou movidos para branch futura.

---

### VER-001-005 — Julgamento de EVD-001-005

| Campo | Valor |
|-------|-------|
| **Evidência Referenciada** | EVD-001-005 — OVER_ENGINEERING_USE_AUTH_STORE |
| **RF Associado** | RF-001, RF-006 |
| **Depoimento Arquiteto** | ARG-001-005 |
| **Depoimento Developer** | DEP-001-005 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
O modelo (`login-classes.puml:48-60`) especifica 3 ações (`login`, `logout`, `clearError`) para o store `useAuthStore`. O código implementa 13 ações (3 modeladas + 10 extras). Embora as ações extras sejam majoritariamente getters que não alteram comportamento, sua existência viola CONST-R2 (Zero Over-Engineering). O depoimento do Arquiteto (ARG-001-005) afirma que o modelo está correto e as ações extras pertencem a sprints futuras. O Developer (DEP-001-005) reconhece o over-engineering.

**Sentença:** Developer deve remover ou comentar as ações não modeladas (`updateUser`, `getCurrentUser`, `getToken`, `getIsAuthenticated`, `getCurrentUsername`, `canAccessTopic`, `isAdmin`, `getAuthHeaders`, `reset`, `initialize`) do store. A ação `initialize` pode ser justificada como necessária para `onRehydrateStorage` do Zustand (se for o caso, deve ser documentada e reportada ao Arquiteto para atualização do modelo). As demais ações devem ser reintroduzidas apenas quando modeladas.

---

### VER-001-006 — Julgamento de EVD-001-006

| Campo | Valor |
|-------|-------|
| **Evidência Referenciada** | EVD-001-006 — BUG_MAX_ROWS_TEXFIELD |
| **RF Associado** | RF-001 |
| **Depoimento Arquiteto** | ARG-001-006 |
| **Depoimento Developer** | DEP-001-006 |

**Decisão:** `DE — Developer Errado`

**Fundamentação:**
O componente `TextField.jsx` (reutilizado de código legado) contém um `ReferenceError` ao referenciar `maxRows` sem declará-lo na desestruturação de props. O modelo (`login-classes.puml:28-34`) não cobre `maxRows` por não ser necessário para o formulário de login, mas isso é irrelevante para o julgamento: o bug está exclusivamente no código, independentemente do modelo. O depoimento do Arquiteto (ARG-001-006) confirma que o modelo não é responsável pela prop. O Developer (DEP-001-006) reconhece o bug. Este é um erro de implementação que impede a renderização correta do componente.

**Sentença:** Developer deve corrigir o `ReferenceError` em `TextField.jsx` adicionando `maxRows` à lista de props desestruturadas (com valor padrão apropriado) ou removendo a referência se não for necessária para o componente.

---

## Resumo Final

| Decisão | Quantidade | Evidências |
|---------|-----------|------------|
| DE (Developer Errado) | 6 | VER-001-001, VER-001-002, VER-001-003, VER-001-004, VER-001-005, VER-001-006 |
| AE (Arquiteto Errado) | 0 | — |
| AMBOS | 0 | — |
| NE (Ninguém Errado) | 0 | — |

### Distribuição por Tipo

| Tipo | Quantidade | Veredito |
|------|-----------|----------|
| TAG_MODEL_AUSENTE | 1 | DE |
| NOME_DIVERGENTE | 1 | DE |
| OVER_ENGINEERING | 3 | DE |
| BUG_CODIGO | 1 | DE |

### Impacto no Fluxo Principal

- **Funcionalidade de login**: intacta — o fluxo principal (login, store, persist, redirect) funciona corretamente.
- **Rastreabilidade**: parcialmente comprometida — 1 arquivo sem tag `// @model:`.
- **Alinhamento modelo-código**: comprometido — 3 casos de over-engineering.
- **Qualidade do código**: 1 bug (ReferenceError) que pode causar falha de renderização se `maxRows` for passado como prop.

### Ações Corretivas Recomendadas

| Prioridade | Ação | Responsável |
|-----------|------|-------------|
| 🔴 Alta | Corrigir `ReferenceError` de `maxRows` em `TextField.jsx` | Developer |
| 🔴 Alta | Refatorar `User.js` para escopo mínimo da Sprint 01 | Developer |
| 🔴 Alta | Refatorar `AuthService.js` para expor apenas `login()` | Developer |
| 🟡 Média | Remover ações não modeladas de `useAuthStore` | Developer |
| 🟡 Média | Adicionar `// @model:` em `shared/config.js` | Developer |
| 🟢 Baixa | Alinhar nomenclatura do hook com o modelo (ou atualizar modelo) | Developer + Arquiteto |

---

## Gates da Constituição

| Gate | Status | Justificativa |
|------|--------|---------------|
| **GATE-01** — Planejamento Obrigatório | ✅ APROVADO | `/speckit.plan` executado antes do implement conforme verificado em `tasks.md` e `plan.md`. |
| **GATE-03** — Over-engineering Bloqueia Merge | ❌ NEGADO | 3 evidências de over-engineering (EVD-001-003, EVD-001-004, EVD-001-005) detectadas. CONST-R2 violada. Merge BLOQUEADO até correção. |