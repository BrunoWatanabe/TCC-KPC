/**
 * ClusterDataModel.js - Modelo para gerenciar dados completos de clusters
 * Processa a resposta completa da API /topic/clusters incluindo selections e aliases
 */
import { clusterService } from '../services/ClusterService.js';

export class ClusterDataModel {
  constructor() {
    this.username = null;
    this.topicName = null;
    this.currentSorting = null;
    
    // Dados completos do último carregamento
    this.clusters = [];           // Array completo de {cluster_id, cluster_data, cluster_selection, keyphrases_selection, keyphrases_aliases}
    this.sortingApplied = null;   // Ex: "numerical"
    this.clustersMetaInfo = {};
    
  }

  /**
   * Carrega dados completos de clusters com sorting específico
   * Retorna TODOS os dados: cluster_data, cluster_selection, keyphrases_selection, keyphrases_aliases
   */
  async loadCompleteData(username, topicName, sorting) {
    
    this.username = username;
    this.topicName = topicName;
    this.currentSorting = sorting;
    
    try {
      const url = `/topic/clusters/${encodeURIComponent(username)}/${encodeURIComponent(topicName)}/${encodeURIComponent(sorting)}`;
      const response = await clusterService.makeRequest(url);
      
      if (!response || typeof response !== 'object') {
        throw new Error('Resposta inválida do servidor');
      }
      
      // Armazenar resposta completa
      this.clusters = response.clusters || [];
      this.sortingApplied = response.sorting_applied;
      this.clustersMetaInfo = response.clusters_meta_info || {};
      
      return {
        clusters: this.clusters,
        sortingApplied: this.sortingApplied,
        clustersMetaInfo: this.clustersMetaInfo
      };
      
    } catch (error) {
      console.error('Erro ao carregar dados completos:', error);
      this.clusters = [];
      this.sortingApplied = null;
      this.clustersMetaInfo = {};
      throw error;
    }
  }

  /**
   * Extrai apenas cluster_data (para KeyphraseClustering)
   * Retorna: {clusterId: ["Cluster X", [keyphrases]]}
   */
  getClusterDataOnly() {
    const result = {};
    this.clusters.forEach(cluster => {
      result[cluster.cluster_id] = cluster.cluster_data;
    });
    return result;
  }

  /**
   * Extrai cluster_selection (para KeyphraseClusters - CS)
   * Retorna: {clusterId: "0"|"1"}
   */
  getClusterSelections() {
    const result = {};
    this.clusters.forEach(cluster => {
      result[cluster.cluster_id] = cluster.cluster_selection;
    });
    return result;
  }

  /**
   * Extrai keyphrases_selection (para KeyphraseClusters - S1 e S2)
   * Retorna: {clusterId: {selected1: id, selected2: id, keyphrase1: label, keyphrase2: label}}
   * keyphrases_selection format: [id1, id2, label1, label2]
   */
  getKeyphrasesSelections() {
    const result = {};
    this.clusters.forEach(cluster => {
      const selection = cluster.keyphrases_selection;
      
      if (!selection || !Array.isArray(selection) || selection.length < 4) {
        console.warn('⚠️ Formato inválido de keyphrases_selection:', selection);
        result[cluster.cluster_id] = {
          selected1: 0,
          selected2: 0,
          keyphrase1: '',
          keyphrase2: ''
        };
        return;
      }
      
      const [id1, id2, label1, label2] = selection;
      result[cluster.cluster_id] = {
        selected1: id1,
        selected2: id2,
        keyphrase1: label1,
        keyphrase2: label2
      };
    });
    
    return result;
  }

  /**
   * Extrai keyphrases_aliases (para CuratedKeyphrases)
   * Retorna: {clusterId: {default: "...", alias: "..."}}
   */
  getKeyphrasesAliases() {
    const result = {};
    this.clusters.forEach(cluster => {
      result[cluster.cluster_id] = cluster.keyphrases_aliases;
    });
    return result;
  }

  /**
   * Obtém dados completos de um cluster específico
   */
  getClusterById(clusterId) {
    return this.clusters.find(c => c.cluster_id === clusterId);
  }

  /**
   * Obtém estatísticas
   */
  getStats() {
    return {
      username: this.username,
      topicName: this.topicName,
      currentSorting: this.currentSorting,
      sortingApplied: this.sortingApplied,
      totalClusters: this.clusters.length,
      clustersWithData: this.clusters.filter(c => c.cluster_data[1].length > 0).length,
      selectedClusters: this.clusters.filter(c => c.cluster_selection === "1").length
    };
  }

  /**
   * Limpa dados
   */
  clear() {
    this.clusters = [];
    this.sortingApplied = null;
    this.clustersMetaInfo = {};
    this.username = null;
    this.topicName = null;
    this.currentSorting = null;
  }
}

// Instância singleton
export const clusterDataModel = new ClusterDataModel();
