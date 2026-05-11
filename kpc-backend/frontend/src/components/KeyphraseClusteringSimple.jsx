import React from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  FormControlLabel
} from '@mui/material';

const KeyphraseClusteringSimple = ({
  clusters = {},
  keyphraseClustering = {},
  hideClusteredState = false,
  keyphraseOrder = "alphabetical",
  onKeyphrasesOrderByChange = () => {},
  onHideClusteredChange = () => {},
  onKeyphraseClusteringChange = () => {}
}) => {
  
  return (
    <Box sx={{ padding: 2, minWidth: 400 }}>
      <Typography variant="h4" gutterBottom>
        Source Keyphrases
      </Typography>
      
      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {/* Order Select */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Order by</InputLabel>
          <Select
            value={keyphraseOrder}
            onChange={(event) => onKeyphrasesOrderByChange(event.target.value)}
            label="Order by"
          >
            <MenuItem value="alphabetical">Alphabetical</MenuItem>
            <MenuItem value="numerical">Numerical</MenuItem>
            <MenuItem value="cluster_similarity">Cluster Similarity</MenuItem>
            <MenuItem value="pairwise_similarity">Pairwise Similarity</MenuItem>
          </Select>
        </FormControl>

        {/* Hide Clustered Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={hideClusteredState}
              onChange={(event) => onHideClusteredChange(event.target.checked)}
            />
          }
          label="Hide clustered"
        />
      </Box>

      {/* Keyphrase List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {Object.entries(keyphraseClustering)
          .filter(([key, value]) => !hideClusteredState || value.clustering === 0)
          .map(([key, value]) => (
            <Box
              key={key}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1,
                border: '1px solid #e0e0e0',
                borderRadius: 1
              }}
            >
              {/* Keyphrase Description */}
              <Typography variant="body1" sx={{ flex: 1 }}>
                {value.description}
              </Typography>

              {/* Cluster Select */}
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabel>Cluster</InputLabel>
                <Select
                  value={`${key},${value.clustering}`}
                  onChange={(event) => onKeyphraseClusteringChange(event.target.value)}
                  label="Cluster"
                  size="small"
                >
                  {Array.from({ length: Object.keys(clusters).length }, (_, index) => (
                    <MenuItem key={index} value={`${key},${index + 1}`}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
      </Box>

      {/* Debug Info */}
      <Box sx={{ mt: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" display="block">
          Debug: {Object.keys(keyphraseClustering).length} keyphrases, {Object.keys(clusters).length} clusters
        </Typography>
      </Box>
    </Box>
  );
};

export default KeyphraseClusteringSimple;