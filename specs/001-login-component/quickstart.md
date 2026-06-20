# Quickstart — Login Component (Sprint 01)

> **Feature**: `001-login-component` | **Data**: 2026-06-19

## Pré-requisitos

- Node.js 18+ com npm/yarn
- Backend KPC rodando em `http://localhost:3132`
- Navegador moderno (Chrome, Firefox, Edge)

## Setup

```bash
# 1. Instalar dependências do frontend
cd kpc-frontend
npm install

# 2. Verificar que o backend está rodando
curl -X POST http://localhost:3132/users/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin"
# Esperado: 200 { "access_token": "eyJ..." }

# 3. Iniciar frontend em dev mode
npm run dev
# Esperado: servidor em http://localhost:5173
```

## Cenários de Validação

### Cenário 1: Login bem-sucedido

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | Abrir `http://localhost:5173` em navegador limpo | Tela de login com campos username + password + botão "Entrar" |
| 2 | Preencher username: `admin` | Campo reflete valor digitado |
| 3 | Preencher password: `admin` | Campo mascarado (●●●●●) |
| 4 | Clicar "Entrar" | Botão desabilita + "Entrando..." |
| 5 | Aguardar resposta | Redirecionamento para `/topics` |
| 6 | Recarregar página (F5) | Permanece em `/topics` sem redirect ao login |

**Contratos envolvidos**: `useAuthStore.login()`, `AuthService.login()`, `POST /users/login`
**Data model**: `AuthState`, `User`
**Diagramas**: `login-sequence.puml` (fluxo principal)

### Cenário 2: Campos vazios (validação client-side)

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | Abrir tela de login | Formulário visível |
| 2 | Clicar "Entrar" sem preencher campos | `TextField` exibe "O nome de usuário é obrigatório" e "A senha é obrigatória" |
| 3 | Verificar ausência de chamada à API | Nenhuma requisição a `/users/login` |

**Contratos envolvidos**: Validação no `useAuth` hook
**Data model**: `LoginCredentials` — regras de validação

### Cenário 3: Credenciais inválidas

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | Preencher username: `invalido` | Campo reflete valor |
| 2 | Preencher password: `invalida` | Campo mascarado |
| 3 | Clicar "Entrar" | Loading, depois erro |
| 4 | Verificar mensagem | `Alert` com "Credenciais inválidas" visível no formulário |
| 5 | Verificar permanência | Permanece na tela de login (sem redirect) |
| 6 | Verificar campos | Campos ainda preenchidos com os valores |

**Contratos envolvidos**: `AuthService.login()` → erro 401
**Diagramas**: `login-sequence.puml` (fluxo alternativo)

### Cenário 4: Falha de rede

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | Parar o backend (`docker compose down` ou Ctrl+C) | Backend offline |
| 2 | Preencher credenciais válidas | Campos preenchidos |
| 3 | Clicar "Entrar" | Loading, depois erro |
| 4 | Verificar mensagem | `Alert` com "Não foi possível conectar ao servidor" |
| 5 | Verificar campos | Campos reativados para nova tentativa |

**Contratos envolvidos**: `AuthService.login()` → erro de rede
**Diagramas**: `login-sequence.puml` (fluxo de falha de rede)

### Cenário 5: Logout

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | Estar autenticado (Cenário 1) | Sessão ativa |
| 2 | Clicar "Sair" (botão de logout) | Estado limpo |
| 3 | Verificar redirect | Redirecionado para `/login` |
| 4 | Recarregar página | Tela de login (sessão não persiste) |

**Contratos envolvidos**: `useAuthStore.logout()`
**Data model**: `AuthState` — transição para idle

## Referências

| Artefato | Caminho |
|----------|---------|
| Especificação | `specs/001-login-component/spec.md` |
| Plano | `specs/001-login-component/plan.md` |
| Diagrama de Classes | `specs/001-login-component/model/login-classes.puml` |
| Diagrama de Sequência | `specs/001-login-component/model/login-sequence.puml` |
| Diagrama de Componentes | `specs/001-login-component/model/login-components.puml` |
| Data Model | `specs/001-login-component/data-model.md` |
| Contratos | `specs/001-login-component/contracts/` |
| Backend OpenAPI | `kpc-backend/openapi.json` |