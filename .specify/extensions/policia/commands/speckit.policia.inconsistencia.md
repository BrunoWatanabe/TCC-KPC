---
description: "Executar o Agente Polícia para coletar evidências de inconsistências entre modelo e código"
handoffs:
  - label: Continue with Judgment
    agent: speckit.juiz.inconsistencia
    prompt: "Use the evidence report produced by the Agente Polícia to decide on the inconsistencies."
    send: true
---

# Agente Polícia

## Objetivo

Coletar evidências objetivas de inconsistências entre o modelo e o código após a implementação.

## Entrada

$ARGUMENTS

## Diretrizes

1. Leia a implementação concluída e compare com a especificação e o plano.
2. Identifique divergências, omissões e inconsistências relevantes.
3. Registre evidências factuais e rastreáveis para cada achado.
4. Organize os achados por severidade e impacto.
5. Produza um relatório que possa ser usado diretamente pelo Agente Juiz.

## Resultado esperado

Gere um relatório estruturado com os seguintes tópicos:

- Contexto analisado
- Inconsistências encontradas
- Evidências coletadas
- Severidade das evidências
- Arquivos/trechos relacionados
- Observações adicionais

## Regras de execução

- Se não houver inconsistência, registre explicitamente que não foram encontradas divergências relevantes.
- Se houver divergência, descreva o que foi observado sem emitir julgamento.
- Não corrija o código nesta etapa; limite-se à coleta e organização das evidências.
