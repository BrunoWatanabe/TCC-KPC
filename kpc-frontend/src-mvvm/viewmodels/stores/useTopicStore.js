/**
 * useTopicStore - Store Zustand simplificado para tópicos
 * Baseado em src/stores/useTopicStore.js com arquitetura MVVM
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Topic } from '../../models/entities/Topic.js';

export const useTopicStore = create(
  persist(
    (set, get) => ({
      // ============================================================================
      // ESTADO DOS TÓPICOS
      // ============================================================================
      topics: [],                    // Array de entidades Topic
      selectedTopic: null,           // Entidade Topic selecionada
      annotationProfile: null,       // Dados do perfil de anotação
      loading: false,
      error: null,

      // ============================================================================
      // AÇÕES PARA TÓPICOS
      // ============================================================================

      /**
       * Define lista de tópicos
       */
      setTopics: (topics) => {
        // Converter para entidades Topic se necessário
        const topicEntities = topics.map(topicData => 
          topicData instanceof Topic 
            ? topicData 
            : Topic.fromApiResponse(topicData)
        ).filter(topic => topic !== null);

        set({ topics: topicEntities });
      },

      /**
       * Seleciona tópico e define perfil de anotação
       */
      selectTopic: (topic, annotationProfile = null) => {
        // Converter para entidade Topic se necessário
        const topicEntity = topic instanceof Topic 
          ? topic 
          : Topic.fromApiResponse(topic);

        set({
          selectedTopic: topicEntity,
          annotationProfile: annotationProfile,
          error: null,
        });
      },

      /**
       * Define estado de loading
       */
      setLoading: (loading) => {
        set({ loading });
      },

      /**
       * Define erro e para loading
       */
      setError: (error) => {
        set({ error, loading: false });
      },

      /**
       * Limpa erro atual
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Atualiza perfil de anotação do tópico selecionado
       */
      setAnnotationProfile: (annotationProfile) => {
        set({ annotationProfile });
      },

      /**
       * Atualiza dados de um tópico específico na lista
       */
      updateTopic: (topicId, updatedData) => {
        const topics = get().topics;
        const updatedTopics = topics.map(topic => {
          if (topic.id === topicId || topic.name === topicId) {
            return { ...topic, ...updatedData };
          }
          return topic;
        });
        
        set({ topics: updatedTopics });
      },

      // ============================================================================
      // GETTERS CONVENIENTES
      // ============================================================================

      /**
       * Obtém tópico selecionado
       */
      getSelectedTopic: () => get().selectedTopic,

      /**
       * Obtém perfil de anotação
       */
      getAnnotationProfile: () => get().annotationProfile,

      /**
       * Obtém lista de tópicos
       */
      getTopics: () => get().topics,

      /**
       * Busca tópico por ID ou nome
       */
      findTopicById: (topicId) => {
        const topics = get().topics;
        return topics.find(topic => 
          topic.id === topicId || topic.name === topicId
        );
      },

      /**
       * Verifica se há tópico selecionado
       */
      hasSelectedTopic: () => {
        return get().selectedTopic !== null;
      },

      /**
       * Obtém nome do tópico selecionado
       */
      getSelectedTopicName: () => {
        const topic = get().selectedTopic;
        return topic ? topic.name : null;
      },

      /**
       * Verifica se pode iniciar anotação no tópico selecionado
       */
      canStartAnnotation: () => {
        const topic = get().selectedTopic;
        return topic ? topic.canStartAnnotation() : false;
      },

      /**
       * Obtém tipo de tarefa do tópico selecionado
       */
      getTaskType: () => {
        const topic = get().selectedTopic;
        return topic ? topic.getTaskType() : null;
      },

      // ============================================================================
      // AÇÕES COMPOSTAS PARA MVVM
      // ============================================================================

      /**
       * Reset completo do store
       */
      reset: () => {
        set({
          topics: [],
          selectedTopic: null,
          annotationProfile: null,
          loading: false,
          error: null,
        });
      },

      /**
       * Inicializa store com dados do localStorage se válidos
       */
      initialize: () => {
        const state = get();
        
        // Recriar entidades Topic se necessário
        if (state.topics && Array.isArray(state.topics)) {
          const topicEntities = state.topics
            .map(topicData => {
              if (topicData instanceof Topic) {
                return topicData;
              }
              try {
                return Topic.fromJSON(topicData);
              } catch (error) {
                console.warn('Erro ao recriar entidade Topic:', error);
                return null;
              }
            })
            .filter(topic => topic !== null);
          
          set({ topics: topicEntities });
        }

        // Recriar entidade Topic selecionada se necessário
        if (state.selectedTopic && !(state.selectedTopic instanceof Topic)) {
          try {
            const topicEntity = Topic.fromJSON(state.selectedTopic);
            if (topicEntity) {
              set({ selectedTopic: topicEntity });
            } else {
              set({ selectedTopic: null });
            }
          } catch (error) {
            console.warn('Erro ao recriar tópico selecionado:', error);
            set({ selectedTopic: null });
          }
        }
      },

      /**
       * Limpa dados relacionados ao tópico específico
       */
      clearTopicData: () => {
        set({
          selectedTopic: null,
          annotationProfile: null,
          error: null,
        });
      },

      /**
       * Filtra tópicos por critérios
       */
      filterTopics: (filterFn) => {
        const topics = get().topics;
        return topics.filter(filterFn);
      },

      /**
       * Ordena tópicos por critério
       */
      sortTopics: (sortBy = 'name') => {
        const topics = get().topics;
        
        switch (sortBy) {
          case 'name':
            return [...topics].sort((a, b) => a.name.localeCompare(b.name));
          case 'id':
            return [...topics].sort((a, b) => a.id - b.id);
          case 'taskType':
            return [...topics].sort((a, b) => (a.getTaskType() || '').localeCompare(b.getTaskType() || ''));
          default:
            return topics;
        }
      },
    }),
    {
      name: 'topic-storage-mvvm', // Chave diferente para não conflitar
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedTopic: state.selectedTopic ? 
          (typeof state.selectedTopic.toJSON === 'function' ? 
            state.selectedTopic.toJSON() : 
            state.selectedTopic) : null,
        annotationProfile: state.annotationProfile,
        topics: state.topics.map(topic => 
          typeof topic.toJSON === 'function' ? topic.toJSON() : topic),
      }),
      onRehydrateStorage: () => (state) => {
        // Inicializar após carregar do localStorage
        if (state) {
          state.initialize();
        }
      },
    }
  )
);