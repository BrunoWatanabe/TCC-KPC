import os
from dotenv import load_dotenv


def load_config(root_path):
    load_dotenv(dotenv_path=f'{root_path}/.env')
    dataset_path = os.path.join(root_path, 'dataset')
    csv_path = f'{dataset_path}/keyphrases/curated'
    embeddings_path = f'{dataset_path}/keyphrases/embeddings'
    attributions_filepath = f'{dataset_path}/attributions.toml'
    app_config = {
        'csv_path': csv_path,
        'embeddings_path': embeddings_path,
        'attributions_filepath': attributions_filepath
    }
    return app_config
