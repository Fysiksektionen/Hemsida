from django.urls import path, include
from website.views.menus import menus_list, menu_object

app_name = 'website'

urlpatterns_menus = ([
    path('', menus_list, name='list'),
    path('<int:pk>/', menu_object, name='object')
], 'menus')

urlpatterns = [
    path('menus/', include(urlpatterns_menus, namespace='menus'))
]
