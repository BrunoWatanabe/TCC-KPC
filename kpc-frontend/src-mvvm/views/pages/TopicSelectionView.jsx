/**
 * TopicSelectionView.jsx - View pura para seleção de tópico MVVM
 * UI pura sem lógica de negócio, recebe tudo via props do ViewModel
 */
import React from 'react';
import { 
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { MainLayout } from '../layouts/index.js';
import { Button } from '../components/index.js';

const TopicSelectionView = ({
  // Estado
  topics,
  selectedTopic,
  loading,
  error,
  user,
  
  // Handlers
  onTopicChange,
  onConfirm,
  onLogout,
  
  // Props opcionais
  title = "Seleção de Tópico"
}) => {
  // Renderizar conteúdo baseado no estado
  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Carregando tópicos...
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

    if (!topics || topics.length === 0) {
      return (
        <Alert severity="info" sx={{ mb: 3 }}>
          Nenhum tópico disponível para este usuário.
        </Alert>
      );
    }

    return (
      <>
        {/* Instrução */}
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          Selecione um tópico para iniciar a curação de keyphrases:
        </Typography>

        {/* Select de Tópicos */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="topic-select-label">Tópico</InputLabel>
          <Select
            labelId="topic-select-label"
            value={selectedTopic?.name || selectedTopic?.id || selectedTopic || ''}
            onChange={(e) => onTopicChange(e.target.value)}
            label="Tópico"
          >
            {topics.map((topic, index) => (
              <MenuItem key={topic.id || topic.name || index} value={topic.name || topic.id || index}>
                <Box>
                  <Typography variant="body1">
                    {topic.name || topic.id || `Tópico ${index + 1}`}
                  </Typography>
                  {topic.description && (
                    <Typography variant="caption" color="textSecondary" display="block">
                      {topic.description}
                    </Typography>
                  )}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Botão Confirmar */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={onConfirm}
            disabled={!selectedTopic}
            sx={{ px: 4, py: 1.5 }}
          >
            Confirmar Seleção
          </Button>
        </Box>
      </>
    );
  };

  return (
    <MainLayout
      title={title}
      user={user}
      onLogout={onLogout}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Seleção de Tópico' }
      ]}
    >
      <Box sx={{ maxWidth: 600, margin: '0 auto', py: 2 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Bem-vindo, {user?.username || user?.name || 'Usuário'}!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Escolha um tópico para começar o processo de curação de keyphrases
          </Typography>
        </Box>

        {/* Conteúdo Principal */}
        {renderContent()}
      </Box>
    </MainLayout>
  );
};

export default TopicSelectionView;