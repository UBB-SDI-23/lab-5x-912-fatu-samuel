import rest_framework.views as RestViews

from api.pagination.DefaultPagination import DefaultPagination
from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from django.db.models import Avg
import rest_framework.response as RestReponses
from rest_framework import status


class StudentAvgFeeView(RestViews.APIView):
    serializer_class = StudentSerializer
    pagination_class = DefaultPagination

    def get(self, request):

        students = Student.objects.annotate(
            avg_fee = Avg('course__fee')
        ).order_by(
            'avg_fee'
        ).reverse()

        pagination = self.pagination_class()
        page = pagination.paginate_queryset(students, request)

        serializer = StudentSerializer(page, many = True, exclude_fields = ['courses'])
        return pagination.get_paginated_response(serializer.data)