import rest_framework.views as RestViews

from django.db.models import Count

from api.helpers.consants import PAGE_SIZE
from ...Models.teacher import Teacher
from ...Serializers.teacher import TeacherSerializer
from rest_framework import status
import rest_framework.response as RestReponses
from django.contrib.auth.models import User
from api.Serializers.users import UserSerializer

class TeachersView(RestViews.APIView):
    serializer_class = TeacherSerializer

    def get(self, request):
        page = int(request.GET.get('page', 1))

        objects = Teacher.objects.filter(
            id__gte = page * PAGE_SIZE - 9,
            id__lte = page * PAGE_SIZE
        ).annotate(
            courses_count = Count('courses')
        )

        serializer = TeacherSerializer(objects, many = True, exclude_fields = ['courses'], depth = 1)

        # check if the serializer contains the actual user or only the id
        # if the user is not in the serializer, then add it
        if type(serializer.data[0]['added_by']) == int:
            for teacher in serializer.data:
                teacher['added_by'] =  UserSerializer(User.objects.get(id = teacher['added_by'])).data

        data = {
            'count': Teacher.objects.count(),
            'next': True if (page * PAGE_SIZE < Teacher.objects.count()) else None,
            'previous': True if (page > 1) else None,
            'results': serializer.data
        }

        return RestReponses.Response(data, status = status.HTTP_200_OK)
    

    def post(self, request):
        serializer = TeacherSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)