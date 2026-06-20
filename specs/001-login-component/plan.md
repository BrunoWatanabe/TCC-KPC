---
description: "Override do plano de implementação — Mescla o fluxo nativo do Spec-Kit com a Persona Arquiteto para garantir que toda sprint produza modelos PlantUML rastreáveis."
agent: speckit.plan.override
extends: speckit.plan
---

# Implementation Plan: Login Component (Sprint 01) — Correções Rodada 1 → Rodada 2 🏗️

**Branch**: `001-login-component` | **Date**: 2026-06-20 | **Spec**: `specs/001-login-component/spec.md`

**Input**: Feature specification from `/specs/001-login-component/spec.md`

**Note**: Este template é um **override** do `.specify/templates/plan-template.md`. Ele mantém 100% da funcionalidade nativa do `/speckit.plan` e **adiciona** as diretrizes da **Persona Arquiteto** (`.github/prompts/persona-arquiteto.md`). A IA deve executar todo o fluxo padrão do Spec-Kit vestindo o chapéu de Arquiteto, gerando os artefatos de modelagem junto com o plano.

---

## 🧠 Instrução para a IA

> **IMPORTANTE**: Você está executando o comando nativo `/speckit.plan` do Spec-Kit. Mantenha **todas** as capacidades originais: setup, load context, constitution check, fases 0-1-2, hooks de extensão, etc. **ADICIONALMENTE**, você deve incorporar as regras da **Persona Arquiteto** contidas em `.github/prompts/persona-arquiteto.md`. Isso significa que, ao final do planejamento, você deve ter gerado ou atualizado os artefatos de modelagem UML (PlantUML) em `specs/<feature>/model/`.

### Resumo das Regras da Persona Arquiteto (aplicar DURANTE o plano)

1. **Analisar Especificações**: Leia a `spec.md` e extraia todos os RFs (Requisitos Funcionais) que precisam de modelagem.
2. **Modelar com PlantUML**: Gere diagramas de classes, componentes e/ou sequência em `specs/<feature>/model/`.
3. **Rastreabilidade**: Cada elemento deve conter tag `@rf:<ID>`.
4. **Simplicidade**: Modele apenas o necessário. Sem over-modelling.
5. **Documentar Decisões**: Inclua no plano as decisões arquiteturais tomadas.

---

## Summary

**Contexto**: Rodada 1 de verificação concluída com 6 evidências DE (Developer Errado). Modelo PlantUML validado como correto pelo Juiz. Agora é necessário planejar a implementação das correções determinadas pelo veredito, ajustando o código para alinhar ao modelo existente.

**Escopo das correções**:
- RF-001-C1: Refatorar `User.js` para escopo mínimo (2 atributos + 1 método)
- RF-001-C2: Refatorar `AuthService.js` — expor apenas `login()` como público
- RF-001-C3: Refatorar `useAuthStore` — remover ações não modeladas
- RF-001-C4: Adicionar `// @model:` em `shared/config.js`
- RF-001-C5: Corrigir `ReferenceError: maxRows` em `TextField.jsx`
- RF-001-C6: Renomear `useLoginViewModel` → `useAuth` (código, não modelo)

**Decisão Arquitetural (RF-001-C6)**: **Opção A** — renomear o código (`useLoginViewModel` → `useAuth`) para alinhar ao modelo existente. O modelo PlantUML permanece inalterado. Esta é a abordagem recomendada por simplicidade: o modelo já foi aprovado pelo Juiz, e apenas o código precisa se alinhar.

## Technical Context

**Language/Version**: JavaScript (ES modules), React 18+, Vite 5.x

**Primary Dependencies**: Material UI 5 (TextField, Button, Alert, CircularProgress, AuthLayout), Zustand 4.x com middleware `persist`, Axios 1.x, React Router 6.x

**Modeling Tool**: PlantUML (diagramas em `specs/001-login-component/model/`)

**Storage**: localStorage via Zustand `persist` middleware (token JWT + dados do User)

**Testing**: Vitest + React Testing Library (planejado para sprint futura)

**Target Platform**: Navegador (frontend web — Chrome, Firefox, Edge)

**Project Type**: Frontend application MVVM (React + JavaScript)

**Performance Goals**: Login completo em < 10s (preenchimento + latência de rede)

**Constraints**: 
- Arquitetura MVVM com camadas rigidamente separadas (CONST-R4)
- Rastreabilidade obrigatória RF ↔ modelo ↔ código (CONST-R3)
- Zero over-engineering — apenas o que está modelado (CONST-R2)
- **Pós-Rodada 1**: 3 evidências de over-engineering a serem corrigidas (RF-001-C1, C2, C3)
- **Pós-Rodada 1**: 1 bug a corrigir (RF-001-C5), 1 tag ausente (RF-001-C4), 1 nome divergente (RF-001-C6)
- GATE-03 bloqueia merge até over-engineering ser resolvido

**Scale/Scope**: Sprint 01 — Correções da Rodada 1. Nenhuma nova funcionalidade. Apenas refatoração de conformidade (CONST-R2, CONST-R3).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Status Pós-Rodada 2 (ST001.1 concluída)

| Gate | Status | Justificativa |
|------|--------|---------------|
| **GATE-01 — Planejamento Obrigatório** | ✅ APROVADO | `/speckit.specify` executado. Spec em `specs/001-login-component/spec.md` com RF-001 a RF-010 + RF-001-C1 a RF-001-C6. `/speckit.plan` executado. Diagramas `.puml` gerados e validados. |
| **GATE-02 — Análise Pré-Merge** | ✅ APROVADO (Rodada 2) | Rodada 2 do pipeline concluída. Código da Sprint 01 alinhado ao modelo. |
| **GATE-03 — Over-engineering Bloqueia Merge** | ✅ APROVADO (Rodada 2) | Evidências de over-engineering resolvidas na ST001.1. CONST-R2 restaurada. |

### Pendência ST001.2 — Runtime em arquivos legados

Apesar dos gates estarem aprovados para o código da Sprint 01, a refatoração de escopo mínimo quebrou imports em **arquivos legados** (`src-mvvm/`) que estão fora do modelo da Sprint 01. Isso causa `SyntaxError` em runtime.

**Risco**: O frontend não carrega. Bloqueia validação manual e progresso para sprints seguintes.

**Plano de ação**: Corrigir imports nos arquivos consumidores (não restaurar métodos) — ver seção "🩹 Correção de Runtime pós-R2 (ST001.2)".

**Princípios Constitucionais Aplicáveis**:
- ✅ **CONST-R1 — MDE+SDD First**: Spec e modelo existem e foram validados
- ✅ **CONST-R2 — Zero Over-Engineering**: Correções RF-001-C1/C2/C3 visam restaurar conformidade
- ✅ **CONST-R3 — Rastreabilidade Obrigatória**: Correção RF-001-C4 adiciona tag ausente
- ✅ **CONST-R4 — Arquitetura MVVM**: Três camadas separadas conforme spec
- ✅ **CONST-R5 — Pipeline de Verificação**: Rodada 1 concluída, Rodada 2 pendente
- ✅ **CONST-R6 — Constituição como Árbitro Final**: Veredito respeitou princípios constitucionais

---

## � Correções da Rodada 1 (Pós-Veredito)

### Status do Veredito

6 evidências **DE (Developer Errado)**, 0 AE, 0 NE, 0 AMBOS. Modelo PlantUML validado como correto em todas as evidências.

| Evidência | Tipo | Severidade | RF Correção | Ação |
|-----------|------|------------|-------------|------|
| EVD-001-R1-001 | TAG_MODEL_AUSENTE | Média | RF-001-C4 | Adicionar `// @model:` em `shared/config.js` |
| EVD-001-R1-002 | NOME_DIVERGENTE | Média | RF-001-C6 | Renomear `useLoginViewModel` → `useAuth` (código) |
| EVD-001-R1-003 | OVER_ENGINEERING | Alta | RF-001-C1 | Refatorar `User.js` para escopo mínimo |
| EVD-001-R1-004 | OVER_ENGINEERING | Alta | RF-001-C2 | Refatorar `AuthService.js` — só `login()` público |
| EVD-001-R1-005 | OVER_ENGINEERING | Média | RF-001-C3 | Remover ações não modeladas do store |
| EVD-001-R1-006 | BUG_CODIGO | Alta | RF-001-C5 | Corrigir `ReferenceError: maxRows` |

### Decisões Arquiteturais (Pós-R1)

1. **Nomenclatura do hook** (RF-001-C6): **Opção A** — Renomear código (`useLoginViewModel` → `useAuth`) para alinhar ao modelo. Modelo permanece inalterado (já aprovado pelo Juiz). Isso evita retrabalho nos diagramas `.puml` e mantém a consistência com a nomenclatura aprovada.

2. **Escopo mínimo de `User.js`** (RF-001-C1): Manter APENAS `username` (string), `token` (string), e `fromApiResponse(username, accessToken)`. Métodos legados (`canAccessTopic`, `isAdmin`, `getAssignedTopics`, etc.) serão removidos ou movidos para branch separada. Atende CONST-R2.

3. **Contrato mínimo de `AuthService.js`** (RF-001-C2): Expor apenas `login(username, password): Promise<string>` como método público. `makeRequest` pode permanecer como privado (não exportado). `getCurrentToken()` pode permanecer como utilidade interna não exportada. Demais métodos (`basicLogin`, `logout`, `whoami`, `listUsers`, etc.) serão removidos.

4. **Store mínimo** (RF-001-C3): Manter APENAS as ações `login`, `logout`, `clearError`. Remover `updateUser`, `getCurrentUser`, `getToken`, `canAccessTopic`, `isAdmin`, `getAuthHeaders`, `reset`, `initialize` etc.

5. **Bug `maxRows`** (RF-001-C5): Adicionar `maxRows` à desestruturação de props com valor padrão `undefined`. Não altera comportamento existente e previne `ReferenceError`.

### Impacto nos Diagramas

| Diagrama | Ação | Justificativa |
|----------|------|---------------|
| `login-classes.puml` | ✅ **Manter** | Modelo correto — código será alinhado (Opção A) |
| `login-components.puml` | ✅ **Manter** | Modelo correto — código será alinhado (Opção A) |
| `login-sequence.puml` | ✅ **Manter** | Fluxo permanece o mesmo |

---
## 🩹 Correção de Runtime pós-R2 (ST001.2)

### Contexto

A ST001.1 refatorou `AuthService.js`, `User.js` e `useAuthStore.js` para escopo mínimo — removendo o singleton `authService`, métodos públicos extras e ações não modeladas. A Rodada 2 do `/speckit.analyze` verificou que o código está alinhado ao modelo, mas **não detectou** que outros arquivos em `kpc-frontend/src-mvvm/` (fora do escopo da Sprint 01) ainda importam esses exports removidos. O runtime quebra com `SyntaxError: does not provide an export named 'authService'`.

### Análise de Impacto — Imports Quebrados

Foram identificados **4 arquivos** com imports quebrados e **1 arquivo** com export removido:

#### 1. `models/services/index.js` — Export quebrado
- `export { AuthService, authService } from './AuthService.js';`
- `authService` (instância singleton) não é mais exportada por `AuthService.js`

#### 2. `viewmodels/hooks/useTopicSelectionViewModel.js` — 3 quebras
- `import { authService } from '../../models/services/AuthService.js';`
- `authStore.getCurrentUser()` — método removido do store
- `authStore.getCurrentUsername()` — método removido do store

#### 3. `viewmodels/hooks/useKeyphraseClusteringViewModel.js` — 2 quebras
- `authStore.getCurrentUser()` — método removido
- `authStore.getCurrentUsername()` — método removido

#### 4. `viewmodels/hooks/useKeyphraseClustersViewModel.js` — 2 quebras
- `authStore.getCurrentUser()` — método removido
- `authStore.getCurrentUsername()` — método removido

#### 5. `viewmodels/hooks/useCuratedKeyphrasesViewModel.js` — 2 quebras
- `authStore.getCurrentUser()` — método removido
- `authStore.getCurrentUsername()` — método removido

#### 6. `AppMVVM.jsx` — 2 quebras
- `authStore.getCurrentUser()` (linhas 119, 200) — método removido

### Decisão Arquitetural

Em vez de restaurar métodos no `AuthService` ou `useAuthStore` (o que violaria CONST-R2 — zero over-engineering), **os imports nos arquivos consumidores devem ser corrigidos** para usar a nova API pública.

**Padrão a ser aplicado**: Substituir chamadas como `authStore.getCurrentUser()` por acesso direto ao estado: `authStore.user`. O estado `user` e `isAuthenticated` são campos públicos do store Zustand e continuam disponíveis.

### Tasks de Correção

| ID | Arquivo | O que corrigir | Abordagem |
|----|---------|---------------|-----------|
| T-C7 | `models/services/index.js` | Export `authService` quebrado | Remover `authService` do re-export |
| T-C8 | `useTopicSelectionViewModel.js` | 3 imports quebrados | `authStore.user` no lugar de `getCurrentUser()`, `authStore.isAuthenticated` no lugar de `getIsAuthenticated()` |
| T-C9 | `useKeyphraseClusteringViewModel.js` | 2 chamadas quebradas | `authStore.user` → `user`, `authStore.user?.username` → `username` |
| T-C10 | `useKeyphraseClustersViewModel.js` | 2 chamadas quebradas | `authStore.user` → `user`, `authStore.user?.username` → `username` |
| T-C11 | `useCuratedKeyphrasesViewModel.js` | 2 chamadas quebradas | `authStore.user` → `user`, `authStore.user?.username` → `username` |
| T-C12 | `AppMVVM.jsx` | 2 chamadas quebradas | `authStore.user` no lugar de `getCurrentUser()` |
| T-C13 | Validação pós-correção | Testar runtime | `npm run dev` sem erros de SyntaxError |

### Impacto nos Diagramas

| Diagrama | Ação | Justificativa |
|----------|------|---------------|
| `login-classes.puml` | ✅ **Manter** | Correções são em arquivos legados fora do modelo |
| `login-components.puml` | ✅ **Manter** | Correções são em arquivos legados fora do modelo |
| `login-sequence.puml` | ✅ **Manter** | Fluxo de login não é alterado |

---
## �📐 Artefatos de Modelagem (Override — Persona Arquiteto)

Esta seção é **adicional** ao template nativo. Ela documenta os artefatos PlantUML que serão gerados durante a Fase 1 (Design).

### Diagramas Planejados

| Diagrama | Arquivo | RFs Cobertos | Descrição |
|----------|---------|--------------|-----------|
| Classes | `specs/001-login-component/model/login-classes.puml` | RF-001 a RF-010 | Estrutura MVVM: View (LoginView), ViewModel (useAuthStore), Model (AuthService, User) |
| Componentes | `specs/001-login-component/model/login-components.puml` | RF-001, RF-003, RF-004 | Organização dos componentes React e dependências entre camadas |
| Sequência | `specs/001-login-component/model/login-sequence.puml` | RF-001, RF-005, RF-006, RF-007, RF-008 | Fluxo completo de autenticação: formulário → store → API → persist → redirect |

### Rastreabilidade RF → Modelo

| RF | Elemento Modelado | Diagrama | Observação |
|----|-------------------|----------|------------|
| RF-001 | `LoginView`, `useAuthStore`, `AuthService` | login-classes.puml, login-components.puml | |
| RF-002 | Validação client-side em `LoginView` | login-classes.puml | |
| RF-003 | `loading` state + disabled props | login-classes.puml, login-sequence.puml | |
| RF-004 | Botão com "Entrando..." | login-classes.puml, login-sequence.puml | |
| RF-005 | `AuthService.login()` → POST `/users/login` | login-classes.puml, login-sequence.puml | |
| RF-006 | Zustand persist (localStorage) | login-classes.puml, login-sequence.puml | |
| RF-007 | Redirecionamento para `/topics` | login-sequence.puml | |
| RF-008 | Tratamento de erro com Alert MUI | login-classes.puml, login-sequence.puml | |
| RF-009 | Verificação de token na inicialização | login-sequence.puml | |
| RF-010 | Campo password do tipo password | login-classes.puml | |
| RF-001-C1 | Escopo mínimo de `User.js` | login-classes.puml | Correção — modelo já reflete o escopo mínimo |
| RF-001-C2 | `AuthService.login()` apenas | login-classes.puml | Correção — modelo já especifica só `login()` |
| RF-001-C3 | Store com 3 ações apenas | login-classes.puml | Correção — modelo já especifica só 3 ações |
| RF-001-C4 | Tag `// @model:` em config.js | login-classes.puml | Correção — não altera modelo |
| RF-001-C5 | Bug `maxRows` | N/A | Correção — não afeta modelo |
| RF-001-C6 | Renomear `useLoginViewModel` → `useAuth` | login-classes.puml | Correção — modelo já usa `useAuth`, código que se alinha |

### Regras Aplicadas

- ✅ **R1 — Fidelidade à Spec**: Todos os elementos modelados têm RF correspondente na spec
- ✅ **R2 — Rastreabilidade**: Tags `@rf:` serão inseridas em cada elemento
- ✅ **R4 — Simplicidade**: Apenas o necessário para cobrir os RFs da sprint

### Decisão Arquitetural

A store Zustand usa `persist` middleware com `localStorage` como storage. O token e o User são persistidos. A view é pura (sem lógica) e se conecta ao store via hook personalizado no ViewModel.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-login-component/
├── spec.md               # Especificação funcional (RF-001 a RF-010 + RF-001-C1 a RF-001-C6)
├── plan.md               # Este arquivo (output do /speckit.plan — versão R1→R2)
├── model/                # 📐 Artefatos de modelagem (Persona Arquiteto)
│   ├── login-classes.puml      # ✅ Mantido (modelo correto)
│   ├── login-components.puml   # ✅ Mantido (modelo correto)
│   └── login-sequence.puml     # ✅ Mantido (fluxo inalterado)
├── evidence/
│   └── inconsistencies.md      # 🔵 Rodada 1 — 6 evidências (NÃO ALTERAR)
├── verdict/
│   └── verdict.md              # ⚖️ Rodada 1 — 6 DE (NÃO ALTERAR)
├── research.md           # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/            # Phase 1 output
│   └── auth-api.md
└── tasks.md              # Phase 2 output
```

### Source Code (kpc-frontend)

```text
kpc-frontend/src/
├── views/
│   ├── pages/
│   │   └── LoginView.jsx       # View — componente React puro
│   └── components/
│       ├── TextField.jsx       # UI component
│       ├── Button.jsx          # UI component
│       └── AuthLayout.jsx      # Layout de autenticação
├── viewmodels/
│   ├── stores/
│   │   └── useAuthStore.js     # ViewModel — Zustand store com persist
│   └── hooks/
│       └── useAuth.js          # Hook personalizado conectando View ao Store
├── models/
│   ├── services/
│   │   └── AuthService.js      # Model — serviço HTTP (Axios)
│   └── entities/
│       └── User.js             # Model — entidade de domínio
└── shared/
    └── config.js               # URL base da API
```

---

## ⚠️ Instrução Final para a IA

1. Execute o **Setup** e **Load Context** normalmente (`setup-plan.sh`, ler FEATURE_SPEC, constitution)
2. Preencha todas as seções nativas do template (Technical Context, Constitution Check, Phases)
3. **Durante a Fase 1 (Design)**, **adicionalmente**:
   - Leia `.github/prompts/persona-arquiteto.md` para orientação detalhada
   - Crie os arquivos `.puml` em `specs/<feature>/model/`
   - Garanta rastreabilidade RF → modelo em cada elemento
   - Atualize a seção "📐 Artefatos de Modelagem" acima
4. Complete a **Fase 2 (Tasks)** normalmente via `/speckit.tasks`
5. Execute os **Post-Execution Hooks** normalmente
6. Reporte ao final, incluindo: "📐 Modelagem concluída — diagramas em `specs/<feature>/model/"`