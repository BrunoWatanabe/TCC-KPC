import React, { useState, useEffect } from 'react';
import KeyphraseClusters from '../KeyphraseClusters';

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
  // Estados locais
  const [clusters, setClusters] = useState(initialClusters);
  const [selectedClusters, setSelectedClusters] = useState(initialSelectedClusters);
  const [selectedKeyphrases, setSelectedKeyphrases] = useState(initialSelectedKeyphrases);
  const [clustersAnnotatorsData, setClustersAnnotatorsData] = useState(initialClustersAnnotatorsData);
  const [clustersInfo, setClustersInfo] = useState(initialClustersInfo);
  const [clusterOrder, setClusterOrder] = useState(initialClusterOrder);
  const [hideSourceKeyphrases, setHideSourceKeyphrases] = useState(initialHideSourceKeyphrases);

  // Atualizar estados quando props iniciais mudarem
  useEffect(() => {
    setClusters(initialClusters);
  }, [initialClusters]);

  useEffect(() => {
    setSelectedClusters(initialSelectedClusters);
  }, [initialSelectedClusters]);

  useEffect(() => {
    setSelectedKeyphrases(initialSelectedKeyphrases);
  }, [initialSelectedKeyphrases]);

  useEffect(() => {
    setClustersAnnotatorsData(initialClustersAnnotatorsData);
  }, [initialClustersAnnotatorsData]);

  useEffect(() => {
    setClustersInfo(initialClustersInfo);
  }, [initialClustersInfo]);

  useEffect(() => {
    setClusterOrder(initialClusterOrder);
  }, [initialClusterOrder]);

  useEffect(() => {
    setHideSourceKeyphrases(initialHideSourceKeyphrases);
  }, [initialHideSourceKeyphrases]);

  // Handlers para mudanças de estado
  const handleClusterSelectedChange = (value) => {
    // Parse do valor no formato "clusterId,selection"
    const [clusterId, selection] = value.split(',');
    const updatedSelectedClusters = {
      ...selectedClusters,
      [clusterId]: selection
    };
    
    setSelectedClusters(updatedSelectedClusters);
    onStateChange({
      type: 'clusterSelectedChange',
      value: { clusterId, selection },
      state: {
        clusters,
        selectedClusters: updatedSelectedClusters,
        selectedKeyphrases,
        clustersInfo,
        clusterOrder,
        hideSourceKeyphrases
      }
    });
  };

  const handleKeyphrase1SelectedChange = (value) => {
    // Parse do valor no formato "clusterId,keyphraseId"
    const [clusterId, keyphraseId] = value.split(',');
    const updatedSelectedKeyphrases = {
      ...selectedKeyphrases,
      [clusterId]: {
        ...selectedKeyphrases[clusterId],
        selected1: parseInt(keyphraseId)
      }
    };
    
    setSelectedKeyphrases(updatedSelectedKeyphrases);
    onStateChange({
      type: 'keyphrase1SelectedChange',
      value: { clusterId, keyphraseId: parseInt(keyphraseId) },
      state: {
        clusters,
        selectedClusters,
        selectedKeyphrases: updatedSelectedKeyphrases,
        clustersInfo,
        clusterOrder,
        hideSourceKeyphrases
      }
    });
  };

  const handleKeyphrase2SelectedChange = (value) => {
    // Parse do valor no formato "clusterId,keyphraseId"
    const [clusterId, keyphraseId] = value.split(',');
    const updatedSelectedKeyphrases = {
      ...selectedKeyphrases,
      [clusterId]: {
        ...selectedKeyphrases[clusterId],
        selected2: parseInt(keyphraseId)
      }
    };
    
    setSelectedKeyphrases(updatedSelectedKeyphrases);
    onStateChange({
      type: 'keyphrase2SelectedChange',
      value: { clusterId, keyphraseId: parseInt(keyphraseId) },
      state: {
        clusters,
        selectedClusters,
        selectedKeyphrases: updatedSelectedKeyphrases,
        clustersInfo,
        clusterOrder,
        hideSourceKeyphrases
      }
    });
  };

  const handleClusterOrderChange = (newOrder) => {
    setClusterOrder(newOrder);
    onStateChange({
      type: 'clusterOrderChange',
      value: newOrder,
      state: {
        clusters,
        selectedClusters,
        selectedKeyphrases,
        clustersInfo,
        clusterOrder: newOrder,
        hideSourceKeyphrases
      }
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
    />
  );
};

export default KeyphraseClustersContainer;