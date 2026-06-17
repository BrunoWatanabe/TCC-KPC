---
description: "Override do plano de implementação — Mescla o fluxo nativo do Spec-Kit com a Persona Arquiteto para garantir que toda sprint produza modelos PlantUML rastreáveis."
agent: speckit.plan.override
extends: speckit.plan
---

# Implementation Plan: [FEATURE] — Com Modelagem Arquitetural 🏗️

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

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

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: [e.g., TypeScript 5.x, React 18+]

**Primary Dependencies**: [e.g., Material UI, React Router, Axios]

**Modeling Tool**: PlantUML (diagramas em `specs/<feature>/model/`)

**Storage**: [if applicable]

**Testing**: [e.g., Vitest, Playwright]

**Target Platform**: Navegador (frontend web)

**Project Type**: Frontend application

**Performance Goals**: [domain-specific]

**Constraints**: [domain-specific]

**Scale/Scope**: [domain-specific]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## 📐 Artefatos de Modelagem (Override — Persona Arquiteto)

Esta seção é **adicional** ao template nativo. Ela documenta os artefatos PlantUML que serão gerados durante a Fase 1 (Design).

### Diagramas Planejados

| Diagrama | Arquivo | RFs Cobertos | Descrição |
|----------|---------|--------------|-----------|
| Classes | `specs/<feature>/model/classes.puml` | RF-001, RF-002 | Estrutura de componentes da UI |
| Componentes | `specs/<feature>/model/components.puml` | RF-001, RF-003 | Organização dos componentes React |
| Sequência | `specs/<feature>/model/sequences.puml` | RF-002 | Fluxo de interação do usuário |

### Rastreabilidade RF → Modelo

| RF | Elemento Modelado | Diagrama |
|----|-------------------|----------|
| RF-001 | `LoginPage`, `LoginForm` | classes.puml, components.puml |
| RF-002 | Fluxo de autenticação | sequences.puml |
| RF-003 | `Dashboard` | components.puml |

### Regras Aplicadas

- ✅ **R1 — Fidelidade à Spec**: Todos os elementos modelados têm RF correspondente na spec
- ✅ **R2 — Rastreabilidade**: Tags `@rf:` serão inseridas em cada elemento
- ✅ **R4 — Simplicidade**: Apenas o necessário para cobrir os RFs da sprint

---

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── spec.md               # Especificação funcional
├── plan.md               # Este arquivo (output do /speckit.plan)
├── model/                # 📐 Artefatos de modelagem (Persona Arquiteto)
│   ├── classes.puml
│   ├── components.puml
│   └── sequences.puml
├── research.md           # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/            # Phase 1 output
└── tasks.md              # Phase 2 output
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
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