/**
 * useCuratedKeyphrasesViewModel - Hook customizado para curação final de keyphrases
 * Baseado no componente src/components/CuratedKeyphrases.jsx
 * Separa lógica de apresentação da UI pura
 * 
 * NOVA FUNCIONALIDADE: Gerenciamento de ordenações de aliases (2 tipos)
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useTopicStore } from '../stores/useTopicStore.js';
import { useFlowStore } from '../stores/useFlowStore.js';
import useSyncStore from '../stores/useSyncStore.js';
import { topicService } from '../../models/services/TopicService.js';
import { annotationService } from '../../models/services/AnnotationService.js';
import { config, getDerivedConfig } from '../../shared/config.js';
import { clusterAliasSortingModel, ClusterAliasSorting } from '../../models/business/ClusterAliasSortingModel.js';

export const useCuratedKeyphrasesViewModel = () => {
  // ============================================================================
  // ESTADO LOCAL DO COMPONENTE
  // ============================================================================
  const [curatedKeyphrases, setCuratedKeyphrases] = useState({});
  const [clusterOrder, setClusterOrder] = useState([]); // NOVO: Array com ordem correta dos IDs
  const [selectedClusters, setSelectedClusters] = useState({});
  const [keyphraseAlias, setKeyphraseAlias] = useState({});
  const [updatedKeyphraseAlias, setUpdatedKeyphraseAlias] = useState({});
  const [defaultAliases, setDefaultAliases] = useState({}); // NOVO: armazena defaults do backend
  const [curatedKeyphrasesOrder, setCuratedKeyphrasesOrder] = useState("source_cluster");
  
  // NOVO: Estado para ordenação de aliases (2 tipos: alphabetical_cluster_alias, numerical_cluster_alias)
  const [currentAliasSorting, setCurrentAliasSorting] = useState(ClusterAliasSorting.NUMERICAL);
  const [sortingStats, setSortingStats] = useState({});
  
  const [showOnlyCurated, setShowOnlyCurated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Configuração centralizada (compatível com ReactPy)
  const CURATED_KEYPHRASES_LENGTH = config.curated_keyphrases_length;

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
  // EFEITOS PARA ATUALIZAR CURATED KEYPHRASES
  // ============================================================================

  /**
   * REMOVIDO: updateCuratedKeyphrases
   * Não é mais necessário pois os dados agora vêm diretamente da API via loadData()
   * usando ClusterDataModel que extrai curated keyphrases da resposta unificada
   */

  // ============================================================================
  // FUNÇÕES DE CARREGAMENTO DE DADOS
  // ============================================================================

  /**
   * Carrega dados de keyphrases curadas, seleções e aliases da API
   */
  const loadData = useCallback(async () => {
    if (!username || !topicName) {
      setError('Usuário ou tópico não definido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      
      // NOVO: Inicializar ClusterAliasSortingModel (carrega as 2 ordenações automaticamente)
      try {
        await clusterAliasSortingModel.initialize(username, topicName);
        
        // Obter dados completos da ordenação atual (clusterId, clusterName, keyphrases, aliases)
        const aliasesArray = clusterAliasSortingModel.getAliasesBySorting(currentAliasSorting);
        
        // Extrair ordem dos IDs
        const idsInOrder = aliasesArray.map(item => item.clusterId);
        setClusterOrder(idsInOrder);
        
        // Extrair curated keyphrases da keyphrases_selection
        // Formato: [id1, id2, "keyphrase1", "keyphrase2"]
        const curatedKeyphrasesData = {};
        aliasesArray.forEach(item => {
          const selection = item.keyphrases_selection || [0, 0, "", ""];
          
          // Converter para formato [[id, text], [id, text]]
          const formattedKeyphrases = [
            [selection[0], selection[2]], // [id1, keyphrase1]
            [selection[1], selection[3]]  // [id2, keyphrase2]
          ];
          
          curatedKeyphrasesData[item.clusterId] = formattedKeyphrases;
        });
        
        setCuratedKeyphrases(curatedKeyphrasesData);
        
        // Extrair aliases (usar alias se existir, senão vazio)
        const aliasesData = {};
        const defaultAliasesData = {}; // NOVO: armazenar defaults
        aliasesArray.forEach(item => {
          const aliasInfo = item.keyphrases_aliases || { default: "", alias: "" };
          aliasesData[item.clusterId] = aliasInfo.alias || '';
          defaultAliasesData[item.clusterId] = aliasInfo.default || ''; // Armazenar default
        });
        
        setKeyphraseAlias(aliasesData);
        setUpdatedKeyphraseAlias(aliasesData);
        setDefaultAliases(defaultAliasesData); // NOVO: salvar defaults
        
        // Extrair seleções de clusters (cluster_selection: "0" ou "1")
        const clusterSelectionsData = {};
        aliasesArray.forEach(item => {
          clusterSelectionsData[item.clusterId] = item.cluster_selection || "0";
        });
        
        setSelectedClusters(clusterSelectionsData);
        
        // Atualizar stats de ordenação
        setSortingStats(clusterAliasSortingModel.getSortingCounts());
        
      } catch (modelError) {
        console.error('❌ Erro ao inicializar ClusterAliasSortingModel:', modelError);
        
        // Fallback: Tentar carregar dados da forma antiga
        const [curatedResponse, selectionResponse, aliasResponse] = await Promise.all([
          topicService.listKeyphrasesSelection(username, topicName), // Curated keyphrases
          topicService.listClusterSelection(username, topicName),    // Cluster selections
          topicService.listKeyphrasesAliases(username, topicName)    // Aliases
        ]);
        
        setCuratedKeyphrases(curatedResponse || {});
        setSelectedClusters(selectionResponse || {});
        setKeyphraseAlias(aliasResponse || {});
        setUpdatedKeyphraseAlias(aliasResponse || {});
        
      }

    } catch (error) {
      console.error('❌ Erro ao carregar dados de keyphrases curadas:', error);
      setError(error.message || 'Erro ao carregar dados');
      
      // Fallback data para desenvolvimento/teste
      if (process.env.NODE_ENV === 'development') {
        
        const fallbackCurated = {
          "1": [[4, "pro-life movement"], [5, "pro-choice advocacy"]],
          "2": [[7, "reproductive freedom"], [0, ""]],
          "3": [[0, ""], [0, ""]]
        };
        
        const fallbackSelectedClusters = {
          "1": "1", 
          "2": "1",
          "3": "0"
        };
        
        const fallbackAliases = {
          "1": "reproductive_debate",
          "2": "",
          "3": ""
        };
        
        setCuratedKeyphrases(fallbackCurated);
        setSelectedClusters(fallbackSelectedClusters);
        setKeyphraseAlias(fallbackAliases);
        setUpdatedKeyphraseAlias(fallbackAliases);
        setError('');
      }
    } finally {
      setLoading(false);
    }
  }, [username, topicName, currentAliasSorting]);

  /**
   * Efeito para carregar dados quando username e topic estão disponíveis
   */
  useEffect(() => {
    if (username && topicName) {
      loadData();
    }
  }, [username, topicName, loadData]);

  /**
   * SINCRONIZAÇÃO GLOBAL: Registra listener para receber notificações de outras telas
   * Quando KeyphraseClustering ou KeyphraseClusters fazem mudanças, esta tela é atualizada
   */
  useEffect(() => {
    const handleSync = async (syncEvent) => {
    
      // Não recarregar se a mudança veio desta própria tela
      if (syncEvent.source === 'curated') {
        return;
      }
      
      // Recarregar dados do backend
      if (username && topicName) {
        await loadData();
      }
    };
    
    // Registrar listener
    registerListener('curated', handleSync);
    
    // Cleanup: remover listener quando componente desmontar
    return () => {
      unregisterListener('curated');
    };
  }, [username, topicName, registerListener, unregisterListener]);

  /**
   * Recarrega dados
   */
  const refreshData = useCallback(() => {
    loadData();
  }, [loadData]);

  /**
   * NOVO: Troca o tipo de ordenação de aliases
   */
  const changeAliasSorting = useCallback(async (newSorting) => {
    
    if (!Object.values(ClusterAliasSorting).includes(newSorting)) {
      console.warn('⚠️ Tipo de ordenação de alias inválido:', newSorting);
      return;
    }

    
    setCurrentAliasSorting(newSorting);
    
    // Obter dados completos da nova ordenação
    const aliasesArray = clusterAliasSortingModel.getAliasesBySorting(newSorting);
    
    // Extrair ordem dos IDs
    const idsInOrder = aliasesArray.map(item => item.clusterId);
    setClusterOrder(idsInOrder);
    
    // Extrair curated keyphrases da keyphrases_selection
    const curatedKeyphrasesData = {};
    aliasesArray.forEach(item => {
      const selection = item.keyphrases_selection || [0, 0, "", ""];
      
      // Converter para formato [[id, text], [id, text]]
      const formattedKeyphrases = [
        [selection[0], selection[2]], // [id1, keyphrase1]
        [selection[1], selection[3]]  // [id2, keyphrase2]
      ];
      
      curatedKeyphrasesData[item.clusterId] = formattedKeyphrases;
    });
    
    setCuratedKeyphrases(curatedKeyphrasesData);
    
    // Extrair aliases (usar alias se existir, senão vazio)
    const aliasesData = {};
    const defaultAliasesData = {}; // NOVO: armazenar defaults
    aliasesArray.forEach(item => {
      const aliasInfo = item.keyphrases_aliases || { default: "", alias: "" };
      aliasesData[item.clusterId] = aliasInfo.alias || '';
      defaultAliasesData[item.clusterId] = aliasInfo.default || ''; // Armazenar default
    });
    
    setKeyphraseAlias(aliasesData);
    setUpdatedKeyphraseAlias(aliasesData);
    setDefaultAliases(defaultAliasesData); // NOVO: salvar defaults
    
    // Extrair seleções de clusters (cluster_selection: "0" ou "1")
    const clusterSelectionsData = {};
    aliasesArray.forEach(item => {
      clusterSelectionsData[item.clusterId] = item.cluster_selection || "0";
    });
    
    setSelectedClusters(clusterSelectionsData);
  }, [currentAliasSorting]);

  // ============================================================================
  // FUNÇÕES DE CONTAGEM E ESTATÍSTICAS
  // ============================================================================

  /**
   * Conta keyphrases curadas (clusters com CS=1)
   */
  const countCuratedKeyphrases = useCallback(() => {
    return Object.values(selectedClusters).filter(value => value === "1").length;
  }, [selectedClusters]);

  /**
   * Obtém contador formatado de curação (baseado no config ReactPy)
   * Replica a lógica do curated_keyphrases.py: f"{count}/{config['curated_keyphrases_length']}"
   */
  const getCurationCounter = useCallback(() => {
    const currentCount = countCuratedKeyphrases();
    return getDerivedConfig().getCurationCounterFormat(currentCount, config.curated_keyphrases_length);
  }, [countCuratedKeyphrases]);

  /**
   * Verifica se curação está completa
   */
  const isCurationComplete = useCallback(() => {
    const currentCount = countCuratedKeyphrases();
    return getDerivedConfig().isCurationComplete(currentCount, config.curated_keyphrases_length);
  }, [countCuratedKeyphrases]);

  /**
   * Calcula estatísticas da curação
   */
  const getCurationStatistics = useCallback(() => {
    const totalClusters = Object.keys(curatedKeyphrases).length;
    const curatedCount = countCuratedKeyphrases();
    const withAliases = Object.values(keyphraseAlias).filter(alias => alias && alias.trim() !== '').length;
    
    return {
      totalClusters,
      curatedCount,
      withAliases,
      targetCount: CURATED_KEYPHRASES_LENGTH,
      completionPercentage: CURATED_KEYPHRASES_LENGTH > 0 ? (curatedCount / CURATED_KEYPHRASES_LENGTH) * 100 : 0,
      hasReachedTarget: curatedCount >= CURATED_KEYPHRASES_LENGTH
    };
  }, [countCuratedKeyphrases, keyphraseAlias, CURATED_KEYPHRASES_LENGTH]);



  // ============================================================================
  // HANDLERS PARA AÇÕES DO USUÁRIO
  // ============================================================================

  /**
   * Handler para mudança na ordenação de keyphrases curadas
   */
  const handleOrderChange = useCallback((newOrder) => {
    setCuratedKeyphrasesOrder(newOrder);
  }, []);

  /**
   * Handler para toggle do modo "Show Only Curated"
   */
  const handleShowOnlyCuratedChange = useCallback((showOnly) => {
    setShowOnlyCurated(showOnly);
  }, []);

  /**
   * Handler para mudança de alias local (sem salvar ainda)
   */
  const updateAlias = useCallback((clusterId, value) => {
    
    setUpdatedKeyphraseAlias(prev => ({
      ...prev,
      [clusterId]: value
    }));
  }, []);

  /**
   * Handler para salvar alias na API (seguindo padrão ReactPy handle_keyphrase_alias_save_click)
   */
  const saveAlias = useCallback(async (value) => {
    const [clusterId, alias] = Array.isArray(value) ? value : [value, updatedKeyphraseAlias[value] || ""];
    
    try {
      setSaving(true);
      
      // Atualizar estado local imediatamente (como no ReactPy)
      const updatedAliases = { ...keyphraseAlias };
      updatedAliases[clusterId] = alias;
      
      // Definir alias E salvar anotação (nova API que faz tudo em uma chamada)
      await topicService.setAliasAndSaveAnnotation(username, topicName, parseInt(clusterId), alias);
      
      // Atualizar estado local após sucesso
      setKeyphraseAlias(updatedAliases);
      
      
      // SINCRONIZAÇÃO GLOBAL: Notificar outras telas
      triggerSync('curated', 'set_alias', {
        clusterId,
        alias,
        username,
        topicName
      });
      
    } catch (error) {
      console.error('❌ Erro ao salvar alias:', error);
      setError('Erro ao salvar alias: ' + error.message);
      
      // Reverter mudança local em caso de erro
      setUpdatedKeyphraseAlias(prev => ({
        ...prev,
        [clusterId]: keyphraseAlias[clusterId] || ""
      }));
    } finally {
      setSaving(false);
    }
  }, [username, topicName, updatedKeyphraseAlias, keyphraseAlias]);

  // ============================================================================
  // FUNÇÕES DE PROCESSAMENTO E FORMATAÇÃO
  // ============================================================================

  /**
   * Gera label automático baseado no default do backend
   */
  const generateAutomaticLabel = useCallback((keyphrases, clusterId) => {
    // Usar o default fornecido pelo backend
    if (defaultAliases[clusterId]) {
      return defaultAliases[clusterId];
    }
    
    // Fallback: Se não tiver default, usar cluster_N
    return `cluster_${clusterId}`;
  }, [defaultAliases]);

  /**
   * Determina cor do chip baseado no status do cluster
   */
  const getChipColor = useCallback((clusterId) => {
    const clusterStatus = selectedClusters[clusterId];
    
    if (clusterStatus === "1") return "success";      // Verde - curado
    if (clusterStatus === "0") return "error";        // Vermelho - não curado
    if (clusterStatus === "-1") return "warning";     // Amarelo - status especial
    
    return "default"; // Cinza - padrão
  }, [selectedClusters]);

  /**
   * Filtra e ordena keyphrases curadas
   * IMPORTANTE: Usa clusterOrder para preservar a ordem do backend (alfabética ou numérica dos aliases)
   */
  const getFilteredAndSortedKeyphrases = useCallback(() => {
    
    // IMPORTANTE: Backend já envia ordenado via clusterOrder
    // Usar clusterOrder como base (já vem ordenado do backend)
    const orderedClusters = clusterOrder.map(clusterId => {
      const keyphrases = curatedKeyphrases[clusterId];
      return keyphrases ? [String(clusterId), keyphrases] : null;
    }).filter(Boolean);
    
    // Filtrar baseado no showOnlyCurated
    const filtered = orderedClusters.filter(([clusterId, keyphrases]) => {
      return !showOnlyCurated || selectedClusters[clusterId] === "1";
    });
    
    return filtered;
  }, [clusterOrder, curatedKeyphrases, showOnlyCurated, selectedClusters, curatedKeyphrasesOrder, generateAutomaticLabel]);

  /**
   * Verifica se alias foi modificado para um cluster
   */
  const isAliasModified = useCallback((clusterId) => {
    return updatedKeyphraseAlias[clusterId] !== keyphraseAlias[clusterId];
  }, [updatedKeyphraseAlias, keyphraseAlias]);

  /**
   * Verifica se cluster tem keyphrases válidas
   */
  const hasValidKeyphrases = useCallback((keyphrases) => {
    return keyphrases.length >= 1 && keyphrases[0][0] !== 0;
  }, []);

  /**
   * Salva toda a anotação/curação
   */
  const saveAnnotation = useCallback(async () => {
    try {
      setSaving(true);
      
      // Usar um nome de tarefa genérico ou baseado no tópico
      const taskName = `curation_${topicName}_${Date.now()}`;
      
      await topicService.saveAnnotation(username, topicName, taskName);
      
      
      // Marcar etapa como completa
      flowStore.curationHelpers.onCurationComplete();
      
    } catch (error) {
      console.error('❌ Erro ao salvar anotação:', error);
      setError('Erro ao salvar anotação: ' + error.message);
    } finally {
      setSaving(false);
    }
  }, [username, topicName, flowStore]);

  /**
   * Verifica se pode finalizar curação
   */
  const canFinalizeCuration = useCallback(() => {
    const stats = getCurationStatistics();
    // Pode finalizar se atingiu pelo menos 50% da meta
    return stats.curatedCount >= Math.ceil(CURATED_KEYPHRASES_LENGTH * 0.5);
  }, [getCurationStatistics, CURATED_KEYPHRASES_LENGTH]);

  // ============================================================================
  // ESTADO E AÇÕES PARA A VIEW
  // ============================================================================

  const viewState = {
    // Estado principal
    curatedKeyphrases,
    selectedClusters,
    keyphraseAlias,
    updatedKeyphraseAlias,
    filteredKeyphrases: getFilteredAndSortedKeyphrases(),
    
    // Estado de controles
    curatedKeyphrasesOrder,
    showOnlyCurated,
    
    // Estado de loading e erro
    loading,
    saving,
    error,
    
    // Dados do contexto
    username,
    topicName,
    selectedTopic,
    
    // NOVO: Estados de ordenação de aliases
    currentAliasSorting,
    sortingStats,
    availableAliasSortings: Object.values(ClusterAliasSorting),
    clusterOrder, // Array de IDs na ordem correta do backend
    
    // Configuração e estatísticas
    targetCount: CURATED_KEYPHRASES_LENGTH,
    statistics: getCurationStatistics(),
    curatedCount: countCuratedKeyphrases(),
    canFinalize: canFinalizeCuration(),
    
    // Estado derivado
    hasKeyphrases: Object.keys(curatedKeyphrases).length > 0,
    hasFilteredKeyphrases: getFilteredAndSortedKeyphrases().length > 0,
    isWorking: loading || saving,
  };

  const viewActions = {
    // Handlers principais
    handleOrderChange,
    handleShowOnlyCuratedChange,
    updateAlias,
    saveAlias,
    
    // NOVO: Função para trocar ordenação de aliases
    changeAliasSorting,
    
    // Funções utilitárias para UI
    generateAutomaticLabel,
    getChipColor,
    isAliasModified,
    hasValidKeyphrases,
    
    // Ações de finalização
    saveAnnotation,
    
    // Utilitários
    refreshData,
    
    // Navegação
    goBack: () => {
      flowStore.curationHelpers.onBackToClusters();
      navigate('/clusters');
    },
    finalizeCuration: () => {
      saveAnnotation();
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
      curatedCount: Object.keys(curatedKeyphrases).length,
      selectedCount: Object.keys(selectedClusters).length,
      aliasCount: Object.keys(keyphraseAlias).length,
      filteredCount: getFilteredAndSortedKeyphrases().length
    },
    state: {
      loading,
      saving,
      error: !!error,
      curatedKeyphrasesOrder,
      showOnlyCurated
    },
    statistics: getCurationStatistics()
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