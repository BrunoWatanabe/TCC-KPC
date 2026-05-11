import KeyphraseClusteringContainer from '../components/KeyphraseClusteringContainer';
import { useKeyphraseClustering } from '../stores';

export default {
  title: 'Components/KeyphraseClusteringContainer',
  component: KeyphraseClusteringContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialClusters: { control: 'object' },
    initialKeyphraseClustering: { control: 'object' },
    initialHideClustered: { control: 'boolean' },
    initialKeyphraseOrder: {
      control: { type: 'select' },
      options: ['alphabetical', 'numerical', 'cluster_similarity', 'pairwise_similarity'],
    },
  },
};

// Sample data for stories
const sampleClusters = {
  cluster1: { name: 'Regulamentação de Armas' },
  cluster2: { name: 'Direitos Constitucionais' },
  cluster3: { name: 'Segurança Pública' },
  cluster4: { name: 'Controle Governamental' }
};

const sampleKeyphraseClustering = {
  keyphrase1: { description: 'controle de armas', clustering: 0 },
  keyphrase2: { description: 'segunda emenda', clustering: 1 },
  keyphrase3: { description: 'regulamentação de armas de fogo', clustering: 0 },
  keyphrase4: { description: 'verificação de antecedentes', clustering: 2 },
  keyphrase5: { description: 'proibição de armas de assalto', clustering: 0 },
  keyphrase6: { description: 'direitos constitucionais', clustering: 1 },
  keyphrase7: { description: 'medidas de segurança com armas', clustering: 2 },
  keyphrase8: { description: 'licenciamento de armas', clustering: 3 },
  keyphrase9: { description: 'porte de armas', clustering: 1 },
  keyphrase10: { description: 'violência armada', clustering: 2 }
};

// Story básica
export const Default = {
  args: {
    initialClusters: sampleClusters,
    initialKeyphraseClustering: sampleKeyphraseClustering,
    initialHideClustered: false,
    initialKeyphraseOrder: 'alphabetical',
    onStateChange: (changeInfo) => {
      console.log('🔄 State change event:', changeInfo);
      console.log('📤 Would send to backend:', {
        endpoint: '/api/keyphrase-clustering/update',
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
    initialKeyphraseClustering: {},
    initialHideClustered: false,
    initialKeyphraseOrder: 'alphabetical',
    onStateChange: (changeInfo) => {
      console.log('🔄 Empty state change:', changeInfo);
    }
  }
};

// Story com muitos dados
export const WithManyKeyphrases = {
  args: {
    initialClusters: {
      ...sampleClusters,
      cluster5: { name: 'Educação sobre Armas' },
      cluster6: { name: 'Mercado Negro' },
      cluster7: { name: 'Acidentes com Armas' }
    },
    initialKeyphraseClustering: {
      ...sampleKeyphraseClustering,
      keyphrase11: { description: 'educação sobre segurança de armas', clustering: 4 },
      keyphrase12: { description: 'tráfico de armas', clustering: 5 },
      keyphrase13: { description: 'acidentes domésticos com armas', clustering: 6 },
      keyphrase14: { description: 'suicídio por arma de fogo', clustering: 2 },
      keyphrase15: { description: 'homicídio por arma de fogo', clustering: 2 },
      keyphrase16: { description: 'autodefesa', clustering: 1 },
      keyphrase17: { description: 'caça esportiva', clustering: 1 },
      keyphrase18: { description: 'colecionadores de armas', clustering: 1 }
    },
    initialHideClustered: false,
    initialKeyphraseOrder: 'cluster_similarity',
    onStateChange: (changeInfo) => {
      console.log('🔄 Many keyphrases state change:', changeInfo);
    }
  }
};

// Story com clustered hidden
export const WithHiddenClustered = {
  args: {
    initialClusters: sampleClusters,
    initialKeyphraseClustering: sampleKeyphraseClustering,
    initialHideClustered: true,
    initialKeyphraseOrder: 'alphabetical',
    onStateChange: (changeInfo) => {
      console.log('🔄 Hidden clustered state change:', changeInfo);
    }
  }
};

// Story interativa para demonstrar funcionalidades do Zustand
export const Interactive = {
  args: {
    initialClusters: sampleClusters,
    initialKeyphraseClustering: sampleKeyphraseClustering,
    initialHideClustered: false,
    initialKeyphraseOrder: 'alphabetical',
    onStateChange: (changeInfo) => {
      console.log('🎮 Interactive state change:', changeInfo);
    }
  },
  render: (args) => {
    // Componente wrapper para adicionar controles interativos
    const InteractiveWrapper = () => {
      const { 
        clusters, 
        keyphraseClustering, 
        hideClustered, 
        keyphraseOrder,
        reset,
        getState
      } = useKeyphraseClustering();

      return (
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
            <h3>🎛️ Controles do Zustand Store</h3>
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
              style={{ padding: '5px 10px' }}
            >
              Log Current State
            </button>
            <div style={{ marginTop: '10px', fontSize: '12px' }}>
              <strong>Estado atual:</strong><br/>
              Clusters: {Object.keys(clusters).length} | 
              Keyphrases: {Object.keys(keyphraseClustering).length} | 
              Hidden: {hideClustered ? 'Sim' : 'Não'} | 
              Order: {keyphraseOrder}
            </div>
          </div>
          <KeyphraseClusteringContainer {...args} />
        </div>
      );
    };

    return <InteractiveWrapper />;
  }
};