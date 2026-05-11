# Guia de Testes para KeyphraseCurationViewModel

Este documento explica como testar o **KeyphraseCurationViewModel** usando diferentes abordagens: Storybook, testes unitários, testes manuais e testes de integração.

## 🎮 Testando via Storybook

### 1. Configuração Básica

Para usar as stories criadas, adicione ao seu `.storybook/main.js`:

```javascript
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-actions'
  ],
};
```

### 2. Stories Disponíveis

#### **TestingPlayground** (Recomendado)
- Playground interativo completo
- Controles para alterar datasets
- Logs de operações em tempo real
- Resultados de testes automáticos

```bash
# Executar Storybook
npm run storybook
# Navegar para: ViewModel/KeyphraseCurationViewModel/TestingPlayground
```

#### **AutomatedTesting**
- Executa testes automaticamente
- Verifica todas as operações principais
- Mostra resultados em tempo real

#### **Diferentes Cenários**
- `ComplexDataset`: Performance com muitos dados
- `EmptyDataset`: Comportamento com dados vazios
- `ClusteringPhase`: Foco na fase de clustering
- `SelectionPhase`: Foco na seleção

### 3. Como Testar no Storybook

1. **Abra o Storybook**: `npm run storybook`
2. **Navegue para as stories do ViewModel**
3. **Use o TestingPlayground**:
   - Selecione diferentes datasets (Básico, Complexo, Vazio)
   - Alterne entre formatos (RAW vs Simples)
   - Execute testes automatizados
   - Observe logs e resultados
4. **Teste operações manuais**:
   - Clustering de keyphrases
   - Seleção de clusters
   - Conversões de formato
   - Tratamento de erros

## 🧪 Testes Unitários (Jest)

### 1. Configuração

```bash
# Instalar dependências de teste
npm install --save-dev @types/jest jest ts-jest

# Configurar Jest (jest.config.js)
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
};
```

### 2. Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes específicos do ViewModel
npm test KeyphraseCurationViewModel

# Executar com watch mode
npm test -- --watch
```

### 3. Cobertura de Testes

Os testes unitários cobrem:
- ✅ Inicialização com diferentes formatos
- ✅ Operações de clustering
- ✅ Seleção de clusters e keyphrases
- ✅ Consultas e filtros
- ✅ Cálculo de progresso e estatísticas
- ✅ Exportação para diferentes formatos
- ✅ Clonagem e serialização
- ✅ Tratamento de erros

## 🔧 Testes Manuais

### 1. Teste Básico de Carregamento

```typescript
import { KeyphraseCurationViewModel } from './KeyphraseCurationViewModel';

// Dados de teste
const testData = {
  keyphrases: {
    "1": { keyphrase: "Test", collected_from: "manual" }
  },
  clusters: {
    "1": { keyphrases: [1], selected: 0, keyphrase1_selected: 0, keyphrase2_selected: 0, alias: "" }
  }
};

const metadata = {
  topic: 'test',
  annotator: 'manual_tester',
  phase: 'clustering' as const,
  progress: { clustering_complete: false, cluster_selection_complete: false, keyphrase_selection_complete: false }
};

// Teste
const viewModel = KeyphraseCurationViewModel.fromRawData(testData, metadata);
console.log('Keyphrases carregadas:', viewModel.keyphrases.size);
console.log('Clusters carregados:', viewModel.clusters.size);
```

### 2. Teste de Operações

```typescript
// Criar novo cluster
const newClusterId = viewModel.createCluster([1]);
console.log('Novo cluster criado:', newClusterId);

// Selecionar cluster
const success = viewModel.selectCluster(1, true);
console.log('Cluster selecionado:', success);

// Verificar progresso
viewModel.updateProgress();
const stats = viewModel.getCompletionStats();
console.log('Estatísticas:', stats);
```

### 3. Teste de Conversões

```typescript
// Converter para formato simples
const simpleFormat = viewModel.toSimpleFormat();
console.log('Formato simples:', simpleFormat);

// Converter de volta para formato raw
const rawFormat = viewModel.toRawFormat();
console.log('Formato raw:', rawFormat);

// Verificar integridade
const viewModel2 = KeyphraseCurationViewModel.fromRawData(rawFormat, metadata);
console.log('Dados consistentes:', viewModel2.keyphrases.size === viewModel.keyphrases.size);
```

## 🎯 Testes de Integração com React

### 1. Teste com Hook

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useKeyphraseCuration } from './useKeyphraseCuration';

test('hook gerencia estado do ViewModel corretamente', () => {
  const { result } = renderHook(() => useKeyphraseCuration());
  
  act(() => {
    result.current.loadFromRawData(testData, metadata);
  });
  
  expect(result.current.keyphrases.size).toBe(1);
  expect(result.current.clusters.size).toBe(1);
});
```

### 2. Teste de Componente

```tsx
import { render, fireEvent, screen } from '@testing-library/react';
import ViewModelTestingPlayground from './ViewModelTestingPlayground';

test('playground executa operações corretamente', () => {
  render(<ViewModelTestingPlayground initialDataset="basic" />);
  
  // Clica no botão de teste
  fireEvent.click(screen.getByText('Executar Testes'));
  
  // Verifica se apareceram resultados
  expect(screen.getByText(/✅/)).toBeInTheDocument();
});
```

## 📊 Testes de Performance

### 1. Teste com Dataset Grande

```typescript
// Gerar dataset grande
const largeDataset = {
  keyphrases: Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [
      String(i + 1),
      { keyphrase: `Keyphrase ${i + 1}`, collected_from: 'test' }
    ])
  ),
  clusters: Object.fromEntries(
    Array.from({ length: 100 }, (_, i) => [
      String(i + 1),
      { keyphrases: [i + 1], selected: 0, keyphrase1_selected: 0, keyphrase2_selected: 0, alias: '' }
    ])
  )
};

// Medir tempo de carregamento
console.time('Carregamento');
const viewModel = KeyphraseCurationViewModel.fromRawData(largeDataset, metadata);
console.timeEnd('Carregamento');

// Medir tempo de operações
console.time('Operações');
for (let i = 0; i < 100; i++) {
  viewModel.assignKeyphraseToCluster(i + 1, Math.floor(i / 10) + 1);
}
console.timeEnd('Operações');
```

### 2. Teste de Memória

```typescript
// Verificar vazamentos de memória
const initial = process.memoryUsage().heapUsed;

for (let i = 0; i < 100; i++) {
  const vm = KeyphraseCurationViewModel.fromRawData(testData, metadata);
  const cloned = vm.clone();
  // Simular uso intenso
}

const final = process.memoryUsage().heapUsed;
console.log('Uso de memória:', (final - initial) / 1024 / 1024, 'MB');
```

## 🎨 Testes Visuais

### 1. Screenshots Automáticos (com Storybook)

```bash
# Instalar addon para screenshots
npm install --save-dev @storybook/addon-storyshots

# Executar testes visuais
npm run test:visual
```

### 2. Teste Manual de UI

1. **Abra o TestingPlayground**
2. **Teste diferentes estados**:
   - Dataset vazio
   - Dataset com poucos dados
   - Dataset complexo
3. **Verifique responsividade**
4. **Teste interações**:
   - Botões funcionam
   - Logs aparecem corretamente
   - Estatísticas atualizam
   - Controles respondem

## 🚀 Checklist de Testes

### Funcionalidade Básica
- [ ] ViewModel carrega dados RAW corretamente
- [ ] ViewModel carrega dados Simples corretamente
- [ ] Conversões entre formatos funcionam
- [ ] Operações de clustering funcionam
- [ ] Seleções funcionam corretamente
- [ ] Progresso é calculado corretamente

### Performance
- [ ] Carregamento é rápido (< 1 segundo para 100 items)
- [ ] Operações são eficientes (< 100ms cada)
- [ ] Não há vazamentos de memória
- [ ] UI responde rapidamente

### Robustez
- [ ] Trata dados inválidos graciosamente
- [ ] Não quebra com IDs inexistentes
- [ ] Valida parâmetros de entrada
- [ ] Fornece mensagens de erro úteis

### Integração
- [ ] Hook React funciona corretamente
- [ ] Componentes renderizam sem erros
- [ ] Estado é atualizado realmente
- [ ] Callbacks são chamados quando esperado

## 📝 Relatório de Testes

Use este template para documentar seus testes:

```markdown
# Relatório de Testes - KeyphraseCurationViewModel

**Data**: [Data do teste]
**Testador**: [Nome]
**Versão**: [Versão do código]

## Testes Executados

### ✅ Testes Unitários
- Total: X testes
- Passaram: X
- Falharam: X
- Cobertura: X%

### ✅ Testes de Integração
- Hook React: ✅/❌
- Componentes: ✅/❌
- Storybook: ✅/❌

### ✅ Testes de Performance
- Carregamento 1000 items: X ms
- 100 operações: X ms
- Uso de memória: X MB

## Problemas Encontrados

1. [Descrição do problema]
   - Severidade: Alta/Média/Baixa
   - Status: Aberto/Resolvido

## Conclusão

[Resumo geral dos resultados]
```

Este guia garante cobertura completa de testes para o KeyphraseCurationViewModel em todos os cenários de uso!