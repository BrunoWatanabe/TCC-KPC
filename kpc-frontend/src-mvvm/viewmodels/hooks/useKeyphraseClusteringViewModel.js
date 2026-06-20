/**
 * useKeyphraseClusteringViewModel - Hook customizado para clustering de keyphrases
 * Baseado no componente src/components/KeyphraseClustering.jsx
 * Separa lógica de apresentação da UI pura
 * NOVA FUNCIONALIDADE: Gerenciamento de múltiplas ordenações de keyphrases
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useTopicStore } from '../stores/useTopicStore.js';
import { useFlowStore } from '../stores/useFlowStore.js';
import useSyncStore from '../stores/useSyncStore.js';
import { keyphraseService } from '../../models/services/KeyphraseService.js';
import { topicService } from '../../models/services/TopicService.js';
import { clusterService } from '../../models/services/ClusterService.js';
import { keyphraseSortingModel } from '../../models/business/KeyphraseSortingModel.js';
import { KeyphraseSorting, getDefaultKeyphraseSorting } from '../../shared/enums/KeyphraseSorting.js';
import { Keyphrase } from '../../models/entities/Keyphrase.js';

export const useKeyphraseClusteringViewModel = () => {
  // ============================================================================
  // ESTADO LOCAL DO COMPONENTE
  // ============================================================================
  const [keyphraseClustering, setKeyphraseClustering] = useState({});
  const [clusters, setClusters] = useState({});
  
  // NOVO: Estado para ordenação de keyphrases
  const [currentSorting, setCurrentSorting] = useState(getDefaultKeyphraseSorting());
  const [sortingStats, setSortingStats] = useState({});
  const [hideClusteredState, setHideClusteredState] = useState(false);
  const [keyphraseOrder, setKeyphraseOrder] = useState("alphabetical");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // ============================================================================
  // HOOKS E STORES
  // ============================================================================
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const topicStore = useTopicStore();
  const flowStore = useFlowStore();
  
  // Funções de sincronização global (usando seletores estáveis do Zustand)
  const registerListener = useSyncStore(state => state.registerListener);
  const unregisterListener = useSyncStore(state => state.unregisterListener);
  const triggerSync = useSyncStore(state => state.triggerSync);

  // Dados derivados
  const user = authStore.user;
  const username = authStore.user?.username;
  const selectedTopic = topicStore.getSelectedTopic();
  const topicName = selectedTopic?.name || selectedTopic?.id;

  // ============================================================================
  // EFEITOS PARA CARREGAR DADOS
  // ============================================================================

  /**
   * Carrega os dados necessários para o componente
   * NOVO: Inicializa modelo de ordenação com as 4 listagens
   */
  const loadData = useCallback(async () => {
    if (!username || !topicName) {
      console.warn('Username ou topic não definidos para carregamento');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      
      // NOVO: Inicializar modelo de ordenação (carrega as 4 ordenações automaticamente)
      try {
        await keyphraseSortingModel.initialize(username, topicName);
        
        // Obter keyphrases da ordenação atual
        const keyphrases = keyphraseSortingModel.getKeyphrasesBySorting(currentSorting);
        
        // Carregar clusters separadamente
        const clustersResponse = await topicService.listClusters(username, topicName);
        
        // Processar keyphrases
        setKeyphraseClustering(keyphrases);
        
        // Atualizar stats de ordenação
        setSortingStats(keyphraseSortingModel.getSortingCounts());

        // Processar clusters
        if (clustersResponse && clustersResponse.clusters) {
          setClusters(clustersResponse.clusters);
        } else {
          setClusters({});
        }

        
      } catch (modelError) {
        console.error('❌ Erro ao inicializar KeyphraseSortingModel:', modelError);
        
        // Fallback: Tentar carregar dados da forma antiga
        const [keyphraseResponse, clustersResponse] = await Promise.all([
          topicService.listKeyphraseClusters(username, topicName, currentSorting),
          topicService.listClusters(username, topicName)
        ]);

        // Processar keyphrases
        if (Array.isArray(keyphraseResponse)) {
          setKeyphraseClustering(keyphraseResponse);
        } else {
          setKeyphraseClustering({});
        }

        // Processar clusters
        if (clustersResponse && clustersResponse.clusters) {
          setClusters(clustersResponse.clusters);
        } else {
          setClusters({});
        }
        
      }

    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      setError('Erro ao carregar dados: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [username, topicName]); // Removido currentSorting - não precisamos recarregar tudo quando muda ordenação

  // ============================================================================
  // EFEITO PARA INICIALIZAR DADOS
  // ============================================================================
  
  /**
   * Efeito para carregar dados APENAS quando o componente monta ou usuário/tópico mudam
   * NÃO deve recarregar quando apenas a ordenação muda
   */
  useEffect(() => {
    
    if (username && topicName) {
      loadData();
    } else {
      console.warn('⚠️ Username ou topicName não definidos:', { username, topicName });
      setLoading(false);
    }
  }, [username, topicName]); // Removido loadData das dependências

  /**
   * Sincroniza keyphraseOrder (select UI) com currentSorting (dados reais)
   */
  useEffect(() => {
    if (currentSorting && keyphraseOrder !== currentSorting) {
      setKeyphraseOrder(currentSorting);
    }
  }, [currentSorting, keyphraseOrder]);

  /**
   * SINCRONIZAÇÃO GLOBAL: Registra listener para receber notificações de outras telas
   * Quando KeyphraseClusters ou CuratedKeyphrases fazem mudanças, esta tela é atualizada
   */
  useEffect(() => {
    const handleSync = async (syncEvent) => {
      
      // Não recarregar se a mudança veio desta própria tela
      if (syncEvent.source === 'clustering') {
        return;
      }
      
      // Recarregar dados do backend
      if (username && topicName) {
        await loadData();
      }
    };
    
    // Registrar listener
    registerListener('clustering', handleSync);
    
    // Cleanup: remover listener quando componente desmontar
    return () => {
      unregisterListener('clustering');
    };
  }, [username, topicName, registerListener, unregisterListener]);

  // ============================================================================
  // FUNÇÕES DE CARREGAMENTO DE DADOS
  // ============================================================================

  /**
   * Recarrega dados
   */
  const refreshData = useCallback(() => {
    loadData();
  }, []); // Sem dependências - loadData é estável para username/topicName

  /**
   * NOVO: Troca o tipo de ordenação de keyphrases
   */
  const changeSorting = useCallback(async (newSorting) => {
    
    if (!Object.values(KeyphraseSorting).includes(newSorting)) {
      console.warn('⚠️ Tipo de ordenação inválido:', newSorting);
      return;
    }

    setCurrentSorting(newSorting);
    
    // Obter keyphrases da nova ordenação (dados já estão no modelo)
    const sortedKeyphrases = keyphraseSortingModel.getKeyphrasesBySorting(newSorting);
    setKeyphraseClustering(sortedKeyphrases);
  }, [currentSorting]);

  // ============================================================================
  // HANDLERS PARA AÇÕES DO USUÁRIO
  // ============================================================================

  /**
   * Handler para mudança na ordenação de keyphrases
   * ATUALIZADO: Agora usa o sistema de ordenação do backend
   */
  const handleKeyphraseOrderChange = useCallback(async (newOrder) => {
    
    // Se for uma ordenação válida do KeyphraseSorting, usar changeSorting
    if (Object.values(KeyphraseSorting).includes(newOrder)) {
      // PRIMEIRO: Atualiza o estado local do select para sincronizar UI
      setKeyphraseOrder(newOrder);
      // SEGUNDO: Chama changeSorting para obter dados com nova ordenação
      await changeSorting(newOrder);
    } else {
      // Fallback para ordenação local (compatibilidade)
      setKeyphraseOrder(newOrder);
    }
  }, [changeSorting]);

  /**
   * Handler para toggle do estado "Hide clustered"
   */
  const handleHideClusteredChange = useCallback((hideClusteredValue) => {
    setHideClusteredState(hideClusteredValue);
  }, []);

  /**
   * Handler para mudança de cluster de uma keyphrase
   * USANDO NOVA API: move_to_cluster_and_save_annotation (resolve problemas de persistência)
   */
  const handleKeyphraseClusteringChange = useCallback(async (value) => {
    
    // EXATO como ReactPy: index, value = value.split(',')
    const [index, clusterValue] = value.split(',');
    const keyphraseIndex = parseInt(index); // Mantém base-1, consistente com backend
    const clusterNum = parseInt(clusterValue);
    
        // Criar cópia do estado atual
    const keyphraseClustering_copy = { ...keyphraseClustering };
    
    // Atualizar cópia usando índice base-1
    keyphraseClustering_copy[keyphraseIndex] = {
      ...keyphraseClustering_copy[keyphraseIndex],
      clustering: clusterNum
    };

    try {
      setSaving(true);
      
      // NOVA API: move_to_cluster_and_save_annotation - Combina move + save em uma operação atômica
            // IMPORTANTE: Backend usa índices 1-based, então precisamos converter o índice 0-based do frontend
      // keyphraseIndex já está em base-1, igual ao backend
      const result = await clusterService.moveToClusterAndSave(username, topicName, keyphraseIndex, clusterNum);
      
      // Se a operação foi bem-sucedida, atualizar estado local
      if (result && !result.error) {
        // 1. EXATO como ReactPy: set_keyphrase_clustering(keyphrase_clustering_copy)
        setKeyphraseClustering(keyphraseClustering_copy);
        
        // 2. NOVO: Atualizar todas as 4 ordenações após modificação
        try {
          await keyphraseSortingModel.refreshAllSortings();
          
          // Atualizar estado com a ordenação atual
          const updatedKeyphrases = keyphraseSortingModel.getKeyphrasesBySorting(currentSorting);
          setKeyphraseClustering(updatedKeyphrases);
          setSortingStats(keyphraseSortingModel.getSortingCounts());
          
        } catch (sortingError) {
          console.warn('⚠️ Falha ao atualizar ordenações:', sortingError.message);
        }
        
        // 3. EXATO como ReactPy: (clusters, _) = ac.get_clusters() → set_clusters(clusters)
        try {
          const clustersResponse = await topicService.listClusters(username, topicName);
          const clustersData = clustersResponse?.clusters || {};
          setClusters(clustersData);
        } catch (clusterError) {
          console.warn('⚠️ Falha ao recarregar clusters:', clusterError.message);
        }
        
        // 3. TESTE: Verificar se keyphrase foi realmente salva
        try {
          const testResponse = await topicService.listKeyphraseClusters(username, topicName);
          const testKeyphrase = testResponse[keyphraseIndex];
                  } catch (testError) {
          console.warn('⚠️ TESTE: Falha ao verificar persistência:', testError.message);
        }
        
        // 4. SINCRONIZAÇÃO GLOBAL: Notificar outras telas sobre a mudança
        triggerSync('clustering', 'move_to_cluster', {
          keyphraseIndex,
          clusterNum,
          username,
          topicName
        });
        
        
      } else {
        throw new Error(result?.message || "Erro na operação move_to_cluster_and_save_annotation");
      }
      
    } catch (error) {
      console.error('❌ Erro no clustering (nova API):', error);
      setError('Erro ao salvar clustering: ' + error.message);
      
      // Não atualizar estado local se houve erro (como ReactPy)
      // O estado permanece como estava antes da tentativa
      
    } finally {
      setSaving(false);
    }
  }, [username, topicName, keyphraseClustering]);

  /**
   * Move keyphrase para cluster usando formato "key,clusterNumber" (EXATO como ReactPy)
   * Simplesmente repassa o valor para o handler principal
   */
  const updateKeyphraseClustering = useCallback((value) => {
    // Repassar diretamente para handler que faz o split (como ReactPy)
    handleKeyphraseClusteringChange(value);
  }, [handleKeyphraseClusteringChange]);

  // ============================================================================
  // FUNÇÕES DE PROCESSAMENTO DE DADOS
  // ============================================================================

  /**
   * Gera opções de clusters para uma keyphrase
   */
  const generateClusterOptions = useCallback((keyphraseKey) => {
    const clusterCount = Math.max(Object.keys(clusters).length, 3); // Mínimo 3 clusters
    const options = [];
    
    // Opção para "não agrupado" (cluster 0)
    // keyphraseKey já é base-1, vem do backend
    options.push({
      key: `${keyphraseKey}-0`,
      value: `${keyphraseKey},0`,
      label: 'Não agrupado'
    });
    
    // Opções para clusters numerados (base-1)
    for (let i = 1; i <= clusterCount; i++) {
      options.push({
        key: `${keyphraseKey}-${i}`,
        value: `${keyphraseKey},${i}`,
        label: `Cluster ${i}`
      });
    }
    
    return options;
  }, [clusters]);

  /**
   * Filtra keyphrases baseado no estado hide_clustered
   */
  const getFilteredKeyphrases = useCallback(() => {
    // USAR DADOS JÁ ORDENADOS DO KeyphraseSortingModel em vez de keyphraseClustering
    if (!keyphraseSortingModel) {
      // Garantir que keyphraseClustering seja tratado como objeto
      const keyphrasesObj = typeof keyphraseClustering === 'object' ? keyphraseClustering : {};
      const keyphrases = Object.entries(keyphrasesObj).map(([key, value]) => ({
        ...value,
        index: parseInt(key)
      }));
      return keyphrases.filter(keyphrase => !hideClusteredState || keyphrase?.clustering === 0);
    }

    // Obter keyphrases já ordenadas do KeyphraseSortingModel
    const sortedKeyphrases = keyphraseSortingModel.getKeyphrasesBySorting(currentSorting);
    // Garantir que o retorno seja um array
    const keyphraseArray = Array.isArray(sortedKeyphrases) ? sortedKeyphrases : [];

    // Aplicar filtro hide_clustered em dados válidos
    return keyphraseArray.filter(keyphrase => 
      keyphrase && (!hideClusteredState || keyphrase?.clustering === 0)
    );
  }, [keyphraseClustering, hideClusteredState, keyphraseSortingModel, currentSorting]);

  /**
   * Obtém keyphrases filtradas - JÁ ORDENADAS pelo KeyphraseSortingModel
   * Não precisa mais fazer ordenação local, dados já vêm ordenados do backend
   */
  const getSortedKeyphrases = useCallback(() => {
    const filtered = getFilteredKeyphrases();
    
    // Garantir que o retorno seja um array
    const keyphraseArray = Array.isArray(filtered) ? filtered : Object.values(filtered);

    // Retornar dados já ordenados como array
    return keyphraseArray;
  }, [getFilteredKeyphrases, currentSorting]);

  /**
   * Obtém estatísticas do clustering
   */
  const getClusteringStatistics = useCallback(() => {
    const total = Object.keys(keyphraseClustering).length;
    const clustered = Object.values(keyphraseClustering).filter(kp => kp.clustering > 0).length;
    const unclustered = total - clustered;
    
    const clusterCounts = {};
    Object.values(keyphraseClustering).forEach(kp => {
      const cluster = kp.clustering;
      clusterCounts[cluster] = (clusterCounts[cluster] || 0) + 1;
    });
    
    return {
      total,
      clustered,
      unclustered,
      clusterCounts,
      completionPercentage: total > 0 ? (clustered / total) * 100 : 0
    };
  }, [keyphraseClustering]);

  // ============================================================================
  // ESTADO E AÇÕES PARA A VIEW
  // ============================================================================

  const viewState = {
    // Dados principais - nomes compatíveis com a View
    keyphrases: getSortedKeyphrases(), // Já retorna um array filtrado
    clusters,
    filteredKeyphrases: getSortedKeyphrases(),
    
    // Estado de controles
    hideClusteredState,
    keyphraseOrder,
    
    // NOVO: Estado de ordenação
    currentSorting,
    sortingStats,
    availableSortings: Object.values(KeyphraseSorting),
    
    // Estado de loading e erro
    loading,
    saving,
    error,
    
    // Dados do contexto
    user,
    currentTopic: selectedTopic,
    username,
    topicName,
    
    // Estatísticas
    statistics: getClusteringStatistics(),
    
    // Estado derivado
    hasKeyphrases: Object.keys(keyphraseClustering).length > 0,
    hasFilteredKeyphrases: getSortedKeyphrases().length > 0,
    isWorking: loading || saving,
    isSortingModelLoading: keyphraseSortingModel.isAnySortingLoading(),
  };

  const viewActions = {
    // Handlers principais - nomes compatíveis com a View
    onKeyphraseOrderChange: handleKeyphraseOrderChange,
    onHideClusteredChange: handleHideClusteredChange,
    onMoveKeyphrase: updateKeyphraseClustering,
    
    // NOVO: Handler para ordenação
    onSortingChange: changeSorting,
    
    // Utilitários
    generateClusterOptions,
    refreshData,
  };

  // ============================================================================
  // DEBUG INFO
  // ============================================================================
  
  const debugInfo = {
    context: {
      username,
      topicName,
      hasSelectedTopic: !!selectedTopic
    },
    data: {
      keyphraseCount: Object.keys(keyphraseClustering).length,
      clusterCount: Object.keys(clusters).length,
      filteredCount: getSortedKeyphrases().length
    },
    state: {
      loading,
      saving,
      error: !!error,
      hideClusteredState,
      keyphraseOrder
    },
    statistics: getClusteringStatistics()
  };

  return {
    // Estado para a View
    ...viewState,
    
    // Ações para a View
    ...viewActions,
    
    // Informações de debug (não usar em produção)
    _debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined,
  };
};