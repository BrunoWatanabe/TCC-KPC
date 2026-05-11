import KeyphraseClustersContainer from '../components/KeyphraseClustersContainer';
import { useKeyphraseClusters } from '../stores';

export default {
  title: 'Components/KeyphraseClustersContainer',
  component: KeyphraseClustersContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialClusters: { control: 'object' },
    initialSelectedClusters: { control: 'object' },
    initialSelectedKeyphrases: { control: 'object' },
    initialClustersAnnotatorsData: { control: 'object' },
    initialClustersInfo: { control: 'text' },
    initialClusterOrder: {
      control: { type: 'select' },
      options: [
        'numerical', 
        'cluster_cohesion', 
        'pairwise_similarity',
        'centroid_similarity', 
        'clues_from_other_annotators'
      ],
    },
    initialHideSourceKeyphrases: { control: 'boolean' },
  },
};

// Sample data for stories
const sampleClusters = {
  0: [
    'Cluster 0: Regulamentação de Armas',
    [
      'controle de armas (1)',
      'regulamentação de armas de fogo (2)',
      'proibição de armas de assalto (3)',
      'licenciamento de armas (4)'
    ]
  ],
  1: [
    'Cluster 1: Direitos Constitucionais',
    [
      'segunda emenda (5)',
      'direitos constitucionais (6)',
      'porte de armas (7)',
      'autodefesa (8)'
    ]
  ],
  2: [
    'Cluster 2: Segurança Pública',
    [
      'verificação de antecedentes (9)',
      'medidas de segurança com armas (10)',
      'violência armada (11)',
      'prevenção de crimes (12)'
    ]
  ]
};

const sampleSelectedClusters = {
  '0': '1',
  '1': '1',
  '2': '0'
};

const sampleSelectedKeyphrases = {
  '0': { selected1: 1, selected2: 2 },
  '1': { selected1: 5, selected2: 6 },
  '2': { selected1: 9, selected2: 10 }
};

const sampleClustersAnnotatorsData = {
  '0': {
    annotator1: { quality: 0.9, notes: 'Cluster bem definido' },
    annotator2: { quality: 0.8, notes: 'Alguns termos podem ser mais específicos' }
  },
  '1': {
    annotator1: { quality: 0.95, notes: 'Excelente coesão temática' },
    annotator2: { quality: 0.88, notes: 'Cluster constitucional bem estruturado' }
  }
};

// Story básica
export const Default = {
  args: {
    initialClusters: sampleClusters,
    initialSelectedClusters: sampleSelectedClusters,
    initialSelectedKeyphrases: sampleSelectedKeyphrases,
    initialClustersAnnotatorsData: sampleClustersAnnotatorsData,
    initialClustersInfo: "Ordenação: Numérica",
    initialClusterOrder: 'numerical',
    initialHideSourceKeyphrases: false,
    onStateChange: (changeInfo) => {
      console.log('🔄 Clusters state change:', changeInfo);
      console.log('📤 Would send to backend:', {
        endpoint: '/api/keyphrase-clusters/update',
        method: 'POST',
        data: changeInfo
      });
    }
  }
};

// Story com estado inicial vazio
export const Empty = {
  args: {
    initialClusters: {},
    initialSelectedClusters: {},
    initialSelectedKeyphrases: {},
    initialClustersAnnotatorsData: {},
    initialClustersInfo: "",
    initialClusterOrder: 'numerical',
    initialHideSourceKeyphrases: false,
    onStateChange: (changeInfo) => {
      console.log('🔄 Empty clusters state change:', changeInfo);
    }
  }
};

// Story com muitos clusters
export const WithManyClusters = {
  args: {
    initialClusters: {
      ...sampleClusters,
      3: [
        'Cluster 3: Educação sobre Armas',
        [
          'educação sobre segurança de armas (13)',
          'treinamento com armas (14)'
        ]
      ],
      4: [
        'Cluster 4: Mercado de Armas',
        [
          'venda de armas (15)',
          'lojas de armas (16)',
          'feira de armas (17)'
        ]
      ],
      5: [
        'Cluster 5: Violência Doméstica',
        [
          'violência doméstica com armas (18)',
          'femicídio por arma de fogo (19)'
        ]
      ]
    },
    initialSelectedClusters: {
      '0': '1',
      '1': '1',
      '2': '0',
      '3': '1',
      '4': '0',
      '5': '1'
    },
    initialSelectedKeyphrases: {
      '0': { selected1: 1, selected2: 2 },
      '1': { selected1: 5, selected2: 6 },
      '2': { selected1: 9, selected2: 10 },
      '3': { selected1: 13, selected2: 14 },
      '4': { selected1: 15, selected2: 16 },
      '5': { selected1: 18, selected2: 19 }
    },
    initialClustersAnnotatorsData: {
      ...sampleClustersAnnotatorsData,
      '3': {
        annotator1: { quality: 0.75, notes: 'Cluster pequeno mas coerente' },
      },
      '4': {
        annotator1: { quality: 0.85, notes: 'Boa representação do mercado' },
      },
      '5': {
        annotator1: { quality: 0.9, notes: 'Tema sensível bem agrupado' },
      }
    },
    initialClustersInfo: "6 clusters - Ordenação: Coesão de cluster",
    initialClusterOrder: 'cluster_cohesion',
    initialHideSourceKeyphrases: false,
    onStateChange: (changeInfo) => {
      console.log('🔄 Many clusters state change:', changeInfo);
    }
  }
};

// Story com keyphrases ocultas
export const WithHiddenSourceKeyphrases = {
  args: {
    initialClusters: sampleClusters,
    initialSelectedClusters: sampleSelectedClusters,
    initialSelectedKeyphrases: sampleSelectedKeyphrases,
    initialClustersAnnotatorsData: sampleClustersAnnotatorsData,
    initialClustersInfo: "Ordenação: Coesão de cluster",
    initialClusterOrder: 'cluster_cohesion',
    initialHideSourceKeyphrases: true,
    onStateChange: (changeInfo) => {
      console.log('🔄 Hidden keyphrases state change:', changeInfo);
    }
  }
};

// Story interativa para demonstrar funcionalidades do Zustand
export const Interactive = {
  args: {
    initialClusters: sampleClusters,
    initialSelectedClusters: sampleSelectedClusters,
    initialSelectedKeyphrases: sampleSelectedKeyphrases,
    initialClustersAnnotatorsData: sampleClustersAnnotatorsData,
    initialClustersInfo: "Modo interativo - Ordenação: Numérica",
    initialClusterOrder: 'numerical',
    initialHideSourceKeyphrases: false,
    onStateChange: (changeInfo) => {
      console.log('🎮 Interactive clusters state change:', changeInfo);
    }
  },
  render: (args) => {
    // Componente wrapper para adicionar controles interativos
    const InteractiveWrapper = () => {
      const { 
        clusters,
        selectedClusters,
        selectedKeyphrases,
        clustersInfo,
        clusterOrder,
        hideSourceKeyphrases,
        reset,
        updateClusterSelection,
        setClusterOrder,
        setHideSourceKeyphrases,
        getState
      } = useKeyphraseClusters();

      return (
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
            <h3>🎛️ Controles do Zustand Store</h3>
            <div style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => {
                  reset();
                  console.log('🔄 Store resetado');
                }}
                style={{ marginRight: '10px', padding: '5px 10px' }}
              >
                Reset Store
              </button>
              <button 
                onClick={() => {
                  const state = getState();
                  console.log('📊 Estado atual do store:', state);
                }}
                style={{ marginRight: '10px', padding: '5px 10px' }}
              >
                Log Current State
              </button>
              <button 
                onClick={() => {
                  updateClusterSelection('0', '0');
                  console.log('❌ Cluster 0 desmarcado');
                }}
                style={{ marginRight: '10px', padding: '5px 10px' }}
              >
                Toggle Cluster 0
              </button>
              <button 
                onClick={() => {
                  setClusterOrder('cluster_cohesion');
                  console.log('🔤 Ordem alterada para cluster_cohesion');
                }}
                style={{ marginRight: '10px', padding: '5px 10px' }}
              >
                Order Cohesion
              </button>
              <button 
                onClick={() => {
                  setHideSourceKeyphrases(!hideSourceKeyphrases);
                  console.log(`👁️ Keyphrases ${hideSourceKeyphrases ? 'mostradas' : 'ocultadas'}`);
                }}
                style={{ padding: '5px 10px' }}
              >
                Toggle Hide Keyphrases
              </button>
            </div>
            <div style={{ fontSize: '12px' }}>
              <strong>Estado atual:</strong><br/>
              Clusters: {Object.keys(clusters).length} | 
              Selected: {Object.values(selectedClusters).filter(s => s === '1').length} | 
              Order: {clusterOrder} | 
              Hidden: {hideSourceKeyphrases ? 'Sim' : 'Não'}
            </div>
            <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
              Info: {clustersInfo.substring(0, 80)}{clustersInfo.length > 80 ? '...' : ''}
            </div>
          </div>
          <KeyphraseClustersContainer {...args} />
        </div>
      );
    };

    return <InteractiveWrapper />;
  }
};