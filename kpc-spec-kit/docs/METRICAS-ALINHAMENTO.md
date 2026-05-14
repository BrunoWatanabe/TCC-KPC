# 📊 METRICAS-ALINHAMENTO.md

## Métricas de Alinhamento entre Especificação, Modelo e Código

**Versão**: 1.0  
**Status**: Ativo  
**Objetivo**: Transformar alinhamento em métricas mensuráveis

---

## 🎯 Visão Geral

Este documento define **5 métricas quantitativas** para avaliar o alinhamento entre:

- **Especificação** (specs/): RFs, RNFs, critérios BDD
- **Modelos** (.specify/.specify/diagrams/): PlantUML (4 tipos)
- **Código** (src/): Classes, métodos, funções
- **Testes** (tests/): Unitários, BDD, integração

---

## 📐 As 5 Métricas Principais

### 1️⃣ Cobertura do Modelo

**O quê**: Percentual de elementos no modelo que estão implementados no código.

**Fórmula**:
```
Cobertura = (elementos implementados / elementos modelados) × 100
```

**Componentes**:
- **Elementos modelados**: Classes, métodos, atributos em PlantUML
- **Elementos implementados**: Classes, métodos, atributos em código

**Cálculo Detalhado**:

```python
def calcular_cobertura(modelo: DiagramaPlantUML, codigo: CodigoFonte) -> float:
    """
    Cobertura = implementados / modelados
    """
    classes_modeladas = modelo.extrair_classes()           # N
    metodos_modelados = modelo.extrair_metodos()           # M
    atributos_modelados = modelo.extrair_atributos()       # A
    
    classes_implementadas = codigo.encontrar_classes()
    metodos_implementados = codigo.encontrar_metodos()
    atributos_implementados = codigo.encontrar_atributos()
    
    elementos_modelados = len(classes_modeladas) + len(metodos_modelados) + len(atributos_modelados)
    elementos_implementados = len(classes_implementadas) + len(metodos_implementados) + len(atributos_implementados)
    
    cobertura = (elementos_implementados / elementos_modelados) * 100 if elementos_modelados > 0 else 100
    return cobertura
```

**Exemplo**:

```
Modelo (PlantUML):
├── UserService
│   ├── authenticate()
│   ├── validate_email()
│   ├── verify_password()
│   └── generateToken()
├── UserRepository
│   ├── find_by_email()
│   └── save()
└── (6 elementos no total)

Código (Python):
├── UserService
│   ├── authenticate() ✅
│   ├── validate_email() ✅
│   ├── verify_password() ❌ (não implementado)
│   └── generateToken() ✅
├── UserRepository
│   ├── find_by_email() ✅
│   └── save() ✅
└── (5 implementados de 6)

Cobertura = 5/6 × 100 = 83.3%
```

**Targets**:
- 🟢 **Excelente**: 95-100%
- 🟡 **Aceitável**: 80-94%
- 🔴 **Crítico**: < 80%

---

### 2️⃣ Precisão da Implementação

**O quê**: Percentual de implementações que estão **corretas** em relação ao modelo.

**Fórmula**:
```
Precisão = (implementações corretas / implementações totais) × 100
```

**Componentes**:
- **Implementações corretas**: Assinatura matches modelo + comportamento OK
- **Implementações totais**: Todas as implementações encontradas

**Validação de Correção**:

```python
def validar_implementacao(modelo_metodo: MetodoPlantUML, impl_metodo: MetodoCodigo) -> bool:
    """
    Uma implementação é correta se:
    1. Assinatura matches (parâmetros, tipos)
    2. Retorno matches (tipo)
    3. Comportamento matches (testes passam)
    """
    # 1. Validar assinatura
    if modelo_metodo.parametros != impl_metodo.parametros:
        return False
    
    if modelo_metodo.retorno != impl_metodo.retorno:
        return False
    
    # 2. Validar comportamento
    testes = codigo.encontrar_testes(impl_metodo)
    if all(teste.passou() for teste in testes):
        return True
    
    return False
```

**Exemplo**:

```
Modelo (PlantUML):
  authenticate(email: str, password: str): Token

Implementação em código:
  def authenticate(self, email: str, password: str) -> Token:
      # Implementação
      pass

Validação:
  ✅ Assinatura correta
  ✅ Tipo de retorno correto
  ✅ Testes passando
  → Implementação CORRETA

Precisão = 5 corretas / 6 implementadas = 83.3%
```

**Targets**:
- 🟢 **Excelente**: 90-100%
- 🟡 **Aceitável**: 75-89%
- 🔴 **Crítico**: < 75%

---

### 3️⃣ Divergência Semântica

**O quê**: Detecta quando código não faz o que modelo especifica.

**Fórmula**:
```
Divergência = (comportamentos divergentes / total de implementações) × 100
```

**Tipos de Divergência**:

| Tipo | Descrição | Severidade |
|------|-----------|-----------|
| **Regra Quebrada** | RF violada no código | 🔴 CRÍTICO |
| **Comportamento Inesperado** | Executa algo não modelado | 🟠 ALTO |
| **Exceção Não Documentada** | Lança erro não previsto | 🟡 MÉDIO |
| **Lógica Invertida** | Condições invertidas | 🔴 CRÍTICO |

**Detecção Automática**:

```python
def detectar_divergencias(spec: Especificacao, codigo: CodigoFonte, testes: TesteSuite):
    """
    Identifica divergências entre:
    1. Especificação (RF + BDD)
    2. Modelo (PlantUML)
    3. Código (implementação)
    4. Testes (comportamento real)
    """
    divergencias = []
    
    for rf in spec.requisitos_funcionais:
        # 1. Verificar se RF está implementado
        metodo = codigo.encontrar_implementacao(rf.id)
        if not metodo:
            divergencias.append(f"RF não implementada: {rf.id}")
            continue
        
        # 2. Verificar comportamento contra testes
        testes_rf = testes.encontrar_por_rf(rf.id)
        for teste in testes_rf:
            if not teste.passou():
                divergencias.append(f"RF falha em teste: {rf.id} - {teste.nome}")
        
        # 3. Verificar regras de negócio (regras dentro do BDD)
        for criterio_bdd in rf.criterios_bdd:
            if not metodo.valida_criterio(criterio_bdd):
                divergencias.append(f"BDD não atendido: {rf.id} - {criterio_bdd}")
    
    return divergencias
```

**Exemplo**:

```
RF001 - Autenticar usuário
BDD: Quando submete credenciais incorretas ENTÃO nega acesso

Implementação no código:
  def authenticate(email, password):
      user = db.find(email)
      if user:
          return Token()  # ❌ BUG: Aceita qualquer senha!
      
Divergência Detectada:
  - RF001: BDD "nega acesso" não é respeitado
  - Teste "test_authenticate_wrong_password" falhando
  
Divergência = 1 / 6 = 16.7%
```

**Targets**:
- 🟢 **Excelente**: 0% (zero divergências)
- 🟡 **Aceitável**: 1-5%
- 🔴 **Crítico**: > 5%

---

### 4️⃣ Over-Engineering

**O quê**: Código implementado que **não está no modelo** (escopeamento quebrado).

**Fórmula**:
```
Over-Engineering = (código não modelado / total de código) × 100
```

**Identificação**:

```python
def detectar_over_engineering(modelo: DiagramaPlantUML, codigo: CodigoFonte) -> List[str]:
    """
    Encontra classes/métodos em código que não estão no modelo.
    
    Possíveis causas:
    1. Implementação além do escopo
    2. Código técnico não documentado (helpers, utilities)
    3. Refatoração que alterou modelo sem atualizar PlantUML
    """
    classe_modelo = set(modelo.extrair_classes())
    metodos_modelo = set(modelo.extrair_metodos())
    
    classe_codigo = set(codigo.extrair_classes())
    metodos_codigo = set(codigo.extrair_metodos())
    
    classes_extra = classe_codigo - classe_modelo
    metodos_extra = metodos_codigo - metodos_modelo
    
    return list(classes_extra) + list(metodos_extra)
```

**Exemplo**:

```
Modelo (PlantUML):
├── UserService
│   ├── authenticate()
│   └── validate_email()
└── (2 métodos)

Código (Python):
├── UserService
│   ├── authenticate() ✅
│   ├── validate_email() ✅
│   ├── _hash_password() ❌ NÃO no modelo!
│   ├── _log_attempt() ❌ NÃO no modelo!
│   └── (4 métodos implementados)
├── EmailValidator (classe não no modelo)

Over-Engineering = 3 / 4 = 75%
```

**Interpretação**:
- **Código de Suporte**: Helpers, utils, internals = 🟢 OK
- **Funcionalidade Não Aprovada**: Novas features não aprovadas = 🔴 PROBLEMA
- **Refatoração Não Documentada**: Código mudou, modelo não = 🟡 REVISAR

**Targets**:
- 🟢 **Excelente**: 0-10% (apenas código de suporte)
- 🟡 **Aceitável**: 11-20%
- 🔴 **Crítico**: > 20%

---

### 5️⃣ Score Geral de Alinhamento

**O quê**: Métrica sintética combinando as 4 anteriores.

**Fórmula**:
```
Score = (cobertura × 0.35) + (precisão × 0.35) + (100 - divergência × 0.20) + (100 - over_eng × 0.10)
```

**Pesos** (podem ser ajustados por projeto):
- **Cobertura**: 35% (mais importante - precisa estar no modelo)
- **Precisão**: 35% (mais importante - deve estar correto)
- **Divergência**: 20% (regras quebradas são graves)
- **Over-Engineering**: 10% (menor impacto)

**Cálculo**:

```python
def calcular_score_geral(metricas: Dict) -> float:
    """
    Alinhamento = soma ponderada de todas as métricas
    """
    cobertura = metricas['cobertura']              # 0-100
    precisao = metricas['precisao']                # 0-100
    divergencia = metricas['divergencia']          # 0-100 (quanto maior, pior)
    over_eng = metricas['over_engineering']        # 0-100 (quanto maior, pior)
    
    score = (
        cobertura * 0.35 +
        precisao * 0.35 +
        (100 - divergencia) * 0.20 +
        (100 - over_eng) * 0.10
    )
    
    return round(score, 2)
```

**Exemplo Integrado**:

```
Feature: Autenticação (RF001-004)

Cobertura:      83.3% (5/6 elementos)
Precisão:       83.3% (5/6 corretas)
Divergência:    16.7% (1 RF com BDD quebrado)
Over-Eng:       75%   (3/4 métodos extra)

Score = (83.3 × 0.35) + (83.3 × 0.35) + ((100 - 16.7) × 0.20) + ((100 - 75) × 0.10)
Score = 29.16 + 29.16 + 16.66 + 2.5
Score = 77.48 / 100
```

**Tabela de Avaliação**:

| Range | Status | Ação |
|-------|--------|------|
| 90-100 | 🟢 **Excelente** | Manter padrão |
| 75-89 | 🟡 **Bom** | Monitorar pontos fracos |
| 60-74 | 🟠 **Inadequado** | Revisar alinhamento |
| < 60 | 🔴 **Crítico** | Ação imediata |

---

## 📈 Como Medir as Métricas

### Passo 1: Extrair Elementos do Modelo

```bash
# Extrair classes, métodos, atributos de PlantUML
python scripts/parse_plantuml.py .specify/diagrams/auth_classes.puml > model_elements.json
```

### Passo 2: Extrair Elementos do Código

```bash
# Extrair AST do código Python
python scripts/parse_code_ast.py src/auth/ > code_elements.json
```

### Passo 3: Mapear Elementos

```bash
# Vincular elementos usando nomenclatura
python scripts/map_model_to_code.py model_elements.json code_elements.json > mapping.json
```

### Passo 4: Calcular Métricas

```bash
# Gerar relatório de métricas
python scripts/calculate_metrics.py mapping.json > metrics_report.json
```

### Passo 5: Validar com Testes

```bash
# Executar testes para validar precisão
pytest tests/auth/ -v --tb=short
```

---

## 🔧 Integração com CI/CD

### GitHub Actions Workflow

```yaml
name: Alignment Metrics

on: [push, pull_request]

jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup PlantUML
        run: |
          sudo apt-get install -y plantuml graphviz
      
      - name: Extract Model Elements
        run: python scripts/parse_plantuml.py .specify/diagrams/ > model.json
      
      - name: Extract Code Elements
        run: python scripts/parse_code_ast.py src/ > code.json
      
      - name: Map and Calculate Metrics
        run: python scripts/calculate_metrics.py model.json code.json > metrics.json
      
      - name: Run Tests
        run: pytest tests/ -v
      
      - name: Generate Report
        run: python scripts/generate_report.py metrics.json
      
      - name: Comment PR
        uses: actions/github-script@v6
        if: github.event_name == 'pull_request'
        with:
          script: |
            const fs = require('fs');
            const metrics = JSON.parse(fs.readFileSync('metrics.json'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `### 📊 Alignment Metrics\n\n${generateTable(metrics)}`
            });
      
      - name: Upload Artifacts
        uses: actions/upload-artifact@v2
        with:
          name: metrics-report
          path: metrics.json
```

---

## 📊 Visualizações Possíveis

### 1. Tabela de Resumo

```
┌─────────────────────────┬───────┬────────┐
│ Métrica                 │ Valor │ Status │
├─────────────────────────┼───────┼────────┤
│ Cobertura               │ 83.3% │ 🟡     │
│ Precisão                │ 83.3% │ 🟡     │
│ Divergência             │ 16.7% │ 🟡     │
│ Over-Engineering        │ 75.0% │ 🔴     │
├─────────────────────────┼───────┼────────┤
│ Score Geral             │ 77.48 │ 🟡     │
└─────────────────────────┴───────┴────────┘
```

### 2. Gráfico de Tendência (ao longo do tempo)

```
100 │         ╱─╲
 90 │    ╱────╱   ╲
 80 │───╱          ╲
 70 │               ╲──
 60 │
    └──────────────────
      Commits ao longo do tempo
```

### 3. Heatmap de Inconsistências

```
RF001 ✅ ✅ ✅ ✅ ✅
RF002 ✅ ✅ ❌ ✅ ✅
RF003 ✅ ✅ ✅ ❌ ✅
RF004 ❌ ✅ ✅ ✅ ✅

Legenda: Spec, Modelo, Código, Teste, Rastreabilidade
```

### 4. Dashboard Real-time

```
┌─────────────────────────────────────────┐
│  Spec-Kit Alignment Dashboard          │
├─────────────────────────────────────────┤
│                                         │
│  Overall Score: 77.48 / 100  [███░░]   │
│                                         │
│  ├─ Cobertura:        83.3%  [████░]   │
│  ├─ Precisão:         83.3%  [████░]   │
│  ├─ Divergência:      16.7%  [██░░░]   │
│  └─ Over-Eng:         75.0%  [████░]   │
│                                         │
│  Features: 4/5 implementadas            │
│  Tests: 24/30 passando                  │
│  Issues: 2 críticos                     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 Exemplos de Uso

### Exemplo 1: Feature de Autenticação

```python
from metrics import MetricasAlinhamento

# 1. Extrair elementos
metricas = MetricasAlinhamento('.specify/diagrams/auth_classes.puml', 'src/auth')

# 2. Calcular individualmente
print(f"Cobertura: {metricas.cobertura}%")
print(f"Precisão: {metricas.precisao}%")
print(f"Divergência: {metricas.divergencia}%")
print(f"Over-Eng: {metricas.over_engineering}%")

# 3. Score geral
print(f"Score: {metricas.score_geral}")

# 4. Gerar relatório
metricas.gerar_relatorio('auth_metrics.md')
```

### Exemplo 2: Validação em PR

```python
# Se score < 75, bloqueia merge
if metricas.score_geral < 75:
    raise ValidationError(
        f"Alinhamento crítico: {metricas.score_geral}/100"
    )
```

### Exemplo 3: Rastreamento ao Longo do Tempo

```python
# Histórico de scores
scores = [85.2, 81.5, 77.48, 79.3, 82.1]

# Detectar tendência
if scores[-1] < scores[0]:
    alert("⚠️ Score em queda!")
else:
    print("✅ Score em melhora!")
```

---

## 📋 Checklist de Implementação

- [ ] Script para parsing de PlantUML (`scripts/parse_plantuml.py`)
- [ ] Script para parsing de código AST (`scripts/parse_code_ast.py`)
- [ ] Script para mapeamento modelo ↔ código (`scripts/map_model_to_code.py`)
- [ ] Script para cálculo de métricas (`scripts/calculate_metrics.py`)
- [ ] Script para geração de relatórios (`scripts/generate_report.py`)
- [ ] GitHub Actions workflow para CI/CD
- [ ] Dashboard/visualizações (web ou terminal)
- [ ] Testes para validadores de métrica
- [ ] Documentação de cada métrica
- [ ] Exemplos práticos com dados reais

---

## 📚 Referências

- [Especificação SDD](spec.md)
- [Modelos PlantUML](MODELS.md)
- [Convenções de Rastreabilidade](TRACEABILITY-CONVENTIONS.md)
- [Padrões de Nomenclatura](NAMING-CONVENTIONS.md)
- [Documentação FASE 3](docs/FASE3_INTEGRACAO.md)

---

## 🚀 Próximos Passos (FASE 6)

- [ ] Pesquisa Experimental: Com agentes vs sem agentes
- [ ] Experimento 2: Modelagem forte vs fraca
- [ ] Experimento 3: Precisão do QA

---

**Status Final**: ✅ **FASE 5 COMPLETA**  
**Data de Conclusão**: Mai 2026  
**Próxima Fase**: FASE 6 — Pesquisa Experimental

---

*Métricas de Alinhamento para Spec-Kit Framework — Trabalho de Conclusão de Curso (TCC)*
