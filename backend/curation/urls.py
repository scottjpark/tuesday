from django.urls import path
from .views import CuratedImageView

urlpatterns = [
    # Receives data from curation chrome extension
    path('save_twitter/', CuratedImageView.as_view()),
]
