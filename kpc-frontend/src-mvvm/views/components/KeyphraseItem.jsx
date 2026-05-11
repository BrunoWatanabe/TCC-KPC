/**
 * KeyphraseItem.jsx - Componente para item individual de keyphrase MVVM
 * UI pura para exibir keyphrase com funcionalidades de drag/drop e seleção
 */
import React from 'react';
import { 
  Box, 
  Typography, 
  Chip 
} from '@mui/material';

const KeyphraseItem = ({
  keyphrase,
  clusterId = 0,
  description,
  selected = false,
  disabled = false,
  dragEnabled = false,
  onMoveToCluster,
  onClick,
  color = 'default',
  variant = 'outlined',
  size = 'small',
  sx,
  ...props
}) => {
  // Handler para drag and drop
  const handleDragStart = (event) => {
    if (!dragEnabled) return;
    
    event.dataTransfer.setData('keyphrase-id', keyphrase.id || keyphrase);
    event.dataTransfer.setData('source-cluster', clusterId);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Handler para drop
  const handleDrop = (event) => {
    if (!dragEnabled) return;
    
    event.preventDefault();
    const keyphraseId = event.dataTransfer.getData('keyphrase-id');
    const sourceCluster = event.dataTransfer.getData('source-cluster');
    
    if (keyphraseId && onMoveToCluster) {
      onMoveToCluster(keyphraseId, clusterId, sourceCluster);
    }
  };

  const handleDragOver = (event) => {
    if (dragEnabled) {
      event.preventDefault();
    }
  };

  // Determinar label da keyphrase
  const getKeyphraseLabel = () => {
    if (typeof keyphrase === 'string') {
      return keyphrase;
    }
    
    if (keyphrase?.description) {
      return keyphrase.description;
    }
    
    if (description) {
      return description;
    }
    
    return keyphrase?.id || keyphrase || 'Unknown';
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        display: 'inline-block',
        margin: 0.5,
        ...sx
      }}
      {...props}
    >
      <Chip
        label={getKeyphraseLabel()}
        color={color}
        variant={variant}
        size={size}
        disabled={disabled}
        clickable={!!onClick || dragEnabled}
        onClick={onClick}
        draggable={dragEnabled}
        onDragStart={handleDragStart}
        sx={{
          cursor: dragEnabled ? 'grab' : onClick ? 'pointer' : 'default',
          '&:active': {
            cursor: dragEnabled ? 'grabbing' : 'pointer'
          },
          backgroundColor: selected ? 'primary.main' : undefined,
          color: selected ? 'primary.contrastText' : undefined,
          border: selected ? '2px solid' : undefined,
          borderColor: selected ? 'primary.main' : undefined,
        }}
      />
    </Box>
  );
};

export default KeyphraseItem;