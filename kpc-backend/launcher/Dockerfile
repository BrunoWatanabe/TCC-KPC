FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/src

WORKDIR /tmp/build

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /tmp/build/requirements.txt
COPY reactpy-material /tmp/build/reactpy-material

RUN python -m pip install --no-cache-dir --upgrade pip setuptools wheel \
    && python -m pip install --no-cache-dir -r /tmp/build/requirements.txt \
    && python -m pip install --no-cache-dir -e /tmp/build/reactpy-material

WORKDIR /app

EXPOSE 3132

CMD ["python", "-m", "keyphrase_curation.api.main"]
