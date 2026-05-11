/**
 * AdjudicatorClusterChips.jsx - Componente para chips de adjudicator
 * Replica a lógica do adjudicator_clusters.py e chip_test.py do ReactPy
 * Usado no modo "clues_from_other_annotators" do KeyphraseClusters
 */
import React, { useState, useCallback } from 'react';
import { 
  Box,
  Chip,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  CheckCircle as ConsentedIcon,
  Cancel as RejectedIcon,
  Help as PendingIcon 
} from '@mui/icons-material';
import { config } from '../../shared/config.js';

const AdjudicatorClusterChips = ({
  clusterId,
  adjudicatorCluster = [],
  annotator1Cluster = [],
  annotator2Cluster = [],
  unionList = [],
  onAdjudicatorAction,
  disabled = false
}) => {
  // ============================================================================
  // ESTADO LOCAL
  // ============================================================================
  const [processingKeyphrase, setProcessingKeyphrase] = useState(null);

  // ============================================================================
  // FUNÇÕES UTILITÁRIAS (REPLICANDO REACTPY)
  // ============================================================================

  /**
   * Verifica se keyphrase está em uma lista específica
   * Replica verify_kp() do chip_test.py
   */
  const verifyKeyphrase = useCallback((cluster, keyphrase) => {
    if (!Array.isArray(cluster) || !keyphrase) return false;
    
    return cluster.some(kp => {
      // Comparação por texto exato ou por ID
      return kp === keyphrase || 
             (typeof kp === 'string' && kp.includes(keyphrase)) ||
             (typeof keyphrase === 'string' && keyphrase.includes(kp));
    });
  }, []);

  /**
   * Determina o tipo/estado atual de uma keyphrase
   * Replica lógica do chip_test.py
   */
  const getKeyphraseType = useCallback((keyphrase) => {
    const inAdjudicator = verifyKeyphrase(adjudicatorCluster, keyphrase);
    const inAnnotator1 = verifyKeyphrase(annotator1Cluster, keyphrase);
    const inAnnotator2 = verifyKeyphrase(annotator2Cluster, keyphrase);
    
    if (inAdjudicator) {
      return 'consented'; // Keyphrase foi aceita pelo adjudicator
    }
    
    if (inAnnotator1 || inAnnotator2) {
      return 'consented_rejected'; // Keyphrase foi rejeitada pelo adjudicator
    }
    
    return 'pending'; // Keyphrase ainda não foi avaliada
  }, [adjudicatorCluster, annotator1Cluster, annotator2Cluster, verifyKeyphrase]);

  /**
   * Obtém cor do chip baseado no tipo
   */
  const getChipColor = useCallback((type) => {
    const colors = config.adjudicator.colors;
    return colors[type] || colors.pending;
  }, []);

  /**
   * Obtém variante do Material-UI baseado no tipo
   */
  const getChipVariant = useCallback((type) => {
    switch (type) {
      case 'consented':
        return 'success';
      case 'consented_rejected':
        return 'error';
      case 'pending':
      default:
        return 'warning';
    }
  }, []);

  /**
   * Obtém ícone baseado no tipo
   */
  const getTypeIcon = useCallback((type) => {
    switch (type) {
      case 'consented':
        return <ConsentedIcon fontSize="small" />;
      case 'consented_rejected':
        return <RejectedIcon fontSize="small" />;
      case 'pending':
      default:
        return <PendingIcon fontSize="small" />;
    }
  }, []);

  // ============================================================================
  // HANDLERS DE AÇÃO DO ADJUDICATOR
  // ============================================================================

  /**
   * Executa ação do adjudicator (consent/reject)
   * Replica adjudicator_action() do chip_test.py
   */
  const handleAdjudicatorAction = useCallback(async (keyphrase, currentType) => {
    if (disabled || !onAdjudicatorAction) return;


    setProcessingKeyphrase(keyphrase);

    try {
      // Lógica do adjudicator_action() do ReactPy:
      let newAction;
      
      if (currentType === 'consented') {
        // Se estava consented, mudar para consented_rejected (remover do adjudicator)
        newAction = 'reject';
      } else {
        // Se estava consented_rejected ou pending, mudar para consented (adicionar ao adjudicator)
        newAction = 'consent';
      }

      // Chamar callback com a ação
      await onAdjudicatorAction({
        clusterId,
        keyphrase,
        currentType,
        newAction,
        newType: newAction === 'consent' ? 'consented' : 'consented_rejected'
      });


    } catch (error) {
      console.error('❌ AdjudicatorClusterChips - Erro na ação:', error);
    } finally {
      setProcessingKeyphrase(null);
    }
  }, [clusterId, disabled, onAdjudicatorAction]);

  // ============================================================================
  // RENDERIZAÇÃO DE CHIPS
  // ============================================================================

  /**
   * Renderiza um chip individual
   */
  const renderKeyphraseChip = useCallback((keyphrase, index) => {
    const type = getKeyphraseType(keyphrase);
    const variant = getChipVariant(type);
    const icon = getTypeIcon(type);
    const isProcessing = processingKeyphrase === keyphrase;

    // Extrair texto limpo da keyphrase (remover IDs se necessário)
    const cleanText = typeof keyphrase === 'string' 
      ? keyphrase.replace(/\s*\(\d+\)$/, '') 
      : String(keyphrase);

    return (
      <Tooltip
        key={index}
        title={`${type} - Clique para ${type === 'consented' ? 'rejeitar' : 'aceitar'}`}
        arrow
      >
        <Chip
          label={cleanText}
          variant="filled"
          color={variant}
          icon={icon}
          onClick={() => handleAdjudicatorAction(keyphrase, type)}
          disabled={disabled || isProcessing}
          sx={{
            margin: 0.5,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: isProcessing ? 0.7 : 1,
            '&:hover': {
              opacity: disabled ? 0.5 : 0.8
            }
          }}
        />
      </Tooltip>
    );
  }, [getKeyphraseType, getChipVariant, getTypeIcon, handleAdjudicatorAction, disabled, processingKeyphrase]);

  /**
   * Renderiza lista de chips de um dataset específico
   */
  const renderDatasetChips = useCallback((title, keyphrases, color) => {
    if (!Array.isArray(keyphrases) || keyphrases.length === 0) {
      return null;
    }

    return (
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="caption" sx={{ color, fontWeight: 'bold' }}>
          {title}:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 0.5 }}>
          {keyphrases.map((kp, index) => renderKeyphraseChip(kp, `${title}-${index}`))}
        </Box>
      </Box>
    );
  }, [renderKeyphraseChip]);

  // ============================================================================
  // RENDERIZAÇÃO PRINCIPAL
  // ============================================================================

  // Se não há dados de union, não renderizar nada
  if (!Array.isArray(unionList) || unionList.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
          Nenhuma keyphrase disponível para adjudicação no cluster {clusterId}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        padding: 2,
        margin: 1,
        backgroundColor: 'background.paper'
      }}
    >
      {/* Título do cluster */}
      <Typography variant="h6" gutterBottom>
        Cluster {clusterId} - Adjudicação
      </Typography>

      {/* Dataset do Adjudicator (consensos) */}
      {renderDatasetChips('Consensos', adjudicatorCluster, '#4caf50')}

      {/* Dataset do Annotator 1 */}
      {renderDatasetChips('Anotador 1', annotator1Cluster, '#2196f3')}

      {/* Dataset do Annotator 2 */}
      {renderDatasetChips('Anotador 2', annotator2Cluster, '#ff9800')}

      {/* União de todos (principal para adjudicação) */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Todas as Keyphrases (União):
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {unionList.map((kp, index) => renderKeyphraseChip(kp, index))}
        </Box>
      </Box>

      {/* Informações de status */}
      <Box sx={{ marginTop: 2, padding: 1, backgroundColor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="caption" color="textSecondary">
          <strong>Como usar:</strong> Clique nos chips para aceitar (verde) ou rejeitar (vermelho) keyphrases.
          Amarelo indica keyphrases pendentes de adjudicação.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdjudicatorClusterChips;