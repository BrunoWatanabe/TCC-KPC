from keyphrase_curation import config
import json


def import_fixture(json_file='clusters_data.json'):
    json_data = f"{config['root_path']}/tests/fixtures/{json_file}"
    with open(json_data, "r") as f:
        data = json.load(f)
    return data


def gen_clusters_data(data):
    clusters = {}
    clusters['adjudicator'] = {}
    clusters['annotator1'] = {}
    clusters['annotator2'] = {}
    clusters['union'] = {}

    keyphrases = data['keyphrases']
    for cluster in data['annotator1']:
        clusters['adjudicator'][cluster] = [
            f"Cluster {cluster}",
                [
                    f"{keyphrases[str(keyphrase)]['keyphrase']}({keyphrase})" for
                    keyphrase in data['adjudicator'][cluster]['keyphrases']
                ]
        ]
        clusters['annotator1'][cluster] = [
            f"Cluster {cluster}",
                [
                    f"{keyphrases[str(keyphrase)]['keyphrase']}({keyphrase})" for
                    keyphrase in data['annotator1'][cluster]['keyphrases']
                ]
        ]
        clusters['annotator2'][cluster] = [
            f"Cluster {cluster}",
                [
                    f"{keyphrases[str(keyphrase)]['keyphrase']}({keyphrase})" for
                    keyphrase in data['annotator2'][cluster]['keyphrases']
                ]
        ]
        clusters['union'][cluster] = [
            f"Cluster {cluster}",
            list(set(clusters['annotator1'][cluster][1]).union(
                set(clusters['annotator2'][cluster][1]))),

        ]

    return clusters


# json_annotation_data = import_fixture('clusters_annotation.json')
# clusters_annotation_data = gen_clusters_data(json_annotation_data)

clusters_data = import_fixture('clusters_data.json')
clusters_annotation_data = import_fixture('clusters_annotation.json')
# clusters_data = gen_clusters_data(json_clusters_data)

selected_clusters = import_fixture('selected_clusters.json')

selected_keyphrases = import_fixture('selected_mj_keyphrases.json')
