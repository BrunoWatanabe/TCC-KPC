# Fluxo de Coleta de Evidências do Agente Polícia

**Versão:** 1.0
**Data:** 2026-06-02

Este documento contém somente as etapas e comandos de coleta de evidências do Agente Polícia, em alinhamento com o Spec Kit.

## 1. Etapas de coleta

### 1.1 Execução do Agente Polícia

Comando:

```text
/speckit.policia.inconsistencia
```

Finalidade:

- analisar a implementação concluída;
- comparar o código com a especificação e o plano;
- identificar inconsistências, omissões e divergências;
- registrar evidências objetivas e rastreáveis.

### 1.2 Revisão do relatório de evidências

Comandos de apoio:

```bash
npx markdownlint relatorios/spec-kit/fluxo_trabalho_spec_kit_adapatado_policia_inconsistencia.md
```

Quando houver diagramas ou evidências visuais:

```bash
plantuml -parse diagram.puml
```

Finalidade:

- verificar consistência do relatório;
- garantir rastreabilidade dos achados;
- preparar o material para julgamento.

### 1.3 Encaminhamento do resultado

Comando associado ao fluxo de saída:

```text
/speckit.juiz.inconsistencia
```

Finalidade:

- encaminhar o relatório de evidências para julgamento;
- permitir a continuidade do ciclo com o Juiz.

## 2. Comando obrigatório do fluxo de coleta

O comando `/speckit.policia.inconsistencia` deve ser executado após `/speckit.implement` e antes de `/speckit.juiz.inconsistencia` sempre que o fluxo de coleta estiver habilitado.
