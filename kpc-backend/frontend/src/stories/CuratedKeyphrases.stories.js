import CuratedKeyphrases from '../components/CuratedKeyphrases';

export default {
  title: 'Components/CuratedKeyphrases',
  component: CuratedKeyphrases,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Manual Canonicalization Component**

This component demonstrates the final stage of the keyphrase annotation pipeline: manual canonicalization. 
The examples show various types of normalization:

- **Plural → Singular**: "background checks" → "background_check"
- **Gerund → Infinitive**: "regulating firearms" → "regulate_firearm" 
- **Past Participle → Base**: "polluted environments" → "pollute_environment"
- **Compound Phrases → Simplified**: "constitutional amendments" → "constitutional_right"
- **Possessive → Generic**: "workers' rights" → "worker_right"
- **Progressive → Infinitive**: "students are studying" → "student_study"

Each example demonstrates how raw keyphrases are normalized into consistent, searchable canonical forms.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    curatedKeyphrases: { control: 'object' },
    keyphraseAlias: { control: 'object' },
    selectedClusters: { control: 'object' },
    curatedKeyphrasesOrder: {
      control: { type: 'select' },
      options: ['source_cluster', 'alphabetical'],
    },
    curatedKeyphrasesLength: { control: 'number' },
  },
};

// Sample data demonstrating effective manual canonicalization
// Shows conversion from: plurals→singular, inflected verbs→infinitive, variations→standard forms
const sampleCuratedKeyphrases = {
  // Plural → Singular normalization
  '0': [[101, 'background checks'], [102, 'criminal screenings']],
  // Verb inflection → Infinitive
  '1': [[201, 'regulating firearms'], [202, 'controlling guns']],
  // Noun variations → Standard form  
  '2': [[301, 'gun violences'], [302, 'firearm-related violence']],
  // Compound variations → Simplified canonical
  '3': [[401, 'semi-automatic weapons'], [0, '']],  // Single keyphrase
  // Adjective + noun → Canonical noun phrase
  '4': [[501, 'constitutional amendments'], [502, 'legal protections']],
  // Formal vs informal → Standard terminology
  '5': [[601, 'shooting incidents'], [0, '']]  // Single keyphrase
};

const sampleKeyphraseAlias = {
  '0': 'background_check',        // Plural → singular
  '1': 'regulate_firearm',        // Gerund → infinitive  
  '2': 'gun_violence',           // Removed plural form, simplified compound
  '3': 'assault_weapon',         // Simplified compound term
  '4': 'constitutional_right',   // Plural → singular, generalized
  '5': 'mass_shooting'          // Formal term for incidents
};

const sampleSelectedClusters = {
  '0': '1',  // Selected (green)
  '1': '0',  // Not selected (red)
  '2': '1',  // Selected (green)
  '3': '-1', // Warning (yellow)
  '4': '1',  // Selected (green)
  '5': '0'   // Not selected (red)
};

// Advanced canonicalization examples with clear before/after transformations
const abortionSampleData = {
  curatedKeyphrases: {
    // Gerund → Infinitive + Plural → Singular
    '0': [[101, 'protecting reproductive rights'], [102, 'women\'s freedoms']],
    // Complex phrase → Simplified canonical form
    '1': [[201, 'pro-choice advocates'], [202, 'supporting choice']],
    // Plural variations → Singular standard
    '2': [[301, 'pro-life movements'], [302, 'anti-abortion activists']],
    // Legal case name variations → Standard reference
    '3': [[401, 'Roe vs Wade decision'], [0, '']],
    // Compound medical terms → Simplified
    '4': [[501, 'accessing healthcare services'], [502, 'medical interventions']],
    // Formal legal language → Standard terminology
    '5': [[601, 'constitutional frameworks'], [602, 'legal precedents']],
    // Euphemisms → Direct terminology
    '6': [[701, 'family planning services'], [0, '']],
    // Complex philosophical concept → Simplified
    '7': [[801, 'bodily autonomy rights'], [802, 'personal choices']]
  },
  keyphraseAlias: {
    '0': 'protect_reproductive_right',    // Gerund→infinitive, plural→singular
    '1': 'pro_choice',                   // Simplified compound term
    '2': 'pro_life',                     // Simplified, removed plural and compound
    '3': 'roe_v_wade',                   // Standardized case citation format
    '4': 'access_healthcare',            // Gerund→infinitive, generalized term
    '5': 'legal_framework',              // Plural→singular, simplified
    '6': 'family_planning',              // Removed redundant "services"
    '7': 'bodily_autonomy'              // Removed redundant "rights", simplified
  },
  selectedClusters: {
    '0': '1', '1': '1', '2': '0', '3': '1',
    '4': '1', '5': '-1', '6': '1', '7': '0'
  }
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Basic canonicalization examples showing plural→singular, gerund→infinitive, and compound phrase simplification transformations.'
      }
    }
  },
  args: {
    curatedKeyphrases: sampleCuratedKeyphrases,
    keyphraseAlias: sampleKeyphraseAlias,
    selectedClusters: sampleSelectedClusters,
    curatedKeyphrasesOrder: 'source_cluster',
    curatedKeyphrasesLength: 10,
    onCuratedKeyphrasesOrder: (value) => console.log('Order changed to:', value),
    onKeyphraseAliasSaveClick: (value) => console.log('Alias saved:', value),
  },
};

export const AlphabeticalOrder = {
  args: {
    ...Default.args,
    curatedKeyphrasesOrder: 'alphabetical',
  },
};

export const AbortionTopicExample = {
  args: {
    curatedKeyphrases: abortionSampleData.curatedKeyphrases,
    keyphraseAlias: abortionSampleData.keyphraseAlias,
    selectedClusters: abortionSampleData.selectedClusters,
    curatedKeyphrasesOrder: 'source_cluster',
    curatedKeyphrasesLength: 15,
    onCuratedKeyphrasesOrder: (value) => console.log('Abortion topic - Order changed to:', value),
    onKeyphraseAliasSaveClick: (value) => console.log('Abortion topic - Alias saved:', value),
  },
};

export const WithManyAliases = {
  args: {
    curatedKeyphrases: {
      // Progressive tense → Infinitive
      '0': [[101, 'implementing death penalties'], [102, 'executing criminals']],
      // Plural professional terms → Singular
      '1': [[201, 'life imprisonments'], [202, 'lifetime sentences']],
      // Gerund medical procedure → Noun form
      '2': [[301, 'performing lethal injections'], [302, 'using execution methods']],
      // Compound location → Simplified
      '3': [[401, 'death row inmates'], [0, '']],
      // Complex system reference → Simplified
      '4': [[501, 'reforming justice systems'], [502, 'criminal justice reforms']],
      // Process noun → Abstract concept
      '5': [[601, 'rehabilitating prisoners'], [0, '']]
    },
    keyphraseAlias: {
      '0': 'implement_death_penalty',      // Progressive→infinitive, plural→singular
      '1': 'life_imprisonment',           // Removed plural form
      '2': 'lethal_injection',           // Gerund→noun, simplified
      '3': 'death_row',                  // Removed redundant "inmates"
      '4': 'reform_justice_system',      // Gerund→infinitive, singular
      '5': 'rehabilitate_prisoner'       // Gerund→infinitive, singular
    },
    selectedClusters: {
      '0': '1', '1': '1', '2': '0', '3': '1', '4': '1', '5': '-1'
    },
    curatedKeyphrasesOrder: 'alphabetical',
    curatedKeyphrasesLength: 12,
    onCuratedKeyphrasesOrder: (value) => console.log('Death penalty - Order changed to:', value),
    onKeyphraseAliasSaveClick: (value) => console.log('Death penalty - Alias saved:', value),
  },
};

export const EmptyState = {
  args: {
    curatedKeyphrases: {},
    keyphraseAlias: {},
    selectedClusters: {},
    curatedKeyphrasesOrder: 'source_cluster',
    curatedKeyphrasesLength: 0,
    onCuratedKeyphrasesOrder: (value) => console.log('Empty state - Order changed to:', value),
    onKeyphraseAliasSaveClick: (value) => console.log('Empty state - Alias saved:', value),
  },
};

export const SingleKeyphraseOnly = {
  args: {
    curatedKeyphrases: {
      // Gerund → Infinitive 
      '0': [[101, 'raising minimum wages'], [0, '']],
      // Adjective phrase → Noun phrase
      '1': [[201, 'livable wage standards'], [0, '']],
      // Plural economic terms → Singular
      '2': [[301, 'wage increases'], [0, '']],
      // Compound pay descriptor → Simple term
      '3': [[401, 'hourly pay rates'], [0, '']],
      // Possessive form → Generic form
      '4': [[501, 'workers\' rights'], [0, '']]
    },
    keyphraseAlias: {
      '0': 'raise_minimum_wage',          // Gerund→infinitive, plural→singular
      '1': 'living_wage',               // Simplified from complex adjective phrase
      '2': 'wage_increase',             // Plural→singular
      '3': 'hourly_pay',                // Removed redundant "rates"
      '4': 'worker_right'               // Possessive→generic, plural→singular
    },
    selectedClusters: {
      '0': '1', '1': '1', '2': '0', '3': '1', '4': '1'
    },
    curatedKeyphrasesOrder: 'source_cluster',
    curatedKeyphrasesLength: 8,
    onCuratedKeyphrasesOrder: (value) => console.log('Single keyphrases - Order changed to:', value),
    onKeyphraseAliasSaveClick: (value) => console.log('Single keyphrases - Alias saved:', value),
  },
};

export const CanonalizationExamples = {
  parameters: {
    docs: {
      description: {
        story: `**Comprehensive Canonicalization Showcase**
        
This story demonstrates all major types of manual canonicalization:
- **Plural→Singular**: "policies" → "policy", "emissions" → "emission"
- **Gerund→Infinitive**: "protecting" → "protect", "reducing" → "reduce"  
- **Past Participle→Base**: "polluted" → "pollute", "improved" → "improve"
- **Compound Simplification**: "carbon dioxide emissions" → "carbon_emission"
- **Possessive→Generic**: "industry's responsibilities" → "industry_responsibility"
- **Comparative→Base**: "cleaner energy" → "clean_energy"
- **Progressive→Infinitive**: "are reducing" → "reduce"

Each transformation creates a consistent, searchable canonical form.`
      }
    }
  },
  args: {
    curatedKeyphrases: {
      // Example 1: Plural to Singular normalization
      '0': [[101, 'environmental policies'], [102, 'green regulations']],
      // Example 2: Gerund to Infinitive verb forms
      '1': [[201, 'protecting ecosystems'], [202, 'conserving biodiversity']],
      // Example 3: Past participle to base form
      '2': [[301, 'polluted environments'], [302, 'contaminated areas']],
      // Example 4: Compound descriptive phrase to simple noun
      '3': [[401, 'climate change impacts'], [0, '']],
      // Example 5: Formal/technical to standard terminology
      '4': [[501, 'carbon dioxide emissions'], [502, 'greenhouse gas releases']],
      // Example 6: Possessive to generic form
      '5': [[601, 'industry\'s responsibilities'], [0, '']],
      // Example 7: Comparative to base adjective
      '6': [[701, 'cleaner energy sources'], [702, 'renewable power alternatives']],
      // Example 8: Progressive tense to infinitive
      '7': [[801, 'reducing fossil fuels'], [802, 'eliminating coal dependency']]
    },
    keyphraseAlias: {
      '0': 'environmental_policy',        // Plural → singular
      '1': 'protect_ecosystem',          // Gerund → infinitive 
      '2': 'pollute_environment',        // Past participle → base form
      '3': 'climate_change_impact',      // Plural → singular
      '4': 'carbon_emission',            // Compound simplification, plural → singular
      '5': 'industry_responsibility',    // Possessive → generic, plural → singular
      '6': 'clean_energy',              // Comparative → base adjective
      '7': 'reduce_fossil_fuel'         // Progressive → infinitive, plural → singular
    },
    selectedClusters: {
      '0': '1', '1': '1', '2': '1', '3': '1', '4': '1', '5': '1', '6': '1', '7': '1'
    },
    curatedKeyphrasesOrder: 'source_cluster',
    curatedKeyphrasesLength: 15,
    onCuratedKeyphrasesOrder: (value) => console.log('Canonicalization examples - Order changed to:', value),
    onKeyphraseAliasSaveClick: (value) => console.log('Canonicalization examples - Alias saved:', value),
  },
};

export const BeforeAfterCanonizalization = {
  parameters: {
    docs: {
      description: {
        story: `**Before/After Canonicalization Demonstration**
        
This story clearly shows the transformation from original keyphrases to their canonical forms:
- **Original**: "students are studying", "pupils learning materials" 
- **Canonical**: "student_study" (progressive→infinitive, simplified)
- **Original**: "teachers' methodologies", "educational approaches"
- **Canonical**: "teacher_methodology" (possessive→generic, plural→singular)

The component now displays both the original keyphrases and their canonical forms, making the value of canonicalization immediately apparent.`
      }
    }
  },
  args: {
    curatedKeyphrases: {
      // Demonstrating clear before/after transformations
      '0': [[101, 'students are studying'], [102, 'pupils learning materials']],
      '1': [[201, 'teachers\' methodologies'], [202, 'educational approaches']],
      '2': [[301, 'implementing technologies'], [302, 'using digital tools']],
      '3': [[401, 'improved test scores'], [0, '']],
      '4': [[501, 'accessing online resources'], [502, 'digital learning platforms']],
      '5': [[601, 'educational outcomes'], [0, '']]
    },
    keyphraseAlias: {
      '0': 'student_study',              // Progressive → infinitive, simplified subject
      '1': 'teacher_methodology',        // Possessive → generic, plural → singular  
      '2': 'implement_technology',       // Gerund → infinitive, plural → singular
      '3': 'improve_test_score',        // Past participle → infinitive, plural → singular
      '4': 'access_online_resource',    // Gerund → infinitive, plural → singular
      '5': 'educational_outcome'        // Plural → singular
    },
    selectedClusters: {
      '0': '1', '1': '1', '2': '0', '3': '1', '4': '1', '5': '-1'
    },
    curatedKeyphrasesOrder: 'alphabetical',
    curatedKeyphrasesLength: 10,
    onCuratedKeyphrasesOrder: (value) => console.log('Before/After - Order changed to:', value),
    onKeyphraseAliasSaveClick: (value) => console.log('Before/After - Alias saved:', value),
  },
};

export const VisualCanonalizationDemo = {
  parameters: {
    docs: {
      description: {
        story: `**Visual Before/After Canonicalization**
        
This demo showcases the new visual format that displays original keyphrases alongside their canonical forms:

**What you'll see:**
- 📋 **Original keyphrases** shown as small outlined chips
- ✏️ **Canonical form** in the text field (editable)
- 🔄 **Clear transformation** from complex/varied → simple/standardized

**Example transformations:**
- "protesters are demanding changes" + "activists organizing rallies" → "protest_demand_change"
- "politicians' responses" + "governmental reactions" → "political_response"
- "implementing new policies" → "implement_policy"

This visualization makes the canonicalization process transparent and educational.`
      }
    }
  },
  args: {
    curatedKeyphrases: {
      // Complex social movement terms → Simplified
      '0': [[101, 'protesters are demanding changes'], [102, 'activists organizing rallies']],
      // Possessive political terms → Generic
      '1': [[201, 'politicians\' responses'], [202, 'governmental reactions']],
      // Implementation processes → Action verbs
      '2': [[301, 'implementing new policies'], [0, '']],
      // Media coverage variations → Standard term
      '3': [[401, 'news media coverage'], [402, 'press reporting']],
      // Public opinion expressions → Core concept
      '4': [[501, 'citizens\' opinions'], [502, 'public sentiments']],
      // Economic impact descriptions → Simple noun phrase
      '5': [[601, 'economic consequences'], [0, '']]
    },
    keyphraseAlias: {
      '0': 'protest_demand_change',       // Progressive → infinitive, compound simplification
      '1': 'political_response',         // Possessive → generic, plural → singular
      '2': 'implement_policy',           // Gerund → infinitive, adjective removal
      '3': 'media_coverage',             // Compound simplification
      '4': 'citizen_opinion',            // Possessive → generic, plural → singular
      '5': 'economic_consequence'        // Plural → singular
    },
    selectedClusters: {
      '0': '1', '1': '1', '2': '1', '3': '1', '4': '1', '5': '1'
    },
    curatedKeyphrasesOrder: 'source_cluster',
    curatedKeyphrasesLength: 12,
    onCuratedKeyphrasesOrder: (value) => console.log('Visual demo - Order changed to:', value),
    onKeyphraseAliasSaveClick: (value) => {
      console.group('🎨 Visual Canonicalization Demo - Alias Saved');
      console.log('Canonical form:', value[1]);
      console.log('Cluster ID:', value[0]);
      console.log('This demonstrates the before/after transformation clearly!');
      console.groupEnd();
    },
  },
};