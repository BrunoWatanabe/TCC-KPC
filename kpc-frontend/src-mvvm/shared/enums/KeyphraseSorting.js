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
  KeyphraseSorting.CLUSTER_SIMILARITY,
  KeyphraseSorting.PAIRWISE_SIMILARITY,
  KeyphraseSorting.NUMERICAL
];

/**
 * Labels legíveis para cada tipo de ordenação
 */
export const KEYPHRASE_SORTING_LABELS = {
  [KeyphraseSorting.ALPHABETICAL]: 'Alfabética',
  [KeyphraseSorting.CLUSTER_SIMILARITY]: 'Similaridade de Cluster',
  [KeyphraseSorting.PAIRWISE_SIMILARITY]: 'Similaridade Par a Par',
  [KeyphraseSorting.NUMERICAL]: 'Numérica'
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