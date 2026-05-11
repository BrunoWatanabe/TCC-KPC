from fastapi import APIRouter, Depends, HTTPException
from keyphrase_curation.util.security import get_current_user
from keyphrase_curation.controller.user_attribution \
    import UserAttributionController
from keyphrase_curation.controller.annotation \
    import AnnotationController
from keyphrase_curation.model.annotation import \
    AnnotationTask
from typing import Dict, List

router = APIRouter()


@router.get("/{username}/list")
@router.get("/{username}/list/", include_in_schema=False)
async def list_topics(
        username: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        topics = UserAttributionController().get_topics(username)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"topics": topics}

@router.get("/keyphrase_clustering/{username}/{topic}")
async def list_keyphrase_clusters(
        username: str,
        topic: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        keyphrase_clustering = ac.get_keyphrase_clustering()
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return keyphrase_clustering

@router.get("/clusters/{username}/{topic}")
async def list_clusters(
        username: str,
        topic: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        clusters, clusters_meta_info = ac.get_clusters()
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "clusters": clusters,
        "clusters_meta_info": clusters_meta_info
    }

@router.get("/cluster_selection/{username}/{topic}")
async def list_cluster_selection(
        username: str,
        topic: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:
    
    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        cluster_selection = ac.get_cluster_selection()
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return cluster_selection

@router.get("/keyphrases_selection/{username}/{topic}")
async def list_keyphrases_selection(
        username: str,
        topic: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:
    
    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        keyphrases_selection = ac.get_keyphrases_selection()
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return keyphrases_selection

@router.get("/keyphrases_aliases/{username}/{topic}")
async def list_keyphrases_aliases(
        username: str,
        topic: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        keyphrases_aliases = ac.get_keyphrases_aliases()
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return keyphrases_aliases

@router.get("/annotation_profile/{username}/{topic}")
async def get_annotation_profile(
        username: str,
        topic: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")

        uac = UserAttributionController()
        annotation_profile = uac.get_annotation_profile(username, topic)
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"annotation_profile": annotation_profile}


@router.get("/get_annotation_task_options/{username}")
async def get_annotation_task_options(
        username: str, 
        logged_user: str = Depends(get_current_user)
    ) -> dict:
    
    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        options = [
            {"name": member.name, "value": member.value}
            for member in AnnotationTask
        ]
        return options
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/move_to_cluster/{username}/{topic}/{keyphrase_id}/{cluster_id}")
async def move_to_cluster(
        username: str,
        topic: str,
        keyphrase_id: str,
        cluster_id: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:
    
    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        ac.move_to_cluster(int(keyphrase_id), int(cluster_id))
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Keyphrase moved successfully"}

@router.put("/save_annotation/{username}/{topic}/{task}")
async def save_annotation(
        username: str,
        topic: str,
        task: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        boSave = ac.save(task)
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Annotation saved successfully", "saved": boSave}

@router.put("/select_cluster/{username}/{topic}/{cluster_id}/{selected}")
async def select_cluster(
        username: str,
        topic: str,
        cluster_id: str,
        selected: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:
    
    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        ac.select_cluster(int(cluster_id), int(selected))
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Cluster selection updated successfully"}

@router.put("/select_keyphrase/{username}/{topic}/{cluster_id}/{order}/{keyphrase_id}")
async def select_keyphrase(
        username: str,
        topic: str,
        cluster_id: str,
        order: str,
        keyphrase_id: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:
    
    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        ac.select_keyphrase(int(cluster_id), int(order), int(keyphrase_id))
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Keyphrase selection updated successfully"}

@router.put("/move_to_cluster_and_save_annotation/{username}/{topic}/{keyphrase_id}/{cluster_id}/{task}")
async def move_to_cluster_and_save_annotation(
        username: str,
        topic: str,
        keyphrase_id: str,
        cluster_id: str,
        task: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
            
        ac = AnnotationController(topic, username)
        
        # 1. Move keyphrase para o cluster
        ac.move_to_cluster(int(keyphrase_id), int(cluster_id))
        
        # 2. Salva a anotação
        saved = ac.save(task)
        
        # 3. Retorna clusters atualizados
        clusters, clusters_meta_info = ac.get_clusters()
        
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "message": "Keyphrase moved and annotation saved successfully",
        "saved": saved,
        "clusters": clusters,
        "clusters_meta_info": clusters_meta_info
    }

@router.put("/set_alias/{username}/{topic}/{cluster_id}/{alias}")
async def set_alias(
        username: str,
        topic: str,
        cluster_id: str,
        alias: str,
        logged_user: str = Depends(get_current_user)
    ) -> dict:

    if username != logged_user and logged_user != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    try:
        topics_user = UserAttributionController().get_topics(username)
        if topic not in topics_user:
            raise HTTPException(status_code=404, detail="Topic not found")
        ac = AnnotationController(topic, username)
        ac.set_alias(int(cluster_id), alias)
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Cluster alias updated successfully"}
