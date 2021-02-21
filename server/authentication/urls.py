from authentication.views.users import UserViewSet
from rest_framework.routers import DefaultRouter

app_name = 'authentication'

# Routs/urls for menus and menu-items
user_router = DefaultRouter()
user_router.register(r'users', UserViewSet, basename='user')

# Url-patterns for website app.
urlpatterns = [
    *user_router.urls
]
