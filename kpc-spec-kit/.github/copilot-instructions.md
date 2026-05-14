<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

# copilot-instructions.md — Instruções Globais para GitHub Copilot

## 📌 Visão Geral

Este arquivo **orienta o comportamento do GitHub Copilot** no contexto do **framework Spec-Kit**.

O Copilot atua como **suporte inteligente** aos 3 agentes especializados:
- 🏗️ Agente Arquiteto
- 👨‍💻 Agente Desenvolvedor
- 🔍 Agente QA

---

## 🎯 Objetivo Principal

Garantir que:
1. **Código gerado** tem rastreabilidade clara (cada função tem RF)
2. **Especificações criadas** são formais e testáveis (BDD)
3. **Testes escritos** validam requisitos (não apenas código)
4. **Alinhamento** entre artefatos é mantido automaticamente

---

## 🏗️ Instruções para Agente Arquiteto

### Ao Criar Especificação

**Copilot deve**:
- ✅ Usar template `.specify/templates/kpc-spec-initial.md`
- ✅ Estruturar requisitos em formato BDD
  ```gherkin
  Dado [contexto]
  Quando [ação]
  Então [resultado]
  ```
- ✅ Gerar 4 diagramas PlantUML obrigatórios
  - Classes
  - Sequência
  - Casos de Uso
  - Componentes
- ✅ Manter nomes padronizados
  ```
  RF001, RF002, ... (requisitos funcionais)
  RNF001, RNF002, ... (não-funcionais)
  ```

**Exemplo Sugerido**:
```markdown
# 📋 Especificação — Login

## RF001 — Autenticação com Email/Senha

Critério BDD:
- Dado um usuário registrado
- Quando submete email e senha corretos
- Então retorna token válido

Modelo PlantUML (RF001):
@startuml
class UserService {
  + authenticate(email, password): Token
}
@enduml
```

---

### Ao Criar Diagrama

**Copilot deve**:
- ✅ Nomeação clara de classes
  ```
  ✅ UserService, LoginController, TokenGenerator
  ❌ Service1, Process, Handle
  ```
- ✅ Métodos refletem requisitos
  ```
  ✅ authenticate() // RF001
  ❌ process()      // Vago
  ```
- ✅ Adicionar comentário de rastreamento
  ```puml
  class UserService {
    ' RF001 — Autenticação
    + authenticate()
  }
  ```

---

### Ao Criar Rastreabilidade

**Copilot deve**:
- ✅ Mapear explicitamente:
  ```
  RF001 → UserService::authenticate()
  RF001 → tests/test_user_service.py::test_authenticate_success
  RF001 → .specify/diagrams/auth_classes.puml::UserService
  ```
- ✅ Validar cobertura 100% (todo RF tem implementação)
- ✅ Detectar "orfandade"
  ```
  ❌ Classe UserValidator sem RF
  ❌ Método hidrate() sem teste
  ```

---

## 👨‍💻 Instruções para Agente Desenvolvedor

### Ao Implementar Código

**Copilot deve**:
- ✅ Adicionar rastreabilidade em cada classe/método
  ```python
  class UserService:
      """
      RF001 — Autenticação de Usuário
      
      Rastreamento:
      - Spec: specs/auth/spec.md::RF001
      - Modelo: .specify/diagrams/auth_classes.puml::UserService
      - Teste: tests/test_user_service.py::TestUserService
      """
  ```

- ✅ Nomear funções conforme requisito
  ```python
  # ✅ BOM
  def authenticate(self, email: str, password: str) -> Token:
      """RF001 — Autentica usuário com email/senha"""
  
  # ❌ RUIM
  def process(self, data: dict):
      """Processa dados"""
  ```

- ✅ Validações claras
  ```python
  def authenticate(self, email, password):
      # RF001.1 — Validar email não está vazio
      if not email:
          raise EmailObrigatorioException()
      
      # RF001.2 — Validar email tem formato correto
      if not self._eh_email_valido(email):
          raise EmailInvalidoException()
      
      # RF001.3 — Validar senha
      user = self._buscar_usuario(email)
      if not user or not user.verificar_senha(password):
          raise AutenticacaoFalhadaException()
      
      # RF001.4 — Gerar token
      return self._gerar_token(user)
  ```

---

### Ao Criar Testes Unitários

**Copilot deve**:
- ✅ Usar BDD/AAA (Arrange-Act-Assert)
  ```python
  def test_authenticate_success(self):
      """RF001 — Autentica com credenciais válidas"""
      
      # Arrange (Dado)
      service = UserService()
      user = service.create_user("joao@ex.com", "senha123")
      
      # Act (Quando)
      token = service.authenticate("joao@ex.com", "senha123")
      
      # Assert (Então)
      assert token is not None
      assert token.usuario_id == user.id
  ```

- ✅ Um teste por requisito
  ```python
  def test_rf001_1_rejeita_email_vazio(self):
      """RF001.1 — Email não pode estar vazio"""
      with pytest.raises(EmailObrigatorioException):
          service.authenticate("", "senha123")
  
  def test_rf001_2_rejeita_email_invalido(self):
      """RF001.2 — Email deve ter formato válido"""
      with pytest.raises(EmailInvalidoException):
          service.authenticate("invalido", "senha123")
  
  def test_rf001_3_rejeita_senha_incorreta(self):
      """RF001.3 — Senha deve estar correta"""
      service.create_user("joao@ex.com", "senha123")
      with pytest.raises(AutenticacaoFalhadaException):
          service.authenticate("joao@ex.com", "senhaErrada")
  ```

- ✅ Mínimo 80% cobertura
  ```bash
  pytest --cov=src --cov-report=html
  # Resultado: 87% ✅
  ```

---

### Ao Refatorar

**Copilot deve**:
- ✅ Manter rastreabilidade
  - Se renomear função: atualizar comentários e testes
  - Se dividir função: manter RF na nova função
  - Se remover: validar que RF não fica órfão

- ✅ Nunca remover rastreabilidade
  ```python
  # ❌ ERRADO
  # def authenticate(self):  # Removeu RF001
  
  # ✅ CORRETO
  # RF001 — Autenticação
  def authenticate(self, email, password):
  ```

---

## 🔍 Instruções para Agente QA

### Ao Criar Testes de Aceitação

**Copilot deve**:
- ✅ Usar formato BDD (Gherkin)
  ```gherkin
  Funcionalidade: Autenticação (RF001)
    Como usuário
    Quero fazer login
    Para acessar minha conta

    Cenário: Login bem-sucedido
      Dado que existe usuário "joao@ex.com" com senha "senha123"
      Quando executa login com "joao@ex.com" / "senha123"
      Então retorna token válido
      E usuário consegue acessar conta
  
    Cenário: Login com email inválido
      Dado que não existe usuário "invalido@ex.com"
      Quando executa login com "invalido@ex.com" / "senha123"
      Então retorna erro "EmailNaoEncontrado"
  ```

- ✅ Validar cada RF
  ```python
  def test_rf001_email_valido(self):
      """Valida RF001 — Email deve ser válido"""
  
  def test_rf001_1_email_obrigatorio(self):
      """Valida RF001.1 — Email não pode estar vazio"""
  
  def test_rf001_2_senha_correta(self):
      """Valida RF001.2 — Senha deve estar correta"""
  ```

---

### Ao Criar Relatório de Alinhamento

**Copilot deve**:
- ✅ Matriz clara
  ```markdown
  | Requisito | Modelo | Código | Teste | Status |
  |-----------|--------|--------|-------|--------|
  | RF001 | ✅ | ✅ | ✅ | ✅ 100% |
  | RF001.1 | ✅ | ✅ | ✅ | ✅ 100% |
  | RF001.2 | ✅ | ✅ | ✅ | ✅ 100% |
  | RNF001 | ⚠️ | ✅ | ⚠️ | ⚠️ 50% |
  ```

- ✅ Detectar inconsistências
  ```markdown
  ## ⚠️ Inconsistências Detectadas
  
  1. Classe `UserValidator` sem RF
     - Tipo: Over-engineering
     - Ação: Validar se é necessária
  
  2. RF001 diz "email RFC 5322" mas código verifica "@"
     - Tipo: Divergência semântica
     - Ação: Arquiteto clarificar + Dev corrigir
  ```

---

## 📋 Padrões Globais

### Nomenclatura

```
✅ BOAS PRÁTICAS

Classes: UserService, LoginController, TokenGenerator
Métodos: authenticate(), validate_email(), generate_token()
Variáveis: user_id, email_address, is_valid
Testes: test_authenticate_success, test_email_invalid
Requisitos: RF001, RF001.1, RNF001, RNF001.1
Arquivos: user_service.py, test_user_service.py

❌ EVITAR

Classes: Service1, Processor, Handler
Métodos: process(), do_something(), handle_data()
Variáveis: x, temp, data
Testes: test1(), test2(), test_ok()
Requisitos: REQ1, R1, F001
Arquivos: main.py, utils.py, process.py
```

### Estrutura de Comentários

```python
# ✅ BOM

class UserService:
    """
    RF001 — Autenticação de Usuário
    
    Rastreamento:
    - Spec: specs/auth/spec.md::RF001
    - Modelo: diagrams/auth_classes.puml::UserService
    """
    
    def authenticate(self, email: str, password: str) -> Token:
        """
        RF001 — Autentica usuário
        
        Rastreamento:
        - Requisito: specs/auth/spec.md::RF001
        - Teste: tests/test_user_service.py::test_authenticate_success
        
        BDD:
        Dado usuário registrado
        Quando submete credenciais corretas
        Então retorna token válido
        """
        pass

# ❌RUIM

class Service:
    """Serviço de usuário"""
    
    def authenticate(self, email, password):
        """Faz autenticação"""
        pass
```

---

## 🚀 Comportamento Esperado

### Copilot como Arquiteto

```
User: "Preciso de um sistema de login"

Copilot: 
✅ Sugere criar spec.md usando template
✅ Propõe 4 diagramas PlantUML
✅ Oferece exemplos de requisitos em BDD
✅ Cria rastreabilidade automática
```

### Copilot como Desenvolvedor

```
User: "Implementar login"

Copilot:
✅ Sugere estrutura de tarefas
✅ Cria código com rastreabilidade automática
✅ Gera testes unitários (> 80% cobertura)
✅ Valida conformidade com especificação
```

### Copilot como QA

```
User: "Validar implementação de login"

Copilot:
✅ Cria testes de aceitação em BDD
✅ Executa validação de alinhamento
✅ Detecta inconsistências
✅ Gera relatório com score
```

---

## 🔗 Referências

- Plano completo: `plano-de-acao-speck-kit.txt`
- Framework overview: `SPEC-KIT-README.md`
- Agentes: `AGENTS.md`
- Agente Arquiteto: `.github/agents/architect.md`
- Agente Desenvolvedor: `.github/agents/developer.md`
- Agente QA: `.github/agents/qa.md`
- Templates: `.specify/templates/` (versões do framework) ou `.specify/templates/kpc-*-initial.md` (versões KPC)

---

**Versão**: 1.0  
**Data**: Mai 2026  
**Status**: Ativo

*Estas instruções guiam o GitHub Copilot para manter alinhamento automático no framework Spec-Kit*
