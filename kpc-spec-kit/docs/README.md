# 🤖 KPC Spec-Kit Framework

Framework experimental para **Spec-Driven Development (SDD)** integrado com **Model-Driven Engineering (MDE)**.

Mantém alinhamento completo entre:

```
Especificação ↔ Modelo ↔ Código ↔ Testes
```

---

## 📁 Estrutura

```
kpc-spec-kit/
├── README.md                        # Este arquivo
├── SPEC-KIT-README.md              # Overview completo do framework
├── STATUS-PROJETO.md               # Status detalhado de todas as FASES
├── AGENTS.md                       # Governança do sistema de agentes
├── .github/copilot-instructions.md  # Instruções para GitHub Copilot
│
├── MODELS.md                       # 4 modelos PlantUML oficiais
├── TRACEABILITY-CONVENTIONS.md    # Convenções de rastreabilidade
├── NAMING-CONVENTIONS.md          # Padrões de nomenclatura
├── METRICAS-ALINHAMENTO.md        # Métricas de alinhamento
│
├── .github/agents/
│   ├── architect.md                # Instruções Agente Arquiteto
│   ├── developer.md                # Instruções Agente Desenvolvedor
│   └── qa.md                       # Instruções Agente QA
│
├── specs/
│   └── templates/                  # Templates reutilizáveis
│       ├── spec.md                 # Template de especificação
│       ├── tasks.md                # Template de tarefas
│       ├── acceptance.md           # Template de testes
│       └── traceability.md         # Template de rastreamento
│
├── diagrams/                       # Diagramas PlantUML
├── qa/reports/                     # Relatórios QA e alinhamento
│
└── docs/
    ├── FASE1_ESTRUTURA.md          # Documentação FASE 1
    ├── FASE2_AGENTES.md            # Documentação FASE 2
    ├── FASE3_INTEGRACAO.md         # Documentação FASE 3
    └── FASE5_METRICAS.md           # Documentação FASE 5
```

---

## 🚀 Quick Start

### 1. Criar Especificação

```bash
cp .specify/templates/kpc-spec-initial.md specs/[feature-name]/spec.md
# Editar com requisitos, diagramas, etc.
```

### 2. Criar Plano de Tarefas

```bash
cp .specify/templates/kpc-tasks-initial.md specs/[feature-name]/tasks.md
# Decompor em epics e tasks
```

### 3. Implementar

Seguir instruções em `.github/agents/developer.md`

### 4. Validar

Seguir instruções em `.github/agents/qa.md`

---

## 📖 Documentação

- **[SPEC-KIT-README.md](SPEC-KIT-README.md)** — Overview completo do framework
- **[AGENTS.md](AGENTS.md)** — Governança e coordenação de agentes
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** — Instruções para Copilot
- **[docs/FASE1_ESTRUTURA.md](docs/FASE1_ESTRUTURA.md)** — Detalhes FASE 1
- **[docs/FASE2_AGENTES.md](docs/FASE2_AGENTES.md)** — Detalhes FASE 2

---

## 🤖 Agentes

### 🏗️ Arquiteto
Criar especificações, diagramas, rastreabilidade  
→ Leia: `.github/agents/architect.md`

### 👨‍💻 Desenvolvedor
Implementar, testar, manter sincronismo  
→ Leia: `.github/agents/developer.md`

### 🔍 QA
Validar alinhamento, gerar relatórios  
→ Leia: `.github/agents/qa.md`

---

## 🔗 Integração com KPC

Este framework é integrado ao projeto **Keyphrase Curation Platform (KPC)**:

- Backend: `/kpc-backend`
- Frontend: `/kpc-frontend`
- Spec-Kit: `/kpc-spec-kit` (este diretório)

---

**Versão**: 1.0  
**Status**: Ativo (FASE 2 Completa)  
**Próxima**: FASE 3 — Integração SDD + MDE
