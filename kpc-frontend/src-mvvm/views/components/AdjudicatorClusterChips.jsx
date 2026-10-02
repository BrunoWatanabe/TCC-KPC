/**
 * AdjudicatorClusterChips.jsx - Componente para chips de adjudicator
 * Replica a lógica do adjudicator_clusters.py e chip_test.py do ReactPy
 * Usado no modo "clues_from_other_annotators" do KeyphraseClusters
 *
 * Design visual (do adjudicator_chip.py original):
 *  - consented:            cinza sólido (#AFB0AE) — KP consentida pelo adjudicator
 *  - consented_rejected:   branco (#FBFBFB) com borda cinza — KP convergente rejeitada
 *  - consented1:           cinza com borda roxa (#4E3CB9) — KP do anotador1 consentida
 *  - rejected1:            roxo claro (#A4A3E2) — KP do anotador1 rejeitada
 *  - consented2:           cinza com borda laranja (#E7A931) — KP do anotador2 consentida
 *  - rejected2:            laranja claro (#E4C890) — KP do anotador2 rejeitada
 *  - null:                 transparente — KP não está em nenhum cluster
 */
import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UndoIcon from '@mui/icons-material/Undo';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Mapa de transição de estados (mesma lógica do adjudicator_chip.py original)
const NEXT_STATE_MAP = {
  consented: 'consented_rejected',
  consented_rejected: 'consented',
  consented1: 'rejected1',
  rejected1: 'consented1',
  consented2: 'rejected2',
  rejected2: 'consented2',
};

// Cores de fundo por tipo (mesmas do adjudicator_chip.py)
const BG_COLORS = {
  consented: '#AFB0AE',
  consented_rejected: '#FBFBFB',
  consented1: '#AFB0AE',
  rejected1: '#A4A3E2',
  consented2: '#AFB0AE',
  rejected2: '#E4C890',
};

// Cores de borda por tipo (mesmas do adjudicator_chip.py)
const BORDER_COLORS = {
  consented: 'transparent',
  consented_rejected: '#AFB0AE',
  consented1: '#4E3CB9',
  rejected1: 'transparent',
  consented2: '#E7A931',
  rejected2: 'transparent',
};

// Ícones por tipo (mesmos do adjudicator_chip.py)
const ICON_MAP = {
  consented: HighlightOffIcon,
  consented_rejected: UndoIcon,
  consented1: UndoIcon,
  rejected1: CheckCircleOutlineIcon,
  consented2: UndoIcon,
  rejected2: CheckCircleOutlineIcon,
};

/**
 * Verifica se keyphrase está em uma lista específica
 */
function verifyKeyphrase(cluster, keyphrase) {
  if (!Array.isArray(cluster) || !keyphrase) return false;
  return cluster.some(kp => kp === keyphrase);
}

/**
 * Determina o tipo/estado atual de uma keyphrase
 * Replica a lógica do adjudicator_chip.py:
 *  - consented:            kp em adjudicator + annotator1 + annotator2
 *  - consented_rejected:   kp fora do adjudicator, mas em annotator1 E annotator2
 *  - consented1/rejected1: kp somente em annotator1 (consentido/rejeitado)
 *  - consented2/rejected2: kp somente em annotator2 (consentido/rejeitado)
 *  - null:                 kp não está em nenhum cluster
 */
function getKeyphraseType(keyphrase, adjudicatorCluster, annotator1Cluster, annotator2Cluster) {
  const inAdjudicator = verifyKeyphrase(adjudicatorCluster, keyphrase);
  const inAnnotator1 = verifyKeyphrase(annotator1Cluster, keyphrase);
  const inAnnotator2 = verifyKeyphrase(annotator2Cluster, keyphrase);

  if (inAdjudicator && inAnnotator1 && inAnnotator2) return 'consented';
  if (!inAdjudicator && inAnnotator1 && inAnnotator2) return 'consented_rejected';
  if (inAnnotator1) return inAdjudicator ? 'consented1' : 'rejected1';
  if (inAnnotator2) return inAdjudicator ? 'consented2' : 'rejected2';
  return null;
}

const AdjudicatorClusterChips = ({
  clusterId,
  adjudicatorCluster = [],
  annotator1Cluster = [],
  annotator2Cluster = [],
  unionList = [],
  onAdjudicatorAction,
  disabled = false,
}) => {
  const [localAdjudicatorCluster, setLocalAdjudicatorCluster] = useState(adjudicatorCluster);

  useEffect(() => {
    setLocalAdjudicatorCluster(adjudicatorCluster);
  }, [adjudicatorCluster]);

  function handleAdjudicatorAction(keyphrase, currentType) {
    if (disabled) return;

    const remove = ['consented', 'consented1', 'consented2'].includes(currentType);
    const add = ['consented_rejected', 'rejected1', 'rejected2'].includes(currentType);
    if (!remove && !add) return;

    const newType = NEXT_STATE_MAP[currentType];

    const next = localAdjudicatorCluster.filter(kp => kp !== keyphrase);
    if (add) {
      next.push(keyphrase);
    }
    setLocalAdjudicatorCluster(next);

    if (onAdjudicatorAction) {
      onAdjudicatorAction({
        clusterId,
        keyphrase,
        currentType,
        newAction: remove ? 'reject' : 'consent',
        newType,
      });
    }
  }

  function renderKeyphraseChip(keyphrase, index) {
    const type = getKeyphraseType(keyphrase, localAdjudicatorCluster, annotator1Cluster, annotator2Cluster);
    const typeKey = String(type);
    const hasAction = type !== null;

    const bgColor = BG_COLORS[typeKey] || 'transparent';
    const borderColor = BORDER_COLORS[typeKey] || 'transparent';
    const IconComponent = ICON_MAP[typeKey] || HighlightOffIcon;

    const cleanText = typeof keyphrase === 'string'
      ? keyphrase.replace(/\s*\(\d+\)$/, '')
      : String(keyphrase);

    const iconSvg = React.createElement(IconComponent, { fontSize: 'small' });

    if (!hasAction || disabled) {
      return (
        <span
          key={index}
          style={{
            display: 'inline-flex',
            flexDirection: 'row',
            height: '32px',
            borderRadius: '500px',
            borderWidth: '4px',
            borderColor: borderColor,
            borderStyle: 'solid',
            alignItems: 'center',
            paddingLeft: '15px',
            paddingRight: '15px',
            backgroundColor: bgColor,
            width: 'max-content',
            opacity: '0.5',
            margin: '2px',
          }}
        >
          <span style={{ paddingRight: '10px' }}>{cleanText}</span>
          <span style={{ height: '24px' }}>{iconSvg}</span>
        </span>
      );
    }

    return (
      <button
        key={index}
        onClick={() => handleAdjudicatorAction(keyphrase, type)}
        style={{
          display: 'inline-flex',
          flexDirection: 'row',
          height: '32px',
          borderRadius: '500px',
          borderWidth: '4px',
          borderColor: borderColor,
          borderStyle: 'solid',
          alignItems: 'center',
          paddingLeft: '15px',
          paddingRight: '15px',
          backgroundColor: bgColor,
          width: 'max-content',
          cursor: 'pointer',
          margin: '2px',
          fontFamily: 'inherit',
          fontSize: 'inherit',
        }}
      >
        <span style={{ paddingRight: '10px' }}>{cleanText}</span>
        <span style={{ height: '24px' }}>{iconSvg}</span>
      </button>
    );
  }

  if (!Array.isArray(unionList) || unionList.length === 0) {
    return (
      <div style={{ padding: '16px' }}>
        <span style={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
          Nenhuma keyphrase disponível para adjudicação no cluster {clusterId}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        backgroundColor: 'background.paper',
      }}
    >
      <h6 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>
        Cluster {clusterId} - Adjudicação
      </h6>

      {/* Apenas a união — as cores dos chips indicam o estado visualmente */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {unionList.map((kp, index) => renderKeyphraseChip(kp, index))}
      </div>

      <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <span style={{ fontSize: '0.75rem' }}>
          <strong>Legenda:</strong> Cinza = KP consentida. Branco com borda = KP convergente rejeitada.
          Roxo = KP divergente do Anotador 1. Laranja = KP divergente do Anotador 2.
          Clique para alternar entre consentir e rejeitar.
        </span>
      </div>
    </div>
  );
};

export default AdjudicatorClusterChips;