from reactpy import component, run, html
from keyphrase_curation.components.adjudicator_chip import AdjudicatorChip


@component
def AdjudicatorChipTest():
    adjudicators_data = [
        # consented
        {
            '_key': '1',
            'title': 'Consentend/Rejected Test',
            'kp': '1',
            'adjudicator_cluster': ['1'],
            'annotator1_cluster': ['1'],
            'annotator2_cluster': ['1']
        },
        # consented_rejected
        {
            '_key': '2',
            'title': 'Consented_Rejected/Consented Test',
            'kp': '2',
            'adjudicator_cluster': [],
            'annotator1_cluster': ['2'],
            'annotator2_cluster': ['2']
        },
        # consented1
        {
            '_key': '3',
            'title': 'Consented1/Rejected1 Test',
            'kp': '2',
            'adjudicator_cluster': ['2'],
            'annotator1_cluster': ['2'],
            'annotator2_cluster': ['3']
        },
        # rejected1
        {
            '_key': '4',
            'title': 'Rejected1/Consentend1 Test',
            'kp': '2',
            'adjudicator_cluster': [],
            'annotator1_cluster': ['2'],
            'annotator2_cluster': ['3']
        },
        # consented2
        {
            '_key': '5',
            'title': 'Consented2/Rejected2 Test',
            'kp': '3',
            'adjudicator_cluster': ['3'],
            'annotator1_cluster': ['2'],
            'annotator2_cluster': ['3']
        },
        # rejected2
        {
            '_key': '6',
            'title': 'Rejected2/Consentend2 Test',
            'kp': '3',
            'adjudicator_cluster': [],
            'annotator1_cluster': ['2'],
            'annotator2_cluster': ['3']
        }
    ]
    adjudicator_chips = [
        AdjudicatorChip(**adjudicator_data, key=adjudicator_data['_key'])
        for adjudicator_data in adjudicators_data]
    return html.div(
        *adjudicator_chips
    )


run(AdjudicatorChipTest)
