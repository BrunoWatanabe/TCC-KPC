from reactpy import component, html
from keyphrase_curation.components import default_local_handler
from reactpy_material import box, switch, typography
from keyphrase_curation.components.keyphrase_clusters \
    import KeyphraseClusters
from keyphrase_curation.components.keyphrase_clustering \
    import KeyphraseClustering
from keyphrase_curation.components.curated_keyphrases \
    import CuratedKeyphrases


@component
def KeyphraseCuration(
    clusters={},
    keyphrase_clustering=[],
    keyphrase_order="alphabetical",
    cluster_order="numerical",
    curated_keyphrases_order="source_cluster",
    clusters_info="",
    hide_clustered=False,
    hide_source_keyphrases=False,
    selected_clusters={},
    selected_keyphrases={},
    curated_keyphrases={},
    keyphrase_alias={},
    on_curated_keyphrases_order=default_local_handler,
    on_keyphrase_clustering_change=default_local_handler,
    on_keyphrases_order_by_change=default_local_handler,
    on_hide_clustered_change=default_local_handler,
    on_hide_source_keyphrases=default_local_handler,
    on_cluster_order_by_change=default_local_handler,
    on_cluster_selected_by_change=default_local_handler,
    on_keyphrase1_selected_by_change=default_local_handler,
    on_keyphrase2_selected_by_change=default_local_handler,
    on_keyphrase_alias_save_click=default_local_handler
):

    switch_hide_source_keyphrases = \
        box(
            typography(
                "Hide Source Keyphrases",
                attrs={"variant": "body1"}
            ),
            switch(
                attrs={
                    "checked": hide_source_keyphrases,
                    "on_change":
                    lambda _, e: on_hide_source_keyphrases(e)
                }
            ),
            attrs={
                "style":
                {
                    "display": "flex",
                    "flex": 1,
                    "flexDirection": "row",
                    "paddingLeft": 10
                }
            }
        )
    print("keyphrase clustering: ", keyphrase_clustering)

    keyphrase_clustering = \
        KeyphraseClustering(
            clusters=clusters,
            keyphrase_clustering=keyphrase_clustering,
            hide_clustered=hide_clustered,
            keyphrase_order=keyphrase_order,
            on_keyphrases_order_by_change=on_keyphrases_order_by_change,
            on_hide_clustered_change=on_hide_clustered_change,
            on_keyphrase_clustering_change=on_keyphrase_clustering_change
        )

    cluster_selection = \
        KeyphraseClusters(
            clusters=clusters,
            clusters_info=clusters_info,
            cluster_order=cluster_order,
            selected_clusters=selected_clusters,
            selected_keyphrases=selected_keyphrases,
            hide_source_keyphrases=hide_source_keyphrases,
            on_cluster_selected_by_change=on_cluster_selected_by_change,
            on_keyphrase1_selected_by_change=on_keyphrase1_selected_by_change,
            on_keyphrase2_selected_by_change=on_keyphrase2_selected_by_change,
            on_cluster_order_by_change=on_cluster_order_by_change
        )

    keyphrase_selection = \
        CuratedKeyphrases(
            curated_keyphrases_order=curated_keyphrases_order,
            curated_keyphrases=curated_keyphrases,
            selected_clusters=selected_clusters,
            keyphrase_alias=keyphrase_alias,
            on_curated_keyphrases_order=on_curated_keyphrases_order,
            on_keyphrase_alias_save_click=on_keyphrase_alias_save_click
        )

    return html.div(
        {"style": {
            "width": "100%",
            "height": "100%"}},
        html.div(
            {"style": {
                "overflow": "hidden",
                "width": "100%",
                "height": "15%"}},
            html.h1("Keyphrase Curation"),
            html.div(
                switch_hide_source_keyphrases
            )),
        keyphrase_clustering
        if not hide_source_keyphrases
        else cluster_selection,
        cluster_selection
        if not hide_source_keyphrases
        else keyphrase_selection
    )
