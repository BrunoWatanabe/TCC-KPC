from keyphrase_curation.model.user_attribution import UserAttribution
from keyphrase_curation import config


class UserAttributionController:
    ''''Controls the user attribution
    '''

    def __init__(self):
        attributions_file = config['attributions_filepath']
        self.model = UserAttribution(attributions_file)

    def get_topics(self, user: str = None):
        return self.model.get_topics(user)

    def get_users(self):
        return self.model.get_users()

    def get_annotation_files(self, user, topic):
        return self.model.get_annotation_files(user, topic)

    def get_annotation_filepaths(self, user, topic):
        annotation_filepaths = {}
        annotation_files = self.model.get_annotation_files(user, topic)
        for annotation_file_type in annotation_files:
            if annotation_file_type == 'sources':
                annotation_filepaths[annotation_file_type] = []
                for annotation_file in annotation_files[annotation_file_type]:
                    annotation_filepaths[annotation_file_type].append(
                        config['dataset_path'] + '/' + annotation_file
                    )
            else:
                annotation_filepaths[annotation_file_type] = \
                    config['dataset_path'] + '/' + \
                    annotation_files[annotation_file_type]
        return annotation_filepaths

    def get_annotation_profile(self, user, topic):
        return self.model.get_annotation_profile(user, topic)

    def validate_password(self, user, plain_password):
        return self.model.validate_password(user, plain_password)
