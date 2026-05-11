from reactpy import run, component, html, use_state
from reactpy_material import typography, box
from keyphrase_curation.components.keyphrase_clusters \
    import KeyphraseClusters
from tests import open_fixture
import json


@component
def KeyphraseClustersSample():

    clusters_data, set_clusters_data = use_state(
        json.loads(open_fixture("clusters_annotation.json")))

    def on_cluster_selected_by_change(value):
        clusters_data_copy = clusters_data.copy()
        cluster_id, selected = value.split(",")
        clusters_data_copy['selected_clusters'][cluster_id] = selected
        set_clusters_data(clusters_data_copy)

    def change_selected_keyphrase(value, order):
        clusters_data_copy = clusters_data.copy()
        cluster_id, selected_keyphrase = value.split(",")
        clusters_data_copy['selected_keyphrases'][
            str(cluster_id)][f"selected{order}"] = selected_keyphrase
        set_clusters_data(clusters_data_copy)

    def on_keyphrase1_selected_by_change(value, order):
        change_selected_keyphrase(value, order)

    def on_keyphrase2_selected_by_change(value, order):
        change_selected_keyphrase(value, order)

    def get_keyphrase_clusters():
        clusters_info = "Keyphrase Clusters Sample"
        return KeyphraseClusters(
            clusters_data,
            clusters_info,
            on_cluster_selected_by_change=on_cluster_selected_by_change,
            on_keyphrase1_selected_by_change=on_keyphrase1_selected_by_change,
            on_keyphrase2_selected_by_change=on_keyphrase2_selected_by_change)

    return html.div(
        get_keyphrase_clusters())


run(KeyphraseClustersSample)
