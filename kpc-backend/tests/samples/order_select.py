from reactpy import run, component, html, use_state
from keyphrase_curation.components.keyphrase_clusters import order_select    


@component
def cluster_order_select():

    def on_cluster_order_by_change(value):
        set_cluster_order(value)

    cluster_order, set_cluster_order = use_state("numerical")
    return html.div(
        order_select(
            ["numerical", "cluster_cohesion", "pairwise_similarity",
             "centroid_similarity"],
            cluster_order,
            on_cluster_order_by_change))


run(cluster_order_select)
