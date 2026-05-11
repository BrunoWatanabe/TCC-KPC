export const ClusterSorting = {
    NUMERICAL: 'numerical',
    CLUSTER_COHESION: 'cluster_cohesion',
    PAIRWISE_SIMILARITY: 'pairwise_similarity',
    CENTROID_SIMILARITY: 'centroid_similarity',
    CLUES_FROM_OTHER_ANNOTATORS: 'clues_from_other_annotators'
};

export const ClusterSortingLabels = {
    [ClusterSorting.NUMERICAL]: 'Numérica',
    [ClusterSorting.CLUSTER_COHESION]: 'Coesão do Cluster',
    [ClusterSorting.PAIRWISE_SIMILARITY]: 'Similaridade Par a Par',
    [ClusterSorting.CENTROID_SIMILARITY]: 'Similaridade do Centroide',
    [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: 'Dicas de Outros Anotadores'
};

export default ClusterSorting;