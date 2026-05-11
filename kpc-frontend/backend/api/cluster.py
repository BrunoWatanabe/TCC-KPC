from fastapi import APIRouter, Depends, HTTPException
from keyphrase_curation.util.security import get_current_user
from keyphrase_curation.controller.user_attribution \
    import UserAttributionController
from keyphrase_curation.controller.user_attribution \
    import UserAttributionController
from keyphrase_curation.controller.annotation import \
    AnnotationController
from keyphrase_curation.model.cluster import ClusterSorting
from typing import List, Dict

router = APIRouter()

@router.get("/cluster_sorting_options/{username}")
async def get_cluster_sorting_options(
        username: str,
        logged_user: str = Depends(get_current_user)
    ) -> List[Dict[str, str]]:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        options = [
            {"name": member.name, "value": member.value}
            for member in ClusterSorting
        ]
        return options
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get_cluster_sorting_by_value/{username}/{cluster_order}")
async def get_cluster_sorting_by_value(
        username: str,
        cluster_order: str,
        logged_user: str = Depends(get_current_user)
    ) -> Dict[str, str]:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        sorting = ClusterSorting.by_value(cluster_order)
        if not sorting:
            raise HTTPException(status_code=404, detail="Sorting not found")
        return {"name": sorting.name, "value": sorting.value}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))