import rest_framework.views as RestViews

from django.db.models import Count
from api.helpers.consants import PAGE_SIZE
from api.pagination.DefaultPagination import DefaultPagination
from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from rest_framework import status
import rest_framework.response as RestReponses

class StudentsView(RestViews.APIView):
    serializer_class = StudentSerializer
    
    def get(self, request):
        page = int(request.GET.get('page', 1))

        objects = Student.objects.filter(
            id__gte = page * PAGE_SIZE - 9,
            id__lte = page * PAGE_SIZE
        ).annotate(
            courses_count = Count('courses')
        )

        serializer = StudentSerializer(objects, many = True, exclude_fields = ['courses'])

        data = {
            'count': Student.objects.count(),
            'next': True if (page * PAGE_SIZE < Student.objects.count()) else None,
            'previous': True if (page > 1) else None,
            'results': serializer.data
        }
        return RestReponses.Response(data, status = status.HTTP_200_OK)
    

    def post(self, request):
        serializer = StudentSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)
    