# @model: specs/002-pairwise-similarity-fix/model/classes.puml
# RF: RF-003, RF-004, RF-006 — Conversão global de tipos numpy para Python nativos
#
# NumpyConverter.to_native()
# Percorre recursivamente dicts/lists/sets convertendo tipos numpy
# para tipos Python nativos (int, float, list, bool).
#
# Nota: `get_cluster_centrality_scores()` em model/cluster.py também pode
# gerar valores numpy — reavaliar na Sprint 03 (centroid_similarity).

import numpy as np
from typing import Any


class NumpyConverter:
    """
    Conversor recursivo de tipos numpy para Python nativos.

    Útil para sanitizar dados antes da serialização Pydantic/FastAPI,
    evitando PydanticSerializationError com tipos como numpy.int64.

    Exemplo:
        >>> data = {"a": np.int64(1), "b": [np.float64(2.5)]}
        >>> NumpyConverter.to_native(data)
        {'a': 1, 'b': [2.5]}
    """

    @staticmethod
    def to_native(obj: Any) -> Any:
        """
        Converte recursivamente todos os valores numpy em obj para
        tipos Python nativos.

        Suporta:
        - dict  → {k: to_native(v) for k, v in obj.items()}
        - list  → [to_native(v) for v in obj]
        - tuple → list(to_native(v) for v in obj)
        - set   → {to_native(v) for v in obj}
        - numpy.integer → int
        - numpy.floating → float
        - numpy.ndarray  → list (via .tolist())
        - numpy.bool_    → bool
        - demais tipos retornados sem alteração
        """
        if isinstance(obj, dict):
            return {k: NumpyConverter.to_native(v) for k, v in obj.items()}
        elif isinstance(obj, (list, tuple)):
            return [NumpyConverter.to_native(v) for v in obj]
        elif isinstance(obj, set):
            return {NumpyConverter.to_native(v) for v in obj}
        else:
            return NumpyConverter._convert_value(obj)

    @staticmethod
    def _convert_value(value: Any) -> Any:
        """Converte um valor numpy isolado para tipo Python nativo."""
        if isinstance(value, np.integer):
            return int(value)
        elif isinstance(value, np.floating):
            return float(value)
        elif isinstance(value, np.ndarray):
            return value.tolist()
        elif isinstance(value, np.bool_):
            return bool(value)
        else:
            return value