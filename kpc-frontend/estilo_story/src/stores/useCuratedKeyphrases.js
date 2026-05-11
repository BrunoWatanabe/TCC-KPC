import { create } from 'zustand';

/**
 * Store Zustand puro para gerenciar o estado de keyphrases curadas
 */
export const useCuratedKeyphrases = create((set, get) => ({
  // Estado
  curatedKeyphrasesOrder: "source_cluster",
  curatedKeyphrases: {},
  keyphraseAlias: {},
  selectedClusters: {},
  curatedKeyphrasesLength: 10,

  // Actions
  setCuratedKeyphrasesOrder: (order) => set({ curatedKeyphrasesOrder: order }),
  
  setCuratedKeyphrases: (curatedKeyphrases) => set({ curatedKeyphrases }),
  
  setKeyphraseAlias: (keyphraseAlias) => set({ keyphraseAlias }),
  
  setSelectedClusters: (selectedClusters) => set({ selectedClusters }),
  
  setCuratedKeyphrasesLength: (length) => set({ curatedKeyphrasesLength: length }),

  // Action para salvar alias de uma keyphrase específica
  saveKeyphraseAlias: (clusterId, aliasValue) => set((state) => ({
    keyphraseAlias: {
      ...state.keyphraseAlias,
      [clusterId]: aliasValue
    }
  })),

  // Reset do estado
  reset: () => set({
    curatedKeyphrasesOrder: "source_cluster",
    curatedKeyphrases: {},
    keyphraseAlias: {},
    selectedClusters: {},
    curatedKeyphrasesLength: 10
  }),

  // Inicializar com dados
  initialize: (initialData) => set({
    curatedKeyphrasesOrder: initialData.curatedKeyphrasesOrder || "source_cluster",
    curatedKeyphrases: initialData.curatedKeyphrases || {},
    keyphraseAlias: initialData.keyphraseAlias || {},
    selectedClusters: initialData.selectedClusters || {},
    curatedKeyphrasesLength: initialData.curatedKeyphrasesLength || 10
  }),

  // Getter para estado completo (útil para callbacks)
  getState: () => {
    const state = get();
    return {
      curatedKeyphrasesOrder: state.curatedKeyphrasesOrder,
      curatedKeyphrases: state.curatedKeyphrases,
      keyphraseAlias: state.keyphraseAlias,
      selectedClusters: state.selectedClusters,
      curatedKeyphrasesLength: state.curatedKeyphrasesLength
    };
  }
}));