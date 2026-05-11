import KeyphraseClusteringContainer from '../../components/old/KeyphraseClusteringContainer';

export default {
  title: 'Components/Old/KeyphraseClusteringContainer',
  component: KeyphraseClusteringContainer,
  parameters: {
    layout: 'centered',
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
  cluster1: { name: 'Cluster 1' },
  cluster2: { name: 'Cluster 2' },
  cluster3: { name: 'Cluster 3' },
  cluster4: { name: 'Cluster 4' }
};

const sampleKeyphraseClustering = {
  keyphrase1: { description: 'gun control legislation', clustering: 0 },
  keyphrase2: { description: 'second amendment rights', clustering: 1 },
  keyphrase3: { description: 'firearm regulation', clustering: 0 },
  keyphrase4: { description: 'background checks', clustering: 2 },
  keyphrase5: { description: 'assault weapon ban', clustering: 0 },
  keyphrase6: { description: 'constitutional rights', clustering: 1 },
  keyphrase7: { description: 'gun safety measures', clustering: 2 }
};

export const Default = {
  args: {
    initialClusters: sampleClusters,
    initialKeyphraseClustering: sampleKeyphraseClustering,
    initialHideClustered: false,
    initialKeyphraseOrder: 'alphabetical',
    onStateChange: (changeInfo) => {
      console.log('State change event:', changeInfo);
      // Simulate backend communication
      console.log('Would send to backend:', {
        endpoint: '/api/keyphrase-clustering/update',
        method: 'POST',
        body: changeInfo
      });
    },
  },
};

export const WithStateLogging = {
  args: {
    initialClusters: sampleClusters,
    initialKeyphraseClustering: sampleKeyphraseClustering,
    initialHideClustered: false,
    initialKeyphraseOrder: 'cluster_similarity',
    onStateChange: (changeInfo) => {
      console.group('🔄 State Change Event');
      console.log('Type:', changeInfo.type);
      console.log('Value:', changeInfo.value);
      console.log('Full State:', changeInfo.state);
      console.groupEnd();
    },
  },
};

export const HiddenClusteredInitial = {
  args: {
    initialClusters: sampleClusters,
    initialKeyphraseClustering: sampleKeyphraseClustering,
    initialHideClustered: true,
    initialKeyphraseOrder: 'alphabetical',
    onStateChange: (changeInfo) => {
      console.log('State changed:', changeInfo.type, changeInfo.value);
    },
  },
};

export const SingleCluster = {
  args: {
    initialClusters: {
      cluster1: { name: 'Single Cluster' }
    },
    initialKeyphraseClustering: {
      keyphrase1: { description: 'minimum wage increase', clustering: 0 },
      keyphrase2: { description: 'living wage', clustering: 0 },
      keyphrase3: { description: 'wage legislation', clustering: 1 },
    },
    initialHideClustered: false,
    initialKeyphraseOrder: 'alphabetical',
    onStateChange: (changeInfo) => {
      console.log('Single cluster state change:', changeInfo);
    },
  },
};

export const InteractiveDemo = {
  args: {
    initialClusters: sampleClusters,
    initialKeyphraseClustering: sampleKeyphraseClustering,
    initialHideClustered: false,
    initialKeyphraseOrder: 'pairwise_similarity',
    onStateChange: (changeInfo) => {
      // Enhanced logging for interactive demo
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${timestamp}] ${changeInfo.type}:`, changeInfo.value);
      
      // Show different handling based on change type
      switch (changeInfo.type) {
        case 'keyphraseOrderChange':
          console.log('🔤 Order changed - would trigger re-sorting');
          break;
        case 'hideClusteredChange':
          console.log('👁️ Visibility toggled - would filter display');
          break;
        case 'keyphraseClusteringChange':
          console.log('🔗 Clustering updated - would save to database');
          break;
        default:
          console.log('Unknown change type');
      }
    },
  },
};