from dotenv import dotenv_values, find_dotenv
from pathlib import Path
import sys

config = None
root_path = Path(__file__).resolve().parents[2]
env_filepath = find_dotenv(usecwd=True) or str(root_path / ".env")
sys.path.append(str(root_path))

_REQUIRED_KEYS = [
    "DATASET_RELATIVE_PATH",
    "ATTRIBUTIONS_FILENAME",
    "CLUSTER_IDS_LENGTH",
    "CURATED_KEYPHRASES_LENGTH",
]


def init_config():
    config = dotenv_values(env_filepath) or {}
    missing_keys = [key for key in _REQUIRED_KEYS if not config.get(key)]

    if missing_keys:
        missing = ", ".join(missing_keys)
        raise RuntimeError(
            f"Configuracao incompleta em {env_filepath}: {missing}"
        )

    config['root_path'] = str(root_path)
    dataset_path = f"{root_path}/{config['DATASET_RELATIVE_PATH']}"
    config['dataset_path'] = dataset_path
    config['tests_path'] = f"{root_path}/tests"
    config['fixtures_path'] = f"{config['tests_path']}/fixtures"
    attributions_filepath = f"{dataset_path}/{config['ATTRIBUTIONS_FILENAME']}"
    config['attributions_filepath'] = attributions_filepath
    config['cluster_ids_length'] = int(config['CLUSTER_IDS_LENGTH'])
    config['curated_keyphrases_length'] = \
        int(config['CURATED_KEYPHRASES_LENGTH'])
    config['embeddings_path'] = f"{dataset_path}/keyphrases/embeddings"
    config['collected_keyphrases_path'] = \
        f"{dataset_path}/keyphrases/collected"
    return config


config = init_config()

VERSION = "0.1.0"
