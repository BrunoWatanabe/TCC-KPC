import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material';

// Main CuratedKeyphrases Component
const CuratedKeyphrases = ({
  curatedKeyphrasesOrder = "source_cluster",
  curatedKeyphrases = {},
  keyphraseAlias = {},
  selectedClusters = {},
  curatedKeyphrasesLength = 10,
  onCuratedKeyphrasesOrder = () => {},
  onKeyphraseAliasSaveClick = () => {}
}) => {
  // Local state for updated aliases and show only curated filter
  const [updatedKeyphraseAlias, setUpdatedKeyphraseAlias] = useState(keyphraseAlias);
  const [showOnlyCurated, setShowOnlyCurated] = useState(false);

  // Handle show only curated toggle
  const handleShowOnlyCurated = (event) => {
    setShowOnlyCurated(event.target.checked);
  };

  // Handle keyphrase alias updates
  const onKeyphraseAliasUpdated = (clusterId, value) => {
    const updatedAliases = { ...updatedKeyphraseAlias };
    updatedAliases[clusterId] = value;
    setUpdatedKeyphraseAlias(updatedAliases);
  };

  // Count curated keyphrases
  const countCuratedKeyphrases = () => {
    return Object.keys(selectedClusters).filter(
      clusterId => selectedClusters[clusterId] === "1"
    ).length;
  };

  // Generate chip label based on keyphrases and alias
  const generateChipLabel = (keyphrases, clusterId) => {
    const alias = keyphraseAlias[String(clusterId)];
    if (alias && alias !== "") {
      return alias;
    }

    // Filter out keyphrases with ID '0' and normalize them
    const validKeyphrases = keyphrases
      .filter(keyphrase => String(keyphrase[0]) !== '0')
      .map(keyphrase => keyphrase[1].toLowerCase().replace(/ /g, '_'));

    if (validKeyphrases.length === 0) {
      return "";
    }

    if (validKeyphrases.length === 1) {
      return validKeyphrases[0];
    }

    // For multiple keyphrases, join them with '_and_'
    return validKeyphrases.join('_and_');
  };

  // Get chip color based on cluster selection status
  const getChipColor = (clusterId) => {
    const status = selectedClusters[clusterId];
    switch (status) {
      case "1": return "success";
      case "0": return "error";
      case "-1": return "warning";
      default: return "default";
    }
  };

  // Render individual curated keyphrase item
  const renderCuratedKeyphrase = (keyphrases, clusterId) => {
    const chipLabel = generateChipLabel(keyphrases, clusterId);
    const hasKeyphrases = keyphrases.length >= 1 && String(keyphrases[0][0]) !== '0';
    const currentAlias = updatedKeyphraseAlias[String(clusterId)] || "";
    const originalAlias = keyphraseAlias[String(clusterId)] || "";
    const isAliasSaveDisabled = currentAlias === originalAlias;

    // Get original keyphrases for display
    const originalKeyphrases = keyphrases
      .filter(keyphrase => String(keyphrase[0]) !== '0')
      .map(keyphrase => keyphrase[1]);

    return (
      <Box
        key={`${clusterId}_curated_${chipLabel}_item`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mb: 2,
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          backgroundColor: '#fafafa'
        }}
      >
        {/* Header row with chip and cluster info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Keyphrase Chip */}
          <Chip
            label={chipLabel}
            variant="filled"
            color={getChipColor(clusterId)}
            sx={{ minWidth: 120 }}
          />

          {/* Cluster Label */}
          {hasKeyphrases && (
            <Typography variant="body2" color="textSecondary">
              (cluster {clusterId})
            </Typography>
          )}
        </Box>

        {/* Original keyphrases display */}
        {originalKeyphrases.length > 0 && (
          <Box sx={{ ml: 1 }}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold' }}>
              Original keyphrases:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {originalKeyphrases.map((keyphrase, index) => (
                <Chip
                  key={`original_${clusterId}_${index}`}
                  label={keyphrase}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    fontSize: '0.75rem',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #d0d0d0'
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Canonicalization row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          {/* Manual Canonicalization Text Field */}
          <TextField
            label="Manual Canonicalization (optional)"
            size="small"
            defaultValue={originalAlias}
            sx={{ flex: 1, minWidth: 200 }}
            onBlur={(event) => onKeyphraseAliasUpdated(clusterId, event.target.value)}
            helperText={originalAlias ? `Current: ${originalAlias}` : "Enter canonical form"}
          />

          {/* Save Canonical Button */}
          <Button
            variant="contained"
            disabled={isAliasSaveDisabled}
            onClick={() => onKeyphraseAliasSaveClick([clusterId, currentAlias])}
            sx={{ minWidth: 100 }}
          >
            Save Canonical
          </Button>
        </Box>
      </Box>
    );
  };

  // Generate curated keyphrases list based on order and filter
  const getCuratedKeyphrasesList = () => {
    // Filter keyphrases based on show only curated setting
    const filteredKeyphrases = Object.entries(curatedKeyphrases).filter(([clusterId, keyphrases]) => {
      if (!showOnlyCurated) return true;
      return selectedClusters[clusterId] === "1";
    });

    // Sort based on selected order
    let sortedKeyphrases;
    if (curatedKeyphrasesOrder === "source_cluster") {
      sortedKeyphrases = filteredKeyphrases.sort(([a], [b]) => parseInt(a) - parseInt(b));
    } else if (curatedKeyphrasesOrder === "alphabetical") {
      sortedKeyphrases = filteredKeyphrases.sort(([, a], [, b]) => {
        const labelA = a.length > 0 ? a[0][1] : "";
        const labelB = b.length > 0 ? b[0][1] : "";
        return labelA.localeCompare(labelB);
      });
    } else {
      sortedKeyphrases = filteredKeyphrases;
    }

    return sortedKeyphrases.map(([clusterId, keyphrases]) =>
      renderCuratedKeyphrase(keyphrases, clusterId)
    );
  };

  const curatedKeyphrasesCounter = `${countCuratedKeyphrases()}/${curatedKeyphrasesLength}`;

  return (
    <Grid
      item
      sx={{
        overflow: 'scroll',
        height: '85%',
        width: '50%',
        position: 'absolute',
        right: 0,
        padding: 2,
        paddingBottom: 12,
        paddingTop: 2
      }}
    >
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Curated Keyphrases
      </Typography>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        {/* Order Select */}
        <FormControl sx={{ flex: 1, minWidth: 150 }}>
          <InputLabel>Order by</InputLabel>
          <Select
            value={curatedKeyphrasesOrder}
            onChange={(event) => onCuratedKeyphrasesOrder(event.target.value)}
            label="Order by"
          >
            <MenuItem value="source_cluster">Source Cluster</MenuItem>
            <MenuItem value="alphabetical">Alphabetical</MenuItem>
          </Select>
        </FormControl>

        {/* Show Only Curated Switch */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1">
            Show Only {curatedKeyphrasesCounter} Curated Keyphrases
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={showOnlyCurated}
                onChange={handleShowOnlyCurated}
              />
            }
            label=""
          />
        </Box>
      </Box>

      {/* Curated Keyphrases List */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {getCuratedKeyphrasesList()}
      </Box>

      {/* Summary Info */}
      <Box sx={{ mt: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" display="block">
          Total: {Object.keys(curatedKeyphrases).length} keyphrases | 
          Curated: {countCuratedKeyphrases()} | 
          Showing: {getCuratedKeyphrasesList().length}
        </Typography>
      </Box>
    </Grid>
  );
};

export default CuratedKeyphrases;