import React from 'react';
import { Box } from '@mui/material';
import KeyphraseClusteringList from './KeyphraseClusteringList';

/**
 * Componente de clustering de keyphrases refatorado para ser mais reutilizável.
 * Agora é apenas um wrapper que usa componentes mais granulares.
 */
const KeyphraseClustering = ({
  clusters = {},
  keyphraseClustering = {},
  hideClusteredState = false,
  keyphraseOrder = "alphabetical",
  onKeyphrasesOrderByChange = () => {},
  onHideClusteredChange = () => {},
  onKeyphraseClusteringChange = () => {},
  // Novas props para maior flexibilidade
  title = "Source Keyphrases",
  containerSx = {},
  maxHeight = '85vh'
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: 1,
        ...containerSx
      }}
    >
      <KeyphraseClusteringList
        title={title}
        clusters={clusters}
        keyphraseClustering={keyphraseClustering}
        hideClusteredState={hideClusteredState}
        keyphraseOrder={keyphraseOrder}
        onKeyphrasesOrderByChange={onKeyphrasesOrderByChange}
        onHideClusteredChange={onHideClusteredChange}
        onKeyphraseClusteringChange={onKeyphraseClusteringChange}
        maxHeight={maxHeight}
      />
    </Box>
  );
};

export default KeyphraseClustering;