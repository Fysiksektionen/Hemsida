from typing import List

from django.apps import apps
from website.models.content_objects import CONTENT_DB_TYPES, ContentObjectBase


def get_collection_items(content_collection):
    """Returns a list of the items of a ContentCollection with their TRUE datatype.

    NOTE! This is a query heavy operation and one should take care using it in nested situations.
    """
    qs = content_collection.get_value().select_related()

    item_info_list = list(qs.values('id', 'db_type'))
    items_on_db_type = {}
    items_order = {}
    for i, item_info in enumerate(item_info_list):
        if not item_info['db_type'] in items_on_db_type:
            items_on_db_type[item_info['db_type']] = []
        items_on_db_type[item_info['db_type']].append(item_info['id'])
        items_order[item_info['id']] = i

    items_true = []

    for db_type, ids in items_on_db_type.items():
        model = apps.get_model(CONTENT_DB_TYPES[db_type])
        items_true.append(*model.objects.filter(pk__in=ids))

    items_true_sorted = [None] * len(items_true)
    for item in items_true:
        items_true_sorted[items_order[item.pk]] = item

    return items_true_sorted


def get_content_object_trees(page_id: int, root_content_objects: List[ContentObjectBase]) -> List[dict]:
    """Queries the page content objects and builds a tree of objects and their items nested. Converts all
    ContentObjects to their true type. If item is list the 'items̈́' are ordered.

    This method takes at most 9 queries, independent of content-tree structure and size.

    :param int page_id: The id of the page to query objects of.
    :param list root_content_objects: List of content objects that are root of trees.
    :return: List of trees originating from root_content_objects. Each item in the tree is a dictionary with
        {'object': ContentObject, 'db_type': ContentObject.db_type, 'items': [list of sub-items]}
    """

    # Get all CO's of the page.
    ids_and_db_types = ContentObjectBase.objects.filter(parent_page=page_id).values('id', 'db_type')

    # Convert all CO'to their true type.
    # Sort on db_type
    db_type_to_index = {db_type: [] for db_type in CONTENT_DB_TYPES.keys()}
    for i, content_object in enumerate(ids_and_db_types):
        db_type_to_index[content_object['db_type']].append(content_object['id'])

    all_content_objects_as_item = {}
    for db_type, ids in db_type_to_index.items():
        # Query each db_type on indexes and add object_items to dict
        model = apps.get_model(CONTENT_DB_TYPES[db_type])  # Get model
        objects_of_type = list(model.objects.filter(pk__in=ids))  # Query that model

        for content_object in objects_of_type:
            all_content_objects_as_item[content_object.id] = {
                'object': content_object,  # In true model type
                'db_type': db_type
            }
            if db_type in ['dict', 'list']:
                all_content_objects_as_item[content_object.id]['items'] = []

        # Get the items__pk list of each dict or list element.
        if db_type in ['dict', 'list']:
            for id, item_id in model.objects.filter(pk__in=ids).values_list('id', 'items'):
                if item_id is not None:
                    all_content_objects_as_item[id]['items'].append(item_id)

    # Recursive method to build tree.
    def resolve_tree_of_id(root_id):
        tree = all_content_objects_as_item[root_id]
        if tree['db_type'] in ['dict', 'list']:
            tree['items'] = [resolve_tree_of_id(item_id) for item_id in tree['items']]

            # Enforce order if list
            if tree['db_type'] == 'list':
                tree['items'].sort(key=lambda item: item['object'].order)

        return tree

    # Return list with tree for each object
    return [resolve_tree_of_id(root.id) for root in root_content_objects]
