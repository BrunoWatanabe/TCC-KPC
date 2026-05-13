# 🤖 AGENTS.md — Governança do Sistema de Agentes

## 📌 Visão Geral

O sistema de agentes do Spec-Kit utiliza **3 agentes especializados** que trabalham em **coordenação** para manter alinhamento completo entre:

```
Especificação ↔ Modelo ↔ Código ↔ Testes
```

---

## 👥 Os Três Agentes

### 1. 🏗️ Agente Arquiteto

**Localização**: `.github/agents/architect.md`

**Responsabilidades**:
- ✅ Criar especificações formais (spec.md)
- ✅ Criar diagramas UML (PlantUML)
- ✅ Definir rastreabilidade (traceability.md)
- ✅ Revisar conformidade com design

**Entradas**:
- Issue/requisição do usuário
- Feedback de Desenvolvedor
- Validação de QA

**Saídas**:
- spec.md (aprovada)
- 4 diagramas PlantUML
- traceability.md
- Aprovação para Desenvolvimento

**Quando Atua**:
1. Nova feature/requisito chega
2. Revisão de tasks pelo Desenvolvedor
3. Análise de inconsistências do QA

---

### 2. 👨‍💻 Agente Desenvolvedor

**Localização**: `.github/agents/developer.md`

**Responsabilidades**:
- ✅ Criar plano de tarefas (tasks.md)
- ✅ Implementar código com rastreabilidade
- ✅ Criar testes unitários
- ✅ Manter sinergia com especificação

**Entradas**:
- spec.md (aprovada)
- Diagramas UML validados
- Feedback do QA

**Saídas**:
- tasks.md (decomposto)
- Código implementado
- Testes > 80% cobertura
- Pronto para QA

**Quando Atua**:
1. Especificação aprovada
2. Refinamento de tasks
3. Correção de bugs após QA

---

### 3. 🔍 Agente QA

**Localização**: `.github/agents/qa.md`

**Responsabilidades**:
- ✅ Criar testes de aceitação (acceptance.md)
- ✅ Validar alinhamento especificação ↔ código
- ✅ Detectar inconsistências
- ✅ Gerar relatórios de alinhamento

**Entradas**:
- Código implementado (Desenvolvedor)
- Testes passando
- Especificação (Arquiteto)

**Saídas**:
- acceptance.md (cenários BDD)
- alignment-report.md
- Aprovação ou lista de correções

**Quando Atua**:
1. Desenvolvedor marca como "pronto para QA"
2. Validação de alinhamento completa
3. Geração de métricas

---

## 🔄 Ciclo de Coordenação

### Fluxo Completo de Uma Feature

```
┌─────────────────────────────────────────────────────────┐
│ 1. NOVA REQUISIÇÃO CHEGA                                │
│    User → GitHub Issue                                  │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│ 2. ARQUITETO ATUA                                       │
│    ├─ spec.md (RF, RNF, critérios)                      │
│    ├─ 4 diagramas PlantUML                              │
│    ├─ traceability.md (mapeamento)                      │
│    └─ Status: APROVADA                                  │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│ 3. DESENVOLVEDOR PLANEJA                                │
│    ├─ Revisa spec.md                                    │
│    ├─ Cria tasks.md (epics + tasks)                     │
│    ├─ Identifica dependências                           │
│    └─ Status: PLANEJADO                                 │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│ 4. DESENVOLVEDOR IMPLEMENTA                             │
│    ├─ Task 1.1 → Código + Testes                        │
│    ├─ Task 1.2 → Código + Testes                        │
│    ├─ ... (paralelo)                                    │
│    ├─ Testes passando                                   │
│    └─ Status: IMPLEMENTADO                              │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│ 5. QA VALIDA                                            │
│    ├─ acceptance.md (cenários BDD)                      │
│    ├─ Executa testes de aceitação                       │
│    ├─ Analisa alinhamento                               │
│    ├─ Detecta inconsistências                           │
│    ├─ alignment-report.md                               │
│    └─ Status: APROVADO ou CORREÇÃO NECESSÁRIA          │
└────────────────────┬────────────────────────────────────┘
                     ↓
         ┌───────────┴────────────┐
         ↓                        ↓
    APROVADO              CORREÇÃO NECESSÁRIA
     (→ Deploy)           (Volta ao Dev)
                          (Feedback loop)
```

---

## 📋 Matriz de Responsabilidades

| Atividade | Arquiteto | Dev | QA |
|-----------|-----------|-----|-----|
| Criar spec | ✅ | - | - |
| Criar diagrama | ✅ | - | - |
| Revisar spec | ✅ | ✅ | - |
| Criar tasks | - | ✅ | - |
| Implementar | - | ✅ | - |
| Testes unitários | - | ✅ | - |
| Testes aceitação | - | - | ✅ |
| Validar alinhamento | ✅ | ✅ | ✅ |
| Gerar relatório | - | - | ✅ |
| Aprovação final | ✅ | - | ✅ |

---

## 🚦 Estados e Transições

### Estados de Uma Feature

```
RASCUNHO → ANÁLISE → PLANEJAMENTO → IMPLEMENTAÇÃO → VALIDAÇÃO → APROVADO

├─ RASCUNHO
│  └─ Arquiteto criando spec
│
├─ ANÁLISE
│  └─ Arquiteto revisando feedback
│
├─ PLANEJAMENTO
│  └─ Desenvolvedor criando tasks
│
├─ IMPLEMENTAÇÃO
│  └─ Desenvolvedor codificando
│
├─ VALIDAÇÃO
│  └─ QA testando alinhamento
│
└─ APROVADO
   └─ Pronto para deploy/próxima fase
```

---

## 💬 Comunicação Entre Agentes

### Arquiteto → Desenvolvedor

**O Arquiteto fornece**:
```markdown
## Entrega: Especificação de Login (RF001)

- ✅ spec.md completa
- ✅ 4 diagramas validados
- ✅ Rastreabilidade mapeada
- ✅ Status: APROVADA

**Próximos passos**: Criar tasks.md
```

**O Desenvolvedor questiona**:
```markdown
## Dúvida em relação a RF001.2

Na especificação está vago: "senha deve ser segura"

Questão: Devemos usar bcrypt ou argon2?

cc: @Arquiteto
```

### Desenvolvedor → QA

**O Desenvolvedor fornece**:
```markdown
## Entrega: Login (RF001)

- ✅ spec.md referenciada
- ✅ tasks.md completa (6 tasks)
- ✅ Código implementado (4 classes)
- ✅ Testes: 12/12 passando
- ✅ Cobertura: 87%

**Pronto para**: Validação QA
```

### QA → Arquiteto

**O QA relata inconsistência**:
```markdown
## Relatório: Inconsistência detectada

**Feature**: Login (RF001)

**Problema**: 
- spec.md diz: "Email deve ser validado com RFC 5322"
- Código implementou: "Apenas verifica presença de @"

**Status**: BLOQUEANTE

**Ação necessária**: Arquiteto clarificar requisito
cc: @Arquiteto
```

---

## ⚠️ Resolução de Conflitos

### Cenário 1: Ambiguidade em Spec

```
Desenvolvedor: "RF001 é vago. Como implemento?"
                  ↓
          Arquiteto refina spec
                  ↓
         Desenvolvedor continua
```

### Cenário 2: Implementação Diverge

```
QA: "Código não segue o diagrama de classes"
           ↓
  Arquiteto valida se é essencial
           ↓
   Decidir: Mudar spec OU corrigir código
```

### Cenário 3: Teste Falha

```
QA: "Teste de aceitação falhou para RF001"
           ↓
  Desenvolvedor: investigar + corrigir
           ↓
    Repassar para QA validar
```

---

## 📊 Métricas de Governança

### Saúde do Fluxo

| Métrica | Target | Fórmula |
|---------|--------|---------|
| Tempo Spec → Code | < 2 dias | data_start_dev - data_aprovacao |
| Taxa de Alinhamento | > 95% | requisitos_ok / total_requisitos |
| Rework | < 10% | dias_rework / dias_total |
| Cobertura Testes | > 85% | linhas_testadas / linhas_código |
| Tempo Ciclo | < 1 semana | data_final - data_inicio |

---

## 🔗 Artefatos Chave

### Criados pelo Arquiteto

- `.github/agents/architect.md` — Instruções
- `specs/[feature]/spec.md` — Especificação
- `diagrams/[feature]_usecases.puml` — Casos de uso
- `diagrams/[feature]_classes.puml` — Classes
- `diagrams/[feature]_sequence.puml` — Sequência
- `diagrams/[feature]_components.puml` — Componentes
- `specs/[feature]/traceability.md` — Rastreamento

### Criados pelo Desenvolvedor

- `.github/agents/developer.md` — Instruções
- `specs/[feature]/tasks.md` — Decomposição
- `src/modulo/classe.py` — Implementação
- `tests/test_modulo.py` — Testes unitários

### Criados pelo QA

- `.github/agents/qa.md` — Instruções
- `specs/[feature]/acceptance.md` — Testes BDD
- `qa/reports/[feature]-alignment-report.md` — Relatório

---

## 🎯 Integração com GitHub

### Labels para Rastreamento

```
- [spec] Especificação em progresso
- [dev] Desenvolvimento em progresso
- [qa] Validação em progresso
- [approved] Aprovado para deploy
- [blocked] Bloqueado por inconsistência
- [ready-for-dev] Pronto para desenvolvimento
- [ready-for-qa] Pronto para validação
```

### Workflow Automático

```yaml
trigger: Pull Request

jobs:
  - Validar spec.md existe ✅
  - Executar testes ✅
  - Verificar cobertura > 85% ✅
  - Validar rastreabilidade ✅
  - Gerar relatório ✅
```

---

## 🚀 Escalabilidade

### 1 Feature

```
Arquiteto (1 dia) → Dev (3 dias) → QA (1 dia) = 5 dias
```

### Múltiplas Features (Paralelo)

```
F1: Arquiteto (1) → Dev (3) → QA (1)
F2:              ↓ Arquiteto (1) → Dev (3) → QA (1)
F3:                           ↓ Arquiteto (1) → Dev (3) → QA (1)

Tempo total: ~9 dias (em paralelo)
```

---

## ✅ Checklist de Implementação

- [ ] 3 agentes documentados (.md)
- [ ] Fluxo de coordenação definido
- [ ] Matriz de responsabilidades clara
- [ ] Estados e transições documentados
- [ ] Comunicação entre agentes padronizada
- [ ] Resolução de conflitos definida
- [ ] Métricas de saúde estabelecidas
- [ ] Integração GitHub Actions configurada
- [ ] Labels de rastreamento criados
- [ ] Exemplo prático testado

---

## 🔗 Referências

- Plano completo: `plano-de-acao-speck-kit.txt`
- Framework overview: `SPEC-KIT-README.md`
- Agente Arquiteto: `.github/agents/architect.md`
- Agente Desenvolvedor: `.github/agents/developer.md`
- Agente QA: `.github/agents/qa.md`
- Instruções Globais: `copilot-instructions.md`

---

**Versão**: 1.0  
**Data**: Mai 2026  
**Status**: Ativo
