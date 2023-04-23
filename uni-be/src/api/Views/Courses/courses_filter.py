import rest_framework.views as RestViews

from ...Models.course import Course
from ...Serializers.course import CourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses


class CoursesFilterView(RestViews.APIView):
    serializer_class = CourseSerializer

    def get(self, request):
        objects = Course.objects.all()

        search_param = request.query_params.get('search', None)

        if search_param is not None:
            objects = objects.filter(name__icontains = search_param)
        else:
            objects = objects.all()
        
        objects = objects.order_by('name')[:10]

        serializer = CourseSerializer(objects, many = True, exclude_fields = ['courses'], depth = 1)
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)
    