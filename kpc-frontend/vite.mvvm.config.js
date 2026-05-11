import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * vite.mvvm.config.js - Configuração Vite para frontend MVVM
 * Permite desenvolvimento paralelo com frontend atual
 */
export default defineConfig({
  plugins: [react()],
  root: './src-mvvm',  // Definir src-mvvm como root
  base: '/',
  
  // Entry point para MVVM
  build: {
    outDir: '../dist-mvvm',  // Ajustar path relativo ao root
    rollupOptions: {
      input: './index.html'  // HTML dentro do diretório MVVM
    }
  },
  
  // Servidor em porta diferente
  server: {
    port: 5174,
    host: true,
    open: true,
  },
  
  // Configurações de desenvolvimento
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.MVVM_MODE': JSON.stringify('true')
  },
  
  // Resolve paths para MVVM (relativo ao root src-mvvm)
  resolve: {
    alias: {
      '@': '.',
      '@components': './views/components',
      '@layouts': './views/layouts',
      '@views': './views',
      '@models': './models',
      '@viewmodels': './viewmodels',
    }
  },
  
  // CSS config
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  
  // Preview config para build
  preview: {
    port: 4174,
    host: true,
    open: false,
  }
})