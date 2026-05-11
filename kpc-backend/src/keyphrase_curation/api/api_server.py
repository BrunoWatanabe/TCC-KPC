import subprocess


class ApiServer:

    def __init__(self,
                 host='127.0.0.1',
                 port=3132):
        self.port = port
        self.host = host

    def start(self):
        subprocess.run(
            f'uvicorn keyphrase_curation.api.main:app \
                --port {int(self.port)} \
                --host {self.host} --reload',
            shell=True)
