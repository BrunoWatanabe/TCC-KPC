/**
 * useSyncStore.js - Store para sincronização global de dados
 * 
 * Este store gerencia a sincronização entre todos os componentes quando
 * qualquer operação de backend é realizada. Quando uma das seguintes APIs
 * é chamada, TODAS as telas devem ser atualizadas:
 * 
 * - /topic/move_to_cluster_and_save_annotation/
 * - /topic/select_cluster_and_save_annotation/
 * - /topic/select_keyphrase_and_save_annotation/
 * - /topic/set_alias_and_save_annotation/
 * 
 * Isso é necessário porque mudanças no backend recalculam clusters,
 * ordenações e afetam dados de todas as telas simultaneamente.
 */

import { create } from 'zustand';

const useSyncStore = create((set, get) => ({
  // ============================================================================
  // ESTADO
  // ============================================================================
  
  // Contador de sincronização - incrementado a cada mudança no backend
  syncCounter: 0,
  
  // Timestamp da última sincronização
  lastSync: null,
  
  // Callbacks registrados por cada ViewModel
  listeners: {
    clustering: null,    // useKeyphraseClusteringViewModel
    clusters: null,      // useKeyphraseClustersViewModel
    curated: null        // useCuratedKeyphrasesViewModel
  },
  
  // ============================================================================
  // AÇÕES - REGISTRO DE LISTENERS
  // ============================================================================
  
  /**
   * Registra um callback para ser chamado quando houver sincronização
   * @param {string} key - Identificador do listener ('clustering', 'clusters', 'curated')
   * @param {Function} callback - Função a ser chamada na sincronização
   */
  registerListener: (key, callback) => {
    set(state => ({
      listeners: {
        ...state.listeners,
        [key]: callback
      }
    }));
  },
  
  /**
   * Remove um callback registrado
   * @param {string} key - Identificador do listener a remover
   */
  unregisterListener: (key) => {
    set(state => ({
      listeners: {
        ...state.listeners,
        [key]: null
      }
    }));
  },
  
  // ============================================================================
  // AÇÕES - TRIGGER DE SINCRONIZAÇÃO
  // ============================================================================
  
  /**
   * Dispara sincronização global - notifica TODOS os listeners registrados
   * Deve ser chamado após qualquer operação que modifique dados no backend
   * 
   * @param {string} source - Origem da mudança ('clustering', 'clusters', 'curated')
   * @param {string} operation - Nome da operação realizada
   * @param {Object} data - Dados adicionais sobre a operação
   */
  triggerSync: (source, operation, data = {}) => {
    const state = get();
    const timestamp = new Date().toISOString();
    
    // Incrementa contador de sincronização
    set({
      syncCounter: state.syncCounter + 1,
      lastSync: timestamp
    });
    
    // Notifica TODOS os listeners (exceto o source para evitar loop)
    Object.entries(state.listeners).forEach(([key, callback]) => {
      if (callback && typeof callback === 'function') {
        // Notifica mesmo se for o source - ele pode precisar atualizar também
        try {
          callback({
            source,
            operation,
            data,
            timestamp,
            syncCounter: state.syncCounter + 1
          });
        } catch (error) {
          console.error(`  ❌ Erro ao notificar ${key}:`, error);
        }
      }
    });
    
  },
  
  // ============================================================================
  // HELPERS
  // ============================================================================
  
  /**
   * Retorna informações sobre o estado atual da sincronização
   */
  getSyncInfo: () => {
    const state = get();
    return {
      syncCounter: state.syncCounter,
      lastSync: state.lastSync,
      activeListeners: Object.entries(state.listeners)
        .filter(([_, callback]) => callback !== null)
        .map(([key]) => key)
    };
  },
  
  /**
   * Reset do store (útil para testes ou logout)
   */
  reset: () => {
    set({
      syncCounter: 0,
      lastSync: null,
      listeners: {
        clustering: null,
        clusters: null,
        curated: null
      }
    });
  }
}));

export default useSyncStore;
