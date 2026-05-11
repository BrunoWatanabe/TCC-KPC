import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { KeyphraseClusteringContainer } from './components';

// Tema padrão do Material-UI
const theme = createTheme();

// Função para renderizar o componente em modo desenvolvimento
const App = () => {
  // Dados de exemplo para desenvolvimento
  const sampleClusters = {
    cluster1: { name: 'Cluster 1' },
    cluster2: { name: 'Cluster 2' },
    cluster3: { name: 'Cluster 3' }
  };

  const sampleKeyphraseClustering = {
    keyphrase1: { description: 'Example keyphrase 1', clustering: 0 },
    keyphrase2: { description: 'Example keyphrase 2', clustering: 1 },
    keyphrase3: { description: 'Example keyphrase 3', clustering: 0 }
  };

  const handleStateChange = (changeInfo) => {
    console.log('State changed:', changeInfo);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '20px' }}>
        <h1>Keyphrase Clustering Component</h1>
        <KeyphraseClusteringContainer
          initialClusters={sampleClusters}
          initialKeyphraseClustering={sampleKeyphraseClustering}
          initialHideClustered={false}
          initialKeyphraseOrder="alphabetical"
          onStateChange={handleStateChange}
        />
      </div>
    </ThemeProvider>
  );
};

// Render only in development mode
if (process.env.NODE_ENV === 'development') {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
}

// Export para uso em produção/integração
export { KeyphraseClustering, KeyphraseClusteringContainer } from './components';