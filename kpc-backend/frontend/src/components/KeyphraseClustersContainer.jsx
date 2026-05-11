import React, { useEffect } from 'react';
import KeyphraseClusters from './KeyphraseClusters';
import { useKeyphraseClusters } from '../stores';

const KeyphraseClustersContainer = ({
  initialClusters = {},
  initialSelectedClusters = {},
  initialSelectedKeyphrases = {},
  initialClustersAnnotatorsData = {},
  initialClustersInfo = "",
  initialClusterOrder = "numerical",
  initialHideSourceKeyphrases = false,
  onStateChange = () => {} // Callback para comunicar mudanças de estado para o backend
}) => {
  // Hook do Zustand
  const {
    clusters,
    selectedClusters,
    selectedKeyphrases,
    clustersAnnotatorsData,
    clustersInfo,
    clusterOrder,
    hideSourceKeyphrases,
    setClusterOrder,
    setHideSourceKeyphrases,
    updateClusterSelection,
    updateKeyphrase1Selection,
    updateKeyphrase2Selection,
    initialize,
    getState
  } = useKeyphraseClusters();

  // Inicializar store com dados iniciais
  useEffect(() => {
    initialize({
      clusters: initialClusters,
      selectedClusters: initialSelectedClusters,
      selectedKeyphrases: initialSelectedKeyphrases,
      clustersAnnotatorsData: initialClustersAnnotatorsData,
      clustersInfo: initialClustersInfo,
      clusterOrder: initialClusterOrder,
      hideSourceKeyphrases: initialHideSourceKeyphrases
    });
  }, [
    initialClusters,
    initialSelectedClusters,
    initialSelectedKeyphrases,
    initialClustersAnnotatorsData,
    initialClustersInfo,
    initialClusterOrder,
    initialHideSourceKeyphrases,
    initialize
  ]);

  // Handlers para mudanças de estado
  const handleClusterSelectedChange = (value) => {
    // Parse do valor no formato "clusterId,selection"
    const [clusterId, selection] = value.split(',');
    updateClusterSelection(clusterId, selection);
    
    onStateChange({
      type: 'clusterSelectedChange',
      value: { clusterId, selection },
      state: getState()
    });
  };

  const handleKeyphrase1SelectedChange = (value) => {
    // Parse do valor no formato "clusterId,keyphraseId"
    const [clusterId, keyphraseId] = value.split(',');
    updateKeyphrase1Selection(clusterId, parseInt(keyphraseId));
    
    onStateChange({
      type: 'keyphrase1SelectedChange',
      value: { clusterId, keyphraseId: parseInt(keyphraseId) },
      state: getState()
    });
  };

  const handleKeyphrase2SelectedChange = (value) => {
    // Parse do valor no formato "clusterId,keyphraseId"
    const [clusterId, keyphraseId] = value.split(',');
    updateKeyphrase2Selection(clusterId, parseInt(keyphraseId));
    
    onStateChange({
      type: 'keyphrase2SelectedChange',
      value: { clusterId, keyphraseId: parseInt(keyphraseId) },
      state: getState()
    });
  };

  const handleClusterOrderChange = (newOrder) => {
    setClusterOrder(newOrder);
    onStateChange({
      type: 'clusterOrderChange',
      value: newOrder,
      state: getState()
    });
  };

  const handleHideSourceKeyphrasesChange = (hideValue) => {
    setHideSourceKeyphrases(hideValue);
    onStateChange({
      type: 'hideSourceKeyphrasesChange',
      value: hideValue,
      state: getState()
    });
  };

  return (
    <KeyphraseClusters
      clusters={clusters}
      selectedClusters={selectedClusters}
      selectedKeyphrases={selectedKeyphrases}
      clustersAnnotatorsData={clustersAnnotatorsData}
      clustersInfo={clustersInfo}
      clusterOrder={clusterOrder}
      hideSourceKeyphrases={hideSourceKeyphrases}
      onClusterSelectedChange={handleClusterSelectedChange}
      onKeyphrase1SelectedChange={handleKeyphrase1SelectedChange}
      onKeyphrase2SelectedChange={handleKeyphrase2SelectedChange}
      onClusterOrderChange={handleClusterOrderChange}
      onHideSourceKeyphrasesChange={handleHideSourceKeyphrasesChange}
    />
  );
};

export default KeyphraseClustersContainer;