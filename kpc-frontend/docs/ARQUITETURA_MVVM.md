# Arquitetura MVVM - Sistema de Curação de Keyphrases

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura MVVM](#arquitetura-mvvm)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Camadas da Aplicação](#camadas-da-aplicação)
- [Sistema de Sincronização Global](#sistema-de-sincronização-global)
- [Fluxo de Dados](#fluxo-de-dados)
- [Modelos de Negócio](#modelos-de-negócio)
- [Stores Zustand](#stores-zustand)
- [ViewModels](#viewmodels)
- [Views](#views)
- [Padrões e Convenções](#padrões-e-convenções)

---

## 🎯 Visão Geral

O projeto `src-mvvm` implementa um sistema de **curação colaborativa de keyphrases** usando o padrão arquitetural **MVVM (Model-View-ViewModel)** com React. O sistema permite que múltiplos anotadores trabalhem na extração, clustering e curação de keyphrases de documentos acadêmicos.

### Principais Funcionalidades

1. **Keyphrase Clustering**: Arraste e solte keyphrases em clusters
2. **Cluster Selection**: Selecione clusters e keyphrases representativas
3. **Alias Curation**: Defina aliases finais para os clusters selecionados
4. **Sincronização Global**: Mudanças em qualquer tela atualizam todas as outras automaticamente
5. **Múltiplas Ordenações**: Suporte a diferentes critérios de ordenação (alfabética, numérica, frequência, etc.)

---

## 🏗️ Arquitetura MVVM

### O que é MVVM?

**MVVM (Model-View-ViewModel)** é um padrão arquitetural que separa a lógica de negócio da interface do usuário:

```
┌─────────────┐         ┌──────────────┐         ┌─────────┐
│    View     │ ◄─────► │  ViewModel   │ ◄─────► │  Model  │
│  (React)    │  bind   │   (Hooks)    │  data   │ (Logic) │
└─────────────┘         └──────────────┘         └─────────┘
```

### Benefícios da Arquitetura

- ✅ **Separação de Responsabilidades**: UI separada da lógica
- ✅ **Testabilidade**: ViewModels podem ser testados isoladamente
- ✅ **Reutilização**: Lógica de negócio pode ser compartilhada
- ✅ **Manutenibilidade**: Mudanças na UI não afetam a lógica
- ✅ **Escalabilidade**: Fácil adicionar novas funcionalidades

---

## 📁 Estrutura de Pastas

```
src-mvvm/
├── models/                          # Camada de Modelo (Model)
│   ├── entities/                    # Entidades de domínio
│   │   ├── Keyphrase.js            # Classe Keyphrase
│   │   ├── Cluster.js              # Classe Cluster
│   │   ├── Topic.js                # Classe Topic
│   │   └── User.js                 # Classe User
│   │
│   ├── services/                    # Serviços de API (comunicação backend)
│   │   ├── AuthService.js          # Autenticação
│   │   ├── TopicService.js         # Operações com tópicos
│   │   ├── KeyphraseService.js     # Operações com keyphrases
│   │   ├── ClusterService.js       # Operações com clusters
│   │   └── AnnotationService.js    # Salvamento de anotações
│   │
│   └── business/                    # Modelos de negócio (lógica complexa)
│       ├── KeyphraseSortingModel.js # Ordenação de keyphrases
│       ├── ClusterSortingModel.js   # Ordenação de clusters
│       ├── ClusterAliasSortingModel.js # Ordenação de aliases
│       └── ClusterDataModel.js      # Análise de dados de clusters
│
├── viewmodels/                      # Camada ViewModel
│   ├── hooks/                       # Custom Hooks (ViewModels)
│   │   ├── useLoginViewModel.js
│   │   ├── useTopicSelectionViewModel.js
│   │   ├── useKeyphraseClusteringViewModel.js
│   │   ├── useKeyphraseClustersViewModel.js
│   │   └── useCuratedKeyphrasesViewModel.js
│   │
│   └── stores/                      # Estado global (Zustand)
│       ├── useAuthStore.js         # Autenticação global
│       ├── useTopicStore.js        # Tópico selecionado
│       ├── useFlowStore.js         # Navegação do wizard
│       └── useSyncStore.js         # Sincronização entre telas
│
├── views/                           # Camada View (UI)
│   ├── pages/                       # Páginas principais
│   │   ├── LoginView.jsx
│   │   ├── TopicSelectionView.jsx
│   │   ├── KeyphraseClusteringView.jsx
│   │   ├── KeyphraseClustersView.jsx
│   │   └── CuratedKeyphrasesView.jsx
│   │
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── Button.jsx
│   │   ├── TextField.jsx
│   │   ├── Dialog.jsx
│   │   ├── Chip.jsx
│   │   ├── KeyphraseItem.jsx
│   │   ├── ClusterCard.jsx
│   │   └── AdjudicatorClusterChips.jsx
│   │
│   └── layouts/                     # Layouts de página
│       ├── AuthLayout.jsx          # Layout de autenticação
│       └── MainLayout.jsx          # Layout principal da aplicação
│
├── shared/                          # Código compartilhado
│   ├── config.js                    # Configurações centralizadas
│   └── enums/                       # Enumerações
│       ├── KeyphraseSorting.js     # Tipos de ordenação de keyphrases
│       └── ClusterSorting.js       # Tipos de ordenação de clusters
│
└── AppMVVM.jsx                      # Componente raiz com rotas

```

---

## 🔄 Camadas da Aplicação

### 1. Model (Modelo)

Responsável pela **lógica de negócio** e **acesso a dados**.

#### 1.1 Entities (Entidades)

Classes que representam objetos de domínio:

```javascript
// Keyphrase.js
export class Keyphrase {
  constructor(id, label, score, cluster = -1) {
    this.id = id;
    this.label = label;
    this.score = score;
    this.cluster = cluster;
  }
}
```

#### 1.2 Services (Serviços)

Encapsulam comunicação com APIs backend:

```javascript
// KeyphraseService.js
export const keyphraseService = {
  // GET /topic/{username}/{topic_name}/keyphrases_clustering
  async getKeyphraseClustering(username, topicName) {
    const response = await apiService.get(
      `/topic/${username}/${topicName}/keyphrases_clustering`
    );
    return response.data;
  }
};
```

**APIs Principais:**
- `/topic/{username}/{topic_name}/keyphrases_clustering` - Obter keyphrases
- `/topic/{username}/{topic_name}/clusters` - Obter clusters
- `/topic/{username}/{topic_name}/curated_keyphrases` - Obter curadas
- `/topic/move_to_cluster_and_save_annotation/` - Mover keyphrase
- `/topic/select_cluster_and_save_annotation/` - Selecionar cluster
- `/topic/select_keyphrase_and_save_annotation/` - Selecionar keyphrase
- `/topic/set_alias_and_save_annotation/` - Definir alias

#### 1.3 Business Models (Modelos de Negócio)

Lógica complexa de negócio:

**KeyphraseSortingModel**: Gerencia 5 tipos de ordenação de keyphrases
- `alphabetical` - Ordem alfabética
- `score` - Por score (relevância)
- `cluster_size` - Por tamanho do cluster
- `sentence_similarity` - Por similaridade de sentença
- `word_similarity` - Por similaridade de palavra

**ClusterSortingModel**: Gerencia 5 tipos de ordenação de clusters
- `numerical` - Ordem numérica (ID)
- `alphabetical` - Ordem alfabética
- `size` - Por tamanho (número de keyphrases)
- `cohesion` - Por coesão interna
- `relevance` - Por relevância

**ClusterDataModel**: Análise e cálculos sobre clusters
- Cálculo de coesão
- Estatísticas de clusters
- Detecção de outliers

---

### 2. ViewModel

Contém a **lógica de apresentação** e gerencia o **estado da UI**.

#### 2.1 Custom Hooks (ViewModels)

Cada tela tem seu próprio ViewModel implementado como React Hook:

**useKeyphraseClusteringViewModel.js**
```javascript
export const useKeyphraseClusteringViewModel = () => {
  // Estado local
  const [keyphraseClustering, setKeyphraseClustering] = useState({});
  const [currentSorting, setCurrentSorting] = useState('alphabetical');
  
  // Stores globais
  const authStore = useAuthStore();
  const topicStore = useTopicStore();
  
  // Sincronização
  const registerListener = useSyncStore(state => state.registerListener);
  const triggerSync = useSyncStore(state => state.triggerSync);
  
  // Carregar dados
  const loadData = useCallback(async () => {
    const data = await keyphraseService.getKeyphraseClustering(username, topicName);
    setKeyphraseClustering(data);
  }, [username, topicName]);
  
  // Handler de drag and drop
  const handleKeyphraseClusteringChange = async (keyphraseIndex, clusterNum) => {
    await clusterService.moveToClusterAndSave(username, topicName, keyphraseIndex, clusterNum);
    
    // Notificar outras telas
    triggerSync('clustering', 'move_to_cluster', { keyphraseIndex, clusterNum });
  };
  
  // Retornar API pública
  return {
    keyphraseClustering,
    currentSorting,
    loading,
    error,
    handleKeyphraseClusteringChange,
    changeSorting,
    refreshData
  };
};
```

**Responsabilidades do ViewModel:**
- ✅ Carregar dados do backend (via Services)
- ✅ Gerenciar estado local da tela
- ✅ Processar dados (via Business Models)
- ✅ Handlers de eventos do usuário
- ✅ Validação de entrada
- ✅ Sincronização com outras telas

#### 2.2 Stores Zustand

Estado global compartilhado entre componentes:

**useAuthStore.js** - Gerencia autenticação
```javascript
const useAuthStore = create((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: (username, password) => {
    // Lógica de login
    set({ currentUser: user, isAuthenticated: true });
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  }
}));
```

**useTopicStore.js** - Gerencia tópico selecionado
```javascript
const useTopicStore = create((set) => ({
  selectedTopic: null,
  
  setSelectedTopic: (topic) => {
    set({ selectedTopic: topic });
  }
}));
```

**useFlowStore.js** - Gerencia navegação do wizard
```javascript
const useFlowStore = create((set) => ({
  currentStep: 0,
  completedSteps: [],
  
  nextStep: () => set(state => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set(state => ({ currentStep: state.currentStep - 1 }))
}));
```

---

### 3. View (Visão)

Camada de **apresentação visual** pura, sem lógica de negócio.

#### 3.1 Pages (Páginas)

Páginas principais da aplicação:

**KeyphraseClusteringView.jsx**
```jsx
export const KeyphraseClusteringView = ({ embedded = false }) => {
  // Conectar ao ViewModel
  const vm = useKeyphraseClusteringViewModel();
  
  return (
    <Box>
      <Typography variant="h6">Source Keyphrases</Typography>
      
      {/* Controles de ordenação */}
      <Select value={vm.currentSorting} onChange={(e) => vm.changeSorting(e.target.value)}>
        <MenuItem value="alphabetical">Alphabetical</MenuItem>
        <MenuItem value="score">By Score</MenuItem>
      </Select>
      
      {/* Lista de keyphrases com drag and drop */}
      {vm.keyphraseClustering.map((kp, idx) => (
        <KeyphraseItem
          key={idx}
          keyphrase={kp}
          onDrop={(clusterNum) => vm.handleKeyphraseClusteringChange(idx, clusterNum)}
        />
      ))}
    </Box>
  );
};
```

**Princípios da View:**
- ✅ Apenas apresentação visual
- ✅ Delega toda lógica ao ViewModel
- ✅ Reage a mudanças de estado
- ✅ Dispara eventos para o ViewModel
- ❌ Sem chamadas diretas a APIs
- ❌ Sem lógica de negócio

#### 3.2 Components (Componentes)

Componentes reutilizáveis:

**KeyphraseItem.jsx** - Item individual de keyphrase
**ClusterCard.jsx** - Card de cluster com keyphrases
**Chip.jsx** - Chip customizado para keyphrases
**Button.jsx** - Botão reutilizável
**TextField.jsx** - Campo de texto

#### 3.3 Layouts

**MainLayout.jsx** - Layout principal com header e navegação
**AuthLayout.jsx** - Layout para telas de autenticação

---

## 🔄 Sistema de Sincronização Global

### Problema

Quando uma operação modifica dados no backend (ex: mover keyphrase para cluster), **todas as 3 telas** precisam ser atualizadas porque:

1. **KeyphraseClustering**: Keyphrases mudam de cluster
2. **KeyphraseClusters**: Clusters recalculam tamanho/coesão
3. **CuratedKeyphrases**: Aliases precisam refletir mudanças

### Solução: useSyncStore

Sistema de **pub/sub (publish-subscribe)** usando Zustand:

```javascript
// useSyncStore.js
const useSyncStore = create((set, get) => ({
  syncCounter: 0,
  listeners: {
    clustering: null,
    clusters: null,
    curated: null
  },
  
  // Registrar listener
  registerListener: (key, callback) => {
    set(state => ({
      listeners: { ...state.listeners, [key]: callback }
    }));
  },
  
  // Remover listener
  unregisterListener: (key) => {
    set(state => ({
      listeners: { ...state.listeners, [key]: null }
    }));
  },
  
  // Disparar sincronização
  triggerSync: (source, operation, data) => {
    const state = get();
    
    set({ syncCounter: state.syncCounter + 1 });
    
    // Notificar TODOS os listeners
    Object.entries(state.listeners).forEach(([key, callback]) => {
      if (callback) {
        callback({ source, operation, data });
      }
    });
  }
}));
```

### Fluxo de Sincronização

```
1. Usuário move keyphrase no KeyphraseClustering
   ↓
2. ViewModel chama API backend
   ↓
3. Backend atualiza dados e retorna sucesso
   ↓
4. ViewModel chama triggerSync('clustering', 'move_to_cluster', {...})
   ↓
5. useSyncStore notifica TODOS os listeners registrados
   ↓
6. KeyphraseClusters recebe notificação → recarrega dados
   CuratedKeyphrases recebe notificação → recarrega dados
   KeyphraseClustering ignora (source === 'clustering')
   ↓
7. TODAS as telas mostram dados atualizados ✅
```

### Implementação no ViewModel

```javascript
// 1. Importar seletores estáveis
const registerListener = useSyncStore(state => state.registerListener);
const unregisterListener = useSyncStore(state => state.unregisterListener);
const triggerSync = useSyncStore(state => state.triggerSync);

// 2. Registrar listener no mount
useEffect(() => {
  const handleSync = async (syncEvent) => {
    // Ignorar se mudança veio desta tela
    if (syncEvent.source === 'clustering') return;
    
    // Recarregar dados
    await loadData();
  };
  
  registerListener('clustering', handleSync);
  
  // Cleanup no unmount
  return () => unregisterListener('clustering');
}, [username, topicName, registerListener, unregisterListener]);

// 3. Disparar sincronização após operações
const handleSave = async () => {
  await api.save();
  
  // Notificar outras telas
  triggerSync('clustering', 'save_operation', { id: 123 });
};
```

### APIs que Disparam Sincronização

1. **`/topic/move_to_cluster_and_save_annotation/`**
   - Source: `'clustering'`
   - Operation: `'move_to_cluster'`

2. **`/topic/select_cluster_and_save_annotation/`**
   - Source: `'clusters'`
   - Operation: `'select_cluster'`

3. **`/topic/select_keyphrase_and_save_annotation/`**
   - Source: `'clusters'`
   - Operation: `'select_keyphrase1'` ou `'select_keyphrase2'`

4. **`/topic/set_alias_and_save_annotation/`**
   - Source: `'curated'`
   - Operation: `'set_alias'`

---

## 📊 Fluxo de Dados

### Fluxo Completo: Mover Keyphrase

```
┌─────────────────────────────────────────────────────────────┐
│  USER: Arrasta keyphrase para cluster                       │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  VIEW: KeyphraseClusteringView                              │
│  → onDrop={(cluster) => vm.handleChange(idx, cluster)}      │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  VIEWMODEL: useKeyphraseClusteringViewModel                 │
│  → handleKeyphraseClusteringChange(idx, cluster)            │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  SERVICE: ClusterService.moveToClusterAndSave()             │
│  → POST /topic/move_to_cluster_and_save_annotation/         │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  BACKEND: Processa e retorna sucesso                        │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  VIEWMODEL: triggerSync('clustering', 'move', {...})        │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  STORE: useSyncStore notifica listeners                     │
└────────┬──────────────────────┬─────────────────────────────┘
         ↓                      ↓
    ┌────────────┐      ┌─────────────────┐
    │ Clusters   │      │ Curated         │
    │ ViewModel  │      │ ViewModel       │
    │ loadData() │      │ loadData()      │
    └────────────┘      └─────────────────┘
         ↓                      ↓
    ┌────────────┐      ┌─────────────────┐
    │ Clusters   │      │ Curated         │
    │ View       │      │ View            │
    │ Atualiza   │      │ Atualiza        │
    └────────────┘      └─────────────────┘
```

---

## 🎨 Modelos de Negócio

### KeyphraseSortingModel

Gerencia 5 tipos diferentes de ordenação de keyphrases:

```javascript
export const KeyphraseSorting = {
  ALPHABETICAL: 'alphabetical',           // A-Z
  SCORE: 'score',                         // Por relevância
  CLUSTER_SIZE: 'cluster_size',           // Por tamanho do cluster
  SENTENCE_SIMILARITY: 'sentence_similarity', // Por similaridade de sentença
  WORD_SIMILARITY: 'word_similarity'      // Por similaridade de palavra
};

export const keyphraseSortingModel = {
  // Ordenar keyphrases por tipo
  sortKeyphrases(keyphrases, sortingType) {
    switch(sortingType) {
      case KeyphraseSorting.ALPHABETICAL:
        return [...keyphrases].sort((a, b) => 
          a.label.localeCompare(b.label)
        );
      case KeyphraseSorting.SCORE:
        return [...keyphrases].sort((a, b) => b.score - a.score);
      // ...
    }
  },
  
  // Obter estatísticas de ordenação
  getStatistics(data) {
    return {
      totalKeyphrases: data.length,
      averageScore: data.reduce((sum, kp) => sum + kp.score, 0) / data.length,
      clusterDistribution: { /* ... */ }
    };
  }
};
```

### ClusterSortingModel

Gerencia 5 tipos de ordenação de clusters:

```javascript
export const ClusterSorting = {
  NUMERICAL: 'numerical',         // Por ID
  ALPHABETICAL: 'alphabetical',   // A-Z
  SIZE: 'size',                   // Por número de keyphrases
  COHESION: 'cohesion',          // Por coesão interna
  RELEVANCE: 'relevance'         // Por relevância
};
```

### ClusterDataModel

Análise avançada de clusters:

```javascript
export const clusterDataModel = {
  // Calcular coesão do cluster
  calculateCohesion(cluster) {
    // Média da similaridade entre todas as keyphrases
    const similarities = [];
    for (let i = 0; i < cluster.keyphrases.length; i++) {
      for (let j = i + 1; j < cluster.keyphrases.length; j++) {
        similarities.push(
          this.calculateSimilarity(cluster.keyphrases[i], cluster.keyphrases[j])
        );
      }
    }
    return similarities.reduce((sum, s) => sum + s, 0) / similarities.length;
  },
  
  // Detectar outliers
  findOutliers(cluster) {
    const avgSimilarity = this.calculateCohesion(cluster);
    return cluster.keyphrases.filter(kp => 
      this.getSimilarityToCluster(kp, cluster) < avgSimilarity * 0.5
    );
  }
};
```

---

## 🏪 Stores Zustand

### useAuthStore

```javascript
const useAuthStore = create((set, get) => ({
  // Estado
  currentUser: null,
  isAuthenticated: false,
  
  // Ações
  login: async (username, password) => {
    const user = await authService.login(username, password);
    set({ currentUser: user, isAuthenticated: true });
  },
  
  logout: () => {
    authService.logout();
    set({ currentUser: null, isAuthenticated: false });
  },
  
  // Seletores
  getCurrentUser: () => get().currentUser,
  getCurrentUsername: () => get().currentUser?.username,
  isAuthenticated: () => get().isAuthenticated
}));
```

### useTopicStore

```javascript
const useTopicStore = create((set, get) => ({
  selectedTopic: null,
  topics: [],
  
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  
  loadTopics: async (username) => {
    const topics = await topicService.getTopics(username);
    set({ topics });
  },
  
  getSelectedTopic: () => get().selectedTopic
}));
```

### useFlowStore

```javascript
const useFlowStore = create((set, get) => ({
  currentStep: 0,
  completedSteps: [],
  
  steps: [
    { id: 0, path: '/keyphrase-clustering', label: 'Clustering' },
    { id: 1, path: '/keyphrase-clusters', label: 'Clusters' },
    { id: 2, path: '/curated-keyphrases', label: 'Curation' }
  ],
  
  nextStep: () => {
    const current = get().currentStep;
    set({ 
      currentStep: current + 1,
      completedSteps: [...get().completedSteps, current]
    });
  },
  
  goToStep: (step) => set({ currentStep: step })
}));
```

---

## 🎭 ViewModels Detalhados

### useKeyphraseClusteringViewModel

**Responsabilidades:**
- Carregar keyphrases do backend
- Gerenciar 5 tipos de ordenação
- Drag and drop de keyphrases
- Filtrar keyphrases já clusterizadas
- Sincronizar com outras telas

**Estado:**
```javascript
{
  keyphraseClustering: {},        // Dados de keyphrases por ordenação
  clusters: {},                    // Clusters disponíveis
  currentSorting: 'alphabetical', // Ordenação atual
  sortingStats: {},               // Estatísticas da ordenação
  hideClusteredState: false,      // Esconder keyphrases clusterizadas
  loading: true,
  error: ''
}
```

**API Pública:**
```javascript
{
  keyphraseClustering,           // Keyphrases para mostrar
  clusters,                       // Clusters disponíveis
  currentSorting,                 // Ordenação selecionada
  sortingStats,                   // Estatísticas
  loading,
  error,
  handleKeyphraseClusteringChange, // Drag and drop handler
  changeSorting,                   // Mudar ordenação
  toggleHideClustered,             // Toggle filtro
  refreshData                      // Recarregar dados
}
```

### useKeyphraseClustersViewModel

**Responsabilidades:**
- Carregar clusters do backend
- Gerenciar 5 tipos de ordenação de clusters
- Seleção de clusters (0/1)
- Seleção de 2 keyphrases representativas por cluster
- Modo adjudicador (clues_from_other_annotators)
- Sincronizar com outras telas

**Estado:**
```javascript
{
  clusters: {},                    // Clusters por ordenação
  clusterOrder: [],                // Ordem dos IDs
  selectedClusters: {},            // {clusterId: "0"|"1"}
  selectedKeyphrases: {},          // {clusterId: {selected1, selected2}}
  currentSorting: 'numerical',     // Ordenação atual
  sortingStats: {},
  clustersInfo: '',                // Meta informações
  adjudicatorData: null,           // Dados de outros anotadores
  loading: true,
  error: ''
}
```

**API Pública:**
```javascript
{
  clusters,                        // Clusters para mostrar
  clusterOrder,                    // Ordem correta
  selectedClusters,
  selectedKeyphrases,
  currentSorting,
  sortingStats,
  loading,
  error,
  handleClusterSelection,          // Selecionar 0/1
  handleKeyphraseSelection,        // Selecionar keyphrase
  changeSorting,                   // Mudar ordenação
  refreshData
}
```

### useCuratedKeyphrasesViewModel

**Responsabilidades:**
- Carregar keyphrases curadas
- Gerenciar 2 tipos de ordenação de aliases
- Editar aliases de clusters
- Filtrar apenas curados
- Sincronizar com outras telas

**Estado:**
```javascript
{
  curatedKeyphrases: {},           // Keyphrases curadas por ordenação
  clusterOrder: [],                // Ordem dos IDs
  selectedClusters: {},            // Estado de seleção
  keyphraseAlias: {},              // Aliases atuais
  updatedKeyphraseAlias: {},       // Aliases modificados
  defaultAliases: {},              // Aliases padrão do backend
  currentAliasSorting: 'numerical', // Ordenação atual
  sortingStats: {},
  showOnlyCurated: false,          // Filtro
  loading: true,
  error: ''
}
```

**API Pública:**
```javascript
{
  curatedKeyphrases,               // Keyphrases para mostrar
  clusterOrder,
  keyphraseAlias,
  currentAliasSorting,
  sortingStats,
  showOnlyCurated,
  loading,
  error,
  handleAliasChange,               // Editar alias
  saveAlias,                       // Salvar no backend
  toggleShowOnlyCurated,           // Toggle filtro
  changeSorting,                   // Mudar ordenação
  refreshData
}
```

---

## 📐 Padrões e Convenções

### Nomenclatura

```javascript
// ViewModels: use + nome + ViewModel
useKeyphraseClusteringViewModel

// Views: nome + View
KeyphraseClusteringView

// Services: nome + Service
keyphraseService

// Models: nome + Model
keyphraseSortingModel

// Stores: use + nome + Store
useAuthStore

// Enums: SCREAMING_SNAKE_CASE
const KeyphraseSorting = {
  ALPHABETICAL: 'alphabetical',
  SCORE: 'score'
};
```

### Estrutura de ViewModel

```javascript
export const useMyViewModel = () => {
  // 1. Estado local
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 2. Stores globais
  const authStore = useAuthStore();
  const topicStore = useTopicStore();
  
  // 3. Sincronização
  const registerListener = useSyncStore(state => state.registerListener);
  const triggerSync = useSyncStore(state => state.triggerSync);
  
  // 4. Dados derivados
  const username = authStore.getCurrentUsername();
  const topicName = topicStore.getSelectedTopic()?.name;
  
  // 5. useEffect para carregamento inicial
  useEffect(() => {
    loadData();
  }, [username, topicName]);
  
  // 6. useEffect para sincronização
  useEffect(() => {
    const handleSync = async (event) => {
      if (event.source === 'mySource') return;
      await loadData();
    };
    registerListener('myKey', handleSync);
    return () => unregisterListener('myKey');
  }, [username, topicName, registerListener, unregisterListener]);
  
  // 7. Funções de carregamento
  const loadData = useCallback(async () => {
    setLoading(true);
    const result = await myService.getData(username, topicName);
    setData(result);
    setLoading(false);
  }, [username, topicName]);
  
  // 8. Handlers
  const handleAction = async (params) => {
    await myService.doAction(params);
    triggerSync('mySource', 'action', params);
  };
  
  // 9. Retornar API pública
  return {
    data,
    loading,
    error,
    handleAction,
    refreshData: loadData
  };
};
```

### Estrutura de View

```jsx
export const MyView = ({ embedded = false }) => {
  // 1. Conectar ao ViewModel
  const vm = useMyViewModel();
  
  // 2. Loading state
  if (vm.loading) {
    return <CircularProgress />;
  }
  
  // 3. Error state
  if (vm.error) {
    return <Alert severity="error">{vm.error}</Alert>;
  }
  
  // 4. Renderizar conteúdo
  return (
    <Box>
      <Typography variant="h6">My View</Typography>
      
      {/* Controles */}
      <Button onClick={vm.handleAction}>Action</Button>
      
      {/* Conteúdo */}
      {vm.data.map(item => (
        <ItemComponent key={item.id} data={item} />
      ))}
    </Box>
  );
};
```

### Tratamento de Erros

```javascript
// No ViewModel
const handleAction = async () => {
  try {
    setSaving(true);
    setError('');
    
    const result = await myService.doAction();
    
    if (!result || result.error) {
      throw new Error(result?.message || 'Erro na operação');
    }
    
    // Sucesso
    triggerSync('source', 'action', {});
    
  } catch (error) {
    console.error('❌ Erro:', error);
    setError(error.message);
  } finally {
    setSaving(false);
  }
};
```

### Sincronização Correta

```javascript
// ✅ CORRETO: Usar seletores estáveis
const registerListener = useSyncStore(state => state.registerListener);
const unregisterListener = useSyncStore(state => state.unregisterListener);
const triggerSync = useSyncStore(state => state.triggerSync);

useEffect(() => {
  const handleSync = async (event) => {
    if (event.source === 'self') return;
    await loadData();
  };
  registerListener('key', handleSync);
  return () => unregisterListener('key');
}, [username, topicName, registerListener, unregisterListener]);

// ❌ ERRADO: Criar instância no componente
const syncStore = useSyncStore(); // Nova referência a cada render!
useEffect(() => {
  syncStore.registerListener(...); // Loop infinito!
}, [syncStore]); // syncStore sempre muda!
```

---

## 🔍 Debugging

### Console Logs

O sistema usa emojis para facilitar identificação:

```javascript
// Sincronização
console.log('🔔 Listener registrado');
console.log('🔕 Listener removido');
console.log('📢 Disparando sincronização');
console.log('⏭️ Ignorando sincronização própria');

// Operações
console.log('✅ Sucesso');
console.log('❌ Erro:', error);
console.log('⚠️ Aviso:', warning);
console.log('🔄 Recarregando dados');
console.log('💾 Salvando...');
```

### React DevTools

Instalar extensão: https://react.dev/learn/react-developer-tools

Ver estado de hooks e stores em tempo real.

### Zustand DevTools

```javascript
import { devtools } from 'zustand/middleware';

const useMyStore = create(
  devtools(
    (set) => ({
      // estado e ações
    }),
    { name: 'MyStore' }
  )
);
```

---

## 🚀 Performance

### Otimizações Implementadas

1. **useCallback** para funções passadas como props
2. **useMemo** para cálculos pesados
3. **React.memo** para componentes que re-renderizam frequentemente
4. **Zustand seletores** para evitar re-renders desnecessários
5. **Lazy loading** de componentes pesados

### Exemplo de Otimização

```javascript
// ❌ ANTES: Re-cria função a cada render
const handleClick = () => {
  doSomething(data);
};

// ✅ DEPOIS: Função estável
const handleClick = useCallback(() => {
  doSomething(data);
}, [data]);
```

---

## 📚 Recursos Adicionais

### Documentação

- [React Hooks](https://react.dev/reference/react)
- [Zustand](https://github.com/pmndrs/zustand)
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)

### Padrões MVVM

- [MVVM Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)
- [React MVVM Best Practices](https://www.patterns.dev/posts/mvvm-pattern)

---

## 🎯 Próximos Passos

### Features Planejadas

- [ ] Undo/Redo de operações
- [ ] Histórico de anotações
- [ ] Modo colaborativo em tempo real (WebSockets)
- [ ] Exportação de dados curados
- [ ] Dashboard de estatísticas
- [ ] Testes automatizados (Jest + React Testing Library)

### Melhorias Técnicas

- [ ] Adicionar TypeScript
- [ ] Implementar cache de dados
- [ ] Otimizar re-renders com React.memo
- [ ] Adicionar Service Workers para offline
- [ ] Implementar lazy loading de rotas

---

## 📝 Conclusão

A arquitetura MVVM implementada no projeto `src-mvvm` fornece uma base sólida, escalável e manutenível para o sistema de curação de keyphrases. A separação clara de responsabilidades, o sistema de sincronização global e os múltiplos tipos de ordenação tornam a aplicação robusta e fácil de estender.

**Principais Vantagens:**
- ✅ Código organizado e fácil de navegar
- ✅ Lógica de negócio reutilizável
- ✅ UI desacoplada do estado
- ✅ Sincronização automática entre telas
- ✅ Fácil de testar e debugar
- ✅ Pronto para escalar

---

**Última atualização:** 03/11/2025  
**Versão:** 1.0.0  
**Autor:** Sistema de Curação de Keyphrases - MVVM Architecture
