/**
 * Entidade Cluster - baseada no backend ReactPy (cluster.py) e useKeyphraseClusters.js
 * Representa um cluster de keyphrases com suas operações
 */
export class Cluster {
  constructor(id, keyphrases = []) {
    this.id = id;
    this.keyphrases = keyphrases || [];
    this.selected = false; // CS: 0 (não selecionado) / 1 (selecionado)
    this.selectedKeyphrases = {
      first: null,  // selected1
      second: null  // selected2
    };
    this.alias = ''; // Para curação final
    this.annotatorData = null; // Dados de outros anotadores
    this.cohesion = 0; // Coesão calculada do cluster
    this.order = id; // Ordem para exibição
  }

  /**
   * Adiciona keyphrase ao cluster
   * Baseado na lógica do backend cluster.py
   */
  addKeyphrase(keyphrase) {
    if (!keyphrase || this.hasKeyphrase(keyphrase.id)) {
      return this;
    }
    
    this.keyphrases.push(keyphrase);
    keyphrase.assignToCluster(this.id);
    
    // Recalcular coesão quando adiciona keyphrase
    this._recalculateCohesion();
    
    return this;
  }

  /**
   * Remove keyphrase do cluster
   */
  removeKeyphrase(keyphraseId) {
    const initialLength = this.keyphrases.length;
    this.keyphrases = this.keyphrases.filter(kp => kp.id !== keyphraseId);
    
    // Se removeu alguma, recalcular coesão
    if (this.keyphrases.length !== initialLength) {
      this._recalculateCohesion();
      
      // Limpar seleções se a keyphrase removida estava selecionada
      if (this.selectedKeyphrases.first?.id === keyphraseId) {
        this.selectedKeyphrases.first = null;
      }
      if (this.selectedKeyphrases.second?.id === keyphraseId) {
        this.selectedKeyphrases.second = null;
      }
    }
    
    return this;
  }

  /**
   * Verifica se cluster contém uma keyphrase específica
   */
  hasKeyphrase(keyphraseId) {
    return this.keyphrases.some(kp => kp.id === keyphraseId);
  }

  /**
   * Obtém número de keyphrases no cluster
   */
  getKeyphraseCount() {
    return this.keyphrases.length;
  }

  /**
   * Calcula coesão do cluster baseada na similaridade par-a-par
   * Baseado em: backend/cluster.py cluster cohesion calculations
   */
  calculateCohesion() {
    if (this.keyphrases.length < 2) {
      return 0;
    }
    
    let totalSimilarity = 0;
    let pairCount = 0;
    
    // Calcular similaridade para todos os pares
    for (let i = 0; i < this.keyphrases.length; i++) {
      for (let j = i + 1; j < this.keyphrases.length; j++) {
        const similarity = this.keyphrases[i].calculateSimilarityWith(this.keyphrases[j]);
        totalSimilarity += similarity;
        pairCount++;
      }
    }
    
    const cohesion = pairCount > 0 ? totalSimilarity / pairCount : 0;
    this.cohesion = cohesion;
    
    return cohesion;
  }

  /**
   * Recalcula coesão internamente
   */
  _recalculateCohesion() {
    this.calculateCohesion();
  }

  /**
   * Obtém similaridade par-a-par média
   * Baseado no padrão do backend cluster.py
   */
  getPairwiseSimilarity() {
    return this.cohesion;
  }

  /**
   * Calcula similaridade com centroide do cluster
   * Baseado em: backend/cluster.py centroid similarity
   */
  getCentroidSimilarity() {
    if (this.keyphrases.length === 0) {
      return 0;
    }
    
    // Se só tem uma keyphrase, similaridade com centroide é 1
    if (this.keyphrases.length === 1) {
      return 1;
    }
    
    // Calcular centroide se todas as keyphrases têm embeddings
    const embeddingsAvailable = this.keyphrases.every(kp => kp.embedding);
    
    if (embeddingsAvailable) {
      const centroid = this._calculateCentroid();
      if (centroid) {
        // Calcular similaridade média de cada keyphrase com o centroide
        let totalSimilarity = 0;
        
        for (const keyphrase of this.keyphrases) {
          const similarity = keyphrase._cosineSimilarity(keyphrase.embedding, centroid);
          totalSimilarity += similarity;
        }
        
        return totalSimilarity / this.keyphrases.length;
      }
    }
    
    // Fallback: usar coesão par-a-par
    return this.cohesion;
  }

  /**
   * Calcula centroide dos embeddings das keyphrases
   */
  _calculateCentroid() {
    if (this.keyphrases.length === 0 || !this.keyphrases[0].embedding) {
      return null;
    }
    
    const embeddingSize = this.keyphrases[0].embedding.length;
    const centroid = new Array(embeddingSize).fill(0);
    
    // Somar todos os embeddings
    for (const keyphrase of this.keyphrases) {
      if (keyphrase.embedding) {
        for (let i = 0; i < embeddingSize; i++) {
          centroid[i] += keyphrase.embedding[i];
        }
      }
    }
    
    // Dividir pela quantidade para obter média
    for (let i = 0; i < embeddingSize; i++) {
      centroid[i] /= this.keyphrases.length;
    }
    
    return centroid;
  }

  /**
   * Verifica se cluster está vazio
   */
  isEmpty() {
    return this.keyphrases.length === 0;
  }

  /**
   * Verifica se cluster está selecionado (CS = 1)
   */
  isSelected() {
    return this.selected;
  }

  /**
   * Define seleção do cluster (CS: 0/1)
   * Baseado em: useKeyphraseClusters.js updateClusterSelection
   */
  setSelected(selected) {
    this.selected = !!selected;
    return this;
  }

  /**
   * Toggle seleção do cluster
   */
  toggleSelection() {
    this.selected = !this.selected;
    return this;
  }

  /**
   * Seleciona keyphrase em uma posição específica (1 ou 2)
   * Baseado em: useKeyphraseClusters.js updateKeyphrase1Selection, updateKeyphrase2Selection
   */
  selectKeyphrase(order, keyphraseId) {
    const keyphrase = this.keyphrases.find(kp => kp.id === keyphraseId);
    if (!keyphrase) {
      return this;
    }
    
    if (order === 1 || order === 'first') {
      this.selectedKeyphrases.first = keyphrase;
      keyphrase.setSelected(true, 'first');
    } else if (order === 2 || order === 'second') {
      this.selectedKeyphrases.second = keyphrase;
      keyphrase.setSelected(true, 'second');
    }
    
    return this;
  }

  /**
   * Obtém keyphrase selecionada em uma posição específica
   */
  getSelectedKeyphrase(order) {
    if (order === 1 || order === 'first') {
      return this.selectedKeyphrases.first;
    } else if (order === 2 || order === 'second') {
      return this.selectedKeyphrases.second;
    }
    return null;
  }

  /**
   * Verifica se tem keyphrase selecionada na posição
   */
  hasSelectedKeyphrase(order) {
    return this.getSelectedKeyphrase(order) !== null;
  }

  /**
   * Obtém keyphrase mais representativa (primeira ou com maior similaridade média)
   */
  getRepresentativeKeyphrase() {
    if (this.keyphrases.length === 0) {
      return null;
    }
    
    if (this.keyphrases.length === 1) {
      return this.keyphrases[0];
    }
    
    // Se tem keyphrase selecionada, usar ela
    if (this.selectedKeyphrases.first) {
      return this.selectedKeyphrases.first;
    }
    
    // Senão, encontrar a com maior similaridade média com as outras
    let bestKeyphrase = this.keyphrases[0];
    let bestSimilarity = 0;
    
    for (const keyphrase of this.keyphrases) {
      let totalSimilarity = 0;
      let count = 0;
      
      for (const other of this.keyphrases) {
        if (other.id !== keyphrase.id) {
          totalSimilarity += keyphrase.calculateSimilarityWith(other);
          count++;
        }
      }
      
      const avgSimilarity = count > 0 ? totalSimilarity / count : 0;
      if (avgSimilarity > bestSimilarity) {
        bestSimilarity = avgSimilarity;
        bestKeyphrase = keyphrase;
      }
    }
    
    return bestKeyphrase;
  }

  /**
   * Valida se pode selecionar uma keyphrase específica
   */
  canSelectKeyphrase(keyphraseId) {
    return this.hasKeyphrase(keyphraseId);
  }

  /**
   * Define alias para curação
   */
  setAlias(alias) {
    this.alias = alias || '';
    return this;
  }

  /**
   * Obtém alias para curação
   */
  getAlias() {
    return this.alias;
  }

  /**
   * Verifica se tem alias definido
   */
  hasAlias() {
    return this.alias && this.alias.trim() !== '';
  }

  /**
   * Converte para objeto JSON para armazenamento
   */
  toJSON() {
    return {
      id: this.id,
      keyphrases: this.keyphrases.map(kp => kp.toJSON()),
      selected: this.selected,
      selectedKeyphrases: {
        first: this.selectedKeyphrases.first?.toJSON() || null,
        second: this.selectedKeyphrases.second?.toJSON() || null
      },
      alias: this.alias,
      cohesion: this.cohesion,
      order: this.order
    };
  }

  /**
   * Cria instância Cluster a partir de dados JSON
   */
  static fromJSON(data) {
    if (!data || data.id === undefined) {
      return null;
    }
    
    const cluster = new Cluster(data.id, []);
    
    // Recriar keyphrases
    if (data.keyphrases) {
      const { Keyphrase } = require('./Keyphrase.js');
      cluster.keyphrases = data.keyphrases
        .map(kpData => Keyphrase.fromJSON(kpData))
        .filter(kp => kp !== null);
    }
    
    cluster.selected = !!data.selected;
    cluster.alias = data.alias || '';
    cluster.cohesion = data.cohesion || 0;
    cluster.order = data.order || data.id;
    
    // Recriar seleções
    if (data.selectedKeyphrases) {
      if (data.selectedKeyphrases.first) {
        const firstKp = cluster.keyphrases.find(kp => kp.id === data.selectedKeyphrases.first.id);
        if (firstKp) cluster.selectedKeyphrases.first = firstKp;
      }
      if (data.selectedKeyphrases.second) {
        const secondKp = cluster.keyphrases.find(kp => kp.id === data.selectedKeyphrases.second.id);
        if (secondKp) cluster.selectedKeyphrases.second = secondKp;
      }
    }
    
    return cluster;
  }
}