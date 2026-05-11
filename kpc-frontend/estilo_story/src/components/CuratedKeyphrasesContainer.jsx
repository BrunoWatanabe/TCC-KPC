import React, { useEffect } from 'react';
import CuratedKeyphrases from './CuratedKeyphrases';
import { useCuratedKeyphrases } from '../stores';

const CuratedKeyphrasesContainer = ({
  initialCuratedKeyphrasesOrder = "source_cluster",
  initialCuratedKeyphrases = {},
  initialKeyphraseAlias = {},
  initialSelectedClusters = {},
  initialCuratedKeyphrasesLength = 10,
  onStateChange = () => {} // Callback para comunicar mudanças de estado para o backend
}) => {
  // Hook do Zustand
  const {
    curatedKeyphrasesOrder,
    curatedKeyphrases,
    keyphraseAlias,
    selectedClusters,
    curatedKeyphrasesLength,
    setCuratedKeyphrasesOrder,
    saveKeyphraseAlias,
    setSelectedClusters,
    initialize,
    getState
  } = useCuratedKeyphrases();

  // Inicializar store com dados iniciais
  useEffect(() => {
    initialize({
      curatedKeyphrasesOrder: initialCuratedKeyphrasesOrder,
      curatedKeyphrases: initialCuratedKeyphrases,
      keyphraseAlias: initialKeyphraseAlias,
      selectedClusters: initialSelectedClusters,
      curatedKeyphrasesLength: initialCuratedKeyphrasesLength
    });
  }, [
    initialCuratedKeyphrasesOrder,
    initialCuratedKeyphrases,
    initialKeyphraseAlias,
    initialSelectedClusters,
    initialCuratedKeyphrasesLength,
    initialize
  ]);

  // Handler para mudança de ordem
  const handleCuratedKeyphrasesOrder = (newOrder) => {
    setCuratedKeyphrasesOrder(newOrder);
    onStateChange({
      type: 'curatedKeyphrasesOrderChange',
      value: newOrder,
      state: getState()
    });
  };

  // Handler para salvar alias
  const handleKeyphraseAliasSaveClick = ([clusterId, aliasValue]) => {
    saveKeyphraseAlias(clusterId, aliasValue);
    onStateChange({
      type: 'keyphraseAliasSave',
      value: { clusterId, aliasValue },
      state: getState()
    });
  };

  // Handler para atualização de clusters selecionados (caso venha de outro componente)
  const handleSelectedClustersUpdate = (newSelectedClusters) => {
    setSelectedClusters(newSelectedClusters);
    onStateChange({
      type: 'selectedClustersUpdate',
      value: newSelectedClusters,
      state: getState()
    });
  };

  return (
    <CuratedKeyphrases
      curatedKeyphrasesOrder={curatedKeyphrasesOrder}
      curatedKeyphrases={curatedKeyphrases}
      keyphraseAlias={keyphraseAlias}
      selectedClusters={selectedClusters}
      curatedKeyphrasesLength={curatedKeyphrasesLength}
      onCuratedKeyphrasesOrder={handleCuratedKeyphrasesOrder}
      onKeyphraseAliasSaveClick={handleKeyphraseAliasSaveClick}
      onSelectedClustersUpdate={handleSelectedClustersUpdate}
    />
  );
};

export default CuratedKeyphrasesContainer;