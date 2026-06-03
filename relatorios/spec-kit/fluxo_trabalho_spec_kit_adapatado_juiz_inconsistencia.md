# Fluxo de Julgamento do Agente Juiz

**Versão:** 1.0
**Data:** 2026-06-02

Este documento contém somente as etapas e comandos de julgamento do Agente Juiz, em alinhamento com o Spec Kit.

## 1. Etapas de julgamento

### 1.1 Execução do Agente Juiz

Comando:

```text
/speckit.juiz.inconsistencia
```

Finalidade:

- analisar o relatório de inconsistências;
- comparar a implementação com a especificação e o plano;
- classificar as divergências encontradas;
- emitir uma decisão fundamentada.

### 1.2 Revisão do parecer

Comandos de apoio:

```bash
npx markdownlint relatorios/spec-kit/fluxo_trabalho_spec_kit_adapatado_juiz_inconsistencia.md
```

Quando houver artefatos de apoio, diagramas ou relatórios formais:

```bash
plantuml -parse diagram.puml
```

Finalidade:

- verificar consistência da decisão com os artefatos analisados;
- garantir rastreabilidade da justificativa;
- preparar o parecer para orientar correções.

### 1.3 Encaminhamento do resultado

Comando associado ao fluxo de saída:

```text
/speckit.implement
```

Finalidade:

- usar a decisão do Juiz como orientação para correções futuras;
- sinalizar se o ciclo de implementação pode ser encerrado ou reaberto.

## 2. Comando obrigatório do fluxo de julgamento

O comando `/speckit.juiz.inconsistencia` deve ser executado após `/speckit.implement` sempre que o fluxo de julgamento estiver habilitado.
