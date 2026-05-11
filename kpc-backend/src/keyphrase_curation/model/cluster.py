from enum import Enum, unique

from keyphrase_curation.model.keyphrase \
    import Keyphrase, KeyphraseEmbeddings, KeyphraseSorting
from keyphrase_curation.util.pairwise_similarity import PairwiseSimilarity

import networkx as nx
from itertools import combinations
from statistics import mean
from typing import Dict


@unique
class ClusterSorting(Enum):
    NUMERICAL = 'numerical'
    CLUSTER_COHESION = 'cluster_cohesion'
    PAIRWISE_SIMILARITY = 'pairwise_similarity'
    CENTROID_SIMILARITY = 'centroid_similarity'
    CLUES_FROM_OTHER_ANNOTATORS = 'clues_from_other_annotators'
    #NUMERICAL_CLUSTER_SELECTION_ALIAS = 'numerical_cluster_selection_alias'
    #ALPHABETICAL_CLUSTER_ALIAS = 'alphabetical_cluster_alias'

    def is_member(self, value):
        return value in self._value2member_map_

    @classmethod
    def by_value(cls, value):
        return cls._value2member_map_[value]


class KeyphraseClustering(KeyphraseEmbeddings):
    '''
    Association of a keyphrase to a cluster
    '''

    def __init__(self,
                 topic,
                 embeddings_path,
                 cluster_set_size: int):
        super().__init__(topic, embeddings_path)
        self.cluster_set_size = cluster_set_size
        # 0 means not clustered
        self.clustering = [0] * len(self.keyphrases)
        self.clusters: Dict[int, self.Cluster] = {}
        for i in range(1, self.cluster_set_size+1):
            self.clusters[i] = self.Cluster(i, self)

    # inner class
    class Cluster:
        '''
        A cluster of keyphrases, resulted from a clustering
        '''

        def __init__(
            self,
            id: int,
            keyphrase_clustering: 'KeyphraseClustering',
            alias: str = None  # it's used when cluster order is changed
        ):
            self.id = id
            self.alias = str(id) if alias is None else alias
            self.keyphrase_clustering: KeyphraseClustering = \
                keyphrase_clustering

        def get_alias(self):
            return self.alias

        def get_keyphrase_ids(self):
            clustering = self.keyphrase_clustering.clustering
            keyphrase_ids = [
                i+1 for i in range(len(clustering))
                if clustering[i] == self.id
            ]
            return keyphrase_ids

        def is_empty(self):
            '''
            Check if a cluster is empty
            '''
            return len(self.get_keyphrase_ids()) == 0

        def get_descriptions(
                self,
                sort_by=KeyphraseSorting.ALPHABETICAL,
                show_ids=True):
            descriptions = []
            keyphrase_ids = self.get_keyphrase_ids()
            if sort_by.name == KeyphraseSorting.ALPHABETICAL.name or \
                    sort_by.name == KeyphraseSorting.NUMERICAL.name:
                for keyphrase_id in keyphrase_ids:
                    keyphrase = self.keyphrase_clustering.\
                        get_keyphrase_by_id(keyphrase_id)
                    descriptions.append(
                        keyphrase.get_description(show_id=show_ids))
                if sort_by.name == KeyphraseSorting.ALPHABETICAL.name:
                    descriptions.sort(key=str.lower)
            elif sort_by.name == ClusterSorting.CENTROID_SIMILARITY.name:
                centrality_scores = self.get_centrality_scores()
                descriptions_tuples = []    # (description, similarity)
                for keyphrase_id in keyphrase_ids:
                    keyphrase = self.keyphrase_clustering.\
                        get_keyphrase_by_id(keyphrase_id)
                    scores = centrality_scores[keyphrase_id]
                    centrality_score = \
                        f"{scores[0]:.2f}"
                    centroid_similarity = \
                        f"{scores[1]:.2f}"
                    description_str = \
                        keyphrase.get_description(
                            f"({centrality_score},{centroid_similarity})")
                    descriptions_tuples.append(
                        (description_str, centroid_similarity))
                descriptions = [x[0] for x in sorted(
                    descriptions_tuples, key=lambda x: x[1], reverse=False)]
            return descriptions

        def get_cohesion(self):
            '''
            Get cluster cohesion
            '''
            cohesion = 0
            keyphrase_ids = self.get_keyphrase_ids()
            comb_list = list(combinations(keyphrase_ids, 2))
            comb_list_size = len(comb_list)
            for comb in comb_list:
                keyphrase1 = self.keyphrase_clustering.\
                    get_keyphrase_by_id(comb[0])
                keyphrase2 = self.keyphrase_clustering.\
                    get_keyphrase_by_id(comb[1])
                cohesion += self.keyphrase_clustering.\
                    get_similarity(keyphrase1, keyphrase2)
            if comb_list_size > 1:
                cohesion = cohesion / comb_list_size
            elif len(keyphrase_ids) == 1:
                cohesion = 1
            return cohesion

        def get_similarity(self, cluster):
            ''''
            Get similarity between two clusters
            '''
            similarities = []
            keyphrase_ids_in_cluster = \
                cluster.get_keyphrase_ids()
            for keyphrase_id_in_cluster in keyphrase_ids_in_cluster:
                keyphrase_in_cluster = self.keyphrase_clustering.\
                    get_keyphrase_by_id(keyphrase_id_in_cluster)
                keyphrase_ids_in_self_cluster = \
                    self.get_keyphrase_ids()
                for keyphrase_id_in_self_cluster in \
                        keyphrase_ids_in_self_cluster:
                    keyphrase_in_self_cluster = \
                        self.keyphrase_clustering.\
                        get_keyphrase_by_id(keyphrase_id_in_self_cluster)
                    similarity = self.keyphrase_clustering.\
                        get_similarity(
                            keyphrase_in_cluster,
                            keyphrase_in_self_cluster)
                    similarities.append(similarity)
            if len(similarities) > 0:
                return mean(similarities)
            else:
                return 0

        def get_similarity_matrix(self):
            '''Get keyphrases similarity matrix
            '''
            similarity_matrix = []
            keyphrase_ids = sorted(self.get_keyphrase_ids())
            for keyphrase_id in keyphrase_ids:
                similarities = []
                for keyphrase_id2 in keyphrase_ids:
                    if keyphrase_id == keyphrase_id2:
                        similarities.append(1)
                        continue
                    keyphrase1 = self.keyphrase_clustering.\
                        get_keyphrase_by_id(keyphrase_id)
                    keyphrase2 = self.keyphrase_clustering.\
                        get_keyphrase_by_id(keyphrase_id2)
                    similarities.append(
                        self.keyphrase_clustering.get_similarity(
                            keyphrase1, keyphrase2))
                similarity_matrix.append(similarities)
            return similarity_matrix, keyphrase_ids

        def get_centrality_scores(self):
            '''Get centrality scores, using pagerank algorithm
            '''
            similarity_matrix, keyphrase_ids = self.get_similarity_matrix()
            num_keyphrases = len(keyphrase_ids)
            if num_keyphrases == 0:
                return {}
            elif num_keyphrases == 1:
                return {keyphrase_ids[0]: (1, 1)}
            elif num_keyphrases == 2:
                return {
                    keyphrase_ids[0]: (0.5, similarity_matrix[0][1]),
                    keyphrase_ids[1]: (0.5, similarity_matrix[1][0])
                }
            G = nx.Graph()
            for i in range(num_keyphrases):
                for j in range(num_keyphrases):
                    weight = similarity_matrix[i][j]
                    if weight > 0:
                        G.add_edge(i, j, weight=weight)
            centrality_scores = nx.pagerank(G)
            most_central = max(centrality_scores, key=centrality_scores.get)
            keyphrase_id_most_central = keyphrase_ids[most_central]
            keyphrase_most_central = self.keyphrase_clustering.\
                get_keyphrase_by_id(keyphrase_id_most_central)
            result = {}
            for i, keyphrase_id in enumerate(keyphrase_ids):
                keyphrase = self.keyphrase_clustering.\
                    get_keyphrase_by_id(keyphrase_id)
                similarity_from_most_central = \
                    self.keyphrase_clustering.get_similarity(
                        keyphrase_most_central, keyphrase)
                result[keyphrase_id] = (
                    centrality_scores[i], similarity_from_most_central)
            return result

    def get_cluster_ids(self):
        '''
        Get cluster ids
        '''
        return list(self.clusters.keys())

    def get_keyphrase_sets(self, only_ids=False):
        '''Get uncase keyphrase sets
        '''
        result = {}
        for cluster in self.clusters.values():
            if only_ids:
                keyphrases = cluster.get_keyphrase_ids()
            else:
                keyphrases = cluster.get_descriptions(show_ids=False)
            keyphrase_set = set()
            for keyphrase in keyphrases:
                if only_ids:
                    keyphrase_set.add(keyphrase)
                else:
                    keyphrase_set.add(keyphrase.replace('_', ' ').lower())
            result[cluster.id] = keyphrase_set
        return result

    def get_cluster_by_id(self, cluster_id: int) -> Cluster:
        '''
        Get cluster by id
        '''
        return self.clusters[cluster_id]

    def move_to_cluster(
            self, keyphrase: Keyphrase,
            cluster: Cluster) -> Cluster:
        '''Move a keyphrase to a cluster, return the old cluster
        '''
        assert cluster.id in self.clusters, \
            'Invalid cluster.'
        assert keyphrase in self.keyphrases, \
            'Invalid keyphrase.'
        old_cluster_id = self.clustering[keyphrase.id-1]
        assert old_cluster_id != cluster.id, \
            'Keyphrase is already in the cluster.'
        if old_cluster_id != 0:
            self.clustering[keyphrase.id-1] = 0
        self.clustering[keyphrase.id-1] = cluster.id
        self.pairwise_similarity.reset_element_similarity(keyphrase.id-1)
        return old_cluster_id

    def remove_from_cluster(
        self, keyphrase: Keyphrase,
            cluster: Cluster) -> Cluster:
        '''Remove a keyphrase from a cluster, return the old cluster
        '''
        assert not cluster.is_empty(), \
            'Cluster is empty.'
        assert keyphrase.id in cluster.get_keyphrase_ids(), \
            'Keyphrase is not in the cluster.'
        self.clustering[keyphrase.id-1] = None
        self.pairwise_similarity.restore_element_similarity(keyphrase.id-1)
        return cluster

    def get_keyphrase_similarity_with_clusters(self, keyphrase: Keyphrase):
        '''get keyphrase similarity with clusters
        '''
        cluster_similarity = {}
        clusters, _ = self.get_clusters()
        for cluster in clusters:
            similarities = []
            keyphrase_ids_in_cluster = \
                cluster.get_keyphrase_ids()
            for keyphrase_id_in_cluster in keyphrase_ids_in_cluster:
                # skip same keyphrase
                if keyphrase.id == keyphrase_id_in_cluster:
                    continue
                keyphrase_in_cluster = self.get_keyphrase_by_id(
                    keyphrase_id_in_cluster)
                similarity = self.get_similarity(
                    keyphrase, keyphrase_in_cluster)
                similarities.append(similarity)
            if len(similarities) > 0:
                cluster_similarity[cluster.id] = mean(similarities)
            else:
                cluster_similarity[cluster.id] = 0
        return sorted(
            cluster_similarity.items(), key=lambda x: x[1], reverse=True)

    def get_cluster_similarity_matrix(self):
        '''Get cluster similarity matrix
        '''
        cluster_similarity_matrix = []
        clusters, _ = self.get_clusters()
        for cluster in clusters:
            similarities = []
            for cluster2 in clusters:
                if cluster.id == cluster2.id:
                    similarities.append(1)
                    continue
                if cluster.id > cluster2.id:
                    similarities.append(
                        cluster_similarity_matrix[cluster2.id-1][cluster.id-1])
                    continue
                similarity = cluster.get_similarity(cluster2)
                similarities.append(similarity)
            cluster_similarity_matrix.append(similarities)
        return cluster_similarity_matrix

    def get_pairwise_cluster_similarity(self):
        '''Get pairwise cluster similarity ordered list
        '''
        result = {}
        pairwise_similarity = PairwiseSimilarity(
            self.get_cluster_similarity_matrix())
        pairs = pairwise_similarity.get_pairwise_similarity()
        for pair in pairs:
            if pair[0] != -1:
                result[pair[0]+1] = {
                    'similar_cluster': pair[1]+1,
                    'similarity': pair[2]
                }
            if pair[1] != -1:
                result[pair[1]+1] = {
                    'similar_cluster': pair[0]+1,
                    'similarity': pair[2]
                }
        return result

    def get_cluster_centrality_scores(self):
        '''Get cluster centrality scores
        '''
        cluster_centrality_scores = {}
        clusters, _ = self.get_clusters()
        for cluster in clusters:
            centrality_scores = cluster.get_centrality_scores()
            cluster_centrality_scores[cluster.id] = {}
            total_similarity_from_centroid = 0
            cluster_centroid = "N/A"
            for keyphrase_id in centrality_scores:
                total_similarity_from_centroid += \
                    centrality_scores[keyphrase_id][1]
                cluster_centrality_scores[cluster.id][keyphrase_id] = {
                    'centrality_score': centrality_scores[keyphrase_id][0],
                    'similarity_from_most_central':
                    centrality_scores[keyphrase_id][1]
                }
                if centrality_scores[keyphrase_id][1] == 1:
                    keyphrase = self.get_keyphrase_by_id(keyphrase_id)
                    cluster_centroid = f"{keyphrase.content}({keyphrase_id})"
            if len(centrality_scores) > 0:
                cluster_centrality_scores[
                    cluster.id]['average_similarity_from_centroid'] = \
                    total_similarity_from_centroid/len(centrality_scores)
            else:
                cluster_centrality_scores[
                    cluster.id]['average_similarity_from_centroid'] = 0
            cluster_centrality_scores[
                cluster.id]['cluster_centroid'] = cluster_centroid
        return cluster_centrality_scores

    def get_clusters(self, sort_by: ClusterSorting = ClusterSorting.NUMERICAL):
        '''Get clusters
        '''
        clusters = []
        clusters_meta_info = {}
        if sort_by.name == ClusterSorting.NUMERICAL.name:
            clusters = list(self.clusters.values())
        elif sort_by.name == ClusterSorting.CLUSTER_COHESION.name:
            clusters = list(sorted(
                self.clusters.values(),
                key=lambda x: x.get_cohesion(), reverse=False))
        elif sort_by.name == ClusterSorting.PAIRWISE_SIMILARITY.name:
            clusters_meta_info = self.get_pairwise_cluster_similarity()
            clusters = list(sorted(
                self.clusters.values(),
                key=lambda x: clusters_meta_info[x.id]['similarity'],
                reverse=True))
        elif sort_by.name == ClusterSorting.CENTROID_SIMILARITY.name:
            clusters_meta_info = self.get_cluster_centrality_scores()
            clusters = list(sorted(
                self.clusters.values(),
                key=lambda x:
                clusters_meta_info[x.id]['average_similarity_from_centroid'],
                reverse=False))
        return clusters, clusters_meta_info

    def to_list(self, header=False, sort_column=1, reverse=False):
        keyphrase_embeddings_info = {row[0]: row[1:]
                                     for row in super().to_list()}
        rows = []
        for keyphrase in self.keyphrases:
            cluster_similarity = \
                self.get_keyphrase_similarity_with_clusters(keyphrase)
            if len(cluster_similarity) > 0:
                cluster_most_similar = cluster_similarity[0][0]
                cluster_similarity = cluster_similarity[0][1]
            else:
                cluster_most_similar = 0
                cluster_similarity = 0
            rows.append([
                keyphrase.id,
                keyphrase.content,
                keyphrase_embeddings_info[keyphrase.id][1],
                keyphrase_embeddings_info[keyphrase.id][2],
                cluster_most_similar,
                cluster_similarity
            ])
        rows.sort(key=lambda x: x[sort_column], reverse=reverse)
        if header:
            rows.insert(0, [
                'id',
                'keyphrase',
                'best_pair',
                'similarity',
                'cluster_most_similar',
                'cluster_similarity'
            ])
        return rows

    def get_keyphrase_list(
            self,
            sort_by: KeyphraseSorting = KeyphraseSorting.ALPHABETICAL):
        keyphrase_list = []
        assert sort_by.name in KeyphraseSorting.__members__, \
            f'Invalid sort order: {sort_by}'
        if sort_by.name == KeyphraseSorting.ALPHABETICAL.name:
            keyphrase_list = self.to_list(
                sort_column=1, reverse=False)
        elif sort_by.name == KeyphraseSorting.PAIRWISE_SIMILARITY.name:
            keyphrase_list = self.to_list(
                sort_column=3,
                reverse=True)
        elif sort_by.name == KeyphraseSorting.CLUSTER_SIMILARITY.name:
            keyphrase_list = self.to_list(
                sort_column=5,
                reverse=True)
        elif sort_by.name == KeyphraseSorting.NUMERICAL.name:
            keyphrase_list = self.to_list(
                sort_column=0,
                reverse=False)
        else:
            raise ValueError(f'Unknown sort order: {sort_by}')
        return keyphrase_list

    def get_keyphrase_descriptions(
            self,
            sort_by: KeyphraseSorting = KeyphraseSorting.ALPHABETICAL):
        keyphrase_descriptions = {}
        keyphrase_list = self.get_keyphrase_list(sort_by)
        if sort_by.name == KeyphraseSorting.ALPHABETICAL.name:
            for keyphrase in keyphrase_list:
                id = keyphrase[0]
                keyphrase = self.get_keyphrase_by_id(id)
                description = keyphrase.\
                    get_description()
                keyphrase_descriptions[id] = description
        elif sort_by.name == KeyphraseSorting.PAIRWISE_SIMILARITY.name:
            for keyphrase in keyphrase_list:
                similar_cluster = "({}, {:.2f})".\
                    format(keyphrase[2], keyphrase[3])
                id = keyphrase[0]
                keyphrase_obj = self.get_keyphrase_by_id(id)
                description = keyphrase_obj.get_description(
                    similar_cluster)
                keyphrase_descriptions[id] = description
        elif sort_by.name == KeyphraseSorting.CLUSTER_SIMILARITY.name:
            for keyphrase in keyphrase_list:
                similar_keyphrase = "({}, {:.2f})".\
                    format(keyphrase[4], keyphrase[5])
                id = keyphrase[0]
                keyphrase_obj = self.get_keyphrase_by_id(id)
                description = keyphrase_obj.\
                    get_description(similar_keyphrase)
                keyphrase_descriptions[id] = description
        elif sort_by.name == KeyphraseSorting.NUMERICAL.name:
            for keyphrase in keyphrase_list:
                id = keyphrase[0]
                keyphrase = self.get_keyphrase_by_id(id)
                description = keyphrase.\
                    get_description()
                keyphrase_descriptions[id] = description
        else:
            raise ValueError(f'Unknown sort order: {sort_by}')
        return keyphrase_descriptions