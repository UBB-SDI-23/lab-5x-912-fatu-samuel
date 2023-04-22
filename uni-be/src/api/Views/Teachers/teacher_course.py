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

        teachers = Teacher.objects.annotate(
            count_courses = Count('courses')
        ).order_by(
            'count_courses'
        )

        pagination = self.pagination_class()
        page = pagination.paginate_queryset(teachers, request)

        serializer = TeacherSerializer(page, many = True, exclude_fields = ['courses'])
        return pagination.get_paginated_response(serializer.data)