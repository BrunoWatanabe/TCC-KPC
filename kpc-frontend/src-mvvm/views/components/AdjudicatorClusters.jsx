/**
 * AdjudicatorClusters.jsx - Estado global dos clusters do adjudicator
 * Migração de /Users/akira/dados/sync/dev/keyphrase_curation/frontend/src/components/AdjudicatorClusters.jsx
 * (que por sua vez migra `adjudicator_clusters.py`)
 *
 * Exporta:
 *  - AdjudicatorClusterChips: renderiza um cluster com título e lista de AdjudicatorChips
 *  - AdjudicatorClusters (default): mantém o estado dos clusters do adjudicator
 *    e renderiza um AdjudicatorClusterChips por cluster
 *
 * Formato de clustersAnnotationData (igual ao Python):
 * {
 *   adjudicator: { clusterId: [desc, [kp...]] },
 *   annotator1:  { clusterId: [desc, [kp...]] },
 *   annotator2:  { clusterId: [desc, [kp...]] },
 *   union:       { clusterId: [desc, [kp...]] },
 * }
 */
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AdjudicatorChip from './AdjudicatorChip';
import PropTypes from 'prop-types';

export function AdjudicatorClusterChips({
  clusterId,
  adjudicatorCluster,
  annotator1Cluster,
  annotator2Cluster,
  unionList,
  onAdjudicatorClusterChange,
  onAdjudicatorAction,
}) {
  return (
    <Box
      key={`${clusterId}_box2`}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        border: 5,
        borderRadius: 4,
        borderColor: 'gray',
        p: 1,
        m: 1,
      }}
    >
      <Box key={`${clusterId}_box1`}>
        <Typography variant="body1" key={`${clusterId}_title`}>
          {`Cluster ${clusterId}`}
        </Typography>
        <Box
          key={`${clusterId}_chip_list`}
          component="div"
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
        >
          {unionList.map((keyphrase, chipId) => (
            <AdjudicatorChip
              key={`${clusterId}_chip_${chipId}`}
              keyProp={`${clusterId}_chip_${chipId}`}
              kp={String(keyphrase)}
              title={String(keyphrase)}
              adjudicatorCluster={adjudicatorCluster}
              annotator1Cluster={annotator1Cluster}
              annotator2Cluster={annotator2Cluster}
              onChange={(next) => {
                onAdjudicatorClusterChange(next);
                if (onAdjudicatorAction) {
                  onAdjudicatorAction({
                    clusterId,
                    keyphrase: String(keyphrase),
                    newAction: adjudicatorCluster.includes(String(keyphrase))
                      ? 'reject'
                      : 'consent',
                  });
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

AdjudicatorClusterChips.propTypes = {
  clusterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  adjudicatorCluster: PropTypes.arrayOf(PropTypes.string),
  annotator1Cluster: PropTypes.arrayOf(PropTypes.string),
  annotator2Cluster: PropTypes.arrayOf(PropTypes.string),
  unionList: PropTypes.arrayOf(PropTypes.string),
  onAdjudicatorClusterChange: PropTypes.func,
  onAdjudicatorAction: PropTypes.func,
};

export default function AdjudicatorClusters({ clustersAnnotationData = {}, onAdjudicatorAction }) {
  const union = clustersAnnotationData.union || {};

  // VERSÃO CONTROLADA: o estado dos clusters do adjudicator é derivado
  // diretamente de clustersAnnotationData (fonte de verdade: backend).
  // O ViewModel recarrega adjudicatorData após cada ação, então este
  // componente re-renderiza com os dados atualizados.
  const [adjudicatorClusters, setAdjudicatorClusters] = useState(
    Object.fromEntries(
      Object.entries(clustersAnnotationData.adjudicator || {}).map(
        ([clusterId, [, kps]]) => [String(clusterId), kps]
      )
    )
  );

  // Sincronizar quando o backend enviar dados atualizados
  useEffect(() => {
    setAdjudicatorClusters(
      Object.fromEntries(
        Object.entries(clustersAnnotationData.adjudicator || {}).map(
          ([clusterId, [, kps]]) => [String(clusterId), kps]
        )
      )
    );
  }, [clustersAnnotationData]);

  const handleChange = (clusterId, nextCluster) => {
    setAdjudicatorClusters((prev) => ({
      ...prev,
      [String(clusterId)]: nextCluster,
    }));
  };

  return (
    <div>
      {Object.keys(union).map((clusterId) => (
        <AdjudicatorClusterChips
          key={clusterId}
          clusterId={clusterId}
          adjudicatorCluster={adjudicatorClusters[String(clusterId)] || []}
          annotator1Cluster={(clustersAnnotationData.annotator1?.[clusterId] || [])[1] || []}
          annotator2Cluster={(clustersAnnotationData.annotator2?.[clusterId] || [])[1] || []}
          unionList={(union[clusterId] || [])[1] || []}
          onAdjudicatorClusterChange={(next) => handleChange(clusterId, next)}
          onAdjudicatorAction={onAdjudicatorAction}
        />
      ))}
    </div>
  );
}

AdjudicatorClusters.propTypes = {
  clustersAnnotationData: PropTypes.shape({
    adjudicator: PropTypes.object,
    annotator1: PropTypes.object,
    annotator2: PropTypes.object,
    union: PropTypes.object,
  }),
  onAdjudicatorAction: PropTypes.func,
};