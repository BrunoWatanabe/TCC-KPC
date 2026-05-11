/**
 * useFlowStore - Store Zustand simplificado para controle de fluxo
 * Baseado em src/stores/useFlowStore.js com arquitetura MVVM
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Estados das etapas do fluxo MVVM
export const FlowStep = {
  LOGIN: 'LOGIN',
  TOPIC_SELECT: 'TOPIC_SELECT',
  KEYPHRASE_CLUSTERING: 'KEYPHRASE_CLUSTERING',
  KEYPHRASE_CLUSTERS: 'KEYPHRASE_CLUSTERS',
  CURATED_KEYPHRASES: 'CURATED_KEYPHRASES',
};

export const useFlowStore = create(
  persist(
    (set, get) => ({
      // ============================================================================
      // ESTADO DO FLUXO
      // ============================================================================
      currentStep: FlowStep.LOGIN,
      completedSteps: [],
      flowData: {},
      error: null,
      loading: false,

      // ============================================================================
      // AÇÕES DE CONTROLE DE FLUXO
      // ============================================================================

      /**
       * Define a etapa atual do fluxo
       */
      setCurrentStep: (step) => {
        // Validar se é uma etapa válida
        if (!Object.values(FlowStep).includes(step)) {
          console.warn('Etapa inválida:', step);
          return;
        }

        set({ currentStep: step, error: null });
      },

      /**
       * Marca uma etapa como completada
       */
      markStepCompleted: (step) => {
        const completedSteps = get().completedSteps;
        
        if (!completedSteps.includes(step)) {
          set({ 
            completedSteps: [...completedSteps, step]
          });
        }
      },

      /**
       * Verifica se uma etapa foi completada
       */
      isStepCompleted: (step) => {
        const completedSteps = get().completedSteps;
        return completedSteps.includes(step);
      },

      /**
       * Obtém próxima etapa do fluxo
       */
      getNextStep: (currentStep = null) => {
        const step = currentStep || get().currentStep;
        const steps = Object.values(FlowStep);
        const currentIndex = steps.indexOf(step);
        
        return currentIndex < steps.length - 1 
          ? steps[currentIndex + 1] 
          : null;
      },

      /**
       * Obtém etapa anterior do fluxo
       */
      getPreviousStep: (currentStep = null) => {
        const step = currentStep || get().currentStep;
        const steps = Object.values(FlowStep);
        const currentIndex = steps.indexOf(step);
        
        return currentIndex > 0 
          ? steps[currentIndex - 1] 
          : null;
      },

      /**
       * Avança para próxima etapa
       */
      goToNextStep: () => {
        const currentStep = get().currentStep;
        const nextStep = get().getNextStep();
        
        if (nextStep) {
          get().markStepCompleted(currentStep);
          get().setCurrentStep(nextStep);
        }
      },

      /**
       * Retorna para etapa anterior
       */
      goToPreviousStep: () => {
        const previousStep = get().getPreviousStep();
        
        if (previousStep) {
          get().setCurrentStep(previousStep);
        }
      },

      /**
       * Pula para uma etapa específica
       */
      goToStep: (step) => {
        if (Object.values(FlowStep).includes(step)) {
          get().setCurrentStep(step);
        }
      },

      // ============================================================================
      // GERENCIAMENTO DE DADOS DO FLUXO
      // ============================================================================

      /**
       * Define dados do fluxo
       */
      setFlowData: (data) => {
        const currentData = get().flowData;
        set({ 
          flowData: { ...currentData, ...data }
        });
      },

      /**
       * Obtém dados do fluxo
       */
      getFlowData: (key = null) => {
        const flowData = get().flowData;
        return key ? flowData[key] : flowData;
      },

      /**
       * Remove dados específicos do fluxo
       */
      removeFlowData: (key) => {
        const flowData = get().flowData;
        const newData = { ...flowData };
        delete newData[key];
        set({ flowData: newData });
      },

      /**
       * Limpa todos os dados do fluxo
       */
      clearFlowData: () => {
        set({ flowData: {} });
      },

      // ============================================================================
      // ESTADO DE LOADING E ERRO
      // ============================================================================

      /**
       * Define estado de loading
       */
      setLoading: (loading) => {
        set({ loading });
      },

      /**
       * Define erro
       */
      setError: (error) => {
        set({ error, loading: false });
      },

      /**
       * Limpa erro
       */
      clearError: () => {
        set({ error: null });
      },

      // ============================================================================
      // AÇÕES COMPOSTAS PARA MVVM
      // ============================================================================

      /**
       * Reset completo do fluxo (logout)
       */
      reset: () => {
        set({
          currentStep: FlowStep.LOGIN,
          completedSteps: [],
          flowData: {},
          error: null,
          loading: false,
        });
      },

      /**
       * Inicializa fluxo baseado no estado de autenticação
       */
      initializeFlow: (isAuthenticated, hasSelectedTopic = false) => {
        if (!isAuthenticated) {
          get().setCurrentStep(FlowStep.LOGIN);
        } else if (!hasSelectedTopic) {
          get().setCurrentStep(FlowStep.TOPIC_SELECT);
        } else {
          // Se já tem tópico, ir para primeira etapa de trabalho
          get().setCurrentStep(FlowStep.KEYPHRASE_CLUSTERING);
        }
      },

      /**
       * Verifica se pode avançar para próxima etapa
       */
      canGoToNextStep: () => {
        const currentStep = get().currentStep;
        const nextStep = get().getNextStep();
        return nextStep !== null;
      },

      /**
       * Verifica se pode retornar para etapa anterior
       */
      canGoToPreviousStep: () => {
        const previousStep = get().getPreviousStep();
        return previousStep !== null;
      },

      /**
       * Obtém progresso do fluxo (porcentagem)
       */
      getFlowProgress: () => {
        const steps = Object.values(FlowStep);
        const currentStep = get().currentStep;
        const currentIndex = steps.indexOf(currentStep);
        
        return ((currentIndex + 1) / steps.length) * 100;
      },

      /**
       * Obtém lista de etapas com status
       */
      getStepsWithStatus: () => {
        const steps = Object.values(FlowStep);
        const currentStep = get().currentStep;
        const completedSteps = get().completedSteps;
        
        return steps.map(step => ({
          step,
          isCurrent: step === currentStep,
          isCompleted: completedSteps.includes(step),
          isAccessible: completedSteps.includes(step) || step === currentStep
        }));
      },

      // ============================================================================
      // HELPERS PARA CADA ETAPA
      // ============================================================================

      /**
       * Helpers específicos para Login
       */
      loginHelpers: {
        onLoginSuccess: () => {
          get().markStepCompleted(FlowStep.LOGIN);
          get().setCurrentStep(FlowStep.TOPIC_SELECT);
        },
        onLoginError: (error) => {
          get().setError(error);
        }
      },

      /**
       * Helpers específicos para seleção de tópico
       */
      topicHelpers: {
        onTopicSelected: (topicData) => {
          get().setFlowData({ selectedTopic: topicData });
          get().markStepCompleted(FlowStep.TOPIC_SELECT);
          get().setCurrentStep(FlowStep.KEYPHRASE_CLUSTERING);
        },
        onBackToLogin: () => {
          get().setCurrentStep(FlowStep.LOGIN);
        }
      },

      /**
       * Helpers específicos para clustering
       */
      clusteringHelpers: {
        onClusteringComplete: () => {
          get().markStepCompleted(FlowStep.KEYPHRASE_CLUSTERING);
          get().setCurrentStep(FlowStep.KEYPHRASE_CLUSTERS);
        },
        onBackToTopicSelect: () => {
          get().setCurrentStep(FlowStep.TOPIC_SELECT);
        }
      },

      /**
       * Helpers específicos para clusters
       */
      clustersHelpers: {
        onClustersComplete: () => {
          get().markStepCompleted(FlowStep.KEYPHRASE_CLUSTERS);
          get().setCurrentStep(FlowStep.CURATED_KEYPHRASES);
        },
        onBackToClustering: () => {
          get().setCurrentStep(FlowStep.KEYPHRASE_CLUSTERING);
        }
      },

      /**
       * Helpers específicos para curação final
       */
      curationHelpers: {
        onCurationComplete: () => {
          get().markStepCompleted(FlowStep.CURATED_KEYPHRASES);
          // Aqui poderia redirecionar ou mostrar tela de sucesso
        },
        onBackToClusters: () => {
          get().setCurrentStep(FlowStep.KEYPHRASE_CLUSTERS);
        }
      },
    }),
    {
      name: 'flow-storage-mvvm', // Chave diferente para não conflitar
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        flowData: state.flowData,
      }),
    }
  )
);