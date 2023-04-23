import rest_framework.views as RestViews

from api.pagination.DefaultPagination import DefaultPagination
from ...Models.teacher import Teacher
from django.db.models import Count
import rest_framework.response as RestReponses
from rest_framework import status
from ...Models.course import Course
from ...Serializers.teacher import TeacherSerializer


class TeacherCountCoursesView(RestViews.APIView):
    serializer_class = TeacherSerializer
    pagination_class = DefaultPagination

    def get(self, request):

        teachers = Teacher.objects.all().values_list('id', flat = True)

        pagination = self.pagination_class()
        page = pagination.paginate_queryset(teachers, request)

        teachers = Teacher.objects.filter(
            id__in = page
        ).annotate(
            courses_count = Count('courses')
        ).order_by(
            'courses_count'
        ).reverse()


        serializer = TeacherSerializer(teachers, many = True, exclude_fields = ['courses'])
        return pagination.get_paginated_response(serializer.data)