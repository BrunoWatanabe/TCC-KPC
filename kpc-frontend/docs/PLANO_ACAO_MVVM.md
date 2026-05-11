# 📋 Plano de Ação: MVVM Simplificado para Keyphrase Curation

## 🎯 Objetivo
Reestruturar a aplicação Keyphrase Curation seguindo o padrão **MVVM (Model-View-ViewModel)** com **3 camadas bem definidas**, baseado no frontend React atual e no backend ReactPy anterior.

## 📊 **STATUS ATUAL - FASE 3 VIEWS CONCLUÍDA ✅**

### ✅ **FASE 1: Models** - **CONCLUÍDO**
- ✅ 4 Entidades (User, Topic, Keyphrase, Cluster)
- ✅ 5 Services (Auth, Topic, Keyphrase, Cluster, Annotation)

### ✅ **FASE 2: ViewModels** - **CONCLUÍDO** 
- ✅ 3 Stores Zustand (Auth, Topic, Flow)
- ✅ 5 Custom Hooks (Login, TopicSelection, KeyphraseClustering, KeyphraseClusters, CuratedKeyphrases)
- ✅ Index de exportação

### ✅ **FASE 3: Views** - **CONCLUÍDO**
- ✅ 6 Componentes reutilizáveis (Button, TextField, Chip, Dialog, KeyphraseItem, ClusterCard)
- ✅ 2 Layouts (AuthLayout, MainLayout)
- ✅ 5 Views principais (Login, TopicSelection, KeyphraseClustering, KeyphraseClusters, CuratedKeyphrases)
- ✅ AppMVVM.jsx e roteamento completo
- ✅ Documentação README completa

### 🎉 **ARQUITETURA MVVM 100% IMPLEMENTADA!**
- 🏗️ **3 Camadas bem definidas**: Models ↔ ViewModels ↔ Views
- 📱 **Frontend funcional** em `/src-mvvm/` 
- 📚 **Documentação completa** com guias de uso
- 🔄 **Pronto para desenvolvimento paralelo** com frontend atual

## 🔄 **Fluxo da Aplicação - 3 Etapas Principais**

```
1. 🔐 Login → 2. 📋 Seleção de Tópicos → 3. ✏️ Keyphrase Curation Flow
```

## 🏗️ Arquitetura MVVM - 3 Camadas Essenciais

### 📊 **Fluxo MVVM Simplificado**
```
+----------------+    (User Events)    +-----------------+    (API Calls)    +------------------+
|     VIEW       | ==================> |   VIEW MODEL    | ================> |      MODEL       |
|   (UI Pura)    | <================== | (Lógica + UI)   | <================ | (Dados + API)    |
| React Components|   (Data Binding)    |    Estado       |   (JSON Data)     | Business Logic   |
+----------------+                     +-----------------+                   +------------------+
```

### 📂 Nova Estrutura MVVM (3 Camadas) - Frontend Paralelo
```
projeto/
├── src/                # 🔄 Frontend ATUAL (mantido intacto)
│   ├── components/     # Componentes React atuais
│   ├── stores/         # Stores Zustand atuais  
│   ├── api/            # apiService.js atual
│   └── ...            # Estrutura existente preservada
│
└── src-mvvm/          # ✨ NOVO Frontend MVVM (arquitetura limpa)
    ├── models/        # 📊 Model - Dados, API e Lógica de Negócio
    ├── views/         # 🎨 View - Componentes UI Puros (sem lógica)
    ├── viewmodels/    # 🧠 ViewModel - Estado + Lógica de Apresentação
    ├── shared/        # 🛠️ Utilitários e constantes compartilhadas
    ├── App.jsx        # App principal do MVVM
    ├── main.jsx       # Entry point do MVVM
    └── index.css      # Estilos do MVVM
```

---

## ⚙️ **CONFIGURAÇÃO DO AMBIENTE DUAL**

### 📦 **Scripts de Desenvolvimento Paralelo**
```json
// package.json - Scripts adicionais
{
  "scripts": {
    "dev": "vite",                    // Frontend atual (src/)
    "dev:mvvm": "vite -c vite.mvvm.config.js",  // Frontend MVVM (src-mvvm/)
    "build": "vite build",            // Build atual
    "build:mvvm": "vite build -c vite.mvvm.config.js", // Build MVVM
    "preview": "vite preview",        // Preview atual
    "preview:mvvm": "vite preview -c vite.mvvm.config.js" // Preview MVVM
  }
}
```

### 🔧 **Configuração Vite para MVVM**
```javascript
// vite.mvvm.config.js - Nova configuração para src-mvvm
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist-mvvm',  // Build separado
    rollupOptions: {
      input: './src-mvvm/main.jsx'  // Entry point MVVM
    }
  },
  server: {
    port: 5174  // Porta diferente para desenvolvimento paralelo
  }
})
```

### 🚀 **Comandos de Desenvolvimento**
```bash
# Terminal 1 - Frontend atual
npm run dev          # Roda em http://localhost:5173

# Terminal 2 - Frontend MVVM  
npm run dev:mvvm     # Roda em http://localhost:5174

# Comparar ambos lado a lado durante desenvolvimento
```

## 🏗️ **CAMADA 1: MODEL (Dados + API + Lógica de Negócio)**

> **Responsabilidade**: Gerenciar dados, comunicação com API e regras de negócio

### 📂 Estrutura dos Models
```
src-mvvm/models/
├── entities/           # Entidades de domínio
│   ├── User.js
│   ├── Topic.js
│   ├── Keyphrase.js
│   ├── Cluster.js
│   └── Annotation.js
├── services/           # Comunicação com API
│   ├── AuthService.js
│   ├── TopicService.js
│   ├── KeyphraseService.js
│   ├── ClusterService.js
│   └── AnnotationService.js
└── repositories/       # Cache e LocalStorage
    └── DataRepository.js
```

### 🔧 **Entidades de Domínio** (baseadas no frontend e backend atual)

#### 👤 **User.js** - Entidade de Usuário
**Funções principais**:
- `canAccessTopic(topicName)` - Verifica acesso ao tópico  
- `getAssignedTopics()` - Lista tópicos atribuídos
- `isAdmin()` - Verifica se é admin
- `toAuthHeaders()` - Gera headers de autenticação

#### 📋 **Topic.js** - Entidade de Tópico  
**Funções principais**:
- `canStartAnnotation()` - Verifica se pode iniciar anotação
- `getTaskType()` - Tipo da tarefa (clustering, curation)
- `getClusterSetSize()` - Tamanho do conjunto de clusters

#### ✏️ **Keyphrase.js** - Entidade de Keyphrase
**Funções principais**:
- `isInCluster()` - Verifica se está em cluster
- `assignToCluster(clusterId)` - Atribui a cluster
- `calculateSimilarityWith(otherKeyphrase)` - Calcula similaridade 

#### 🔗 **Cluster.js** - Entidade de Cluster
**Funções principais**:
- `addKeyphrase(keyphrase)` - Adiciona keyphrase ao cluster
- `removeKeyphrase(keyphraseId)` - Remove keyphrase
- `calculateCohesion()` - Calcula coesão do cluster  
- `selectKeyphrase(order, keyphraseId)` - Seleciona keyphrases

### 🌐 **Services de API** (distribuição das APIs do apiService.js)

#### � **AuthService.js** - Autenticação (6 APIs)
```javascript
// APIs do apiService.js:
async login(username, password)           // POST /users/login
async logout()                           // GET /users/logout  
async whoami()                          // GET /users/whoami
async basicLogin()                      // GET /users/basic_login
async validatePassword(username, password) // GET /users/validate_password
async listUsers()                       // GET /users/list
```

#### 📋 **TopicService.js** - Tópicos (4 APIs)
```javascript
// APIs do apiService.js:
async listTopics(username)                      // GET /topic/{username}/list
async getAnnotationProfile(username, topic)     // GET /topic/annotation_profile/{username}/{topic}
async getAnnotationTaskOptions(username)        // GET /topic/get_annotation_task_options/{username}
async saveAnnotation(username, topic, task)     // PUT /topic/save_annotation/{username}/{topic}/{task}
```

#### ✏️ **KeyphraseService.js** - Keyphrases (4 APIs)
```javascript
// APIs do apiService.js:
async listKeyphraseClusters(username, topic)                    // GET /topic/keyphrase_clustering/{username}/{topic}
async listKeyphrasesSelection(username, topic)                  // GET /topic/keyphrases_selection/{username}/{topic}  
async listKeyphrases()                                         // GET /keyphrases/list
async getKeyphraseSortingByValue(username, keyphraseOrder)     // GET /keyphrases/get_keyphrase_sorting_by_value/{username}/{keyphraseOrder}
```

#### � **ClusterService.js** - Clusters (7 APIs)
```javascript
// APIs do apiService.js:
async listClusters(username, topic)                        // GET /topic/clusters/{username}/{topic}
async listClusterSelection(username, topic)                // GET /topic/cluster_selection/{username}/{topic}
async moveToCluster(username, topic, keyphraseId, clusterId) // PUT /topic/move_to_cluster/{username}/{topic}/{keyphrase_id}/{cluster_id}
async selectCluster(username, topic, clusterId, selected)   // PUT /topic/select_cluster/{username}/{topic}/{cluster_id}/{selected}
async selectKeyphrase(username, topic, clusterId, order, keyphraseId) // PUT /topic/select_keyphrase/{username}/{topic}/{cluster_id}/{order}/{keyphrase_id}
async getClusterSortingOptions(username)                    // GET /clusters/cluster_sorting_options/{username}
async getClusterSortingByValue(username, clusterOrder)      // GET /clusters/get_cluster_sorting_by_value/{username}/{cluster_order}
```

#### ✅ **AnnotationService.js** - Curação Final (3 APIs)
```javascript
// APIs do apiService.js:  
async listKeyphrasesAliases(username, topic)        // GET /topic/keyphrases_aliases/{username}/{topic}
async setAlias(username, topic, clusterId, alias)   // PUT /topic/set_alias/{username}/{topic}/{cluster_id}/{alias}
async listAnnotationFiles(username)                 // GET /annotation_files/{username}/list
```

---

## 🎨 **CAMADA 2: VIEW (Componentes UI Puros)**

> **Responsabilidade**: Renderizar UI e capturar eventos do usuário (sem lógica de negócio)

### 📂 Estrutura das Views
```
src-mvvm/views/
├── components/         # Componentes UI reutilizáveis
│   ├── Button.jsx
│   ├── TextField.jsx
│   ├── Dialog.jsx
│   ├── Chip.jsx
│   ├── KeyphraseItem.jsx
│   └── ClusterCard.jsx
├── layouts/            # Layouts da aplicação
│   ├── AuthLayout.jsx
│   └── MainLayout.jsx  
└── pages/              # Páginas principais (baseadas nos componentes atuais)
    ├── LoginView.jsx
    ├── TopicSelectionView.jsx
    ├── KeyphraseClusteringView.jsx
    ├── KeyphraseClustersView.jsx
    └── CuratedKeyphrasesView.jsx
```

### 🔧 **Views Principais** (baseadas nos componentes React atuais)

#### 🔐 **LoginView.jsx** (baseado em Login.jsx)
**Props recebidas**:
- `username, password, loading, error`
- `onUsernameChange, onPasswordChange, onSubmit`

#### 📋 **TopicSelectionView.jsx** (baseado em TopicSelect.jsx)
**Props recebidas**:
- `topics, selectedTopic, loading`
- `onTopicChange, onConfirm, onLogout`

#### ✏️ **KeyphraseClusteringView.jsx** (baseado em KeyphraseClustering.jsx)
**Props recebidas**:
- `keyphrases, clusters, hideClusteredState, keyphraseOrder`
- `onKeyphraseOrderChange, onHideClusteredChange, onMoveKeyphrase`

#### 🔗 **KeyphraseClustersView.jsx** (baseado em KeyphraseClusters.jsx)
**Props recebidas**:
- `clusters, selectedClusters, selectedKeyphrases, clusterOrder`
- `onClusterOrderChange, onToggleClusterSelection, onSelectKeyphrase`

#### ✅ **CuratedKeyphrasesView.jsx** (baseado em CuratedKeyphrases.jsx)
**Props recebidas**:
- `curatedKeyphrases, keyphraseAlias, curatedKeyphrasesOrder, showOnlyCurated`
- `onOrderChange, onShowOnlyCuratedChange, onUpdateAlias, onSaveAlias`

### 🎨 **Componentes Reutilizáveis**

#### **KeyphraseItem.jsx** - Item individual de keyphrase
**Props**: `keyphrase, clusterId, onMoveToCluster, dragEnabled`

#### **ClusterCard.jsx** - Card de cluster com keyphrases
**Props**: `cluster, selected, onToggleSelection, onSelectKeyphrase`

---

## 🧠 **CAMADA 3: VIEWMODEL (Estado + Lógica de Apresentação)**

> **Responsabilidade**: Gerenciar estado da UI, conectar View com Model e formatação de dados

### 📂 Estrutura dos ViewModels
```
src-mvvm/viewmodels/
├── hooks/              # Custom hooks para conectar ViewModels
│   ├── useLoginViewModel.js
│   ├── useTopicSelectionViewModel.js
│   ├── useKeyphraseClusteringViewModel.js
│   ├── useKeyphraseClustersViewModel.js
│   └── useCuratedKeyphrasesViewModel.js
└── stores/             # Stores Zustand simplificados (baseados nos atuais)
    ├── useAuthStore.js
    ├── useTopicStore.js
    └── useFlowStore.js
```

### 🔧 **ViewModels Principais** (baseados nos componentes e stores atuais)

#### 🔐 **useLoginViewModel.js** (substitui lógica do Login.jsx)
**Estado gerenciado**:
- `username, password, loading, error`

**Funções principais**:
- `handleUsernameChange(username)` - Atualiza campo username
- `handlePasswordChange(password)` - Atualiza campo password  
- `handleSubmit()` - Processa login via AuthService
- `handleLoginSuccess()` - Salva no AuthStore e navega
- `handleLoginError()` - Exibe erro na UI

#### 📋 **useTopicSelectionViewModel.js** (substitui lógica do TopicSelect.jsx)
**Estado gerenciado**:
- `topics, selectedTopic, loading`

**Funções principais**:
- `loadTopics()` - Carrega tópicos via TopicService
- `handleTopicChange(topic)` - Atualiza seleção local
- `handleConfirm()` - Confirma seleção e carrega annotation profile
- `handleLogout()` - Limpa dados e navega para login

#### ✏️ **useKeyphraseClusteringViewModel.js** (substitui lógica do KeyphraseClustering.jsx)
**Estado gerenciado**:
- `keyphraseClustering, clusters, hideClusteredState, keyphraseOrder`

**Funções principais**:
- `loadKeyphraseData()` - Carrega dados via KeyphraseService
- `handleKeyphraseOrderChange(order)` - Muda ordenação
- `handleHideClusteredChange(hide)` - Toggle para ocultar clustered
- `updateKeyphraseClustering(keyphraseId, clusterId)` - Move keyphrase
- `getFilteredKeyphrases()` - Filtra baseado em hideClusteredState
- `getSortedKeyphrases()` - Ordena baseado em keyphraseOrder

#### 🔗 **useKeyphraseClustersViewModel.js** (substitui lógica do KeyphraseClusters.jsx)
**Estado gerenciado**:
- `clusters, selectedClusters, selectedKeyphrases, clusterOrder`

**Funções principais**:
- `loadClustersData()` - Carrega dados via ClusterService
- `loadClusterSelection()` - Carrega seleções existentes
- `handleClusterOrderChange(order)` - Muda ordenação
- `toggleClusterSelection(clusterId)` - Toggle CS (0/1)
- `selectKeyphrase(clusterId, order, keyphraseId)` - Seleciona keyphrase
- `getKeyphraseChipColor(clusterId, keyphraseId)` - Calcula cor do chip

#### ✅ **useCuratedKeyphrasesViewModel.js** (substitui lógica do CuratedKeyphrases.jsx) - ✅ **CONCLUÍDO**
**Estado gerenciado**:
- `curatedKeyphrases, keyphraseAlias, curatedKeyphrasesOrder, showOnlyCurated`

**Funções principais**:
- `loadCuratedData()` - Carrega dados via AnnotationService
- `loadKeyphraseAliases()` - Carrega aliases existentes
- `countCuratedKeyphrases()` - Conta keyphrases curadas vs meta
- `handleOrderChange(order)` - Muda ordenação
- `updateAlias(clusterId, alias)` - Atualiza alias localmente
- `saveAlias(clusterId, alias)` - Salva alias via API
- `generateAutomaticLabel(clusterId)` - Gera label baseado em keyphrases

### 🗄️ **Stores Zustand Simplificados** (baseados nos atuais)

#### **useAuthStore.js** - Estado Global de Autenticação
**Estado**: `isAuthenticated, user, token, loading, error`
**Funções**: `login(), logout(), setLoading(), setError(), clearError()`

#### **useTopicStore.js** - Estado Global de Tópicos  
**Estado**: `topics, selectedTopic, annotationProfile, loading, error`
**Funções**: `setTopics(), selectTopic(), setLoading(), setError(), reset()`

#### **useFlowStore.js** - Estado Global do Fluxo
**Estado**: `currentStep, completedSteps, flowData`
**Funções**: `setCurrentStep(), markStepCompleted(), setFlowData(), reset()`

---

## 🚀 **PLANO DE IMPLEMENTAÇÃO - 3 Fases (Frontend Paralelo)**

### **PREPARAÇÃO: Setup do src-mvvm (Dia 1)**
**Objetivo**: Configurar ambiente de desenvolvimento paralelo
- [ ] Criar pasta `src-mvvm/` no projeto
- [ ] Copiar arquivos essenciais do `src/` atual:
  - [ ] `src-mvvm/App.jsx` (versão MVVM)
  - [ ] `src-mvvm/main.jsx` (entry point MVVM)
  - [ ] `src-mvvm/index.css` (estilos base)
- [ ] Configurar `vite.config.js` para suportar ambos frontends:
  ```javascript
  // Adicionar script no package.json:
  "dev:mvvm": "vite --config vite.mvvm.config.js"
  "dev:legacy": "vite --config vite.config.js"  
  ```
- [ ] Configurar roteamento independente no MVVM

### **FASE 1: Models (Semana 1)**
**Objetivo**: Criar camada de dados e APIs
- [ ] Criar estrutura: `src-mvvm/models/{entities,services,repositories}/`
- [ ] Implementar entidades: `User.js`, `Topic.js`, `Keyphrase.js`, `Cluster.js`
- [ ] Migrar APIs do `src/api/apiService.js` para 5 services:
  - [ ] `AuthService.js` (6 APIs de autenticação)
  - [ ] `TopicService.js` (4 APIs de tópicos)  
  - [ ] `KeyphraseService.js` (4 APIs de keyphrases)
  - [ ] `ClusterService.js` (7 APIs de clusters)
  - [ ] `AnnotationService.js` (3 APIs de curação)

### **FASE 2: ViewModels (Semana 2)**  
**Objetivo**: Criar lógica de apresentação
- [ ] Criar estrutura: `src-mvvm/viewmodels/{hooks,stores}/`
- [ ] Adaptar stores Zustand de `src/stores/` para MVVM (simplificados)
- [ ] Implementar 5 ViewModels baseados nos componentes `src/components/`:
  - [ ] `useLoginViewModel.js` (do `src/components/Login.jsx`)
  - [ ] `useTopicSelectionViewModel.js` (do `src/components/TopicSelect.jsx`)  
  - [ ] `useKeyphraseClusteringViewModel.js` (do `src/components/KeyphraseClustering.jsx`)
  - [ ] `useKeyphraseClustersViewModel.js` (do `src/components/KeyphraseClusters.jsx`)
  - [ ] `useCuratedKeyphrasesViewModel.js` (do `src/components/CuratedKeyphrases.jsx`)

### **FASE 3: Views (Semana 3)**
**Objetivo**: Criar UI pura e conectar tudo
- [ ] Criar estrutura: `src-mvvm/views/{components,layouts,pages}/`
- [ ] Extrair UI dos componentes `src/components/` para Views puras:
  - [ ] `LoginView.jsx` (UI pura do `Login.jsx`)
  - [ ] `TopicSelectionView.jsx` (UI pura do `TopicSelect.jsx`)
  - [ ] `KeyphraseClusteringView.jsx` (UI pura do `KeyphraseClustering.jsx`)
  - [ ] `KeyphraseClustersView.jsx` (UI pura do `KeyphraseClusters.jsx`)
  - [ ] `CuratedKeyphrasesView.jsx` (UI pura do `CuratedKeyphrases.jsx`)
- [ ] Conectar Views ↔ ViewModels ↔ Models
- [ ] Configurar `src-mvvm/App.jsx` para usar nova arquitetura
- [ ] Testes de integração completa MVVM

### **BONUS: Comparação e Migração Gradual**
**Objetivo**: Validar e migrar gradualmente
- [ ] Configurar ambiente para executar ambos frontends:
  - `npm run dev` → Frontend atual (`src/`)
  - `npm run dev:mvvm` → Frontend MVVM (`src-mvvm/`)
- [ ] Comparar performance e funcionalidades
- [ ] Documentar diferenças e melhorias
- [ ] Planejar migração definitiva para MVVM

---

## ✅ **Benefícios da Arquitetura MVVM Simplificada**

1. **🔍 Separação Clara de Responsabilidades**
   - **Model**: Dados + API + Regras de negócio
   - **View**: UI pura (sem lógica)  
   - **ViewModel**: Estado da UI + Formatação

2. **🧪 Testabilidade**
   - Models podem ser testados isoladamente
   - ViewModels podem ser testados sem UI
   - Views são componentes puros

3. **🔄 Reutilização**
   - Services podem ser reutilizados
   - Views podem ser reutilizadas com diferentes ViewModels
   - Lógica de negócio centralizada nos Models

4. **📱 Manutenibilidade**
   - Alterações na UI não afetam lógica de negócio
   - Alterações na API ficam isoladas nos Services
   - Estado da aplicação bem organizado

5. **🎯 Baseado no Código Existente**
   - Aproveita `src/api/apiService.js` atual como referência
   - Adapta stores Zustand de `src/stores/` existentes
   - **Frontend atual permanece intacto** em `src/`
   - **Frontend MVVM novo e limpo** em `src-mvvm/`
   - Migração incremental sem quebrar funcionalidades
   - Possibilidade de comparar ambas arquiteturas lado a lado