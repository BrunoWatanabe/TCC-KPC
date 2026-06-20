// @model: specs/001-login-component/model/login-classes.puml
// RF: RF-001, RF-006 — Entidade User

/**
 * Entidade User - baseada no backend ReactPy (user_attribution.py) e useAuthStore.js
 * Representa um usuário do sistema com suas atribuições e permissões
 */
export class User {
  constructor(username, token, attributions = []) {
    this.username = username;
    this.token = token;
    this.attributions = attributions; // Tópicos que o usuário pode anotar
    this.isAuthenticated = !!token;
  }

  /**
   * Verifica se o usuário pode acessar um tópico específico
   * Baseado em: backend/model/user_attribution.py get_topics()
   */
  canAccessTopic(topicName) {
    if (!this.attributions || this.attributions.length === 0) {
      return false;
    }
    
    // Se for admin, pode acessar todos os tópicos
    if (this.isAdmin()) {
      return true;
    }
    
    // Verifica se o tópico está nas atribuições do usuário
    return this.attributions.some(attr => {
      if (typeof attr === 'string') {
        return attr === topicName;
      }
      if (typeof attr === 'object' && attr.topic) {
        return attr.topic === topicName;
      }
      return false;
    });
  }

  /**
   * Lista todos os tópicos atribuídos ao usuário
   * Baseado em: backend/model/user_attribution.py get_topics(user)
   */
  getAssignedTopics() {
    if (!this.attributions || this.attributions.length === 0) {
      return [];
    }
    
    return this.attributions.map(attr => {
      if (typeof attr === 'string') {
        return attr;
      }
      if (typeof attr === 'object' && attr.topic) {
        return attr.topic;
      }
      return null;
    }).filter(topic => topic !== null);
  }

  /**
   * Verifica se o usuário é administrador
   * Baseado no padrão do backend ReactPy
   */
  isAdmin() {
    return this.username === 'admin' || 
           this.attributions.some(attr => 
             (typeof attr === 'object' && attr.role === 'admin')
           );
  }

  /**
   * Gera headers de autenticação para requisições API
   * Baseado no padrão usado no apiService.js atual
   */
  toAuthHeaders() {
    if (!this.token) {
      return {};
    }
    return {
      'Authorization': `Bearer ${this.token}`
    };
  }

  /**
   * Obtém arquivos de anotação para um tópico específico
   * Baseado em: backend/model/user_attribution.py get_annotation_files()
   */
  getAnnotationFiles(topicName) {
    if (!this.canAccessTopic(topicName)) {
      return [];
    }
    
    const attribution = this.attributions.find(attr => {
      if (typeof attr === 'object' && attr.topic === topicName) {
        return true;
      }
      return false;
    });
    
    return attribution?.annotation_files || [];
  }

  /**
   * Obtém perfil de anotação para um tópico específico
   * Baseado em: backend/model/user_attribution.py get_annotation_profile()
   */
  getAnnotationProfile(topicName) {
    if (!this.canAccessTopic(topicName)) {
      return null;
    }
    
    const attribution = this.attributions.find(attr => {
      if (typeof attr === 'object' && attr.topic === topicName) {
        return true;
      }
      return false;
    });
    
    return attribution?.profile || null;
  }

  /**
   * Verifica se dados do usuário são válidos
   */
  isValid() {
    return !!(this.username && this.token);
  }

  /**
   * Converte para objeto JSON para armazenamento
   */
  toJSON() {
    return {
      username: this.username,
      token: this.token,
      attributions: this.attributions,
      isAuthenticated: this.isAuthenticated
    };
  }

  /**
   * Cria instância User a partir de dados JSON
   */
  static fromJSON(data) {
    if (!data || !data.username || !data.token) {
      return null;
    }
    
    return new User(data.username, data.token, data.attributions || []);
  }

  /**
   * Cria instância User a partir de resposta da API
   * Baseado no formato de resposta do backend (api/user.py)
   */
  static fromApiResponse(apiData) {
    if (!apiData) {
      return null;
    }

    // Caso 1: Resposta direta do login (token + user)
    if (apiData.token && apiData.user) {
      return new User(
        apiData.user.username || apiData.user,
        apiData.token,
        apiData.user.attributions || apiData.attributions || []
      );
    }

    // Caso 2: Resposta do backend atual (username + token direto)
    if (apiData.username && apiData.token) {
      return new User(
        apiData.username,
        apiData.token,
        apiData.attributions || []
      );
    }

    // Caso 3: Formato simplificado (string username + token separado)
    if (typeof apiData === 'string') {
      return new User(apiData, null, []);
    }

    // Caso 4: Objeto com apenas username
    if (apiData.username) {
      return new User(
        apiData.username,
        apiData.token || null,
        apiData.attributions || []
      );
    }

    console.warn('Formato de dados da API não reconhecido:', apiData);
    return null;
  }
}