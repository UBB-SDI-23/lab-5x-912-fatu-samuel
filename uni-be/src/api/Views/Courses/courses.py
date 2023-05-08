import rest_framework.views as RestViews
from api.Models.teacher import Teacher
from api.Serializers.teacher import TeacherSerializer

from django.db.models import Count
from api.Serializers.users import UserSerializer

from api.helpers.consants import PAGE_SIZE
from ...Models.course import Course
from ...Serializers.course import CourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses
from django.contrib.auth.models import User

class CoursesView(RestViews.APIView):
    serializer_class = CourseSerializer

    def get(self, request):
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', PAGE_SIZE))

        objects = Course.objects.filter(
            id__gte = page * page_size - page_size + 1,
            id__lte = page * page_size
        ).annotate(
            students_count = Count('students')
        )

        serializer = CourseSerializer(objects, many = True, exclude_fields = ['students'], depth = 1)

        # check if the serializer contains the actual user or only the id
        # if the user is not in the serializer, then add it
        # if type(serializer.data[0]['added_by']) == int:
        for course in serializer.data:
            course['added_by'] =  UserSerializer(User.objects.get(id = course['added_by'])).data

        # check if the serializer contains the actual teacher or only the id
        # if the teacher is not in the serializer, then add it
        for course in serializer.data:
            if type(course['teacher']) == int:
                course['teacher'] = TeacherSerializer(Teacher.objects.get(id = course['teacher'])).data

        data = {
            'count': Course.objects.count(),
            'next': True if (page * page_size < Course.objects.count()) else None,
            'previous': True if (page > 1) else None,
            'results': serializer.data
        }

        return RestReponses.Response(data, status = status.HTTP_200_OK)  
    
    
    def post(self, request):
        serializer = CourseSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)
    