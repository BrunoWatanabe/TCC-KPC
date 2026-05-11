from fastapi import APIRouter, Depends
from keyphrase_curation.util.security import get_current_user
from keyphrase_curation.model.user_attribution import UserAttribution

router = APIRouter()


@router.get("/{username}/list")
@router.get("/{username}/list/", include_in_schema=False)
async def list_annotation_files(
        username: str,
        logged_user: str = Depends(get_current_user)):
    # if username != logged_user:
    #     return 
    annotation_files = UserAttribution().get_annotation_files(username)
    return {"annotation_files": annotation_files}
