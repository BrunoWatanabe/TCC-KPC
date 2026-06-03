# Fluxo de Desenvolvimento do Agente Developer

**Versão:** 1.0
**Data:** 2026-06-02

Este documento contém somente as etapas e comandos de desenvolvimento do Agente Developer, em alinhamento com o Spec Kit.

## 1. Etapas de desenvolvimento

### 1.1 Execução do Agente Developer

Comando:

```text
/speckit.developer.implement
```

Finalidade:

- analisar `spec.md`, `plan.md` e `tasks.md`;
- preparar a implementação do frontend;
- identificar componentes, fluxos e dependências técnicas;
- registrar riscos, suposições e pontos em aberto.

### 1.2 Execução da implementação formal

Comando:

```text
/speckit.implement
```

Finalidade:

- executar o plano de implementação;
- produzir o código incrementalmente;
- respeitar as tarefas definidas em `tasks.md`.

### 1.3 Revisão do material de desenvolvimento

Comandos de apoio:

```bash
npx markdownlint relatorios/spec-kit/fluxo_trabalho_spec_kit_adapatado_developer.md
```

Quando houver diagramação ou contratos associados ao desenvolvimento:

```bash
plantuml -parse diagram.puml
```

Finalidade:

- verificar consistência entre especificação, plano e tarefas;
- confirmar que o desenvolvimento está alinhado ao briefing do Developer.

### 1.4 Integração com tarefas do Spec Kit

Comando:

```text
/speckit.tasks
```

Finalidade:

- garantir que as tarefas estejam prontas para a implementação;
- manter rastreabilidade entre planejamento e desenvolvimento.

## 2. Comando obrigatório do fluxo de desenvolvimento

O comando `/speckit.developer.implement` deve ser executado antes de `/speckit.implement` sempre que o fluxo de desenvolvimento estiver habilitado.
