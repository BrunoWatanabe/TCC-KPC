from keyphrase_curation.components import default_local_handler
from reactpy_material import box, form_control, grid, input_label, \
    menu_item, select, switch, typography
from reactpy import component


@component
def KeyphraseClustering(
        clusters={},
        keyphrase_clustering=[],
        hide_clustered=False,
        keyphrase_order="alphabetical",
        on_keyphrases_order_by_change=default_local_handler,
        on_hide_clustered_change=default_local_handler,
        on_keyphrase_clustering_change=default_local_handler):

    switch_hide_clustered = \
        box(
            typography(
                "Hide clustered",
                attrs={"variant": "body1"}),
            switch(
                attrs={
                    "checked": hide_clustered,
                    "on_change":
                        lambda _, e: on_hide_clustered_change(e)
                }
            ),
            attrs={
                "style": {
                    "display": "flex",
                    "flex": 1,
                    "flexDirection": "column",
                    "paddingLeft": 10}}
        )

    def cluster_selects(clusters, key):
        return [
            menu_item(
                f"{cluster_id+1}",
                attrs={"value": f"{key},{cluster_id+1}"})
            for cluster_id in range(0, len(clusters))
        ]

    keyphrase_clustering_selects = [
        box(
            typography(keyphrase_clustering[key]["description"],
                       attrs={"variant": "body1"}),
            form_control(
                input_label(
                    "Cluster",
                    attrs={"htmlFor": f"select-keyphrase-clustering-{key}"}),
                select(
                    *cluster_selects(clusters, key),
                    attrs={
                        "value": f"{key},{value['clustering']}",
                        "key": key,
                        "id": f"select-keyphrase-clustering-{key}",
                        "on_change":
                            lambda _, e: on_keyphrase_clustering_change(
                                e["props"]["value"]),
                        "sx": {
                            "paddingLeft": 2,
                            "paddingRight": 2,
                            "minWidth": 50
                                }}
                )
            ),
            attrs={
                "style": {
                    "flex": 1,
                    "display": "flex",
                    "flexDirection": "row"}
            }
        ) for key, value
        in keyphrase_clustering.items()
        if not hide_clustered or value['clustering'] == 0
    ]
    keyphrase_order_select =  \
        form_control(
            input_label(
                "Order by",
                attrs={"htmlFor": "select-keyphrase-order"}
            ),
            select(
                menu_item("alphabetical",
                          attrs={"value": "alphabetical"}),
                menu_item("numerical",
                          attrs={"value": "numerical"}),
                menu_item("cluster_similarity",
                          attrs={"value": "cluster_similarity"}),
                menu_item("pairwise_similarity",
                          attrs={"value": "pairwise_similarity"}),
                attrs={
                    "id": "select-keyphrase-order",
                    "value": keyphrase_order,
                    "on_change": lambda _, e: on_keyphrases_order_by_change(
                        e["props"]["value"])
                }
            ),
            attrs={"style": {"flex": 1, "display": "flex"}}
        )
    return \
        grid(
            grid(
                grid(
                    typography("Source Keyphrases", attrs={"variant": "h4"}),
                    box(
                        keyphrase_order_select,
                        switch_hide_clustered,
                        attrs={
                            "style": {
                                "display": "flex",
                                "flexDirection": "row"
                            }}),
                    *keyphrase_clustering_selects,
                    attrs={
                        "item": True,
                        "style": {
                            "display": "flex",
                            "flex": 1,
                            "flexDirection": "column"}
                    }
                ),
                attrs={
                    "style": {
                        "overflow": "scroll",
                        "height": "85%",
                        "width": "50%",
                        "position": "absolute"},
                    "sx": {
                        "paddingRight": 2,
                        "paddingLeft": 2,
                        "paddingBottom": 6,
                        "paddingTop": 2}}),
            attrs={
                "container": True,
                "style": {
                    "display": "flex",
                    "flex": 1}})
