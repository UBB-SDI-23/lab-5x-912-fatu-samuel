import rest_framework.views as RestViews

from django.db.models import Count
from api.pagination.DefaultPagination import DefaultPagination
from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from rest_framework import status
import rest_framework.response as RestReponses

class StudentsView(RestViews.APIView):
    serializer_class = StudentSerializer
    pagination_class = DefaultPagination
    
    def get(self, request):
        objects = Student.objects.all()

        pagination = self.pagination_class()
        page = pagination.paginate_queryset(objects, request)

        objects = Student.objects.filter(id__in = [course.id for course in page]).annotate(courses_count = Count('courses'))
        serializer = StudentSerializer(objects, many = True, exclude_fields = ['courses'])
        return pagination.get_paginated_response(serializer.data)
    

    def post(self, request):
        serializer = StudentSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)
    