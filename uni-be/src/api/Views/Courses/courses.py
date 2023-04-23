import rest_framework.views as RestViews

from api.pagination.DefaultPagination import DefaultPagination
from django.db.models import Count
from ...Models.course import Course
from ...Serializers.course import CourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses

class CoursesView(RestViews.APIView):
    serializer_class = CourseSerializer
    pagination_class = DefaultPagination

    def get(self, request):
        objects = Course.objects.all().annotate(students_count = Count('students'))

        pagination = self.pagination_class()
        page = pagination.paginate_queryset(objects, request)

        serializer = CourseSerializer(page, many = True, exclude_fields = ['students'], depth = 1)
        return  pagination.get_paginated_response(serializer.data)
    
    
    def post(self, request):
        serializer = CourseSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)
    