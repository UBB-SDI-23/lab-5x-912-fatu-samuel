import rest_framework.views as RestViews

from api.pagination.DefaultPagination import DefaultPagination
from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from django.db.models import Avg


class StudentAvgFeeView(RestViews.APIView):
    serializer_class = StudentSerializer
    pagination_class = DefaultPagination

    def get(self, request):

        students = Student.objects.all().values_list('id', flat = True)

        pagination = self.pagination_class()
        page = pagination.paginate_queryset(students, request)

        students = Student.objects.filter(
            id__in = page
        ).annotate(
            avg_fee = Avg('course__fee')
        ).order_by(
            'avg_fee'
        ).reverse()

        serializer = StudentSerializer(students, many = True, exclude_fields = ['courses'])
        return pagination.get_paginated_response(serializer.data)