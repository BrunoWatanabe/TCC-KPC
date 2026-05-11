// Tipos base para o sistema de curadoria
export interface KeyphraseData {
  id: number;
  text: string;
  source: string;
  clusterId?: number;
  isSelected?: boolean;
  selectionPriority?: number;
}

export interface ClusterData {
  id: number;
  keyphrases: number[];
  isSelected: boolean;
  primaryKeyphrase?: number;
  secondaryKeyphrase?: number;
  alias?: string;
}

export interface CurationMetadata {
  topic: string;
  annotator: string;
  phase: 'clustering' | 'cluster_selection' | 'keyphrase_selection';
  progress: {
    clustering_complete: boolean;
    cluster_selection_complete: boolean;
    keyphrase_selection_complete: boolean;
  };
}

export interface RawKeyphraseData {
  keyphrase: string;
  collected_from: string;
}

export interface RawClusterData {
  keyphrases: number[];
  selected: number;
  keyphrase1_selected: number;
  keyphrase2_selected: number;
  alias: string;
}

export interface RawCurationData {
  keyphrases: Record<string, RawKeyphraseData>;
  clusters: Record<string, RawClusterData>;
}

// Tipos para diferentes formatos de dados
export interface SimpleClusteringFormat {
  [id: string]: {
    description: string;
    cluster: number;
  };
}

/**
 * ViewModel principal para o sistema de curadoria de keyphrases
 * Encapsula toda a lógica de transformação, validação e estado
 */
export class KeyphraseCurationViewModel {
  private _keyphrases: Map<number, KeyphraseData> = new Map();
  private _clusters: Map<number, ClusterData> = new Map();
  private _metadata: CurationMetadata;

  constructor(metadata: CurationMetadata) {
    this._metadata = { ...metadata };
  }

  // Getters para acesso aos dados
  get keyphrases(): ReadonlyMap<number, KeyphraseData> {
    return this._keyphrases;
  }

  get clusters(): ReadonlyMap<number, ClusterData> {
    return this._clusters;
  }

  get metadata(): Readonly<CurationMetadata> {
    return this._metadata;
  }

  // Métodos de carregamento de dados
  static fromRawData(rawData: RawCurationData, metadata: CurationMetadata): KeyphraseCurationViewModel {
    const viewModel = new KeyphraseCurationViewModel(metadata);
    
    // Carrega keyphrases
    Object.entries(rawData.keyphrases).forEach(([id, data]) => {
      viewModel._keyphrases.set(Number(id), {
        id: Number(id),
        text: data.keyphrase,
        source: data.collected_from,
      });
    });

    // Carrega clusters
    Object.entries(rawData.clusters).forEach(([id, data]) => {
      viewModel._clusters.set(Number(id), {
        id: Number(id),
        keyphrases: data.keyphrases,
        isSelected: data.selected === 1,
        primaryKeyphrase: data.keyphrase1_selected || undefined,
        secondaryKeyphrase: data.keyphrase2_selected || undefined,
        alias: data.alias || undefined,
      });
    });

    // Atualiza as keyphrases com informações de cluster
    viewModel._updateKeyphrasesClusterInfo();
    
    return viewModel;
  }

  static fromSimpleFormat(simpleData: SimpleClusteringFormat, metadata: CurationMetadata): KeyphraseCurationViewModel {
    const viewModel = new KeyphraseCurationViewModel(metadata);
    
    // Carrega keyphrases do formato simples
    Object.entries(simpleData).forEach(([id, data]) => {
      viewModel._keyphrases.set(Number(id), {
        id: Number(id),
        text: data.description,
        source: 'imported',
        clusterId: data.cluster,
      });
    });

    // Gera clusters baseado nos dados
    viewModel._generateClustersFromKeyphrases();
    
    return viewModel;
  }

  // Métodos de transformação para diferentes formatos
  toSimpleFormat(): SimpleClusteringFormat {
    const result: SimpleClusteringFormat = {};
    
    this._keyphrases.forEach((keyphrase) => {
      result[keyphrase.id.toString()] = {
        description: keyphrase.text,
        cluster: keyphrase.clusterId || 0,
      };
    });

    return result;
  }

  toRawFormat(): RawCurationData {
    const keyphrases: Record<string, RawKeyphraseData> = {};
    const clusters: Record<string, RawClusterData> = {};

    // Converte keyphrases
    this._keyphrases.forEach((keyphrase) => {
      keyphrases[keyphrase.id.toString()] = {
        keyphrase: keyphrase.text,
        collected_from: keyphrase.source,
      };
    });

    // Converte clusters
    this._clusters.forEach((cluster) => {
      clusters[cluster.id.toString()] = {
        keyphrases: cluster.keyphrases,
        selected: cluster.isSelected ? 1 : 0,
        keyphrase1_selected: cluster.primaryKeyphrase || 0,
        keyphrase2_selected: cluster.secondaryKeyphrase || 0,
        alias: cluster.alias || '',
      };
    });

    return { keyphrases, clusters };
  }

  // Métodos de manipulação de clusters
  assignKeyphraseToCluster(keyphraseId: number, clusterId: number): boolean {
    const keyphrase = this._keyphrases.get(keyphraseId);
    const cluster = this._clusters.get(clusterId);

    if (!keyphrase || !cluster) {
      return false;
    }

    // Remove da cluster anterior se existir
    if (keyphrase.clusterId) {
      this._removeKeyphraseFromCluster(keyphraseId, keyphrase.clusterId);
    }

    // Adiciona na nova cluster
    keyphrase.clusterId = clusterId;
    if (!cluster.keyphrases.includes(keyphraseId)) {
      cluster.keyphrases.push(keyphraseId);
    }

    return true;
  }

  createCluster(keyphraseIds: number[]): number {
    const newClusterId = Math.max(...Array.from(this._clusters.keys()), 0) + 1;
    
    const newCluster: ClusterData = {
      id: newClusterId,
      keyphrases: [...keyphraseIds],
      isSelected: false,
    };

    this._clusters.set(newClusterId, newCluster);

    // Atualiza as keyphrases
    keyphraseIds.forEach(id => {
      const keyphrase = this._keyphrases.get(id);
      if (keyphrase) {
        keyphrase.clusterId = newClusterId;
      }
    });

    return newClusterId;
  }

  selectCluster(clusterId: number, selected: boolean): boolean {
    const cluster = this._clusters.get(clusterId);
    if (!cluster) return false;

    cluster.isSelected = selected;
    return true;
  }

  selectPrimaryKeyphrase(clusterId: number, keyphraseId: number): boolean {
    const cluster = this._clusters.get(clusterId);
    if (!cluster || !cluster.keyphrases.includes(keyphraseId)) {
      return false;
    }

    cluster.primaryKeyphrase = keyphraseId;
    return true;
  }

  // Métodos de consulta e filtros
  getKeyphrasesByCluster(clusterId: number): KeyphraseData[] {
    const cluster = this._clusters.get(clusterId);
    if (!cluster) return [];

    return cluster.keyphrases
      .map(id => this._keyphrases.get(id))
      .filter((kp): kp is KeyphraseData => kp !== undefined);
  }

  getUnclusteredKeyphrases(): KeyphraseData[] {
    return Array.from(this._keyphrases.values())
      .filter(kp => !kp.clusterId);
  }

  getSelectedClusters(): ClusterData[] {
    return Array.from(this._clusters.values())
      .filter(cluster => cluster.isSelected);
  }

  getSelectedKeyphrases(): KeyphraseData[] {
    return Array.from(this._keyphrases.values())
      .filter(kp => kp.isSelected);
  }

  // Métodos de progresso e validação
  updateProgress(): void {
    const totalKeyphrases = this._keyphrases.size;
    const clusteredKeyphrases = Array.from(this._keyphrases.values())
      .filter(kp => kp.clusterId).length;
    
    const totalClusters = this._clusters.size;
    const selectedClusters = this.getSelectedClusters().length;

    this._metadata.progress.clustering_complete = 
      totalKeyphrases > 0 && clusteredKeyphrases === totalKeyphrases;
    
    this._metadata.progress.cluster_selection_complete = 
      totalClusters > 0 && selectedClusters > 0;
    
    const selectedKeyphrases = this.getSelectedKeyphrases().length;
    this._metadata.progress.keyphrase_selection_complete = 
      selectedKeyphrases > 0;
  }

  getCompletionStats() {
    const totalKeyphrases = this._keyphrases.size;
    const clusteredKeyphrases = Array.from(this._keyphrases.values())
      .filter(kp => kp.clusterId).length;
    const totalClusters = this._clusters.size;
    const selectedClusters = this.getSelectedClusters().length;
    const selectedKeyphrases = this.getSelectedKeyphrases().length;

    return {
      clustering: {
        total: totalKeyphrases,
        completed: clusteredKeyphrases,
        percentage: totalKeyphrases > 0 ? (clusteredKeyphrases / totalKeyphrases) * 100 : 0,
      },
      clusterSelection: {
        total: totalClusters,
        completed: selectedClusters,
        percentage: totalClusters > 0 ? (selectedClusters / totalClusters) * 100 : 0,
      },
      keyphraseSelection: {
        total: selectedClusters,
        completed: selectedKeyphrases,
        percentage: selectedClusters > 0 ? (selectedKeyphrases / selectedClusters) * 100 : 0,
      },
    };
  }

  // Métodos utilitários privados
  private _updateKeyphrasesClusterInfo(): void {
    this._clusters.forEach((cluster) => {
      cluster.keyphrases.forEach((keyphraseId) => {
        const keyphrase = this._keyphrases.get(keyphraseId);
        if (keyphrase) {
          keyphrase.clusterId = cluster.id;
        }
      });
    });
  }

  private _generateClustersFromKeyphrases(): void {
    const clusterMap = new Map<number, number[]>();

    // Agrupa keyphrases por cluster ID
    this._keyphrases.forEach((keyphrase) => {
      if (keyphrase.clusterId !== undefined) {
        if (!clusterMap.has(keyphrase.clusterId)) {
          clusterMap.set(keyphrase.clusterId, []);
        }
        clusterMap.get(keyphrase.clusterId)!.push(keyphrase.id);
      }
    });

    // Cria clusters
    clusterMap.forEach((keyphraseIds, clusterId) => {
      this._clusters.set(clusterId, {
        id: clusterId,
        keyphrases: keyphraseIds,
        isSelected: false,
      });
    });
  }

  private _removeKeyphraseFromCluster(keyphraseId: number, clusterId: number): void {
    const cluster = this._clusters.get(clusterId);
    if (cluster) {
      cluster.keyphrases = cluster.keyphrases.filter(id => id !== keyphraseId);
      
      // Remove cluster se ficou vazio
      if (cluster.keyphrases.length === 0) {
        this._clusters.delete(clusterId);
      }
    }
  }

  // Método para clonagem profunda (útil para undo/redo)
  clone(): KeyphraseCurationViewModel {
    const cloned = new KeyphraseCurationViewModel(this._metadata);
    
    // Clona keyphrases
    this._keyphrases.forEach((keyphrase) => {
      cloned._keyphrases.set(keyphrase.id, { ...keyphrase });
    });

    // Clona clusters
    this._clusters.forEach((cluster) => {
      cloned._clusters.set(cluster.id, {
        ...cluster,
        keyphrases: [...cluster.keyphrases],
      });
    });

    return cloned;
  }

  // Método para serialização JSON
  toJSON() {
    return {
      metadata: this._metadata,
      keyphrases: Object.fromEntries(this._keyphrases),
      clusters: Object.fromEntries(this._clusters),
    };
  }
}