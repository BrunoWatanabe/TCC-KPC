from fastapi import APIRouter, Depends
from keyphrase_curation.model.keyphrase import KeyphraseSorting
from keyphrase_curation.util.security import get_current_user
from keyphrase_curation.controller.user_attribution \
    import UserAttributionController
from keyphrase_curation.controller.annotation import \
    AnnotationController
from typing import List, Dict
from keyphrase_curation.model.cluster import ClusterSorting
from fastapi import HTTPException

router = APIRouter()

@router.get("/list")
@router.get("/list/", include_in_schema=False)
async def list_keyphrases(user: str = Depends(get_current_user)):
    return {"message": "List keyphrases 2"}

@router.get("/get_keyphrase_sorting_by_value/{username}/{keyphrase_order}")
async def get_keyphrase_sorting_by_value(
        username: str,
        keyphrase_order: str,
        logged_user: str = Depends(get_current_user)
    ) -> Dict[str, str]:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        sorting = KeyphraseSorting.by_value(keyphrase_order)
        if not sorting:
            raise HTTPException(status_code=404, detail="Sorting not found")
        return {"name": sorting.name, "value": sorting.value}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
