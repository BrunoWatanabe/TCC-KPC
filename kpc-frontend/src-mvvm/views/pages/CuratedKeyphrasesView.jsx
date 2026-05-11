/**
 * CuratedKeyphrasesView.jsx - View pura para curação final de keyphrases MVVM
 * UI pura sem lógica de negócio, recebe tudo via props do ViewModel
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
  Divider,
  LinearProgress,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import { 
  Save as SaveIcon,
  Edit as EditIcon 
} from '@mui/icons-material';
import { MainLayout } from '../layouts/index.js';
import { Button, TextField } from '../components/index.js';

const CuratedKeyphrasesView = ({
  // Estado
  curatedKeyphrases,
  filteredKeyphrases,
  keyphraseAlias,
  updatedKeyphraseAlias,
  showOnlyCurated,
  loading,
  saving,
  error,
  user,
  currentTopic,
  statistics,
  canFinalize,
  clusterOrder = [], // Array de IDs na ordem correta do backend
  currentAliasSorting,
  availableAliasSortings = [],
  
  // Handlers
  handleShowOnlyCuratedChange,
  updateAlias,
  saveAlias,
  isAliasModified,
  generateAutomaticLabel,
  getChipColor,
  hasValidKeyphrases,
  finalizeCuration,
  onBack,
  changeAliasSorting,
  
  // Props opcionais
  title = "Curated Keyphrases",
  embedded = false // Para usar como sub-componente
}) => {
  // Renderizar estatísticas de progresso
  const renderProgressStats = () => {
    if (!statistics) return null;

    const progressPercentage = Math.min(100, statistics.completionPercentage);
    
    return (
      <Paper sx={{ p: 3, mb: 3, backgroundColor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Progresso da Curação
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              Keyphrases Curadas: {statistics.curatedCount} / {statistics.targetCount}
            </Typography>
            <Typography variant="body2">
              {Math.round(progressPercentage)}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage}
            color={statistics.hasReachedTarget ? "success" : "primary"}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="textSecondary">
              Total de Clusters
            </Typography>
            <Typography variant="h5">
              {statistics.totalClusters}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="textSecondary">
              Curadas
            </Typography>
            <Typography variant="h5" color="success.main">
              {statistics.curatedCount}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="textSecondary">
              Com Aliases
            </Typography>
            <Typography variant="h5" color="info.main">
              {statistics.withAliases}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="textSecondary">
              Meta
            </Typography>
            <Typography variant="h5">
              {statistics.targetCount}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // Renderizar item de keyphrase curada no estilo de card (como KeyphraseClusters)
  const renderCuratedKeyphraseItem = ([clusterId, keyphrases]) => {
    if (!hasValidKeyphrases || !hasValidKeyphrases(keyphrases)) {
      return null;
    }

    const automaticLabel = generateAutomaticLabel ? generateAutomaticLabel(keyphrases, clusterId) : `cluster_${clusterId}`;
    const currentAlias = updatedKeyphraseAlias ? updatedKeyphraseAlias[clusterId] || '' : '';
    const savedAlias = keyphraseAlias ? keyphraseAlias[clusterId] || '' : '';
    const isModified = isAliasModified ? isAliasModified(clusterId) : false;
    const chipColor = getChipColor ? getChipColor(clusterId) : 'default';
    
    // Título do card: alias atual (ou default) - Cluster {número}
    const cardTitle = savedAlias ? `${savedAlias} - Cluster ${clusterId}` : `${automaticLabel} - Cluster ${clusterId}`;

    // Card no estilo KeyphraseClusters
    return (
      <Paper 
        key={clusterId} 
        elevation={2}
        sx={{ 
          p: 2, 
          mb: 2,
          border: '1px solid',
          borderColor: chipColor === 'success' ? 'success.main' : 'grey.300',
          borderRadius: 2,
          backgroundColor: 'background.paper',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-2px)'
          }
        }}
      >
        {/* Cabeçalho com Alias/Default - Cluster Número */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          pb: 1.5,
          borderBottom: '2px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {cardTitle}
          </Typography>
        </Box>

        {/* Corpo do Card */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* 1ª Linha: 1ª Keyphrase Selecionada com cor (verde se CS=1, vermelho se CS=0) */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 200, color: 'text.secondary' }}>
              1ª Keyphrase Selecionada:
            </Typography>
            <Chip
              label={keyphrases && keyphrases[0] && keyphrases[0][0] !== 0 ? keyphrases[0][1] : '-'}
              size="small"
              variant="filled"
              color={chipColor === 'success' ? 'success' : chipColor === 'error' ? 'error' : 'default'}
              sx={{
                fontWeight: chipColor !== 'default' ? 600 : 400,
                color: 'white',
                fontSize: '0.75rem'
              }}
            />
          </Box>

          {/* 2ª Linha: 2ª Keyphrase Selecionada com cor (verde se CS=1, vermelho se CS=0) */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 200, color: 'text.secondary' }}>
              2ª Keyphrase Selecionada:
            </Typography>
            <Chip
              label={keyphrases && keyphrases[1] && keyphrases[1][0] !== 0 ? keyphrases[1][1] : '-'}
              size="small"
              variant="filled"
              color={chipColor === 'success' ? 'success' : chipColor === 'error' ? 'error' : 'default'}
              sx={{
                fontWeight: chipColor !== 'default' ? 600 : 400,
                color: 'white',
                fontSize: '0.75rem'
              }}
            />
          </Box>

          <Divider sx={{ my: 0.5 }} />

          {/* Registrar Alias (Opcional) com botão salvar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              label="Registrar Alias (Opcional)"
              value={currentAlias}
              onChange={(e) => updateAlias && updateAlias(clusterId, e.target.value)}
              size="small"
              fullWidth
              disabled={saving}
              placeholder={automaticLabel}
              variant="outlined"
              sx={{ flex: 1 }}
            />
            <IconButton
              onClick={() => saveAlias && saveAlias(clusterId)}
              disabled={!isModified || saving}
              color="primary"
              size="large"
              sx={{
                bgcolor: isModified ? 'primary.main' : 'grey.300',
                color: isModified ? 'white' : 'grey.500',
                '&:hover': {
                  bgcolor: isModified ? 'primary.dark' : 'grey.400',
                },
                '&:disabled': {
                  bgcolor: 'grey.200',
                  color: 'grey.400'
                }
              }}
            >
              {saving ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <SaveIcon />}
            </IconButton>
          </Box>

          {isModified && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              Modificações não salvas - clique em salvar
            </Alert>
          )}
        </Box>
      </Paper>
    );
  };

  // Renderização do conteúdo principal
  const renderContent = () => {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Título */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        {/* Controles - seguindo padrão do ReactPy */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Alias Sorting</InputLabel>
                <Select
                  value={currentAliasSorting}
                  onChange={(e) => changeAliasSorting && changeAliasSorting(e.target.value)}
                  label="Alias Sorting"
                >
                  {availableAliasSortings.map((sorting) => (
                    <MenuItem key={sorting} value={sorting}>
                      {sorting === 'alphabetical_cluster_alias' ? 'Alfabética' : 'Numérica'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showOnlyCurated}
                    onChange={(e) => handleShowOnlyCuratedChange(e.target.checked)}
                    size="small"
                  />
                }
                label={`Show Only ${statistics?.curatedCount || 0}/${statistics?.targetCount || 16} Curated Keyphrases`}
                sx={{ fontSize: '0.875rem' }}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Lista de Keyphrases Curadas */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '3px',
          },
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
          ) : !filteredKeyphrases || filteredKeyphrases.length === 0 ? (
            <Alert severity="info">
              {showOnlyCurated 
                ? "Nenhuma keyphrase curada encontrada. Desative o filtro para ver todas."
                : "Nenhuma keyphrase encontrada para este tópico."
              }
            </Alert>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {filteredKeyphrases.map(renderCuratedKeyphraseItem)}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  // Se embedded, retornar apenas o conteúdo sem MainLayout
  if (embedded) {
    return renderContent();
  }

  // Renderização completa para uso standalone
  return (
    <MainLayout
      title={title}
      user={user}
      currentTopic={currentTopic?.name || currentTopic?.id}
      currentStep="Curação Final"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tópicos', href: '/topics' },
        { label: currentTopic?.name || 'Tópico', href: '/topics' },
        { label: 'Clustering', href: '/clustering' },
        { label: 'Seleção', href: '/clusters' },
        { label: 'Curação Final' }
      ]}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default CuratedKeyphrasesView;