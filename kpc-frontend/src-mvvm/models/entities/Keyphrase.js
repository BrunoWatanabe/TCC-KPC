/**
 * Entidade Keyphrase - baseada no backend ReactPy (keyphrase.py) e useKeyphraseClustering.js
 * Representa uma keyphrase do sistema com suas propriedades de clustering
 */
export class Keyphrase {
  constructor(id, content, preprocessedContent = null, embedding = null) {
    this.id = id;
    this.content = content;
    this.preprocessedContent = preprocessedContent || content;
    this.embedding = embedding;
    this.clusterId = 0; // 0 = não clusterizada, > 0 = ID do cluster
    this.similarityScores = new Map(); // Cache de similaridades com outras keyphrases
    
    // Propriedades adicionais do frontend
    this.selected = false;
    this.order = null; // Para ordenação (selected1, selected2, etc.)
  }

  /**
   * Verifica se a keyphrase está em algum cluster
   * Baseado em: useKeyphraseClustering.js updateKeyphraseClustering
   */
  isInCluster() {
    return this.clusterId > 0;
  }

  /**
   * Atribui keyphrase a um cluster específico
   * Baseado na lógica do frontend atual
   */
  assignToCluster(clusterId) {
    const previousClusterId = this.clusterId;
    this.clusterId = parseInt(clusterId) || 0;
    
    // Limpar cache de similaridades quando muda de cluster
    if (previousClusterId !== this.clusterId) {
      this.similarityScores.clear();
    }
    
    return this;
  }

  /**
   * Calcula similaridade com outra keyphrase usando embeddings
   * Baseado em: backend/keyphrase.py PairwiseSimilarity
   */
  calculateSimilarityWith(otherKeyphrase) {
    if (!otherKeyphrase || otherKeyphrase.id === this.id) {
      return 0;
    }
    
    // Verificar cache primeiro
    const cacheKey = `${Math.min(this.id, otherKeyphrase.id)}-${Math.max(this.id, otherKeyphrase.id)}`;
    if (this.similarityScores.has(cacheKey)) {
      return this.similarityScores.get(cacheKey);
    }
    
    let similarity = 0;
    
    // Se ambas têm embeddings, calcular similaridade do cosseno
    if (this.embedding && otherKeyphrase.embedding) {
      similarity = this._cosineSimilarity(this.embedding, otherKeyphrase.embedding);
    }
    // Senão, usar similaridade baseada em texto
    else {
      similarity = this._textSimilarity(this.preprocessedContent, otherKeyphrase.preprocessedContent);
    }
    
    // Cachear resultado
    this.similarityScores.set(cacheKey, similarity);
    
    return similarity;
  }

  /**
   * Calcula similaridade do cosseno entre dois vetores de embedding
   * Baseado no padrão usado no backend Python
   */
  _cosineSimilarity(vectorA, vectorB) {
    if (!vectorA || !vectorB || vectorA.length !== vectorB.length) {
      return 0;
    }
    
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    
    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      magnitudeA += vectorA[i] * vectorA[i];
      magnitudeB += vectorB[i] * vectorB[i];
    }
    
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    
    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }
    
    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Calcula similaridade baseada em texto (fallback)
   */
  _textSimilarity(textA, textB) {
    if (!textA || !textB) {
      return 0;
    }
    
    const setA = new Set(textA.toLowerCase().split(/\s+/));
    const setB = new Set(textB.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    
    return intersection.size / union.size; // Jaccard similarity
  }

  /**
   * Obtém descrição formatada da keyphrase
   * Baseado em: backend/keyphrase.py get_description()
   */
  getDescription(showId = true, complement = null) {
    let description = showId ? `${this.content}(${this.id})` : this.content;
    
    if (complement) {
      description += `: ${complement}`;
    }
    
    return description;
  }

  /**
   * Verifica se a keyphrase foi clusterizada (não está no cluster 0)
   */
  isClustered() {
    return this.isInCluster();
  }

  /**
   * Verifica se pode ser movida para um cluster específico
   */
  canBeMovedTo(clusterId) {
    const targetClusterId = parseInt(clusterId) || 0;
    return targetClusterId !== this.clusterId;
  }

  /**
   * Normaliza conteúdo para comparação
   */
  normalize() {
    return this.preprocessedContent.toLowerCase().trim();
  }

  /**
   * Obtém conteúdo original
   */
  getContent() {
    return this.content;
  }

  /**
   * Obtém conteúdo preprocessado
   */
  getPreprocessedContent() {
    return this.preprocessedContent;
  }

  /**
   * Obtém ID do cluster atual
   */
  getClusterId() {
    return this.clusterId;
  }

  /**
   * Verifica se está selecionada (para UI)
   */
  isSelected() {
    return this.selected;
  }

  /**
   * Define status de seleção
   */
  setSelected(selected, order = null) {
    this.selected = !!selected;
    this.order = order;
    return this;
  }

  /**
   * Converte para objeto JSON para armazenamento
   */
  toJSON() {
    return {
      id: this.id,
      content: this.content,
      preprocessedContent: this.preprocessedContent,
      embedding: this.embedding,
      clusterId: this.clusterId,
      selected: this.selected,
      order: this.order
    };
  }

  /**
   * Cria instância Keyphrase a partir de dados JSON
   */
  static fromJSON(data) {
    if (!data || data.id === undefined) {
      return null;
    }
    
    const keyphrase = new Keyphrase(
      data.id,
      data.content || '',
      data.preprocessedContent || data.preprocessed_content || data.content,
      data.embedding
    );
    
    keyphrase.clusterId = data.clusterId || data.clustering || 0;
    keyphrase.selected = !!data.selected;
    keyphrase.order = data.order || null;
    
    return keyphrase;
  }

  /**
   * Cria keyphrase a partir de dados da API
   * Baseado no formato retornado pelo backend
   */
  static fromApiResponse(apiData) {
    if (!apiData || apiData.id === undefined) {
      return null;
    }
    
    return new Keyphrase(
      apiData.id,
      apiData.content || apiData.keyphrase || '',
      apiData.preprocessed_content || apiData.preprocessedContent || apiData.content,
      apiData.embedding
    );
  }
}