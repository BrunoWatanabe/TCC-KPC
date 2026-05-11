import unittest
import sys
import os
from keyphrase_curation.model.keyphrase import KeyphraseEmbeddings


class TestKeyphraseEmbeddings(unittest.TestCase):

    def setUp(self):
        root_path = os.getcwd()
        tests_path = os.path.join(root_path, 'tests')
        samples_path = os.path.join(tests_path, 'samples')
        sys.path.append(root_path)

        self.keyphrase_embeddings: KeyphraseEmbeddings = \
            KeyphraseEmbeddings('death_penalty', samples_path)

    def test_keyphrase_embeddings(self):
        embeddings = self.keyphrase_embeddings.embeddings
        self.assertEqual(len(self.keyphrase_embeddings.get_keyphrases()), 140)
        self.assertEqual(embeddings[1]['original_keyphrase'], 'Deterrence')

    def test_keyphrase_similarity(self):
        keyphrase1 = self.keyphrase_embeddings.keyphrases[0]
        keyphrase2 = self.keyphrase_embeddings.keyphrases[1]
        similarity = self.keyphrase_embeddings.get_similarity(
            keyphrase1, keyphrase2)
        self.assertAlmostEqual(round(similarity, 7), 0.3012023, places=7)

    def test_keyphrase_similarity_matrix(self):
        similarity_matrix = self.keyphrase_embeddings.similarity_matrix
        self.assertEqual(len(similarity_matrix), 140)
        self.assertEqual(len(similarity_matrix[0]), 140)
        for i in range(140):
            self.assertAlmostEqual(similarity_matrix[i][i], 1.0, places=1)
            for j in range(140):
                self.assertEqual(
                    similarity_matrix[i][j], similarity_matrix[j][i])

    def test_keyphrases(self):
        keyphrases = self.keyphrase_embeddings.get_keyphrases()
        self.assertEqual(len(keyphrases), 140)
        self.assertEqual(keyphrases[0].content, 'Deterrence')
        self.assertEqual(keyphrases[139].id, 140)
        self.assertEqual(keyphrases[139].content, 'Texas_death_penalty')
        self.assertEqual(
            keyphrases[139].preprocessed_content, 'Texas death penalty')

    def test_keyphrase_list(self):
        keyphrase_list = self.keyphrase_embeddings.to_list(header=True)
        # with header
        self.assertEqual(len(keyphrase_list), 141)
        self.assertEqual(keyphrase_list[0], [
            'id', 'keyphrase', 'best_pair', 'similarity'
        ])
        # default is alphabetical order
        # [6, 'Accountability', 69, 0.42649346590042114]
        self.assertEqual(keyphrase_list[1][:3], [
            6, 'Accountability', 69
        ])
        self.assertAlmostEqual(
            keyphrase_list[1][3], 0.42649346590042114, places=7)
        # sort by pairwise similarity
        keyphrase_list = self.keyphrase_embeddings.to_list(
            sort_column=3,
            reverse=True)
        # [1, 'Deterrence', 61, 1.000000238418579]
        # [61, 'deterrence', 1, 1.000000238418579]
        first_pair = [keyphrase_list[0][:3], keyphrase_list[1][:3]]
        self.assertEqual(first_pair, [
            [1, 'Deterrence', 61],
            [61, 'deterrence', 1]
        ])
        self.assertAlmostEqual(
            keyphrase_list[0][3], 1.000000238418579, places=7)
        self.assertAlmostEqual(
            keyphrase_list[1][3], 1.000000238418579, places=7)
