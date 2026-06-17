<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan

## 🧠 Personas de IA Disponíveis neste Workspace

Este workspace possui 4 personas especializadas que atuam **em conjunto** com os comandos nativos do Spec-Kit. Elas são carregadas automaticamente pelos agent files correspondentes:

| Persona | Arquivo | Ativada Por | Função |
|---------|---------|-------------|--------|
| 🏗️ **Arquiteto** | `.github/prompts/persona-arquiteto.md` | `/speckit.plan` | Modelagem UML PlantUML com rastreabilidade RF |
| 👨‍💻 **Developer** | `.github/prompts/persona-developer.md` | `/speckit.implement` | Codificação sem over-engineering |
| 👮‍♂️ **Polícia** | `.github/prompts/persona-policia.md` | `/speckit.analyze` | Coleta de evidências de inconsistências |
| ⚖️ **Juiz** | `.github/prompts/persona-juiz.md` | Manual no chat | Julgamento e veredito das evidências |

**Importante:** As personas **não substituem** os comandos nativos do Spec-Kit. Elas são uma **camada adicional** de comportamento que se soma ao fluxo padrão.
<!-- SPECKIT END -->
