import rest_framework.views as RestViews

from api.pagination.DefaultPagination import DefaultPagination
from ...Models.teacher import Teacher
from ...Serializers.teacher import TeacherSerializer
from rest_framework import status
import rest_framework.response as RestReponses


class TeachersFilterView(RestViews.APIView):
    serializer_class = TeacherSerializer

    def get(self, request):
        objects = Teacher.objects.all()

        search_param = request.query_params.get('search', None)

        if search_param is not None:
            objects = objects.filter(name__icontains = search_param)
        else:
            objects = objects.all()
        
        objects = objects.order_by('name')[:10]

        serializer = TeacherSerializer(objects, many = True, exclude_fields = ['courses'])
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)
    