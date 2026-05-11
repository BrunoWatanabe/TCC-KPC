import re
from reactpy import component, html, use_state, use_effect
from reactpy.backend.fastapi import configure
from reactpy_router import route, browser_router, use_params

from keyphrase_curation.components.curation import KeyphraseCuration
from keyphrase_curation.components.login_internal \
    import Login, LoginError, check_auth
from keyphrase_curation.components.topic import TopicSelect
from keyphrase_curation.controller.annotation import \
    AnnotationController
from keyphrase_curation.model.cluster import ClusterSorting
from keyphrase_curation.model.keyphrase import KeyphraseSorting
from keyphrase_curation.model.annotation import \
    AnnotationTask

from reactpy.backend.fastapi import Options


@component
def App():
    return html._(
        Login()
    )


@component
def AnnotationUI():
    topic, set_topic = use_state("")
    keyphrase_clustering, set_keyphrase_clustering = use_state({})
    clusters, set_clusters = use_state({})
    hide_clustered, set_hide_clustered = use_state(False)
    keyphrase_order, set_keyphrase_order = use_state("alphabetical")
    cluster_order, set_cluster_order = use_state("numerical")
    clusters_info, set_clusters_info = use_state("")
    selected_clusters, set_selected_clusters = use_state({})
    selected_keyphrases, set_selected_keyphrases = use_state({})
    hide_source_keyphrases, set_hide_source_keyphrases = use_state(False)
    curated_keyphrases, set_curated_keyphrases = use_state({})
    curated_keyphrases_order, set_curated_keyphrases_order = \
        use_state("source_cluster")
    keyphrase_alias, set_keyphrase_alias = use_state({})
    username_param = use_params()['username']

    def gen_clusters_info(sorting, clusters_meta_info):
        clusters_info = ""
        if sorting.name == ClusterSorting.CLUSTER_COHESION.name: #get_cluster_sorting_options
            clusters_info = \
                f"Average cohesion: "\
                f"{clusters_meta_info['average_cohesion']:.2f}"
        elif sorting.name == ClusterSorting.NUMERICAL.name: #get_cluster_sorting_options
            clusters_info = "Numerical order"
        elif sorting.name == ClusterSorting.PAIRWISE_SIMILARITY.name: #get_cluster_sorting_options
            total_pairwise_similarity = 0
            for cluster_id in clusters_meta_info:
                total_pairwise_similarity += \
                    clusters_meta_info[cluster_id]['similarity']
            clusters_info = \
                f"Average pairwise similarity: "\
                f"{total_pairwise_similarity/len(clusters_meta_info):.2f}"
        elif sorting.name == ClusterSorting.CENTROID_SIMILARITY.name: #get_cluster_sorting_options
            clusters_info = \
                f"Average centroid similarity: "\
                f"{clusters_meta_info['average_centroid_similarity']:.2f}"
        return clusters_info

    def handle_clustering_change(value):
        index, value = value.split(',')
        keyphrase_clustering_copy = keyphrase_clustering.copy()
        keyphrase_clustering_copy[int(index)]["clustering"] = value
        ac = AnnotationController(topic, username_param)
        ac.move_to_cluster(int(index), int(value)) # API: PUT /topic/move_to_cluster/{username}/{topic}/{keyphrase_id}/{cluster_id}
        if ac.save(task=AnnotationTask.KEYPHRASE_CLUSTERING): # API: PUT /topic/save_annotation/{username}/{topic}/{task}
            set_keyphrase_clustering(keyphrase_clustering_copy)
            (clusters, _) = ac.get_clusters() # API: GET /topic/clusters/{username}/{topic}
            set_clusters(clusters)
        else:
            raise Exception("Error saving dataframe")

    def handle_topic_change(event):
        set_topic(event['target']['value'])
        topic = event['target']['value']
        ac = AnnotationController(topic, username_param)
        keyphrase_clustering = ac.get_keyphrase_clustering() # API: GET /topic/keyphrase_clustering/{username}/{topic}
        set_keyphrase_clustering(keyphrase_clustering)
        clusters, clusters_meta_info = ac.get_clusters() # API: GET /topic/clusters/{username}/{topic}
        sorting = ClusterSorting.by_value(cluster_order) # API: GET /clusters/get_cluster_sorting_by_value/{username}/{cluster_order}
        clusters_info = gen_clusters_info(sorting, clusters_meta_info)
        set_clusters(clusters)
        set_clusters_info(clusters_info)
        set_selected_clusters(ac.get_cluster_selection()) # API: GET /topic/cluster_selection/{username}/{topic}
        set_selected_keyphrases(ac.get_keyphrases_selection()) # API: GET /topic/keyphrases_selection/{username}/{topic}
        set_keyphrase_alias(ac.get_keyphrases_aliases()) # API: GET /topic/keyphrases_aliases/{username}/{topic}

    def update_curated_keyphrases():
        updated_curated_keyphrases = {}
        for cluster_id, keyphrases in selected_keyphrases.items():
            if keyphrases['selected1'] == '0':
                continue
            if keyphrases['keyphrase1'] != "":
                updated_curated_keyphrases[cluster_id] = [
                    (keyphrases['selected1'], keyphrases['keyphrase1']),
                    (keyphrases['selected2'], keyphrases['keyphrase2'])]
        set_curated_keyphrases(updated_curated_keyphrases)

    use_effect(update_curated_keyphrases, [selected_keyphrases])

    def handle_order_by_change(keyphrase_order):
        sorting = KeyphraseSorting.by_value(keyphrase_order) # API: GET /keyphrases/get_keyphrase_sorting_by_value/{username}/{keyphrase_order}
        ac = AnnotationController(topic, username_param)
        keyphrase_clustering = ac.get_keyphrase_clustering(sorting) # API: GET /topic/keyphrase_clustering/{username}/{topic}
        set_keyphrase_clustering(keyphrase_clustering)
        set_keyphrase_order(keyphrase_order)

    def handle_cluster_order_by_change(cluster_order):
        sorting = ClusterSorting.by_value(cluster_order) # API: GET /clusters/get_cluster_sorting_by_value/{username}/{cluster_order}
        ac = AnnotationController(topic, username_param)
        (clusters, clusters_meta_info) = ac.get_clusters(sorting) # API: GET /topic/clusters/{username}/{topic}
        clusters_info = gen_clusters_info(sorting, clusters_meta_info)
        set_clusters_info(clusters_info)
        set_cluster_order(cluster_order)
        set_clusters(clusters)

    def handle_hide_clustered_change(hide_clustered):
        set_hide_clustered(hide_clustered)

    def handle_cluster_selected(values):
        selected_cluster, value = values.split(',')
        selected_clusters_copy = selected_clusters.copy()
        selected_clusters_copy[selected_cluster] = value
        ac = AnnotationController(topic, username_param)
        ac.select_cluster(int(selected_cluster), int(value)) # API: PUT /topic/select_cluster/{username}/{topic}/{cluster_id}/{selected}
        if ac.save(task=AnnotationTask.CLUSTER_SELECTION): # API: PUT /topic/save_annotation/{username}/{topic}/{task}
            set_selected_clusters(selected_clusters_copy)
        else:
            raise Exception("Error saving dataframe")

    def get_keyphrase_text(cluster_id, keyphrase_id):
        keyphrases = clusters.get(int(cluster_id))[1]
        pattern = re.compile(rf'\({keyphrase_id}\)$')
        for keyphrase in keyphrases:
            if pattern.search(keyphrase):
                return keyphrase[0:len(keyphrase)-len(keyphrase_id)-2]
        return ""

    def handle_selected_keyphrase1(values):
        cluster_id, selected_keyphrase = values.split(',')
        selected_keyphrases_copy = selected_keyphrases.copy()
        if cluster_id in selected_keyphrases_copy:
            selected_keyphrases_copy[cluster_id]['selected1'] = \
                int(selected_keyphrase)
            selected_keyphrases_copy[cluster_id]['keyphrase1'] = \
                get_keyphrase_text(cluster_id, selected_keyphrase)
        else:
            selected_keyphrases_copy[cluster_id] = {
                'selected1': int(selected_keyphrase),
                'keyphrase1': get_keyphrase_text(
                    cluster_id, selected_keyphrase),
                'selected2': 0,
                'keyphrase2': ""
            }
        ac = AnnotationController(topic, username_param)
        ac.select_keyphrase(int(cluster_id), 1, int(selected_keyphrase)) # API: PUT /topic/select_keyphrase/{username}/{topic}/{cluster_id}/{order}/{keyphrase_id}
        if ac.save(task=AnnotationTask.KEYPHRASE_SELECTION): # API: PUT /topic/save_annotation/{username}/{topic}/{task}
            set_selected_keyphrases(selected_keyphrases_copy)
        else:
            raise Exception("Error saving selected keyphrase")

    def handle_selected_keyphrase2(values):
        cluster_id, selected_keyphrase = values.split(',')
        selected_keyphrases_copy = selected_keyphrases.copy()
        if cluster_id in selected_keyphrases_copy and not \
                selected_keyphrases_copy[cluster_id]['selected1'] == 0:
            selected_keyphrases_copy[cluster_id]['selected2'] = \
                int(selected_keyphrase)
            selected_keyphrases_copy[cluster_id]['keyphrase2'] = \
                get_keyphrase_text(
                    cluster_id, selected_keyphrase)
            ac = AnnotationController(topic, username_param)
            ac.select_keyphrase(
                int(cluster_id), 2, int(selected_keyphrase)) # API: PUT /topic/select_keyphrase/{username}/{topic}/{cluster_id}/{order}/{keyphrase_id}
            if ac.save(task=AnnotationTask.KEYPHRASE_SELECTION): # API: PUT /topic/save_annotation/{username}/{topic}/{task}
                set_selected_keyphrases(selected_keyphrases_copy)
            else:
                raise Exception("Error saving selected keyphrase")
        else:
            raise Exception("Error: second keyphrase selected without first")

    def handle_hide_source_keyphrases(value):
        set_hide_source_keyphrases(value)

    def handle_curated_keyphrases_order(value):
        set_curated_keyphrases_order(value)

    def handle_keyphrase_alias_save_click(value):
        cluster_id, alias = value
        keyphrase_alias_copy = keyphrase_alias.copy()
        keyphrase_alias_copy[cluster_id] = alias
        ac = AnnotationController(topic, username_param)
        ac.set_alias(int(cluster_id), alias) # API: PUT /topic/set_alias/{username}/{topic}/{cluster_id}/{alias}
        if ac.save(task=AnnotationTask.KEYPHRASE_ALIAS): # API: PUT /topic/save_annotation/{username}/{topic}/{task}
            set_keyphrase_alias(keyphrase_alias_copy)
        else:
            raise Exception("Error saving keyphrase alias")

    if topic == "":
        return html._(
            TopicSelect(handle_topic_change)
        )
    else:
        return html._(
            KeyphraseCuration(
                clusters=clusters,
                keyphrase_clustering=keyphrase_clustering,
                keyphrase_order=keyphrase_order,
                cluster_order=cluster_order,
                clusters_info=clusters_info,
                hide_clustered=hide_clustered,
                selected_clusters=selected_clusters,
                selected_keyphrases=selected_keyphrases,
                curated_keyphrases=curated_keyphrases,
                curated_keyphrases_order=curated_keyphrases_order,
                hide_source_keyphrases=hide_source_keyphrases,
                keyphrase_alias=keyphrase_alias,
                on_keyphrase_clustering_change=handle_clustering_change,
                on_hide_clustered_change=handle_hide_clustered_change,
                on_curated_keyphrases_order=handle_curated_keyphrases_order,
                on_keyphrases_order_by_change=handle_order_by_change,
                on_cluster_order_by_change=handle_cluster_order_by_change,
                on_cluster_selected_by_change=handle_cluster_selected,
                on_keyphrase1_selected_by_change=handle_selected_keyphrase1,
                on_keyphrase2_selected_by_change=handle_selected_keyphrase2,
                on_hide_source_keyphrases=handle_hide_source_keyphrases,
                on_keyphrase_alias_save_click=handle_keyphrase_alias_save_click
            )
        )


@component
def Root():
    return browser_router(
        route("/", App()),
        route("/keyphrase_curation/{username}", check_auth(AnnotationUI)),
        route("/login_error", LoginError()),
        route("*", html.h1("Missing Link 🔗‍💥"))
    )


def bind_root(app, **kwargs):
    configure(app, Root, options=Options(
        head=(
            {'tagName': 'body',
             'attributes': {"style": {"margin": 0}}})), **kwargs)
