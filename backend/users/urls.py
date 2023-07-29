from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView, TokenObtainPairView
from .views import RegisterView, RetrieveUserView, ResetUserView, UserAvatarView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name ='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name ='token_verify'),
    path('register/', RegisterView.as_view()),
    path('logout/', ResetUserView.as_view()),
    path('user/', RetrieveUserView.as_view()),
    path('avatar/', UserAvatarView.as_view()),
]
