from enum import Enum, unique
from keyphrase_curation.util.pairwise_similarity import PairwiseSimilarity
from keyphrase_curation import config
from sentence_transformers import SentenceTransformer, util
import os
import pickle
from typing import List
import pandas as pd


class Keyphrase:
    '''
    Models operations on keyphrases
    '''

    def __init__(
            self,
            id: int,
            content: str,
            preprocessed_content: str = None):
        self.id = id
        self.content = content
        self.preprocessed_content = preprocessed_content

    def get_description(self, complement=None, show_id=True):
        if show_id:
            description = f"{self.content}({self.id})"
        else:
            description = f"{self.content}"
        if complement is None:
            return description
        else:
            return f"{description}: {complement}"

    def __str__(self):
        return f"{self.content}({self.id})"


class KeyphraseEmbeddings:
    '''
    A list of keyphrases with their embeddings
    '''

    def __init__(self, topic, embeddings_path=config['embeddings_path'],
                 generate_embeddings=False):
        self.keyphrases: list[Keyphrase] = []
        self.keyphrase_by_id: dict[int, Keyphrase] = {}
        self.topic = topic
        self.embeddings_path = embeddings_path
        self.embeddings = None
        self.similarity_matrix = []

        if generate_embeddings:
            self.generate_embeddings()

        # load embeddings
        embeddings_file = f'{embeddings_path}/{topic}.pkl'
        if os.path.exists(embeddings_file):
            self.embeddings = \
                pickle.load(open(embeddings_file, 'rb'))
        assert self.embeddings is not None, \
            f'Embeddings {embeddings_file} not found, '\
            f'please generate embeddings first.'

        # create similarity matrix
        for i in range(1, len(self.embeddings)+1):
            similarities = []
            for j in range(1, i+1):
                if i == j:
                    # diagonal auto-similarity
                    similarities.append(1)
                else:
                    # symmetric similarity
                    similarities.append(self.similarity_matrix[j-1][i-1])
            for j in range(i+1, len(self.embeddings)+1):
                embedding1 = self.embeddings[i]['embedding']
                embedding2 = self.embeddings[j]['embedding']
                similarity = util.cos_sim(
                    embedding1, embedding2).numpy()[0][0]
                similarities.append(similarity)
            self.similarity_matrix.append(similarities)

        # load keyphrases from embeddings
        for id in self.embeddings:
            content = self.embeddings[id]['original_keyphrase']
            preprocessed_content = \
                self.embeddings[id]['preprocessed_keyphrase']
            keyphrase = Keyphrase(
                id=id,
                content=content,
                preprocessed_content=preprocessed_content)
            self.keyphrases.append(keyphrase)

        for keyphrase in self.keyphrases:
            self.keyphrase_by_id[keyphrase.id] = keyphrase

        self.pairwise_similarity = PairwiseSimilarity(self.similarity_matrix)

    def get_keyphrase_ids(self):
        return [keyphrase.id for keyphrase in self.keyphrases]

    def get_keyphrase_by_id(self, keyphrase_id):
        return self.keyphrase_by_id[keyphrase_id]

    def generate_embeddings(self):
        assert self.embeddings_path is not None, \
            'Embeddings path is not set.'
        collected_keyphrases_path = config['collected_keyphrases_path']
        df_keyphrases = pd.read_csv(
            f'{collected_keyphrases_path}/{self.topic}.tsv', sep='\t')
        keyphrases = df_keyphrases['keyphrase'].to_list()
        embeddings = {}
        id = 1
        model = SentenceTransformer('all-mpnet-base-v2')
        for keyphrase in keyphrases:
            kp = keyphrase.replace('_', ' ')
            embeddings[id] = {
                'original_keyphrase': keyphrase,
                'preprocessed_keyphrase': kp,
                'embedding': model.encode(kp)
            }
            id += 1
        embeddings_filepath = f"{self.embeddings_path}/{self.topic}.pkl"
        pickle.dump(embeddings, open(embeddings_filepath, 'wb'))

    def get_keyphrases(self) -> List[Keyphrase]:
        return self.keyphrases

    def get_similarity(self, keyphrase1: Keyphrase, keyphrase2: Keyphrase):
        kp_id1 = keyphrase1.id
        kp_id2 = keyphrase2.id
        return self.similarity_matrix[int(kp_id1)-1][int(kp_id2)-1]

    def to_list(self, header=False, sort_column=1,
                reverse=False):
        rows = []
        pairs = self.pairwise_similarity.get_pairwise_similarity()
        best_pairs = {}
        for pair in pairs:
            best_pairs[pair[0]] = (pair[1], pair[2])
            best_pairs[pair[1]] = (pair[0], pair[2])

        for keyphrase in self.keyphrases:
            # do not show keyphrases that are not paired
            if (keyphrase.id-1) in self.pairwise_similarity.reset_elements:
                continue
            rows.append([
                keyphrase.id,
                keyphrase.content,
                best_pairs[int(keyphrase.id)-1][0]+1,
                best_pairs[int(keyphrase.id)-1][1]
            ])
            rows.sort(key=lambda x: x[sort_column], reverse=reverse)
        if header:
            rows.insert(0, [
                'id',
                'keyphrase',
                'best_pair',
                'similarity'
            ])
        return rows

    def to_dict(self):
        return {row[0]: row[1:] for row in self.to_list()}


@unique
class KeyphraseSorting(Enum):
    ALPHABETICAL = 'alphabetical'
    CLUSTER_SIMILARITY = 'cluster_similarity'
    PAIRWISE_SIMILARITY = 'pairwise_similarity'
    NUMERICAL = 'numerical'

    def is_member(self, value):
        return value in self._value2member_map_

    @classmethod
    def by_value(cls, value):
        return cls._value2member_map_[value]
