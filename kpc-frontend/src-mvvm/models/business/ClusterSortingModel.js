/**
 * ClusterSortingModel.js - Modelo para gerenciar os 5 tipos de ordenação de clusters
 * Mantém versões atualizadas de todas as listagens para performance otimizada
 */
import { ClusterSorting } from '../../shared/enums/ClusterSorting.js';
import { clusterService } from '../services/ClusterService.js';

const CLUSTER_SORTING_TYPES = Object.values(ClusterSorting);

export class ClusterSortingModel {
  constructor() {
    // Dados das 5 ordenações
    this.sortedClusters = {
      [ClusterSorting.NUMERICAL]: [],
      [ClusterSorting.CLUSTER_COHESION]: [],
      [ClusterSorting.PAIRWISE_SIMILARITY]: [],
      [ClusterSorting.CENTROID_SIMILARITY]: [],
      [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: []
    };
    
    // NOVO: Armazenar cluster_ids originais para cada ordenação
    this.clusterIds = {
      [ClusterSorting.NUMERICAL]: [],
      [ClusterSorting.CLUSTER_COHESION]: [],
      [ClusterSorting.PAIRWISE_SIMILARITY]: [],
      [ClusterSorting.CENTROID_SIMILARITY]: [],
      [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: []
    };
    
    // Metadados dos clusters
    this.clustersMetaInfo = {
      [ClusterSorting.NUMERICAL]: {},
      [ClusterSorting.CLUSTER_COHESION]: {},
      [ClusterSorting.PAIRWISE_SIMILARITY]: {},
      [ClusterSorting.CENTROID_SIMILARITY]: [],
      [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: {}
    };
    
    // Metadados
    this.username = null;
    this.topicName = null;
    this.isLoading = false;
    this.lastUpdated = null;
    this.loadingProgress = {
      [ClusterSorting.NUMERICAL]: false,
      [ClusterSorting.CLUSTER_COHESION]: false,
      [ClusterSorting.PAIRWISE_SIMILARITY]: false,
      [ClusterSorting.CENTROID_SIMILARITY]: false,
      [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: false
    };
    
  }

  async initialize(username, topicName) {
    
    this.username = username;
    this.topicName = topicName;
    this.isLoading = true;
    
    await this.loadAllSortings();
    
    this.isLoading = false;
    this.lastUpdated = new Date();
  }

  async loadAllSortings() {
    
    const loadPromises = CLUSTER_SORTING_TYPES.map(async (sortingType) => {
      try {
        const url = `/topic/clusters/${encodeURIComponent(this.username)}/${encodeURIComponent(this.topicName)}/${encodeURIComponent(sortingType)}`;
        const response = await clusterService.makeRequest(url);
        
        if (!response || typeof response !== 'object') {
          throw new Error('Resposta inválida do servidor');
        }
        
        // Nova estrutura: {sorting_applied, clusters: [{cluster_id, cluster_data, cluster_selection, keyphrases_selection, keyphrases_aliases}]}
        const clustersArray = response.clusters || [];
        
        // Extrair cluster_data E cluster_id para manter mapeamento correto
        const extractedClusters = clustersArray.map(cluster => cluster.cluster_data);
        const extractedIds = clustersArray.map(cluster => cluster.cluster_id);
        
        this.sortedClusters[sortingType] = extractedClusters;
        this.clusterIds[sortingType] = extractedIds;
        this.clustersMetaInfo[sortingType] = response.clusters_meta_info || {};
        this.loadingProgress[sortingType] = false;
        
      } catch (error) {
        console.error(`Erro ao carregar ordenação ${sortingType}:`, error);
        this.sortedClusters[sortingType] = [];
        this.clustersMetaInfo[sortingType] = {};
        this.loadingProgress[sortingType] = false;
      }
    });

    await Promise.all(loadPromises);
  }

  async refreshAllSortings() {
    
    if (!this.username || !this.topicName) {
      console.warn('Username ou topicName não definido para refresh');
      return;
    }
    
    this.isLoading = true;
    await this.loadAllSortings();
    this.isLoading = false;
    this.lastUpdated = new Date();
    
  }

  getClustersBySorting(sortingType) {
    if (!Object.values(ClusterSorting).includes(sortingType)) {
      console.warn(`Tipo de ordenação inválido: ${sortingType}`);
      return {};
    }
    
    const clustersArray = this.sortedClusters[sortingType] || [];
    const idsArray = this.clusterIds[sortingType] || [];
    
    // SOLUÇÃO: Criar um objeto onde as chaves mantêm a ordem de iteração
    // Importante: Object.entries() retorna na ordem de criação
    const clustersObject = {};
    
    // Iterar na ordem do array (ordem do backend)
    for (let index = 0; index < clustersArray.length; index++) {
      const clusterData = clustersArray[index];
      const clusterId = idsArray[index] || (index + 1);
      
      // Adicionar metadado de ordem para uso posterior
      clustersObject[clusterId] = clusterData;
    }
    
    return clustersObject;
  }

  getClusterMetaInfo(sortingType) {
    if (!Object.values(ClusterSorting).includes(sortingType)) {
      console.warn(`Tipo de ordenação inválido: ${sortingType}`);
      return {};
    }
    
    return this.clustersMetaInfo[sortingType] || {};
  }

  /**
   * NOVO: Retorna array de cluster IDs na ordem correta do backend
   */
  getClusterIdsInOrder(sortingType) {
    if (!Object.values(ClusterSorting).includes(sortingType)) {
      console.warn(`Tipo de ordenação inválido: ${sortingType}`);
      return [];
    }
    
    return this.clusterIds[sortingType] || [];
  }

  getAllSortedClusters() {
    return { ...this.sortedClusters };
  }

  isSortingLoading(sortingType) {
    return this.loadingProgress[sortingType] || false;
  }

  isAnySortingLoading() {
    return Object.values(this.loadingProgress).some(loading => loading);
  }

  getSortingCounts() {
    return Object.fromEntries(
      Object.entries(this.sortedClusters).map(([key, value]) => [key, value.length])
    );
  }

  getStats() {
    return {
      username: this.username,
      topicName: this.topicName,
      isLoading: this.isLoading,
      lastUpdated: this.lastUpdated,
      sortingCounts: this.getSortingCounts(),
      loadingProgress: { ...this.loadingProgress }
    };
  }

  clear() {
    
    this.sortedClusters = {
      [ClusterSorting.NUMERICAL]: [],
      [ClusterSorting.CLUSTER_COHESION]: [],
      [ClusterSorting.PAIRWISE_SIMILARITY]: [],
      [ClusterSorting.CENTROID_SIMILARITY]: [],
      [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: []
    };
    
    this.clusterIds = {
      [ClusterSorting.NUMERICAL]: [],
      [ClusterSorting.CLUSTER_COHESION]: [],
      [ClusterSorting.PAIRWISE_SIMILARITY]: [],
      [ClusterSorting.CENTROID_SIMILARITY]: [],
      [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: []
    };
    
    this.clustersMetaInfo = {
      [ClusterSorting.NUMERICAL]: {},
      [ClusterSorting.CLUSTER_COHESION]: {},
      [ClusterSorting.PAIRWISE_SIMILARITY]: {},
      [ClusterSorting.CENTROID_SIMILARITY]: {},
      [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: {}
    };
    
    this.username = null;
    this.topicName = null;
    this.isLoading = false;
    this.lastUpdated = null;
    this.loadingProgress = {
      [ClusterSorting.NUMERICAL]: false,
      [ClusterSorting.CLUSTER_COHESION]: false,
      [ClusterSorting.PAIRWISE_SIMILARITY]: false,
      [ClusterSorting.CENTROID_SIMILARITY]: false,
      [ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS]: false
    };
  }
}

export const clusterSortingModel = new ClusterSortingModel();
