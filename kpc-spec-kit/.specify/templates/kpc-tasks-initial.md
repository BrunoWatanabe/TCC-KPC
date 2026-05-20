# 📝 Decomposição em Tarefas — [NOME_DA_FEATURE]

## 📌 Informações Básicas

| Campo | Valor |
|-------|-------|
| **Especificação Relacionada** | RF001 |
| **Feature** | [Nome da feature] |
| **Total de Tarefas** | N |
| **Data de Criação** | YYYY-MM-DD |
| **Responsável** | [Nome do Desenvolvedor] |

---

## 🎯 Objetivo

Decompor a especificação em tarefas menores, implementáveis e testáveis.

As tasks devem ser pequenas o suficiente para caber em um ciclo de sprint e gerar commits validáveis pelo QA.

---

## 📋 Estrutura de Tarefas

### Epic: [Nome do Epic]

**Descrição**: [Descrição breve do Epic]

---

#### Task 1.1: [Descrição Breve]

**Dependências**:
- [ ] Nenhuma / Task anterior

**Estimativa**: [X horas/dias]

**Arquivos a Criar/Modificar**:
- `src/modulo/arquivo.py`
- `tests/modulo/arquivo_test.py`

**Passos de Implementação**:
1. Criar estrutura base da classe/função
2. Implementar lógica principal
3. Adicionar validações de entrada
4. Implementar testes unitários
5. Documentar comportamento
6. Garantir que o incremento fique pronto para validação do QA

**Critérios de Aceitação**:
- [ ] Função implementada corretamente
- [ ] Testes passando com cobertura > 80%
- [ ] Código revisado
- [ ] Documentação completa
- [ ] Commit pronto para validação do QA

**Notas**:
[Insira notas ou contexto importante]

---

#### Task 1.2: [Descrição Breve]

**Dependências**:
- [ ] Task 1.1

**Estimativa**: [X horas/dias]

**Arquivos a Criar/Modificar**:
- `src/modulo/arquivo.py`
- `tests/modulo/arquivo_test.py`

**Passos de Implementação**:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Critérios de Aceitação**:
- [ ] Critério 1
- [ ] Critério 2

---

#### Task 1.3: [Descrição Breve]

**Dependências**:
- [ ] Task 1.1
- [ ] Task 1.2

**Estimativa**: [X horas/dias]

**Arquivos a Criar/Modificar**:
- `src/modulo/arquivo.py`
- `tests/modulo/arquivo_test.py`

**Passos de Implementação**:
1. [Passo 1]
2. [Passo 2]

**Critérios de Aceitação**:
- [ ] Critério 1
- [ ] Critério 2

---

### Epic: [Nome do Epic 2]

**Descrição**: [Descrição breve do Epic]

---

#### Task 2.1: [Descrição Breve]

**Dependências**:
- [ ] Task 1.3

**Estimativa**: [X horas/dias]

**Arquivos a Criar/Modificar**:
- `src/modulo/arquivo.py`
- `tests/modulo/arquivo_test.py`

**Passos de Implementação**:
1. [Passo 1]
2. [Passo 2]

**Critérios de Aceitação**:
- [ ] Critério 1
- [ ] Critério 2

---

## 📊 Resumo de Tarefas

| Task | Descrição | Deps | Estimativa | Status |
|------|-----------|------|-----------|--------|
| 1.1 | [Desc] | - | X h | ⭕ |
| 1.2 | [Desc] | 1.1 | X h | ⭕ |
| 1.3 | [Desc] | 1.1, 1.2 | X h | ⭕ |
| 2.1 | [Desc] | 1.3 | X h | ⭕ |

**Total Estimado**: X horas

---

## 🔄 Sequência de Implementação

```
Task 1.1
  ↓
Task 1.2 + Task 1.3 (paralelo)
  ↓
Task 2.1
  ↓
Testes de Integração
  ↓
Validação QA
```

Se a feature for experimental, a sequência deve preservar a relação com os grupos de métricas do protocolo e com o bloqueio de merge quando houver inconsistências.

---

## 🧪 Testes Associados

### Testes Unitários

- `tests/modulo/test_task_1_1.py`
- `tests/modulo/test_task_1_2.py`
- `tests/modulo/test_task_1_3.py`
- `tests/modulo/test_task_2_1.py`

### Testes de Integração

- `tests/integracao/test_[FEATURE_NAME]_integration.py`

---

## ✅ Checklist de Conclusão

- [ ] Todas as tasks implementadas
- [ ] Todos os testes passando
- [ ] Cobertura de testes > 80%
- [ ] Código revisado
- [ ] Documentação atualizada
- [ ] QA validou alinhamento com especificação
- [ ] Incrementos compatíveis com o fluxo por commit/sprint

---

## 🔗 Referências

- **Especificação**: `spec.md`
- **Testes de Aceitação**: `acceptance.md`
- **Rastreabilidade**: `traceability.md`

---

**Data de Atualização**: YYYY-MM-DD  
**Versão**: 1.0
