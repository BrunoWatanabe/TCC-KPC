---
description: "Override do plano de implementação — Mescla o fluxo nativo do Spec-Kit com a Persona Arquiteto para garantir que toda sprint produza modelos PlantUML rastreáveis."
agent: speckit.plan.override
extends: speckit.plan
---

# Implementation Plan: Login Component (Sprint 01) — Com Modelagem Arquitetural 🏗️

**Branch**: `001-login-component` | **Date**: 2026-06-19 | **Spec**: `specs/001-login-component/spec.md`

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

Implementar o componente de Login do sistema KPC (Keyphrase Curation) seguindo a arquitetura MVVM no frontend React 18 + TypeScript + Vite. O componente deve consumir o endpoint `POST /users/login` do backend FastAPI, autenticar o usuário, persistir o token via Zustand com middleware `persist` em localStorage, e redirecionar para a rota `/topics`. Abordagem técnica: View pura (React funcional sem lógica), ViewModel (Zustand store com persist), Model (AuthService + entidade User + config compartilhada).

## Technical Context

**Language/Version**: TypeScript 5.x, React 18+, Vite 5.x

**Primary Dependencies**: Material UI 5 (TextField, Button, Alert, CircularProgress, AuthLayout), Zustand 4.x com middleware `persist`, Axios 1.x, React Router 6.x, TypeScript 5.x

**Modeling Tool**: PlantUML (diagramas em `specs/001-login-component/model/`)

**Storage**: localStorage via Zustand `persist` middleware (token JWT + dados do User)

**Testing**: Vitest + React Testing Library (planejado para sprint futura)

**Target Platform**: Navegador (frontend web — Chrome, Firefox, Edge)

**Project Type**: Frontend application MVVM (React + TypeScript)

**Performance Goals**: Login completo em < 10s (preenchimento + latência de rede)

**Constraints**: 
- Arquitetura MVVM com camadas rigidamente separadas (CONST-R4)
- Rastreabilidade obrigatória RF ↔ modelo ↔ código (CONST-R3)
- Zero over-engineering — apenas o que está modelado (CONST-R2)

**Scale/Scope**: Sprint 01 — componente de login individual, sem dashboard ou outras telas

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Justificativa |
|------|--------|---------------|
| **GATE-01 — Planejamento Obrigatório** | ✅ APROVADO | `/speckit.specify` já executado. Spec em `specs/001-login-component/spec.md` com RF-001 a RF-010. `/speckit.plan` em execução — diagramas serão gerados na Fase 1. |
| **GATE-02 — Análise Pré-Merge** | ⏳ N/A (pós-implementação) | Será verificado após implementação via `/speckit.analyze`. |
| **GATE-03 — Over-engineering Bloqueia Merge** | ⏳ N/A (pós-implementação) | Será verificado pelo pipeline Polícia + Juiz. |

**Princípios Constitucionais Aplicáveis**:
- ✅ **CONST-R1 — MDE+SDD First**: Spec existe, modelagem ocorrerá na Fase 1
- ✅ **CONST-R2 — Zero Over-Engineering**: Tasks serão limitadas ao modelado
- ✅ **CONST-R3 — Rastreabilidade Obrigatória**: Tags `@rf:` nos diagramas, `// @model:` no código
- ✅ **CONST-R4 — Arquitetura MVVM**: Três camadas separadas conforme spec
- ✅ **CONST-R5 — Pipeline de Verificação**: Será executado após implementação
- ✅ **CONST-R6 — Constituição como Árbitro Final**: Conflitos resolvidos por esta carta

---

## 📐 Artefatos de Modelagem (Override — Persona Arquiteto)

Esta seção é **adicional** ao template nativo. Ela documenta os artefatos PlantUML que serão gerados durante a Fase 1 (Design).

### Diagramas Planejados

| Diagrama | Arquivo | RFs Cobertos | Descrição |
|----------|---------|--------------|-----------|
| Classes | `specs/001-login-component/model/login-classes.puml` | RF-001 a RF-010 | Estrutura MVVM: View (LoginView), ViewModel (useAuthStore), Model (AuthService, User) |
| Componentes | `specs/001-login-component/model/login-components.puml` | RF-001, RF-003, RF-004 | Organização dos componentes React e dependências entre camadas |
| Sequência | `specs/001-login-component/model/login-sequence.puml` | RF-001, RF-005, RF-006, RF-007, RF-008 | Fluxo completo de autenticação: formulário → store → API → persist → redirect |

### Rastreabilidade RF → Modelo

| RF | Elemento Modelado | Diagrama |
|----|-------------------|----------|
| RF-001 | `LoginView`, `useAuthStore`, `AuthService` | login-classes.puml, login-components.puml |
| RF-002 | Validação client-side em `LoginView` | login-classes.puml |
| RF-003 | `loading` state + disabled props | login-classes.puml, login-sequence.puml |
| RF-004 | Botão com "Entrando..." | login-classes.puml, login-sequence.puml |
| RF-005 | `AuthService.login()` → POST `/users/login` | login-classes.puml, login-sequence.puml |
| RF-006 | Zustand persist (localStorage) | login-classes.puml, login-sequence.puml |
| RF-007 | Redirecionamento para `/topics` | login-sequence.puml |
| RF-008 | Tratamento de erro com Alert MUI | login-classes.puml, login-sequence.puml |
| RF-009 | Verificação de token na inicialização | login-sequence.puml |
| RF-010 | Campo password do tipo password | login-classes.puml |

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
├── spec.md               # Especificação funcional
├── plan.md               # Este arquivo (output do /speckit.plan)
├── model/                # 📐 Artefatos de modelagem (Persona Arquiteto)
│   ├── login-classes.puml
│   ├── login-components.puml
│   └── login-sequence.puml
├── research.md           # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/            # Phase 1 output
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