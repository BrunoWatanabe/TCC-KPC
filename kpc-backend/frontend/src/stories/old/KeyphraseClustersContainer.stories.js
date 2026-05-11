import KeyphraseClustersContainer from '../../components/old/KeyphraseClustersContainer';

export default {
  title: 'Components/Old/KeyphraseClustersContainer',
  component: KeyphraseClustersContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialClusters: { control: 'object' },
    initialSelectedClusters: { control: 'object' },
    initialSelectedKeyphrases: { control: 'object' },
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

// Sample data
const sampleClusters = {
  0: [
    'Cluster 0: Death Penalty',
    [
      'capital punishment (101)',
      'death penalty (102)', 
      'execution methods (103)',
      'lethal injection (104)',
      'death row (105)'
    ]
  ],
  1: [
    'Cluster 1: Life Imprisonment',
    [
      'life without parole (201)',
      'life imprisonment (202)',
      'life sentence (203)',
      'lifetime incarceration (204)'
    ]
  ],
  2: [
    'Cluster 2: Criminal Justice Reform',
    [
      'justice system reform (301)',
      'rehabilitation programs (302)',
      'criminal justice policy (303)',
      'sentencing guidelines (304)',
      'prison reform (305)'
    ]
  ]
};

const sampleSelectedClusters = {
  '0': '1',
  '1': '0', 
  '2': '1'
};

const sampleSelectedKeyphrases = {
  '0': {
    selected1: 101,
    selected2: 102
  },
  '1': {
    selected1: 201,
    selected2: 203
  },
  '2': {
    selected1: 301,
    selected2: 304
  }
};

export const Default = {
  args: {
    initialClusters: sampleClusters,
    initialSelectedClusters: sampleSelectedClusters,
    initialSelectedKeyphrases: sampleSelectedKeyphrases,
    initialClustersInfo: "Death penalty related clusters",
    initialClusterOrder: 'numerical',
    initialHideSourceKeyphrases: false,
    onStateChange: (changeInfo) => {
      console.log('State change event:', changeInfo);
      console.log('Would send to backend:', {
        endpoint: '/api/keyphrase-clusters/update',
        method: 'POST',
        body: changeInfo
      });
    },
  },
};

export const WithDetailedLogging = {
  args: {
    ...Default.args,
    initialClustersInfo: "Detailed logging enabled - check console",
    onStateChange: (changeInfo) => {
      console.group('🔄 KeyphraseClusters State Change');
      console.log('Type:', changeInfo.type);
      console.log('Value:', changeInfo.value);
      console.log('Full State:', changeInfo.state);
      
      // Enhanced logging based on change type
      switch (changeInfo.type) {
        case 'clusterSelectedChange':
          console.log('🎯 Cluster selection updated');
          break;
        case 'keyphrase1SelectedChange':
          console.log('🔤 Keyphrase 1 selection updated');
          break;
        case 'keyphrase2SelectedChange':
          console.log('🔤 Keyphrase 2 selection updated');
          break;
        case 'clusterOrderChange':
          console.log('📊 Cluster order changed');
          break;
        default:
          console.log('Unknown change type');
      }
      console.groupEnd();
    },
  },
};

export const CohesionOrder = {
  args: {
    ...Default.args,
    initialClusterOrder: 'cluster_cohesion',
    initialClustersInfo: "Ordered by cluster cohesion",
    onStateChange: (changeInfo) => {
      console.log('Cohesion order state change:', changeInfo.type, changeInfo.value);
    },
  },
};

export const InteractiveDemo = {
  args: {
    initialClusters: {
      0: [
        'Cluster 0: Minimum Wage',
        [
          'minimum wage increase (101)',
          'living wage (102)', 
          'wage legislation (103)',
          'hourly wage standards (104)',
          'worker compensation (105)'
        ]
      ],
      1: [
        'Cluster 1: Employment Impact',
        [
          'job creation (201)',
          'employment effects (202)',
          'business costs (203)',
          'economic impact (204)'
        ]
      ]
    },
    initialSelectedClusters: { '0': '1', '1': '0' },
    initialSelectedKeyphrases: {
      '0': { selected1: 101, selected2: 102 },
      '1': { selected1: 201, selected2: 204 }
    },
    initialClustersInfo: "Interactive demo - try changing selections",
    initialClusterOrder: 'numerical',
    initialHideSourceKeyphrases: false,
    onStateChange: (changeInfo) => {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${timestamp}] KeyphraseClusters - ${changeInfo.type}:`, changeInfo.value);
      
      // Simulate backend API calls
      console.log('Simulating API call:', {
        url: '/api/clusters/update',
        method: 'POST',
        data: changeInfo
      });
    },
  },
};