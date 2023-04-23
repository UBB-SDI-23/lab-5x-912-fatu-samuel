from rest_framework import status
import rest_framework.response as RestReponses
import rest_framework.views as RestViews

from api.pagination.DefaultPagination import DefaultPagination
from ...Models.course import Course
from ...Serializers.course import CourseSerializer

class CourseFilterView(RestViews.APIView):
    serializer_class = CourseSerializer
    pagination_class = DefaultPagination

    def get(self, request, fee: int):
        courses = Course.objects.all().values_list('id', flat = True)

        pagination = self.pagination_class()
        page = pagination.paginate_queryset(courses, request)

        courses = Course.objects.filter(id__in = page, fee__gte = fee)
        serializer = CourseSerializer(courses, exclude_fields = ['students', 'teacher'], many = True)
        return pagination.get_paginated_response(serializer.data)
