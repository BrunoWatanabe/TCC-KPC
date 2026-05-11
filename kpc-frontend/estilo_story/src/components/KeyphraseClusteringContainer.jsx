import React, { useEffect } from 'react';
import KeyphraseClustering from './KeyphraseClustering';
import { useKeyphraseClustering } from '../stores';

const KeyphraseClusteringContainer = ({
  initialClusters = {},
  initialKeyphraseClustering = {},
  initialHideClustered = false,
  initialKeyphraseOrder = "alphabetical",
  onStateChange = () => {} // Callback para comunicar mudanças de estado para o backend
}) => {
  // Hook do Zustand
  const {
    clusters,
    keyphraseClustering,
    hideClustered,
    keyphraseOrder,
    setKeyphraseOrder,
    setHideClustered,
    updateKeyphraseClustering,
    initialize,
    getState
  } = useKeyphraseClustering();

  // Inicializar store com dados iniciais
  useEffect(() => {
    initialize({
      clusters: initialClusters,
      keyphraseClustering: initialKeyphraseClustering,
      hideClustered: initialHideClustered,
      keyphraseOrder: initialKeyphraseOrder
    });
  }, [initialClusters, initialKeyphraseClustering, initialHideClustered, initialKeyphraseOrder, initialize]);

  // Handlers para mudanças de estado
  const handleKeyphrasesOrderByChange = (newOrder) => {
    setKeyphraseOrder(newOrder);
    onStateChange({
      type: 'keyphraseOrderChange',
      value: newOrder,
      state: getState()
    });
  };

  const handleHideClusteredChange = (newHideValue) => {
    setHideClustered(newHideValue);
    onStateChange({
      type: 'hideClusteredChange',
      value: newHideValue,
      state: getState()
    });
  };

  const handleKeyphraseClusteringChange = (value) => {
    // Parse do valor no formato "key,clusterIndex"
    const [key, clusterIndex] = value.split(',');
    updateKeyphraseClustering(key, parseInt(clusterIndex));
    
    onStateChange({
      type: 'keyphraseClusteringChange',
      value: { key, clusterIndex: parseInt(clusterIndex) },
      state: getState()
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