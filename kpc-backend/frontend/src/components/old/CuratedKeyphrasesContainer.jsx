import React, { useState, useEffect } from 'react';
import CuratedKeyphrases from '../CuratedKeyphrases';

const CuratedKeyphrasesContainer = ({
  initialCuratedKeyphrasesOrder = "source_cluster",
  initialCuratedKeyphrases = {},
  initialKeyphraseAlias = {},
  initialSelectedClusters = {},
  initialCuratedKeyphrasesLength = 10,
  onStateChange = () => {} // Callback para comunicar mudanças de estado para o backend
}) => {
  // Estados locais
  const [curatedKeyphrasesOrder, setCuratedKeyphrasesOrder] = useState(initialCuratedKeyphrasesOrder);
  const [curatedKeyphrases, setCuratedKeyphrases] = useState(initialCuratedKeyphrases);
  const [keyphraseAlias, setKeyphraseAlias] = useState(initialKeyphraseAlias);
  const [selectedClusters, setSelectedClusters] = useState(initialSelectedClusters);
  const [curatedKeyphrasesLength, setCuratedKeyphrasesLength] = useState(initialCuratedKeyphrasesLength);

  // Atualizar estados quando props iniciais mudarem
  useEffect(() => {
    setCuratedKeyphrasesOrder(initialCuratedKeyphrasesOrder);
  }, [initialCuratedKeyphrasesOrder]);

  useEffect(() => {
    setCuratedKeyphrases(initialCuratedKeyphrases);
  }, [initialCuratedKeyphrases]);

  useEffect(() => {
    setKeyphraseAlias(initialKeyphraseAlias);
  }, [initialKeyphraseAlias]);

  useEffect(() => {
    setSelectedClusters(initialSelectedClusters);
  }, [initialSelectedClusters]);

  useEffect(() => {
    setCuratedKeyphrasesLength(initialCuratedKeyphrasesLength);
  }, [initialCuratedKeyphrasesLength]);

  // Handler para mudança de ordem
  const handleCuratedKeyphrasesOrder = (newOrder) => {
    setCuratedKeyphrasesOrder(newOrder);
    onStateChange({
      type: 'curatedKeyphrasesOrderChange',
      value: newOrder,
      state: {
        curatedKeyphrasesOrder: newOrder,
        curatedKeyphrases,
        keyphraseAlias,
        selectedClusters,
        curatedKeyphrasesLength
      }
    });
  };

  // Handler para salvar alias
  const handleKeyphraseAliasSaveClick = ([clusterId, aliasValue]) => {
    const updatedKeyphraseAlias = {
      ...keyphraseAlias,
      [clusterId]: aliasValue
    };
    
    setKeyphraseAlias(updatedKeyphraseAlias);
    onStateChange({
      type: 'keyphraseAliasSave',
      value: { clusterId, aliasValue },
      state: {
        curatedKeyphrasesOrder,
        curatedKeyphrases,
        keyphraseAlias: updatedKeyphraseAlias,
        selectedClusters,
        curatedKeyphrasesLength
      }
    });
  };

  // Handler para atualização de clusters selecionados (caso venha de outro componente)
  const handleSelectedClustersUpdate = (newSelectedClusters) => {
    setSelectedClusters(newSelectedClusters);
    onStateChange({
      type: 'selectedClustersUpdate',
      value: newSelectedClusters,
      state: {
        curatedKeyphrasesOrder,
        curatedKeyphrases,
        keyphraseAlias,
        selectedClusters: newSelectedClusters,
        curatedKeyphrasesLength
      }
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
    />
  );
};

export default CuratedKeyphrasesContainer;