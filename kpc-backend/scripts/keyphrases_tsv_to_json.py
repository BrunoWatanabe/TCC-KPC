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

tsv_filename = f'{dataset_path}/keyphrases/collected/{topic}.tsv'
json_filename = f'{dataset_path}/annotations/{annotator}/{topic}.json'
df = pd.read_csv(tsv_filename, sep='\t')

id = 1
num_clusters = 33
for row in df.itertuples():
    data['keyphrases'][f"{id}"] = {
        "keyphrase": row.keyphrase, "collected_from": row.collected_from}
    id += 1

for cluster_id in range(1, num_clusters + 1):
    data['clusters'][f"{cluster_id}"] = {
        "keyphrases": [],
        "selected": 0,
        "keyphrase1_selected": 0,
        "keyphrase2_selected": 0,
        "alias": ""
    }

try:
    with open(json_filename, 'w') as f:
        json.dump(data, f, indent=4)
    print(f'File {json_filename} created succesfully')
except Exception as e:
    print(f'Error: {e}')
