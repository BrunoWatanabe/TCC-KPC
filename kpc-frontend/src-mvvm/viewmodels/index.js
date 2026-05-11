/**
 * ViewModels Index - Exporta todos os ViewModels do sistema MVVM
 * 
 * Este arquivo centraliza a exportação de todos os stores e hooks de ViewModels,
 * facilitando a importação nas Views e mantendo a organização da arquitetura MVVM.
 * 
 * Estrutura:
 * - Stores: Zustand stores para gerenciamento de estado global
 * - Hooks: Custom hooks para lógica de apresentação
 */

// ============================================================================
// STORES - Gerenciamento de Estado Global
// ============================================================================

// Store de autenticação e usuário
export { useAuthStore } from './stores/useAuthStore.js';

// Store de tópicos
export { useTopicStore } from './stores/useTopicStore.js';

// Store de fluxo da aplicação
export { useFlowStore } from './stores/useFlowStore.js';

// ============================================================================
// HOOKS - Lógica de Apresentação (Fluxo Sequencial)
// ============================================================================

// 1. Login e autenticação
export { useLoginViewModel } from './hooks/useLoginViewModel.js';

// 2. Seleção de tópico
export { useTopicSelectionViewModel } from './hooks/useTopicSelectionViewModel.js';

// 3. Curação (etapa 1) - Clustering + Clusters
// ViewModels individuais
export { useKeyphraseClusteringViewModel } from './hooks/useKeyphraseClusteringViewModel.js';
export { useKeyphraseClustersViewModel } from './hooks/useKeyphraseClustersViewModel.js';

// 5. Curação final de keyphrases
export { useCuratedKeyphrasesViewModel } from './hooks/useCuratedKeyphrasesViewModel.js';

// ============================================================================
// UTILITÁRIOS (Para exportações futuras)
// ============================================================================

/**
 * Função utilitária para verificar se todos os stores estão inicializados
 * Útil para debugging e testes
 */
export const checkStoresInitialized = () => {
  try {
    // Verificar se os stores foram importados corretamente
    if (typeof useAuthStore !== 'function') {
      console.warn('useAuthStore não está disponível');
      return { auth: false, topic: false, flow: false, allInitialized: false };
    }
    
    const authStore = useAuthStore.getState();
    const topicStore = useTopicStore.getState();  
    const flowStore = useFlowStore.getState();
    
    return {
      auth: !!authStore,
      topic: !!topicStore,
      flow: !!flowStore,
      allInitialized: !!(authStore && topicStore && flowStore)
    };
  } catch (error) {
    console.error('Erro ao verificar inicialização dos stores:', error);
    return {
      auth: false,
      topic: false,
      flow: false,
      allInitialized: false,
      error: error.message
    };
  }
};

/**
 * Função utilitária para reset completo do estado (útil para testes)
 * CUIDADO: Esta função apaga todos os dados dos stores!
 */
export const resetAllStores = () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('resetAllStores só deve ser usado em desenvolvimento');
    return;
  }
  
  try {
    // Reset individual de cada store
    useAuthStore.getState().logout();
    useTopicStore.getState().clearTopic();
    useFlowStore.getState().resetFlow();
    
  } catch (error) {
    console.error('❌ Erro ao resetar stores:', error);
  }
};

// ============================================================================
// METADATA DO MÓDULO
// ============================================================================

/**
 * Informações sobre o módulo ViewModels
 */
export const VIEWMODELS_INFO = {
  version: '1.0.0',
  description: 'ViewModels layer for MVVM architecture',
  stores: [
    'useAuthStore',
    'useTopicStore', 
    'useFlowStore'
  ],
  hooks: [
    'useLoginViewModel',
    'useTopicSelectionViewModel',
    'useKeyphraseClusteringViewModel',
    'useKeyphraseClustersViewModel',
    'useCuratedKeyphrasesViewModel'
  ],
  totalExports: 8, // 3 stores + 5 hooks
  lastUpdated: new Date().toISOString()
};

// ============================================================================
// VALIDAÇÃO (apenas em desenvolvimento)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  
  // Nota: checkStoresInitialized() pode ser chamada manualmente quando necessário
  // Evitamos chamar automaticamente para prevenir erros durante inicialização
}