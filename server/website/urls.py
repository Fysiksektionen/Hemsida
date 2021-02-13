from rest_framework.routers import DefaultRouter
from website.views.menus import MenuViewSet, MenuItemViewSet

app_name = 'website'

# Routs/urls for menus and menu-items
menu_router = DefaultRouter()
menu_router.register(r'menus', MenuViewSet, basename='menu')  # menu-list
menu_router.register(r'menus', MenuItemViewSet, basename='menu')  # menu-detail

# Url-patterns for website app.
urlpatterns = [
    *menu_router.urls
]
