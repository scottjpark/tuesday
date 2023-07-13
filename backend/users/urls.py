from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView
from .views import RegisterView, RetrieveUserView, CookieTokenObtainPairView, CookieTokenRefreshView

urlpatterns = [
    path('token/', CookieTokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name ='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name ='token_verify'),
    path('register/', RegisterView.as_view()),
    path('profile/', RetrieveUserView.as_view())
]
