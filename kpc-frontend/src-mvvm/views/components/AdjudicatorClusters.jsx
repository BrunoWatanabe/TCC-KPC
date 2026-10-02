/**
 * AdjudicatorClusters.jsx - Estado global dos clusters do adjudicator
 * Migração de /Users/akira/dados/sync/dev/keyphrase_curation/frontend/src/components/AdjudicatorClusters.jsx
 * (que por sua vez migra `adjudicator_clusters.py`)
 *
 * Exporta:
 *  - AdjudicatorClusterChips: renderiza um cluster com título e lista de chips
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
import React from 'react';
import AdjudicatorClusterChips from './AdjudicatorClusterChips';

export default function AdjudicatorClusters({ clustersAnnotationData = {}, onAdjudicatorAction }) {
  const union = clustersAnnotationData.union || {};

  return (
    <div>
      {Object.keys(union).map((clusterId) => {
        const adjudicatorKps = (clustersAnnotationData.adjudicator?.[clusterId] || [])[1] || [];
        const annotator1Kps = (clustersAnnotationData.annotator1?.[clusterId] || [])[1] || [];
        const annotator2Kps = (clustersAnnotationData.annotator2?.[clusterId] || [])[1] || [];
        const unionKps = (union[clusterId] || [])[1] || [];

        return (
          <AdjudicatorClusterChips
            key={clusterId}
            clusterId={Number(clusterId)}
            adjudicatorCluster={adjudicatorKps}
            annotator1Cluster={annotator1Kps}
            annotator2Cluster={annotator2Kps}
            unionList={unionKps}
            onAdjudicatorAction={onAdjudicatorAction}
          />
        );
      })}
    </div>
  );
}