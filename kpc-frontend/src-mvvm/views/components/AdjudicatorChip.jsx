/**
 * AdjudicatorChip.jsx - Chip individual de adjudicação
 * Migração de /Users/akira/dados/sync/dev/keyphrase_curation/frontend/src/components/AdjudicatorChip.jsx
 * (que por sua vez migra o componente reactpy `adjudicator_chip.py`)
 *
 * VERSÃO CONTROLADA: o estado do cluster do adjudicator vem das props
 * (fonte de verdade: backend via ViewModel). O componente apenas calcula
 * o tipo e dispara onChange com a próxima lista.
 *
 * Estados possíveis (derivados de kp estar nos clusters):
 *  - consented:            kp em adjudicator + annotator1 + annotator2
 *  - consented_rejected:   kp fora do adjudicator, mas em annotator1 e annotator2
 *  - consented1/rejected1: kp em annotator1 (consentido ou rejeitado pelo adjudicator)
 *  - consented2/rejected2: kp em annotator2 (consentido ou rejeitado pelo adjudicator)
 *  - null:                 kp não está em nenhum cluster (sem ação)
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UndoIcon from '@mui/icons-material/Undo';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PropTypes from 'prop-types';

export default function AdjudicatorChip({
  keyProp = '123',
  title = 'Test',
  kp = '1',
  adjudicatorCluster = ['1'],
  annotator1Cluster = ['1'],
  annotator2Cluster = ['1'],
  onChange,
}) {
  let type = null;
  if (
    adjudicatorCluster.includes(kp) &&
    annotator1Cluster.includes(kp) &&
    annotator2Cluster.includes(kp)
  ) {
    type = 'consented';
  } else if (
    !adjudicatorCluster.includes(kp) &&
    annotator1Cluster.includes(kp) &&
    annotator2Cluster.includes(kp)
  ) {
    type = 'consented_rejected';
  } else if (annotator1Cluster.includes(kp)) {
    type = adjudicatorCluster.includes(kp) ? 'consented1' : 'rejected1';
  } else if (annotator2Cluster.includes(kp)) {
    type = adjudicatorCluster.includes(kp) ? 'consented2' : 'rejected2';
  }

  const adjudicatorAction = () => {
    const next = [...adjudicatorCluster];
    const remove = ['consented', 'consented1', 'consented2'].includes(type);
    const add = ['consented_rejected', 'rejected1', 'rejected2'].includes(type);
    if (remove) {
      const idx = next.indexOf(kp);
      if (idx !== -1) next.splice(idx, 1);
    } else if (add) {
      next.push(kp);
    } else {
      return; // type === null: sem ação
    }
    if (onChange) onChange(next);
  };

  const bgColors = {
    consented: '#AFB0AE',
    null: 'transparent',
    consented_rejected: '#FBFBFB',
    consented1: '#AFB0AE',
    rejected1: '#A4A3E2',
    consented2: '#AFB0AE',
    rejected2: '#E4C890',
  };
  const bgColor = bgColors[String(type)];

  const borderColors = {
    consented: 'transparent',
    null: 'transparent',
    consented_rejected: '#AFB0AE',
    consented1: '#4E3CB9',
    rejected1: 'transparent',
    consented2: '#E7A931',
    rejected2: 'transparent',
  };
  const borderColor = borderColors[String(type)];

  const iconMap = {
    consented: HighlightOffIcon,
    null: HighlightOffIcon,
    consented_rejected: UndoIcon,
    consented1: UndoIcon,
    rejected1: CheckCircleOutlineIcon,
    consented2: UndoIcon,
    rejected2: CheckCircleOutlineIcon,
  };
  const IconComponent = iconMap[String(type)];

  return (
    <Box key={`${keyProp}_container`}>
      <Box sx={{ my: 2 }} key={keyProp}>
        <Box
          key={`box1_${keyProp}`}
          onClick={adjudicatorAction}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: 32,
            borderRadius: 500,
            borderWidth: 4,
            borderColor,
            borderStyle: 'solid',
            alignItems: 'center',
            paddingLeft: '15px',
            paddingRight: '15px',
            backgroundColor: bgColor,
            width: 'max-content',
            cursor: 'pointer',
          }}
        >
          <Typography key={`typography${keyProp}`} sx={{ paddingRight: '10px' }}>
            {title}
          </Typography>
          <Box key={`box2_${keyProp}`} sx={{ height: 24, cursor: 'pointer' }}>
            <IconComponent key={`icon${keyProp}`} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

AdjudicatorChip.propTypes = {
  keyProp: PropTypes.string,
  title: PropTypes.string,
  kp: PropTypes.string,
  adjudicatorCluster: PropTypes.arrayOf(PropTypes.string),
  annotator1Cluster: PropTypes.arrayOf(PropTypes.string),
  annotator2Cluster: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};