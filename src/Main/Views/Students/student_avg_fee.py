import rest_framework.views as RestViews
from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from django.db.models import Avg
import rest_framework.response as RestReponses
from rest_framework import status


class StudentAvgFeeView(RestViews.APIView):
    serializer_class = StudentSerializer
    
    def get(self, request):

        students = Student.objects.annotate(
            avg_fee = Avg('course__fee')
        ).order_by(
            'avg_fee'
        ).reverse()

        serializer = StudentSerializer(students, many = True, exclude_fields = ['courses'])
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)
