/**
 * ClusterCard.jsx - Componente para card de cluster com keyphrases MVVM
 * UI pura para exibir cluster com suas keyphrases e controles de seleção
 */
import React from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  Box, 
  Typography,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Divider
} from '@mui/material';
import KeyphraseItem from './KeyphraseItem.jsx';

const ClusterCard = ({
  clusterId,
  cluster,
  clusterDescription,
  keyphrases = [],
  selected = false,
  selectedValue = "0",
  selectedKeyphrases = {},
  onToggleSelection,
  onSelectKeyphrase,
  onMoveKeyphrase,
  showSelection = false,
  dragEnabled = false,
  variant = 'outlined',
  sx,
  ...props
}) => {
  // Determinar cor do chip baseado na seleção
  const getChipColor = (keyphraseId, order) => {
    // Converter keyphraseId para número para comparação
    const numKeyphraseId = Number(keyphraseId);
    const selectedId = order === 1 ? selectedKeyphrases.selected1 : selectedKeyphrases.selected2;
    const isKeyphraseSelected = Number(selectedId) === numKeyphraseId;
    
    if (selectedValue === "1" && isKeyphraseSelected) return "success";     // Verde - cluster selecionado e keyphrase selecionada
    if (selectedValue === "0" && isKeyphraseSelected) return "error";       // Vermelho - cluster não selecionado mas keyphrase selecionada
    if (selectedValue === "-1") return "warning";                          // Amarelo - status especial
    
    return "default"; // Cinza - padrão
  };

  // Handler para seleção de cluster (CS)
  const handleClusterSelectionChange = (event) => {
    const newValue = event.target.value;
    if (onToggleSelection) {
      onToggleSelection(clusterId, newValue);
    }
  };

  // Handler para seleção de keyphrase
  const handleKeyphraseClick = (keyphraseId, order) => {
    if (onSelectKeyphrase) {
      onSelectKeyphrase(clusterId, order, keyphraseId);
    }
  };

  // Handler para drop de keyphrase no cluster
  const handleDrop = (event) => {
    if (!dragEnabled) return;
    
    event.preventDefault();
    const keyphraseId = event.dataTransfer.getData('keyphrase-id');
    const sourceCluster = event.dataTransfer.getData('source-cluster');
    
    if (keyphraseId && onMoveKeyphrase && sourceCluster !== clusterId.toString()) {
      onMoveKeyphrase(keyphraseId, clusterId, sourceCluster);
    }
  };

  const handleDragOver = (event) => {
    if (dragEnabled) {
      event.preventDefault();
    }
  };

  // Renderizar keyphrases - adapta formato do backend ReactPy
  const renderKeyphrases = () => {
    if (!keyphrases || keyphrases.length === 0) {
      return (
        <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
          Nenhuma keyphrase neste cluster
        </Typography>
      );
    }

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {keyphrases.map((keyphrase, index) => {
          // No backend ReactPy, keyphrase pode ser string simples ou objeto
          const keyphraseText = typeof keyphrase === 'string' ? keyphrase : keyphrase.description || keyphrase.id || keyphrase;
          const keyphraseId = typeof keyphrase === 'object' ? (keyphrase.id || index) : index;
          
          // Extrair ID da keyphrase do formato "text(123)" usado no backend ReactPy
          const idMatch = keyphraseText.match(/\((\d+)\)$/);
          const actualId = idMatch ? idMatch[1] : keyphraseId;
          
          return (
            <KeyphraseItem
              key={actualId}
              keyphrase={keyphraseText}
              clusterId={clusterId}
              color={showSelection ? getChipColor(actualId, 1) : 'default'}
              dragEnabled={dragEnabled}
              onMoveToCluster={onMoveKeyphrase}
              onClick={showSelection ? () => handleKeyphraseClick(actualId, 1) : undefined}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Card
      variant={variant}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        margin: 1,
        minHeight: 120,
        backgroundColor: dragEnabled ? 'grey.50' : 'background.paper',
        '&:hover': {
          backgroundColor: dragEnabled ? 'grey.100' : undefined,
        },
        ...sx
      }}
      {...props}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h3">
              Cluster {clusterId}
            </Typography>
            
            {showSelection && (
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={selectedValue}
                  onChange={handleClusterSelectionChange}
                  variant="outlined"
                >
                  <MenuItem value="0">CS: 0</MenuItem>
                  <MenuItem value="1">CS: 1</MenuItem>
                  <MenuItem value="-1">CS: -1</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        }
        subheader={clusterDescription && (
          <Typography variant="body2" color="textSecondary">
            {clusterDescription}
          </Typography>
        )}
      />
      
      <CardContent>
        {renderKeyphrases()}
        
        {showSelection && keyphrases.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" color="textSecondary">
                Seleções do Cluster:
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="caption">1ª:</Typography>
                <Chip 
                  size="small"
                  label={selectedKeyphrases.keyphrase1 || "Nenhuma"}
                  color={selectedKeyphrases.selected1 ? getChipColor(selectedKeyphrases.selected1, 1) : "default"}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="caption">2ª:</Typography>
                <Chip 
                  size="small"
                  label={selectedKeyphrases.keyphrase2 || "Nenhuma"}
                  color={selectedKeyphrases.selected2 ? getChipColor(selectedKeyphrases.selected2, 2) : "default"}
                />
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ClusterCard;