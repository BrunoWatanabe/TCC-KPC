import sys
import os
import time

keyphrase_curation_path = os.getcwd()
sys.path.append(keyphrase_curation_path)
dataset_path = keyphrase_curation_path + '/dataset'

from keyphrase_curation.generator import ChatGptGenerator, KeyphraseGenerator

topics = [
    'abortion',
    'cloning',
    'death_penalty',
    'gun_control',
    'marijuana_legalization',
    'minimum_wage',
    'nuclear_energy',
    'school_uniforms'
]

generators = {
    'chatgpt_pro': {
        'count': 20,
        'tool': ChatGptGenerator,
        'prompt_type': ChatGptGenerator.PRO_ARGUMENTS_PROMPT
    },
    'chatgpt_against': {
        'count': 20,
        'tool': ChatGptGenerator,
        'prompt_type': ChatGptGenerator.AGAINST_ARGUMENTS_PROMPT
    },
    'chatgpt_ne': {
        'count': 20,
        'tool': ChatGptGenerator,
        'prompt_type': ChatGptGenerator.NAMED_ENTITIES_PROMPT
    }
}

for generator in generators:
    print(f"generating keyphrases with {generator}")
    kg = KeyphraseGenerator()
    for topic in topics:
        topic_path = f'{dataset_path}/texts/{topic}'
        assert os.path.exists(topic_path), f'{topic_path} not exists'
        keyphrases_file = \
            f'{dataset_path}/keyphrases/generated/{topic}.{generator}.txt'
        if os.path.exists(keyphrases_file):
            print(f"the keyphrases file {keyphrases_file} exists, skipping...")
        else:
            count = generators[generator]['count']
            prompt_type = generators[generator]['prompt_type']
            tool = generators[generator]['tool'](topic, count)
            print(f'generating keyphrases in {topic} with {generator}...')        
            keyphrases = kg.generate(tool, prompt_type)
            with open(keyphrases_file, 'w') as f:
                f.write('\n'.join(keyphrases))
            print(f"keyphrases saved in file '{keyphrases_file}'")
            time.sleep(25)
