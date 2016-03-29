from django.core import serializers
from django.db.models.query import QuerySet

def serialize(obj):
    result_data = recursive_convert(obj)
    result = {
        'data': result_data
    }
    return result


def recursive_convert(obj):
    if not isinstance(obj, (list, QuerySet)):
        for elem in obj:
            if not isinstance(obj[elem], (list, QuerySet)):
                recursive_convert(obj[elem])
            else:
                obj[elem] = serializers.serialize("json", obj[elem])
    else:
        obj = serializers.serialize("json", obj)

    return obj