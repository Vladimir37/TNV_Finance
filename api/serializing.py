from django.core import serializers

def serialize(obj):
    result_data = serializers.serialize("json", obj)
    result = {
        'data': result_data
    }
    return result