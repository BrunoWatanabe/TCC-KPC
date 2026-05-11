import { create } from 'zustand';

/**
 * Store Zustand puro para gerenciar o estado de clusters de keyphrases
 */
export const useKeyphraseClusters = create((set, get) => ({
  // Estado
  clusters: {},
  selectedClusters: {},
  selectedKeyphrases: {},
  clustersAnnotatorsData: {},
  clustersInfo: "",
  clusterOrder: "numerical",
  hideSourceKeyphrases: false,

  // Actions
  setClusters: (clusters) => set({ clusters }),
  
  setSelectedClusters: (selectedClusters) => set({ selectedClusters }),
  
  setSelectedKeyphrases: (selectedKeyphrases) => set({ selectedKeyphrases }),
  
  setClustersAnnotatorsData: (data) => set({ clustersAnnotatorsData: data }),
  
  setClustersInfo: (info) => set({ clustersInfo: info }),
  
  setClusterOrder: (order) => set({ clusterOrder: order }),
  
  setHideSourceKeyphrases: (hide) => set({ hideSourceKeyphrases: hide }),

  // Action para atualizar seleção de cluster
  updateClusterSelection: (clusterId, selection) => set((state) => ({
    selectedClusters: {
      ...state.selectedClusters,
      [clusterId]: selection
    }
  })),

  // Action para atualizar primeira keyphrase selecionada
  updateKeyphrase1Selection: (clusterId, keyphraseId) => set((state) => ({
    selectedKeyphrases: {
      ...state.selectedKeyphrases,
      [clusterId]: {
        ...state.selectedKeyphrases[clusterId],
        selected1: keyphraseId
      }
    }
  })),

  // Action para atualizar segunda keyphrase selecionada
  updateKeyphrase2Selection: (clusterId, keyphraseId) => set((state) => ({
    selectedKeyphrases: {
      ...state.selectedKeyphrases,
      [clusterId]: {
        ...state.selectedKeyphrases[clusterId],
        selected2: keyphraseId
      }
    }
  })),

  // Reset do estado
  reset: () => set({
    clusters: {},
    selectedClusters: {},
    selectedKeyphrases: {},
    clustersAnnotatorsData: {},
    clustersInfo: "",
    clusterOrder: "numerical",
    hideSourceKeyphrases: false
  }),

  // Inicializar com dados
  initialize: (initialData) => set({
    clusters: initialData.clusters || {},
    selectedClusters: initialData.selectedClusters || {},
    selectedKeyphrases: initialData.selectedKeyphrases || {},
    clustersAnnotatorsData: initialData.clustersAnnotatorsData || {},
    clustersInfo: initialData.clustersInfo || "",
    clusterOrder: initialData.clusterOrder || "numerical",
    hideSourceKeyphrases: initialData.hideSourceKeyphrases || false
  }),

  // Getter para estado completo (útil para callbacks)
  getState: () => {
    const state = get();
    return {
      clusters: state.clusters,
      selectedClusters: state.selectedClusters,
      selectedKeyphrases: state.selectedKeyphrases,
      clustersAnnotatorsData: state.clustersAnnotatorsData,
      clustersInfo: state.clustersInfo,
      clusterOrder: state.clusterOrder,
      hideSourceKeyphrases: state.hideSourceKeyphrases
    };
  }
}));