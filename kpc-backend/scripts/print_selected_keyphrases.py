from keyphrase_curation.controller.annotation import KeyphraseCurationFile

annotator = input('annotator: ')
topic = input('topic: ')
kcf = KeyphraseCurationFile(
    f'/home/argmap/keyphrase_curation/dataset/annotations/{annotator}/{topic}.json')
data = kcf.get_data_from_json()
keyphrase_selection = []


def format_chars(_str):
    _str = _str.lower()
    _str = _str.replace(' ', '_')
    _str = _str.replace('.', '')
    _str = _str.replace('-', '_')
    return _str


for cluster_id in data['clusters']:
    cluster_data = data['clusters'][cluster_id]
    kp1 = cluster_data['keyphrase1_selected']
    kp2 = cluster_data['keyphrase2_selected']
    alias = cluster_data['alias']

    if cluster_id == '33':
        continue

    selected = str(cluster_data['selected'])
    if str(kp1) != '0':
        kp1_description = data['keyphrases'][str(kp1)]['keyphrase']
        if str(kp2) != '0':
            kp2_description = data['keyphrases'][str(kp2)]['keyphrase']
        else:
            kp2_description = ''

    if alias == '':
        alias = \
            f"{format_chars(kp1_description)}"
        alias += \
            f"_and_{format_chars(kp2_description)}" \
            if len(kp2_description.strip()) >= 1 else ""
    alias = format_chars(alias)

    keyphrase_selection.append(
        [cluster_id, selected, kp1_description, kp2_description, alias]
    )

keyphrase_selection_sorted = sorted(
    keyphrase_selection, key=lambda x: int(x[0]))

try:
    _file = f'_kp_selection_{annotator}.tsv'
    with open(_file, 'w') as f:
        for row in keyphrase_selection_sorted:
            line = '\t'.join(row)
            row = f"{line}\n"
            f.write(row)
    print(f'file {_file} generated successfully')
except Exception as e:
    print(f'Error: could not generate {_file} - {e}')
