import { create } from 'zustand';

/**
 * Store Zustand puro para gerenciar o estado de clustering de keyphrases
 */
export const useKeyphraseClustering = create((set, get) => ({
  // Estado
  clusters: {},
  keyphraseClustering: {},
  hideClustered: false,
  keyphraseOrder: "alphabetical",

  // Actions
  setClusters: (clusters) => set({ clusters }),
  
  setKeyphraseClustering: (keyphraseClustering) => set({ keyphraseClustering }),
  
  setHideClustered: (hideClustered) => set({ hideClustered }),
  
  setKeyphraseOrder: (keyphraseOrder) => set({ keyphraseOrder }),

  // Action complexa para atualizar clustering de uma keyphrase específica
  updateKeyphraseClustering: (key, clusterIndex) => set((state) => ({
    keyphraseClustering: {
      ...state.keyphraseClustering,
      [key]: {
        ...state.keyphraseClustering[key],
        clustering: clusterIndex
      }
    }
  })),

  // Reset do estado
  reset: () => set({
    clusters: {},
    keyphraseClustering: {},
    hideClustered: false,
    keyphraseOrder: "alphabetical"
  }),

  // Inicializar com dados
  initialize: (initialData) => set({
    clusters: initialData.clusters || {},
    keyphraseClustering: initialData.keyphraseClustering || {},
    hideClustered: initialData.hideClustered || false,
    keyphraseOrder: initialData.keyphraseOrder || "alphabetical"
  }),

  // Getter para estado completo (útil para callbacks)
  getState: () => {
    const state = get();
    return {
      clusters: state.clusters,
      keyphraseClustering: state.keyphraseClustering,
      hideClustered: state.hideClustered,
      keyphraseOrder: state.keyphraseOrder
    };
  }
}));