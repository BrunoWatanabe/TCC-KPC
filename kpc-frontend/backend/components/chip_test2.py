import re

from keyphrase_curation.components import default_local_handler
from reactpy_material import box, form_control, grid, input_label, \
    menu_item, select, typography, icon
from reactpy import component, run, use_state, html
from keyphrase_curation.components.adjudicator_clusters \
    import AdjudicatorClusterChips
from keyphrase_curation.util.fixture import clusters_data, \
    selected_clusters, selected_keyphrases


@component
def KeyphraseClusters(
        cluster_set='union',
        clusters_data=clusters_data,
        clusters_info="Clues from other annotators",
        cluster_order="clues_from_other_annotators",
        selected_clusters=selected_clusters,
        selected_keyphrases=selected_keyphrases,
        hide_source_keyphrases=False,
        task="keyphrase_clustering",
        on_cluster_selected_by_change=default_local_handler,
        on_keyphrase1_selected_by_change=default_local_handler,
        on_keyphrase2_selected_by_change=default_local_handler,
        on_cluster_order_by_change=default_local_handler):

    clusters, set_clusters = use_state(clusters_data)

    def get_selected_keyphrase(cluster_id, order):
        if cluster_id in selected_keyphrases:
            if order in [1, 2]:
                selected = selected_keyphrases[cluster_id][f'selected{order}']
                return "0" if selected in [-1, 0] else str(selected)
            else:
                raise ValueError("Invalid order")
        elif cluster_id == len(clusters[cluster_set]):
            return "0"
        return "0"

    def get_kp_id(keyphrase_str):
        return re.search(r'\((\d+)\)', keyphrase_str).group(1)

    def get_chip_color(value, id):
        kp_id = int(get_kp_id(value))
        kp_id1 = selected_keyphrases.get(str(id), 0)['selected1']
        kp_id2 = selected_keyphrases.get(str(id), 0)['selected2']
        selected = selected_clusters.get(str(id), "")
        if kp_id in [kp_id1, kp_id2]:
            if selected == "1":
                return "success"
            elif selected == "0":
                return "error"
            elif selected == "-1":
                return "warning"
            else:
                return "default"
        else:
            return "default"

    def get_selected_cluster(cluster_id):
        cluster_id = str(cluster_id)
        if cluster_id in selected_clusters:
            selected = selected_clusters[cluster_id]
            return selected if selected in ["0", "1"] else "0"
        return "0"

    def cluster_select(id, clusters): return form_control(
        input_label(
            "CS",
            attrs={"htmlFor": "select-cluster"}),
        select(
            menu_item("0", attrs={"value": f'{id},0'}),
            menu_item("1", attrs={"value": f'{id},1'}),
            attrs={
                "id": "select-cluster",
                "value": f'{id},'
                f'{get_selected_cluster(id)}',
                "on_change":
                lambda _, e:
                on_cluster_selected_by_change(
                    e["props"]["value"]),
                "disabled": str(id) == str(len(clusters))
            }),
        attrs={"style": {"display": "flex", "flexDirection": "row"}}
    )

    def keyphrase_menu_items(id, values):
        menu_items = []
        menu_items.append(
            menu_item(
                "0",
                attrs={"value": f"{id},0"},
            )
        )
        for keyphrase_str in values[1]:
            kp_id = get_kp_id(keyphrase_str)
            menu_items.append(
                menu_item(
                    kp_id,
                    attrs={"value": f"{id},{kp_id}"}
                )
            )
        return menu_items

    def first_keyphrase_select(id, values): return form_control(
        input_label(
            "S1",
            attrs={"htmlFor": "select-keyphrase1"}),
        select(
            *keyphrase_menu_items(id, values),
            attrs={
                "id": "select-keyphrase1",
                "value": f'{id},'
                f'{get_selected_keyphrase(str(id),1)}',
                "on_change":
                lambda _, e:
                on_keyphrase1_selected_by_change(
                    e["props"]["value"]),
                "disabled": str(id) == f"{len(clusters)}"
            }
        ),
        attrs={"style": {"display": "flex", "flexDirection": "row"}})

    def second_keyphrase_select(id, values): return form_control(
        input_label(
            "S2",
            attrs={"htmlFor": "select-keyphrase2"}),
        select(
            *keyphrase_menu_items(id, values),
            attrs={
                "id": "select-keyphrase2",
                "value": f'{id},'
                f'{get_selected_keyphrase(str(id),2)}',
                "on_change":
                lambda _, e: on_keyphrase2_selected_by_change(
                    e["props"]["value"]),
                    "disabled":
                        selected_keyphrases.get(
                            str(id))['selected1'] == 0
            }
        ),
        attrs={"style": {"display": "flex", "flexDirection": "row"}})

    cluster_chips = [AdjudicatorClusterChips(
            id=id,
            adjudicator_cluster=clusters['adjudicator'][id][1],
            annotator1_cluster=clusters['annotator1'][id][1],
            annotator2_cluster=clusters['annotator2'][id][1],
            union_list=clusters['union'][id][1]
        )
          for id in clusters['union'].keys()]
    # ] if cluster_order == "clues_from_other_annotators" else [
    #     box(
    #         box(
    #             cluster_select(id, clusters[cluster_set]),
    #             first_keyphrase_select(id, values),
    #             second_keyphrase_select(id, values),
    #             attrs={"style": {"display": "flex", "flexDirection": "row"}}
    #         ),
    #         box(
    #             typography(
    #                 f"{values[0]}",
    #                 attrs={"variant": "body1"}
    #             ),
                # *chip_list(id, values),
                #html.div(
                #    html.p(f"{values[1]}")
                #),
        #         attrs={
        #             "direction": "row",
        #             "spacing": 1,
        #             "border": 5,
        #             "borderRadius": 4,
        #             "borderColor": "green"
        #             if selected_clusters.get(str(id), "") == "1"
        #             else "red" if selected_clusters.get(str(id), "") == "0"
        #             else "yellow"

        #         }
        #     ),
        #     attrs={"style": {"display": "flex", "flexDirection": "row"}}
        # )
        # for id, values in clusters['profile'].items()
    # ]
    cluster_order_select =  \
        form_control(
            input_label(
                "Order by",
                attrs={"htmlFor": "select-cluster-order"}),
            select(
                menu_item("clues_from_other_annotators",
                          attrs={"value": "clues_from_other_annotators"}),
                menu_item("numerical",
                          attrs={"value": "numerical"}),
                menu_item("cluster_cohesion",
                          attrs={"value": "cluster_cohesion"}),
                menu_item("pairwise_similarity",
                          attrs={"value": "pairwise_similarity"}),
                menu_item("centroid_similarity",
                          attrs={"value": "centroid_similarity"}),
                attrs={
                    "id": "select-cluster-order",
                    "value": cluster_order,
                    "on_change": lambda _, e: on_cluster_order_by_change(
                        e["props"]["value"])
                }
            ),
            attrs={"style": {"flex": 1, "display": "flex"}},
        )
    return \
        grid(
            typography(
                "Keyphrase Clusters",
                attrs={"variant": "h4"}),
            box(
                cluster_order_select,
                typography(
                    clusters_info,
                    attrs={"variant": "body1"}),
                attrs={"style": {"display": "flex", "flexDirection": "row"}}),
            *cluster_chips,
            attrs={
                "item": True,
                "style": {
                    "overflow": "scroll",
                    "height": "85%",
                    "width": "50%",
                    "position": "absolute",
                    "right": 0 if not hide_source_keyphrases else "50%"},
                "sx": {
                    "padding": 2,
                    "paddingLeft": 2,
                    "paddingBottom": 12,
                    "paddingTop": 2
                }
            }
        )


if __name__ == "__main__":
    run(KeyphraseClusters)
