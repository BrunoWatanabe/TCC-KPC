import re

from keyphrase_curation.components import default_local_handler
from keyphrase_curation.components.adjudicator_clusters \
    import AdjudicatorClusterChips
from reactpy_material import box, chip, form_control, grid, input_label, \
    menu_item, select, typography
from reactpy import component, use_state


def get_kp_id(keyphrase_str):
    return re.search(r'\((\d+)\)', keyphrase_str).group(1)


def order_select(
        items, cluster_order, on_cluster_order_by_change):
    '''Order select component
    Args:
        items (list): list of items
        cluster_order (str): cluster order
        on_cluster_order_by_change (function): function to call on change
    Returns:
        component: order select component
    See:
        Sample usage at tests/samples/order_select.py
    '''
    menuitems = [
        menu_item(
            item,
            attrs={
                "value": item,
                "key": f"{item}"
            })
        for item in items]

    return \
        form_control(
            input_label(
                "Order by",
                attrs={
                    "key": "order-by",
                    "htmlFor": "select-cluster-order"}),
            select(
                *menuitems,
                attrs={
                    "id": "select-cluster-order",
                    "key": "select-cluster-order",
                    "value": cluster_order,
                    "on_change": lambda _, e: on_cluster_order_by_change(
                           e["props"]["value"])}),
            attrs={
                "key": "order-select-component",
                "style": {"flex": 1, "display": "flex"}}
        )


def cluster_select(
        cluster_id, selected_clusters, on_cluster_selected_by_change):
    '''
    Cluster select component
    Args:
        cluster_id (int): cluster id
        selected_clusters (dict): selected clusters
        on_cluster_selected_by_change (function): function to call on change
    Returns:
        component: cluster select component
    See:
        Sample usage at tests/samples/cluster_select.py
    '''
    def get_selected_cluster(cluster_id, selected_clusters):
        cluster_id = str(cluster_id)
        if cluster_id in selected_clusters:
            selected = selected_clusters[cluster_id]
            return selected if selected in ["0", "1"] else "0"
        return "0"

    return \
        form_control(
            input_label(
                "CS",
                attrs={
                    "key": f"cluster-input-label{cluster_id}",
                    "htmlFor": "select-cluster"}),
            select(
                menu_item("0",
                          attrs={
                              "key": "menu-item-disabled",
                              "value": f'{cluster_id},0'}),
                menu_item("1",
                          attrs={
                              "key": "menu-item-enabled",
                              "value": f'{cluster_id},1'}),
                attrs={
                    "id": "select-cluster",
                    "key": f"select-cluster_{cluster_id}",
                    "value": f'{cluster_id},'
                    f'{get_selected_cluster(cluster_id, selected_clusters)}',
                    "on_change":
                    lambda _, e: on_cluster_selected_by_change(
                        e["props"]["value"]),
                        "disabled": str(cluster_id) ==
                        str(len(selected_clusters))  # thrash cluster
                }),
            attrs={
                "key": f"cluster-select-component{cluster_id}",
                "style": {"display": "flex", "flexDirection": "row"}}
        )


def keyphrase_select(clusters, cluster_id, label, order, selected_keyphrases,
                     on_keyphrase_selected_by_change):
    '''
    Keyphrase select component

    Args:
        clusters (dict): clusters data
        cluster_id (int): cluster id
        label (str): label
        order (int): order
        selected_keyphrases (dict): selected keyphrases
        on_keyphrase_selected_by_change (function): function to call on change
    Returns:
        component: keyphrase select component
    See:
        Sample usage at tests/samples/keyphrase_select.py
    '''

    def keyphrase_menuitems_component(clusters, cluster_id):
        # print("clusters", clusters)
        # keyphrases_list = clusters["clusters"][str(cluster_id)][1]
        keyphrases_list = clusters[int(cluster_id)][1]
        menu_items = []
        menu_items.append(
            menu_item(
                "0",
                attrs={
                    "key": f"menu-item{cluster_id}",
                    "value": f"{cluster_id},0"},
            )
        )
        for keyphrase_str in keyphrases_list:
            kp_id = get_kp_id(keyphrase_str)
            menu_items.append(
                menu_item(
                    kp_id,
                    attrs={
                        "key": f"menu-item{cluster_id}_{kp_id}",
                        "value": f"{cluster_id},{kp_id}"}
                )
            )
        return menu_items

    def is_keyphrase_selected(
            clusters, cluster_id, order, selected_keyphrases):
        # selected_keyphrases = clusters['selected_keyphrases']
        if cluster_id in selected_keyphrases:
            if order in [1, 2]:
                selected = selected_keyphrases[cluster_id][f'selected{order}']
                return "0" if selected in [-1, 0] else str(selected)
            else:
                raise ValueError("Invalid order")
        elif cluster_id == len(clusters):
            return "0"
        return "0"

    keyphrase_menuitems = keyphrase_menuitems_component(
        clusters, cluster_id)
    keyphrase_selected_value = is_keyphrase_selected(
        clusters, str(cluster_id), order, selected_keyphrases)

    return form_control(
        input_label(
            label,
            attrs={
                "key": f"keyphrase-input-label{cluster_id}_{order}",
                "htmlFor": "select-keyphrase"}),
        select(
            *keyphrase_menuitems,
            attrs={
                "id": "select-keyphrase",
                "key": f"select-keyphrase{cluster_id}_{order}",
                "value": f'{cluster_id},'
                f'{keyphrase_selected_value}',
                "on_change":
                lambda _, e:
                on_keyphrase_selected_by_change(
                    e["props"]["value"]),
                "disabled":
                    str(cluster_id) == f"{len(clusters)}"
            }
        ),
        attrs={
            "key": f"keyphrase-select-component{cluster_id}_{order}",
            "style": {"display": "flex", "flexDirection": "row"}})


def cluster_chips(
        clusters, cluster_id, selected_keyphrases, selected_clusters):
    # selected_keyphrases = clusters_data['selected_keyphrases']
    # selected_clusters = clusters_data['selected_clusters']
    cluster = clusters[cluster_id]
    cluster_description = cluster[0]
    keyphrases = cluster[1]

    def get_chip_color(keyphrase_str, cluster_id):
        kp_id = str(get_kp_id(keyphrase_str))
        kp_id1 = str(selected_keyphrases.get(str(cluster_id), 0)['selected1'])
        kp_id2 = str(selected_keyphrases.get(str(cluster_id), 0)['selected2'])
        selected_cluster = selected_clusters.get(str(cluster_id), "")
        if kp_id in [kp_id1, kp_id2]:
            if selected_cluster == "1":
                return "success"
            elif selected_cluster == "0":
                return "error"
            elif selected_cluster == "-1":
                return "warning"
            else:
                return "default"
        else:
            return "default"

    def chip_list(cluster_id, keyphrases): return [
        chip(
            attrs={
                "key": f"{cluster_id}_chip_{num}",
                "label": f"{value}",
                "variant": "filled",
                "style": {"margin": "5px"},
                "color": get_chip_color(value, cluster_id)
            },
        )
        for num, value in enumerate(keyphrases)]

    return \
        box(
            typography(
                f"{cluster_description}",
                attrs={
                    "key": f"cluster_description_{cluster_id}",
                    "variant": "body1"}
            ),
            *chip_list(cluster_id, keyphrases),
            attrs={
                "key": f"cluster_chips_{cluster_id}",
                "direction": "row",
                "spacing": 1,
                "border": 5,
                "borderRadius": 4,
                "borderColor": "green"
                if selected_clusters.get(str(cluster_id), "") == "1"
                else "red" if selected_clusters.get(str(cluster_id), "") == "0"
                else "yellow"

            }
        )


def cluster_chips_control(
        clusters,
        selected_clusters,
        selected_keyphrases,
        on_cluster_selected_by_change,
        on_keyphrase1_selected_by_change,
        on_keyphrase2_selected_by_change):

    # clusters = clusters_data['clusters']
    # selected_clusters = clusters_data['selected_clusters']

    return \
        [
            box(
                box(
                    cluster_select(
                        cluster_id, selected_clusters,
                        on_cluster_selected_by_change),
                    keyphrase_select(
                        clusters, cluster_id, "S1", 1, selected_keyphrases,
                        on_keyphrase1_selected_by_change),
                    keyphrase_select(
                        clusters, cluster_id, "S2", 2, selected_keyphrases,
                        on_keyphrase2_selected_by_change),
                    attrs={
                        "key": f"cluster_chips_box_{cluster_id}",
                        "style": {"display": "flex", "flexDirection": "row"}}
                ),
                cluster_chips(
                    clusters, cluster_id,
                    selected_keyphrases, selected_clusters),
                attrs={
                    "key": f"cluster_chips_control_box{cluster_id}",
                    "style": {"display": "flex", "flexDirection": "row"}}
            )
            for cluster_id, _ in clusters.items()
        ]


def adjudicator_cluster_chips(clusters_data):
    return [
        AdjudicatorClusterChips(
            cluster_id=cluster_id,
            adjudicator_cluster=clusters_data['adjudicator'][cluster_id][1],
            annotator1_cluster=clusters_data['annotator1'][cluster_id][1],
            annotator2_cluster=clusters_data['annotator2'][cluster_id][1],
            union_list=clusters_data['union'][cluster_id][1]
        )
        for cluster_id in clusters_data['union'].keys()]


@component
def KeyphraseClusters(
        clusters,
        selected_clusters={},
        selected_keyphrases={},
        clusters_annotators_data={},
        clusters_info="",
        cluster_order="numerical",
        hide_source_keyphrases=False,
        on_cluster_selected_by_change=default_local_handler,
        on_keyphrase1_selected_by_change=default_local_handler,
        on_keyphrase2_selected_by_change=default_local_handler,
        on_cluster_order_by_change=default_local_handler):

    # cluster_order, set_cluster_order = use_state(cluster_order)

    # def on_cluster_order_by_change(event):
        # set_cluster_order(event)

    cluster_order_select =  \
        order_select(
            ["numerical", "cluster_cohesion", "pairwise_similarity",
             "centroid_similarity", "clues_from_other_annotators"],
            cluster_order,
            on_cluster_order_by_change)

    if cluster_order == "clues_from_other_annotators":
        current_cluster_chips_control = \
            adjudicator_cluster_chips(clusters_annotators_data)
    else:
        current_cluster_chips_control = \
            cluster_chips_control(
                clusters,
                selected_clusters,
                selected_keyphrases,
                on_cluster_selected_by_change,
                on_keyphrase1_selected_by_change,
                on_keyphrase2_selected_by_change)

    return \
        grid(
            typography(
                "Keyphrase Clusters",
                attrs={
                    "key": "keyphrase-clusters-title",
                    "variant": "h4"}),
            box(
                cluster_order_select,
                typography(
                    clusters_info,
                    attrs={
                        "key": "clusters-info",
                        "variant": "body1"}),
                attrs={
                    "key": "cluster-order",
                    "style": {"display": "flex", "flexDirection": "row"}}),
            *current_cluster_chips_control,
            attrs={
                "key": "keyphrase-clusters",
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
