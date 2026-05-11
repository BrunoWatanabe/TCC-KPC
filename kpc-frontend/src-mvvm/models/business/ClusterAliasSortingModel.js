/**
 * ClusterAliasSortingModel.js - Modelo para gerenciar os 2 tipos de ordenação de aliases
 * Mantém versões atualizadas de todas as listagens para CuratedKeyphrases
 */
import { clusterService } from '../services/ClusterService.js';

// Enum para tipos de ordenação de aliases
export const ClusterAliasSorting = {
  ALPHABETICAL: 'alphabetical_cluster_alias',
  NUMERICAL: 'numerical_cluster_alias'
};

const ALIAS_SORTING_TYPES = Object.values(ClusterAliasSorting);

export class ClusterAliasSortingModel {
  constructor() {
    // Dados das 2 ordenações de aliases
    this.sortedAliases = {
      [ClusterAliasSorting.ALPHABETICAL]: [],
      [ClusterAliasSorting.NUMERICAL]: []
    };
    
    // Metadados
    this.username = null;
    this.topicName = null;
    this.isLoading = false;
    this.lastUpdated = null;
    this.loadingProgress = {
      [ClusterAliasSorting.ALPHABETICAL]: false,
      [ClusterAliasSorting.NUMERICAL]: false
    };
    
  }

  /**
   * Inicializa o modelo com dados do usuário e tópico
   */
  async initialize(username, topicName) {
    
    this.username = username;
    this.topicName = topicName;
    this.isLoading = true;
    
    await this.loadAllSortings();
    
    this.isLoading = false;
    this.lastUpdated = new Date();
  }

  /**
   * Carrega todas as ordenações de aliases em paralelo
   * Backend retorna: {sorting_applied, clusters: [{cluster_id, cluster_data, keyphrases_aliases: {default, alias}}]}
   */
  async loadAllSortings() {
    
    const loadPromises = ALIAS_SORTING_TYPES.map(async (sortingType) => {
      try {
        // Endpoint: /topic/clusters/{username}/{topic}/{cluster_order}
        const url = `/topic/clusters/${encodeURIComponent(this.username)}/${encodeURIComponent(this.topicName)}/${encodeURIComponent(sortingType)}`;
        const response = await clusterService.makeRequest(url);
        
        if (!response || typeof response !== 'object') {
          throw new Error('Resposta inválida do servidor');
        }
        
        // Nova estrutura completa do backend
        const clustersArray = response.clusters || [];
        
        // Extrair dados relevantes para CuratedKeyphrases:
        // - cluster_id
        // - cluster_data (para exibir nome e keyphrases)
        // - cluster_selection ("0" ou "1")
        // - keyphrases_selection ([id1, id2, "keyphrase1", "keyphrase2"])
        // - keyphrases_aliases ({default: "...", alias: "..."})
        const aliasesData = clustersArray.map(cluster => ({
          clusterId: cluster.cluster_id,
          clusterName: cluster.cluster_data[0],           // "Cluster 1"
          keyphrases: cluster.cluster_data[1],            // ["Keyphrase1(1)", ...]
          cluster_selection: cluster.cluster_selection,   // "0" ou "1"
          keyphrases_selection: cluster.keyphrases_selection, // [id1, id2, "kp1", "kp2"]
          keyphrases_aliases: cluster.keyphrases_aliases  // {default: "...", alias: "..."}
        }));
        
        this.sortedAliases[sortingType] = aliasesData;
        this.loadingProgress[sortingType] = false;
        
      } catch (error) {
        console.error(`Erro ao carregar ordenação de aliases ${sortingType}:`, error);
        this.sortedAliases[sortingType] = [];
        this.loadingProgress[sortingType] = false;
      }
    });

    await Promise.all(loadPromises);
  }

  /**
   * Atualiza todas as ordenações após uma modificação
   */
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

  /**
   * Obtém aliases de uma ordenação específica
   * Retorna array de {clusterId, clusterName, keyphrases, aliases}
   */
  getAliasesBySorting(sortingType) {
    if (!Object.values(ClusterAliasSorting).includes(sortingType)) {
      console.warn(`Tipo de ordenação de aliases inválido: ${sortingType}`);
      return [];
    }
    
    return this.sortedAliases[sortingType] || [];
  }

  /**
   * Obtém aliases formatados como objeto {clusterId: {default, alias}}
   * Para compatibilidade com código existente
   */
  getAliasesAsObject(sortingType) {
    const aliasesArray = this.getAliasesBySorting(sortingType);
    
    const aliasesObject = {};
    aliasesArray.forEach(item => {
      aliasesObject[item.clusterId] = item.aliases;
    });
    
    return aliasesObject;
  }

  /**
   * NOVO: Retorna array de cluster IDs na ordem correta do backend
   */
  getClusterIdsInOrder(sortingType) {
    const aliasesArray = this.getAliasesBySorting(sortingType);
    return aliasesArray.map(item => item.clusterId);
  }

  /**
   * Obtém todas as ordenações
   */
  getAllSortedAliases() {
    return { ...this.sortedAliases };
  }

  /**
   * Verifica se uma ordenação específica está carregando
   */
  isSortingLoading(sortingType) {
    return this.loadingProgress[sortingType] || false;
  }

  /**
   * Verifica se alguma ordenação está carregando
   */
  isAnySortingLoading() {
    return Object.values(this.loadingProgress).some(loading => loading);
  }

  /**
   * Obtém contagem de aliases por ordenação
   */
  getSortingCounts() {
    return Object.fromEntries(
      Object.entries(this.sortedAliases).map(([key, value]) => [key, value.length])
    );
  }

  /**
   * Obtém estatísticas do modelo
   */
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

  /**
   * Limpa todos os dados
   */
  clear() {
    
    this.sortedAliases = {
      [ClusterAliasSorting.ALPHABETICAL]: [],
      [ClusterAliasSorting.NUMERICAL]: []
    };
    
    this.username = null;
    this.topicName = null;
    this.isLoading = false;
    this.lastUpdated = null;
    this.loadingProgress = {
      [ClusterAliasSorting.ALPHABETICAL]: false,
      [ClusterAliasSorting.NUMERICAL]: false
    };
  }
}

// Instância singleton para uso global
export const clusterAliasSortingModel = new ClusterAliasSortingModel();
