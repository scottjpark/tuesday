from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import DiscordBotView, PinnedResponsesView

urlpatterns = [
    # Receives data from Discord to store and return pinned responses
    path('discord/', DiscordBotView.as_view()),
]

router = DefaultRouter()
router.register(r'admin', PinnedResponsesView)
urlpatterns += router.urls