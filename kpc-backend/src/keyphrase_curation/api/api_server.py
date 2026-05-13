import sys

import uvicorn


class ApiServer:

    def __init__(self,
                 host='127.0.0.1',
                 port=3132,
                 reload=True):
        self.port = port
        self.host = host
        self.reload = reload

    def start(self):
        uvicorn.run(
            'keyphrase_curation.api.main:app',
            host=self.host,
            port=int(self.port),
            reload=self.reload,
            log_level='info',
            app_dir=str(sys.path[0]),
        )
