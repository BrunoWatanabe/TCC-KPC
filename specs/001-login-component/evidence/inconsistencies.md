# Relatório de Evidências — Login Component (Sprint 01)

**Sprint:** Sprint 01
**Feature:** 001-login-component
**Gerado em:** 2026-06-19
**ID do Relatório:** EVD-REL-001-001

---

## Metadados da Investigação

| Campo | Valor |
|-------|-------|
| POL-R01 (Modelo vs Código) | ✅ Concluído |
| POL-R03 (Depoimentos) | ✅ Coletados |
| POL-R04 (Relatório) | ✅ Gerado |
| Total de Evidências | 6 |
| Total de Depoimentos (Arquiteto) | 6 |
| Total de Depoimentos (Developer) | 6 |

---

## Evidências

### EVD-001-001 — TAG_MODEL_AUSENTE

| Campo | Valor |
|-------|-------|
| **Tipo** | TAG_MODEL_AUSENTE |
| **Severidade** | MEDIA |
| **RF Associado** | RF-001, RF-005 |
| **Descrição** | Arquivo `shared/config.js` não possui tag `// @model:` conforme exigido por T001.1. |
| **Localização (Modelo)** | `login-classes.puml:117` — classe `Config` com `@rf:` tags |
| **Localização (Código)** | `shared/config.js:1-6` — ausência de `// @model:` |
| **Detalhes** | A task T001.1 exige explicitamente a tag `// @model: specs/001-login-component/model/login-classes.puml` no topo do arquivo. O arquivo `config.js` existe e exporta `API_BASE_URL` e `ENDPOINTS.LOGIN`, mas não contém o comentário de rastreabilidade. |

#### Depoimento do Arquiteto (ARG-001-001)
> **Posição:** O modelo está correto.
> **Justificativa:** A classe `Config` foi modelada em `login-classes.puml:117` com rastreabilidade `@rf:` e faz parte da camada Model. O modelo cobre adequadamente os endpoints e a URL base. A ausência da tag de rastreabilidade no código não invalida o modelo, mas quebra a cadeia de rastreabilidade exigida pela CONST-R3.

#### Depoimento do Developer (DEP-001-001)
> **Posição:** Reconhece a omissão.
> **Justificativa:** O arquivo `config.js` existia previamente com sua própria estrutura de documentação (JSDoc). Durante a refatoração (T001.1), o Developer não adicionou o comentário `// @model:` porque o arquivo já possuía documentação própria. O Developer reconhece que a tag deveria ter sido incluída para manter a rastreabilidade conforme CONST-R3.

---

### EVD-001-002 — NOME_HOOK_DIVERGENTE

| Campo | Valor |
|-------|-------|
| **Tipo** | NOME_DIVERGENTE |
| **Severidade** | MEDIA |
| **RF Associado** | RF-001 |
| **Descrição** | Hook modelado como `useAuth` nos diagramas `.puml` foi implementado como `useLoginViewModel` no código. |
| **Localização (Modelo)** | `login-classes.puml:64-72` — classe `useAuth` no pacote ViewModel |
| **Localização (Código)** | `viewmodels/hooks/useLoginViewModel.js:11` — função `useLoginViewModel` |
| **Detalhes** | O modelo (`login-classes.puml`, `login-components.puml`, `login-sequence.puml`) nomeia consistentemente o hook como `useAuth`. O código implementa o hook como `useLoginViewModel.js` com exports `useLoginViewModel`. A tasks.md (T001.5) referencia `useLoginViewModel`, mas os diagramas UML usam `useAuth`. |

#### Depoimento do Arquiteto (ARG-001-002)
> **Posição:** O modelo está correto.
> **Justificativa:** A nomenclatura `useAuth` foi escolhida por ser mais genérica e alinhada ao padrão de nomenclatura de hooks React (prefixo `use-` + domínio). O modelo foi desenhado na Fase 1 e a nomenclatura foi consistente em todos os diagramas. O plano (`plan.md`) também usa `useAuth` na seção Project Structure. A divergência partiu da implementação.

#### Depoimento do Developer (DEP-001-002)
> **Posição:** Reconhece a divergência, mas justifica.
> **Justificativa:** O Developer seguiu o padrão de nomenclatura adotado nos stores do projeto (`useAuthStore`, `useTopicStore`), onde o nome reflete o tipo de ViewModel (Store vs Hook). Como o hook é específico da View de login, o nome `useLoginViewModel` foi considerado mais descritivo que `useAuth`. O Developer reconhece que deveria ter alinhado com o modelo ou solicitado atualização ao Arquiteto.

---

### EVD-001-003 — OVER_ENGINEERING_ENTITY_USER

| Campo | Valor |
|-------|-------|
| **Tipo** | OVER_ENGINEERING |
| **Severidade** | ALTA |
| **RF Associado** | RF-001, RF-006 |
| **Descrição** | Entidade `User` implementa atributos e métodos não modelados nos diagramas. |
| **Localização (Modelo)** | `login-classes.puml:105-109` — `User` com `+ username: string`, `+ token: string`, `+ {static} fromApiResponse(...)` |
| **Localização (Código)** | `models/entities/User.js:7-197` — classe `User` |
| **Detalhes** | O modelo especifica apenas 2 atributos (`username`, `token`) e 1 método estático (`fromApiResponse`). O código implementa 3 atributos adicionais (`attributions`, `isAuthenticated`, `_token` implícito) e 12 métodos adicionais (`canAccessTopic`, `getAssignedTopics`, `isAdmin`, `toAuthHeaders`, `getAnnotationFiles`, `getAnnotationProfile`, `isValid`, `toJSON`, `fromJSON`, `fromApiResponse` com 4 casos distintos). Isso viola CONST-R2 (Zero Over-Engineering). |

#### Depoimento do Arquiteto (ARG-001-003)
> **Posição:** O modelo está correto e completo para o escopo da Sprint 01.
> **Justificativa:** A Sprint 01 cobre exclusivamente RF-001 (Login com username e senha). A entidade `User` no modelo reflete exatamente o necessário para autenticação: `username` (identificação), `token` (credencial JWT) e `fromApiResponse` (factory para criar a partir da resposta da API). Métodos como `canAccessTopic`, `getAnnotationFiles`, `toAuthHeaders` e `isAdmin` não fazem parte do escopo da sprint e não foram modelados. O Arquiteto classifica isso como over-engineering.

#### Depoimento do Developer (DEP-001-003)
> **Posição:** Reconhece o over-engineering, mas apresenta justificativa.
> **Justificativa:** O Developer aproveitou o arquivo `User.js` já existente no código legado (`src/models/User.js`) que continha toda a lógica de atribuições do backend ReactPy. Durante a refatoração (T001.2), manteve os métodos existentes por entender que seriam necessários em sprints futuras (tópicos, clusters). O Developer reconhece que deveria ter modelado apenas o escopo da Sprint 01 conforme CONST-R2.

---

### EVD-001-004 — OVER_ENGINEERING_AUTH_SERVICE

| Campo | Valor |
|-------|-------|
| **Tipo** | OVER_ENGINEERING |
| **Severidade** | ALTA |
| **RF Associado** | RF-001, RF-005 |
| **Descrição** | `AuthService` implementa múltiplos métodos não modelados nos diagramas. |
| **Localização (Modelo)** | `login-classes.puml:96-98` — `AuthService` com `+ {static} login(username: string, password: string): Promise<string>` |
| **Localização (Código)** | `models/services/AuthService.js` — classe `AuthService` |
| **Detalhes** | O modelo especifica apenas o método estático `login(username, password): Promise<string>`. O código implementa 17 métodos: `constructor`, `getCurrentToken`, `makeRequest`, `basicLogin`, `login`, `logout`, `whoami`, `validatePassword`, `listUsers`, `isAuthenticated`, `clearAuthentication`, `saveAuthenticationToken`, `getAuthenticatedUser`, `updateAuthenticatedUser`, além de singletons e métodos auxiliares. Apenas `login()` corresponde ao modelado. Todos os demais constituem over-engineering. |

#### Depoimento do Arquiteto (ARG-001-004)
> **Posição:** O modelo está correto e minimalista.
> **Justificativa:** Para o RF-001 (Login), o contrato do `AuthService` é exclusivamente o método `login(username, password)`. Nenhum dos outros métodos (`basicLogin`, `whoami`, `listUsers`, `validatePassword`, etc.) faz parte da especificação da Sprint 01. O modelo reflete precisamente o necessário. A implementação expandiu o contrato sem cobertura no modelo, violando CONST-R2.

#### Depoimento do Developer (DEP-001-004)
> **Posição:** Reconhece o over-engineering.
> **Justificativa:** O `AuthService` foi refatorado (T001.3) a partir do serviço legado `src/services/apiService.js` que continha todas as 6 APIs do grupo USERS. O Developer manteve os métodos existentes para não quebrar outras partes do sistema que ainda dependem deles. No entanto, reconhece que para o escopo MVVM puro da Sprint 01, deveria ter criado um serviço mínimo apenas com `login()`.

---

### EVD-001-005 — OVER_ENGINEERING_USE_AUTH_STORE

| Campo | Valor |
|-------|-------|
| **Tipo** | OVER_ENGINEERING |
| **Severidade** | MEDIA |
| **RF Associado** | RF-001, RF-006 |
| **Descrição** | `useAuthStore` implementa ações não modeladas nos diagramas. |
| **Localização (Modelo)** | `login-classes.puml:48-60` — `useAuthStore` com atributos (`isAuthenticated`, `user`, `token`, `loading`, `error`) e ações (`login`, `logout`, `clearError`) |
| **Localização (Código)** | `viewmodels/stores/useAuthStore.js` — store Zustand |
| **Detalhes** | O modelo especifica 3 ações. O código implementa 10 ações adicionais: `updateUser`, `getCurrentUser`, `getToken`, `getIsAuthenticated`, `getCurrentUsername`, `canAccessTopic`, `isAdmin`, `getAuthHeaders`, `reset`, `initialize`. Embora essas ações não interfiram no fluxo principal de login, são funcionalidades não modeladas. |

#### Depoimento do Arquiteto (ARG-001-005)
> **Posição:** O modelo está correto no escopo da sprint.
> **Justificativa:** As ações `login`, `logout` e `clearError` são suficientes para cobrir o RF-001. As ações extras (`canAccessTopic`, `isAdmin`, `getAuthHeaders`) pertencem a sprints futuras (tópicos, clusters) e não deveriam estar na Sprint 01. O Arquiteto considera que estas ações deveriam ser removidas ou adiadas.

#### Depoimento do Developer (DEP-001-005)
> **Posição:** Reconhece o over-engineering.
> **Justificativa:** O Developer reaproveitou o store legado que já possuía todos esses métodos implementados. Durante a refatoração (T001.4), manteve as ações por comodidade e para evitar retrabalho futuro. O Developer reconhece que violou CONST-R2 ao não limitar estritamente ao modelado, mas argumenta que as ações são meros getters que não alteram o comportamento principal.

---

### EVD-001-006 — BUG_MAX_ROWS_TEXFIELD

| Campo | Valor |
|-------|-------|
| **Tipo** | BUG_CODIGO |
| **Severidade** | ALTA |
| **RF Associado** | RF-001 |
| **Descrição** | Componente `TextField.jsx` referencia `maxRows` que não está na lista de props desestruturadas, causando ReferenceError. |
| **Localização (Modelo)** | `login-classes.puml:28-34` — `TextField` sem atributo `maxRows` (não é necessário para login) |
| **Localização (Código)** | `views/components/TextField.jsx:22` — uso de `maxRows` sem declaração no escopo |
| **Detalhes** | O componente `TextField.jsx` desestrutura várias props, mas `maxRows` não está entre elas. Na linha 22, `maxRows` é passado como prop ao MUI TextField sem estar definido no escopo do componente, resultando em `ReferenceError: maxRows is not defined`. Isso impede o componente de renderizar corretamente. |

#### Depoimento do Arquiteto (ARG-001-006)
> **Posição:** O modelo não cobre `maxRows` e não deveria.
> **Justificativa:** O componente `TextField` foi modelado apenas com as props necessárias para o formulário de login (`label`, `type`, `value`, `onChange`, `disabled`, `error`, `helperText`). A prop `maxRows` não faz parte do modelo e não é necessária para RF-001. O bug é exclusivamente do código.

#### Depoimento do Developer (DEP-001-006)
> **Posição:** Reconhece o bug.
> **Justificativa:** O componente `TextField.jsx` foi reutilizado do código legado que suportava `maxRows` para campos multilinha. Durante a refatoração, as props foram desestruturadas mas `maxRows` foi esquecido na lista de desestruturação, embora tenha sido mantido no JSX de passagem. O Developer reconhece o erro e confirma que deve ser corrigido.

---

## Checklist de Verificação

### CHK-CLASS-01 — Cobertura de Classes
- ✅ `LoginView` → `views/pages/LoginView.jsx`
- ✅ `useAuthStore` → `viewmodels/stores/useAuthStore.js`
- ✅ `AuthService` → `models/services/AuthService.js`
- ✅ `User` → `models/entities/User.js`
- ⚠️ `useAuth` → `viewmodels/hooks/useLoginViewModel.js` (nome divergente — EVD-001-002)
- ✅ `TextField` → `views/components/TextField.jsx`
- ✅ `Button` → `views/components/Button.jsx`
- ✅ `AuthLayout` → `views/layouts/AuthLayout.jsx`
- ❌ `Alert` → usado diretamente do MUI em `LoginView.jsx` (não como componente isolado, mas consistente com modelo)
- ✅ `Config` → `shared/config.js`

### CHK-CLASS-03 — Over-engineering (Classes no código sem modelo)
- ❌ Nenhuma classe/componente extra sem modelo — todas as classes do código têm contraparte no modelo.

### CHK-METH-01 — Cobertura de Métodos
- ✅ `AuthService.login()` com POST `/users/login` implementado
- ✅ `useAuthStore.login()` chamando `AuthService.login()` e tratando resposta
- ✅ `LoginView.onSubmit` disparando `login()`
- ⚠️ Métodos extras sem modelo (EVD-001-003, EVD-001-004, EVD-001-005)

### CHK-ATTR-01 — Cobertura de Atributos
- ✅ `username`, `password` no formulário e requisição
- ✅ `loading` para controle de desabilitar campos
- ✅ `error` para exibir Alert

### CHK-SEQ-01 — Fluxo de Sequência
- ✅ Preenchimento → submit → AuthService → API → resposta → store → persist → redirect
- ✅ Tratamento de erro HTTP 401/422
- ✅ Tratamento de falha de rede
- ✅ Restauração de sessão na inicialização

### CHK-DEP-01 — Tags `// @model:`
- ✅ `models/entities/User.js` — presente
- ✅ `models/services/AuthService.js` — presente
- ✅ `viewmodels/stores/useAuthStore.js` — presente
- ✅ `viewmodels/hooks/useLoginViewModel.js` — presente
- ✅ `views/pages/LoginView.jsx` — presente
- ✅ `AppMVVM.jsx` — presente
- ❌ `shared/config.js` — **AUSENTE** (EVD-001-001)

---

## Resumo

| Métrica | Valor |
|---------|-------|
| Total de Evidências | 6 |
| Severidade ALTA | 3 (EVD-001-003, EVD-001-004, EVD-001-006) |
| Severidade MEDIA | 3 (EVD-001-001, EVD-001-002, EVD-001-005) |
| Over-engineering (ALTA) | 2 entidades (User + AuthService) |
| Bugs (ALTA) | 1 (TextField maxRows) |
| Tags ausentes (MEDIA) | 1 (config.js) |
| Nomenclatura divergente (MEDIA) | 1 (useAuth vs useLoginViewModel) |