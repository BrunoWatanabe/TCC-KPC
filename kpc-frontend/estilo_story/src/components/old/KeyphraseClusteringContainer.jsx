import React, { useState, useEffect } from 'react';
import KeyphraseClustering from '../KeyphraseClustering';

const KeyphraseClusteringContainer = ({
  initialClusters = {},
  initialKeyphraseClustering = {},
  initialHideClustered = false,
  initialKeyphraseOrder = "alphabetical",
  onStateChange = () => {} // Callback para comunicar mudanças de estado para o backend
}) => {
  // Estados locais
  const [clusters, setClusters] = useState(initialClusters);
  const [keyphraseClustering, setKeyphraseClustering] = useState(initialKeyphraseClustering);
  const [hideClustered, setHideClustered] = useState(initialHideClustered);
  const [keyphraseOrder, setKeyphraseOrder] = useState(initialKeyphraseOrder);

  // Atualizar estados quando props iniciais mudarem
  useEffect(() => {
    setClusters(initialClusters);
  }, [initialClusters]);

  useEffect(() => {
    setKeyphraseClustering(initialKeyphraseClustering);
  }, [initialKeyphraseClustering]);

  useEffect(() => {
    setHideClustered(initialHideClustered);
  }, [initialHideClustered]);

  useEffect(() => {
    setKeyphraseOrder(initialKeyphraseOrder);
  }, [initialKeyphraseOrder]);

  // Handlers para mudanças de estado
  const handleKeyphrasesOrderByChange = (newOrder) => {
    setKeyphraseOrder(newOrder);
    onStateChange({
      type: 'keyphraseOrderChange',
      value: newOrder,
      state: {
        clusters,
        keyphraseClustering,
        hideClustered,
        keyphraseOrder: newOrder
      }
    });
  };

  const handleHideClusteredChange = (newHideValue) => {
    setHideClustered(newHideValue);
    onStateChange({
      type: 'hideClusteredChange',
      value: newHideValue,
      state: {
        clusters,
        keyphraseClustering,
        hideClustered: newHideValue,
        keyphraseOrder
      }
    });
  };

  const handleKeyphraseClusteringChange = (value) => {
    // Parse do valor no formato "key,clusterIndex"
    const [key, clusterIndex] = value.split(',');
    const updatedClustering = {
      ...keyphraseClustering,
      [key]: {
        ...keyphraseClustering[key],
        clustering: parseInt(clusterIndex)
      }
    };
    
    setKeyphraseClustering(updatedClustering);
    onStateChange({
      type: 'keyphraseClusteringChange',
      value: { key, clusterIndex: parseInt(clusterIndex) },
      state: {
        clusters,
        keyphraseClustering: updatedClustering,
        hideClustered,
        keyphraseOrder
      }
    });
  };

  return (
    <KeyphraseClustering
      clusters={clusters}
      keyphraseClustering={keyphraseClustering}
      hideClusteredState={hideClustered}
      keyphraseOrder={keyphraseOrder}
      onKeyphrasesOrderByChange={handleKeyphrasesOrderByChange}
      onHideClusteredChange={handleHideClusteredChange}
      onKeyphraseClusteringChange={handleKeyphraseClusteringChange}
    />
  );
};

export default KeyphraseClusteringContainer;