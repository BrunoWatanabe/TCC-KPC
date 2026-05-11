import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import KeyphraseControls from './KeyphraseControls';
import KeyphraseClusterSelector from './KeyphraseClusterSelector';

/**
 * Componente reutilizável para lista de keyphrases com clustering
 * Versão refatorada que é mais flexível e reutilizável
 */
const KeyphraseClusteringList = ({
  title = "Keyphrases",
  clusters = {},
  keyphraseClustering = {},
  hideClusteredState = false,
  keyphraseOrder = "alphabetical",
  onKeyphrasesOrderByChange = () => {},
  onHideClusteredChange = () => {},
  onKeyphraseClusteringChange = () => {},
  orderOptions,
  showControls = true,
  showHideClusteredToggle = true,
  maxHeight = 'auto',
  sx = {}
}) => {
  
  // Filtra keyphrases baseado no estado de hideClusteredState
  const getFilteredKeyphrases = () => {
    return Object.entries(keyphraseClustering)
      .filter(([key, value]) => !hideClusteredState || value.clustering === 0);
  };

  // Handler para mudança de cluster de uma keyphrase específica
  const handleKeyphraseClusterChange = (keyphraseKey, clusterValue) => {
    const value = `${keyphraseKey},${clusterValue}`;
    onKeyphraseClusteringChange(value);
  };

  const filteredKeyphrases = getFilteredKeyphrases();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...sx
      }}
    >
      {/* Header com título */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>
      
      {/* Controles de ordenação e visibilidade */}
      {showControls && (
        <KeyphraseControls
          keyphraseOrder={keyphraseOrder}
          hideClusteredState={hideClusteredState}
          onKeyphrasesOrderByChange={onKeyphrasesOrderByChange}
          onHideClusteredChange={onHideClusteredChange}
          orderOptions={orderOptions}
          showHideClusteredToggle={showHideClusteredToggle}
          sx={{ mb: 2 }}
        />
      )}
      
      {/* Lista de keyphrases */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          maxHeight: maxHeight,
          pr: 1
        }}
      >
        {filteredKeyphrases.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No keyphrases available
          </Typography>
        ) : (
          filteredKeyphrases.map(([key, value]) => (
            <KeyphraseClusterSelector
              key={key}
              keyphrase={{ key, description: value.description }}
              clusters={clusters}
              selectedCluster={value.clustering}
              onClusterChange={handleKeyphraseClusterChange}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default KeyphraseClusteringList;