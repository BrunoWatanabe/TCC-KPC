# Tutorial do Anotador – Checklists 14.1, 14.2 e 14.3

---

## 🔧 Antes de Começar: Crie sua Cópia da Planilha

A planilha Google fornecida está em **modo somente leitura**. Para preencher os checklists, você precisa ter sua própria cópia editável.

**Passo:** Abra o link da planilha → clique em **Arquivo** → **Fazer uma cópia**.  
Isso criará uma versão no seu Google Drive, onde você poderá preencher todas as colunas livremente. Mantenha o link da cópia para referência futura.

---

## 1. O que é Evidência, Julgamento e Por que essa Ordem?

- **Evidência**: É um apontamento feito pela **Persona Polícia**. Ela compara o Modelo UML (PlantUML) com o Código e lista **fatos** brutos de divergência. Exemplo: *"Método X está no modelo, mas ausente no código"*. A Polícia **não** interpreta culpa, só coleta os fatos.

- **Julgamento**: É a decisão da **Persona Juiz**. De posse das Evidências, o Juiz aplica uma árvore de decisão para definir **quem está errado**: 
  - **DE** (Developer Errado), **AE** (Arquiteto Errado), **AMBOS** ou **NE** (Ninguém Errado - falso alarme).

- **Por que a Evidência vem primeiro?** 
  O experimento separa **coleta de fatos** (Polícia) de **interpretação jurídica** (Juiz) para evitar viés. Se o Juiz coletasse os dados, poderia pular evidências ou forçar um veredito. A ordem **Evidência → Julgamento** garante que o Julgamento seja baseado em um relatório completo e neutro, sendo essa a principal inovação do pipeline estudado.

---

## Checklist 14.1 – Polícia: Evidências Apontadas (VP/FP)
**Objetivo**: Validar se a evidência coletada é real (VP) ou alarme falso (FP).

| Coluna | Como Preencher (Rápido) |
| :--- | :--- |
| **EVD-ID** | Código da evidência (ex: EVD-001-R1-001). |
| **POL-AP-01** | A divergência **existe**? <br> **Sim** = VP (Verdadeiro Positivo) / **Não** = FP (Falso Positivo). |
| **POL-AP-02** | O **tipo** da divergência (ex: `METODO_AUSENTE`) está certo? Sim/Não. |
| **POL-AP-03** | O **arquivo:linha** apontado está certo? Sim/Não. |
| **Links** | Cole o link do `inconsistencies.md`, do Modelo `.puml` e do Código fonte. |

---

## Checklist 14.2 – Polícia: Evidências Não Apontadas (FN/VN)
**Objetivo**: Caçar omissões. O que a Polícia **não** viu?

| Coluna | Como Preencher (Rápido) |
| :--- | :--- |
| **EVD-ID** | ID da evidência (ou descreva o ponto verificado). |
| **POL-NA-01** | Havia inconsistência **não detectada**? <br> **Sim** = FN (Falso Negativo) / **Não** = VN (Verdadeiro Negativo). |
| **POL-NA-02** | Se **FN**: Descreva **o que foi omitido** (ex: campo faltante). |
| **POL-NA-03** | Se **VN**: Descreva **o que foi verificado e está OK** (ex: método confere). |
| **POL-NA-04/05** | Localize (arquivo:linha) o trecho do Modelo e do Código que você inspecionou. |

---

## Checklist 14.3 – Juiz: Vereditos (DE/AE/AMBOS/NE)
**Objetivo**: Verificar se o Julgamento do Juiz está correto e fundamentado.

| Coluna | Como Preencher (Rápido) |
| :--- | :--- |
| **VER-ID** | ID do Veredito (ex: VER-001-R1-001). |
| **JUI-01** | O que o Juiz disse? (DE / AE / AMBOS / NE). |
| **JUI-02** | O que é **correto** na sua análise? (DE / AE / AMBOS / NE). |
| **JUI-03** | Juiz usou as evidências bem? (Sim / Parcial / Não). |
| **JUI-04/05** | Ele considerou os depoimentos do Arquiteto (ARG-) e Developer (DEP-)? (Sim / Parcial / Não). |
| **JUI-06** | Seguiu a árvore de decisão do protocolo? (Sim / Não). |
| **Link** | Link para o `verdict.md`. |

**Regra de Ouro para JUI-02**:
- **DE**: Código errado, Modelo certo.
- **AE**: Modelo errado, Código fiel ao modelo.
- **AMBOS**: Ambos estão errados.
- **NE**: Não há erro real (era FP da Polícia).

---

## Fluxo de Preenchimento (Ordem Lógica)
1. Abra a Evidência (14.1) para ver o que a Polícia achou.
2. Vá ao código/modelo para ver se ela errou ou omitiu algo (14.2).
3. Por fim, julgue se a decisão do Juiz (14.3) foi justa com base nos fatos que você mesmo validou.
