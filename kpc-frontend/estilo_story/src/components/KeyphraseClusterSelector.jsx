import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

/**
 * Componente reutilizável para uma lista de keyphrases com seleção de cluster
 */
const KeyphraseClusterSelector = ({
  keyphrase,
  clusters = {},
  selectedCluster = 0,
  onClusterChange = () => {},
  showDescription = true,
  sx = {}
}) => {
  const { key, description } = keyphrase;
  
  const createClusterOptions = () => {
    const options = [
      <MenuItem key="0" value={0}>
        Unclustered
      </MenuItem>
    ];
    
    // Adiciona opções de cluster baseadas no número de clusters disponíveis
    for (let i = 1; i <= Object.keys(clusters).length; i++) {
      options.push(
        <MenuItem key={i} value={i}>
          Cluster {i}
        </MenuItem>
      );
    }
    
    return options;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
        py: 0.5,
        ...sx
      }}
    >
      {showDescription && (
        <Typography 
          variant="body2" 
          sx={{ 
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {description || key}
        </Typography>
      )}
      
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel htmlFor={`select-cluster-${key}`}>
          Cluster
        </InputLabel>
        <Select
          value={selectedCluster}
          id={`select-cluster-${key}`}
          onChange={(event) => onClusterChange(key, event.target.value)}
          size="small"
        >
          {createClusterOptions()}
        </Select>
      </FormControl>
    </Box>
  );
};

export default KeyphraseClusterSelector;