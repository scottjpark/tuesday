from django.urls import path
from .views import SaveImageView, CuratedImagesView

urlpatterns = [
    # Receives data from curation chrome extension
    path('save_twitter/', SaveImageView.as_view()),
    path('curated_images/', CuratedImagesView.as_view()),
]
