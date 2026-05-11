import re

from keyphrase_curation.components import default_local_handler
from reactpy_material import box, form_control, grid, input_label, \
    menu_item, select, typography, icon
from reactpy import component, run, use_state, html
from keyphrase_curation.components.adjudicator_chip \
    import AdjudicatorChip
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

    def verify_kp(cluster, kp):
        clusters_adjudicator = clusters['adjudicator'][cluster][1]
        clusters_annotator1 = clusters['annotator1'][cluster][1]
        clusters_annotator2 = clusters['annotator2'][cluster][1]

        if kp in clusters_adjudicator and kp in clusters_annotator1 and kp in clusters_annotator2:
            return "consented"
        elif kp not in clusters_adjudicator and kp in clusters_annotator1 and kp in clusters_annotator2:
            return "consented_rejected"
        elif kp in clusters_annotator1:
            if kp in clusters_adjudicator:
                return "consented1"
            else:
                return "rejected1"
        elif kp in clusters_annotator2:
            if kp in clusters_adjudicator:
                return "consented2"
            else:
                return "rejected2"

    def adjudicator_action(clusters, cluster_id, current_type, kp):
        _clusters = clusters.copy()
        if current_type == 'consented':  # next state is 'consented_rejected'
            _clusters['adjudicator'][cluster_id][1].remove(kp)
        elif current_type == 'consented_rejected':  # next state is 'consented'
            _clusters['adjudicator'][cluster_id][1].append(kp)
        elif current_type == 'consented1':  # next state is 'rejected1'
            _clusters['adjudicator'][cluster_id][1].remove(kp)
        elif current_type == 'rejected1':  # next state is 'consented1'
            _clusters['adjudicator'][cluster_id][1].append(kp)
        elif current_type == 'consented2':  # next state is 'rejected2'
            _clusters['adjudicator'][cluster_id][1].remove(kp)
        elif current_type == 'rejected2':  # next state is 'consented2'
            _clusters['adjudicator'][cluster_id][1].append(kp)
        set_clusters(_clusters)

    def chip_component(key, cluster_set, cluster, kp):
        _type = None

        if cluster_set == 'union':
            _type = verify_kp(cluster, kp)

        bg_colors = {
            "consented": '#AFB0AE',
            None: 'transparent',
            "consented_rejected": '#FBFBFB',
            "consented1": "#AFB0AE",
            "rejected1": "#A4A3E2",
            "consented2": "#AFB0AE",
            "rejected2": "#E4C890"
        }

        border_colors = {
            "consented": 'transparent',
            None: 'transparent',
            "consented_rejected": '#AFB0AE',
            "consented1": "#4E3CB9",
            "rejected1": "transparent",
            "consented2": "#E7A931",
            "rejected2": "transparent"
        }

        iconName = {
            "consented": 'HighlightOff',
            None: 'HighlightOff',
            "consented_rejected": 'Undo',
            "consented1": "Undo",
            "rejected1": "CheckCircleOutline",
            "consented2": "Undo",
            "rejected2": "CheckCircleOutline"
        }

        return NewChip(
            _key=key,
            title=kp,
            bgColor=bg_colors[_type],
            borderColor=border_colors[_type],
            iconName=iconName[_type],
            action=lambda _: adjudicator_action(
                clusters, cluster, _type, kp)
        )

    def chip_list(id, values):
        return [
            chip_component(key=f"{id}_chip_{num}",
                           cluster_set='union', cluster=id, kp=f"{value}")
            for num, value in enumerate(values[1])]

    def adjudicator_chip_list(id, values):
        adjudicator_cluster = clusters['adjudicator'][id][1]
        annotator1_cluster = clusters['annotator1'][id][1]
        annotator2_cluster = clusters['annotator2'][id][1]
        return [
            AdjudicatorChip(
                _key=f"{id}_chip_{num}",
                kp=f"{value}",
                title=f"{value}",
                adjudicator_cluster=adjudicator_cluster,
                annotator1_cluster=annotator1_cluster,
                annotator2_cluster=annotator2_cluster
            )
            for num, value in enumerate(values[1])]

    cluster_chips = [
        box(
            box(
                typography(
                    f"{values[0]}",
                    attrs={"variant": "body1"}
                ),
                html.div(
                    *chip_list(id, values),
                ),
                attrs={
                    "direction": "row",
                    "spacing": 1,
                    "border": 5,
                    "borderRadius": 4,
                    "borderColor": "gray"
                    if task == "keyphrase_clustering"
                    else "green" if selected_clusters.get(str(id), "") == "1"
                    else "red" if selected_clusters.get(str(id), "") == "0"
                    else "yellow"

                }
            ),
            attrs={"style": {"display": "flex", "flexDirection": "row"}}
        )
        for id, values in clusters[cluster_set].items()
    ] if cluster_order == "clues_from_other_annotators" else [
        box(
            box(
                cluster_select(id, clusters[cluster_set]),
                first_keyphrase_select(id, values),
                second_keyphrase_select(id, values),
                attrs={"style": {"display": "flex", "flexDirection": "row"}}
            ),
            box(
                typography(
                    f"{values[0]}",
                    attrs={"variant": "body1"}
                ),
                *chip_list(id, values),
                #html.div(
                #    html.p(f"{values[1]}")
                #),
                attrs={
                    "direction": "row",
                    "spacing": 1,
                    "border": 5,
                    "borderRadius": 4,
                    "borderColor": "green"
                    if selected_clusters.get(str(id), "") == "1"
                    else "red" if selected_clusters.get(str(id), "") == "0"
                    else "yellow"

                }
            ),
            attrs={"style": {"display": "flex", "flexDirection": "row"}}
        )
        for id, values in clusters['profile'].items()
    ]
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


def NewChip(
    _key='123',
    title='Test',
    bgColor='red',
    borderColor='green',
    iconName="Share",
    action=lambda _: print('test')
):
    return box(
        box(
            typography(
                title,
                attrs={
                    "style": {
                        "paddingRight": 10
                    }
                }
            ),
            box(
                icon({"icon": iconName}),
                attrs={
                    "style": {
                        "height": 24,
                        "cursor": "pointer"
                    },
                    "onClick": action
                }
            ),
            attrs={
                "style": {
                    "display": "flex",
                    "flexDirection": "row",
                    "height": 32,
                    "borderRadius": 500,
                    "borderWidth": 4,
                    "borderColor": borderColor,
                    "borderStyle": "solid",
                    "alignItems": "center",
                    "paddingLeft": 15,
                    "paddingRight": 15
                },
                "sx": {
                    "backgroundColor": bgColor,
                    "width": "max-content"
                }
            }
        ),
        key=_key,
        attrs={
            "marginY": 2
        }
    )


if __name__ == "__main__":
    run(KeyphraseClusters)
