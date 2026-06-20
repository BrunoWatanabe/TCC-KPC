---
description: "Task list for Sprint 01 — Login Component: implementação original (T001) + correções Rodada 1 (T-C)"
feature: 001-login-component
---

# Tasks: Login Component (Sprint 01) — Correções Rodada 1

**Input**: Design documents from `/specs/001-login-component/`

**Feature**: 001-login-component | **Branch**: `001-login-component` | **Data**: 2026-06-20

**Contexto**: Rodada 1 de verificação concluída com 6 evidências DE. Tasks T001.1 a T001.7 já implementadas e marcadas como concluídas. Tasks T-C1 a T-C8 implementam as correções determinadas pelo veredito para alinhar o código ao modelo PlantUML.

**Stack**: React 18 + Material UI 5 + Zustand 5 + Axios + React Router 6

**Path base**: `kpc-frontend/src-mvvm/`

**Rastreabilidade**: Todo arquivo criado/refatorado DEVE conter `// @model: specs/001-login-component/model/login-classes.puml` no topo.

**Arquitetura**: MVVM com 3 camadas rigidamente separadas:
- **Model** (`models/`): entidades + serviços (dados e API)
- **ViewModel** (`viewmodels/`): stores Zustand + hooks de apresentação
- **View** (`views/`): componentes React puros (sem lógica de negócio)

## Formato: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: Qual user story ou correção esta task atende
- Include exact file paths in descriptions (relative to `kpc-frontend/src-mvvm/`)

---

## ✅ Tasks Originais concluídas (T001.1 — T001.7)

- [X] T001.1 [P] Verificar/criar `shared/config.js`: exportar `API_BASE_URL = 'http://localhost:3132'` e `ENDPOINTS.LOGIN = '/users/login'` com tag `// @model: specs/001-login-component/model/login-classes.puml`
- [X] T001.2 [P] Verificar/criar entidade `models/entities/User.js` com campos `username`, `token` e factory method estático `User.fromApiResponse(data)` com tag `// @model: specs/001-login-component/model/login-classes.puml`
- [X] T001.3 Refatorar `models/services/AuthService.js`: método `login(username, password)` usando Axios com `POST /users/login`, `Content-Type: application/x-www-form-urlencoded`. Manter `getCurrentToken()`. Tag `// @model:`.
- [X] T001.4 Refatorar `viewmodels/stores/useAuthStore.js` com Zustand + persist. Estado: `isAuthenticated`, `user`, `token`, `error`, `loading`. Ações: `login()`, `logout()`, `clearError()`. Tag `// @model:`.
- [X] T001.5 Criar/refatorar `viewmodels/hooks/useLoginViewModel.js`: hook consumindo `useAuthStore`, retornando props para `LoginView`. Tag `// @model:`.
- [X] T001.6 Refatorar `views/pages/LoginView.jsx`: componente React puro com props e estados (idle, loading, error). Tag `// @model:`.
- [X] T001.7 Conectar tudo em `AppMVVM.jsx`: `LoginView` + `useLoginViewModel` + rota `/login` + `PrivateRoute`. Tag `// @model:`.

---

## Phase 1: Foundation — Correção de Rastreabilidade

**Purpose**: Adicionar tags de rastreabilidade ausentes identificadas na Rodada 1.

**RF associado**: RF-001-C4 (EVD-001-R1-001 — TAG_MODEL_AUSENTE)

- [X] T-C4 [P] Adicionar `// @model: specs/001-login-component/model/login-classes.puml` no topo de `shared/config.js`. Este arquivo já existe e exporta as constantes corretas, apenas falta a tag de rastreabilidade.

**Checkpoint**: Tag `// @model:` presente em `shared/config.js`.

---

## Phase 2: Correções de Over-Engineering — Model Layer

**Purpose**: Remover código não modelado das entidades e serviços (CONST-R2).

**RF associado**: RF-001-C1 (EVD-001-R1-003 — OVER_ENGINEERING_ENTITY_USER), RF-001-C2 (EVD-001-R1-004 — OVER_ENGINEERING_AUTH_SERVICE)

### T-C1 — Refatorar User.js para escopo mínimo modelado

- [X] T-C1 Refatorar `models/entities/User.js` para conter APENAS o que está modelado em `login-classes.puml:105-109`:
  - **MANTER** atributos: `username` (string), `token` (string)
  - **MANTER** método: `static fromApiResponse(username, accessToken)` — factory simplificada que cria User com `username` e `token`
  - **REMOVER** atributos não modelados: `attributions`, `isAuthenticated`, `_token` implícito
  - **REMOVER** métodos não modelados: `canAccessTopic`, `getAssignedTopics`, `isAdmin`, `toAuthHeaders`, `getAnnotationFiles`, `getAnnotationProfile`, `isValid`, `toJSON`, `fromJSON`
  - Construtor deve aceitar apenas `(username, token)`
  - Tag `// @model: specs/001-login-component/model/login-classes.puml` no topo

### T-C2 — Refatorar AuthService.js para expor apenas login() como público

- [X] T-C2 Refatorar `models/services/AuthService.js` para expor APENAS `login()` como público:
  - **MANTER** como público: `login(username, password)` → chama `POST /users/login` com Axios, `Content-Type: application/x-www-form-urlencoded`, retorna token
  - **MANTER** como privado (não exportado, não documentado no modelo): `makeRequest()`, `getCurrentToken()`
  - **REMOVER** ou tornar privados: `basicLogin`, `logout`, `whoami`, `validatePassword`, `listUsers`, `isAuthenticated`, `clearAuthentication`, `saveAuthenticationToken`, `getAuthenticatedUser`, `updateAuthenticatedUser`
  - **REMOVER** instância singleton `authService` do export — consumidores devem instanciar ou importar apenas a classe
  - Tag `// @model: specs/001-login-component/model/login-classes.puml` no topo (se ausente)

**Checkpoint**: Model layer alinhada ao modelo — zero over-engineering em `User.js` e `AuthService.js`.

---

## Phase 3: Correções de Over-Engineering — ViewModel Layer

**Purpose**: Remover ações não modeladas do store Zustand (CONST-R2).

**RF associado**: RF-001-C3 (EVD-001-R1-005 — OVER_ENGINEERING_USE_AUTH_STORE)

### T-C3 — Refatorar useAuthStore removendo ações não modeladas

- [X] T-C3 Refatorar `viewmodels/stores/useAuthStore.js` removendo ações não modeladas:
  - **MANTER** estado: `isAuthenticated`, `user` (User | null), `token` (string | null), `error` (string | null), `loading` (boolean)
  - **MANTER** ações: `login(username, password)`, `logout()`, `clearError()`
  - **MANTER** persistência: middleware `persist` do Zustand com chave `auth-storage-mvvm`, `partialize` e `onRehydrateStorage` conforme necessário
  - **REMOVER** ações: `setLoading`, `setError`, `updateUser`, `getCurrentUser`, `getToken`, `getIsAuthenticated`, `getCurrentUsername`, `canAccessTopic`, `isAdmin`, `getAuthHeaders`, `reset`, `initialize`
  - A ação `initialize` (chamada por `onRehydrateStorage`) PODE ser mantida APENAS se for estritamente necessária para a hidratação do Zustand — neste caso documentar com comentário `// @note: mantido para onRehydrateStorage — reportar ao Arquiteto se puder ser removido`
  - Ajustar `partialize` para serializar corretamente apenas os campos persistidos
  - Tag `// @model: specs/001-login-component/model/login-classes.puml` no topo

**Checkpoint**: ViewModel alinhada ao modelo — store contém apenas ações modeladas.

---

## Phase 4: Correções de Bug e Nomenclatura

**Purpose**: Corrigir bug `ReferenceError: maxRows` e alinhar nomenclatura do hook ao modelo.

**RF associado**: RF-001-C5 (EVD-001-R1-006 — BUG_MAX_ROWS_TEXFIELD), RF-001-C6 (EVD-001-R1-002 — NOME_HOOK_DIVERGENTE)

### T-C5 — Corrigir ReferenceError: maxRows no TextField.jsx

- [X] T-C5 Corrigir `views/components/TextField.jsx`:
  - `maxRows` já está na desestruturação de props (linha 25) — verificar se o erro persiste em tempo de execução
  - Se o erro for `ReferenceError: maxRows is not defined` na desestruturação, verificar se há um typo no nome ou se `maxRows` está posicionado antes de sua declaração
  - Como alternativa segura, garantir que `maxRows` tenha valor padrão `undefined` na desestruturação: `maxRows = undefined`
  - Verificar se há outros `ReferenceError` similares no componente (ex.: `autoComplete`, `InputProps`)
  - Tag `// @model: specs/001-login-component/model/login-classes.puml` no topo

### T-C6 — Renomear hook useLoginViewModel → useAuth

- [X] T-C6 Alinhar nomenclatura do hook ao modelo:
  - **OPÇÃO RECOMENDADA** (Opção A do plano): Renomear arquivo `viewmodels/hooks/useLoginViewModel.js` → `viewmodels/hooks/useAuth.js` e função exportada `useLoginViewModel` → `useAuth`
  - Atualizar export em `viewmodels/index.js`: `export { useAuth } from './hooks/useAuth.js'`
  - Atualizar import em `viewmodels/index.js` (linha 30 atualmente: `useLoginViewModel`)
  - Atualizar import em `AppMVVM.jsx` (linha 29 atualmente: `useLoginViewModel`)
  - Atualizar uso em `AppMVVM.jsx` (linha 94: `const viewModel = useLoginViewModel()`)
  - Atualizar comentário de docstring em `AppMVVM.jsx` (linha 91)
  - Verificar se há outros consumidores do hook em todo `src-mvvm/`
  - Tag `// @model: specs/001-login-component/model/login-classes.puml` no topo do arquivo renomeado

**Checkpoint**: Bug corrigido e nomenclatura alinhada ao modelo.

---

## Phase 5: Validação Pós-Correção

**Purpose**: Verificar que todas as correções não quebraram o fluxo de login.

**RF associado**: RF-001 (funcionalidade geral)

- [X] T-C7 [P] Verificar que o login ainda funciona após todas as alterações: testar fluxo completo manualmente (preenchimento → submit → API → store → redirect). Abrir navegador limpo, preencher credenciais válidas, verificar redirecionamento para `/topics`, verificar persistência em localStorage.
- [X] T-C8 [P] Verificar que `// @model:` está presente em TODOS os arquivos tocados: `shared/config.js`, `models/entities/User.js`, `models/services/AuthService.js`, `viewmodels/stores/useAuthStore.js`, `viewmodels/hooks/useAuth.js`, `views/pages/LoginView.jsx`, `views/components/TextField.jsx`, `AppMVVM.jsx`, `viewmodels/index.js`.

**Checkpoint**: Todas as correções validadas — código funcional e rastreável.

---

## Dependências & Ordem de Execução

### Dependências entre Fases (Correções)

```mermaid
graph TD
    Phase1["Phase 1: Foundation (T-C4)"] --> Phase2["Phase 2: Over-Engineering Model (T-C1, T-C2)"]
    Phase2 --> Phase3["Phase 3: Over-Engineering ViewModel (T-C3)"]
    Phase3 --> Phase4["Phase 4: Bug + Nome (T-C5, T-C6)"]
    Phase4 --> Phase5["Phase 5: Validação (T-C7, T-C8)"]
```

### Dependências Detalhadas

| Task | Depende de | Descrição |
|------|-----------|-----------|
| T-C4 | — | Tag em config.js (sem dependências) |
| T-C1 | — | Refatorar User.js (sem dependências) |
| T-C2 | — | Refatorar AuthService.js (sem dependências) |
| T-C3 | T-C1 | useAuthStore depende de `User` entity refatorada |
| T-C5 | — | Corrigir TextField.jsx (sem dependências) |
| T-C6 | T-C3 | Renomear hook depende do store refatorado |
| T-C7 | T-C1, T-C2, T-C3, T-C4, T-C5, T-C6 | Validação funcional depende de TODAS as correções |
| T-C8 | T-C1, T-C2, T-C3, T-C4, T-C5, T-C6 | Verificação de tags depende de TODAS as correções |

### Oportunidades de Paralelismo

- **T-C4, T-C1, T-C2, T-C5**: Podem rodar em paralelo (arquivos independentes, sem dependências entre si)
- **T-C3**: Depende de T-C1 (`User` entity)
- **T-C6**: Depende de T-C3 (store refatorada)
- **T-C7, T-C8**: Dependem de todas as correções, podem rodar em paralelo entre si

### Exemplo de Execução Paralela

```
Lote 1: T-C4 [P] + T-C1 [P] + T-C2 [P] + T-C5 [P] (4 pessoas em paralelo)
Lote 2: T-C3 (após T-C1)
Lote 3: T-C6 (após T-C3)
Lote 4: T-C7 [P] + T-C8 [P] (após todas as correções)
```

---

## Estratégia de Implementação

### Escopo das Correções (Rodada 1)

| Task | RF Correção | Evidência | Tipo | Severidade |
|------|-------------|-----------|------|------------|
| T-C4 | RF-001-C4 | EVD-001-R1-001 | TAG_MODEL_AUSENTE | Média |
| T-C1 | RF-001-C1 | EVD-001-R1-003 | OVER_ENGINEERING | Alta |
| T-C2 | RF-001-C2 | EVD-001-R1-004 | OVER_ENGINEERING | Alta |
| T-C3 | RF-001-C3 | EVD-001-R1-005 | OVER_ENGINEERING | Média |
| T-C5 | RF-001-C5 | EVD-001-R1-006 | BUG_CODIGO | Alta |
| T-C6 | RF-001-C6 | EVD-001-R1-002 | NOME_DIVERGENTE | Baixa |

### O que NÃO está no escopo

- Testes automatizados (serão adicionados em sprint futura)
- Novas funcionalidades (RF-002 a RF-010)
- Alteração nos modelos PlantUML (são considerados corretos pelo Juiz)
- Correção de outras partes do código não relacionadas às 6 evidências

### Critério de Conclusão

✅ T-C1 a T-C6 concluídas → código alinhado ao modelo (zero over-engineering, tags presentes, bug corrigido, nomenclatura consistente)
✅ T-C7 — validação manual do fluxo completo de login
✅ T-C8 — `// @model:` presente em todos os arquivos tocados
➡️ Próximo passo: `git commit` (ação humana) → `/speckit.analyze` (Rodada 2)

---

## Resumo

| Fase | Tasks | Prioridade |
|------|-------|------------|
| Phase 1: Foundation (Rastreabilidade) | T-C4 | P2 |
| Phase 2: Over-Engineering — Model | T-C1, T-C2 | P1 |
| Phase 3: Over-Engineering — ViewModel | T-C3 | P2 |
| Phase 4: Bug + Nomenclatura | T-C5, T-C6 | P1/P3 |
| Phase 5: Validação | T-C7, T-C8 | — |

**Total de tasks de correção**: 8
**Tasks paralelizáveis [P]**: 5 (T-C4, T-C1, T-C2, T-C5, T-C7, T-C8)
**Tasks sequenciais**: 3 (T-C3, T-C6)
**Evidências resolvidas**: 6 (EVD-001-R1-001 a EVD-001-R1-006)
**Gates desbloqueados**: GATE-02, GATE-03 (após Rodada 2)