from authentication.views.groups import GroupViewSet
from authentication.views.users import UserViewSet
from rest_framework.routers import DefaultRouter

app_name = 'authentication'

# Routs/urls for menus and menu-items
main_router = DefaultRouter()
main_router.register(r'users', UserViewSet, basename='user')
main_router.register(r'groups', GroupViewSet, basename='group')

# Url-patterns for website app.
urlpatterns = [
    *main_router.urls
]
