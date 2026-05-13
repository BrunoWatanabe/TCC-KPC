# 🤖 FASE 2 — Sistema de Agentes

## ✅ Status: CONCLUÍDO

**Data**: Mai 2026  
**Responsável**: GitHub Copilot (Spec-Kit Framework)

---

## 📌 Resumo Executivo

A FASE 2 estabeleceu o **sistema de agentes especializados** do framework Spec-Kit:

✅ 3 Agentes com instruções detalhadas  
✅ Governança clara de coordenação  
✅ Instruções globais para Copilot  
✅ Fluxos de comunicação padronizados  

---

## 🎯 Objetivos da FASE 2

- [x] Criar agente Arquiteto
- [x] Criar agente Desenvolvedor
- [x] Criar agente QA
- [x] Criar governança dos agentes

---

## 🤖 Os Três Agentes

### 1. 🏗️ Agente Arquiteto

**Arquivo**: `.github/agents/architect.md`

**Responsabilidades**:
- Criar especificações formais (spec.md)
- Criar diagramas UML (4 tipos: casos de uso, classes, sequência, componentes)
- Definir rastreabilidade explícita
- Revisar conformidade arquitetural

**Entrada**: Requisição/Issue do usuário  
**Saída**: Especificação APROVADA + diagramas validados  

**Fluxo**:
```
Análise → Especificação (BDD) → Diagramas UML → Rastreabilidade → Aprovação
```

**Checklist**:
- [ ] spec.md com RF, RNF, critérios BDD
- [ ] 4 diagramas PlantUML criados
- [ ] traceability.md mapeada
- [ ] Todos requisitos testáveis
- [ ] Status: APROVADA

---

### 2. 👨‍💻 Agente Desenvolvedor

**Arquivo**: `.github/agents/developer.md`

**Responsabilidades**:
- Criar plano de tarefas (tasks.md)
- Implementar código com rastreabilidade
- Criar testes unitários (>80% cobertura)
- Manter sincronismo com especificação

**Entrada**: Especificação APROVADA  
**Saída**: Código implementado + testes passando  

**Fluxo**:
```
Análise → Tasks (epics) → Implementação (com rastreabilidade) → Testes → Pronto QA
```

**Padrão de Rastreabilidade**:
```python
def authenticate(self):
    """
    RF001 — Autentica usuário
    
    Rastreamento:
    - Spec: specs/auth/spec.md::RF001
    - Teste: tests/test_user_service.py::test_authenticate_success
    - Diagrama: diagrams/auth_classes.puml::UserService
    """
```

**Checklist**:
- [ ] tasks.md decomposta em epics + tasks
- [ ] Código implementado com rastreabilidade inline
- [ ] Testes unitários > 80% cobertura
- [ ] Testes passando
- [ ] Code review OK
- [ ] Pronto para QA

---

### 3. 🔍 Agente QA

**Arquivo**: `.github/agents/qa.md`

**Responsabilidades**:
- Criar testes de aceitação (acceptance.md)
- Validar alinhamento especificação ↔ código
- Detectar inconsistências
- Gerar relatório de alinhamento

**Entrada**: Código implementado + testes  
**Saída**: Aprovação ou lista de correções  

**Fluxo**:
```
Validação → Testes BDD → Análise Alinhamento → Detecção Inconsistências → Relatório
```

**Tipos de Validação**:
- ✅ Testes Funcionais (cada RF testado)
- ❌ Testes de Erro (tratamento de exceções)
- 🔗 Testes de Integração (componentes juntos)
- ⚡ Testes de Performance (RNF)

**Checklist**:
- [ ] acceptance.md com cenários BDD
- [ ] Cada RF tem teste de aceitação
- [ ] Cada RNF validado
- [ ] Rastreabilidade verificada
- [ ] Inconsistências documentadas
- [ ] alignment-report.md gerado

---

## 🔄 Ciclo de Coordenação

### Fluxo Completo

```
┌─────────────────────────────────────────┐
│ 1. NOVA REQUISIÇÃO (GitHub Issue)       │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ 2. ARQUITETO ATUA                       │
│    ├─ spec.md (RF, RNF)                 │
│    ├─ 4 Diagramas PlantUML              │
│    ├─ traceability.md                   │
│    └─ Status: APROVADA                  │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ 3. DESENVOLVEDOR PLANEJA                │
│    ├─ tasks.md (epics + tasks)          │
│    ├─ Dependências identificadas        │
│    └─ Status: PLANEJADO                 │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ 4. DESENVOLVEDOR IMPLEMENTA             │
│    ├─ Código com rastreabilidade        │
│    ├─ Testes unitários (>80%)           │
│    ├─ Testes passando                   │
│    └─ Status: IMPLEMENTADO              │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ 5. QA VALIDA                            │
│    ├─ acceptance.md (BDD)               │
│    ├─ Testes de aceitação               │
│    ├─ Análise de alinhamento            │
│    ├─ alignment-report.md               │
│    └─ Status: APROVADO                  │
└────────────────┬────────────────────────┘
                 ↓
        ┌────────┴────────┐
        ↓                 ↓
    APROVADO       CORREÇÃO NECESSÁRIA
  (→ Deploy)        (Feedback loop)
```

---

## 📋 Matriz de Responsabilidades

| Atividade | Arquiteto | Dev | QA |
|-----------|:-----------:|:---:|:---:|
| Criar spec | ✅ | - | - |
| Criar diagrama | ✅ | - | - |
| Revisar spec | ✅ | ✅ | - |
| Criar tasks | - | ✅ | - |
| Implementar | - | ✅ | - |
| Testes unitários | - | ✅ | - |
| Testes aceitação | - | - | ✅ |
| Validar alinhamento | ✅ | ✅ | ✅ |
| Relatório | - | - | ✅ |
| Aprovação final | ✅ | - | ✅ |

---

## 📁 Artefatos Criados

### Agentes Especializados

```
.github/agents/
├── architect.md          # Instruções detalhadas (4 fases)
├── developer.md          # Instruções detalhadas (5 fases)
└── qa.md                 # Instruções detalhadas (6 fases)
```

### Governança

```
AGENTS.md                      # Coordenação de agentes
├─ 3 agentes documentados
├─ Ciclo de coordenação
├─ Matriz de responsabilidades
├─ Estados e transições
├─ Comunicação padronizada
├─ Resolução de conflitos
├─ Métricas de saúde
└─ Integração GitHub

copilot-instructions.md        # Instruções globais para Copilot
├─ Comportamento esperado
├─ Padrões de nomeação
├─ Estrutura de comentários
├─ Rastreabilidade automática
└─ Exemplos práticos
```

### Documentação

```
docs/FASE2_AGENTES.md          # Este arquivo
├─ Resumo da FASE 2
├─ Descrição dos 3 agentes
├─ Fluxo de coordenação
├─ Matriz de responsabilidades
├─ Comunicação entre agentes
└─ Próximos passos
```

---

## 💬 Padrões de Comunicação

### Arquiteto → Desenvolvedor

```markdown
## Entrega: Especificação de Login

- ✅ spec.md completa (RF001, RF002, RF003)
- ✅ 4 diagramas validados (usecases, classes, sequence, components)
- ✅ Rastreabilidade mapeada
- ✅ Status: APROVADA

**Próximos passos**: Criar tasks.md e iniciar implementação
```

### Desenvolvedor → QA

```markdown
## Entrega: Login Implementado

- ✅ spec.md referenciada
- ✅ tasks.md completa (4 epics, 12 tasks)
- ✅ Código: 4 classes, 15 métodos
- ✅ Testes: 24 testes unitários, 87% cobertura
- ✅ Status: PRONTO PARA QA

Listar requisitos: RF001, RF002, RF003, RNF001, RNF002
```

### QA → Arquiteto

```markdown
## Relatório: Inconsistência Detectada

**Feature**: Login  
**Problema**: Spec diz "RFC 5322" mas código valida apenas "@"

**Status**: BLOQUEANTE  
**Ação**: Arquiteto clarificar requisito
```

---

## 📊 Métricas de Saúde do Fluxo

| Métrica | Target | Como Medir |
|---------|--------|-----------|
| Tempo Spec → Code | < 2 dias | data_start_dev - data_aprovacao_spec |
| Taxa de Alinhamento | > 95% | requisitos_ok / total_requisitos |
| Rework | < 10% | dias_rework / dias_total |
| Cobertura Testes | > 85% | linhas_testadas / linhas_codigo |
| Tempo Ciclo | < 1 semana | data_final - data_inicio_feature |

---

## 🎓 Exemplo Prático Completo

### Feature: Autenticação de Usuário

#### 1. Arquiteto Cria Especificação

```markdown
# 📋 Especificação — Login (RF001)

## Requisitos Funcionais

RF001 — Autenticar com Email/Senha
- Dado: usuário registrado
- Quando: submete credenciais corretas
- Então: retorna token válido

RF002 — Validar Email
RF003 — Validar Senha

## Modelos

@startuml
class UserService {
  + authenticate(email, password): Token
}
@enduml
```

#### 2. Desenvolvedor Cria Tasks

```markdown
# 📝 Tasks — Login (RF001)

### Epic 1: Infraestrutura
- Task 1.1: Criar modelo User
- Task 1.2: Criar repository
- Task 1.3: Criar testes de fixture

### Epic 2: Lógica
- Task 2.1: Implementar authenticate()
- Task 2.2: Adicionar validações
- Task 2.3: Gerar token

Tempo estimado: 3 dias
```

#### 3. Desenvolvedor Implementa

```python
class UserService:
    """
    RF001 — Autenticação
    
    Rastreamento:
    - Spec: specs/auth/spec.md::RF001
    - Modelo: diagrams/auth_classes.puml::UserService
    """
    
    def authenticate(self, email: str, password: str) -> Token:
        """
        RF001 — Autentica com email/senha
        
        Rastreamento:
        - Requisito: specs/auth/spec.md::RF001
        - Teste: tests/test_user_service.py::test_authenticate_success
        """
        # Validação de email (RF002)
        if not self._validar_email(email):
            raise EmailInvalidoException()
        
        # Buscar usuário
        user = self._buscar_usuario(email)
        if not user:
            raise UsuarioNaoEncontradoException()
        
        # Validação de senha (RF003)
        if not user.verificar_senha(password):
            raise SenhaIncorretaException()
        
        # Gerar token
        return self._gerar_token(user)
```

#### 4. Desenvolvedor Cria Testes

```python
class TestUserService:
    """Testes para UserService (RF001)"""
    
    def test_rf001_autenticacao_sucesso(self):
        """RF001 — Autentica com credenciais válidas"""
        service = UserService()
        user = service.create_user("joao@ex.com", "senha123")
        
        token = service.authenticate("joao@ex.com", "senha123")
        
        assert token is not None
        assert token.usuario_id == user.id
    
    def test_rf002_valida_email(self):
        """RF002 — Rejeita email inválido"""
        service = UserService()
        
        with pytest.raises(EmailInvalidoException):
            service.authenticate("invalido", "senha123")
    
    def test_rf003_valida_senha(self):
        """RF003 — Rejeita senha incorreta"""
        service = UserService()
        service.create_user("joao@ex.com", "senha123")
        
        with pytest.raises(SenhaIncorretaException):
            service.authenticate("joao@ex.com", "senhaErrada")
```

#### 5. QA Cria Testes de Aceitação

```gherkin
Funcionalidade: Autenticação de Usuário (RF001)
  Como usuário
  Quero fazer login
  Para acessar minha conta

  Cenário: Login bem-sucedido (RF001)
    Dado que existe usuário "joao@ex.com" com senha "senha123"
    Quando executa login com "joao@ex.com" e "senha123"
    Então retorna token válido
    E usuário consegue acessar conta

  Cenário: Email inválido (RF002)
    Quando executa login com "invalido" e "senha123"
    Então retorna erro "EmailInvalido"

  Cenário: Senha incorreta (RF003)
    Dado que existe usuário "joao@ex.com"
    Quando executa login com "joao@ex.com" e "senhaErrada"
    Então retorna erro "AutenticacaoFalhada"
```

#### 6. QA Gera Relatório

```markdown
# 📊 Relatório de Alinhamento — Login (RF001)

## Resumo
- Requisitos implementados: 3/3 (RF001, RF002, RF003)
- Testes de aceitação: 3/3 PASSOU
- Cobertura: 90%
- Inconsistências: 0
- **Score: 100% ✅**

## Tabela de Alinhamento
| RF | Modelo | Código | Teste | Status |
|----|--------|--------|-------|--------|
| RF001 | ✅ | ✅ | ✅ | ✅ |
| RF002 | ✅ | ✅ | ✅ | ✅ |
| RF003 | ✅ | ✅ | ✅ | ✅ |

**Conclusão**: APROVADO PARA PRODUÇÃO
```

---

## 🔗 Como Usar na Prática

### 1. Quando receber uma requisição

```bash
# Copilot como Arquiteto
- Lê specs/templates/spec.md
- Cria specs/[feature]/spec.md
- Cria diagrams/[feature]_*.puml
- Cria specs/[feature]/traceability.md
```

### 2. Quando começar implementação

```bash
# Copilot como Desenvolvedor
- Lê .github/agents/developer.md
- Cria specs/[feature]/tasks.md
- Implementa src/ com rastreabilidade
- Cria tests/ com >80% cobertura
```

### 3. Quando validar

```bash
# Copilot como QA
- Lê .github/agents/qa.md
- Cria specs/[feature]/acceptance.md
- Executa testes BDD
- Cria qa/reports/[feature]-alignment-report.md
```

---

## ✅ Checklist de Implementação

- [x] Agente Arquiteto documentado (architect.md)
- [x] Agente Desenvolvedor documentado (developer.md)
- [x] Agente QA documentado (qa.md)
- [x] Governança estabelecida (AGENTS.md)
- [x] Instruções Copilot criadas (copilot-instructions.md)
- [x] Fluxo de coordenação definido
- [x] Matriz de responsabilidades clara
- [x] Padrões de comunicação padronizados
- [x] Métricas de saúde estabelecidas
- [x] Exemplo prático documentado

---

## 🚀 Próximos Passos (FASE 3)

### FASE 3 — Integração SDD + MDE

- [ ] Definir modelos oficiais (diagramas padrão)
- [ ] Criar convenções de rastreabilidade
- [ ] Padronizar naming (RF001 → UserService.createUser())
- [ ] Criar parser de PlantUML
- [ ] Criar parser de código (AST)
- [ ] Implementar comparador modelo ↔ código

---

## 📊 Status da Implementação

| FASE | Status | Conclusão |
|------|--------|-----------|
| FASE 1: Estrutura | ✅ COMPLETA | Mai 2026 |
| FASE 2: Agentes | ✅ COMPLETA | Mai 2026 |
| FASE 3: SDD + MDE | ⏳ Próxima | - |
| FASE 4: Fluxo Completo | ⏳ Futura | - |
| FASE 5: Métricas | ⏳ Futura | - |
| ... | ⏳ Futura | - |

---

## 🔗 Arquivos Criados

```
/.github/agents/
├── architect.md                    # Instruções detalhadas
├── developer.md                    # Instruções detalhadas
└── qa.md                          # Instruções detalhadas

/
├── AGENTS.md                      # Governança
├── copilot-instructions.md        # Instruções Copilot
└── docs/FASE2_AGENTES.md         # Esta documentação
```

---

## 🔗 Referências

- Plano original: `plano-de-acao-speck-kit.txt`
- Framework overview: `SPEC-KIT-README.md`
- Documentação FASE 1: `docs/FASE1_ESTRUTURA.md`
- Governança: `AGENTS.md`
- Instruções Copilot: `copilot-instructions.md`

---

**Status Final**: ✅ FASE 2 COMPLETA  
**Data de Conclusão**: Mai 2026  
**Próxima Fase**: FASE 3 — Integração SDD + MDE

---

*Sistema de Agentes para Spec-Kit Framework — Trabalho de Conclusão de Curso (TCC)*
