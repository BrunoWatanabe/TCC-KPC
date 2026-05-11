from keyphrase_curation.model.annotation import ClusterSetsMatcher
from keyphrase_curation.controller.annotation \
    import AnnotationController
# import json

topics = [
    'abortion',
    'nuclear_energy',
    'death_penalty',
    'marijuana_legalization',
    'cloning',
    'minimum_wage',
    'gun_control',
    'school_uniforms'
]

topic = input("topic:")
annotators = ['akira', 'victor', 'alexandre']

cacs = []
for i in range(3):
    cacs.append(AnnotationController(topic, annotators[i]))

clusterings = []
for i in range(3):
    clusterings.append(cacs[i].cluster_annotation)

ksets = []
for i in range(3):
    ksets.append(clusterings[i].get_keyphrase_sets())


def agreement(clustering1, clustering2, save_to_file=False, file_='/tmp/agreements.csv'):
    csm = ClusterSetsMatcher(clustering1, clustering2)
    bm = csm.get_best_matching()
    total = 0
    ks1 = clustering1.get_keyphrase_sets()
    ks2 = clustering2.get_keyphrase_sets()
    lines = []
    for i, pairs in enumerate(bm):
        # print(f"{pairs[0][0]}\t{pairs[0][1]}\t{ks1[pairs[0][0]]}\t{ks2[pairs[0][1]]}\t{pairs[1]}\t{pairs[2]:.2f}", sep='\n')
        line = f"{pairs[0][0]}\t{pairs[0][1]}\t{ks1[pairs[0][0]]}\t{ks2[pairs[0][1]]}\t{pairs[1]}\t{pairs[2]:.2f}\n"
        lines.append(line)
        # print(line, sep='\n')
        # print(pairs[0][0], pairs[0][1], pairs[1], f"{pairs[2]:.2f}")
        # print(i+1, ks1[pairs[0][0]], ks2[pairs[0][1]], sep='\n')
        # print(pairs)
        total += pairs[1]
    if save_to_file:
        with open(file_, 'a') as f:
            f.writelines(lines)
    else:
        for line in lines:
            print(line)
        print(f"total: {total:.2f}")
    return total


def get_matched_clusters(clustering1, clustering2):
    csm = ClusterSetsMatcher(clustering1, clustering2)
    bm = csm.get_best_matching()
    ks1 = clustering1.get_keyphrase_sets(only_ids=True)
    ks2 = clustering2.get_keyphrase_sets(only_ids=True)
    matched_clusters = {}
    matched_clusters["annotator1"] = {}
    matched_clusters["annotator2"] = {}
    for i, pairs in enumerate(bm):
        matched_clusters["annotator1"][f"{i+1}"] = {
            "keyphrases": list(ks1[pairs[0][0]]),
            "selected": -1,
            "keyphrase1_selected": 0,
            "keyphrase2_selected": 0,
            "alias": ""
        }
        matched_clusters["annotator2"][f"{i+1}"] = {
            "keyphrases": list(ks2[pairs[0][1]]),
            "selected": -1,
            "keyphrase1_selected": 0,
            "keyphrase2_selected": 0,
            "alias": ""
        }
    return matched_clusters


def print_clustering(clustering):
    keyphrase_sets = clustering.get_keyphrase_sets()
    for i in range(1, len(keyphrase_sets)+1):
        print(f"{i}\t{keyphrase_sets[i]}")


def print_agreements(save_to_file=False):
    for i in range(3):
        j = (i+1) % 3
        print(annotators[i], 'x', annotators[j], ':')
        agreement(clusterings[i], clusterings[j], save_to_file=save_to_file)


save_to_file = input("Save to file (/tmp/agreements.csv)? S/N?")

if save_to_file in ['S', 's']:
    print_agreements(save_to_file=True)
else:
    print_agreements(save_to_file=False)

# print_clustering(clustering2)
# print(clustering2)

# akira - alexandre
# agreement(clustering1, clustering3)
# matched = get_matched_clusters(clustering1, clustering3)
# print(json.dumps(matched, indent=4))

# victor - alexandre
# agreement(clustering2, clustering3)

# akira - victor
# agreement(clustering1, clustering2)
