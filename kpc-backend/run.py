#!/usr/bin/env python
"""
Backend entry point for KPC (Keyphrase Curation Platform).
Initializes and starts the FastAPI/Uvicorn server.
"""
import os
import sys
from keyphrase_curation.api.api_server import ApiServer

def _as_bool(value, default=True):
    """Convert environment variable to boolean."""
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}

if __name__ == "__main__":
    # Read configuration from environment variables
    host = os.getenv("KPC_HOST", "127.0.0.1")
    port = int(os.getenv("KPC_PORT", "3132"))
    reload = _as_bool(os.getenv("KPC_RELOAD", "1"))
    
    # Instantiate and start the server
    api = ApiServer(host=host, port=port, reload=reload)
    api.start()
