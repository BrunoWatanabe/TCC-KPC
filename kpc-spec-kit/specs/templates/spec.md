# 📋 Especificação — [NOME_DA_FEATURE]

## 📌 Informações Básicas

| Campo | Valor |
|-------|-------|
| **Identificador** | RF001 |
| **Título** | [Descrição breve do requisito] |
| **Versão** | 1.0 |
| **Data de Criação** | YYYY-MM-DD |
| **Status** | Rascunho / Revisão / Aprovado |
| **Prioridade** | Alta / Média / Baixa |
| **Responsável** | [Nome do Arquiteto] |

---

## 🎯 Objetivo

Descrever claramente o que deve ser implementado e por quê.

[Insira descrição detalhada do objetivo]

---

## 📋 Requisitos Funcionais

### RF1.1 — [Descrição Breve]

**Descrição**: 
O sistema deve [comportamento esperado].

**Critérios de Aceitação**:
- [ ] Dado [contexto], quando [ação], então [resultado]
- [ ] Dado [contexto], quando [ação], então [resultado]
- [ ] Dado [contexto], quando [ação], então [resultado]

**Prioridade**: Alta

---

### RF1.2 — [Descrição Breve]

**Descrição**: 
O sistema deve [comportamento esperado].

**Critérios de Aceitação**:
- [ ] Dado [contexto], quando [ação], então [resultado]
- [ ] Dado [contexto], quando [ação], então [resultado]

**Prioridade**: Média

---

## 🔒 Requisitos Não-Funcionais

### RNF1 — Performance

O sistema deve [requisito de performance].

- **Métrica**: [o que medir]
- **Limite**: [valor aceitável]
- **Justificativa**: [por quê]

---

### RNF2 — Segurança

O sistema deve [requisito de segurança].

- **Tipo**: [Autenticação / Autorização / Criptografia / etc]
- **Padrão**: [padrão a seguir]

---

### RNF3 — Usabilidade

O sistema deve [requisito de usabilidade].

---

## 🎨 Modelos e Diagramas

### Diagrama de Caso de Uso

```
@startuml
actor Usuario
usecase "Realizar Ação" as UC1
Usuario --> UC1
@enduml
```

**Arquivo PlantUML**: `diagrams/[FEATURE_NAME]_usecases.puml`

---

### Diagrama de Sequência

```
@startuml
participant Cliente
participant Servidor
Cliente -> Servidor: Requisição
Servidor -> Servidor: Processamento
Servidor --> Cliente: Resposta
@enduml
```

**Arquivo PlantUML**: `diagrams/[FEATURE_NAME]_sequence.puml`

---

### Diagrama de Classes

```
@startuml
class Entidade {
  - propriedade1: tipo
  - propriedade2: tipo
  + metodo1()
  + metodo2()
}
@enduml
```

**Arquivo PlantUML**: `diagrams/[FEATURE_NAME]_classes.puml`

---

## 📦 Dependências

### Serviços Internos

- [ ] [Serviço A]
- [ ] [Serviço B]

### Serviços Externos

- [ ] [API externa]
- [ ] [Banco de dados]

### Bibliotecas/Frameworks

- [ ] [Biblioteca A]
- [ ] [Versão mínima: X.Y.Z]

---

## 🔄 Fluxo de Implementação

```
1. Criar estrutura base
2. Implementar lógica principal
3. Adicionar validações
4. Integrar com dependências
5. Criar testes
6. Validar com QA
```

---

## ✅ Critérios de Conclusão

- [ ] Código implementado
- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Documentação atualizada
- [ ] Revisão de código aprovada
- [ ] QA validou alinhamento

---

## 📌 Notas e Observações

[Insira observações importantes, restrições, ou notas adicionais]

---

## 🔗 Referências

- [Link para documentação]
- [Link para issue GitHub]
- [Link para diagrama relacionado]

---

**Rastreabilidade**: `traceability.md`  
**Tarefas**: `tasks.md`  
**Testes de Aceitação**: `acceptance.md`
