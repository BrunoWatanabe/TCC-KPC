/**
 * KeyphraseSortingModel.js - Modelo para gerenciar os 4 tipos de ordenação de keyphrases
 * Mantém versões atualizadas de todas as listagens para performance otimizada
 */
import { KeyphraseSorting, KEYPHRASE_SORTING_TYPES } from '../../shared/enums/KeyphraseSorting.js';
import { topicService } from '../services/TopicService.js';

export class KeyphraseSortingModel {
  constructor() {
    // Dados das 4 ordenações
    this.sortedKeyphrases = {
      [KeyphraseSorting.ALPHABETICAL]: [],
      [KeyphraseSorting.CLUSTER_SIMILARITY]: [],
      [KeyphraseSorting.PAIRWISE_SIMILARITY]: [],
      [KeyphraseSorting.NUMERICAL]: []
    };
    
    // Metadados
    this.username = null;
    this.topicName = null;
    this.isLoading = false;
    this.lastUpdated = null;
    this.loadingProgress = {
      [KeyphraseSorting.ALPHABETICAL]: false,
      [KeyphraseSorting.CLUSTER_SIMILARITY]: false,
      [KeyphraseSorting.PAIRWISE_SIMILARITY]: false,
      [KeyphraseSorting.NUMERICAL]: false
    };
    
  }

  /**
   * Inicializa o modelo com dados do usuário e tópico
   */
  async initialize(username, topicName) {
    
    this.username = username;
    this.topicName = topicName;
    this.isLoading = true;
    
    // Carregar todas as 4 ordenações em paralelo
    await this.loadAllSortings();
    
    this.isLoading = false;
    this.lastUpdated = new Date();
  }

  /**
   * Carrega todas as 4 ordenações em paralelo
   */
  async loadAllSortings() {
    
    const loadPromises = KEYPHRASE_SORTING_TYPES.map(async (sortingType) => {
      try {
        this.loadingProgress[sortingType] = true;
        
        const response = await topicService.listKeyphraseClusters(
          this.username, 
          this.topicName, 
          sortingType
        );
        
        // Validar formato de resposta e extrair clusters
        let keyphrases = [];
        if (response && typeof response === 'object') {
          if (Array.isArray(response)) {
            // Formato antigo: array direto
            keyphrases = response;
          } else if (response.clusters && Array.isArray(response.clusters)) {
            // Novo formato: { sorting, clusters }
            keyphrases = response.clusters;
            
            // Verificar ordenação
            if (response.sorting !== sortingType) {
              console.warn(`⚠️ Ordenação recebida (${response.sorting}) diferente da solicitada (${sortingType})`);
            }
          }
        }
        
        this.sortedKeyphrases[sortingType] = keyphrases;
        this.loadingProgress[sortingType] = false;
        
      } catch (error) {
        console.error(`❌ Erro ao carregar ordenação ${sortingType}:`, error);
        this.sortedKeyphrases[sortingType] = [];
        this.loadingProgress[sortingType] = false;
      }
    });

    await Promise.all(loadPromises);
  }

  /**
   * Atualiza todas as ordenações após uma modificação (ex: move_to_cluster)
   */
  async refreshAllSortings() {
    
    if (!this.username || !this.topicName) {
      console.warn('⚠️ Username ou topicName não definidos para refresh');
      return;
    }
    
    this.isLoading = true;
    await this.loadAllSortings();
    this.isLoading = false;
    this.lastUpdated = new Date();
    
  }

  /**
   * Obtém keyphrases de uma ordenação específica
   */
  getKeyphrasesBySorting(sortingType) {
    if (!Object.values(KeyphraseSorting).includes(sortingType)) {
      console.warn(`⚠️ Tipo de ordenação inválido: ${sortingType}`);
      return [];
    }
    
    return this.sortedKeyphrases[sortingType] || [];
  }

  /**
   * Obtém todas as ordenações
   */
  getAllSortedKeyphrases() {
    return { ...this.sortedKeyphrases };
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
   * Obtém contagem de keyphrases por ordenação
   */
  getSortingCounts() {
    return Object.fromEntries(
      Object.entries(this.sortedKeyphrases).map(([key, value]) => [key, value.length])
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
    
    this.sortedKeyphrases = {
      [KeyphraseSorting.ALPHABETICAL]: [],
      [KeyphraseSorting.CLUSTER_SIMILARITY]: [],
      [KeyphraseSorting.PAIRWISE_SIMILARITY]: [],
      [KeyphraseSorting.NUMERICAL]: []
    };
    
    this.username = null;
    this.topicName = null;
    this.isLoading = false;
    this.lastUpdated = null;
    this.loadingProgress = {
      [KeyphraseSorting.ALPHABETICAL]: false,
      [KeyphraseSorting.CLUSTER_SIMILARITY]: false,
      [KeyphraseSorting.PAIRWISE_SIMILARITY]: false,
      [KeyphraseSorting.NUMERICAL]: false
    };
  }
}

// Instância singleton para uso global
export const keyphraseSortingModel = new KeyphraseSortingModel();