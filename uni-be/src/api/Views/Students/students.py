import rest_framework.views as RestViews

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Count
from api.Serializers.users import UserSerializer
from api.helpers.consants import PAGE_SIZE
from api.pagination.DefaultPagination import DefaultPagination
from api.permissions import HasEditPermissionOrReadOnly
from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from rest_framework import status
import rest_framework.response as RestReponses
from django.contrib.auth.models import User

class StudentsView(RestViews.APIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get(self, request):
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', PAGE_SIZE))

        objects = Student.objects.filter(
            id__gte = page * page_size - page_size + 1,
            id__lte = page * page_size
        ).annotate(
            courses_count = Count('courses')
        )

        serializer = StudentSerializer(objects, many = True, exclude_fields = ['courses'], depth = 1)

        # check if the serializer contains the actual user or only the id
        # if the user is not in the serializer, then add it
        if len(serializer.data) > 0 and type(serializer.data[0]['added_by']) == int:
            for student in serializer.data:
                student['added_by'] =  UserSerializer(User.objects.get(id = student['added_by'])).data

        data = {
            'count': Student.objects.count(),
            'next': True if (page * page_size < Student.objects.count()) else None,
            'previous': True if (page > 1) else None,
            'results': serializer.data
        }
        return RestReponses.Response(data, status = status.HTTP_200_OK)
    

    def post(self, request):
        self.check_permissions(request)
        serializer = StudentSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)
    