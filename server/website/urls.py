from rest_framework.routers import DefaultRouter
from website.views.menus import MenuViewSet
from website.views.redirects import RedirectViewSet

app_name = 'website'

# Routs/urls for menus and menu-items
menu_router = DefaultRouter()
menu_router.register(r'menus', MenuViewSet, basename='menu')

redirect_router = DefaultRouter()
redirect_router.register(r'redirects', RedirectViewSet, basename='redirect')

# Url-patterns for website app.
urlpatterns = [
    *menu_router.urls,
    *redirect_router.urls
]
