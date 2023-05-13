import rest_framework.views as RestViews
from api.Models.course import Course
from api.Models.student import Student
from api.Models.teacher import Teacher
from django.contrib.auth.models import User
import rest_framework.response as RestReponses
from rest_framework import status
from api.Models.userprofile import UserProfile
from api.permissions import IsAdminOrReadOnly


class GenericBulk(RestViews.APIView):
    permission_classes = [IsAdminOrReadOnly]
    object = None

    def __init__(self, _object):
        self.object = _object
        print(self.object)

    def delete(self, request, *args, **kwargs):
        self.check_permissions(request)

        ids = kwargs.get('ids')

        if not ids:
            return RestReponses.Response(status=status.HTTP_204_NO_CONTENT)

        ids_list = ids.split(',')
        queryset = self.object.objects.filter(id__in = ids_list)
        queryset.delete()

        return RestReponses.Response(status=status.HTTP_200_OK)


class BulkCourses(GenericBulk):
    def __init__(self):
        super().__init__(Course)


class BulkStudents(GenericBulk):
    def __init__(self):
        super().__init__(Student)


class BulkTeachers(GenericBulk):
    def __init__(self):
        super().__init__(Teacher)


class BulkUsers(GenericBulk):
    def __init__(self):
        super().__init__(UserProfile)