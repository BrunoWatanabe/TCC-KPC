# 📐 MODELS.md — Modelos Oficiais PlantUML

## 📌 Visão Geral

Este arquivo define os **modelos oficiais** para diagramas PlantUML no framework Spec-Kit.

Os 4 tipos de diagramas são **obrigatórios** em toda especificação para garantir cobertura completa:

1. **Diagrama de Casos de Uso** — Interações com atores
2. **Diagrama de Classes** — Estrutura do sistema
3. **Diagrama de Sequência** — Fluxos de interação
4. **Diagrama de Componentes** — Arquitetura de alto nível

---

## 🎭 1. Diagrama de Casos de Uso

### Propósito
Mostrar as **interações entre atores e sistema**.

### Quando Usar
- Especificar funcionalidades do ponto de vista do usuário
- Identificar casos de uso principais
- Mapear RF → Casos de Uso

### Padrão Obrigatório

```puml
@startuml [FEATURE_NAME]-usecases
!define CUSTOM_ACTOR_STYLE
skinparam linetype ortho

' Atores
actor "Usuário" as User
actor "Sistema Externo" as System
actor "Admin" as Admin

' Casos de Uso
usecase "RF001: Criar Usuário" as UC_CREATE
usecase "RF002: Listar Usuários" as UC_LIST
usecase "RF003: Atualizar Usuário" as UC_UPDATE
usecase "RF004: Deletar Usuário" as UC_DELETE

' Relações
User --> UC_CREATE
User --> UC_LIST
Admin --> UC_UPDATE
Admin --> UC_DELETE

' Generalização
UC_UPDATE --|> UC_LIST : extends
@enduml
```

### Componentes Obrigatórios

**Atores**:
```puml
actor "Nome do Ator" as ALIAS
```

**Casos de Uso** (com RF):
```puml
usecase "RF001: Descrição" as ALIAS
```

**Relações**:
```puml
Actor --> UseCase
UseCase --|> OtherUseCase : extends
UseCase ..|> OtherUseCase : includes
```

---

## 📊 2. Diagrama de Classes

### Propósito
Mostrar a **estrutura do sistema**, classes, atributos e métodos.

### Quando Usar
- Modelar entidades de dados
- Definir interfaces e contracts
- Mapear RF → Classes/Métodos
- Mostrar relacionamentos (herança, composição)

### Padrão Obrigatório

```puml
@startuml [FEATURE_NAME]-classes
!define PRIMARY_KEY <color:#FF6B6B><&key></color>
!define FOREIGN_KEY <color:#4ECDC4><&key></color>

package "modulo_name" {

  ' Interface ou Abstract
  abstract class IService {
    {abstract} + execute()
  }

  ' Classe Principal
  class UserService implements IService {
    ' Atributos (RF101)
    - userId: String
    - email: String <<PK>>
    - createdAt: DateTime
    
    ' Métodos (RF001, RF002)
    + authenticate(email, password): Token
    + createUser(userData): User
    + updateUser(id, data): User
    + deleteUser(id): void
    
    ' Métodos privados (helper)
    - validateEmail(email): boolean
    - hashPassword(pwd): String
  }

  ' Classe de Entidade
  class User {
    - id: String <<PK>>
    - email: String
    - name: String
    - password: String (hashed)
    - createdAt: DateTime
  }

  ' Classe de Resposta
  class UserResponse {
    - id: String
    - email: String
    - name: String
    - createdAt: DateTime
  }

  ' Classe de Exceção
  class AutenticacaoException extends Exception {
    - message: String
  }
}

' Relacionamentos
UserService --> User : cria/atualiza
UserService --> UserResponse : retorna
UserService ..|> AutenticacaoException : lança

@enduml
```

### Componentes Obrigatórios

**Classes**:
```puml
class NomeDaClasse {
  - atributo_privado: tipo
  # atributo_protegido: tipo
  + metodo_publico(): retorno
}
```

**Anotações RF**:
```puml
class UserService {
  ' RF001, RF002 — Autenticação
  + authenticate(email, password): Token
  
  ' RF003 — Validação
  - validateEmail(email): boolean
}
```

**Relacionamentos**:
```puml
ClasseA --> ClasseB : associação
ClasseA --|> ClasseB : herança
ClasseA ..|> ClasseB : implementa interface
ClasseA *-- ClasseB : composição (forte)
ClasseA --o ClasseB : agregação (fraca)
```

---

## 🔄 3. Diagrama de Sequência

### Propósito
Mostrar **fluxos de interação** entre componentes.

### Quando Usar
- Detalhar como RF são executados
- Mostrar ordem de chamadas
- Identificar pontos de sincronização
- Mapear com testes de aceitação (BDD)

### Padrão Obrigatório

```puml
@startuml [FEATURE_NAME]-sequence

participant Client
participant Controller
participant Service
participant Repository
participant Database

autonumber

' Fluxo principal (RF001)
Client -> Controller: POST /auth/login
activate Controller

Controller -> Service: authenticate(email, pwd)
activate Service

Service -> Service: validateEmail(email)
note right: RF002 - Validação

Service -> Repository: findByEmail(email)
activate Repository

Repository -> Database: query users
Database --> Repository: user data
deactivate Repository

Service -> Service: verifyPassword(pwd, hash)
note right: RF003 - Verificação

Service -> Service: generateToken(user)
Service --> Controller: Token
deactivate Service

Controller --> Client: 200 OK + Token
deactivate Controller

' Fluxo alternativo (erro)
opt Senha incorreta
  Client -> Controller: POST /auth/login
  Controller -> Service: authenticate(email, pwd)
  Service -> Service: verifyPassword() fails
  Service --> Controller: AutenticacaoException
  Controller --> Client: 401 Unauthorized
end

@enduml
```

### Componentes Obrigatórios

**Participantes**:
```puml
participant Nome
actor Ator
database Database
```

**Interações**:
```puml
Actor -> Componente: mensagem()
Componente --> Actor: retorno
Componente -> Componente: auto-chamada
```

**Anotações**:
```puml
autonumber           ' Numeração automática
activate Obj         ' Objeto ativo
deactivate Obj       ' Inativo
note right: RF001 - Descrição
alt Alternativa
  ...
else Outra alternativa
  ...
end
```

---

## 🏗️ 4. Diagrama de Componentes

### Propósito
Mostrar **arquitetura de alto nível**, componentes e dependências.

### Quando Usar
- Mostrar estrutura geral do sistema
- Definir módulos/packages
- Mapear dependências externas (BD, APIs)
- Visualizar interfaces entre componentes

### Padrão Obrigatório

```puml
@startuml [FEATURE_NAME]-components

package "Client" {
  component [Web Browser] as WEB
  component [Mobile App] as MOBILE
}

package "API Layer" {
  component [REST API] as API
  component [Authentication Controller] as AUTH_CTRL
}

package "Business Logic" {
  component [User Service] as USER_SVC
  component [Auth Service] as AUTH_SVC
  component [Validation Service] as VALID_SVC
}

package "Data Access" {
  component [User Repository] as USER_REPO
  component [Session Repository] as SESSION_REPO
}

package "External Services" {
  component [PostgreSQL DB] as DB
  component [Redis Cache] as CACHE
  component [Email Service] as EMAIL
}

' Fluxos
WEB --> API : HTTP
MOBILE --> API : HTTP

API --> AUTH_CTRL : delega

AUTH_CTRL --> AUTH_SVC : usa
AUTH_SVC --> USER_SVC : usa
USER_SVC --> VALID_SVC : valida

USER_SVC --> USER_REPO : acessa
AUTH_SVC --> SESSION_REPO : acessa

USER_REPO --> DB : SQL
SESSION_REPO --> CACHE : Redis
USER_SVC --> EMAIL : envia notificações

@enduml
```

### Componentes Obrigatórios

**Packages**:
```puml
package "Nome do Package" {
  component [Componente A] as A
  component [Componente B] as B
}
```

**Componentes**:
```puml
component [Nome Legível] as ALIAS
interface "NomeInterface" as I
```

**Relacionamentos**:
```puml
ComponentA --> ComponentB : usar/chamar
ComponentA ..> ComponentB : dependência opcional
ComponentA -| ComponentB : implementa
```

---

## 📋 Checklist de Diagrama Completo

### Para Cada Feature/RF

- [ ] **Diagrama de Casos de Uso**
  - [ ] Todos os atores identificados
  - [ ] Todos os RF como casos de uso
  - [ ] Relacionamentos (extends, includes)

- [ ] **Diagrama de Classes**
  - [ ] Classes principais
  - [ ] Métodos anotados com RF
  - [ ] Atributos com tipos
  - [ ] Relacionamentos (herança, composição)

- [ ] **Diagrama de Sequência**
  - [ ] Fluxo principal
  - [ ] Fluxos alternativos (erro)
  - [ ] Sincronizações
  - [ ] Anotações RF

- [ ] **Diagrama de Componentes**
  - [ ] Todos os componentes
  - [ ] Dependências
  - [ ] Serviços externos
  - [ ] Fluxos principais

---

## 🔗 Exemplo Prático: Feature Login

### 1. Casos de Uso

```puml
@startuml auth-usecases
actor User
usecase "RF001: Fazer Login" as UC_LOGIN
usecase "RF002: Validar Email" as UC_EMAIL
usecase "RF003: Validar Senha" as UC_PASSWORD
usecase "RF004: Gerar Token" as UC_TOKEN

User --> UC_LOGIN
UC_LOGIN --|> UC_EMAIL : includes
UC_LOGIN --|> UC_PASSWORD : includes
UC_LOGIN --|> UC_TOKEN : includes
@enduml
```

### 2. Classes

```puml
@startuml auth-classes
class UserService {
  + authenticate(email, password): Token
  - validateEmail(email): boolean
  - verifyPassword(pwd, hash): boolean
  - generateToken(user): Token
}

class User {
  - id: String
  - email: String
  - password: String
}

class Token {
  - value: String
  - expiresAt: DateTime
}

UserService --> User
UserService --> Token
@enduml
```

### 3. Sequência

```puml
@startuml auth-sequence
participant Client
participant UserService
participant Repository

Client -> UserService: authenticate(email, password)
UserService -> UserService: validateEmail(email)
UserService -> Repository: findByEmail(email)
Repository --> UserService: User
UserService -> UserService: verifyPassword(password)
UserService -> UserService: generateToken(user)
UserService --> Client: Token
@enduml
```

### 4. Componentes

```puml
@startuml auth-components
package "API" {
  component [Login Controller] as CTRL
}

package "Business" {
  component [User Service] as SVC
  component [Auth Service] as AUTH
}

package "Data" {
  component [User Repository] as REPO
}

package "External" {
  component [Database] as DB
}

CTRL --> SVC
SVC --> AUTH
SVC --> REPO
REPO --> DB
@enduml
```

---

## 🎯 Boas Práticas

1. **Nomeação Clara**: Use nomes descritivos, não genéricos
2. **Anotações RF**: Sempre anotar qual RF implementa
3. **Simplicidade**: Cada diagrama com um propósito claro
4. **Sincronização**: Manter diagramas sincronizados com código
5. **Versão**: Atualizar quando código muda
6. **Documentação**: Adicionar notas explicativas quando necessário

---

## 📎 Vinculação com Especificação

Cada diagrama deve ser **linkado** na especificação:

```markdown
## Modelos

### Diagrama de Casos de Uso
**Arquivo**: `.specify/diagrams/[feature]_usecases.puml`

```puml
[incluir PlantUML]
```
```

---

**Versão**: 1.0  
**Data**: Mai 2026  
**Status**: Ativo
