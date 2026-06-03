# Fluxo de Trabalho Formalizado — Spec Kit + Quatro Agentes

**Versão:** 1.3
**Data:** 2026-06-02

Este documento é o índice operacional do fluxo principal. Ele conecta os quatro agentes especializados já descritos em documentos próprios e apresenta a ordem de execução dentro do Spec Kit.

## Visão Geral

O fluxo integrado segue esta sequência:

1. [Agente Arquiteto](fluxo_trabalho_spec_kit_adapatado_arquiteto.md)
2. [Agente Developer](fluxo_trabalho_spec_kit_adapatado_developer.md)
3. [Agente Polícia de Inconsistência](fluxo_trabalho_spec_kit_adapatado_policia_inconsistencia.md)
4. [Agente Juiz de Inconsistência](fluxo_trabalho_spec_kit_adapatado_juiz_inconsistencia.md)

## Ordem do Pipeline

### 1. Modelagem

O ciclo começa com o Agente Arquiteto, que produz a base de modelagem e o briefing arquitetural.

Comando principal:

```text
/speckit.arquiteto.specify
```

Documento de referência:

- [fluxo_trabalho_spec_kit_adapatado_arquiteto.md](fluxo_trabalho_spec_kit_adapatado_arquiteto.md)

### 2. Desenvolvimento

Em seguida, o Agente Developer prepara e orienta a implementação a partir da especificação e do plano.

Comando principal:

```text
/speckit.developer.implement
```

Documento de referência:

- [fluxo_trabalho_spec_kit_adapatado_developer.md](fluxo_trabalho_spec_kit_adapatado_developer.md)

### 3. Coleta de Evidências

Após a implementação, o Agente Polícia coleta evidências objetivas de inconsistências entre modelo e código.

Comando principal:

```text
/speckit.policia.inconsistencia
```

Documento de referência:

- [fluxo_trabalho_spec_kit_adapatado_policia_inconsistencia.md](fluxo_trabalho_spec_kit_adapatado_policia_inconsistencia.md)

### 4. Julgamento

Por fim, o Agente Juiz analisa as evidências e emite a decisão formal sobre a inconsistência.

Comando principal:

```text
/speckit.juiz.inconsistencia
```

Documento de referência:

- [fluxo_trabalho_spec_kit_adapatado_juiz_inconsistencia.md](fluxo_trabalho_spec_kit_adapatado_juiz_inconsistencia.md)

## Integração dos Hooks

- `before_specify` aciona o Agente Arquiteto.
- `before_implement` aciona o Agente Developer.
- `after_implement` aciona primeiro o Agente Polícia e depois o Agente Juiz.

## Objetivo do fluxo principal

O objetivo deste arquivo é servir como ponto central de navegação do processo, sem repetir os detalhes de cada agente. Os detalhes operacionais, comandos e regras específicas ficam nos quatro documentos referenciados acima.

Se desejar, eu posso:
- acrescentar os scripts esqueleto `scripts/police_collect.sh` e `scripts/judge_review.sh`;
- gerar um template completo de GitHub Actions YAML em `.github/workflows/spec-kit-pipeline.yml`.


