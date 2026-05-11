/**
 * useLoginViewModel - Hook customizado para lógica de login
 * Baseado no componente src/components/Login.jsx
 * Separa lógica de apresentação da UI pura
 */
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useFlowStore } from '../stores/useFlowStore.js';
import { authService } from '../../models/services/AuthService.js';
import { User } from '../../models/entities/User.js';

export const useLoginViewModel = () => {
  // ============================================================================
  // ESTADO LOCAL DO COMPONENTE
  // ============================================================================
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ============================================================================
  // HOOKS DE NAVEGAÇÃO E STORES
  // ============================================================================
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const flowStore = useFlowStore();

  // ============================================================================
  // HANDLERS PARA MUDANÇAS DE CAMPO
  // ============================================================================

  /**
   * Atualiza campo username
   */
  const handleUsernameChange = useCallback((newUsername) => {
    setUsername(newUsername);
    // Limpar erro quando usuário começar a digitar
    if (error) {
      setError('');
    }
  }, [error]);

  /**
   * Atualiza campo password
   */
  const handlePasswordChange = useCallback((newPassword) => {
    setPassword(newPassword);
    // Limpar erro quando usuário começar a digitar
    if (error) {
      setError('');
    }
  }, [error]);

  // ============================================================================
  // LÓGICA DE AUTENTICAÇÃO
  // ============================================================================

  /**
   * Processa login usando AuthService com cookies (padrão ReactPy)
   */
  const handleSubmit = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }

    // Validações básicas
    if (!username.trim()) {
      setError('Usuário é obrigatório');
      return;
    }

    if (!password.trim()) {
      setError('Senha é obrigatória');
      return;
    }

    setLoading(true);
    setError('');
    authStore.setLoading(true);
    authStore.clearError();


    try {
      // Usar AuthService com JWT token handling
      const response = await authService.login(username, password);
      

      // A API retorna { access_token, token_type, username }
      if (response && response.access_token && response.username) {
        
        // Criar User entity do response
        const userEntity = User.fromApiResponse({
          username: response.username,
          token: response.access_token
        });
        
        // Salvar no AuthStore com token JWT
        authStore.login(userEntity, response.access_token);
        
        // Atualizar fluxo
        flowStore.loginHelpers.onLoginSuccess();
        
        // Navegar para tópicos (React Router)
        navigate('/topics');
        
        
      } else {
        console.error('❌ Invalid response format:', response);
        const errorMsg = 'Login falhou - token não recebido';
        setError(errorMsg);
        authStore.setError(errorMsg);
        flowStore.loginHelpers.onLoginError(errorMsg);
      }
      
    } catch (err) {
      console.error('❌ LOGIN ERROR:', err);
      
      let errorMsg = 'Erro de autenticação';
      
      // Tratamento específico de erros (baseado no ReactPy)
      if (err.message.includes('Incorrect username or password')) {
        errorMsg = 'Usuário ou senha incorretos';
      } else if (err.message.includes('Network error') || err.message.includes('CORS')) {
        errorMsg = 'Erro de conexão com o servidor';
      } else if (err.message.includes('cookie')) {
        errorMsg = 'Falha na autenticação por cookie';
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
      authStore.setError(errorMsg);
      flowStore.loginHelpers.onLoginError(errorMsg);
      
    } finally {
      setLoading(false);
      authStore.setLoading(false);
    }
  }, [username, password, navigate, authStore, flowStore, error]);

  /**
   * Tenta login automático se há dados salvos
   */
  const tryAutoLogin = useCallback(async () => {
    try {
      // Verificar se já está autenticado
      if (authStore.isAuthenticated && authStore.token) {
        
        // Tentar validar token com whoami
        const userInfo = await authService.whoami();
        
        if (userInfo) {
          navigate('/topics');
          return true;
        }
      }
    } catch (error) {
      console.warn('⚠️ Auto-login failed:', error);
      // Limpar dados inválidos
      authStore.logout();
      flowStore.reset();
    }
    
    return false;
  }, [authStore, navigate, flowStore]);

  /**
   * Limpa formulário e erros
   */
  const clearForm = useCallback(() => {
    setUsername('');
    setPassword('');
    setError('');
    setLoading(false);
    authStore.clearError();
  }, [authStore]);

  /**
   * Valida se pode submeter formulário
   */
  const canSubmit = useCallback(() => {
    return !loading && 
           username.trim().length > 0 && 
           password.trim().length > 0;
  }, [loading, username, password]);

  // ============================================================================
  // HANDLERS DE EVENTOS DE TECLADO
  // ============================================================================

  /**
   * Handle para Enter key
   */
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && canSubmit()) {
      handleSubmit(e);
    }
  }, [handleSubmit, canSubmit]);

  // ============================================================================
  // ESTADO DERIVADO PARA A VIEW
  // ============================================================================

  const viewState = {
    // Campos do formulário
    username,
    password,
    
    // Estado de loading e erro
    loading: loading || authStore.loading,
    error: error || authStore.error,
    
    // Estado de validação
    canSubmit: canSubmit(),
    
    // Estado de autenticação global
    isAuthenticated: authStore.isAuthenticated,
  };

  const viewActions = {
    // Handlers para campos (com nomes esperados pela View)
    onUsernameChange: handleUsernameChange,
    onPasswordChange: handlePasswordChange,
    
    // Handlers para formulário
    onSubmit: handleSubmit,
    handleKeyPress,
    
    // Utilitários
    clearForm,
    tryAutoLogin,
  };

  // ============================================================================
  // ESTADO E AÇÕES DERIVADAS PARA DEBUGGING
  // ============================================================================
  
  const debugInfo = {
    authStoreState: {
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user,
      token: authStore.token ? '***' : null,
      loading: authStore.loading,
      error: authStore.error
    },
    flowStoreState: {
      currentStep: flowStore.currentStep,
      completedSteps: flowStore.completedSteps
    },
    formState: {
      username,
      password: password ? '***' : '',
      loading,
      error,
      canSubmit: canSubmit()
    }
  };

  return {
    // Estado para a View
    ...viewState,
    
    // Ações para a View
    ...viewActions,
    
    // Informações de debug (não usar em produção)
    _debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined,
  };
};