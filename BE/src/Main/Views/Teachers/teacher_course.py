import rest_framework.views as RestViews
from ...Models.teacher import Teacher
from django.db.models import Count
import rest_framework.response as RestReponses
from rest_framework import status
from ...Models.course import Course
from ...Serializers.teacher import TeacherSerializer


class TeacherCountCoursesView(RestViews.APIView):
    serializer_class = TeacherSerializer

    def get(self, request):

        teachers = Teacher.objects.annotate(
            count_courses = Count('courses')
        ).order_by(
            'count_courses'
        )

        serializer = TeacherSerializer(teachers, many = True, exclude_fields = ['courses'])
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)
