from reactpy import run, component, html, use_state
from reactpy_material import typography, box
from keyphrase_curation.components.keyphrase_clusters import cluster_chips
from tests import open_fixture
import json


@component
def cluster_chips_list():

    clusters_data, set_clusters_data = use_state(
        json.loads(open_fixture("clusters_data.json")))

    def get_cluster_chips_list():
        clusters = clusters_data['clusters']
        cluster_chips_list = []
        for cluster_id in clusters:
            cluster_chips_list.append(
                cluster_chips(clusters_data, cluster_id))
        return cluster_chips_list

    cluster_chips_list = get_cluster_chips_list()

    return html.div(
        *cluster_chips_list)


run(cluster_chips_list)
