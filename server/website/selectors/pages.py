from website.models import Page, SiteModel


def get_path_page_dict(page=None, current_path="") -> dict:
    """Recursive function to get dictionary of all paths and respective page.id of the page-tree under a page.

    :parameter Page page: Page at root of tree searched. (default: SiteModel.root_page).
    :parameter str current_path: Path added before page.slug.
    """
    if page is None:
        page = SiteModel.instance().root_page

    current_path = current_path + (page.slug or "") + "/"

    path_id_dict = {
        current_path: page.id
    }
    for sub_page in page.children.all():
        path_id_dict.update(get_path_page_dict(sub_page, current_path))

    return path_id_dict


def get_path_page_dict_2(root=None, current_path="") -> dict:
    """Get dictionary of all paths and respective page.id of the page-tree under a page.

    :parameter Page root: Page at root of tree searched.
    :parameter str current_path: Path added before page.slug.
    """
    if root is None:
        root = SiteModel.instance().root_page

    # Get all pages with info required
    all_pages = {
        page['id']: {
            'slug': page['slug'],
            'parent': page['parent'],
            'full_path': ''
        }
        for page in Page.objects.all().values('id', 'slug', 'parent')
    }
    path_id_dict = {}

    for page_id, page_data in all_pages.items():
        full_path = (page_data['slug'] or "") + '/'
        parent = page_data['parent']
        while parent is not None:
            parent_data = all_pages[parent]
            if parent_data['full_path']:
                full_path = parent_data['full_path'] + full_path
                break
            else:
                full_path = parent_data['full_path'] + '/' + full_path
                parent = parent_data['parent']

        all_pages[page_id]['full_path'] = full_path
        path_id_dict[full_path] = page_id

    return path_id_dict


def get_page_from_path(path):
    """Returns the page relating to the given (full) path.

    :parameter str path: Full path starting at SiteModel.root_page.
    :return Page: Page at path. None if no page is found at path.
    """
    if not isinstance(path, str):
        raise TypeError("Path must be string")
    if path == "" or path[-1] != '/':
        path += '/'

    path_page_dict = get_path_page_dict()
    id = path_page_dict.get(path, None)
    return Page.objects.get(id=id) if id is not None else None

