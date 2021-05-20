from authentication.views.groups import GroupsView, GroupView
from authentication.views.users import UsersView, UserView
from django.urls import path

app_name = 'authentication'

# Url-patterns for website app.
urlpatterns = [
    path('users/', UsersView.as_view(), name='users'),
    path('users/<int:pk>', UserView.as_view(), name='user'),
    path('groups/', GroupsView.as_view(), name='groups'),
    path('groups/<int:pk>', GroupView.as_view(), name='group'),
]
