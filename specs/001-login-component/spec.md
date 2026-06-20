# Feature Specification: Login Component

**Feature Branch**: `001-login-component`

**Created**: 2026-06-19

**Status**: Draft

**Input**: User description: "Crie a especificação funcional para o componente de Login do sistema KPC (Keyphrase Curation). Sprint 01 do experimento — primeira funcionalidade do frontend MVVM. Stack: React 18 + Material UI 5 + Zustand + Axios. Arquitetura MVVM."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Autenticação de usuário via formulário de login (Priority: P1)

O usuário não autenticado acessa a aplicação e se depara com a tela de login. Ele preenche seu nome de usuário (username) e senha, submete o formulário e, se as credenciais forem válidas, é autenticado e redirecionado automaticamente para a tela de seleção de tópicos.

**Why this priority**: P1 — É a funcionalidade mínima para qualquer interação com o sistema. Sem autenticação, o usuário não pode acessar nenhuma outra funcionalidade. É o ponto de partida obrigatório de toda a aplicação.

**Independent Test**: Pode ser testado independentemente abrindo a aplicação em um navegador limpo (sem sessão prévia), preenchendo credenciais válidas e verificando o redirecionamento para a tela de tópicos. Nenhuma outra funcionalidade precisa existir.

**Acceptance Scenarios**:

1. **Given** um usuário não autenticado que acessa a aplicação, **When** a tela de login é renderizada, **Then** o formulário exibe os campos "Nome de usuário" e "Senha", um botão "Entrar", e nenhuma mensagem de erro.
2. **Given** o formulário de login com campos preenchidos com username e senha válidos, **When** o usuário clica em "Entrar", **Then** o botão exibe "Entrando..." e fica desabilitado, os campos ficam desabilitados, e após a resposta de sucesso o token é armazenado no estado global (Zustand com persist em localStorage) e o usuário é redirecionado para `/topics`.
3. **Given** o formulário de login, **When** o usuário submete o formulário com campos vazios, **Then** o sistema exibe validação de campo obrigatório antes de fazer a requisição, sem chamar a API.
4. **Given** o formulário de login, **When** o usuário submete credenciais inválidas, **Then** uma mensagem de erro amigável é exibida em um `Alert` do MUI no formulário, os campos permanecem preenchidos, e o usuário permanece na tela de login.
5. **Given** o formulário de login durante o processamento da requisição, **When** ocorre uma falha de rede, **Then** o sistema exibe uma mensagem de erro amigável informando sobre problemas de conexão, reativa os campos e o botão, e mantém o usuário na tela de login.

---

### User Story 2 — Persistência de sessão entre recargas (Priority: P2)

Um usuário que já foi autenticado anteriormente recarrega a página ou retorna à aplicação em outro momento e permanece autenticado, sem precisar fazer login novamente.

**Why this priority**: P2 — Embora crucial para usabilidade, não bloqueia o teste da funcionalidade principal. O usuário pode fazer login novamente se necessário. A persistência agrega valor de experiência sem ser mandatória para o MVP.

**Independent Test**: Pode ser testado sem dependências externas: autenticar-se uma vez, recarregar a página (F5), e verificar que o usuário permanece na tela de tópicos sem redirecionamento para o login.

**Acceptance Scenarios**:

1. **Given** um usuário autenticado com token armazenado em localStorage, **When** a página é recarregada, **Then** o estado de autenticação é restaurado e o usuário permanece na tela atual sem redirecionamento ao login.
2. **Given** um usuário com token expirado ou inválido armazenado, **When** a aplicação inicializa, **Then** o token é removido do estado global e o usuário é redirecionado para a tela de login.

---

### Edge Cases

- O usuário pressiona Enter no formulário — deve submeter a requisição da mesma forma que clicar em "Entrar".
- O usuário cola um texto muito longo no campo de username — o campo deve respeitar os limites do input padrão sem quebrar o layout.
- Múltiplos cliques rápidos no botão "Entrar" enquanto a requisição está em andamento — o estado desabilitado impede submissões duplicadas.
- O token armazenado em localStorage é corrompido ou manualmente alterado — na inicialização, o sistema detecta formato inválido e redireciona ao login.

## Requirements *(mandatory)*

### Functional Requirements

- **RF-001**: O sistema DEVE exibir um formulário de login com campos para "Nome de usuário" (username) e "Senha" (password) quando o usuário não está autenticado.
- **RF-002**: O sistema DEVE validar que ambos os campos não estão vazios antes de submeter a requisição à API.
- **RF-003**: O sistema DEVE desabilitar os campos de entrada e o botão de submissão enquanto a requisição de login está em andamento.
- **RF-004**: O sistema DEVE exibir "Entrando..." no botão de submissão durante a requisição, substituindo o texto padrão "Entrar".
- **RF-005**: O sistema DEVE chamar o endpoint `POST /users/login` com `Content-Type: application/x-www-form-urlencoded`, enviando `username` e `password` como parâmetros do body.
- **RF-006**: O sistema DEVE, em caso de sucesso (HTTP 200), extrair o token de autenticação da resposta e armazená-lo no estado global (Zustand store com persistência em localStorage).
- **RF-007**: O sistema DEVE, após autenticação bem-sucedida, redirecionar o usuário para a tela de seleção de tópicos (rota `/topics`).
- **RF-008**: O sistema DEVE, em caso de erro (HTTP 422, 401 ou falha de rede), exibir uma mensagem de erro amigável em um componente `Alert` do MUI dentro do formulário de login, sem redirecionar o usuário.
- **RF-009**: O sistema DEVE, ao inicializar, verificar se existe um token de autenticação válido no estado persistido — se existir, restaurar o estado de autenticação sem redirecionar ao login.
- **RF-010**: O campo de senha DEVE ter o tipo `password` (mascarado) para proteger a entrada visual do usuário.

### Key Entities *(include if feature involves data)*

- **User**: Entidade que representa o usuário autenticado. Contém as propriedades `username` (nome de usuário, string) e `token` (string de autenticação JWT). É criada após login bem-sucedido e armazenada no estado global.
- **AuthState**: Estado de autenticação gerenciado pela ViewModel (Zustand store). Contém `user` (User ou null), `isAuthenticated` (booleano derivado), `isLoading` (booleano de controle de UI), `error` (mensagem de erro ou null). Expõe ações `login(username, password)` e `logout()`.
- **LoginCredentials**: Dados de entrada do formulário de login. Contém `username` (string) e `password` (string). Usado como payload da requisição para `POST /users/login`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuários conseguem completar o login em menos de 10 segundos (incluindo preenchimento manual + latência de rede), sem necessidade de suporte externo.
- **SC-002**: 100% das tentativas de login com credenciais inválidas exibem mensagem de erro visível no formulário, sem redirecionamento.
- **SC-003**: 0% de envios duplicados — a combinação de campos desabilitados e botão com estado de loading previne múltiplas submissões.
- **SC-004**: Usuários autenticados que recarregam a página permanecem na sessão atual sem necessidade de reautenticação.

## Assumptions

- O endpoint `POST /users/login` retorna um JSON contendo um campo `access_token` com o token JWT no corpo da resposta 200.
- O endpoint `POST /users/login` retorna HTTP 422 para credenciais inválidas, com corpo JSON contendo detalhes do erro.
- A rota para seleção de tópicos é `/topics` e será implementada em tarefa separada (RF-002).
- O token JWT não expira durante a sessão de uso do usuário (escopo Sprint 01 — não há refresh token).
- O username é tratado como nome de usuário textual, não como e-mail.
- O formulário utiliza componentes Material UI 5 (TextField, Button, Alert, CircularProgress).
- A ViewModel utiliza Zustand com middleware `persist` para salvar o estado em localStorage.
- A comunicação HTTP é feita via Axios, configurado com a base URL definida em `shared/config.js`.