import unittest
import sys
import os
from keyphrase_curation.model.annotation import \
    ClusterAnnotation, KeyphraseCurationFile


class TestClusterAnnotation(unittest.TestCase):

    def setUp(self):
        root_path = os.getcwd()
        tests_path = os.path.join(root_path, 'tests')
        samples_path = os.path.join(tests_path, 'samples')
        sys.path.append(root_path)

        self.keyphrase_curation_file: KeyphraseCurationFile = \
            KeyphraseCurationFile(
                os.path.join(samples_path, 'death_penalty.tsv'))

        self.cluster_annotation: ClusterAnnotation = \
            ClusterAnnotation(
                topic='death_penalty',
                embeddings_path=samples_path,
                cluster_ids_length=33,
                keyphrase_curation_file=self.keyphrase_curation_file)

    def test_keyphrases(self):
        self.assertEqual(len(self.cluster_annotation.keyphrases), 140)

    def test_clusters(self):
        self.assertEqual(len(self.cluster_annotation.clusters), 33)

    def test_status(self):
        self.assertEqual(self.cluster_annotation.get_status(), 'INITIAL')

    def test_load_annotations_from_file(self):
        annotations = self.cluster_annotation.load_annotations_from_file(
            annotator=1)
        expected_annotations = {
            1: 3, 2: 1, 3: 24, 4: 1, 5: 5,
            6: 1, 7: 20, 8: 9, 9: 16, 10: 4,
            11: 1, 12: 2, 13: 4, 14: 5, 15: 5,
            16: 1, 17: 20, 18: 1, 19: 5, 20: 20,
            21: 25, 22: 4, 23: 1, 24: 1, 25: 26,
            26: 7, 27: 17, 28: 7, 29: 3, 30: 8,
            31: 2, 32: 9, 33: 16, 34: 17, 35: 2,
            36: 17, 37: 6, 38: 6, 39: 8, 40: 6,
            41: 28, 42: 28, 43: 28, 44: 29, 45: 31,
            46: 29, 47: 27, 48: 28, 49: 31, 50: 31,
            51: 32, 52: 31, 53: 27, 54: 29, 55: 27,
            56: 29, 57: 27, 58: 30, 59: 30, 60: 30,
            61: 3, 62: 10, 63: 11, 64: 3, 65: 11,
            66: 10, 67: 10, 68: 12, 69: 15, 70: 10,
            71: 11, 72: 10, 73: 14, 74: 10, 75: 11,
            76: 10, 77: 12, 78: 14, 79: 6, 80: 13,
            81: 23, 82: 10, 83: 19, 84: 10, 85: 14,
            86: 13, 87: 23, 88: 15, 89: 18, 90: 11,
            91: 16, 92: 18, 93: 18, 94: 12, 95: 15,
            96: 15, 97: 13, 98: 21, 99: 12, 100: 12,
            101: 33, 102: 33, 103: 33, 104: 33, 105: 33,
            106: 33, 107: 33, 108: 33, 109: 21, 110: 33,
            111: 33, 112: 33, 113: 22, 114: 33, 115: 22,
            116: 33, 117: 33, 118: 27, 119: 33, 120: 33,
            121: 33, 122: 27, 123: 33, 124: 33, 125: 33,
            126: 29, 127: 33, 128: 27, 129: 33, 130: 33,
            131: 33, 132: 33, 133: 22, 134: 33, 135: 27,
            136: 27, 137: 33, 138: 33, 139: 33, 140: 33}
        self.assertEqual(annotations, expected_annotations)
        self.assertEqual(self.cluster_annotation.get_status(), 'LOADED')

    def test_move_to_cluster(self):
        self.cluster_annotation.load_annotations_from_file(
            annotator=1)
        clustering_before = self.cluster_annotation.clustering.copy()
        cluster1 = self.cluster_annotation.get_cluster_by_id(1)
        cluster1_descriptions_before = cluster1.get_descriptions().copy()
        descriptions1_expected = [
            'Accountability(6)',
            'Arbitrary application(24)',
            'Innocence(23)',
            'Justice(2)',
            'Protection of innocent lives(16)',
            'Public safety(4)',
            'Social order(11)',
            'Upholding societal norms(18)']
        self.assertEqual(cluster1_descriptions_before, descriptions1_expected)
        cluster3 = self.cluster_annotation.get_cluster_by_id(3)
        cluster3_descriptions_before = cluster3.get_descriptions().copy()
        descriptions3_expected = [
            'Deterrence(1)',
            'deterrence(61)',
            'deterrent(64)',
            'Lack of deterrence(29)']
        self.assertEqual(cluster3_descriptions_before, descriptions3_expected)
        self.cluster_annotation.move_to_cluster(1, 1)
        clustering_after = self.cluster_annotation.clustering.copy()
        self.assertEqual(clustering_before[0], 3)
        self.assertEqual(clustering_after[0], 1)
        cluster1_descriptions_after = cluster1.get_descriptions().copy()
        cluster1_descriptions_expected = [
            'Accountability(6)',
            'Arbitrary application(24)',
            'Deterrence(1)',
            'Innocence(23)',
            'Justice(2)',
            'Protection of innocent lives(16)',
            'Public safety(4)',
            'Social order(11)',
            'Upholding societal norms(18)']
        self.assertEqual(cluster1_descriptions_after,
                         cluster1_descriptions_expected)
        cluster3_descriptions_after = cluster3.get_descriptions().copy()
        cluster3_descriptions_expected = [
            'deterrence(61)',
            'deterrent(64)',
            'Lack of deterrence(29)']
        self.assertEqual(cluster3_descriptions_after,
                         cluster3_descriptions_expected)
