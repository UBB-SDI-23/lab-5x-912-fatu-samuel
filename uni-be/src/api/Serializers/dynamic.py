from rest_framework import serializers

class DynamicFieldsModelSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):

        kwargs.pop('fields', None)
        
        include_fields = kwargs.pop('include_fields', None)
        exclude_fields = kwargs.pop('exclude_fields', None)
        depth = kwargs.pop('depth', None)

        super().__init__(*args, **kwargs)

        # safeguards
        if include_fields is None:
            include_fields = []

        if exclude_fields is None:
            exclude_fields = []

        if depth is None:
            depth = 0
        # end safeguards

        for field in include_fields:
            self.fields.append(field)

        for field in exclude_fields:
            split = field.split('__')
            to_access = self.fields

            for i in range(len(split)-1):
                to_access = to_access.get(split[i])

            if isinstance(to_access, serializers.ListSerializer):
                to_access = to_access.child

            try:
                to_access.fields.pop(split[-1])
            except KeyError:
                print(f'KeyError: {split[-1]} does not exist in {to_access}')
                
        self.Meta.depth = depth

        


