/**
 * Layouts Index - Exporta todos os layouts MVVM
 * 
 * Este arquivo centraliza a exportação de todos os layouts,
 * facilitando a importação nas Views e mantendo a organização da arquitetura MVVM.
 */

// ============================================================================
// LAYOUTS DA APLICAÇÃO
// ============================================================================

// Layout para páginas de autenticação (login, recuperação de senha)
export { default as AuthLayout } from './AuthLayout.jsx';

// Layout principal para páginas autenticadas
export { default as MainLayout } from './MainLayout.jsx';

// ============================================================================
// METADATA DO MÓDULO
// ============================================================================

/**
 * Informações sobre o módulo de layouts
 */
export const LAYOUTS_INFO = {
  version: '1.0.0',
  description: 'Application layouts for MVVM architecture',
  layouts: [
    'AuthLayout',
    'MainLayout'
  ],
  totalLayouts: 2,
  lastUpdated: new Date().toISOString()
};

// ============================================================================
// VALIDAÇÃO (apenas em desenvolvimento)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
}