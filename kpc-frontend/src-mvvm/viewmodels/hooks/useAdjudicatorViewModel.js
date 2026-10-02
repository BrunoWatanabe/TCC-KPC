/**
 * useAdjudicatorViewModel - ViewModel para o componente AdjudicatorClusterChips
 *
 * Gerencia o estado de adjudicação: carrega dados dos clusters dos anotadores,
 * processa ações de consent/reject e persiste no backend.
 */
import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useTopicStore } from '../stores/useTopicStore.js';
import { useFlowStore } from '../stores/useFlowStore.js';
import useSyncStore from '../stores/useSyncStore.js';
import { adjudicatorService } from '../../models/services/AdjudicatorService.js';

export const useAdjudicatorViewModel = () => {
  // ============================================================================
  // ESTADO
  // ============================================================================
  const [adjudicatorData, setAdjudicatorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // ============================================================================
  // HOOKS E STORES
  // ============================================================================
  const authStore = useAuthStore();
  const topicStore = useTopicStore();
  const flowStore = useFlowStore();
  const registerListener = useSyncStore(state => state.registerListener);
  const unregisterListener = useSyncStore(state => state.unregisterListener);

  const username = authStore.user?.username;
  const selectedTopic = topicStore.getSelectedTopic();
  const topicName = selectedTopic?.name || selectedTopic?.id;

  // ============================================================================
  // CARREGAMENTO
  // ============================================================================

  const loadData = useCallback(async () => {
    if (!username || !topicName) return;
    setLoading(true);
    setError(null);
    try {
      const data = await adjudicatorService.getAdjudicatorData(username, topicName);
      setAdjudicatorData(data);
    } catch (err) {
      console.error('❌ Erro ao carregar dados de adjudicação:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username, topicName]);

  useEffect(() => {
    if (username && topicName) {
      loadData();
    }
  }, [username, topicName]);

  // Sincronização global
  useEffect(() => {
    const handleSync = async (syncEvent) => {
      if (syncEvent.source === 'adjudicator') return;
      if (username && topicName) await loadData();
    };
    registerListener('adjudicator', handleSync);
    return () => unregisterListener('adjudicator');
  }, [username, topicName, registerListener, unregisterListener]);

  // ============================================================================
  // AÇÕES
  // ============================================================================

  /**
   * Processa ação do adjudicator (consent/reject) e persiste no backend
   */
  const handleAdjudicatorAction = useCallback(async ({ clusterId, keyphrase, currentType, newAction, newType }) => {
    if (!username || !topicName || saving) return;
    setSaving(true);
    try {
      // Extrair ID da keyphrase do formato "keyphrase (id)"
      let keyphraseId = keyphrase;
      const match = String(keyphrase).match(/\((\d+)\)$/);
      if (match) {
        keyphraseId = match[1];
      }

      await adjudicatorService.adjudicateAndSave(
        username, topicName, clusterId, keyphraseId, newAction
      );
      console.log(`✅ Adjudicação: cluster=${clusterId} kp=${keyphraseId} ação=${newAction}`);
    } catch (err) {
      console.error('❌ Erro ao salvar adjudicação:', err);
      // Reverter estado local recarregando dados
      await loadData();
    } finally {
      setSaving(false);
    }
  }, [username, topicName, saving]);

  return {
    adjudicatorData,
    loading,
    error,
    saving,
    handleAdjudicatorAction,
    refreshData: loadData,
  };
};