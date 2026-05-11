import unittest
import sys
import os
from keyphrase_curation.model.cluster import \
    KeyphraseClustering
from keyphrase_curation.model.keyphrase import KeyphraseSorting


class TestKeyphraseClustering(unittest.TestCase):

    def setUp(self):
        root_path = os.getcwd()
        tests_path = os.path.join(root_path, 'tests')
        samples_path = os.path.join(tests_path, 'samples')
        sys.path.append(root_path)

        self.keyphrase_clustering: KeyphraseClustering = \
            KeyphraseClustering('death_penalty', samples_path, 33)

    def test_move_and_remove(self):
        keyphrase = self.keyphrase_clustering.keyphrases[0]
        cluster: KeyphraseClustering.Cluster = \
            self.keyphrase_clustering.clusters[1]
        self.assertTrue(cluster.is_empty())
        pairwise_similarity = self.keyphrase_clustering.pairwise_similarity
        self.keyphrase_clustering.move_to_cluster(keyphrase, cluster)
        self.assertIn(keyphrase.id-1, pairwise_similarity.reset_elements)
        self.assertTrue(
            pairwise_similarity.is_pairwise_similarity_reset(keyphrase.id-1))
        self.assertIn(keyphrase.id, cluster.get_keyphrase_ids())
        self.assertFalse(cluster.is_empty())
        self.keyphrase_clustering.remove_from_cluster(keyphrase, cluster)
        self.assertFalse(
            pairwise_similarity.is_pairwise_similarity_reset(keyphrase.id-1))
        self.assertTrue(cluster.is_empty())

    def test_clusters(self):
        ids = self.keyphrase_clustering.get_cluster_ids()
        self.assertEqual(ids[0], 1)
        self.assertEqual(ids[32], 33)
        cluster = self.keyphrase_clustering.get_cluster_by_id(1)
        self.assertTrue(cluster.is_empty())
        keyphrase = self.keyphrase_clustering.keyphrases[0]
        self.keyphrase_clustering.move_to_cluster(keyphrase, cluster)
        self.assertFalse(cluster.is_empty())
        descriptions = cluster.get_descriptions()
        self.assertEqual(descriptions[0], 'Deterrence(1)')
        self.keyphrase_clustering.remove_from_cluster(keyphrase, cluster)
        self.assertTrue(cluster.is_empty())

    def test_cluster_similarities(self):
        keyphrase = self.keyphrase_clustering.keyphrases[0]
        cluster_similarities = \
            self.keyphrase_clustering.get_keyphrase_similarity_with_clusters(keyphrase)
        self.assertEqual(len(cluster_similarities), 33)
        similarity_values = \
            [similarity for _, similarity in cluster_similarities]
        zeroes_similarity_values = [0 for _ in range(33)]
        # with all clusters empty, all similarities should be 0
        self.assertEqual(similarity_values, zeroes_similarity_values)

    def test_clustering_list(self):
        clustering_list = self.keyphrase_clustering.to_list(
            header=True)
        # with header
        self.assertEqual(len(clustering_list), 141)
        self.assertEqual(clustering_list[0], [
            'id', 'keyphrase', 'best_pair', 'similarity',
            'cluster_most_similar', 'cluster_similarity'
        ])
        # default is alphabetical order
        # [6, 'Accountability', 69, 0.42649346590042114, 1, 0]
        row1 = clustering_list[1][:3]+clustering_list[1][4:]
        self.assertEqual(row1, [
            6, 'Accountability', 69, 1, 0
        ])
        self.assertAlmostEqual(
            clustering_list[1][3], 0.42649346590042114, places=7)
        # sort by pairwise similarity
        clustering_list = self.keyphrase_clustering.to_list(
            sort_column=3,
            reverse=True)
        # [1, 'Deterrence', 61, 1.000000238418579]
        # [61, 'deterrence', 1, 1.000000238418579]
        first_pair = [clustering_list[0][:3], clustering_list[1][:3]]
        self.assertEqual(first_pair, [
            [1, 'Deterrence', 61],
            [61, 'deterrence', 1]
        ])

    def test_keyphrase_descriptions(self):
        keyphrase_descriptions = \
            self.keyphrase_clustering.get_keyphrase_descriptions()
        self.assertEqual(len(keyphrase_descriptions), 140)
        self.assertEqual(keyphrase_descriptions[6], 'Accountability(6)')
        keyphrase_descriptions = \
            self.keyphrase_clustering.get_keyphrase_descriptions(
                sort_by=KeyphraseSorting.CLUSTER_SIMILARITY)
        self.assertEqual(keyphrase_descriptions[1],
                         'Deterrence(1): (61, 1.00)')
        self.assertEqual(
            keyphrase_descriptions[61], 'deterrence(61): (1, 1.00)')
        print(keyphrase_descriptions)
