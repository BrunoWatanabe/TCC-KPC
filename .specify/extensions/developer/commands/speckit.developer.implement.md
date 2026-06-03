---
---
id: speckit.developer.implement
title: Agente Developer — Implement
description: "Executar o Agente Developer para preparar, detalhar e orientar a implementação do frontend a partir de `spec.md` e `plan.md`. Produz briefing de implementação e artefatos para `/speckit.implement` e inspeção posterior por Polícia/Juiz."
version: 1.1.0
handoffs:
  - to: speckit.implement
    artifact: implementation-brief.json
    send: true
  - to: speckit.policia.inconsistencia
    artifact: implementation-evidence.json
    send: false
inputs:
  - name: spec_md
    type: markdown
    required: true
  - name: plan_md
    type: markdown
    required: false
  - name: repository_context
    type: object
    required: false
outputs:
  - name: implementation_brief_md
    type: markdown
    required: true
  - name: implementation_brief_json
    type: json
    required: true
expected_artifacts:
  - tasks.md
  - tasks.json
  - implementation-guidelines.md
---

# Agente Developer

## Objetivo (expandido)

Transformar `spec.md`/`plan.md` em um conjunto claro e executável de tarefas, contratos (OpenAPI/GraphQL), rascunhos de componentes e instruções de verificação que permitam a implementação incremental e rastreável. Produz artefatos legíveis por humanos e por máquinas para downstream (`/speckit.implement`, `/speckit.policia.inconsistencia`).

## Entradas

- `$ARGUMENTS`: descrição da tarefa/feature fornecida pelo usuário.
- `spec_md` (obrigatório): especificação formal gerada pelo Arquiteto/Spec Kit.
- `plan_md` (opcional): plano de alto nível.
- `repository_context` (opcional): arquivos de referência, padrões de projeto existentes, guidelines do time.

## Saídas / Artefatos

1. `implementation_brief.md` — documento humano com:
   - Contexto da implementação
   - Mapa de requisitos → tarefas (REQ-XXX → TASK-XXX)
   - Design de API/contratos sugeridos (esqueleto OpenAPI/POJO)
   - Estrutura de componentes e telas
   - Lista de dependências e bibliotecas sugeridas
   - Estratégia de testes (unit/integration/e2e)

2. `implementation_brief.json` — versão estruturada contendo: `requirements_map`, `tasks[]`, `contracts[]`, `estimates`.

3. `tasks.md` / `tasks.json` — tarefas com `id`, `title`, `description`, `acceptance_criteria`, `estimate`, `labels`

4. `implementation-guidelines.md` — checklists e instruções de estilo, linting, e obrigatoriedades (ex.: cobertura mínima de testes).

## Diretrizes detalhadas

1. Mapear cada `REQ-` do `spec.md` para pelo menos uma `TASK-` ou justificar por que não é necessária.
2. Priorizar entregas mínimas (MVP) e definir milestones incrementais.
3. Para APIs, produzir um esqueleto OpenAPI com endpoints, métodos, parâmetros e exemplos de payloads.
4. Para UI, produzir esboços de componentes (nome, props, estados) e fluxo de navegação.
5. Definir critérios de aceitação mensuráveis para cada tarefa (testes automatizáveis e critérios manuais).
6. Sinalizar riscos técnicos e apontar dependências externas (serviços, quotas, feature flags).
7. Incluir comandos shell/DSL recomendados para rodar testes locais, lint e builds rápidos.

## Formatos e exemplos

Exemplo mínimo de `tasks.json`:

```json
{
  "tasks": [
    {
      "id": "TASK-001",
      "title": "Implementar endpoint /foo",
      "description": "Criar rota backend e contrato OpenAPI",
      "acceptance": "OpenAPI + testes de contrato",
      "estimate": "Média",
      "labels": ["backend","api"]
    }
  ]
}
```

Exemplo de esqueleto OpenAPI (resumo):

```yaml
openapi: 3.0.1
paths:
  /items:
    get:
      summary: List items
      responses:
        '200':
          description: OK

```

## Checklist de validação automática (CI)

1. `implementation_brief.json` e `tasks.json` são válidos JSON.
2. Cada `TASK-` referencia pelo menos um `REQ-` do `spec.md`.
3. `acceptance_criteria` está presente para todas as tarefas de prioridade alta.
4. Lint básico aplicado (se houver `package.json`, rodar `npm run lint`/`pnpm lint`).
5. Scripts sugeridos para rodar os testes locais documentados em `implementation-guidelines.md`.

Exemplo de validação rápida:

```bash
python3 - <<'PY'
import json, yaml
from pathlib import Path
print('validando...')
path = Path('relatorios/spec-kit/specify_base_agentes.md')
print('spec base OK' if path.exists() else 'spec base ausente')
PY
```

## Handoffs e integração

- Enviar `implementation-brief.json` para `/speckit.implement` com `send: true` para permitir execução automática.
- Gerar `implementation-evidence.json` (amostras de outputs, contratos gerados, snippets) para inspeção pela Polícia; `send: false` para revisão humana prévia.

## Prompt engineering — instruções sugeridas para o agente

Prompt-base (Developer):
"Você é um Developer sênior. A partir do `spec.md` e `plan.md`, gere `implementation_brief.md`, `tasks.json` e um esqueleto OpenAPI se aplicável. Mapeie cada requisito para tarefas concretas com critérios de aceitação e estimativas. Priorize entregas testáveis e incrementalidade."

Prompt curto (uso humano):
"Converta o spec em 6 tarefas prioritárias, gerando `tasks.json` e um esqueleto OpenAPI para os endpoints descritos." 

## Política de versionamento e compatibilidade

- Versão do comando (`version`) deve usar semântica; atualize `minor` para adições não disruptivas.
- Quando o schema de `tasks.json` mudar, documente migração e incremente `major`.

## Observabilidade e rastreabilidade

- Cada `TASK-` deve incluir campo `trace_to` com referência `REQ-XXX` e, quando aplicável, `file:path#L` apontando para linhas relevantes no repositório.
- Registrar hashes dos artefatos gerados para auditoria.

## Exemplo de fluxo (integração com outros agentes)

1. `speckit.arquiteto.specify` produz `architectural_brief.json`.
2. `speckit.specify` consome e gera `spec.md`.
3. `speckit.developer.implement` consome `spec.md` e gera `tasks.json` + `implementation_brief.json`.
4. Após implementação, `speckit.policia.inconsistencia` coleta evidências e gera `police-report.json`.

## Observações finais

- Documente qualquer suposição como `ASSUME-` com breve justificativa.
- Mantenha exemplos em `relatorios/spec-kit/examples/` para testes de integração.

---
Atualizado para versão 1.1.0: especificação detalhada do Agente Developer alinhada ao Spec Kit, ao protocolo de pesquisa e ao fluxo de implementação.
