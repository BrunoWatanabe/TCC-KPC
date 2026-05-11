from reactpy import component, html, use_scope, use_state
from reactpy_router import use_params
from keyphrase_curation.util.security import get_user_from_scope
from keyphrase_curation.controller.user_attribution \
    import UserAttributionController


@component
def TopicSelect(on_select):
    topic, set_topic = use_state("")
    annotation_profile, set_annotation_profile = use_state("")
    # scope = use_scope()
    # username_scope = get_user_from_scope(scope)
    username_param = use_params()['username']
    # if username_scope != username_param:
        # raise Exception("Usernames don't match")
    topics = UserAttributionController().get_topics(username_param) # API: GET /topic/{username}/list
    
    def handle_topic_change(event):
        topic = event['target']['value']
        set_topic(topic)
        annotation_profile = \
            UserAttributionController().\
            get_annotation_profile(username_param, topic)
        set_annotation_profile(annotation_profile) # API: GET /topic/annotation_profile/{username}/{topic}
        on_select(event)

    if len(topics) == 0:
        return html._(
            html.label("Attributions not found")
        )

    options = []
    options.append(
        html.option(
            {
                "value": "",
                "disabled": "disabled",
                "selected": "selected"
            },
            "Select a topic"
        )
    )
    for topic in topics:
        options.append(
            html.option(
                {
                    "value": topic
                },
                topic
            )
        )
    label_profile = ""
    if annotation_profile != "":
        label_profile = f" Profile: {annotation_profile}"
    return html._(
        html.label("Topic: "),
        html.select(
            {
                "name": "topic",
                "onChange": handle_topic_change
            },
            options
        ),
        html.label(label_profile)
    )
