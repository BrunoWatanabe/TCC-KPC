from reactpy import run, component, html
from reactpy_material import box, typography
from keyphrase_curation.components.adjudicator_chip import AdjudicatorChip
from keyphrase_curation.util.fixture import clusters_annotation_data


@component
def AdjudicatorClusterChips(
        cluster_id='1',
        adjudicator_cluster=['a'],
        annotator1_cluster=['a', 'b', 'd'],
        annotator2_cluster=['a', 'b', 'c'],
        union_list=['a', 'b', 'c', 'd']):

    adjudicator_chip_list = [
        AdjudicatorChip(
            _key=f"{cluster_id}_chip_{chip_id}",
            kp=f"{keyphrase}",
            title=f"{keyphrase}",
            adjudicator_cluster=adjudicator_cluster,
            annotator1_cluster=annotator1_cluster,
            annotator2_cluster=annotator2_cluster
        )
        for chip_id, keyphrase in enumerate(union_list)]

    return box(
        box(
            typography(
                f"Cluster {cluster_id}",
                attrs={
                    "variant": "body1",
                    "key": f"{cluster_id}_title",
                }
            ),
            box(
                *adjudicator_chip_list,
                attrs={
                    "key": f"{cluster_id}_chip_list",
                    "component": "div",
                    "style": {"display": "flex",
                              "flexDirection": "row",
                              "flexWrap": "wrap"},
                    "spacing": 2
                }
            ),
            attrs={
                "key": f"{cluster_id}_box1",
                "direction": "row",
                "spacing": 1,
                "border": 5,
                "borderRadius": 4,
                "borderColor": "gray"
            }
        ),
        attrs={
            "style": {"display": "flex", "flexDirection": "row"},
            "key": f"{cluster_id}_box2",
            "component": "div"
        }
    )


@component
def AdjudicatorClusters(
        clusters_annotation_data=clusters_annotation_data):

    return html.div(
        *[AdjudicatorClusterChips(
            cluster_id=cluster_id,
            adjudicator_cluster=clusters_annotation_data[
                'adjudicator'][cluster_id][1],
            annotator1_cluster=clusters_annotation_data[
                'annotator1'][cluster_id][1],
            annotator2_cluster=clusters_annotation_data[
                'annotator2'][cluster_id][1],
            union_list=clusters_annotation_data['union'][cluster_id][1]
        )
            for cluster_id in clusters_annotation_data['union'].keys()]
    )

# if __name__ == '__main__':
#     run(AdjudicatorClusterChips)


if __name__ == '__main__':
    run(AdjudicatorClusters)
