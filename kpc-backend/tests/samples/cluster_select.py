import json
from reactpy import run, component, html, use_state
from keyphrase_curation.components.keyphrase_clusters import cluster_select
from tests import open_fixture


@component
def cluster_select_component():

    selected_clusters, set_selected_clusters = use_state(
        json.loads(open_fixture("selected_clusters.json")))

    def on_cluster_selected_by_change(value):
        print("value: ", value)
        cluster_id, selected_cluster = value.split(",")
        selected_clusters_copy = selected_clusters.copy()
        selected_clusters_copy[cluster_id] = selected_cluster
        set_selected_clusters(selected_clusters_copy)

    def get_cluster_selects():
        result = []
        for cluster_id in selected_clusters.keys():
            result.append(
                html.div(
                    {"style":
                        {"display": "flex",
                         "flexDirection": "row",
                         "gap": "10px"}},
                    html.p(f"Cluster {cluster_id}"),
                    cluster_select(
                        cluster_id,
                        selected_clusters,
                        on_cluster_selected_by_change),
                    html.br()
                ))
        return result

    cluster_selects = get_cluster_selects()

    return html.div(
        *cluster_selects)


run(cluster_select_component)
