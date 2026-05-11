import pandas as pd
import json
from keyphrase_curation import config

data = {
    'keyphrases': {},
    'clusters': {}
}
dataset_path = config['dataset_path']
annotator = input('annotator: ')
topic = input('topic: ')

kpc_filename = f'{dataset_path}/annotations/{annotator}/{topic}.kpc'
json_filename = f'{dataset_path}/annotations/{annotator}/{topic}.json'
df = pd.read_csv(kpc_filename, sep='\t')

for row in df.itertuples():
    data['keyphrases'][row.id] = {
        "keyphrase": row.keyphrase, "collected_from": row.colected_from}
    cluster_id = row.clustering
    if cluster_id in data['clusters']:
        data['clusters'][cluster_id]['keyphrases'].append(row.id)
    else:
        data['clusters'][cluster_id] = {'keyphrases': [row.id]}
        data['clusters'][cluster_id]['selected'] = -1
        data['clusters'][cluster_id]['keyphrase1_selected'] = 0
        data['clusters'][cluster_id]['keyphrase2_selected'] = 0
        data['clusters'][cluster_id]['alias'] = ''

try:
    with open(json_filename, 'w') as f:
        json.dump(data, f, indent=4)
    print(f'File {json_filename} created succesfully')
except Exception as e:
    print(f'Error: {e}')