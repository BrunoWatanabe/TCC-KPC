// @model: specs/001-login-component/model/login-classes.puml
// RF: RF-001, RF-005, RF-006, RF-008, RF-009 — Store de autenticação

/**
 * useAuthStore - Store Zustand simplificado para autenticação
 * Baseado em src/stores/useAuthStore.js com arquitetura MVVM
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../../models/entities/User.js';
import { AuthService } from '../../models/services/AuthService.js';

const authService = new AuthService();

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // ============================================================================
      // ESTADO DE AUTENTICAÇÃO
      // ============================================================================
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
      loading: false,

      // ============================================================================
      // AÇÕES DE AUTENTICAÇÃO
      // ============================================================================

      /**
       * Efetua login — chama AuthService, trata sucesso/erro, persiste
       */
      login: async (username, password) => {
        set({ loading: true, error: null });

        try {
          const response = await authService.login(username, password);

          // A API retorna { access_token, token_type, username }
          const token = response.access_token;

          // Criar entidade User
          const userEntity = User.fromApiResponse({
            username: response.username || username,
            token,
          });

          set({
            isAuthenticated: true,
            user: userEntity,
            token,
            error: null,
            loading: false,
          });
        } catch (err) {
          let errorMsg = 'Credenciais inválidas';

          if (err.message?.includes('Network error') || err.message?.includes('Failed to fetch')) {
            errorMsg = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
          } else if (err.message?.includes('401') || err.message?.includes('422')) {
            errorMsg = 'Credenciais inválidas';
          } else if (err.message) {
            errorMsg = err.message;
          }

          set({
            loading: false,
            error: errorMsg,
          });
        }
      },

      /**
       * Efetua logout limpando todos os dados
       */
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          error: null,
          loading: false,
        });
      },

      /**
       * Limpa erro atual
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Atualiza dados do usuário mantendo autenticação
       */
      updateUser: (userData) => {
        const userEntity = userData instanceof User 
          ? userData 
          : User.fromApiResponse(userData);

        set({ user: userEntity });
      },

      /**
       * Obtém usuário atual
       */
      getCurrentUser: () => get().user,

      /**
       * Obtém token atual
       */
      getToken: () => get().token,

      /**
       * Verifica se usuário está autenticado
       */
      getIsAuthenticated: () => get().isAuthenticated,

      /**
       * Obtém username do usuário atual
       */
      getCurrentUsername: () => {
        const user = get().user;
        return user ? user.username : null;
      },

      /**
       * Verifica se usuário pode acessar um tópico
       */
      canAccessTopic: (topicName) => {
        const user = get().user;
        return user ? user.canAccessTopic(topicName) : false;
      },

      /**
       * Verifica se usuário é admin
       */
      isAdmin: () => {
        const user = get().user;
        return user ? user.isAdmin() : false;
      },

      /**
       * Obtém headers de autenticação para APIs
       */
      getAuthHeaders: () => {
        const user = get().user;
        const token = get().token;
        
        if (!user || !token) {
          return {};
        }

        return user.toAuthHeaders(token);
      },

      // ============================================================================
      // AÇÕES COMPOSTAS PARA MVVM
      // ============================================================================

      /**
       * Reset completo do store (para logout ou erro crítico)
       */
      reset: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          error: null,
          loading: false,
        });
      },

      /**
       * Inicializa store com dados do localStorage se válidos
       */
      initialize: () => {
        const state = get();
        
        // Verificar se dados persistidos são válidos
        if (state.token && state.user) {
          // Tentar recriar entidade User se necessário
          if (!(state.user instanceof User)) {
            try {
              const userEntity = User.fromJSON(state.user);
              if (userEntity) {
                set({ user: userEntity });
              } else {
                // Dados corrompidos, fazer logout
                get().reset();
              }
            } catch (error) {
              console.warn('Erro ao recriar entidade User:', error);
              get().reset();
            }
          }
        }
      },
    }),
    {
      name: 'auth-storage-mvvm', // Chave diferente para não conflitar
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user ? (
          typeof state.user.toJSON === 'function' 
            ? state.user.toJSON() 
            : state.user
        ) : null,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        // Inicializar após carregar do localStorage
        if (state && typeof state.initialize === 'function') {
          try {
            state.initialize();
          } catch (error) {
            console.warn('Erro ao inicializar auth store:', error);
            // Em caso de erro, resetar estado
            if (typeof state.reset === 'function') {
              state.reset();
            }
          }
        }
      },
    }
  )
);