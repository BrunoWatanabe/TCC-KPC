/**
 * useKeyphraseClustersViewModel - Hook customizado para seleção de clusters de keyphrases
 * Baseado no componente backend/components/keyphrase_clusters.py
 * Separa lógica de apresentação da UI pura conforme padrão MVVM
 * 
 * NOVA FUNCIONALIDADE: Gerenciamento de múltiplas ordenações de clusters (5 tipos)
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useTopicStore } from '../stores/useTopicStore.js';
import { useFlowStore } from '../stores/useFlowStore.js';
import useSyncStore from '../stores/useSyncStore.js';
import { topicService } from '../../models/services/TopicService.js';
import { clusterService } from '../../models/services/ClusterService.js';
import { ClusterSorting } from '../../shared/enums/ClusterSorting.js';
import { clusterSortingModel } from '../../models/business/ClusterSortingModel.js';
import { clusterDataModel } from '../../models/business/ClusterDataModel.js';

export const useKeyphraseClustersViewModel = () => {
  // ============================================================================
  // ESTADO LOCAL DO COMPONENTE
  // ============================================================================
  const [clusters, setClusters] = useState({}); // clusters organizados por ordenação
  const [clusterOrder, setClusterOrder] = useState([]); // NOVO: Array com ordem correta dos IDs
  const [selectedClusters, setSelectedClusters] = useState({}); // {clusterId: "0"|"1"}
  const [selectedKeyphrases, setSelectedKeyphrases] = useState({}); // {clusterId: {selected1: id, selected2: id, keyphrase1: label, keyphrase2: label}}
  
  // NOVO: Estado para ordenação de clusters (5 tipos)
  const [currentSorting, setCurrentSorting] = useState(ClusterSorting.NUMERICAL);
  const [sortingStats, setSortingStats] = useState({});
  
  const [clustersInfo, setClustersInfo] = useState(''); // Meta informações dos clusters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  
  // Estados específicos para modo adjudicador (clues_from_other_annotators)
  const [adjudicatorData, setAdjudicatorData] = useState(null);

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
  const user = authStore.getCurrentUser();
  const username = authStore.getCurrentUsername();
  const selectedTopic = topicStore.getSelectedTopic();
  const topicName = selectedTopic?.name || selectedTopic?.id;

  // ============================================================================
  // CARREGAMENTO DE DADOS
  // ============================================================================
  
  /**
   * Carrega os dados necessários para o componente
   * NOVO: Inicializa ClusterSortingModel com as 5 ordenações
   */
  const loadData = useCallback(async () => {
    if (!username || !topicName) {
      console.warn('Username ou topic não definidos para carregamento');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      
      // NOVO: Inicializar ClusterSortingModel (carrega as 5 ordenações automaticamente)
      try {
        await clusterSortingModel.initialize(username, topicName);
        
        // Obter clusters da ordenação atual
        const clustersData = clusterSortingModel.getClustersBySorting(currentSorting);
        const clustersMeta = clusterSortingModel.getClusterMetaInfo(currentSorting);
        
        // NOVO: Obter ordem correta dos IDs do backend
        const idsInOrder = clusterSortingModel.getClusterIdsInOrder(currentSorting);
        
        setClusters(clustersData);
        setClusterOrder(idsInOrder); // Armazenar ordem correta
        setClustersInfo(JSON.stringify(clustersMeta));
        
        // Atualizar stats de ordenação
        setSortingStats(clusterSortingModel.getSortingCounts());
        
        // NOVO: Usar ClusterDataModel para extrair seleções da resposta unificada
        await clusterDataModel.loadCompleteData(username, topicName, currentSorting);
        
        // Extrair cluster_selection (CS: 0/1)
        const clusterSelections = clusterDataModel.getClusterSelections();
        setSelectedClusters(clusterSelections || {});
        
        // Extrair keyphrases_selection (S1, S2)
        const keyphraseSelections = clusterDataModel.getKeyphrasesSelections();
        setSelectedKeyphrases(keyphraseSelections || {});
        
        
      } catch (modelError) {
        console.error('❌ Erro ao inicializar ClusterSortingModel:', modelError);
        
        // Fallback: Tentar carregar dados da forma antiga
        const [clustersResponse, selections, keyphrases] = await Promise.all([
          clusterService.getClusters(username, topicName),
          clusterService.getClusterSelections(username, topicName),
          clusterService.getSelectedKeyphrases(username, topicName)
        ]);
        
        setClusters(clustersResponse?.clusters || {});
        setClustersInfo(JSON.stringify(clustersResponse?.clusters_meta_info || {}));
        setSelectedClusters(selections || {});
        setSelectedKeyphrases(keyphrases || {});
        
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
   * SINCRONIZAÇÃO GLOBAL: Registra listener para receber notificações de outras telas
   * Quando KeyphraseClustering ou CuratedKeyphrases fazem mudanças, esta tela é atualizada
   */
  useEffect(() => {
    const handleSync = async (syncEvent) => {

      // Não recarregar se a mudança veio desta própria tela
      if (syncEvent.source === 'clusters') {
        return;
      }
      
      // Recarregar dados do backend
      if (username && topicName) {
        await loadData();
      }
    };
    
    // Registrar listener
    registerListener('clusters', handleSync);
    
    // Cleanup: remover listener quando componente desmontar
    return () => {
      unregisterListener('clusters');
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
  }, []);

  /**
   * NOVO: Troca o tipo de ordenação de clusters
   */
  const changeSorting = useCallback(async (newSorting) => {
    
    if (!Object.values(ClusterSorting).includes(newSorting)) {
      console.warn('⚠️ Tipo de ordenação inválido:', newSorting);
      return;
    }

    
    setCurrentSorting(newSorting);
    
    // Obter clusters da nova ordenação (dados já estão no modelo)
    const sortedClusters = clusterSortingModel.getClustersBySorting(newSorting);
    const clustersMeta = clusterSortingModel.getClusterMetaInfo(newSorting);
    
    // NOVO: Obter ordem correta dos IDs
    const idsInOrder = clusterSortingModel.getClusterIdsInOrder(newSorting);
    
    setClusters(sortedClusters);
    setClusterOrder(idsInOrder); // Atualizar ordem
    setClustersInfo(JSON.stringify(clustersMeta));
    
    // IMPORTANTE: Recarregar seleções para a nova ordenação
    try {
      await clusterDataModel.loadCompleteData(username, topicName, newSorting);
      
      // Extrair cluster_selection (CS: 0/1)
      const clusterSelections = clusterDataModel.getClusterSelections();
      setSelectedClusters(clusterSelections || {});
      
      // Extrair keyphrases_selection (S1, S2)
      const keyphraseSelections = clusterDataModel.getKeyphrasesSelections();
      setSelectedKeyphrases(keyphraseSelections || {});
    } catch (error) {
      console.error('❌ Erro ao recarregar seleções:', error);
    }
    
    // Se mudou para modo adjudicador, carregar dados adicionais
    if (newSorting === ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS) {
      try {
        const adjData = await topicService.getAdjudicatorData(username, topicName);
        setAdjudicatorData(adjData);
      } catch (error) {
        console.error('❌ Erro ao carregar dados do adjudicador:', error);
      }
    }
  }, [currentSorting, username, topicName]);

  // ============================================================================
  // HANDLERS PARA AÇÕES DO USUÁRIO
  // ============================================================================

  /**
   * Handler para mudança na ordenação de clusters
   * EXATO como ReactPy: on_cluster_order_by_change(event)
   */
  const handleClusterOrderChange = useCallback(async (newOrder) => {
    
    // Se for uma ordenação válida do ClusterSorting, usar changeSorting
    if (Object.values(ClusterSorting).includes(newOrder)) {
      await changeSorting(newOrder);
    } else {
      console.warn('⚠️ Ordenação inválida:', newOrder);
    }
  }, [changeSorting]);

  /**
   * Handler para seleção/deseleção de cluster (CS: 0/1)
   * EXATO como ReactPy: on_cluster_selected_by_change(value) onde value = "clusterId,selection"
   */
  const handleClusterSelectionChange = useCallback(async (value) => {
    
    // EXATO como ReactPy: cluster_id, selection = value.split(',')
    const [clusterIdStr, selectionStr] = value.split(',');
    const clusterId = parseInt(clusterIdStr);
    const selection = parseInt(selectionStr);
    
    
    // Atualizar estado local imediatamente (como ReactPy: set_selected_clusters)
    const selectedClustersCopy = { ...selectedClusters };
    selectedClustersCopy[clusterId] = String(selection);
    setSelectedClusters(selectedClustersCopy);

    try {
      setSaving(true);
      
      // Salvar seleção E anotação (nova API que faz tudo em uma chamada)
      await clusterService.selectClusterAndSaveAnnotation(username, topicName, clusterId, selection);
      
      
      // SINCRONIZAÇÃO GLOBAL: Notificar outras telas
      triggerSync('clusters', 'select_cluster', {
        clusterId,
        selection,
        username,
        topicName
      });
      
    } catch (error) {
      console.error('❌ Erro ao salvar cluster selection:', error);
      setError('Erro ao salvar seleção: ' + error.message);
      
      // Reverter mudança local em caso de erro
      setSelectedClusters(selectedClusters);
      
    } finally {
      setSaving(false);
    }
  }, [username, topicName, selectedClusters]);

  /**
   * Handler para seleção de keyphrase 1 (S1)
   * EXATO como ReactPy: on_keyphrase1_selected_by_change(value) onde value = "clusterId,keyphraseId"
   */
  const handleKeyphrase1SelectionChange = useCallback(async (value) => {
    
    // EXATO como ReactPy: cluster_id, keyphrase_id = value.split(',')
    const [clusterIdStr, keyphraseIdStr] = value.split(',');
    const clusterId = parseInt(clusterIdStr);
    const keyphraseId = parseInt(keyphraseIdStr);
    
    
    // Atualizar estado local (como ReactPy: set_selected_keyphrases)
    const selectedKeyphrasesCopy = { ...selectedKeyphrases };
    if (!selectedKeyphrasesCopy[clusterId]) {
      selectedKeyphrasesCopy[clusterId] = { selected1: 0, selected2: 0 };
    }
    selectedKeyphrasesCopy[clusterId].selected1 = keyphraseId;
    setSelectedKeyphrases(selectedKeyphrasesCopy);

    try {
      setSaving(true);
      
      // Salvar seleção E anotação (nova API que faz tudo em uma chamada)
      await clusterService.selectKeyphraseAndSaveAnnotation(username, topicName, clusterId, 1, keyphraseId);
      
      
      // SINCRONIZAÇÃO GLOBAL: Notificar outras telas
      triggerSync('clusters', 'select_keyphrase1', {
        clusterId,
        keyphraseId,
        order: 1,
        username,
        topicName
      });
      
    } catch (error) {
      console.error('❌ Erro ao salvar keyphrase1 selection:', error);
      setError('Erro ao salvar seleção: ' + error.message);
      
      // Reverter mudança local em caso de erro
      setSelectedKeyphrases(selectedKeyphrases);
      
    } finally {
      setSaving(false);
    }
  }, [username, topicName, selectedKeyphrases]);

  /**
   * Handler para seleção de keyphrase 2 (S2)
   * EXATO como ReactPy: on_keyphrase2_selected_by_change(value) onde value = "clusterId,keyphraseId"
   */
  const handleKeyphrase2SelectionChange = useCallback(async (value) => {
    
    // EXATO como ReactPy: cluster_id, keyphrase_id = value.split(',')
    const [clusterIdStr, keyphraseIdStr] = value.split(',');
    const clusterId = parseInt(clusterIdStr);
    const keyphraseId = parseInt(keyphraseIdStr);
    
    
    // Atualizar estado local (como ReactPy: set_selected_keyphrases)
    const selectedKeyphrasesCopy = { ...selectedKeyphrases };
    if (!selectedKeyphrasesCopy[clusterId]) {
      selectedKeyphrasesCopy[clusterId] = { selected1: 0, selected2: 0 };
    }
    selectedKeyphrasesCopy[clusterId].selected2 = keyphraseId;
    setSelectedKeyphrases(selectedKeyphrasesCopy);

    try {
      setSaving(true);
      
      // Salvar seleção E anotação (nova API que faz tudo em uma chamada)
      await clusterService.selectKeyphraseAndSaveAnnotation(username, topicName, clusterId, 2, keyphraseId);
      
      
      // SINCRONIZAÇÃO GLOBAL: Notificar outras telas
      triggerSync('clusters', 'select_keyphrase2', {
        clusterId,
        keyphraseId,
        order: 2,
        username,
        topicName
      });
      
    } catch (error) {
      console.error('❌ Erro ao salvar keyphrase2 selection:', error);
      setError('Erro ao salvar seleção: ' + error.message);
      
      // Reverter mudança local em caso de erro
      setSelectedKeyphrases(selectedKeyphrases);
      
    } finally {
      setSaving(false);
    }
  }, [username, topicName, selectedKeyphrases]);

  // ============================================================================
  // FUNÇÕES UTILITÁRIAS
  // ============================================================================

  /**
   * Obtém a cor do chip da keyphrase com base na seleção
   * EXATO como ReactPy: get_chip_color
   */
  const getKeyphraseChipColor = useCallback((clusterId, keyphraseId) => {
    const clusterIdStr = String(clusterId);
    const keyphraseIdStr = String(keyphraseId);
    
    const clusterKeyphrases = selectedKeyphrases[clusterIdStr] || { selected1: 0, selected2: 0 };
    const selected1Str = String(clusterKeyphrases.selected1 || 0);
    const selected2Str = String(clusterKeyphrases.selected2 || 0);
    const selectedCluster = selectedClusters[clusterIdStr] || "0";
    
    // Se é uma keyphrase selecionada (S1 ou S2)
    if (keyphraseIdStr === selected1Str || keyphraseIdStr === selected2Str) {
      // Cor baseada na seleção do cluster
      if (selectedCluster === "1") {
        return "success"; // Verde - cluster selecionado
      } else if (selectedCluster === "0") {
        return "error"; // Vermelho - cluster rejeitado
      } else {
        return "warning"; // Amarelo - indefinido
      }
    }
    
    return "default"; // Cinza - não selecionada
  }, [selectedKeyphrases, selectedClusters]);

  /**
   * Verifica se um cluster está desabilitado (último cluster = thrash)
   */
  const isClusterDisabled = useCallback((clusterId) => {
    const totalClusters = Object.keys(clusters).length;
    return clusterId === totalClusters; // Último cluster é o thrash (desabilitado)
  }, [clusters]);

  /**
   * Obtém o valor selecionado do cluster (0 ou 1)
   */
  const getSelectedCluster = useCallback((clusterId) => {
    const clusterIdStr = String(clusterId);
    const selected = selectedClusters[clusterIdStr];
    return selected === "0" || selected === "1" ? selected : "0";
  }, [selectedClusters]);

  /**
   * Obtém a keyphrase selecionada para uma ordem específica
   */
  const getSelectedKeyphrase = useCallback((clusterId, order) => {
    const clusterIdStr = String(clusterId);
    const totalClusters = Object.keys(clusters).length;
    
    const clusterKeyphrases = selectedKeyphrases[clusterIdStr];
    
    // Se é o thrash cluster, retornar 0
    if (clusterId === totalClusters) {
      return "0";
    }
    
    // Se não tem seleção, retornar 0
    if (!clusterKeyphrases) {
      return "0";
    }
    
    // Obter a seleção da ordem específica
    if (order === 1) {
      const selected = clusterKeyphrases.selected1;
      return selected === -1 || selected === 0 ? "0" : String(selected);
    } else if (order === 2) {
      const selected = clusterKeyphrases.selected2;
      return selected === -1 || selected === 0 ? "0" : String(selected);
    }
    
    return "0";
  }, [selectedKeyphrases, clusters]);

  /**
   * Extrai o ID da keyphrase de uma string formatada (ex: "keyphrase(123)")
   */
  const extractKeyphraseId = useCallback((keyphraseStr) => {
    const match = keyphraseStr.match(/\((\d+)\)/);
    return match ? match[1] : null;
  }, []);

  /**
   * Verifica se pode prosseguir para próxima etapa
   */
  const canProceedToNext = useCallback(() => {
    // Verificar se há pelo menos 1 cluster selecionado
    const hasSelectedCluster = Object.values(selectedClusters).some(val => val === "1");
    return hasSelectedCluster;
  }, [selectedClusters]);

  /**
   * Prossegue para próxima etapa do fluxo (Aliases)
   */
  const proceedToNext = useCallback(() => {
    if (canProceedToNext()) {
      // Atualizar fluxo
      flowStore.clustersHelpers.onClustersComplete();
      
      // Navegar para próxima etapa (fluxo sequencial: 4→5 Aliases)
      navigate('/aliases');
    } else {
      setError('Selecione pelo menos 1 cluster antes de continuar');
    }
  }, [canProceedToNext, flowStore, navigate]);

  // ============================================================================
  // ESTADO E AÇÕES PARA A VIEW
  // ============================================================================

  const viewState = {
    // Dados principais - nomes compatíveis com a View
    clusters,
    clusterOrder, // NOVO: Array com ordem correta dos cluster IDs
    selectedClusters,
    selectedKeyphrases,
    clustersInfo,
    adjudicatorData,
    
    // Estado de ordenação
    currentSorting,
    sortingStats,
    availableSortings: Object.values(ClusterSorting),
    
    // Estado de loading e erro
    loading,
    saving,
    error,
    
    // Dados do contexto
    user,
    currentTopic: selectedTopic,
    username,
    topicName,
    
    // Validações
    canProceed: canProceedToNext(),
    canProceedToAliases: canProceedToNext(), // Alias mais descritivo
    
    // Estado derivado
    hasClusters: Object.keys(clusters).length > 0,
    isWorking: loading || saving,
    isSortingModelLoading: clusterSortingModel.isAnySortingLoading(),
    isAdjudicatorMode: currentSorting === ClusterSorting.CLUES_FROM_OTHER_ANNOTATORS,
  };

  const viewActions = {
    // Handlers principais - nomes compatíveis com a View
    onClusterOrderChange: handleClusterOrderChange,
    onClusterSelectionChange: handleClusterSelectionChange,
    onKeyphrase1SelectionChange: handleKeyphrase1SelectionChange,
    onKeyphrase2SelectionChange: handleKeyphrase2SelectionChange,
    
    // Handler para ordenação
    onSortingChange: changeSorting,
    
    // Utilitários
    getKeyphraseChipColor,
    isClusterDisabled,
    getSelectedCluster,
    getSelectedKeyphrase,
    extractKeyphraseId,
    refreshData,
    
    // Navegação
    onNext: proceedToNext,
    goToAliases: proceedToNext, // Alias mais descritivo
    onBack: () => {
      flowStore.clustersHelpers.onBackToClustering();
      navigate('/clustering');
    },
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
      clusterCount: Object.keys(clusters).length,
      selectedClustersCount: Object.keys(selectedClusters).length,
      selectedKeyphrasesCount: Object.keys(selectedKeyphrases).length
    },
    state: {
      loading,
      saving,
      error: !!error,
      currentSorting
    }
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