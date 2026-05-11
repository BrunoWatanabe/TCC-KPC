import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  FormControlLabel
} from '@mui/material';

/**
 * Componente reutilizável para controles de ordenação e visibilidade
 */
const KeyphraseControls = ({
  keyphraseOrder = "alphabetical",
  hideClusteredState = false,
  onKeyphrasesOrderByChange = () => {},
  onHideClusteredChange = () => {},
  orderOptions = [
    { value: "alphabetical", label: "Alphabetical" },
    { value: "numerical", label: "Numerical" },
    { value: "cluster_similarity", label: "Cluster Similarity" },
    { value: "pairwise_similarity", label: "Pairwise Similarity" }
  ],
  showHideClusteredToggle = true,
  sx = {}
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        ...sx
      }}
    >
      {/* Select de ordenação */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel htmlFor="select-keyphrase-order">
          Order by
        </InputLabel>
        <Select
          id="select-keyphrase-order"
          value={keyphraseOrder}
          onChange={(event) => onKeyphrasesOrderByChange(event.target.value)}
        >
          {orderOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Switch para ocultar clustered */}
      {showHideClusteredToggle && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Hide clustered
          </Typography>
          <Switch
            checked={hideClusteredState}
            onChange={(event) => onHideClusteredChange(event.target.checked)}
          />
        </Box>
      )}
    </Box>
  );
};

export default KeyphraseControls;