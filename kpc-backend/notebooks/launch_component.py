from fastapi import FastAPI
from reactpy.backend.fastapi import configure


def launch(component, **kwargs):
    app = FastAPI()
    configure(app, component, **kwargs)
    return app
