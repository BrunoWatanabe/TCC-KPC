import KeyphraseClusters from '../components/KeyphraseClusters';

export default {
  title: 'Components/KeyphraseClusters',
  component: KeyphraseClusters,
  parameters: {
    layout: 'fullscreen', // Use fullscreen para melhor visualização
  },
  tags: ['autodocs'],
  argTypes: {
    clusters: { control: 'object' },
    selectedClusters: { control: 'object' },
    selectedKeyphrases: { control: 'object' },
    clustersInfo: { control: 'text' },
    clusterOrder: {
      control: { type: 'select' },
      options: [
        'numerical', 
        'cluster_cohesion', 
        'pairwise_similarity',
        'centroid_similarity', 
        'clues_from_other_annotators'
      ],
    },
    hideSourceKeyphrases: { control: 'boolean' },
  },
};

// Sample data based on the original Python component structure
const sampleClusters = {
  0: [
    'Cluster 0: Gun Control',
    [
      'gun control legislation (101)',
      'firearm regulation (102)', 
      'assault weapon ban (103)',
      'background checks (104)',
      'gun safety measures (105)'
    ]
  ],
  1: [
    'Cluster 1: Second Amendment Rights',
    [
      'second amendment rights (201)',
      'constitutional rights (202)',
      'right to bear arms (203)',
      'gun ownership rights (204)',
      'self defense rights (205)'
    ]
  ],
  2: [
    'Cluster 2: Gun Violence Prevention',
    [
      'gun violence prevention (301)',
      'mass shooting prevention (302)',
      'public safety measures (303)',
      'violence reduction programs (304)',
      'community safety initiatives (305)'
    ]
  ]
};

const sampleSelectedClusters = {
  '0': '1',  // Selected
  '1': '0',  // Not selected
  '2': '1'   // Selected
};

const sampleSelectedKeyphrases = {
  '0': {
    selected1: 101,
    selected2: 103
  },
  '1': {
    selected1: 201,
    selected2: 204
  },
  '2': {
    selected1: 301,
    selected2: 302
  }
};

const largeSampleClusters = {
  0: [
    'Cluster 0: Abortion Rights',
    [
      'abortion rights (101)',
      'reproductive freedom (102)', 
      'pro choice (103)',
      'womens health (104)',
      'reproductive healthcare (105)',
      'bodily autonomy (106)'
    ]
  ],
  1: [
    'Cluster 1: Pro Life Position',
    [
      'pro life (201)',
      'unborn rights (202)',
      'life protection (203)',
      'pregnancy support (204)',
      'adoption alternatives (205)'
    ]
  ],
  2: [
    'Cluster 2: Legal Framework',
    [
      'roe v wade (301)',
      'legal precedent (302)',
      'constitutional law (303)',
      'supreme court decisions (304)',
      'state legislation (305)',
      'federal regulations (306)'
    ]
  ],
  3: [
    'Cluster 3: Healthcare Access',
    [
      'healthcare access (401)',
      'medical procedures (402)',
      'clinic availability (403)',
      'insurance coverage (404)',
      'patient care (405)'
    ]
  ]
};

export const Default = {
  args: {
    clusters: sampleClusters,
    selectedClusters: sampleSelectedClusters,
    selectedKeyphrases: sampleSelectedKeyphrases,
    clustersInfo: "3 clusters with gun control related keyphrases",
    clusterOrder: 'numerical',
    hideSourceKeyphrases: false,
    onClusterSelectedChange: (value) => console.log('Cluster selection changed:', value),
    onKeyphrase1SelectedChange: (value) => console.log('Keyphrase 1 selection changed:', value),
    onKeyphrase2SelectedChange: (value) => console.log('Keyphrase 2 selection changed:', value),
    onClusterOrderChange: (value) => console.log('Cluster order changed:', value),
  },
};

export const WithDifferentOrder = {
  args: {
    ...Default.args,
    clusterOrder: 'cluster_cohesion',
    clustersInfo: "Ordered by cluster cohesion",
  },
};

export const HiddenSourceKeyphrases = {
  args: {
    ...Default.args,
    hideSourceKeyphrases: true,
    clustersInfo: "Source keyphrases are hidden",
  },
};

export const LargeDataset = {
  args: {
    clusters: largeSampleClusters,
    selectedClusters: {
      '0': '1',
      '1': '0', 
      '2': '1',
      '3': '0'
    },
    selectedKeyphrases: {
      '0': { selected1: 101, selected2: 104 },
      '1': { selected1: 201, selected2: 203 },
      '2': { selected1: 301, selected2: 305 },
      '3': { selected1: 401, selected2: 403 }
    },
    clustersInfo: "4 clusters with abortion-related keyphrases",
    clusterOrder: 'pairwise_similarity',
    hideSourceKeyphrases: false,
    onClusterSelectedChange: (value) => console.log('Cluster selection changed:', value),
    onKeyphrase1SelectedChange: (value) => console.log('Keyphrase 1 selection changed:', value),
    onKeyphrase2SelectedChange: (value) => console.log('Keyphrase 2 selection changed:', value),
    onClusterOrderChange: (value) => console.log('Cluster order changed:', value),
  },
};

export const EmptyData = {
  args: {
    clusters: {},
    selectedClusters: {},
    selectedKeyphrases: {},
    clustersInfo: "No clusters available",
    clusterOrder: 'numerical',
    hideSourceKeyphrases: false,
    onClusterSelectedChange: (value) => console.log('Cluster selection changed:', value),
    onKeyphrase1SelectedChange: (value) => console.log('Keyphrase 1 selection changed:', value),
    onKeyphrase2SelectedChange: (value) => console.log('Keyphrase 2 selection changed:', value),
    onClusterOrderChange: (value) => console.log('Cluster order changed:', value),
  },
};

export const AdjudicatorMode = {
  args: {
    ...Default.args,
    clusterOrder: 'clues_from_other_annotators',
    clustersInfo: "Adjudicator mode - showing clues from other annotators",
  },
};