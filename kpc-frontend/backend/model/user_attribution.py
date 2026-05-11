import tomli
from keyphrase_curation.util.security import verify_password


class UserAttribution():
    '''
    Attributions of users to annotate keyphrases
    '''

    def __init__(self, attributions_file: str):
        self.attributions_file = attributions_file
        with open(attributions_file, 'rb') as f:
            self.attributions = tomli.load(f)

    def get_topics(self, user: str = None):
        topics_set = set()
        if user is not None:
            assert user in self.get_users(), f'Invalid user: {user}'
            for topic in self.attributions[user]['attributions']:
                topics_set.add(topic)
        else:
            for user in self.attributions:
                if user == 'admin':
                    continue
                # Verificar se o usuário tem 'attributions' antes de acessar
                if 'attributions' not in self.attributions[user]:
                    continue
                for topic in self.attributions[user]['attributions']:
                    topics_set.add(topic)
        return sorted(list(topics_set))

    def get_users(self):
        users_set = set()
        for user in self.attributions:
            users_set.add(user)
        return sorted(list(users_set))

    def get_annotation_files(self, user, topic):
        assert user in self.get_users(), f'Invalid user: {user}'
        assert topic in self.get_topics(), f'Invalid topic: {topic}'
        annotation_files = \
            self.attributions[user]['attributions'][topic]['annotation_files']
        return annotation_files

    def get_annotation_profile(self, user, topic):
        assert user in self.get_users(), f'Invalid user: {user}'
        assert topic in self.get_topics(), f'Invalid topic: {topic}'
        annotation_profile = self.attributions[user]['attributions'][topic]['profile']
        return annotation_profile

    def validate_password(self, user, plain_password):
        if user not in self.get_users():
            return False
        hashed_password = self.attributions[user]['password']
        return verify_password(plain_password, hashed_password)
