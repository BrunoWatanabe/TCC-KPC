/**
 * Index para exportar todos os models (entities + services)
 * Facilita a importação no resto da aplicação MVVM
 */

// ============================================================================
// ENTITIES - Entidades de negócio
// ============================================================================
export { User } from './entities/User.js';
export { Topic } from './entities/Topic.js';
export { Keyphrase } from './entities/Keyphrase.js';
export { Cluster } from './entities/Cluster.js';

// ============================================================================
// SERVICES - Serviços de dados e APIs
// ============================================================================
export { AuthService, authService } from './services/AuthService.js';
export { TopicService, topicService } from './services/TopicService.js';
export { KeyphraseService, keyphraseService } from './services/KeyphraseService.js';
export { ClusterService, clusterService } from './services/ClusterService.js';
export { AnnotationService, annotationService } from './services/AnnotationService.js';

// ============================================================================
// BUSINESS MODELS - Modelos de negócio específicos
// ============================================================================
export { KeyphraseSortingModel, keyphraseSortingModel, KeyphraseSorting } from './business/KeyphraseSortingModel.js';
export { clusterSortingModel, ClusterSorting } from './business/ClusterSortingModel.js';
export { clusterAliasSortingModel, ClusterAliasSorting } from './business/ClusterAliasSortingModel.js';
export { clusterDataModel } from './business/ClusterDataModel.js';

// ============================================================================
// CONVENIÊNCIA - Exports agrupados para facilitar importação
// ============================================================================

// Todas as entidades
export const entities = {
  User,
  Topic, 
  Keyphrase,
  Cluster
};

// Todas as instâncias de serviços (singletons)
export const services = {
  auth: authService,
  topic: topicService,
  keyphrase: keyphraseService,
  cluster: clusterService,
  annotation: annotationService
};

// Modelos de negócio (singletons)
export const businessModels = {
  keyphraseSorting: keyphraseSortingModel,
  clusterSorting: clusterSortingModel,
  clusterAliasSorting: clusterAliasSortingModel,
  clusterData: clusterDataModel
};

// Todas as classes de serviços
export const serviceClasses = {
  AuthService,
  TopicService,
  KeyphraseService,
  ClusterService,
  AnnotationService
};