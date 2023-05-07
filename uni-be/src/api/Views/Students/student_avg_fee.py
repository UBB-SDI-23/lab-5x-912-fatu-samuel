import rest_framework.views as RestViews
from api.helpers.consants import PAGE_SIZE
from django.core.cache import cache

from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from django.db.models import Avg
from rest_framework import status
import rest_framework.response as RestReponses

class StudentAvgFeeView(RestViews.APIView):
    serializer_class = StudentSerializer
    
    def get(self, request):
        page = int(request.GET.get('page', 1))

        students = Student.objects.filter(
            id__lte = 1000
        ).annotate(
            avg_fee = Avg('course__fee')
        ).order_by(
            '-avg_fee'
        )[page * PAGE_SIZE - 9:page * PAGE_SIZE]

        serializer = StudentSerializer(students, many = True, exclude_fields = ['courses'])
        data = {
            'count': Student.objects.count(),
            'next': True if (page * PAGE_SIZE < Student.objects.count()) else None,
            'previous': True if (page > 1) else None,
            'results': serializer.data
        }
        return RestReponses.Response(data, status = status.HTTP_200_OK)