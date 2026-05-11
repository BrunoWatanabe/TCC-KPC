/**
 * Views Index - Exporta todas as Views MVVM
 * 
 * Este arquivo centraliza a exportação de todas as Views (páginas e componentes),
 * facilitando a importação e mantendo a organização da arquitetura MVVM.
 */

// ============================================================================
// LAYOUTS
// ============================================================================

// Exportar layouts para facilitar importação
export * from './layouts/index.js';

// ============================================================================
// COMPONENTES REUTILIZÁVEIS
// ============================================================================

// Exportar componentes para facilitar importação
export * from './components/index.js';

// ============================================================================
// PÁGINAS PRINCIPAIS - FLUXO SEQUENCIAL
// ============================================================================

// 1. Página de login
export { default as LoginView } from './pages/LoginView.jsx';

// 2. Página de seleção de tópico
export { default as TopicSelectionView } from './pages/TopicSelectionView.jsx';

// 3. Componentes de Curação
export { default as KeyphraseClusteringView } from './pages/KeyphraseClusteringView.jsx';
export { default as KeyphraseClustersView } from './pages/KeyphraseClustersView.jsx';

// 5. Página de curação final
export { default as CuratedKeyphrasesView } from './pages/CuratedKeyphrasesView.jsx';

// ============================================================================
// METADATA DO MÓDULO
// ============================================================================

/**
 * Informações sobre o módulo Views
 */
export const VIEWS_INFO = {
  version: '1.0.0',
  description: 'Views layer for MVVM architecture - Pure UI components',
  layouts: [
    'AuthLayout',
    'MainLayout'
  ],
  components: [
    'Button',
    'TextField',
    'Chip',
    'Dialog',
    'KeyphraseItem',
    'ClusterCard'
  ],
  pages: [
    'LoginView',
    'TopicSelectionView',
    'KeyphraseClusteringView',
    'KeyphraseClustersView',
    'CuratedKeyphrasesView'
  ],
  totalViews: 12, // 2 layouts + 6 components + 4 pages
  lastUpdated: new Date().toISOString()
};

// ============================================================================
// VALIDAÇÃO (apenas em desenvolvimento)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
}