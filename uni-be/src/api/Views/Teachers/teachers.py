import rest_framework.views as RestViews

from api.pagination.DefaultPagination import DefaultPagination
from ...Models.teacher import Teacher
from ...Serializers.teacher import TeacherSerializer
from rest_framework import status
import rest_framework.response as RestReponses


class TeachersView(RestViews.APIView):
    serializer_class = TeacherSerializer
    pagination_class = DefaultPagination

    def get(self, request):
        objects = Teacher.objects.all()

        pagination = self.pagination_class()
        page = pagination.paginate_queryset(objects, request)

        serializer = TeacherSerializer(page, many = True, exclude_fields = ['courses'])
        return pagination.get_paginated_response(serializer.data)
    

    def post(self, request):
        serializer = TeacherSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)