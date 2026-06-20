# Feature Specification: Login Component

**Feature Branch**: `001-login-component`

**Created**: 2026-06-19

**Status**: Draft — Correções R1 → R2

**Input**: User description: "Crie a especificação funcional para o componente de Login do sistema KPC (Keyphrase Curation). Sprint 01 do experimento — primeira funcionalidade do frontend MVVM. Stack: React 18 + Material UI 5 + Zustand + Axios. Arquitetura MVVM."

---

## Correções da Rodada 1 (Pós-Veredito)

**Data**: 2026-06-20
**Rodada Anterior**: R1 (encerrada em 2026-06-19)
**Veredito de Referência**: `verdict/verdict.md` — 6 evidências DE (Developer Errado), 0 AE, 0 NE
**Natureza**: Apenas correções de conformidade (CONST-R2, CONST-R3). Nenhum novo RF de funcionalidade.

### Resumo das Correções

| RF de Correção | Descrição | Evidência Origem | Prioridade |
|----------------|-----------|-----------------|------------|
| RF-001-C1 | Refatorar `User.js` para escopo mínimo: remover atributos e métodos não modelados | EVD-001-R1-003 — OVER_ENGINEERING | P1 |
| RF-001-C2 | Refatorar `AuthService.js` para expor apenas `login()` como método público | EVD-001-R1-004 — OVER_ENGINEERING | P1 |
| RF-001-C3 | Refatorar `useAuthStore` removendo ações não modeladas; manter apenas `login`, `logout`, `clearError` | EVD-001-R1-005 — OVER_ENGINEERING | P2 |
| RF-001-C4 | Adicionar `// @model:` em `shared/config.js` apontando para `login-classes.puml` | EVD-001-R1-001 — TAG_MODEL_AUSENTE | P2 |
| RF-001-C5 | Corrigir `ReferenceError` de `maxRows` em `TextField.jsx` | EVD-001-R1-006 — BUG_CODIGO | P1 |
| RF-001-C6 | Alinhar nomenclatura do hook: renomear `useLoginViewModel` para `useAuth` | EVD-001-R1-002 — NOME_DIVERGENTE | P3 |

> **Nota:** RFs originais (RF-001 a RF-010) permanecem inalterados. Esta atualização adiciona apenas RFs de correção com sufixo `-C`.

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

### User Story 3 — Correção de conformidade pós-veredito (Priority: P1)

Após a Rodada 1 do pipeline de verificação, o Juiz identificou 6 evidências de não conformidade — sendo 3 de over-engineering (violação de CONST-R2), 1 de tag ausente (violação de CONST-R3), 1 de nomenclatura divergente e 1 bug de código. O Developer precisa executar as correções determinadas para alinhar o código ao modelo existente, sem introduzir novas funcionalidades.

**Why this priority**: P1 — Over-engineering e bugs bloqueiam o merge (GATE-03). As correções são pré-requisito para avançar para a Rodada 2 de verificação.

**Independent Test**: Pode ser testado reexecutando `/speckit.analyze` e verificando que as 6 evidências originais foram resolvidas (status RESOLVIDA) e nenhuma nova evidência de mesma natureza foi gerada.

**Acceptance Scenarios**:

1. **Given** o arquivo `models/entities/User.js`, **When** refatorado conforme RF-001-C1, **Then** contém APENAS os atributos `username` e `token` e o método `fromApiResponse()`, e o fluxo de login continua funcionando.
2. **Given** o arquivo `models/services/AuthService.js`, **When** refatorado conforme RF-001-C2, **Then** expõe APENAS `login()` como método público, e a chamada `POST /users/login` continua funcionando.
3. **Given** o arquivo `viewmodels/hooks/useLoginViewModel.js` (ou `useAuth`), **When** o hook for renomeado conforme RF-001-C6, **Then** o nome do hook (arquivo e função) corresponde ao nome `useAuth` do modelo.
4. **Given** o arquivo `shared/config.js`, **When** corrigido conforme RF-001-C4, **Then** contém `// @model:` no topo apontando para `specs/001-login-component/model/login-classes.puml`.
5. **Given** a View `LoginView.jsx`, **When** a refatoração dos RFs de correção for concluída, **Then** o formulário de login continua renderizando e funcionando como especificado nos RFs originais.
6. **Given** o pipeline de verificação executado após as correções, **When** `/speckit.analyze` é chamado, **Then** as 6 evidências originais estão resolvidas e GATE-03 está aprovado.

---

### Edge Cases

- O usuário pressiona Enter no formulário — deve submeter a requisição da mesma forma que clicar em "Entrar".
- O usuário cola um texto muito longo no campo de username — o campo deve respeitar os limites do input padrão sem quebrar o layout.
- Múltiplos cliques rápidos no botão "Entrar" enquanto a requisição está em andamento — o estado desabilitado impede submissões duplicadas.
- O token armazenado em localStorage é corrompido ou manualmente alterado — na inicialização, o sistema detecta formato inválido e redireciona ao login.
- **Correção (RF-001-C5)**: O componente `TextField.jsx` não recebe `maxRows` como prop em nenhum cenário do RF-001 — a correção deve garantir que a prop seja opcional com valor padrão `undefined`, evitando `ReferenceError` sem quebrar usos futuros.
- **Correção (RF-001-C6)**: Após renomear o hook para `useAuth`, todos os imports em `LoginView.jsx` e demais dependentes devem ser atualizados — a correção deve garantir que nenhum `import` quebrado permaneça.

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

### RFs de Correção (Rodada 1 → Rodada 2)

Estes requisitos são correções de conformidade determinadas pelo Juiz no veredito da Rodada 1. Nenhum introduz nova funcionalidade.

- **RF-001-C1** (P1 — Over-engineering): O sistema DEVE refatorar `models/entities/User.js` para conter APENAS os atributos `username` (string) e `token` (string) e o método `fromApiResponse()`. Todos os demais atributos e métodos não modelados DEVEM ser removidos. *Origem: EVD-001-R1-003.*
- **RF-001-C2** (P1 — Over-engineering): O sistema DEVE refatorar `models/services/AuthService.js` para expor APENAS `login(username, password)` como método público. Métodos internos/privados são permitidos desde que não sejam exportados. *Origem: EVD-001-R1-004.*
- **RF-001-C3** (P2 — Over-engineering): O sistema DEVE refatorar `viewmodels/stores/useAuthStore.js` para conter APENAS as ações `login`, `logout` e `clearError`. Ações não modeladas (`updateUser`, `getCurrentUser`, `getToken`, `canAccessTopic`, `isAdmin`, `getAuthHeaders`, `reset` etc.) DEVEM ser removidas. *Origem: EVD-001-R1-005.*
- **RF-001-C4** (P2 — Tag ausente): O sistema DEVE adicionar o comentário `// @model: specs/001-login-component/model/login-classes.puml` na primeira linha de `shared/config.js`. *Origem: EVD-001-R1-001.*
- **RF-001-C5** (P1 — Bug): O sistema DEVE corrigir o `ReferenceError: maxRows is not defined` em `views/components/TextField.jsx`, adicionando `maxRows` à desestruturação de props com valor padrão `undefined` ou removendo a referência. *Origem: EVD-001-R1-006.*
- **RF-001-C6** (P3 — Nomenclatura): O sistema DEVE renomear o hook `useLoginViewModel` para `useAuth`, incluindo nome do arquivo (`viewmodels/hooks/useLoginViewModel.js` → `useAuth.js`), nome da função exportada e todos os imports em dependentes. *Origem: EVD-001-R1-002.*

### Key Entities *(include if feature involves data)*

- **User**: Entidade que representa o usuário autenticado. Contém APENAS as propriedades `username` (nome de usuário, string) e `token` (string de autenticação JWT). Método `fromApiResponse(response)` para construção a partir da resposta da API. Nenhum outro atributo ou método público deve existir — correção determinada por RF-001-C1.
- **AuthState**: Estado de autenticação gerenciado pela ViewModel (Zustand store). Contém `user` (User ou null), `isAuthenticated` (booleano derivado), `isLoading` (booleano de controle de UI), `error` (mensagem de erro ou null). Expõe APENAS as ações `login(username, password)`, `logout()` e `clearError()` — correção determinada por RF-001-C3.
- **LoginCredentials**: Dados de entrada do formulário de login. Contém `username` (string) e `password` (string). Usado como payload da requisição para `POST /users/login`.
- **AuthService**: Serviço de autenticação. Expõe APENAS o método público `login(username, password): Promise<string>` — correção determinada por RF-001-C2.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuários conseguem completar o login em menos de 10 segundos (incluindo preenchimento manual + latência de rede), sem necessidade de suporte externo.
- **SC-002**: 100% das tentativas de login com credenciais inválidas exibem mensagem de erro visível no formulário, sem redirecionamento.
- **SC-003**: 0% de envios duplicados — a combinação de campos desabilitados e botão com estado de loading previne múltiplas submissões.
- **SC-004**: Usuários autenticados que recarregam a página permanecem na sessão atual sem necessidade de reautenticação.
- **SC-005** (Correção): 100% dos RFs de correção (RF-001-C1 a RF-001-C6) implementados resultam em veredito NE (Ninguém Errado) na Rodada 2 do pipeline.
- **SC-006** (Correção): O GATE-03 (Over-engineering Bloqueia Merge) transiciona de NEGADO para APROVADO após a execução das correções.

## Assumptions

- O endpoint `POST /users/login` retorna um JSON contendo um campo `access_token` com o token JWT no corpo da resposta 200.
- O endpoint `POST /users/login` retorna HTTP 422 para credenciais inválidas, com corpo JSON contendo detalhes do erro.
- A rota para seleção de tópicos é `/topics` e será implementada em tarefa separada (RF-002).
- O token JWT não expira durante a sessão de uso do usuário (escopo Sprint 01 — não há refresh token).
- O username é tratado como nome de usuário textual, não como e-mail.
- O formulário utiliza componentes Material UI 5 (TextField, Button, Alert, CircularProgress).
- A ViewModel utiliza Zustand com middleware `persist` para salvar o estado em localStorage.
- A comunicação HTTP é feita via Axios, configurado com a base URL definida em `shared/config.js`.
- **Correções**: Os arquivos refatorados (RF-001-C1 a RF-001-C3) terão seus testes manuais validados antes da Rodada 2.
- **Correções**: A renomeação do hook (RF-001-C6) requer atualização de imports em `LoginView.jsx` e em qualquer outro arquivo que importe `useLoginViewModel`.
- **Correções**: O bug `maxRows` (RF-001-C5) só ocorre quando a prop não é passada — a correção com valor padrão `undefined` é suficiente e não altera comportamento existente.