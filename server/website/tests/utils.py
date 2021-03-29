"""Utils specific to the website model."""
import uuid

from website.models import *


def create_test_page(**kwargs):
    """Helper method to create pages for testing.

    Any page attribute can be given in kwargs to override default values.

    :raises `ValidationError` if any of the kwargs are invalid as parameters to the Page
    :raises `TypeError` if any of the kwargs are not valid in `__init__` of the Page model.

    :return Page object already saved in the database.
    """

    # Init required attributes
    url = kwargs.get('url', None)
    if url is None:
        urls = Page.objects.all().values_list('url', flat=True)
        while url is None or url in urls:
            url = "https://f.kth.se/test_" + str(uuid.uuid4())

    kwargs.setdefault('url', url)
    kwargs.setdefault('name', 'test_' + str(uuid.uuid4())[:5])
    kwargs.setdefault('page_type', 'test_page')

    # Create page instance
    page = Page(**kwargs)

    # Clean so that validation error occur if kwargs are invalid.
    page.full_clean()

    # Save page (only reached if no validation errors).
    page.save()

    return page
