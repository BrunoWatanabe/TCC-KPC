import ipywidgets as widgets
from keyphrase_curation.annotator.views.user_data import UserDataView


from IPython.display import clear_output, display


class AppView:
    def __init__(
        self,
        user_data_view: UserDataView,
    ):
        self.user_data_view = user_data_view
        self.outs = widgets.Output()
        self.annotator_pane = None

    def show_annotator_pane(self, annotator_pane):
        if self.annotator_pane is not None:
            self.annotator_pane.close()
        self.annotator_pane = annotator_pane
        with self.outs:
            clear_output(wait=True)
            display(self.annotator_pane)

    def close_annotator_pane(self):
        if self.annotator_pane is not None:
            for child in self.annotator_pane.children:
                child.close()

    def get_ui(self):
        return widgets.VBox([
            self.user_data_view.get_ui(),
            self.outs
        ])