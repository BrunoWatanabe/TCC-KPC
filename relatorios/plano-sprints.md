# Plano de Sprints — Keyphrase Curation (KPC)

**Projeto:** Frontend MVVM de curadoria de keyphrases com backend FastAPI
**Pipeline:** Spec-Kit + 4 Personas (Arquiteto, Developer, Polícia, Juiz)
**Total de Sprints:** 4 sprints
**Ritmo:** 1 sprint por dia útil (~4h/dia)

---

## Convenções do Pipeline

Cada sprint deste plano executa **obrigatoriamente** o pipeline completo:

```mermaid
flowchart LR
    A[/speckit.specify\\] --> B[/speckit.plan\\]
    B --> C[/speckit.tasks\\]
    C --> D[/speckit.implement\\]
    D --> E[\Commit\]
    E --> F[/speckit.analyze\\]
    B -.->|+ Arquiteto| B2
    D -.->|+ Developer| D2
    F -.->|Polícia ➡ Juiz| F2
```

| Passo | Comando | Persona | Artefato |
|-------|---------|---------|----------|
| 0 | `/speckit.constitution` | — | `.specify/memory/constitution.md` |
| 1 | `/speckit.specify` | — | `specs/<feature>/spec.md` (RF-N) |
| 2 | `/speckit.plan` | 🏗️ Arquiteto | `specs/<feature>/model/*.puml` com `@rf:` |
| 3 | `/speckit.tasks` | — | `specs/<feature>/tasks.md` |
| 4 | `/speckit.implement` | 👨‍💻 Developer | Código com `// @model:` |
| 5 | `git commit` | Humano | Commit |
| 6 | `/speckit.analyze` | 👮‍♂️ Polícia + ⚖️ Juiz | `evidence/inconsistencies.md` + `verdict/verdict.md` |

---

## Sprint 01 — Autenticação e Timeline de Tópicos

**Escopo:** Tela de login funcional + seletor de tópicos (abortion, cloning, etc.).

### RFs da Sprint

| RF | Descrição | Prioridade |
|----|-----------|------------|
| RF-001 | Login com e-mail e senha via API | P1 |
| RF-002 | Seletor de tópicos carregado do backend | P1 |

### O que precisa ser feito

| Tarefa | Backend | Frontend | Artefato Esperado |
|--------|---------|----------|-------------------|
| **T001** | ✅ (já existe endpoint de login em `/auth/login`) | Criar/refinar `LoginView.jsx` com formulário e store `useAuthStore` | `specs/sprint-01/model/login.puml` → `views/pages/LoginView.jsx` |
| **Status** | � Concluída | **3 rodadas completas:** R1 (6 evidências DE → correções ST001.1), R2 (6 RESOLVIDAS, GATE-03 liberado), R3 (runtime legados corrigido ST001.2). |
| **ST001.1** | N/A | Aplicar correções determinadas pelo veredito da Rodada 1 (`specs/001-login-component/verdict/verdict.md`): refatorar `User.js` para escopo mínimo, refatorar `AuthService.js` para expor apenas `login()`, remover ações não modeladas de `useAuthStore`, adicionar `// @model:` em `config.js`, corrigir `maxRows` no `TextField.jsx`, alinhar nomenclatura do hook `useAuth` | Executar novo ciclo: `commit` → `/speckit.analyze` (Rodada 2) |
| **Status ST001.1** | 🟢 Concluída | Rodada 2 aprovou todas as 6 correções como RESOLVIDAS. GATE-03 (over-engineering) liberado. |
| **ST001.2** | N/A | Aplicar correções determinadas pelo veredito da Rodada 2 e corrigir bug de runtime: (1) `authService` não exportado — corrigir imports em 6 arquivos legados; (2) varredura de imports quebrados em `src-mvvm/`; (3) console limpo | Executar novo ciclo: `commit` → `/speckit.analyze` (Rodada 3) |
| **Status ST001.2** | 🟢 Concluída | Rodada 3 confirmou runtime sem erros. 0 novas evidências. 6 evidências R1 mantidas RESOLVIDAS. |
| **T002** | ✅ (já existe endpoint de tópicos em `/topics`) | Criar/refinar `TopicSelectionView.jsx` com store `useTopicStore` | `specs/sprint-01/model/topics.puml` → `views/pages/TopicSelectionView.jsx` |

### Arquivos impactados (frontend)

| Arquivo | Ação |
|---------|------|
| `views/pages/LoginView.jsx` | Refatorar para MVVM puro |
| `viewmodels/stores/useAuthStore.js` | Ajustar fluxo de erro |
| `models/services/AuthService.js` | Verificar contrato com API |
| `views/pages/TopicSelectionView.jsx` | Refatorar loading/error states |
| `viewmodels/stores/useTopicStore.js` | Adicionar cache |

---

## Sprint 02 — Correção de Serialização: Pairwise Similarity

**Escopo:** Corrigir `500 Internal Server Error` no endpoint `GET /topic/clusters/{username}/{topic}/pairwise_similarity`.

**Causa raiz:** O backend retorna `numpy.int64` na resposta JSON, que o Pydantic/FastAPI não consegue serializar (`PydanticSerializationError: Unable to serialize unknown type: <class 'numpy.int64'>`).

**Backend:** `kpc-backend/` — endpoint em `src/keyphrase_curation/`

### RFs da Sprint

| RF | Descrição | Prioridade |
|----|-----------|------------|
| RF-003 | Corrigir serialização do endpoint pairwise_similarity | P1 |

### O que precisa ser feito

| Tarefa | Backend | Frontend | Artefato Esperado |
|--------|---------|----------|-------------------|
| **T002** | 🔴 Corrigir endpoint `/topic/clusters/{username}/{topic}/pairwise_similarity` — converter `numpy.int64` para `int` antes de serializar a resposta. A correção pode ser feita com encoder customizado no JSONResponse ou convertendo os valores numpy no retorno da rota. Testar com `curl` ou navegador após correção. | N/A (frontend apenas consome) | `curl http://localhost:3132/topic/clusters/daired/cloning/pairwise_similarity` retorna 200 |

### Arquivos impactados (backend)

| Arquivo | Ação |
|---------|------|
| `src/keyphrase_curation/controller/` | Localizar endpoint pairwise_similarity e adicionar conversão numpy → int |
| `src/keyphrase_curation/view/` | Possível serializador/response model |

---

## Sprint 03 — Correção de Serialização: Centroid Similarity

**Escopo:** Corrigir `500 Internal Server Error` no endpoint `GET /topic/clusters/{username}/{topic}/centroid_similarity`.

**Causa raiz:** Mesmo erro da Sprint 02 — `numpy.int64` não serializável pelo Pydantic.

### RFs da Sprint

| RF | Descrição | Prioridade |
|----|-----------|------------|
| RF-004 | Corrigir serialização do endpoint centroid_similarity | P1 |

### O que precisa ser feito

| Tarefa | Backend | Frontend | Artefato Esperado |
|--------|---------|----------|-------------------|
| **T003** | 🔴 Corrigir endpoint `/topic/clusters/{username}/{topic}/centroid_similarity` — mesma correção: garantir que todos os valores numpy sejam convertidos para tipos nativos Python antes da serialização. Se o encoder customizado foi criado na Sprint 02, reutilizá-lo aqui. | N/A (frontend apenas consome) | `curl http://localhost:3132/topic/clusters/daired/cloning/centroid_similarity` retorna 200 |

### Arquivos impactados (backend)

| Arquivo | Ação |
|---------|------|
| `src/keyphrase_curation/controller/` | Localizar endpoint centroid_similarity e aplicar mesma correção |
| `src/keyphrase_curation/view/` | Mesmo serializador/response model da Sprint 02 |

---

## Mapa de Dependências entre Sprints

```mermaid
flowchart LR
    S1[Sprint 01<br/>Login + Refinar<br/>✅ Concluída] --> S2[Sprint 02<br/>Bug pairwise<br/>similarity]
    S2 --> S3[Sprint 03<br/>Bug centroid<br/>similarity]
```

| Sprint | Depende de | É pré-requisito para |
|--------|-----------|----------------------|
| 01 — Login + Refinar | — | 02 |
| 02 — Bug pairwise_similarity | 01 | 03 |
| 03 — Bug centroid_similarity | 02 | — |

---

## Resumo de Esforço por Sprint

| Sprint | RFs | Tarefas | Frontend | Backend |
|--------|-----|---------|----------|---------|
| Sprint 01 | RF-001, RF-002 | T001 + ST001.1 + ST001.2 | Refatorar 4 arquivos | Nenhum |
| Sprint 02 | RF-003 | T002 | N/A | Corrigir serialização pairwise |
| Sprint 03 | RF-004 | T003 | N/A | Corrigir serialização centroid |

> **Nota:** O backend (`kpc-backend`) já está implementado e funcional. As sprints focam exclusivamente no frontend (`kpc-frontend/src-mvvm/`), consumindo as APIs existentes.