from django.shortcuts import redirect as django_redirect
from rest_framework import generics, response, status
from rest_framework.generics import get_object_or_404
from utils.serializers import ErrorSerializer
from website.models import Redirect
from website.selectors.pages import get_page_from_path
from website.views.pages import PageSerializer


class PathResolveView(generics.GenericAPIView):
    serializer_class = PageSerializer

    def get(self, request, *args, **kwargs):
        """Retrieve page of path specified as GET-parameter, else return Response with temporary redirect."""

        path = request.GET.get('path', None)
        if path is not None:  # Path given

            # Add leading slash if not present
            if path == "" or path[0] != '/':
                path = '/' + path

            # Check if we have page at URL
            page = get_page_from_path(path)
            print(path, page)
            if page is None:  # No direct page-match
                # Look for redirect to path, else raise Http404
                redirect = get_object_or_404(Redirect.objects.all(), from_path=path)

                if not redirect.is_internal:  # Redirect is external
                    return django_redirect(redirect.link)
                else:
                    page = redirect.page

            # Check and raise errors
            self.check_object_permissions(request, page)

            # Serialize and return page
            serializer = self.get_serializer(instance=page)
            return response.Response(serializer.data)

        else:  # No path given
            serializer = ErrorSerializer(data={'message': "No path was given in GET-parameters"})
            serializer.is_valid(raise_exception=True)
            return response.Response(
                serializer.data,
                status=status.HTTP_400_BAD_REQUEST
            )


