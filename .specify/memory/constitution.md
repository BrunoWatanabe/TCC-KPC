<!--
  SYNC IMPACT REPORT — Constitution v0.0.0 → v1.0.0
  Version change: 0.0.0 (nonexistent) → 1.0.0 (initial)
  Added sections:
    - Core Principles: 6 principles (CONST-R1 through CONST-R6)
    - Gates de Qualidade: 3 mandatory gates (GATE-01 through GATE-03)
    - Pipeline de Verificação: Automated serial pipeline (Polícia + Juiz)
    - Governance: Amendment procedures, versioning policy
  Modified principles: N/A (first version)
  Removed sections: N/A
  Templates requiring updates:
    ✅ plan-template.md — "Constitution Check" section aligned with CONST-R1..R6
    ✅ spec-template.md — "Requirements" section aligned with RF- tagging (CONST-R3)
    ✅ tasks-template.md — Task categorization includes pipeline verif. (CONST-R5)
    ⚠ Override plan-template.md — Already references modeling gates
    ⚠ Override analyze-template.md — Already references pipeline (Polícia + Juiz)
    ⚠ Override implement-template.md — Already references zero over-engineering
  Follow-up TODOs: None — all placeholders resolved.
-->

# Constituição do Projeto: Keyphrase Curation (KPC)

> **Propósito**: Regência do desenvolvimento do experimento de pesquisa
> **Escopo**: `kpc-frontend/` (React 18 + TypeScript + Vite + MVVM) e `kpc-backend/` (Python + FastAPI)
> **Modelagem MDE+SDD**: O Agente Arquiteto modela a arquitetura geral do sistema, incluindo frontend e backend, garantindo rastreabilidade entre requisitos, modelo e código em ambas as camadas.
> **Experimento**: MDE + SDD com pipeline de 4 agentes de IA

---

## Princípios Fundamentais

### CONST-R1 — MDE+SDD First (NON-NEGOTIABLE)

Todo desenvolvimento DEVE começar pela especificação (`/speckit.specify`)
seguida de modelagem arquitetural (`/speckit.plan` com **Persona Arquiteto**).
Código SOMENTE é escrito após modelo diagramático aprovado.

- A especificação (`spec.md`) DEVE conter requisitos funcionais com IDs `RF-`.
- O plano (`plan.md`) DEVE referenciar a especificação e conter Constitution Check.
- Os diagramas PlantUML (`specs/<feature>/model/*.puml`) SÃO o artefato de design
  obrigatório antes de qualquer implementação.
- NENHUMA linha de código DEVE ser escrita sem que seu elemento correspondente
  exista em um diagrama `.puml`.
- **A modelagem cobre FRONTEND e BACKEND.** O Agente Arquiteto DEVE modelar:
  - Frontend: componentes React, MVVM (views, viewmodels, models), rotas, stores
  - Backend: endpoints FastAPI, serviços, entidades, controladores, serializadores
  - A rastreabilidade `@rf:` aplica-se a elementos de ambas as camadas.

**Padrão de Modelagem PlantUML**: Todos os diagramas DEVEM seguir estritamente
a sintaxe e as boas práticas definidas no guia oficial:
`/home/daired/Documentos/TCC-KPC/documentacao-base/PlantUML_Language_Reference_Guide_en.pdf`

Este guia DEVE ser consultado como fonte autoritativa para:
- Sintaxe correta de diagramas de classes, componentes e sequência
- Definição de relacionamentos (herança, associação, dependência)
- Uso de notas, legendas e estereótipos
- Organização de pacotes e namespaces
- Formatação e estilos (cores, temas, linhas)
- Skinparams e personalização visual
- Boas práticas de legibilidade e manutenção

**Rationale**: O experimento avalia a eficácia de MDE+SDD. Pular a modelagem
invalida o propósito da pesquisa.

**Rationale**: O experimento avalia a eficácia de MDE+SDD. Pular a modelagem
invalida o propósito da pesquisa.

---

### CONST-R2 — Zero Over-Engineering (NON-NEGOTIABLE)

A implementação DEVE ser estritamente limitada ao que está modelado nos
diagramas PlantUML. NADA de funcionalidades, componentes, bibliotecas ou
lógicas sem cobertura no modelo.

- A **Persona Developer** DEVE validar que cada task em `tasks.md` possui
  elemento correspondente no modelo ANTES de implementar.
- Se uma funcionalidade não está no diagrama, ela NÃO DEVE ser implementada.
- Dúvidas sobre necessidade de extensão do modelo DEVEM ser direcionadas
  ao Arquiteto (via issue), nunca resolvidas unilateralmente no código.
- Over-engineering detectado (código sem modelo) BLOQUEIA merge até resolução
  (ver GATE-03).

**Rationale**: Over-engineering distorce a avaliação do alinhamento
modelo-código, que é a métrica central do experimento.

---

### CONST-R3 — Rastreabilidade Obrigatória

TODO artefato DEVE conter identificadores de rastreabilidade. Nenhum elemento
pode existir sem referência cruzada.

| Prefixo | Onde | Exemplo | Obrigatório em |
|---------|------|---------|----------------|
| `RF-` | spec.md | `RF-001` | Todo requisito funcional |
| `@rf:` | Modelo `.puml` | `@rf: RF-001` | Toda classe/atributo/método |
| `// @model:` | Código fonte | `// @model: classes.puml` | Todo arquivo `src/` |
| `EVD-` | evidence/inconsistencies.md | `EVD-SPRINT01-001` | Toda evidência |
| `ARG-` | evidence/inconsistencies.md | `ARG-SPRINT01-001` | Todo depoimento Arquiteto |
| `DEP-` | evidence/inconsistencies.md | `DEP-SPRINT01-001` | Todo depoimento Developer |
| `VER-` | verdict/verdict.md | `VER-SPRINT01-001` | Todo veredicto |
| `CONST-R*` | Esta constituição | `CONST-R1` | Todo princípio/norma |

**Rationale**: A rastreabilidade é o mecanismo que permite ao pipeline
(Polícia + Juiz) verificar o alinhamento modelo-código de forma
sistemática e automatizada.

---

### CONST-R4 — Arquitetura MVVM no Frontend

O frontend (`kpc-frontend/`) DEVE seguir a arquitetura **MVVM** (Model-View-
ViewModel) com camadas rigidamente separadas e refletidas nos diagramas.

| Camada | Diretório | Tecnologia | Responsabilidade |
|--------|-----------|------------|------------------|
| **View** | `src/views/` | Componentes React puros | Renderização, eventos de UI |
| **ViewModel** | `src/viewmodels/` | Zustand stores + hooks | Estado, lógica de apresentação |
| **Model** | `src/models/` | Interfaces TypeScript + serviços | Entidades, chamadas REST |
| **API** | `src/services/` ou `src/api/` | Axios | Comunicação com `kpc-backend/` |

- Views NÃO DEVEM conter lógica de estado diretamente (usar hooks/stores).
- ViewModels NÃO DEVEM conter JSX.
- Models NÃO DEVEM depender de ViewModels ou Views.
- O diagrama de componentes PlantUML DEVE refletir essas camadas e suas
  dependências unidirecionais.

**Rationale**: MVVM é a arquitetura declarada para o experimento e deve ser
seguida para garantir que a avaliação de consistência modelo-código seja
significativa.

---

### CONST-R5 — Pipeline de Verificação Automático (NON-NEGOTIABLE)

Após a implementação, o comando `/speckit.analyze` DEVE executar
automaticamente o pipeline de verificação em série, sem intervenção manual:

1. **Análise nativa Spec-Kit**: Load artifacts, build semantic models,
   detection passes, severity assignment, report output.
2. **👮‍♂️ Polícia de Inconsistências**: Varredura modelo-vs-código,
   coleta de evidências EVD- com localização exata e depoimentos
   automáticos ARG- + DEP- em `evidence/inconsistencies.md`.
3. **⚖️ Juiz (automático)**: Leitura do relatório da Polícia, aplicação
   da árvore de decisão, produção de veredicto VER- em `verdict/verdict.md`.

- A execução DEVE ser serial: Etapa 1 → Etapa 2 → Etapa 3.
- NENHUMA intervenção manual é permitida entre etapas.
- O veredicto do Juiz É a saída final e DEVE ser salva em
  `specs/<feature>/verdict/verdict.md`.

**Rationale**: A automatização completa do pipeline de verificação é parte
integrante do experimento. Intervenção manual compromete a reprodutibilidade.

---

### CONST-R6 — Constituição como Árbitro Final

Em caso de conflito entre modelo e código, ou entre personas, esta
constituição tem autoridade máxima sobre decisões de arquitetura e padrões.

- Disputas entre Arquiteto e Developer que não forem resolvidas pelo
  pipeline (Polícia + Juiz) SOBEM para árbitros humanos.
- Decisões do Juiz que contrariam princípios constitucionais podem ser
  apeladas, mas a apelação DEVE citar o princípio violado (CONST-R*).
- NENHUM veredicto pode ignorar ou contradizer um princípio CONST-R sem
  justificativa explícita no próprio veredicto.

**Rationale**: A constituição garante consistência nas decisões ao longo
do experimento e estabelece uma hierarquia clara de autoridade.

---

## Gates de Qualidade

### GATE-01 — Planejamento Obrigatório

NENHUM `/speckit.implement` DEVE ser executado sem que `/speckit.plan`
tenha sido concluído com diagramas `.puml` em `specs/<feature>/model/`.

- **Verificação**: O override da Persona Developer DEVE checar a existência
  dos diagramas ANTES de iniciar qualquer implementação.
- **Violação**: Implementação sem modelo é considerada over-engineering
  (violação de CONST-R2).
- **Bloqueio**: O merge da branch é bloqueado até que o modelo exista.

### GATE-02 — Análise Pré-Merge

NENHUM merge DEVE ser realizado sem que `/speckit.analyze` tenha sido
executado com veredicto do Juiz registrado em `verdict/verdict.md`.

- **Verificação**: O pipeline de CI (ou verificação manual) DEVE conferir
  a existência de `verdict/verdict.md` com data posterior ao último commit.
- **Exceção**: Veredictos com decisão `NE` (Ninguém Errado) liberam o merge
  automaticamente. Decisões `DE`, `AE` ou `AMBOS` exigem correção seguida
  de re-análise.

### GATE-03 — Over-engineering Bloqueia Merge

Over-engineering detectado (código sem elemento correspondente no modelo,
ou modelo sem RF correspondente) BLOQUEIA o merge até resolução documentada.

- **Detecção**: Realizada pela Polícia (CHK-CLASS-03, CHK-METH-03).
- **Resolução**: Developer remove o código órfão OU Arquiteto atualiza o
  modelo e a especificação. A resolução DEVE ser documentada e re-analisada.

---

## Pipeline de Verificação

### Fluxo Serial Automático

```mermaid
flowchart LR
    A[/speckit.analyze] --> B[Análise Nativa<br/>Spec-Kit]
    B --> C[👮‍♂️ Polícia<br/>EVD- + ARG- + DEP-]
    C --> D[⚖️ Juiz<br/>VER-]
    D --> E[verdict/verdict.md]
```

### Responsabilidades

| Etapa | Persona | Artefato de Saída | Conteúdo |
|-------|---------|-------------------|----------|
| 1 | Spec-Kit nativo | Relatório textual de análise | Tabela de findings |
| 2 | 👮‍♂️ Polícia | `evidence/inconsistencies.md` | EVD- com localizações + depoimentos ARG-/DEP- |
| 3 | ⚖️ Juiz | `verdict/verdict.md` | VER- com decisão (DE/AE/AMBOS/NE) + sentença |

### Estrutura de Diretórios Esperada

```text
specs/<feature>/
├── spec.md                    # RF-001, RF-002...
├── model/                     # Diagramas PlantUML
│   ├── classes.puml           # @rf: RF-XXX
│   └── components.puml
├── evidence/                  # Relatório da Polícia
│   └── inconsistencies.md     # EVD-, ARG-, DEP-
└── verdict/                   # Julgamento do Juiz
    └── verdict.md             # VER-
```

---

## Governança

### Hierarquia de Autoridade

1. **🧑‍🔬 Pesquisador (Daired)** — Autoridade máxima. Decisões humanas
   sobre o experimento.
2. **📜 Constituição (CONST-R\*)** — Autoridade máxima automatizada.
   Princípios e gates são vinculantes.
3. **⚖️ Juiz (VER-\*)** — Autoridade no pipeline de verificação.
   Veredictos são finais dentro do escopo de uma sprint, sujeitos a
   apelação fundamentada em CONST-R\*.
4. **🏗️👨‍💻👮‍♂️ Arquiteto, Developer, Polícia** — Executores.

### Procedimento de Emenda

1. Qualquer princípio CONST-R pode ser emendado por solicitação do
   pesquisador.
2. A emenda DEVE ser documentada como novo commit na constituição.
3. A versão (semântica) DEVE ser incrementada:
   - **MAJOR**: Remoção ou redefinição de princípio/gate.
   - **MINOR**: Adição de novo princípio ou seção.
   - **PATCH**: Esclarecimentos, correções de redação.
4. Após emenda, os templates DEVEM ser revisados para alinhamento.
5. O Sync Impact Report (HTML comment no topo) DEVE ser atualizado.

### Compliance Review

- `/speckit.plan` valida Constitution Check automaticamente.
- `/speckit.analyze` inclui Constitution Alignment detection pass.
- Overrides de templates (plan, implement, analyze) DEVEM referenciar
  os princípios CONST-R aplicáveis.

---

**Version**: 1.0.0 | **Ratified**: 2026-06-19 | **Last Amended**: 2026-06-19
