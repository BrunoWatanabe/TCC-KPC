# 🏗️ TCC-KPC — Keyphrase Curation Platform + Spec-Kit Framework

## 📁 Estrutura do Projeto

```
TCC-KPC/
├── 🎯 kpc-backend/              # Backend da plataforma KPC (Python/Flask)
├── 🎨 kpc-frontend/             # Frontend da plataforma KPC (TypeScript/React)
├── 🤖 kpc-spec-kit/             # Framework SDD + MDE (Spec-Kit) ← NOVO
├── 🚀 launcher/                 # Scripts de inicialização
├── 📝 package.json              # Configuração do projeto raiz
├── 📋 plano-de-acao-speck-kit.txt  # Plano completo do framework
└── 📂 src-mvvm/                 # Código MVVM (parte do frontend)
```

---

## 🤖 Estrutura Interna: kpc-spec-kit/

```
kpc-spec-kit/
├── 📖 README.md                 # Overview do Spec-Kit
├── 📖 SPEC-KIT-README.md       # Documentação completa do framework
├── 🎛️ AGENTS.md                # Governança dos agentes
├── 🛠️ copilot-instructions.md   # Instruções para GitHub Copilot
│
├── 🏗️ .github/agents/
│   ├── architect.md             # Agente Arquiteto
│   ├── developer.md             # Agente Desenvolvedor
│   └── qa.md                    # Agente QA
│
├── 📋 specs/
│   └── templates/
│       ├── spec.md              # Template de especificação
│       ├── tasks.md             # Template de tarefas
│       ├── acceptance.md        # Template de testes BDD
│       └── traceability.md      # Template de rastreamento
│
├── 📊 diagrams/                 # Diagramas PlantUML (será preenchido)
├── 📈 qa/reports/               # Relatórios QA (será preenchido)
│
└── 📚 docs/
    ├── FASE1_ESTRUTURA.md       # Documentação FASE 1
    └── FASE2_AGENTES.md         # Documentação FASE 2
```

---

## 🚀 Como Começar

### 1. Entender o Framework

```bash
cd kpc-spec-kit
cat README.md                    # Overview rápido
cat SPEC-KIT-README.md          # Documentação completa
```

### 2. Explorar Agentes

```bash
# Agente Arquiteto
cat .github/agents/architect.md

# Agente Desenvolvedor
cat .github/agents/developer.md

# Agente QA
cat .github/agents/qa.md
```

### 3. Usar Templates

```bash
# Criar nova feature
mkdir -p kpc-spec-kit/specs/[feature-name]
cp kpc-spec-kit/specs/templates/spec.md \
   kpc-spec-kit/specs/[feature-name]/

# Editar com seus requisitos
```

### 4. Governança

```bash
# Entender como agentes trabalham juntos
cat kpc-spec-kit/AGENTS.md

# Instruções para Copilot
cat kpc-spec-kit/copilot-instructions.md
```

---

## 🔄 Fluxo de Desenvolvimento

```
1. CRIAR ISSUE
   ↓
2. ARQUITETO (kpc-spec-kit)
   ├─ Criar spec.md
   ├─ Criar diagramas PlantUML
   └─ Criar traceability.md
   ↓
3. DESENVOLVEDOR (kpc-backend ou kpc-frontend)
   ├─ Criar tasks.md
   ├─ Implementar com rastreabilidade
   └─ Criar testes
   ↓
4. QA (kpc-spec-kit)
   ├─ Criar acceptance.md
   ├─ Validar alinhamento
   └─ Gerar alignment-report.md
   ↓
5. ✅ APROVADO
```

---

## 📊 Fases de Implementação

| Fase | Status | Documentação |
|------|--------|--------------|
| 🧱 FASE 1: Estrutura | ✅ Completa | [kpc-spec-kit/docs/FASE1_ESTRUTURA.md](kpc-spec-kit/docs/FASE1_ESTRUTURA.md) |
| 🤖 FASE 2: Agentes | ✅ Completa | [kpc-spec-kit/docs/FASE2_AGENTES.md](kpc-spec-kit/docs/FASE2_AGENTES.md) |
| 🧩 FASE 3: SDD + MDE | ⏳ Próxima | [kpc-spec-kit/plano-de-acao-speck-kit.txt](plano-de-acao-speck-kit.txt) |
| ... | ⏳ Futuras | Veja plano completo |

---

## 🔗 Referências Rápidas

- **Framework Overview**: [kpc-spec-kit/README.md](kpc-spec-kit/README.md)
- **Documentação Completa**: [kpc-spec-kit/SPEC-KIT-README.md](kpc-spec-kit/SPEC-KIT-README.md)
- **Governança**: [kpc-spec-kit/AGENTS.md](kpc-spec-kit/AGENTS.md)
- **Plano Completo**: [plano-de-acao-speck-kit.txt](plano-de-acao-speck-kit.txt)

---

## 🎯 Próximos Passos

### Para Usar o Framework

1. Ler [kpc-spec-kit/README.md](kpc-spec-kit/README.md)
2. Estudar [kpc-spec-kit/AGENTS.md](kpc-spec-kit/AGENTS.md)
3. Usar templates em `kpc-spec-kit/specs/templates/`
4. Seguir instruções de cada agente

### Para Implementar FASE 3

Ver [plano-de-acao-speck-kit.txt](plano-de-acao-speck-kit.txt)

---

**Versão**: 1.0  
**Data**: Mai 2026  
**Status**: FASE 2 Completa, Pronto para Uso
