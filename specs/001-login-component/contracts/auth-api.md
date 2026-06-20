# API Contract — Auth (Login)

> **Feature**: `001-login-component` | **RF**: RF-005 | **Data**: 2026-06-19

## `POST /users/login`

### Request

| Propriedade | Valor |
|-------------|-------|
| **Método** | `POST` |
| **URL** | `http://localhost:3132/users/login` |
| **Content-Type** | `application/x-www-form-urlencoded` |
| **Autenticação** | Nenhuma (endpoint público) |

#### Body Parameters

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `username` | `string` | Sim | Nome de usuário |
| `password` | `string` | Sim | Senha do usuário |

#### Exemplo (curl)

```bash
curl -X POST http://localhost:3132/users/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin"
```

#### Exemplo (Axios — usado no AuthService)

```javascript
import axios from 'axios';
import { API_BASE_URL } from '../shared/config';

const params = new URLSearchParams();
params.append('username', username);
params.append('password', password);

const response = await axios.post(`${API_BASE_URL}/users/login`, params, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
```

### Response

#### 200 - Sucesso

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `access_token` | `string` | Token JWT de autenticação |

#### 401 - Credenciais Inválidas

```json
{
  "detail": "Credenciais inválidas"
}
```

#### 422 - Erro de Validação

```json
{
  "detail": [
    {
      "loc": ["body", "username"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### Tratamento de Erros (AuthService)

| Situação | HTTP Status | Ação no AuthService |
|----------|-------------|---------------------|
| Credenciais inválidas | 401 | Disparar erro com mensagem do `detail` |
| Campos inválidos/faltando | 422 | Disparar erro com "Credenciais inválidas" |
| Falha de rede | — | Disparar erro "Não foi possível conectar ao servidor. Verifique sua conexão." |
| Timeout | — | Disparar erro "O servidor não respondeu a tempo." |

### Diagramas Relacionados

- `login-sequence.puml` — Fluxo completo de requisição/resposta
- `login-classes.puml` — Classe `AuthService` e `Config`
- `login-components.puml` — Componente `AuthService` → `POST /users/login`