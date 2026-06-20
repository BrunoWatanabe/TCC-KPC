// @model: specs/001-login-component/model/login-classes.puml
// RF: RF-001, RF-007 — Aplicação principal — integração MVVM

/**
 * App.jsx - Aplicação principal MVVM
 * Conecta Views com ViewModels seguindo arquitetura MVVM
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, Paper, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Views
import {
  LoginView,
  TopicSelectionView,
  KeyphraseClusteringView,
  KeyphraseClustersView,
  CuratedKeyphrasesView,
  MainLayout
} from './views/index.js';

// Componente de proteção de rotas removido - as rotas individuais agora são protegidas internamente

// ViewModels
import {
  useAuthStore,
  useAuth,
  useTopicSelectionViewModel,
  useKeyphraseClusteringViewModel,
  useKeyphraseClustersViewModel,
  useCuratedKeyphrasesViewModel
} from './viewmodels/index.js';

// Tema Material-UI para consistência visual
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#2e7d32',
    },
    warning: {
      main: '#ed6c02',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// ============================================================================
// COMPONENTE DE ROTA PROTEGIDA
// ============================================================================

function PrivateRoute({ children }) {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// ============================================================================
// WRAPPER COMPONENTS CONECTANDO VIEWS COM VIEWMODELS
// ============================================================================

/**
 * LoginPage - Conecta LoginView com useAuth
 */
function LoginPage() {
  const viewModel = useAuth();
  
  return <LoginView {...viewModel} />;
}

/**
 * TopicSelectionPage - Conecta TopicSelectionView com useTopicSelectionViewModel
 */
function TopicSelectionPage() {
  const viewModel = useTopicSelectionViewModel();
  
  return <TopicSelectionView {...viewModel} />;
}

/**
 * KeyphraseCurationPage - Página de Curação (Clustering + Clusters)
 * Combina as duas views diretamente seguindo padrão MVVM
 */
function KeyphraseCurationPage() {
  const clusteringVM = useKeyphraseClusteringViewModel();
  const clustersVM = useKeyphraseClustersViewModel();
  const authStore = useAuthStore();
  
  return (
    <MainLayout
      user={authStore.user}
      currentTopic={clustersVM?.topicName || 'Keyphrase Curation'}
      currentStep="Keyphrase Curation"
      onLogout={() => authStore.logout()}
      title="Keyphrase Curation"
    >
      {/* Botões de navegação no topo */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#757575',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Voltar
        </button>
        
        <button
          onClick={clustersVM?.goToAliases}
          disabled={!clustersVM?.canProceedToAliases}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: clustersVM?.canProceedToAliases ? '#1976d2' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: clustersVM?.canProceedToAliases ? 'pointer' : 'not-allowed',
          }}
        >
          Próximo Passo: Alias
        </button>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Lado Esquerdo - Interface de Clustering */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '80vh', overflow: 'auto' }}>
              <KeyphraseClusteringView 
                {...clusteringVM}
                embedded={true}
              />
            </Paper>
          </Grid>

          {/* Lado Direito - Visualização dos Clusters */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '80vh', overflow: 'auto' }}>
              <KeyphraseClustersView 
                {...clustersVM}
                embedded={true}
                showControls={true}
              />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </MainLayout>
  );
}

/**
 * CuratedKeyphrasesPage - Página de Aliases (Clusters + Curated Keyphrases)
 * Combina KeyphraseClusters (esquerda) com CuratedKeyphrases (direita)
 */
function CuratedKeyphrasesPage() {
  const clustersVM = useKeyphraseClustersViewModel();
  const curatedVM = useCuratedKeyphrasesViewModel();
  const authStore = useAuthStore();
  
  return (
    <MainLayout
      user={authStore.user}
      currentTopic={curatedVM?.topicName || 'Alias Management'}
      currentStep="Alias Management"
      onLogout={() => authStore.logout()}
      title="Alias Management"
    >
      {/* Botão Voltar no topo */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#757575',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Voltar
        </button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Lado Esquerdo - KeyphraseClusters (CS, S1, S2) */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '80vh', overflow: 'auto' }}>
              <KeyphraseClustersView 
                {...clustersVM}
                embedded={true}
                showControls={true}
              />
            </Paper>
          </Grid>

          {/* Lado Direito - CuratedKeyphrases (Aliases) */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '80vh', overflow: 'auto' }}>
              <CuratedKeyphrasesView 
                {...curatedVM}
                embedded={true}
              />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </MainLayout>
  );
}

// ============================================================================
// COMPONENTE APP PRINCIPAL
// ============================================================================

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* 1. LOGIN - Rota inicial */}
          <Route path="/" element={<LoginPage />} />
          
          {/* 2. SELEÇÃO DE TÓPICOS - Após login bem-sucedido */}
          <Route 
            path="/topics" 
            element={
              <PrivateRoute>
                <TopicSelectionPage />
              </PrivateRoute>
            } 
          />
          
          {/* 3. CURAÇÃO (CLUSTERING + CLUSTERS) */}
          <Route 
            path="/clustering" 
            element={
              <PrivateRoute>
                <KeyphraseCurationPage />
              </PrivateRoute>
            } 
          />
          
          {/* 4. ALIASES (CLUSTERS + CURATED KEYPHRASES) - Quarta etapa do fluxo */}
          <Route 
            path="/aliases" 
            element={
              <PrivateRoute>
                <CuratedKeyphrasesPage />
              </PrivateRoute>
            } 
          />
          
          {/* ROTA FALLBACK - Redireciona para login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

// ============================================================================
// VALIDAÇÃO E DEBUG (apenas em desenvolvimento)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
}

export default App;