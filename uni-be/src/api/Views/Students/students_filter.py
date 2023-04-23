import rest_framework.views as RestViews

from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from rest_framework import status
import rest_framework.response as RestReponses


class StudentsFilterView(RestViews.APIView):
    serializer_class = StudentSerializer

    def get(self, request):
        objects = Student.objects.all()

        search_param = request.query_params.get('search', None)

        if search_param is not None:
            objects = objects.filter(name__icontains = search_param)
        else:
            objects = objects.all()
        
        objects = objects.order_by('name')[:10]

        serializer = StudentSerializer(objects, many = True, exclude_fields = ['courses'])
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)
    