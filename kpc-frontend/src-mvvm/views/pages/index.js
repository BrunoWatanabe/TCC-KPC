/**
 * Barrel export para todas as páginas/views do MVVM
 * 
 * Este arquivo centraliza as exportações das 5 páginas principais do fluxo,
 * facilitando a importação em outros módulos.
 */

// ============================================================================
// PÁGINAS PRINCIPAIS DO FLUXO SEQUENCIAL
// ============================================================================

// 1. Autenticação
export { default as LoginView } from './LoginView.jsx';

// 2. Seleção de tópico
export { default as TopicSelectionView } from './TopicSelectionView.jsx';

// 3. Clustering de keyphrases
export { default as KeyphraseClusteringView } from './KeyphraseClusteringView.jsx';

// 4. Seleção de clusters
export { default as KeyphraseClustersView } from './KeyphraseClustersView.jsx';

// 5. Curação final de keyphrases
export { default as CuratedKeyphrasesView } from './CuratedKeyphrasesView.jsx';

// ============================================================================
// METADADOS PARA DOCUMENTAÇÃO
// ============================================================================

export const PAGES_INFO = {
  LoginView: { 
    step: 1,
    type: 'auth', 
    route: '/login',
    description: 'Authentication page with JWT token-based login'
  },
  TopicSelectionView: { 
    step: 2,
    type: 'selection', 
    route: '/topic-selection',
    description: 'Topic selection for annotation workflow'
  },
  KeyphraseClusteringView: { 
    step: 3,
    type: 'workflow', 
    route: '/keyphrase-clustering',
    description: 'Keyphrase clustering interface'
  },
  KeyphraseClustersView: { 
    step: 4,
    type: 'workflow', 
    route: '/keyphrase-clusters',
    description: 'Cluster selection and management'
  },
  CuratedKeyphrasesView: { 
    step: 5,
    type: 'workflow', 
    route: '/curated-keyphrases',
    description: 'Final keyphrase curation and labeling'
  }
};

export const PAGES_SUMMARY = {
  version: '1.0.0',
  description: 'MVVM Pages for Keyphrase Curation Application - Sequential Flow',
  totalPages: 5,
  sequentialFlow: [
    'LoginView',
    'TopicSelectionView',
    'KeyphraseClusteringView',
    'KeyphraseClustersView',
    'CuratedKeyphrasesView'
  ],
  lastUpdated: new Date().toISOString()
};