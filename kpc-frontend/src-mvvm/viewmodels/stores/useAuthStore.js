/**
 * useAuthStore - Store Zustand simplificado para autenticação
 * Baseado em src/stores/useAuthStore.js com arquitetura MVVM
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../../models/entities/User.js';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // ============================================================================
      // ESTADO DE AUTENTICAÇÃO
      // ============================================================================
      isAuthenticated: false,
      user: null,           // Instância da entidade User
      token: null,
      error: null,
      loading: false,

      // ============================================================================
      // AÇÕES DE AUTENTICAÇÃO
      // ============================================================================

      /**
       * Efetua login com dados do usuário
       */
      login: (userData, token) => {
        
        // Converter userData para entidade User se necessário
        const userEntity = userData instanceof User 
          ? userData 
          : User.fromApiResponse(userData);

        const newState = {
          isAuthenticated: true,
          user: userEntity,
          token: token,
          error: null,
          loading: false,
        };

        set(newState);
        
        // Verificar se foi salvo
        setTimeout(() => {
          const saved = localStorage.getItem('auth-storage-mvvm');
        }, 100);
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
       * Define estado de loading
       */
      setLoading: (loading) => {
        set({ loading });
      },

      /**
       * Define erro e para loading
       */
      setError: (error) => {
        set({ error, loading: false });
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

      // ============================================================================
      // GETTERS CONVENIENTES
      // ============================================================================

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