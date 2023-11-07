from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import include
from django.shortcuts import render

def render_react(request):
    return render(request, "index.html")

urlpatterns = [
    re_path(r"^$|^/$", render_react),
    re_path(r"^(?!api/).*", render_react),
    path('api/admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/curation/', include('curation.urls')),
]
