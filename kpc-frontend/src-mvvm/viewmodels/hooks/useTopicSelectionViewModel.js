/**
 * useTopicSelectionViewModel - Hook customizado para seleção de tópicos
 * Baseado no componente src/components/TopicSelect.jsx
 * Separa lógica de apresentação da UI pura
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useTopicStore } from '../stores/useTopicStore.js';
import { useFlowStore } from '../stores/useFlowStore.js';
import { topicService } from '../../models/services/TopicService.js';
// authService foi refatorado para escopo mínimo (login apenas)
// listUsers() removido — verificação de token usa authStore.isAuthenticated

export const useTopicSelectionViewModel = () => {
  // ============================================================================
  // ESTADO LOCAL DO COMPONENTE
  // ============================================================================
  const [localSelectedTopic, setLocalSelectedTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ============================================================================
  // HOOKS DE NAVEGAÇÃO E STORES
  // ============================================================================
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const topicStore = useTopicStore();
  const flowStore = useFlowStore();

  // ============================================================================
  // DADOS DERIVADOS DOS STORES
  // ============================================================================
  const user = authStore.user;
  const username = authStore.user?.username;
  const isAuthenticated = authStore.isAuthenticated;
  
  const topics = topicStore.getTopics();
  const selectedTopic = topicStore.getSelectedTopic();
  const annotationProfile = topicStore.getAnnotationProfile();

  // ============================================================================
  // EFEITOS PARA CARREGAR DADOS
  // ============================================================================

  /**
   * Carrega tópicos quando usuário está disponível
   */
  useEffect(() => {
    if (user?.username) {
      loadTopics();
    } else if (!isAuthenticated) {
      // Se não está autenticado, redirecionar para login
      navigate('/login');
    }
  }, [user, isAuthenticated]);

  /**
   * Sincroniza seleção local com store
   */
  useEffect(() => {
    if (selectedTopic) {
      setLocalSelectedTopic(selectedTopic.name || selectedTopic.id || selectedTopic);
    } else {
      setLocalSelectedTopic('');
    }
  }, [selectedTopic]);

  // ============================================================================
  // FUNÇÕES DE CARREGAMENTO DE DADOS
  // ============================================================================

  /**
   * Testa se o token ainda é válido
   */
  const testTokenValidity = useCallback(async () => {
    try {
      // authService.listUsers() removido na refatoração
      // Token validado indiretamente: se authStore.isAuthenticated, token existe
      return authStore.isAuthenticated;
    } catch (error) {
      console.error('❌ Token inválido:', error);
      return false;
    }
  }, []);

  /**
   * Carrega lista de tópicos do usuário
   */
  const loadTopics = useCallback(async () => {
    if (!username) {
      setError('Usuário não identificado');
      return;
    }

    setLoading(true);
    setError('');
    topicStore.setLoading(true);
    topicStore.clearError();
    
    try {
      // Primeiro testar se token é válido
      const tokenIsValid = await testTokenValidity();
      
      if (!tokenIsValid) {
        const errorMsg = 'Sessão expirada. Faça login novamente.';
        setError(errorMsg);
        topicStore.setError(errorMsg);
        authStore.logout();
        flowStore.reset();
        navigate('/login');
        return;
      }

      // Carregar tópicos usando TopicService
      const topicsData = await topicService.listTopics(username);
      
      
      // Processar dados de tópicos
      let topicsList = [];
      
      if (Array.isArray(topicsData)) {
        topicsList = topicsData;
      } else if (topicsData?.topics && Array.isArray(topicsData.topics)) {
        topicsList = topicsData.topics;
      } else if (typeof topicsData === 'object' && topicsData !== null) {
        topicsList = Object.keys(topicsData);
      }
      
      
      // Salvar no store (TopicService já converte para entidades)
      topicStore.setTopics(topicsList);
      
      if (topicsList.length === 0) {
        setError('Nenhum tópico encontrado para este usuário');
      }
      
    } catch (error) {
      console.error('❌ Erro ao carregar tópicos:', error);
      const errorMsg = error.message || 'Erro ao carregar tópicos';
      setError(errorMsg);
      topicStore.setError(errorMsg);
    } finally {
      setLoading(false);
      topicStore.setLoading(false);
    }
  }, [username, topicStore, authStore, flowStore, navigate, testTokenValidity]);

  /**
   * Carrega perfil de anotação para um tópico
   */
  const loadAnnotationProfile = useCallback(async (topicName) => {
    if (!username || !topicName) return null;
    
    try {
      const profile = await topicService.getAnnotationProfile(username, topicName);
      return profile;
    } catch (error) {
      console.error('❌ Erro ao carregar perfil de anotação:', error);
      return null;
    }
  }, [username]);

  // ============================================================================
  // HANDLERS PARA AÇÕES DO USUÁRIO
  // ============================================================================

  /**
   * Handle para mudança na seleção de tópico
   */
  const handleTopicChange = useCallback(async (topicName) => {
    setLocalSelectedTopic(topicName);
    
    if (!topicName || !username) {
      topicStore.clearTopicData();
      return;
    }

    setLoading(true);
    topicStore.setLoading(true);
    
    try {
      // Garantir que topicName seja uma string
      const topicNameStr = typeof topicName === 'string' ? topicName : topicName?.name || topicName?.id || String(topicName);
      
      // Carregar perfil de anotação
      const profile = await loadAnnotationProfile(topicNameStr);
      
      // Encontrar entidade Topic na lista
      const topicEntity = topics.find(topic => 
        topic.name === topicNameStr || topic.id === topicNameStr
      );
      
      // Selecionar tópico no store
      topicStore.selectTopic(topicEntity || topicNameStr, profile);
      
      
    } catch (error) {
      console.error('❌ Erro ao selecionar tópico:', error);
      const errorMsg = error.message || 'Erro ao selecionar tópico';
      setError(errorMsg);
      topicStore.setError(errorMsg);
    } finally {
      setLoading(false);
      topicStore.setLoading(false);
    }
  }, [username, topics, topicStore, loadAnnotationProfile]);

  /**
   * Handle para confirmar seleção e continuar
   */
  const handleConfirm = useCallback(() => {
    if (!selectedTopic) {
      setError('Selecione um tópico para continuar');
      return;
    }
    
    // Atualizar fluxo
    flowStore.topicHelpers.onTopicSelected({
      topic: selectedTopic,
      annotationProfile
    });
    
    // Navegar para próxima etapa (fluxo sequencial: 2→3 KeyphraseClusteringPage)
    navigate('/clustering');
    
  }, [selectedTopic, annotationProfile, topics, flowStore, navigate]);

  /**
   * Handle para logout
   */
  const handleLogout = useCallback(() => {
    authStore.logout();
    topicStore.reset();
    flowStore.reset();
    navigate('/login');
  }, [authStore, topicStore, flowStore, navigate]);

  /**
   * Recarrega lista de tópicos
   */
  const handleRefresh = useCallback(() => {
    loadTopics();
  }, [loadTopics]);

  /**
   * Limpa seleção atual
   */
  const handleClearSelection = useCallback(() => {
    setLocalSelectedTopic('');
    topicStore.clearTopicData();
    setError('');
  }, [topicStore]);

  // ============================================================================
  // VALIDAÇÕES E ESTADO DERIVADO
  // ============================================================================

  /**
   * Verifica se pode confirmar seleção
   */
  const canConfirm = useCallback(() => {
    return !loading && 
           selectedTopic !== null && 
           localSelectedTopic !== '';
  }, [loading, selectedTopic, localSelectedTopic]);

  /**
   * Verifica se está carregando dados
   */
  const isLoading = useCallback(() => {
    return loading || topicStore.loading;
  }, [loading, topicStore.loading]);

  /**
   * Obtém erro atual
   */
  const getCurrentError = useCallback(() => {
    return error || topicStore.error;
  }, [error, topicStore.error]);

  /**
   * Formata perfil de anotação para exibição
   */
  const getFormattedProfile = useCallback(() => {
    if (!annotationProfile) return null;
    
    if (typeof annotationProfile === 'string') {
      return annotationProfile;
    }
    
    if (typeof annotationProfile === 'object') {
      // Extrair informações relevantes
      const info = [];
      if (annotationProfile.task_type) {
        info.push(`Tipo: ${annotationProfile.task_type}`);
      }
      if (annotationProfile.clusters_count) {
        info.push(`Clusters: ${annotationProfile.clusters_count}`);
      }
      if (annotationProfile.keyphrases_count) {
        info.push(`Keyphrases: ${annotationProfile.keyphrases_count}`);
      }
      
      return info.length > 0 ? info.join(' | ') : JSON.stringify(annotationProfile);
    }
    
    return String(annotationProfile);
  }, [annotationProfile]);

  // ============================================================================
  // ESTADO E AÇÕES PARA A VIEW
  // ============================================================================

  const viewState = {
    // Dados dos tópicos
    topics,
    selectedTopic,
    localSelectedTopic,
    annotationProfile,
    formattedProfile: getFormattedProfile(),
    
    // Estado do usuário
    user,
    username,
    isAuthenticated,
    
    // Estado de loading e erro
    loading: isLoading(),
    error: getCurrentError(),
    
    // Estado de validação
    canConfirm: canConfirm(),
    hasTopics: topics.length > 0,
    hasSelection: selectedTopic !== null,
  };

  const viewActions = {
    // Handlers principais (com nomes esperados pela View)
    onTopicChange: handleTopicChange,
    onConfirm: handleConfirm,
    onLogout: handleLogout,
    
    // Handlers de utilitários
    onRefresh: handleRefresh,
    onClearSelection: handleClearSelection,
    
    // Carregamento de dados
    loadTopics,
  };

  // ============================================================================
  // DEBUG INFO
  // ============================================================================
  
  const debugInfo = {
    stores: {
      auth: {
        isAuthenticated: authStore.isAuthenticated,
        username: authStore.user?.username,
        hasUser: !!authStore.user
      },
      topic: {
        topicsCount: topics.length,
        hasSelectedTopic: !!selectedTopic,
        hasProfile: !!annotationProfile,
        loading: topicStore.loading,
        error: topicStore.error
      },
      flow: {
        currentStep: flowStore.currentStep,
        completedSteps: flowStore.completedSteps
      }
    },
    localState: {
      localSelectedTopic,
      loading,
      error,
      canConfirm: canConfirm()
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