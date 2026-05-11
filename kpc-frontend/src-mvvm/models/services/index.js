/**
 * Services Index - Exporta todos os Services do MVVM
 * 
 * Este arquivo centraliza a exportação de todos os Services (camada Model),
 * facilitando a importação e mantendo a organização da arquitetura MVVM.
 */

// ============================================================================
// SERVICES DE DOMÍNIO
// ============================================================================

// Serviço de autenticação
export { AuthService, authService } from './AuthService.js';

// Serviço de tópicos
export { TopicService, topicService } from './TopicService.js';

// Serviço de clusters
export { ClusterService, clusterService } from './ClusterService.js';

// Serviço de keyphrases
export { KeyphraseService, keyphraseService } from './KeyphraseService.js';

// Serviço de anotações
export { AnnotationService, annotationService } from './AnnotationService.js';

// ============================================================================
// METADATA DO MÓDULO
// ============================================================================

/**
 * Informações sobre o módulo Services
 */
export const SERVICES_INFO = {
  version: '1.0.0',
  description: 'Services layer for MVVM architecture - Business logic and API calls',
  services: [
    'AuthService',
    'TopicService', 
    'ClusterService',
    'KeyphraseService',
    'AnnotationService'
  ],
  totalServices: 5,
  lastUpdated: new Date().toISOString()
};

// ============================================================================
// VALIDAÇÃO (apenas em desenvolvimento)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
}