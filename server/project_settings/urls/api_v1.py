"""URL configuration for /api/v1/ endpoint

Add routers, views and viewsets here to include them in the api.

As this is a global file you should in the general case include
urls.py from each app and *not* reference a view directly.

Follow the following guidelines:
- Always create a name/namespace four your include.
- Only include url files that are intended for use in api_v1.
"""

from django.urls import path, include

app_name = 'api_v1'

urlpatterns = [
    path('', include('authentication.urls')),
    path('', include('website.urls'))
]
