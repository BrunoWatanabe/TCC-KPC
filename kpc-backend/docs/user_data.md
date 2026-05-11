# User Data

...DEPRECATED...

## Loading Annotations

```mermaid
sequenceDiagram
    actor User
    
    User->>ClusterAnnotationView: annotator_dropdown_change
    ClusterAnnotationView->>ClusterAnnotationController: on_annotator_change
    ClusterAnnotationController->>ClusterAnnotation: set_annotator
    ClusterAnnotation->>ClusterAnnotationController: on_set_annotator
    ClusterAnnotationController->>ClusterAnnotation: load_annotations_from_file
    ClusterAnnotation->>ClusterAnnotationController: on_annotations_change
    ClusterAnnotationController->>ClusterAnnotationView: update_dropdowns
    ClusterAnnotationController->>ClusterAnnotationView: update_cluster_textarea
```