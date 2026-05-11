import CuratedKeyphrasesContainer from '../../components/old/CuratedKeyphrasesContainer';

export default {
  title: 'Components/Old/CuratedKeyphrasesContainer',
  component: CuratedKeyphrasesContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Stateful Manual Canonicalization Container**

This container manages the state for manual canonicalization, demonstrating how keyphrases are normalized:

**Canonicalization Types Demonstrated:**
- **Tense Normalization**: "generating nuclear powers" → "generate_nuclear_power"
- **Number Normalization**: "renewable energy sources" → "renewable_energy" 
- **Compound Simplification**: "nuclear waste materials" → "nuclear_waste"
- **Action Normalization**: "implementing safety protocols" → "implement_safety_protocol"
- **Possessive Removal**: "industry's responsibilities" → "industry_responsibility"

The container handles state changes and demonstrates how canonicalized keyphrases would be saved to a backend system.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    initialCuratedKeyphrases: { control: 'object' },
    initialKeyphraseAlias: { control: 'object' },
    initialSelectedClusters: { control: 'object' },
    initialCuratedKeyphrasesOrder: {
      control: { type: 'select' },
      options: ['source_cluster', 'alphabetical'],
    },
    initialCuratedKeyphrasesLength: { control: 'number' },
  },
};

// Sample data demonstrating effective canonicalization transformations
const nuclearEnergySample = {
  curatedKeyphrases: {
    // Gerund + plural → Infinitive + singular
    '0': [[101, 'generating nuclear powers'], [102, 'producing atomic energies']],
    // Adjective phrase → Simplified noun
    '1': [[201, 'renewable energy sources'], [202, 'clean power alternatives']],
    // Compound descriptive → Direct noun
    '2': [[301, 'nuclear waste materials'], [302, 'radioactive disposal systems']],
    // Facility descriptors → Generic term
    '3': [[401, 'nuclear power plants'], [402, 'atomic energy facilities']],
    // Complex security concept → Simple term
    '4': [[501, 'ensuring energy securities'], [0, '']],
    // Environmental impact terms → Standardized
    '5': [[601, 'carbon emissions reductions'], [602, 'climate change mitigation']],
    // Safety procedures → General safety
    '6': [[701, 'implementing safety protocols'], [702, 'nuclear safety measures']],
    // Mining activities → Industry term
    '7': [[801, 'uranium mining operations'], [0, '']]
  },
  keyphraseAlias: {
    '0': 'generate_nuclear_power',       // Gerund→infinitive, plural→singular
    '1': 'renewable_energy',           // Simplified, removed "sources" 
    '2': 'nuclear_waste',              // Removed redundant "materials"
    '3': 'nuclear_plant',              // Simplified compound, generic
    '4': 'ensure_energy_security',     // Gerund→infinitive, plural→singular
    '5': 'reduce_carbon_emission',     // Complex phrase→simple action, plural→singular
    '6': 'implement_safety_protocol',  // Gerund→infinitive, plural→singular
    '7': 'uranium_mining'              // Removed redundant "operations"
  },
  selectedClusters: {
    '0': '1', '1': '1', '2': '0', '3': '1', 
    '4': '1', '5': '-1', '6': '1', '7': '0'
  }
};

const schoolUniformsSample = {
  curatedKeyphrases: {
    // Policy implementation → Policy concept
    '0': [[101, 'implementing school uniforms'], [102, 'enforcing dress codes']],
    // Student expression concepts → Core rights
    '1': [[201, 'student expressions'], [202, 'individual freedoms']],
    // Social concept normalization
    '2': [[301, 'promoting equality'], [302, 'ensuring social equity']],
    // Prevention activities → Prevention concept
    '3': [[401, 'preventing bullying'], [0, '']],
    // Economic impact → Cost concept
    '4': [[501, 'cost burdens'], [502, 'financial impacts']],
    // Academic outcomes → Performance concept
    '5': [[601, 'academic performances'], [0, '']]
  },
  keyphraseAlias: {
    '0': 'implement_school_uniform',     // Gerund→infinitive, plural→singular
    '1': 'student_expression',          // Plural→singular
    '2': 'promote_equality',           // Gerund→infinitive
    '3': 'prevent_bullying',           // Gerund→infinitive
    '4': 'cost_burden',                // Plural→singular
    '5': 'academic_performance'        // Plural→singular
  },
  selectedClusters: {
    '0': '1', '1': '0', '2': '1', '3': '1', '4': '-1', '5': '1'
  }
};

export const Default = {
  args: {
    initialCuratedKeyphrases: nuclearEnergySample.curatedKeyphrases,
    initialKeyphraseAlias: nuclearEnergySample.keyphraseAlias,
    initialSelectedClusters: nuclearEnergySample.selectedClusters,
    initialCuratedKeyphrasesOrder: 'source_cluster',
    initialCuratedKeyphrasesLength: 12,
    onStateChange: (changeInfo) => {
      console.log('State change event:', changeInfo);
      console.log('Would send to backend:', {
        endpoint: '/api/curated-keyphrases/update',
        method: 'POST',
        body: changeInfo
      });
    },
  },
};

export const WithDetailedLogging = {
  args: {
    ...Default.args,
    onStateChange: (changeInfo) => {
      console.group('🔄 CuratedKeyphrases State Change');
      console.log('Type:', changeInfo.type);
      console.log('Value:', changeInfo.value);
      console.log('Full State:', changeInfo.state);
      
      switch (changeInfo.type) {
        case 'curatedKeyphrasesOrderChange':
          console.log('📊 Order changed - would trigger re-sorting');
          break;
        case 'keyphraseAliasSave':
          console.log('💾 Alias saved - would update database');
          break;
        case 'selectedClustersUpdate':
          console.log('🎯 Clusters updated - would refresh display');
          break;
        default:
          console.log('Unknown change type');
      }
      console.groupEnd();
    },
  },
};

export const CanonalizationDemonstration = {
  args: {
    initialCuratedKeyphrases: {
      // Verb tense normalization examples
      '0': [[101, 'students are participating'], [102, 'pupils engaging actively']],
      '1': [[201, 'teachers have implemented'], [202, 'educators incorporating methods']],
      // Plural/singular and possessive normalization
      '2': [[301, 'parents\' involvements'], [302, 'family participations']],
      '3': [[401, 'improved outcomes'], [0, '']],
      // Gerund to infinitive transformations
      '4': [[501, 'enhancing learning'], [502, 'improving educational quality']],
      '5': [[601, 'measuring performances'], [0, '']]
    },
    initialKeyphraseAlias: {
      '0': 'student_participate',          // Progressive→infinitive, simplified
      '1': 'teacher_implement',           // Perfect→infinitive, generalized
      '2': 'parent_involvement',          // Possessive→generic, plural→singular
      '3': 'improve_outcome',             // Past participle→infinitive, plural→singular  
      '4': 'enhance_learning',            // Gerund→infinitive
      '5': 'measure_performance'          // Gerund→infinitive, plural→singular
    },
    initialSelectedClusters: {
      '0': '1', '1': '1', '2': '1', '3': '1', '4': '1', '5': '1'
    },
    initialCuratedKeyphrasesOrder: 'source_cluster',
    initialCuratedKeyphrasesLength: 10,
    onStateChange: (changeInfo) => {
      console.group('📝 Canonicalization Demo - State Change');
      console.log('Type:', changeInfo.type);
      console.log('Value:', changeInfo.value);
      if (changeInfo.type === 'keyphraseAliasSave') {
        console.log('🎯 Canonicalization example:', {
          original: 'Complex/inflected form',
          canonical: changeInfo.value,
          transformations: ['Tense normalization', 'Plural→Singular', 'Simplified terminology']
        });
      }
      console.groupEnd();
    },
  },
};

export const SchoolUniformsExample = {
  args: {
    initialCuratedKeyphrases: schoolUniformsSample.curatedKeyphrases,
    initialKeyphraseAlias: schoolUniformsSample.keyphraseAlias,
    initialSelectedClusters: schoolUniformsSample.selectedClusters,
    initialCuratedKeyphrasesOrder: 'alphabetical',
    initialCuratedKeyphrasesLength: 8,
    onStateChange: (changeInfo) => {
      console.log('School uniforms topic - State change:', changeInfo.type, changeInfo.value);
    },
  },
};

export const AlphabeticalOrderDemo = {
  args: {
    initialCuratedKeyphrases: {
      '0': [[101, 'zebra crossing'], [102, 'traffic safety']],
      '1': [[201, 'apple education'], [202, 'technology learning']],
      '2': [[301, 'mountain climbing'], [302, 'outdoor adventure']],
      '3': [[401, 'book reading'], [0, '']],
      '4': [[501, 'dance performance'], [502, 'artistic expression']]
    },
    initialKeyphraseAlias: {
      '0': 'pedestrian_safety',
      '1': 'educational_tech',
      '2': 'adventure_sports',
      '3': 'literacy_program',
      '4': 'performing_arts'
    },
    initialSelectedClusters: {
      '0': '1', '1': '1', '2': '0', '3': '1', '4': '1'
    },
    initialCuratedKeyphrasesOrder: 'alphabetical',
    initialCuratedKeyphrasesLength: 6,
    onStateChange: (changeInfo) => {
      console.log('Alphabetical demo - Change:', changeInfo.type);
      if (changeInfo.type === 'curatedKeyphrasesOrderChange') {
        console.log('New order will change display sequence');
      }
    },
  },
};

export const InteractiveAliasDemo = {
  args: {
    initialCuratedKeyphrases: {
      '0': [[101, 'marijuana legalization'], [102, 'cannabis policy']],
      '1': [[201, 'medical marijuana'], [202, 'therapeutic cannabis']],
      '2': [[301, 'drug policy'], [302, 'substance regulation']],
      '3': [[401, 'criminal justice'], [0, '']],
      '4': [[501, 'tax revenue'], [502, 'economic impact']]
    },
    initialKeyphraseAlias: {
      '0': '',  // No initial alias - user can create
      '1': 'medical_cannabis',
      '2': '',  // No initial alias - user can create
      '3': 'justice_reform',
      '4': ''   // No initial alias - user can create
    },
    initialSelectedClusters: {
      '0': '1', '1': '1', '2': '-1', '3': '1', '4': '0'
    },
    initialCuratedKeyphrasesOrder: 'source_cluster',
    initialCuratedKeyphrasesLength: 10,
    onStateChange: (changeInfo) => {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${timestamp}] CuratedKeyphrases - ${changeInfo.type}:`, changeInfo.value);
      
      if (changeInfo.type === 'keyphraseAliasSave') {
        console.log('🏷️ Alias saved:', {
          cluster: changeInfo.value.clusterId,
          alias: changeInfo.value.aliasValue,
          action: 'Would save to backend database'
        });
      }
    },
  },
};

export const EmptyStateDemo = {
  args: {
    initialCuratedKeyphrases: {},
    initialKeyphraseAlias: {},
    initialSelectedClusters: {},
    initialCuratedKeyphrasesOrder: 'source_cluster',
    initialCuratedKeyphrasesLength: 0,
    onStateChange: (changeInfo) => {
      console.log('Empty state demo - State change:', changeInfo);
    },
  },
};