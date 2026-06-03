# Fluxo de Modelagem do Agente Arquiteto

**Versão:** 1.1
**Data:** 2026-06-02

Este documento contém somente as etapas e os comandos de modelagem do Agente Arquiteto, em alinhamento com o Spec Kit.

## 1. Etapas de modelagem

### 1.1 Execução do Agente Arquiteto

Comando:

```text
/speckit.arquiteto.specify
```

Finalidade:

- produzir o briefing arquitetural inicial;
- identificar atores, entidades, fronteiras e restrições;
- registrar suposições e pontos em aberto;
- preparar a entrada para a especificação formal.

### 1.2 Execução da especificação formal

Comando:

```text
/speckit.specify
```

Finalidade:

- transformar o briefing arquitetural em especificação formal;
- consolidar escopo, requisitos e fronteiras de responsabilidade;
- gerar o arquivo `spec.md`.

### 1.3 Revisão do material de modelagem

Comandos de apoio:

```bash
npx markdownlint relatorios/spec-kit/fluxo_trabalho_spec_kit_adapatado_arquiteto.md
```

Quando houver diagramação:

```bash
plantuml -parse diagram.puml
```

Finalidade:

- verificar consistência textual e estrutural;
- eliminar ambiguidades;
- confirmar que a modelagem está pronta para evolução.

### 1.4 Preparação da planificação

Comando:

```text
/speckit.plan
```

Finalidade:

- converter a especificação em plano;
- manter rastreabilidade entre modelo e plano;
- preparar a decomposição em tarefas.

### 1.5 Consolidação das tarefas de modelagem

Comando:

```text
/speckit.tasks
```

Finalidade:

- decompor o plano em tarefas executáveis;
- preservar o alinhamento entre modelo, plano e futura implementação.

## 2. Comando obrigatório do fluxo arquitetural

O comando `/speckit.arquiteto.specify` deve ser executado antes de `/speckit.specify` sempre que o fluxo arquitetural estiver habilitado.

