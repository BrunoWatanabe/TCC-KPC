import ipywidgets as widgets

from keyphrase_curation.annotator.models.cluster_annotation import Keyphrase
from typing import Callable, Tuple, List


class ClusterAnnotationView:
    def __init__(self, annotators, keyphrases: List[Keyphrase], cluster_ids):
        self.cluster_ids = cluster_ids
        self.keyphrases = keyphrases
        self.annotators = annotators
        self.show_similar = False

        annotator_options = []
        for annotator in self.annotators:
            annotator_options.append(
                (f'annotator{annotator}', annotator)
            )
        self.annotator_dropdown = widgets.Dropdown(
            description='Load annotations of:',
            options=annotator_options,
            value=None,
            layout={
                'width': 'max-content'
            },
            style={'description_width': 'initial'}
        )

        # button: hide clustered keyphrases
        self.hide_clustered_button = widgets.ToggleButton(
            description='Hide Clustered',
            layout=widgets.Layout(height='30px'),
            value=False
        )
        self.hide_clustered_button.observe(
            self.update_clustered_dropdowns_visibility,
            names='value')

        # button: save annotations
        self.save_button: widgets.Button = widgets.Button(
            description='Save',
            layout=widgets.Layout(height='30px')
        )

        # dropdowns: keyphrases
        self._dropdowns = self._make_dropdowns()

        # textareas: clusters
        self._cluster_textareas = self._make_cluster_textareas()

        # dropdown: sort keyphrases
        self.sort_keyphrases_dropdown = widgets.Dropdown(
            description='Sort keyphrases:',
            options=[('Alphabetical', 'alphabetical'),
                     ('Cluster similarity', 'cluster_similarity'),
                     ('Numerical', 'numerical'),
                     ('Pairwise similarity', 'pairwise_similarity')],
            value='alphabetical',
            layout=widgets.Layout(width='max-content'),
            style={'description_width': 'initial'}
        )

        # dropdown: sort clusters
        self.sort_clusters_dropdown = widgets.Dropdown(
            description='Sort clusters:',
            options=[('Numerically', 'numerically'),
                     ('By cluster similarity', 'by_cluster')],
            value='numerically',
            layout=widgets.Layout(width='max-content'),
            style={'description_width': 'initial'}
        )

    def get_dropdowns(self):
        return self._dropdowns

    def add_cluster_dropdowns_observer(self, observer: Callable):
        for id in self._dropdowns:
            dropdown = self._dropdowns[id]
            dropdown.observe(observer, names='value')

    def add_annotator_observer(self, observer: Callable):
        self.annotator_dropdown.observe(observer, names='value')

    def add_save_button_observer(self, observer: Callable):
        self.save_button.on_click(observer)

    def add_sort_keyphrases_dropdown_observer(self, observer: Callable):
        self.sort_keyphrases_dropdown.observe(observer, names='value')

    def add_sort_clusters_observer(self, observer: Callable):
        self.sort_clusters_dropdown.observe(observer, names='value')

    def update_clustered_dropdowns_visibility(self, change):
        if self.hide_clustered_button.value:
            self.hide_clustered_button.description = 'Show Clustered'
            for dropdown_id in self._dropdowns:
                dropdown = self._dropdowns[dropdown_id]
                if dropdown.value is not None:
                    dropdown.layout.visibility = 'hidden'
                else:
                    dropdown.layout.visibility = 'visible'
        else:
            self.hide_clustered_button.description = 'Hide Clustered'
            for dropdown_id in self._dropdowns:
                dropdown = self._dropdowns[dropdown_id]
                dropdown.layout.visibility = 'visible'

    def update_save_button(self, status):
        if status == 'NOT_SAVED':
            self.save_button.disabled = False
            self.save_button.description = 'Save'
        elif status == 'LOADED':
            self.save_button.disable = True
            self.save_button.description = 'Save'
        elif status == 'INITIAL':
            self.save_button.disabled = False
            self.save_button.description = 'Print'

    def _make_dropdowns(self):
        dropdowns = {}
        for dropdown_id, keyphrase in enumerate(self.keyphrases):
            kp_id = keyphrase.id
            tuple_options = [
                (c_id, (c_id, kp_id)) for c_id in self.cluster_ids]
            description = keyphrase.get_description()
            dropdowns[dropdown_id] = widgets.Dropdown(
                options=tuple_options,
                value=None,
                description=f'{description}:',
                disabled=False,
                layout={
                    'width': 'max-content',
                    'visibility': 'visible'
                },
                style={'description_width': 'initial'}
            )
        return dropdowns

    def _make_cluster_textareas(self):
        textareas = {}
        for cluster_id in self.cluster_ids:
            textarea = widgets.Textarea(
                description='Cluster ' + str(cluster_id)+': ',
                layout=widgets.Layout(height="100%", width="auto")
            )
            textareas[cluster_id] = textarea
        return textareas

    def get_ui(self):
        dropdowns = list(self._dropdowns.values())
        grid = widgets.GridspecLayout(1, 2)
        list_grid00 = [self.sort_keyphrases_dropdown] + dropdowns
        grid[0, 0] = widgets.VBox(list_grid00)
        list_grid01 = [self.sort_clusters_dropdown] +\
            list(self._cluster_textareas.values())
        grid[0, 1] = widgets.VBox(list_grid01)
        button_bar = widgets.HBox([
            self.annotator_dropdown,
            self.hide_clustered_button,
            self.save_button])
        app = widgets.AppLayout(
            header=button_bar,
            center=grid,
            grid_gap="10px",
            pane_heights=['30px', 50, 0]  # header, center, footer
        )
        return app

    def update_cluster_textarea(self, cluster_id, keyphrases_descriptions):
        self._cluster_textareas[cluster_id].value = ''
        self._cluster_textareas[cluster_id].value = \
            ', '.join(keyphrases_descriptions)

    def update_cluster_textareas(self, clusters_keyphrase_descriptions):
        for cluster_id in clusters_keyphrase_descriptions:
            keyphrases_descriptions = \
                clusters_keyphrase_descriptions[cluster_id]
            self.update_cluster_textarea(cluster_id, keyphrases_descriptions)

    def update_dropdown(self, dropdown_id: int, annotation: Tuple[int, int]):
        keyphrase_id = annotation[0]
        cluster_id = annotation[1]
        self._dropdowns[dropdown_id].options = [
            (c_id, (c_id, keyphrase_id)) for c_id in self.cluster_ids]
        self._dropdowns[dropdown_id].value = (cluster_id, keyphrase_id)

    def update_dropdowns(self,
                         annotations,
                         keyphrase_order: List[int] = None):
        if keyphrase_order is None:
            keyphrase_order = [
                dropdown_id+1 for dropdown_id in self._dropdowns.keys()]
        for dropdown_id, keyphrase_id in enumerate(keyphrase_order):
            cluster_id = annotations[keyphrase_id-1]
            self.update_dropdown(dropdown_id, (keyphrase_id, cluster_id))

    def update_dropdowns_descriptions(self,
                                      descriptions,
                                      keyphrase_order: List[int] = None):
        if keyphrase_order is None:
            keyphrase_order = [
                dropdown_id+1 for dropdown_id in self._dropdowns.keys()]
        for dropdown_id, keyphrase_id in enumerate(keyphrase_order):
            description = descriptions[keyphrase_id]
            self._dropdowns[dropdown_id].description = description
