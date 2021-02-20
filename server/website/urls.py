from rest_framework.routers import DefaultRouter
from website.views.menus import MenuViewSet

app_name = 'website'

# Routs/urls for menus and menu-items
menu_router = DefaultRouter()
menu_router.register(r'menus', MenuViewSet, basename='menu')  # menu-list

# Url-patterns for website app.
urlpatterns = [
    *menu_router.urls
]
