from website.models import Page, SiteModel


def _get_path_page_dict(root=None, root_path="") -> dict:
    """Get dictionary of all paths and respective page.id of the page-tree under a page.

    :parameter Page root: Page at root of tree searched. (default: SiteModel.root_page)
    :parameter str root_path: Path added before page.slug. (default: "")
    :returns dict: Dictionary with full_path: page_id pairs. Only contains pages with path-root in root page.
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

    def get_full_path(page_id):
        # Already calculated
        page_data = all_pages[page_id]
        if page_data['full_path']:
            return page_data['full_path']
        # Add parent.full_path to slug and save as full_path.
        else:
            if page_data['parent'] is None:
                if page_id == root.id:
                    full_path = root_path + (page_data['slug'] or "") + '/'
                else:
                    full_path = None
            else:
                parent_path = get_full_path(page_data['parent'])
                full_path = parent_path + (page_data['slug'] or "") + '/' if parent_path is not None else None

            all_pages[page_id]['full_path'] = full_path
            return full_path

    for id in all_pages.keys():
        path = get_full_path(id)
        if path is not None:
            path_id_dict[path] = id

    return path_id_dict


def get_page_from_path(path):
    """Returns the page relating to the given (full) path.

    :parameter str path: Full path starting at SiteModel.root_page.
    :returns Page: Page at path. None if no page is found at path.
    """
    if not isinstance(path, str):
        raise TypeError("Path must be string")
    if path == "" or path[-1] != '/':
        path += '/'

    path_page_dict = _get_path_page_dict()
    page_id = path_page_dict.get(path, None)
    return Page.objects.get(id=page_id) if page_id is not None else None

