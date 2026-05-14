# 🚀 Spec-Kit Framework — README

## 📌 Visão Geral

O **Spec-Kit** é um framework experimental para Spec-Driven Development (SDD) integrado com Model-Driven Engineering (MDE), utilizando agentes assistidos por IA para manter o alinhamento entre:

```
especificação ↔ modelo ↔ código ↔ testes
```

## 🎯 Objetivos do Projeto

- Explorar metodologias de desenvolvimento dirigido por especificação
- Integrar modelagem (PlantUML) com implementação
- Automatizar avaliação de alinhamento entre artefatos
- Medir qualidade arquitetural através de métricas quantitativas
- Demonstrar valor de agentes especializados no desenvolvimento

## 🧠 Metodologia Core

### Ciclo de Desenvolvimento Integrado

```
Issue → Especificação → Modelo → Implementação → Testes → Validação QA → Relatório
```

### Agentes Especializados

| Agente | Responsabilidade |
|--------|-----------------|
| **Arquiteto** | Cria especificações, modela diagramas, define rastreabilidade |
| **Desenvolvedor** | Implementa código, cria testes, garante aderência |
| **QA** | Valida alinhamento, detecta inconsistências, gera relatórios |

## 📂 Estrutura do Framework

```
TCC-KPC/
├── specs/                    # Especificações SDD
├── diagrams/                 # Diagramas PlantUML
├── .github/
│   └── agents/              # Configuração de agentes GitHub Copilot
├── qa/
│   └── reports/             # Relatórios de QA e alinhamento
├── docs/                    # Documentação do framework
├── kpc-backend/             # Backend da aplicação
├── kpc-frontend/            # Frontend da aplicação
└── launcher/                # Scripts de inicialização
```

## 🔧 Configuração do Ambiente

### Requisitos

- [x] Java 17+
- [x] PlantUML
- [x] Graphviz
- [x] VS Code
- [x] GitHub Copilot

### Setup Inicial

1. Clonar repositório
2. Instalar dependências:
   ```bash
   cd kpc-backend && pip install -r requirements.txt
   cd kpc-frontend && npm install
   ```
3. Executar launcher:
   ```bash
   ./launcher/start.sh
   ```

## 📋 Artefatos do Spec-Kit

### Templates Disponíveis

- **spec.md** — Especificação formal de requisitos
- **tasks.md** — Decomposição em tarefas implementáveis
- **acceptance.md** — Critérios de aceitação e testes
- **traceability.md** — Rastreabilidade entre artefatos

## 🚀 Fases do Projeto

### FASE 1: Estrutura Inicial ✅
- [x] Criar estrutura de diretórios
- [x] Configurar ambiente
- [x] Criar README
- [x] Criar templates

**Documentação**: [docs/FASE1_ESTRUTURA.md](docs/FASE1_ESTRUTURA.md)

### FASE 2: Sistema de Agentes ✅
Estruturar agentes especializados (Arquiteto, Desenvolvedor, QA)

**Documentação**: [docs/FASE2_AGENTES.md](docs/FASE2_AGENTES.md)

### FASE 3: Integração SDD + MDE ✅
Integrar especificações com modelagem formal (4 modelos PlantUML, convenções de rastreabilidade, padrões de nomenclatura)

**Documentação**: [docs/FASE3_INTEGRACAO.md](docs/FASE3_INTEGRACAO.md)

### FASE 4: Fluxo Completo de Desenvolvimento ⏳
Executar ciclo completo da metodologia com exemplo real

### FASE 5: Métricas de Alinhamento ✅
Transformar alinhamento em métricas mensuráveis (Cobertura, Precisão, Divergência, Over-Eng, Score Geral)

**Documentação**: [docs/FASE5_METRICAS.md](docs/FASE5_METRICAS.md)  
**Técnico**: [METRICAS-ALINHAMENTO.md](METRICAS-ALINHAMENTO.md)

### FASE 6: Pesquisa Experimental ⏳
Avaliar cientificamente a metodologia

### FASE 7: Automação ⏳
Automatizar análise com GitHub Actions

### FASE 8: Dashboard e Visualização ⏳
Visualizar evolução do alinhamento

### FASE 9: Consolidação Científica ⏳
Transformar em pesquisa/publicação

## 📊 Métricas Principais

- **Cobertura do Modelo**: elementos implementados / elementos modelados
- **Precisão da Implementação**: implementações corretas / implementações totais
- **Divergência Semântica**: detecção de regras quebradas
- **Over-Engineering**: código sem representação no modelo
- **Score Geral de Alinhamento**: combinação das métricas acima

## 📐 Convenções e Padrões do Framework

### Modelos e Diagramas
- **MODELS.md** — Definição dos 4 modelos PlantUML oficiais (Use Cases, Classes, Sequence, Components)

### Rastreabilidade
- **TRACEABILITY-CONVENTIONS.md** — Como criar rastreabilidade bidirecional entre Requisitos ↔ Modelo ↔ Código ↔ Teste

### Nomenclatura
- **NAMING-CONVENTIONS.md** — Padrões de nomeação (RF001 → UserService.authenticate())

### Métricas
- **METRICAS-ALINHAMENTO.md** — Definição técnica das 5 métricas de alinhamento com exemplos

## 📚 Documentação

### Fases do Projeto
Cada fase possui documentação específica em `docs/`:

- [docs/FASE1_ESTRUTURA.md](docs/FASE1_ESTRUTURA.md) — Detalhes de estrutura
- [docs/FASE2_AGENTES.md](docs/FASE2_AGENTES.md) — Configuração de agentes
- [docs/FASE3_INTEGRACAO.md](docs/FASE3_INTEGRACAO.md) — Integração SDD + MDE
- [docs/FASE5_METRICAS.md](docs/FASE5_METRICAS.md) — Métricas de alinhamento

### Sistema de Agentes
- [AGENTS.md](AGENTS.md) — Governança e coordenação dos agentes
- [.github/agents/architect.md](.github/agents/architect.md) — Instruções do Agente Arquiteto
- [.github/agents/developer.md](.github/agents/developer.md) — Instruções do Agente Desenvolvedor
- [.github/agents/qa.md](.github/agents/qa.md) — Instruções do Agente QA
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — Instruções globais para GitHub Copilot

### Padrões e Convenções
- [MODELS.md](MODELS.md) — Modelos PlantUML oficiais
- [TRACEABILITY-CONVENTIONS.md](TRACEABILITY-CONVENTIONS.md) — Convenções de rastreabilidade
- [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md) — Padrões de nomenclatura

### Métricas
- [METRICAS-ALINHAMENTO.md](METRICAS-ALINHAMENTO.md) — Documentação técnica das métricas

## 🔗 Integração com Projeto Existente

Este framework é integrado ao projeto KPC (Keyphrase Curation Platform):

- **Backend**: Python + Flask/FastAPI
- **Frontend**: TypeScript + React/MVVM
- **Suporte**: PlantUML para diagramas arquiteturais

## 📧 Contato e Contribuições

Projeto acadêmico - TCC (Trabalho de Conclusão de Curso)

---

**Última atualização**: Mai 2026  
**Status**: FASE 5 — Métricas de Alinhamento ✅ COMPLETA  
**Próxima**: FASE 6 — Pesquisa Experimental
