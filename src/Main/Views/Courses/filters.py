from rest_framework import status
import rest_framework.response as RestReponses
import rest_framework.views as RestViews
from ...Models.course import Course
from ...Serializers.course import CourseSerializer

class CourseFilterView(RestViews.APIView):
    serializer_class = CourseSerializer

    def get(self, request, fee: int):
        courses = Course.objects.filter(fee__gte = fee)
        serializer = CourseSerializer(courses, exclude_fields = ['students', 'teacher'], many = True)
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)
    
