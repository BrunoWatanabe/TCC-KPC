import os

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic
from fastapi import Security
from keyphrase_curation.api import annotation_file, user, keyphrase, topic, cluster
from keyphrase_curation.util.security \
    import get_current_user
from keyphrase_curation.components.app import bind_root

app = FastAPI(
    docs_url='/api/docs',
    redoc_url=None,
    openapi_url='/openapi.json')

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(topic.router, prefix="/topic", tags=["topics"])
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(keyphrase.router, prefix="/keyphrases", tags=["keyphrases"])
app.include_router(cluster.router, prefix="/clusters", tags=["clusters"])
app.include_router(
    annotation_file.router,
    prefix="/annotation_files",
    tags=["annotation files"])
bind_root(app)


@app.get("/openapi.json")
async def get_open_api_endpoint(
        user: str = Depends(get_current_user)):
    return JSONResponse(
        get_openapi(title="FastAPI", version='1', routes=app.routes))


@app.get("/api/docs")
@app.get("/api/docs/", include_in_schema=False)
async def get_documentation(
        credentials: str = Security(HTTPBasic())):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")

if __name__ == "__main__":
    def _as_bool(value, default=True):
        if value is None:
            return default
        return value.strip().lower() in {"1", "true", "yes", "on"}

    uvicorn.run(
        "keyphrase_curation.api.main:app",
        host=os.getenv("KPC_HOST", "127.0.0.1"),
        port=int(os.getenv("KPC_PORT", "3132")),
        reload=_as_bool(os.getenv("KPC_RELOAD", "1")))


