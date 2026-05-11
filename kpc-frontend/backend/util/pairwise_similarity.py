import numpy as np


class PairwiseSimilarity:
    '''
    Build a list of pairwise similarity between the elements
    of a similarity matrix
    '''

    def __init__(self, similarity_matrix):
        self.initial_ids_set = set(list(range(len(similarity_matrix))))
        self.similarity_matrix = similarity_matrix
        self.diagonal_matrix = self.transform_diagonal(similarity_matrix)
        self.diagonal_matrix_original = self.diagonal_matrix.copy()
        self.reset_elements = []

    def transform_diagonal(self, matrix):
        np_matrix = np.array(matrix)
        np.fill_diagonal(np_matrix, -np.inf)
        return np_matrix

    def reset_element_similarity(self, element_id):
        self.reset_elements.append(element_id)
        for i in range(self.diagonal_matrix.shape[0]):
            self.diagonal_matrix[i][element_id] = -np.inf
            self.diagonal_matrix[element_id][i] = -np.inf
        return self.diagonal_matrix

    def restore_element_similarity(self, element_id):
        self.reset_elements.remove(element_id)
        for i in range(self.diagonal_matrix.shape[0]):
            self.diagonal_matrix[i][element_id] = \
                self.diagonal_matrix_original[i][element_id]
            self.diagonal_matrix[element_id][i] = \
                self.diagonal_matrix_original[i][element_id]
        return self.diagonal_matrix

    def is_pairwise_similarity_reset(self, element_id: int):
        '''
        Check if pairwise similarity of element is reset
        '''
        for i in range(self.diagonal_matrix.shape[0]):
            if self.diagonal_matrix[i][element_id] != -np.inf:
                return False
            if self.diagonal_matrix[element_id][i] != -np.inf:
                return False
        return True

    def reset_pair_similarity(self, pair, matrix=None):
        if matrix is None:
            matrix = self.diagonal_matrix
        for i in range(matrix.shape[0]):
            matrix[i][pair[0]] = -np.inf
            matrix[i][pair[1]] = -np.inf
            matrix[pair[0]][i] = -np.inf
            matrix[pair[1]][i] = -np.inf
        return matrix

    def get_max_pair_similarity(self, matrix=None):
        if matrix is None:
            matrix = matrix
        max_pair = np.unravel_index(
            np.argmax(matrix), matrix.shape)
        if max_pair == (0, 0):
            return None
        else:
            return max_pair

    def get_pairwise_similarity(self):
        result = []
        buffer_matrix = self.diagonal_matrix.copy()
        not_reset_count = np.count_nonzero(buffer_matrix != -np.inf)
        while not_reset_count > 0:
            row = []
            pair = self.get_max_pair_similarity(buffer_matrix)
            if pair is not None:
                row.append(pair[0])
                row.append(pair[1])
                row.append(buffer_matrix[pair[0]][pair[1]])
                result.append(row)
                buffer_matrix = self.reset_pair_similarity(pair, buffer_matrix)
            else:
                break
        if len(self.initial_ids_set) > len(result):  # not all paired
            ids = set()
            for row in result:
                ids.add(row[0])
                ids.add(row[1])
            diff = self.initial_ids_set.difference(ids)
            not_paired_set = diff.difference(set(self.reset_elements))
            if len(not_paired_set) > 1:
                raise Exception('More than one element not paired')
            if len(not_paired_set) == 1:
                id = list(not_paired_set)[0]
                row = [id, -1, 0]  # element no paired, similarity 0
                result.append(row)
        return result