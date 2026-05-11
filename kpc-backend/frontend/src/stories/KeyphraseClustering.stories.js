import KeyphraseClustering from '../components/KeyphraseClustering';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/KeyphraseClustering',
  component: KeyphraseClustering,
  parameters: {
    // Optional parameter to center the component in the Canvas
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    clusters: { control: 'object' },
    keyphraseClustering: { control: 'object' },
    hideClusteredState: { control: 'boolean' },
    keyphraseOrder: {
      control: { type: 'select' },
      options: ['alphabetical', 'numerical', 'cluster_similarity', 'pairwise_similarity'],
    },
  },
};

// Sample data for stories
const sampleClusters = {
  cluster1: { name: 'Cluster 1' },
  cluster2: { name: 'Cluster 2' },
  cluster3: { name: 'Cluster 3' }
};

const sampleKeyphraseClustering = {
  keyphrase1: { description: 'abortion rights', clustering: 0 },
  keyphrase2: { description: 'reproductive freedom', clustering: 1 },
  keyphrase3: { description: 'pro choice', clustering: 0 },
  keyphrase4: { description: 'womens health', clustering: 2 },
  keyphrase5: { description: 'family planning', clustering: 0 }
};

const largeKeyphraseClustering = {
  keyphrase1: { description: 'abortion rights', clustering: 0 },
  keyphrase2: { description: 'reproductive freedom', clustering: 1 },
  keyphrase3: { description: 'pro choice', clustering: 0 },
  keyphrase4: { description: 'womens health', clustering: 2 },
  keyphrase5: { description: 'family planning', clustering: 0 },
  keyphrase6: { description: 'reproductive healthcare', clustering: 1 },
  keyphrase7: { description: 'bodily autonomy', clustering: 0 },
  keyphrase8: { description: 'medical decision', clustering: 2 },
  keyphrase9: { description: 'pregnancy termination', clustering: 1 },
  keyphrase10: { description: 'womens rights', clustering: 0 }
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    clusters: sampleClusters,
    keyphraseClustering: sampleKeyphraseClustering,
    hideClusteredState: false,
    keyphraseOrder: 'alphabetical',
    onKeyphrasesOrderByChange: (value) => console.log('Order changed to:', value),
    onHideClusteredChange: (value) => console.log('Hide clustered changed to:', value),
    onKeyphraseClusteringChange: (value) => console.log('Clustering changed to:', value),
  },
};

export const WithHiddenClustered = {
  args: {
    clusters: sampleClusters,
    keyphraseClustering: sampleKeyphraseClustering,
    hideClusteredState: true,
    keyphraseOrder: 'alphabetical',
    onKeyphrasesOrderByChange: (value) => console.log('Order changed to:', value),
    onHideClusteredChange: (value) => console.log('Hide clustered changed to:', value),
    onKeyphraseClusteringChange: (value) => console.log('Clustering changed to:', value),
  },
};

export const NumericalOrder = {
  args: {
    clusters: sampleClusters,
    keyphraseClustering: sampleKeyphraseClustering,
    hideClusteredState: false,
    keyphraseOrder: 'numerical',
    onKeyphrasesOrderByChange: (value) => console.log('Order changed to:', value),
    onHideClusteredChange: (value) => console.log('Hide clustered changed to:', value),
    onKeyphraseClusteringChange: (value) => console.log('Clustering changed to:', value),
  },
};

export const LargeDataset = {
  args: {
    clusters: sampleClusters,
    keyphraseClustering: largeKeyphraseClustering,
    hideClusteredState: false,
    keyphraseOrder: 'alphabetical',
    onKeyphrasesOrderByChange: (value) => console.log('Order changed to:', value),
    onHideClusteredChange: (value) => console.log('Hide clustered changed to:', value),
    onKeyphraseClusteringChange: (value) => console.log('Clustering changed to:', value),
  },
};

export const EmptyData = {
  args: {
    clusters: {},
    keyphraseClustering: {},
    hideClusteredState: false,
    keyphraseOrder: 'alphabetical',
    onKeyphrasesOrderByChange: (value) => console.log('Order changed to:', value),
    onHideClusteredChange: (value) => console.log('Hide clustered changed to:', value),
    onKeyphraseClusteringChange: (value) => console.log('Clustering changed to:', value),
  },
};