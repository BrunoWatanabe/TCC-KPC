from keyphrase_curation import config
from keyphrase_curation.components import default_local_handler
from reactpy_material import box, button, chip, form_control, grid, \
    input_label, menu_item, select, switch, text_field, typography
from reactpy import component, html, use_state


@component
def CuratedKeyphrases(
        curated_keyphrases_order="source_cluster",
        curated_keyphrases={},
        keyphrase_alias={},
        selected_clusters={},
        on_curated_keyphrases_order=default_local_handler,
        on_keyphrase_alias_save_click=default_local_handler):

    updated_keyphrase_alias, set_updated_keyphrase_alias = \
        use_state(keyphrase_alias)

    show_only_curated, set_show_only_curated = use_state(False)

    def handle_show_only_curated(e):
        set_show_only_curated(e)

    def on_keyphrase_alias_updated(value):
        updated_keyphrase_alias_copy = updated_keyphrase_alias.copy()
        updated_keyphrase_alias_copy[value[0]] = value[1]
        set_updated_keyphrase_alias(updated_keyphrase_alias_copy)

    def count_curated_keyphrases():
        return len(
            [cluster_id
             for cluster_id in selected_clusters
             if selected_clusters[cluster_id] == "1"])

    curated_keyphrases_order_select =  \
        form_control(
            input_label("Order by"),
            select(
                menu_item("source_cluster", attrs={"value": "source_cluster"}),
                menu_item("alphabetical", attrs={"value": "alphabetical"}),
                attrs={
                    "value": curated_keyphrases_order,
                    "on_change":
                        lambda _, e: on_curated_keyphrases_order(
                            e["props"]["value"])
                }
            ),
            attrs={"style": {"flex": 1, "display": "flex"}})

    def curated_keyphrase(keyphrases, cluster_id):
        def chip_label():
            if keyphrase_alias.get(str(cluster_id), "") != "":
                return keyphrase_alias.get(str(cluster_id), "")
            chip_label = \
                f"{keyphrases[0][1].lower().replace(' ', '_')}" \
                if len(keyphrases) >= 1 and str(keyphrases[0][0]) != '0' \
                else ""
            chip_label += \
                f"_and_{keyphrases[1][1].lower().replace(' ', '_')}" \
                if len(keyphrases) == 2 and str(keyphrases[1][0]) != '0' \
                else ""
            return chip_label

        def chip_color(cluster_id):
            if cluster_id in selected_clusters:
                if selected_clusters[cluster_id] == "1":
                    return "success"
                elif selected_clusters[cluster_id] == "0":
                    return "error"
                elif selected_clusters[cluster_id] == "-1":
                    return "warning"
                else:
                    return "default"

        def keyphrase_chip(cluster_id):
            return chip(
                key=f"{cluster_id}_curated_{chip_label()}_chip",
                attrs={
                    "label": f"{chip_label()}",
                    "variant": "filled",
                    "color": chip_color(cluster_id)
                }
            )

        def save_alias_button(cluster_id): return \
            button(
                "Save Alias",
                attrs={
                    "variant": "contained",
                    "disabled": True if updated_keyphrase_alias.get(
                        str(cluster_id), "") == keyphrase_alias.get(
                            str(cluster_id), ""
                    ) else False,
                    "on_click": lambda e:
                        on_keyphrase_alias_save_click(
                            (cluster_id, updated_keyphrase_alias.get(
                                str(cluster_id), "")))
                }
        )

        cluster_label = html.label(f" (cluster {cluster_id}): ") \
            if len(keyphrases) >= 1 and str(keyphrases[0][0]) != '0' \
            else ""

        alias_text_field = text_field(
            attrs={
                "label": "Alias (optional)",
                "key": f"{cluster_id}_alias",
                "defaultValue": updated_keyphrase_alias.get(
                    str(cluster_id),
                    keyphrase_alias.get(str(cluster_id), "")),
                "on_blur": lambda e:
                    on_keyphrase_alias_updated(
                        (cluster_id, e["target"]["value"])),
            })

        return \
            box(
                keyphrase_chip(cluster_id),
                cluster_label,
                alias_text_field,
                save_alias_button(cluster_id)
            )

    def curated_keyphrases_list(curated_keyphrases_order):
        filtered_keyphrases = \
            {cluster_id: keyphrases
             for cluster_id, keyphrases in curated_keyphrases.items()
             if show_only_curated is False or selected_clusters.get(
                 cluster_id, "") == "1"}
        if curated_keyphrases_order == "source_cluster":
            return [
                curated_keyphrase(keyphrases, cluster_id)
                for cluster_id, keyphrases
                in dict(sorted(
                    filtered_keyphrases.items(),
                    key=lambda x: int(x[0]))).items()
            ]
        elif curated_keyphrases_order == "alphabetical":
            return [
                curated_keyphrase(keyphrases, cluster_id)
                for cluster_id, keyphrases
                in dict(sorted(
                    filtered_keyphrases.items(),
                    key=lambda x: x[1][0][1])).items()
            ]
        else:
            raise ValueError("Invalid order")

    curated_keyphrases_counter = f"{count_curated_keyphrases()}/"\
        f"{config['curated_keyphrases_length']}"

    switch_show_only_curated = \
        box(
            typography(
                f"Show Only {curated_keyphrases_counter} Curated Keyphrases",
                attrs={"variant": "body1"}),
            switch(
                attrs={
                    "checked": show_only_curated,
                    "on_change":
                    lambda _, e: handle_show_only_curated(e)
                }
            ),
            attrs={
                "style": {
                    "display": "flex",
                    "flex": 1,
                    "flexDirection": "row",
                    "paddingLeft": 10}}
        )

    return \
        grid(
            typography(
                "Curated Keyphrases",
                attrs={"variant": "h4"}),
            box(
                curated_keyphrases_order_select,
                switch_show_only_curated),
            box(
                *curated_keyphrases_list(curated_keyphrases_order),
                attrs={"style": {"display": "flex", "flexDirection": "column"}}
            ),
            attrs={
                "item": True,
                "style": {
                    "overflow": "scroll",
                    "height": "85%",
                    "width": "50%",
                    "position": "absolute",
                    "right": 0},
                "sx": {
                    "padding": 2,
                    "paddingLeft": 2,
                    "paddingBottom": 12,
                    "paddingTop": 2
                }
            }
        )
