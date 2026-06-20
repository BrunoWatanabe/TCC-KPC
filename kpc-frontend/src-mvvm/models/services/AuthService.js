// @model: specs/001-login-component/model/login-classes.puml
// RF: RF-001, RF-005, RF-006 — Serviço de autenticação

/**
 * AuthService - Serviço responsável por autenticação e gerenciamento de usuários
 * Distribui as 6 APIs do grupo USERS do apiService.js
 */
import { User } from '../entities/User.js';
import { API_BASE_URL, ENDPOINTS } from '../../shared/config.js';

export class AuthService {
  constructor() {
    this.apiBaseUrl = API_BASE_URL;
  }

    /**
   * Obtém token de autenticação atual do localStorage
   */
  getCurrentToken() {
    try {
      // Buscar token direto do localStorage
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        return token;
      }
    } catch (error) {
      console.warn('Erro ao obter token do localStorage:', error);
    }
    return null;
  }

  /**
   * Método base para requisições com autenticação
   */
  async makeRequest(endpoint, options = {}) {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const token = this.getCurrentToken();
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
    }

    const config = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    try {
      return await response.json();
    } catch {
      return response;
    }
  }

  /**
   * API: GET /users/basic_login - Login básico
   */
  async basicLogin() {
    return this.makeRequest('/users/basic_login');
  }

  /**
   * API: POST /users/login - Fazer login com credenciais (seguindo padrão ReactPy)
   * Usa FormData e processa cookies conforme backend ReactPy
   */
  async login(username, password) {
    
    // A API espera OAuth2PasswordRequestForm (application/x-www-form-urlencoded)
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const url = `${this.apiBaseUrl}${ENDPOINTS.LOGIN}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // A API retorna: { access_token, token_type, username }
    if (data.access_token) {
            // Salvar token no localStorage
      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('username', data.username);
      
    }
    
    // Retornar dados da API diretamente
    return data;
  }

  /**
   * API: GET /users/logout - Fazer logout
   */
  async logout() {
    return this.makeRequest('/users/logout');
  }

  /**
   * API: GET /users/whoami - Obter informações do usuário atual
   * Converte resposta para entidade User
   */
  async whoami() {
    const response = await this.makeRequest('/users/whoami');
    
    if (response && response.username) {
      return User.fromApiResponse(response);
    }
    
    return response;
  }

  /**
   * API: GET /users/validate_password - Validar senha
   */
  async validatePassword(username, password) {
    const params = new URLSearchParams({ username, password });
    
    try {
      return await this.makeRequest(`/users/validate_password?${params}`);
    } catch (error) {
      // Se for erro de CORS, mostrar mensagem mais clara
      if (error.message.includes('Network error') || error.status === 0) {
        throw new Error(
          'CORS Error: O backend precisa permitir requisições do frontend. ' +
          'Adicione CORS middleware no FastAPI para permitir http://localhost:6007'
        );
      }
      throw error;
    }
  }

  /**
   * API: GET /users/list - Listar usuários
   * Converte resposta para array de entidades User
   */
  async listUsers() {
    const response = await this.makeRequest('/users/list');
    
    if (Array.isArray(response)) {
      return response
        .map(userData => User.fromApiResponse(userData))
        .filter(user => user !== null);
    }
    
    return response;
  }

  /**
   * Verifica se usuário está autenticado (tem token válido)
   */
  isAuthenticated() {
    const token = this.getCurrentToken();
    return !!token;
  }

  /**
   * Remove token de autenticação
   */
  clearAuthentication() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  }

  /**
   * Salva token de autenticação
   */
  saveAuthenticationToken(token, userData = null) {
    const authData = {
      state: {
        token,
        user: userData ? User.fromApiResponse(userData) : null,
        isAuthenticated: true
      }
    };
    
    localStorage.setItem('auth-storage', JSON.stringify(authData));
  }

  /**
   * Obtém dados do usuário autenticado do localStorage
   */
  getAuthenticatedUser() {
    try {
      const username = localStorage.getItem('username');
      if (username) {
        return new User({ 
          username,
          isAuthenticated: true 
        });
      }
    } catch (error) {
      console.warn('Erro ao obter usuário do localStorage:', error);
    }
    return null;
  }

  /**
   * Atualiza dados do usuário autenticado
   */
  updateAuthenticatedUser(userData) {
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        if (parsed.state) {
          parsed.state.user = userData instanceof User ? userData.toJSON() : userData;
          localStorage.setItem('auth-storage', JSON.stringify(parsed));
        }
      }
    } catch (error) {
      console.warn('Erro ao atualizar usuário no localStorage:', error);
    }
  }
}

// Instância singleton
export const authService = new AuthService();