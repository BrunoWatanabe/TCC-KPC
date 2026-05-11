/**
 * Entidade Topic - baseada no backend ReactPy (topic.py) e useTopicStore.js
 * Representa um tópico de anotação no sistema
 */
export class Topic {
  constructor(name, annotationProfile = null, annotationFiles = []) {
    this.name = name;
    this.annotationProfile = annotationProfile;
    this.annotationFiles = annotationFiles;
    this.status = 'pending'; // pending, in_progress, completed
    this.description = '';
  }

  /**
   * Verifica se pode iniciar anotação neste tópico
   * Baseado em: backend/components/topic.py handle_topic_change()
   */
  canStartAnnotation() {
    return !!(this.annotationProfile && this.annotationFiles.length > 0);
  }

  /**
   * Obtém o tipo da tarefa de anotação
   * Baseado no padrão do backend ReactPy
   */
  getTaskType() {
    if (!this.annotationProfile) {
      return 'curation'; // Valor padrão
    }
    
    // Diferentes tipos de tarefa baseados no perfil
    if (this.annotationProfile.task_type) {
      return this.annotationProfile.task_type;
    }
    
    // Inferir tipo baseado nas propriedades do perfil
    if (this.annotationProfile.cluster_set_size) {
      return 'clustering';
    }
    
    return 'curation';
  }

  /**
   * Obtém o tamanho do conjunto de clusters
   * Baseado no padrão do backend ReactPy
   */
  getClusterSetSize() {
    if (!this.annotationProfile) {
      return 10; // Valor padrão
    }
    
    return this.annotationProfile.cluster_set_size || 10;
  }

  /**
   * Verifica se o tópico está selecionável
   * Baseado na lógica do frontend atual
   */
  isSelectable() {
    return this.status !== 'completed' && this.name !== '';
  }

  /**
   * Verifica se tem perfil de anotação configurado
   */
  hasAnnotationProfile() {
    return !!this.annotationProfile;
  }

  /**
   * Obtém arquivos de anotação disponíveis
   */
  getAnnotationFiles() {
    return this.annotationFiles || [];
  }

  /**
   * Obtém tipo do perfil de anotação
   */
  getProfileType() {
    if (!this.annotationProfile) {
      return 'unknown';
    }
    
    return this.annotationProfile.profile || this.getTaskType();
  }

  /**
   * Verifica se pode iniciar curação
   */
  canStartCuration() {
    return this.canStartAnnotation() && this.getTaskType() === 'curation';
  }

  /**
   * Nome formatado para exibição
   */
  getDisplayName() {
    return this.name || 'Tópico sem nome';
  }

  /**
   * Valida se seleção do tópico é válida
   */
  validateSelection() {
    const errors = [];
    
    if (!this.name) {
      errors.push('Nome do tópico é obrigatório');
    }
    
    if (!this.hasAnnotationProfile()) {
      errors.push('Perfil de anotação não configurado');
    }
    
    if (this.getAnnotationFiles().length === 0) {
      errors.push('Nenhum arquivo de anotação disponível');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Prepara dados para navegação
   */
  toNavigationState() {
    return {
      topicName: this.name,
      annotationProfile: this.annotationProfile,
      annotationFiles: this.annotationFiles,
      taskType: this.getTaskType(),
      clusterSetSize: this.getClusterSetSize()
    };
  }

  /**
   * Converte para objeto JSON para armazenamento
   */
  toJSON() {
    return {
      name: this.name,
      annotationProfile: this.annotationProfile,
      annotationFiles: this.annotationFiles,
      status: this.status,
      description: this.description
    };
  }

  /**
   * Cria instância Topic a partir de dados JSON
   */
  static fromJSON(data) {
    if (!data || !data.name) {
      return null;
    }
    
    const topic = new Topic(
      data.name,
      data.annotationProfile || data.annotation_profile,
      data.annotationFiles || data.annotation_files || []
    );
    
    topic.status = data.status || 'pending';
    topic.description = data.description || '';
    
    return topic;
  }

  /**
   * Cria tópico a partir de dados da API
   * Baseado no formato retornado pelo backend
   */
  static fromApiResponse(apiData) {
    if (!apiData) {
      return null;
    }
    
    // Se é string simples, criar tópico básico
    if (typeof apiData === 'string') {
      return new Topic(apiData);
    }
    
    // Se é objeto com estrutura completa
    return new Topic(
      apiData.name || apiData.topic_name || apiData,
      apiData.annotation_profile,
      apiData.annotation_files || []
    );
  }
}