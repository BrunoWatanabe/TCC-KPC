from reactpy import run, component, use_state, html
from reactpy_material import box, icon, typography


# @component
def AdjudicatorChip(
        _key='123',
        title='Test',
        kp='1',
        adjudicator_cluster=['1'],
        annotator1_cluster=['1'],
        annotator2_cluster=['1']):

    adjudicator_cluster, set_adjudicator_cluster = \
        use_state(adjudicator_cluster)

    if kp in adjudicator_cluster \
            and kp in annotator1_cluster \
            and kp in annotator2_cluster:
        _type = "consented"
    elif kp not in adjudicator_cluster \
            and kp in annotator1_cluster \
            and kp in annotator2_cluster:
        _type = "consented_rejected"
    elif kp in annotator1_cluster:
        if kp in adjudicator_cluster:
            _type = "consented1"
        else:
            _type = "rejected1"
    elif kp in annotator2_cluster:
        if kp in adjudicator_cluster:
            _type = "consented2"
        else:
            _type = "rejected2"

    def adjudicator_action(kp, current_type):
        _adjudicator_cluster = adjudicator_cluster.copy()
        if current_type == 'consented':  # next state is 'consented_rejected'
            _adjudicator_cluster.remove(kp)
        elif current_type == 'consented_rejected':  # next state is 'consented'
            _adjudicator_cluster.append(kp)
        elif current_type == 'consented1':  # next state is 'rejected1'
            _adjudicator_cluster.remove(kp)
        elif current_type == 'rejected1':  # next state is 'consented1'
            _adjudicator_cluster.append(kp)
        elif current_type == 'consented2':  # next state is 'rejected2'
            _adjudicator_cluster.remove(kp)
        elif current_type == 'rejected2':  # next state is 'consented2'
            _adjudicator_cluster.append(kp)
        set_adjudicator_cluster(_adjudicator_cluster)

    bg_colors = {
        "consented": '#AFB0AE',
        None: 'transparent',
        "consented_rejected": '#FBFBFB',
        "consented1": "#AFB0AE",
        "rejected1": "#A4A3E2",
        "consented2": "#AFB0AE",
        "rejected2": "#E4C890"
    }
    bgColor = bg_colors[_type]

    border_colors = {
        "consented": 'transparent',
        None: 'transparent',
        "consented_rejected": '#AFB0AE',
        "consented1": "#4E3CB9",
        "rejected1": "transparent",
        "consented2": "#E7A931",
        "rejected2": "transparent"
    }
    borderColor = border_colors[_type]

    iconName = {
        "consented": 'HighlightOff',
        None: 'HighlightOff',
        "consented_rejected": 'Undo',
        "consented1": "Undo",
        "rejected1": "CheckCircleOutline",
        "consented2": "Undo",
        "rejected2": "CheckCircleOutline"
    }
    iconName = iconName[_type]

    return box(
        box(
            box(
                typography(
                    title,
                    attrs={
                        "key": f"typography{_key}",
                        "style": {
                            "paddingRight": 10
                        }
                    }
                ),
                box(
                    icon(
                        {
                            "icon": iconName,
                            "key": f"icon{_key}"
                        }
                    ),
                    attrs={
                        "key": f"box2_{_key}",
                        "style": {
                            "height": 24,
                            "cursor": "pointer"
                        },
                        "onClick": lambda _:
                        adjudicator_action(kp, _type)
                    }
                ),
                attrs={
                    "key": f'box1_{_key}',
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
        ),
        key=f"{_key}_container"
    )


if __name__ == "__main__":
    run(AdjudicatorChip)
