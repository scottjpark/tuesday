from django.urls import path
from .views import SaveImageView, CuratedImagesView, UpdateImageView, DeleteImageView

urlpatterns = [
    # Receives data from curation chrome extension
    path('save_twitter/', SaveImageView.as_view()),
    path('curated_images/', CuratedImagesView.as_view()),
    path('curated_image_update/', UpdateImageView.as_view()),
    path('curated_image_delete/<int:image_id>/', DeleteImageView.as_view()),
]
