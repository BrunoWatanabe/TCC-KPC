import React from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid
} from '@mui/material';

// Utility function to extract keyphrase ID from string like "text (123)"
const getKpId = (keyphraseStr) => {
  const match = keyphraseStr.match(/\((\d+)\)/);
  return match ? match[1] : '0';
};

// Order Select Component
const OrderSelect = ({ items, clusterOrder, onClusterOrderChange }) => (
  <FormControl sx={{ flex: 1, display: 'flex' }}>
    <InputLabel htmlFor="select-cluster-order">Order by</InputLabel>
    <Select
      id="select-cluster-order"
      value={clusterOrder}
      onChange={(event) => onClusterOrderChange(event.target.value)}
      label="Order by"
    >
      {items.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// Cluster Select Component
const ClusterSelect = ({ clusterId, selectedClusters, onClusterSelectedChange }) => {
  const getSelectedCluster = (clusterId, selectedClusters) => {
    const clusterIdStr = String(clusterId);
    if (selectedClusters[clusterIdStr]) {
      const selected = selectedClusters[clusterIdStr];
      return ['0', '1'].includes(selected) ? selected : '0';
    }
    return '0';
  };

  const selectedValue = getSelectedCluster(clusterId, selectedClusters);
  const isDisabled = String(clusterId) === String(Object.keys(selectedClusters).length);

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
      <InputLabel htmlFor={`select-cluster-${clusterId}`}>CS</InputLabel>
      <Select
        id={`select-cluster-${clusterId}`}
        value={`${clusterId},${selectedValue}`}
        onChange={(event) => onClusterSelectedChange(event.target.value)}
        disabled={isDisabled}
        size="small"
      >
        <MenuItem value={`${clusterId},0`}>0</MenuItem>
        <MenuItem value={`${clusterId},1`}>1</MenuItem>
      </Select>
    </FormControl>
  );
};

// Keyphrase Select Component
const KeyphraseSelect = ({ 
  clusters, 
  clusterId, 
  label, 
  order, 
  selectedKeyphrases, 
  onKeyphraseSelectedChange 
}) => {
  const getKeyphraseMenuItems = (clusters, clusterId) => {
    const cluster = clusters[parseInt(clusterId)];
    if (!cluster || !cluster[1]) return [];
    
    const keyphrasesList = cluster[1];
    const menuItems = [{ value: `${clusterId},0`, label: '0' }];
    
    keyphrasesList.forEach((keyphraseStr) => {
      const kpId = getKpId(keyphraseStr);
      menuItems.push({
        value: `${clusterId},${kpId}`,
        label: kpId
      });
    });
    
    return menuItems;
  };

  const isKeyphraseSelected = (clusters, clusterId, order, selectedKeyphrases) => {
    if (selectedKeyphrases[clusterId]) {
      if ([1, 2].includes(order)) {
        const selected = selectedKeyphrases[clusterId][`selected${order}`];
        return (selected === -1 || selected === 0) ? '0' : String(selected);
      }
    } else if (clusterId === Object.keys(clusters).length) {
      return '0';
    }
    return '0';
  };

  const menuItems = getKeyphraseMenuItems(clusters, clusterId);
  const selectedValue = isKeyphraseSelected(clusters, String(clusterId), order, selectedKeyphrases);
  const isDisabled = String(clusterId) === String(Object.keys(clusters).length);

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
      <InputLabel htmlFor={`select-keyphrase-${clusterId}-${order}`}>
        {label}
      </InputLabel>
      <Select
        id={`select-keyphrase-${clusterId}-${order}`}
        value={`${clusterId},${selectedValue}`}
        onChange={(event) => onKeyphraseSelectedChange(event.target.value)}
        disabled={isDisabled}
        size="small"
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// Cluster Chips Component
const ClusterChips = ({ clusters, clusterId, selectedKeyphrases, selectedClusters }) => {
  const cluster = clusters[clusterId];
  if (!cluster) return null;

  const [clusterDescription, keyphrases] = cluster;

  const getChipColor = (keyphraseStr, clusterId) => {
    const kpId = String(getKpId(keyphraseStr));
    const selectedKp = selectedKeyphrases[String(clusterId)] || {};
    const kpId1 = String(selectedKp.selected1 || 0);
    const kpId2 = String(selectedKp.selected2 || 0);
    const selectedCluster = selectedClusters[String(clusterId)] || '';

    if ([kpId1, kpId2].includes(kpId)) {
      switch (selectedCluster) {
        case '1': return 'success';
        case '0': return 'error';
        case '-1': return 'warning';
        default: return 'default';
      }
    }
    return 'default';
  };

  const getBorderColor = () => {
    const selectedCluster = selectedClusters[String(clusterId)] || '';
    switch (selectedCluster) {
      case '1': return 'green';
      case '0': return 'red';
      default: return 'yellow';
    }
  };

  return (
    <Box
      sx={{
        border: 5,
        borderRadius: 1,
        borderColor: getBorderColor(),
        p: 1,
        m: 1
      }}
    >
      <Typography variant="body1" gutterBottom>
        {clusterDescription}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {keyphrases.map((keyphrase, index) => (
          <Chip
            key={`${clusterId}_chip_${index}`}
            label={keyphrase}
            variant="filled"
            color={getChipColor(keyphrase, clusterId)}
            sx={{ margin: '2px' }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Main KeyphraseClusters Component
const KeyphraseClusters = ({
  clusters = {},
  selectedClusters = {},
  selectedKeyphrases = {},
  clustersAnnotatorsData = {},
  clustersInfo = "",
  clusterOrder = "numerical",
  hideSourceKeyphrases = false,
  onClusterSelectedChange = () => {},
  onKeyphrase1SelectedChange = () => {},
  onKeyphrase2SelectedChange = () => {},
  onClusterOrderChange = () => {}
}) => {
  
  const orderItems = [
    "numerical", 
    "cluster_cohesion", 
    "pairwise_similarity",
    "centroid_similarity", 
    "clues_from_other_annotators"
  ];

  const renderClusterChipsControl = () => {
    if (clusterOrder === "clues_from_other_annotators") {
      // For now, we'll skip the adjudicator functionality
      return (
        <Typography variant="body2" color="textSecondary">
          Adjudicator view not implemented yet
        </Typography>
      );
    }

    return Object.entries(clusters).map(([clusterId, _]) => (
      <Box key={`cluster_chips_control_box${clusterId}`}>
        {/* Controls */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
            mb: 1
          }}
        >
          <ClusterSelect
            clusterId={clusterId}
            selectedClusters={selectedClusters}
            onClusterSelectedChange={onClusterSelectedChange}
          />
          <KeyphraseSelect
            clusters={clusters}
            clusterId={clusterId}
            label="S1"
            order={1}
            selectedKeyphrases={selectedKeyphrases}
            onKeyphraseSelectedChange={onKeyphrase1SelectedChange}
          />
          <KeyphraseSelect
            clusters={clusters}
            clusterId={clusterId}
            label="S2"
            order={2}
            selectedKeyphrases={selectedKeyphrases}
            onKeyphraseSelectedChange={onKeyphrase2SelectedChange}
          />
        </Box>
        
        {/* Cluster Chips */}
        <ClusterChips
          clusters={clusters}
          clusterId={parseInt(clusterId)}
          selectedKeyphrases={selectedKeyphrases}
          selectedClusters={selectedClusters}
        />
      </Box>
    ));
  };

  return (
    <Grid
      item
      sx={{
        overflow: 'scroll',
        height: '85%',
        width: '50%',
        position: 'absolute',
        right: hideSourceKeyphrases ? '50%' : 0,
        padding: 2,
        paddingBottom: 12,
        paddingTop: 2
      }}
    >
      <Typography variant="h4" gutterBottom>
        Keyphrase Clusters
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mb: 1,
            alignItems: 'center'
          }}
        >
          <OrderSelect
            items={orderItems}
            clusterOrder={clusterOrder}
            onClusterOrderChange={onClusterOrderChange}
          />
        </Box>
        {clustersInfo && (
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{ 
              fontSize: '0.875rem',
              fontStyle: 'italic',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {clustersInfo}
          </Typography>
        )}
      </Box>

      {renderClusterChipsControl()}
    </Grid>
  );
};

export default KeyphraseClusters;