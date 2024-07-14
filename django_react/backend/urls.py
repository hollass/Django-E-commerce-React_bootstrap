from django.urls import path
from .views import get_csrf, user_info, \
    UserRegister, UserLogin, UserView, logout_view, cats_view

urlpatterns = [
    path('csrf/', get_csrf, name='api-csrf'),
    path('login/', UserLogin.as_view(), name='api-login'),
    path('register/', UserRegister.as_view(), name='api-register'),
    path('logout/', logout_view, name='api-logout'),
    path('user/', UserView.as_view(), name='api-userInfo'),
    path('user_info/', user_info, name='api-userInfo'),
    path('cats_info/', cats_view, name='api-userInfo'),
]
