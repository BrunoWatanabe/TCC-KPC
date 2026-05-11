import React from 'react';
import CuratedKeyphrasesContainer from '../components/CuratedKeyphrasesContainer';
import { useCuratedKeyphrases } from '../stores';

export default {
  title: 'Components/CuratedKeyphrasesContainer',
  component: CuratedKeyphrasesContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialCuratedKeyphrasesOrder: {
      control: { type: 'select' },
      options: ['source_cluster', 'alphabetical', 'length'],
    },
    initialCuratedKeyphrases: { control: 'object' },
    initialKeyphraseAlias: { control: 'object' },
    initialSelectedClusters: { control: 'object' },
    initialCuratedKeyphrasesLength: { control: 'number' },
  },
};

// Sample data for stories - usando estrutura correta esperada pelo componente
const sampleCuratedKeyphrases = {
  '0': [[101, 'controle de armas'], [102, 'regulamentação de armas de fogo']],
  '1': [[201, 'segunda emenda'], [202, 'direitos constitucionais']],
  '2': [[301, 'verificação de antecedentes'], [302, 'medidas de segurança']],
  '3': [[401, 'violência armada'], [0, '']],
  '4': [[501, 'porte de armas'], [502, 'licença para armas']],
  '5': [[601, 'proibição de armas'], [0, '']]
};

const sampleKeyphraseAlias = {
  '0': 'controle_arma',
  '1': 'segunda_emenda', 
  '2': 'verificacao_antecedente',
  '3': 'violencia_armada',
  '4': 'porte_arma',
  '5': 'proibicao_arma'
};

const sampleSelectedClusters = {
  '0': '1',
  '1': '1',
  '2': '0',
  '3': '1',
  '4': '-1',
  '5': '0'
};

// Story básica
export const Default = {
  args: {
    initialCuratedKeyphrasesOrder: 'source_cluster',
    initialCuratedKeyphrases: sampleCuratedKeyphrases,
    initialKeyphraseAlias: sampleKeyphraseAlias,
    initialSelectedClusters: sampleSelectedClusters,
    initialCuratedKeyphrasesLength: 10,
    onStateChange: (changeInfo) => {
      console.log('🔄 Curated keyphrases state change:', changeInfo);
      console.log('📤 Would send to backend:', {
        endpoint: '/api/curated-keyphrases/update',
        method: 'POST',
        data: changeInfo
      });
    }
  }
};

// Story com estado inicial vazio
export const Empty = {
  args: {
    initialCuratedKeyphrasesOrder: 'source_cluster',
    initialCuratedKeyphrases: {},
    initialKeyphraseAlias: {},
    initialSelectedClusters: {},
    initialCuratedKeyphrasesLength: 10,
    onStateChange: (changeInfo) => {
      console.log('🔄 Empty curated state change:', changeInfo);
    }
  }
};

// Story com muitos clusters
export const WithManyClusters = {
  args: {
    initialCuratedKeyphrasesOrder: 'alphabetical',
    initialCuratedKeyphrases: {
      ...sampleCuratedKeyphrases,
      '6': [[701, 'licenciamento de armas'], [702, 'registro de armas']],
      '7': [[801, 'educação sobre segurança'], [802, 'treinamento com armas']],
      '8': [[901, 'tráfico de armas'], [902, 'mercado negro']]
    },
    initialKeyphraseAlias: {
      ...sampleKeyphraseAlias,
      '6': 'licenciamento_arma',
      '7': 'educacao_seguranca',
      '8': 'trafico_arma'
    },
    initialSelectedClusters: {
      ...sampleSelectedClusters,
      '6': '1',
      '7': '0',
      '8': '1'
    },
    initialCuratedKeyphrasesLength: 15,
    onStateChange: (changeInfo) => {
      console.log('🔄 Many clusters state change:', changeInfo);
    }
  }
};

// Story com ordem alfabética
export const AlphabeticalOrder = {
  args: {
    initialCuratedKeyphrasesOrder: 'alphabetical',
    initialCuratedKeyphrases: sampleCuratedKeyphrases,
    initialKeyphraseAlias: sampleKeyphraseAlias,
    initialSelectedClusters: sampleSelectedClusters,
    initialCuratedKeyphrasesLength: 8,
    onStateChange: (changeInfo) => {
      console.log('🔄 Alphabetical order state change:', changeInfo);
    }
  }
};

// Story interativa para demonstrar funcionalidades do Zustand
export const Interactive = {
  args: {
    initialCuratedKeyphrasesOrder: 'source_cluster',
    initialCuratedKeyphrases: sampleCuratedKeyphrases,
    initialKeyphraseAlias: sampleKeyphraseAlias,
    initialSelectedClusters: sampleSelectedClusters,
    initialCuratedKeyphrasesLength: 10,
    onStateChange: (changeInfo) => {
      console.log('🎮 Interactive curated state change:', changeInfo);
    }
  }
};

// Story de teste simples sem wrapper complexo
export const SimpleZustandTest = {
  args: {
    initialCuratedKeyphrasesOrder: 'alphabetical',
    initialCuratedKeyphrases: {
      '0': [[101, 'teste keyphrase 1'], [102, 'teste keyphrase 2']],
      '1': [[201, 'outra keyphrase'], [0, '']]
    },
    initialKeyphraseAlias: {
      '0': 'teste_alias_1',
      '1': 'teste_alias_2'
    },
    initialSelectedClusters: {
      '0': '1',
      '1': '0'
    },
    initialCuratedKeyphrasesLength: 5,
    onStateChange: (changeInfo) => {
      console.log('🧪 Simple test - state change:', changeInfo);
    }
  }
};