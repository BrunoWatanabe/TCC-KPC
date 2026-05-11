import sys
import os

keyphrase_curation_path = os.getcwd()
sys.path.append(keyphrase_curation_path)
dataset_path = keyphrase_curation_path + '/dataset'

from keyphrase_curation.extractor import (
    KeyphraseExtractor,
    KeybertExtractor,
    RakeExtractor,
    SpacyExtractor,
    TextrankExtractor,
    YakeExtractor)

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
extractors = {
    'keybert': {
        'count': 40,
        'tool': KeybertExtractor
    },
    'rake': {
        'count': 40,
        'tool': RakeExtractor
    },
    'spacy': {
        'count': 40,
        'tool': SpacyExtractor
    },
    'textrank': {
        'count': 40,
        'tool': TextrankExtractor
    },
    'yake': {
        'count': 40,
        'tool': YakeExtractor
    },
}

for extractor in extractors:
    count = extractors[extractor]['count']
    tool = extractors[extractor]['tool']()
    print(f"extracting keyphrases with {extractor}")
    ke = KeyphraseExtractor()
    for topic in topics:
        topic_path = f'{dataset_path}/texts/{topic}'
        assert os.path.exists(topic_path), f'{topic_path} not exists'
        keyphrases_file = \
            f'{dataset_path}/keyphrases/extracted/{topic}.{extractor}.txt'
        if os.path.exists(keyphrases_file):
            print(f"the keyphrases file {keyphrases_file} exists, skipping...")
        else:
            print(f"loading texts for topic {topic} in path: {topic_path}")
            ke.load_texts(topic_path)
            print(f'extracting keyphrases in {topic} with {extractor}...')        
            keyphrases = ke.extract(tool, count)
            with open(keyphrases_file, 'w') as f:
                f.write('\n'.join(keyphrases))
            print(f"keyphrases saved in file '{keyphrases_file}'")
