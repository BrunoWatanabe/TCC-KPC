/**
 * KeyphraseClusteringView.jsx - View pura para clustering de keyphrases MVVM
 * UI pura sem lógica de negócio, recebe tudo via props do ViewModel
 * Replicada do keyphrase_clustering.py do backend ReactPy
 */
import React from 'react';
import { 
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Grid,
  Divider
} from '@mui/material';
import { MainLayout } from '../layouts/index.js';
import { KeyphraseItem, Button } from '../components/index.js';
import { KeyphraseClustersView } from '../pages/index.js';
import { KeyphraseSortingLabels } from '../../shared/enums/KeyphraseSorting.js';

const KeyphraseClusteringView = ({
  // Estado
  keyphrases,
  clusters,
  hideClusteredState,
  keyphraseOrder,
  loading,
  error,
  user,
  currentTopic,
  
  // Handlers
  onKeyphraseOrderChange,
  onHideClusteredChange,
  onMoveKeyphrase,
  
  // Props opcionais
  title = "Source Keyphrases",
  embedded = false // Para usar como sub-componente
}) => {
  // Renderizar lista de keyphrases (seguindo padrão do ReactPy: keyphrase_clustering.py)
  const renderKeyphrasesList = () => {
    // Garantir que keyphrases é um array
    const keyphrasesArray = Array.isArray(keyphrases) ? keyphrases : [];
    
    if (keyphrasesArray.length === 0) {
      return (
        <Alert severity="info">
          Nenhuma keyphrase encontrada para este tópico.
        </Alert>
      );
    }

    // Gerar opções de clusters (como no ReactPy: cluster_selects)
    const generateClusterOptions = (keyphraseIndex) => {
      const clusterCount = clusters ? Object.keys(clusters).length : 5;
      const options = [];
      
      // Clusters numerados (1, 2, 3, ...) como no ReactPy
      for (let i = 1; i <= Math.max(clusterCount, 5); i++) {
        options.push(
          <MenuItem key={`${keyphraseIndex}-${i}`} value={`${keyphraseIndex},${i}`}>
            {i}
          </MenuItem>
        );
      }
      
      return options;
    };

    // Seguindo estrutura do backend: keyphrase_clustering_selects
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {keyphrasesArray.map((keyphrase, index) => {
          // Validar se o item é válido e tem as propriedades necessárias
          if (!keyphrase) return null;
          
          const keyphraseText = keyphrase?.description || (typeof keyphrase === 'string' ? keyphrase : '');
          const clusteringValue = keyphrase?.clustering || 0;
          // Usar o ID da keyphrase (base-1) em vez do índice do array
          const keyphraseId = keyphrase?.id || (index + 1); // Fallback para index+1 se id não existir
          
          // Filtrar keyphrases clustered (igual keyphrase_clustering.py: if not hide_clustered or value['clustering'] == 0)
          if (hideClusteredState && clusteringValue !== 0) return null;
          
          return (
            <Box key={keyphraseId} sx={{ 
              flex: 1,
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'center',
              mb: 1,
              gap: 1
            }}>
              {/* Typography da keyphrase - seguindo backend */}
              <Typography variant="body2" sx={{ 
                flex: 1, 
                minWidth: 0, // para permitir truncamento
                fontSize: '0.875rem'
              }}>
                {keyphraseText}
              </Typography>
              
              {/* FormControl com Select - seguindo backend exato */}
              <FormControl sx={{ minWidth: 80 }}>
                <InputLabel htmlFor={`select-keyphrase-clustering-${keyphraseId}`}>
                  Cluster
                </InputLabel>
                <Select
                  id={`select-keyphrase-clustering-${keyphraseId}`}
                  value={`${keyphraseId},${clusteringValue}`}
                  onChange={(e) => {
                    // Formato ReactPy: "id,clustering_value" (ex: "1,2") - agora usando ID base-1
                    onMoveKeyphrase && onMoveKeyphrase(e.target.value);
                  }}
                  label="Cluster"
                  size="small"
                  sx={{
                    pl: 1,
                    pr: 1,
                    minWidth: 50
                  }}
                >
                  <MenuItem value={`${keyphraseId},0`}>0</MenuItem>
                  {generateClusterOptions(keyphraseId)}
                </Select>
              </FormControl>
            </Box>
          );
        })}
      </Box>
    );
  };

  // Removido renderClusters() pois agora usamos o KeyphraseClustersView

  // Renderizar conteúdo baseado no estado
  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Carregando dados de clustering...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      );
    }

    return (
      <>
        {/* Controles */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Ordenação das Keyphrases</InputLabel>
                <Select
                  value={keyphraseOrder || 'alphabetical'}
                  onChange={(e) => onKeyphraseOrderChange && onKeyphraseOrderChange(e.target.value)}
                  label="Ordenação das Keyphrases"
                >
                  {Object.entries(KeyphraseSortingLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={hideClusteredState}
                    onChange={(e) => onHideClusteredChange(e.target.checked)}
                  />
                }
                label="Ocultar keyphrases já agrupadas"
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Conteúdo Principal */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Source Keyphrases
          </Typography>
          <Box sx={{ maxHeight: 600, overflow: 'auto', pr: 1 }}>
            {renderKeyphrasesList()}
          </Box>
        </Box>
      </>
    );
  };

  // Se embedded, renderizar apenas o conteúdo interno seguindo layout do backend
  if (embedded) {
    return (
      <Box sx={{ 
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%'
      }}>
        {/* Título */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        {/* Controles em linha - seguindo backend: flexDirection: "row" */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          mb: 2
        }}>
          {/* Order by select - usando enum padronizado KeyphraseSortingLabels */}
          <FormControl sx={{ flex: 1, display: 'flex' }} size="small">
            <InputLabel>Order by</InputLabel>
            <Select
              value={keyphraseOrder}
              onChange={(e) => onKeyphraseOrderChange(e.target.value)}
              label="Order by"
            >
              {Object.entries(KeyphraseSortingLabels).map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Switch Hide clustered - seguindo backend: flexDirection: "column", paddingLeft: 10 */}
          <Box sx={{ 
            display: 'flex', 
            flex: 1, 
            flexDirection: 'column', 
            pl: 1
          }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Hide clustered
            </Typography>
            <Switch
              checked={hideClusteredState}
              onChange={(e) => onHideClusteredChange(e.target.checked)}
              size="small"
            />
          </Box>
        </Box>

        {/* Lista de Keyphrases - sem divider para ficar mais próximo do backend */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex',
          flexDirection: 'column'
        }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Carregando...
              </Typography>
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : (
            renderKeyphrasesList()
          )}
        </Box>
      </Box>
    );
  }

  // Renderização completa para uso standalone
  return (
    <MainLayout
      title={title}
      user={user}
      currentTopic={currentTopic?.name || currentTopic?.id}
      currentStep="Clustering"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tópicos', href: '/topics' },
        { label: currentTopic?.name || 'Tópico', href: '/topics' },
        { label: 'Clustering' }
      ]}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default KeyphraseClusteringView;