# KeyphraseCurationViewModel - Documentação

## Visão Geral

A classe `KeyphraseCurationViewModel` é um modelo TypeScript robusto que encapsula toda a lógica de curadoria de keyphrases para o frontend React. Ela unifica as três tarefas principais do sistema:

1. **Clustering** - Agrupamento de keyphrases similares
2. **Cluster Selection** - Seleção de clusters relevantes
3. **Keyphrase Selection** - Seleção de keyphrases específicas dentro dos clusters

## 🎯 **Principais Benefícios**

1. **Unificação de Formatos**
   - Suporte tanto ao formato atual (`cloning.json`) quanto ao simples (`complete_keyphrase_clustering.json`)
   - Conversão automática entre formatos
   - API única para ambos os casos

2. **Tipagem Forte**
   - Todos os dados tipados com interfaces TypeScript
   - Detecção de erros em tempo de compilação
   - IntelliSense completo no VS Code

3. **Encapsulamento Robusto**
   - Estado interno protegido com getters readonly
   - Métodos controlados para modificação
   - Validações automáticas

4. **Performance Otimizada**
   - Maps internos para acesso O(1)
   - Estado derivado computado eficientemente
   - Clonagem inteligente para undo/redo

5. **Testabilidade Completa**
   - Stories interativas no Storybook
   - Testes unitários automatizados
   - Playground de desenvolvimento
   - Validação visual em tempo real

## Estrutura de Arquivos

```
frontend/src/
├── models/
│   └── KeyphraseCurationViewModel.ts     # Classe principal do ViewModel
├── hooks/
│   └── useKeyphraseCuration.ts           # Hook React personalizado
├── components/
│   └── KeyphraseCurationDashboard.tsx    # Componente exemplo
└── __tests__/
    └── KeyphraseCurationViewModel.test.ts # Testes unitários
```

## Uso Básico

### 1. Carregando Dados

```typescript
import { KeyphraseCurationViewModel } from '../models/KeyphraseCurationViewModel';

// Carregando do formato atual (cloning.json)
const viewModel = KeyphraseCurationViewModel.fromRawData(rawData, {
  topic: 'cloning',
  annotator: 'akira',
  phase: 'clustering',
  progress: {
    clustering_complete: false,
    cluster_selection_complete: false,
    keyphrase_selection_complete: false,
  }
});

// Carregando do formato simples (complete_keyphrase_clustering.json)
const viewModel2 = KeyphraseCurationViewModel.fromSimpleFormat(simpleData, metadata);
```

### 2. Operações de Clustering

```typescript
// Atribuir keyphrase a um cluster
viewModel.assignKeyphraseToCluster(keyphraseId, clusterId);

// Criar novo cluster
const newClusterId = viewModel.createCluster([keyphraseId1, keyphraseId2]);

// Consultar keyphrases de um cluster
const keyphrases = viewModel.getKeyphrasesByCluster(clusterId);
```

### 3. Seleção de Clusters e Keyphrases

```typescript
// Selecionar/desselecionar cluster
viewModel.selectCluster(clusterId, true);

// Definir keyphrase primária
viewModel.selectPrimaryKeyphrase(clusterId, keyphraseId);

// Consultar clusters selecionados
const selected = viewModel.getSelectedClusters();
```

### 4. Monitoramento de Progresso

```typescript
// Atualizar progresso automaticamente
viewModel.updateProgress();

// Obter estatísticas detalhadas
const stats = viewModel.getCompletionStats();
console.log(\`Clustering: \${stats.clustering.percentage}% completo\`);
console.log(\`Seleção: \${stats.clusterSelection.percentage}% completo\`);
```

## Uso com React

### Hook Personalizado

```tsx
import { useKeyphraseCuration } from '../hooks/useKeyphraseCuration';

const MyComponent = () => {
  const {
    viewModel,
    keyphrases,
    clusters,
    unclusteredKeyphrases,
    selectedClusters,
    completionStats,
    assignKeyphraseToCluster,
    createCluster,
    selectCluster,
    isLoading,
    error,
  } = useKeyphraseCuration({
    onDataChange: (vm) => {
      // Callback quando dados mudam
      console.log('Dados atualizados:', vm.toJSON());
    },
    autoUpdateProgress: true,
  });

  // Carrega dados iniciais
  useEffect(() => {
    if (initialData) {
      loadFromRawData(initialData, metadata);
    }
  }, [initialData]);

  return (
    <div>
      <h1>Progresso: {completionStats.clustering.percentage}%</h1>
      
      {/* Render baseado no estado */}
      {isLoading && <div>Carregando...</div>}
      {error && <div>Erro: {error}</div>}
      
      {/* Lista de keyphrases não clusterizadas */}
      {unclusteredKeyphrases.map(kp => (
        <div key={kp.id}>{kp.text}</div>
      ))}
      
      {/* Clusters */}
      {Array.from(clusters.values()).map(cluster => (
        <div key={cluster.id}>
          Cluster {cluster.id}: {cluster.keyphrases.length} keyphrases
        </div>
      ))}
    </div>
  );
};
```

## Padrões de Arquitetura

### 1. **Imutabilidade**
```typescript
// ❌ Não faça isso (mutação direta)
viewModel.clusters.get(1).isSelected = true;

// ✅ Use os métodos da API
viewModel.selectCluster(1, true);
```

### 2. **Estado Derivado**
```typescript
// Os hooks automaticamente recomputam valores derivados
const {
  unclusteredKeyphrases,    // Computado automaticamente
  selectedClusters,         // Filtrado dinamicamente
  completionStats,          // Calculado em tempo real
} = useKeyphraseCuration();
```

### 3. **Transformação de Dados**
```typescript
// Entrada: formato atual do sistema
const rawData = { keyphrases: {...}, clusters: {...} };

// ViewModel: formato otimizado e tipado
const viewModel = KeyphraseCurationViewModel.fromRawData(rawData, metadata);

// Saída: qualquer formato necessário
const simpleFormat = viewModel.toSimpleFormat();
const backToRaw = viewModel.toRawFormat();
```

## Performance e Otimizações

### 1. **Memoização Automática**
```typescript
// O hook usa useMemo para evitar recomputações desnecessárias
const unclusteredKeyphrases = useMemo(() => 
  viewModel?.getUnclusteredKeyphrases() ?? [], [viewModel]
);
```

### 2. **Clonagem Inteligente**
```typescript
// Para undo/redo ou snapshots
const snapshot = viewModel.clone();

// Restaurar estado anterior
setViewModel(snapshot);
```

### 3. **Acesso Otimizado**
```typescript
// Maps internos para acesso O(1)
const keyphrase = viewModel.keyphrases.get(id);       // O(1)
const cluster = viewModel.clusters.get(clusterId);    // O(1)
```

## Integração com APIs

### Carregamento
```typescript
const loadData = async (topic: string) => {
  const response = await fetch(\`/api/annotations/\${topic}\`);
  const rawData = await response.json();
  
  loadFromRawData(rawData, {
    topic,
    annotator: 'current_user',
    phase: 'clustering',
    progress: { /* ... */ }
  });
};
```

### Salvamento
```typescript
const saveData = async () => {
  const exportedData = exportToRawFormat();
  
  await fetch('/api/annotations/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exportedData)
  });
};
```

## Extensibilidade

### Novos Tipos de Dados
```typescript
// Extend interfaces conforme necessário
interface ExtendedKeyphraseData extends KeyphraseData {
  confidence?: number;
  category?: string;
}

// Classe derivada com funcionalidades adicionais
class AdvancedCurationViewModel extends KeyphraseCurationViewModel {
  // Novos métodos específicos
}
```

### Validações Customizadas
```typescript
class ValidatedCurationViewModel extends KeyphraseCurationViewModel {
  override assignKeyphraseToCluster(keyphraseId: number, clusterId: number): boolean {
    // Validações customizadas
    if (!this.isValidAssignment(keyphraseId, clusterId)) {
      return false;
    }
    
    return super.assignKeyphraseToCluster(keyphraseId, clusterId);
  }
}
```

## Migração

### Do Formato Atual
```typescript
// Seus dados atuais (cloning.json)
const currentData = { keyphrases: {...}, clusters: {...} };

// Migração automática
const viewModel = KeyphraseCurationViewModel.fromRawData(currentData, metadata);

// Continue usando normalmente
```

### Do Formato Simples
```typescript
// Dados do complete_keyphrase_clustering.json
const simpleData = { "1": { description: "...", cluster: 25 } };

// Migração automática
const viewModel = KeyphraseCurationViewModel.fromSimpleFormat(simpleData, metadata);
```

## Conclusão

A classe `KeyphraseCurationViewModel` oferece:

- **Unificação** de todos os formatos de dados em uma estrutura única
- **Tipagem forte** para reduzir erros e melhorar DX
- **Performance otimizada** com estruturas de dados eficientes
- **Integração perfeita** com React através de hooks personalizados
- **Extensibilidade** para futuras funcionalidades

Isso simplifica significativamente o desenvolvimento do frontend e garante consistência em todo o sistema de curadoria de keyphrases.