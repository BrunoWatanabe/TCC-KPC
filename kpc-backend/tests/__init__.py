import os
import sys
from keyphrase_curation import init_config

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))

config = init_config()

fixtures_path = config["fixtures_path"]


def open_fixture(file_name):
    file_path = f"{fixtures_path}/{file_name}"
    with open(file_path, "r") as file:
        return file.read()


def list_fixtures():
    return os.listdir(fixtures_path)
