import ipywidgets as widgets


class UserDataView():
    '''Selects the file and user to annotate keyphrases.
    '''

    def __init__(self):
        self.user_chooser = widgets.Dropdown(
            options=[],
            description="User:",
            value=None,
            layout={'width': 'max-content'},
            style={
                'description_width': 'initial'}
        )
        self.csv_chooser = widgets.Dropdown(
            options=[],
            description="CSV file:",
            value=None,
            layout={'width': 'max-content'},
            style={
                'description_width': 'initial'}
        )
        self.csv_chooser.layout.visibility = 'hidden'
        self.messages_label = widgets.Label(
            value='Select a user and a CSV file to annotate keyphrases.')

    def print_message(self, message):
        self.messages_label.value = message

    def get_ui(self):
        return widgets.HBox([
            self.user_chooser,
            self.csv_chooser,
            self.messages_label])

    def set_selected_csv_file(self, csv_file):
        self.csv_chooser.value = csv_file

    def set_selected_user(self, user):
        self.user_chooser.value = user

    def set_users(self, users):
        self.user_chooser.options = users

    def set_csv_files(self, csv_files):
        self.csv_chooser.options = csv_files
        self.csv_chooser.layout.visibility = 'visible'
        self.csv_chooser.value = None
