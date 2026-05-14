# ✅ Testes de Aceitação — [NOME_DA_FEATURE]

## 📌 Informações Básicas

| Campo | Valor |
|-------|-------|
| **Especificação Relacionada** | RF001 |
| **Feature** | [Nome da feature] |
| **Total de Cenários** | N |
| **Data de Criação** | YYYY-MM-DD |
| **Responsável** | [Nome do QA] |

---

## 🎯 Objetivo

Definir testes de aceitação que validam se a implementação está alinhada com os requisitos da especificação.

---

## 🧪 Cenários de Testes

### Cenário 1: [Descrição do Cenário]

**Requisito Relacionado**: RF1.1

**Pré-condições**:
- [ ] [Condição 1]
- [ ] [Condição 2]

**Passos de Execução**:
1. [Ação 1]
2. [Ação 2]
3. [Ação 3]

**Resultado Esperado**:
- [ ] [Verificação 1]
- [ ] [Verificação 2]
- [ ] [Verificação 3]

**Status**: ⭕ Não Testado / ✅ Passou / ❌ Falhou

**Notas**: [Observações durante execução]

---

### Cenário 2: [Descrição do Cenário]

**Requisito Relacionado**: RF1.1

**Pré-condições**:
- [ ] [Condição 1]
- [ ] [Condição 2]

**Passos de Execução**:
1. [Ação 1]
2. [Ação 2]

**Resultado Esperado**:
- [ ] [Verificação 1]
- [ ] [Verificação 2]

**Status**: ⭕ Não Testado / ✅ Passou / ❌ Falhou

**Notas**: [Observações]

---

### Cenário 3: [Descrição do Cenário]

**Requisito Relacionado**: RF1.2

**Pré-condições**:
- [ ] [Condição 1]

**Passos de Execução**:
1. [Ação 1]
2. [Ação 2]

**Resultado Esperado**:
- [ ] [Verificação 1]
- [ ] [Verificação 2]

**Status**: ⭕ Não Testado / ✅ Passou / ❌ Falhou

**Notas**: [Observações]

---

## 📊 Tabela de Cobertura

| Requisito | Cenário | Status | Cobertura |
|-----------|---------|--------|-----------|
| RF1.1 | 1, 2 | ✅ | 100% |
| RF1.2 | 3 | ⭕ | 50% |
| RNF1 | - | ⭕ | 0% |

---

## 🔄 Fluxo de Teste BDD (Cucumber)

### Feature: [Nome da Feature]

```gherkin
Funcionalidade: [Descrição da Funcionalidade]
  Como um [tipo de usuário]
  Quero [ação]
  Para que [benefício]

  Cenário: [Descrição do Cenário]
    Dado que [pré-condição]
    Quando [ação]
    Então [resultado esperado]
    E [resultado adicional]

  Cenário: [Descrição do Cenário 2]
    Dado que [pré-condição]
    Quando [ação]
    Então [resultado esperado]
```

**Arquivo**: `tests/acceptance/[FEATURE_NAME].feature`

---

## 🧬 Testes Automáticos

### Setup do Teste

```python
# tests/acceptance/test_acceptance_[FEATURE_NAME].py

import pytest

@pytest.fixture
def setup():
    # Preparar dados/ambiente
    yield
    # Limpeza

class TestAcceptance:
    def test_scenario_1(self, setup):
        # Arrange
        # Act
        # Assert
        pass
    
    def test_scenario_2(self, setup):
        # Arrange
        # Act
        # Assert
        pass
```

---

## ✅ Checklist de Testes

- [ ] Todos os cenários identificados
- [ ] Todos os cenários executados
- [ ] Todos os cenários passando
- [ ] Cobertura de requisitos 100%
- [ ] Testes automáticos implementados
- [ ] Relatório de testes gerado

---

## 📋 Relatório de Execução

### Resumo Geral

| Métrica | Valor |
|---------|-------|
| **Total de Cenários** | N |
| **Cenários Passando** | M |
| **Cenários Falhando** | K |
| **Taxa de Aprovação** | M/N % |
| **Data de Execução** | YYYY-MM-DD |

---

### Detalhes de Falhas (se houver)

#### Falha 1: [Descrição]

**Cenário**: [Cenário que falhou]

**Erro**:
```
Mensagem de erro aqui
```

**Causa Raiz**:
[Análise do problema]

**Ação Corretiva**:
- [ ] [Ação 1]
- [ ] [Ação 2]

---

## 🔗 Referências

- **Especificação**: `spec.md`
- **Tarefas**: `tasks.md`
- **Rastreabilidade**: `traceability.md`

---

**Data de Atualização**: YYYY-MM-DD  
**Versão**: 1.0
