# 📝 NAMING-CONVENTIONS.md — Padrões de Nomenclatura

## 📌 Visão Geral

Este arquivo define os **padrões de nomeação** para manter correspondência clara entre:

```
Requisito (RF001) → Modelo (UserService) → Código (user_service.py)
```

---

## 🎯 Princípio Central

**Toda estrutura no código deve ter rastreabilidade explícita para um requisito (RF).**

**Nomenclatura deve ser semântica**, não genérica.

---

## 📋 Padrões de Requisito

### Formato Geral

```
RF[NÚMERO] — [Descrição Breve]

Exemplo:
RF001 — Autenticar Usuário com Email/Senha
RF002 — Validar Formato de Email
RF003 — Verificar Força de Senha
RF004 — Gerar Token JWT
```

### Requisitos Não-Funcionais

```
RNF[NÚMERO] — [Atributo Qualitativo]

Exemplo:
RNF001 — Performance: Login deve responder em < 100ms
RNF002 — Segurança: Senha deve usar bcrypt com salt
RNF003 — Usabilidade: Mensagens de erro em português
```

---

## 🏗️ Padrões de Classe

### Regra: Uma Classe por Responsabilidade Principal

**Padrão**:
```
[DominioOuCampo][Responsabilidade]Service
[DominioOuCampo][Responsabilidade]Repository
[DominioOuCampo]Controller
[DominioOuCampo]Exception
```

### Exemplos

#### Service Classes (Lógica de Negócio)

```python
# ✅ BOM: Nome descreve responsabilidade
class UserService:          # RF001, RF002, RF003, RF004
    pass

class AuthenticationService:  # RF001
    pass

class EmailValidator:        # RF002
    pass

class PasswordValidator:     # RF003
    pass

# ❌ RUIM: Nome genérico
class Service:
    pass

class ProcessData:
    pass

class Handler:
    pass
```

#### Repository Classes (Acesso a Dados)

```python
# ✅ BOM
class UserRepository:
    def find_by_email(self, email: str) -> User:
        pass
    
    def create(self, user: User) -> User:
        pass

# ❌ RUIM
class Database:
    pass

class Query:
    pass
```

#### Controller Classes (HTTP)

```python
# ✅ BOM
class AuthController:        # Endpoints de autenticação
    def login(self):         # POST /auth/login (RF001)
        pass
    
    def register(self):      # POST /auth/register (RF005)
        pass

# ❌ RUIM
class MainController:
    pass

class APIController:
    pass
```

#### Exception Classes

```python
# ✅ BOM: Nome descreve erro específico
class AutenticacaoFalhadaException(Exception):
    """RF001: Credenciais inválidas"""
    pass

class EmailInvalidoException(Exception):
    """RF002: Email não validado"""
    pass

class SenhaFracaException(Exception):
    """RF003: Senha não atende critérios"""
    pass

# ❌ RUIM
class MyException(Exception):
    pass

class ErrorException(Exception):
    pass
```

---

## 🔧 Padrões de Método

### Regra: Nome de Método = Ação RF

**Padrão**:
```
[verbo][Nome]([parametros]): [retorno]
```

### Verbos Comuns

| Verbo | Significado | Exemplo |
|-------|-----------|---------|
| `create` | Criar novo | `create_user()` |
| `read` / `get` | Recuperar | `get_user_by_id()` |
| `update` | Modificar | `update_user()` |
| `delete` | Remover | `delete_user()` |
| `authenticate` | Validar autenticidade | `authenticate()` |
| `validate` | Verificar conformidade | `validate_email()` |
| `verify` | Confirmar | `verify_password()` |
| `generate` | Produzir | `generate_token()` |
| `send` | Enviar | `send_email()` |
| `find` / `search` | Buscar | `find_by_email()` |

### Exemplos Práticos

#### Método de Autenticação

```python
# ✅ BOM: Nome reflete a ação RF001
def authenticate(self, email: str, password: str) -> Token:
    """
    RF001 — Autentica usuário com email e senha
    
    Args:
        email: Email do usuário
        password: Senha em texto plano
    
    Returns:
        Token JWT válido
    
    Raises:
        EmailInvalidoException: Se email inválido
        AutenticacaoFalhadaException: Se senha incorreta
    """
    pass

# ❌ RUIM: Nome genérico
def process(self, data: dict) -> dict:
    pass

def handle_request(self, req):
    pass
```

#### Método de Validação

```python
# ✅ BOM: Nome específico para RF002
def validate_email(self, email: str) -> bool:
    """
    RF002 — Valida formato de email
    
    Valida se email segue padrão RFC 5322
    """
    pass

# ❌ RUIM
def check(self, email: str) -> bool:
    pass

def validate(self, data) -> bool:
    pass
```

#### Método de Armazenamento

```python
# ✅ BOM: Método CRUD claro
class UserRepository:
    def create(self, user: User) -> User:
        """RF005 — Criar novo usuário"""
        pass
    
    def find_by_email(self, email: str) -> User:
        """RF002 — Buscar usuário por email"""
        pass
    
    def update(self, user_id: str, data: dict) -> User:
        """RF006 — Atualizar usuário"""
        pass
    
    def delete(self, user_id: str) -> void:
        """RF007 — Deletar usuário"""
        pass

# ❌ RUIM
class DB:
    def op1(self, data):
        pass
    
    def op2(self, data):
        pass
```

---

## 📁 Padrões de Arquivo

### Estrutura de Pastas

```
src/
├── auth/                          # Domínio: Autenticação
│   ├── user_service.py           # UserService (RF001-004)
│   ├── user_repository.py        # UserRepository
│   ├── auth_controller.py        # AuthController
│   ├── exceptions.py             # AutenticacaoFalhadaException, ...
│   ├── models.py                 # User, Token
│   └── utils.py                  # Helpers (sem RF específico)
│
├── email/                         # Domínio: Email
│   ├── email_service.py          # EmailService
│   ├── email_repository.py       # EmailRepository
│   └── exceptions.py             # EmailInvalidoException, ...
│
└── common/                        # Código compartilhado
    ├── validators.py             # Validadores genéricos
    ├── decorators.py             # Decoradores
    └── exceptions.py             # Exceções base
```

### Nomenclatura de Arquivo

```python
# ✅ BOM: Nome reflete classe principal
user_service.py              # Contains UserService
user_repository.py           # Contains UserRepository
auth_controller.py           # Contains AuthController
authentication_exception.py  # Contains AutenticacaoException

# ❌ RUIM
service.py                   # Qual serviço?
db.py                        # Qual banco?
api.py                       # Qual API?
utils.py                     # Muito genérico
helpers.py                   # Muito genérico
```

---

## 🔄 Padrões de Variável

### Regra: Nome de Variável = Tipo/Semântica

```python
# ✅ BOM: Nome descreve valor
user_email: str
is_authenticated: bool
login_attempts: int
authentication_token: Token
error_message: str

# ❌ RUIM
e: str                # O que é "e"?
auth: bool            # Autenticado? Autorizando?
count: int            # Contando o quê?
data: dict            # Dados de quê?
result: Any           # Qual resultado?
```

### Variáveis Boolean

```python
# ✅ BOM: Prefixo is_, has_, can_, should_
is_valid: bool
is_authenticated: bool
has_permission: bool
can_delete: bool
should_retry: bool

# ❌ RUIM
valid: bool           # Ambíguo
authenticated: bool   # Ambíguo
permission: bool      # Ambíguo
```

---

## 🎯 Mapping RF → Código

### Exemplo Prático

#### Requisito

```
RF001 — Autenticar Usuário com Email/Senha
```

#### Classe Implementadora

```python
# Classe: [Domínio]Service
class UserService:  # Implementa RF001
    
    # Método: [verbo][Ação]
    def authenticate(self, email: str, password: str) -> Token:
        """RF001 — Autentica com email/senha"""
        
        # Variável: [tipo]_[significado]
        authentication_success: bool = False
        authentication_token: Token = None
        error_message: str = ""
        
        # Chamada a validação (RF002)
        is_email_valid = self.validate_email(email)
        
        # Chamada a verificação (RF003)
        is_password_correct = user.verify_password(password)
        
        # Chamada a geração (RF004)
        authentication_token = self._generate_token(user)
        
        return authentication_token
    
    # Método: validate_[algo]
    def validate_email(self, email: str) -> bool:
        """RF002 — Valida email"""
        pass
```

#### Arquivo Implementador

```
src/auth/user_service.py     # Contém UserService
src/auth/user_repository.py  # Contém UserRepository
src/auth/exceptions.py       # Contém AutenticacaoFalhadaException
```

#### Teste

```python
# Arquivo: tests/test_[classe]_[metodo].py
# Ou: tests/test_[classe].py com class Test[Classe]

class TestUserService:
    def test_authenticate_success(self):
        """RF001 — Autentica com credenciais válidas"""
        pass
    
    def test_authenticate_invalid_email(self):
        """RF002 — Rejeita email inválido"""
        pass
```

---

## ✅ Checklist de Nomenclatura

Para cada novo código:

- [ ] Classe tem nome que reflete responsabilidade principal?
- [ ] Classe está ligada a um RF?
- [ ] Método tem nome descritivo (verbo + ação)?
- [ ] Método está ligado a um RF?
- [ ] Variáveis têm nomes semânticos (não genéricos)?
- [ ] Arquivo tem nome que reflete classe principal?
- [ ] Exceções têm nomes específicos (não genéricos)?
- [ ] Comentários mostram qual RF implementa?

---

## 🔗 Exemplos Completos

### Exemplo 1: Autenticação (RF001-004)

```python
# ✅ CORRETO

# src/auth/user_service.py
class UserService:
    """RF001-004 — Autenticação e geração de token"""
    
    def authenticate(self, email: str, password: str) -> Token:
        """RF001"""
        pass
    
    def validate_email(self, email: str) -> bool:
        """RF002"""
        pass
    
    def verify_password(self, pwd: str, hash: str) -> bool:
        """RF003"""
        pass
    
    def _generate_token(self, user: User) -> Token:
        """RF004"""
        pass

# src/auth/exceptions.py
class AutenticacaoFalhadaException(Exception):
    """Levantada quando RF001 falha"""
    pass

class EmailInvalidoException(Exception):
    """Levantada quando RF002 falha"""
    pass

# tests/test_user_service.py
class TestUserService:
    def test_authenticate_success(self):
        """RF001 — Sucesso"""
        pass
    
    def test_validate_email_success(self):
        """RF002 — Sucesso"""
        pass
```

---

**Versão**: 1.0  
**Data**: Mai 2026  
**Status**: Ativo
