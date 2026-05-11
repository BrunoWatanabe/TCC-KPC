from reactpy import run, component, html, use_state
from reactpy_material import typography, box
from keyphrase_curation.components.keyphrase_clusters import keyphrase_select
from tests import open_fixture
import json


@component
def keyphrase_select_component():

    clusters_data, set_clusters_data = use_state(
        json.loads(open_fixture("clusters_data.json")))

    def on_keyphrase_selected_by_change(value, order):
        cluster_id, keyphrase_id = value.split(",")
        clusters_data_new = clusters_data.copy()
        clusters_data_new['selected_keyphrases'][
            cluster_id][f"selected{order}"] = keyphrase_id
        set_clusters_data(clusters_data_new)

    def get_selected_keyphrases():
        selected_keyphrases = clusters_data['selected_keyphrases']
        keyphrase_selects = []
        for cluster_id in selected_keyphrases:
            keyphrase_selects.append(
                box(
                    typography(
                        f"Cluster {cluster_id}",
                        attrs={"key": f"cluster_{cluster_id}"}),
                    keyphrase_select(
                        clusters_data, cluster_id, "S1", 1,
                        on_keyphrase_selected_by_change),
                    keyphrase_select(
                        clusters_data, cluster_id, "S2", 2,
                        on_keyphrase_selected_by_change),
                    attrs={"style": {"flex": 1, "display": "flex"}}
                ))
        return keyphrase_selects

    cluster_selects = get_selected_keyphrases()

    return html.div(
        *cluster_selects)


run(keyphrase_select_component)
