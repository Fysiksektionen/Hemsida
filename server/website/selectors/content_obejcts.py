from django.apps import apps
from website.models.content_objects import CONTENT_DB_TYPES


def get_collection_items(content_collection):
    """Returns a list of the items of a ContentCollection with their TRUE datatype.

    NOTE! This is a query heavy operation and one should take care using it in nested situations.
    """
    # TODO: Generalize this method so you can specify a queryable attribute and a dictionary of value <-> class.
    #       Needed for Menus/MenuItems and in future also Pages/News/Ads.

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
