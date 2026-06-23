# Tutorial do Anotador – Checklists 14.1, 14.2 e 14.3 (Compacto)

## Instruções Gerais

- **Anotador:** preencha `Nome Anotador` com seu nome.
- **Links fixos:** mantenha os links para `Sprints` e `Pipeline` (fornecidos).
- **Análise:** compare modelo UML (PlantUML) com código fonte. Use os commits indicados.

---

## Checklist 14.1 – Polícia: Evidências Apontadas (VP/FP)

**Objetivo:** Classificar cada evidência reportada pela Polícia como **VP** (verdadeiro positivo) ou **FP** (falso positivo).

**Preenchimento por evidência (EVD-ID):**

| Coluna | O que fazer |
|--------|-------------|
| **POL-AP-01** | A inconsistência **realmente existia**? Sim → VP; Não → FP. |
| **POL-AP-02** | O **tipo** atribuído (ex.: `METODO_AUSENTE`) está correto? Sim/Não. |
| **POL-AP-03** | A **localização** (arquivo:linha) é precisa? Sim/Não. |
| **Links** | Cole os links para `inconsistencies.md`, modelo `.puml` e arquivo de código. |

**Critérios rápidos:** VP se modelo e código divergem exatamente como descrito. FP se a divergência não existe.

---

## Checklist 14.2 – Polícia: Evidências Não Apontadas (FN/VN)

**Objetivo:** Verificar se a Polícia deixou de detectar inconsistências (FN) ou se o ponto está consistente (VN).

**Preenchimento por ponto analisado (EVD-ID ou descrição):**

| Coluna | O que fazer |
|--------|-------------|
| **POL-NA-01** | Havia inconsistência **não detectada**? Sim → FN; Não → VN. |
| **POL-NA-02** | Se FN, descreva **detalhadamente** a omissão. |
| **POL-NA-03** | Se VN, descreva **brevemente** o que foi verificado e considerado consistente. |
| **POL-NA-04/05** | Localização (arquivo:linha) do modelo e do código verificados. |
| **Link** | Link para o diretório/arquivo de evidência. |

**Critérios rápidos:** FN se há divergência real não reportada. VN se modelo e código batem.

---

## Checklist 14.3 – Juiz: Vereditos (DE/AE/AMBOS/NE)

**Objetivo:** Avaliar se a decisão do Juiz está correta e se ele usou bem as evidências.

**Preenchimento por veredito (VER-ID):**

| Coluna | O que fazer |
|--------|-------------|
| **JUI-01** | Decisão proferida pelo Juiz: DE, AE, AMBOS ou NE. |
| **JUI-02** | Decisão **correta** (segundo sua análise): DE, AE, AMBOS ou NE. |
| **JUI-03** | O Juiz usou as evidências corretamente? Sim / Parcialmente / Não. |
| **JUI-04** | Considerou o depoimento do Arquiteto (ARG-)? Sim / Parcialmente / Não. |
| **JUI-05** | Considerou o depoimento do Developer (DEP-)? Sim / Parcialmente / Não. |
| **JUI-06** | Seguiu a árvore de decisão definida? Sim / Não. |
| **Link** | Link para `verdict.md`. |

**Critérios rápidos para JUI-02:**  
- **DE** = código errado, modelo certo.  
- **AE** = modelo errado, código fiel ao modelo.  
- **AMBOS** = ambos errados.  
- **NE** = não há inconsistência (falso positivo).

---

## Dicas Finais

- Sempre consulte os links dos modelos e códigos antes de responder.
- Seja objetivo nas descrições (POL-NA-02/03) – cite trechos se necessário.
- Mantenha a consistência entre os três checklists: uma evidência classificada como VP no 14.1 deve ter um veredito correspondente no 14.3.
