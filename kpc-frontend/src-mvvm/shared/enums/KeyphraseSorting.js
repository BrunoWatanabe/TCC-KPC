/**
 * KeyphraseSorting.js - Enum para tipos de ordenação de keyphrases
 * Ponto central para definir os tipos de ordenação disponíveis
 */

/**
 * Enum com os tipos de ordenação de keyphrases disponíveis
 */
export const KeyphraseSorting = {
  ALPHABETICAL: 'alphabetical',
  CLUSTER_SIMILARITY: 'cluster_similarity', 
  PAIRWISE_SIMILARITY: 'pairwise_similarity',
  NUMERICAL: 'numerical'
};

/**
 * Lista ordenada dos tipos de sorting para iteração
 */
export const KEYPHRASE_SORTING_TYPES = [
  KeyphraseSorting.ALPHABETICAL,
  KeyphraseSorting.NUMERICAL,
  KeyphraseSorting.CLUSTER_SIMILARITY,
  KeyphraseSorting.PAIRWISE_SIMILARITY
];

/**
 * Labels legíveis para cada tipo de ordenação
 */
export const KEYPHRASE_SORTING_LABELS = {
  [KeyphraseSorting.ALPHABETICAL]: 'Alfabética',
  [KeyphraseSorting.NUMERICAL]: 'Numérica',
  [KeyphraseSorting.CLUSTER_SIMILARITY]: 'Similaridade de Cluster',
  [KeyphraseSorting.PAIRWISE_SIMILARITY]: 'Similaridade Par a Par',
};

/**
 * Validador para verificar se um tipo de sorting é válido
 */
export const isValidKeyphraseSorting = (sorting) => {
  return Object.values(KeyphraseSorting).includes(sorting);
};

/**
 * Obter o tipo de sorting padrão
 */
export const getDefaultKeyphraseSorting = () => {
  return KeyphraseSorting.ALPHABETICAL;
};

/**
 * Alias PascalCase seguindo padrão ClusterSortingLabels
 * @see ClusterSortingLabels em ClusterSorting.js
 * T006 — Sprint 03: Padronização de labels para o select de ordenação
 */
export const KeyphraseSortingLabels = KEYPHRASE_SORTING_LABELS;