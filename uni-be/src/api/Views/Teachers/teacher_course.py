import rest_framework.views as RestViews

from api.helpers.consants import PAGE_SIZE
from django.core.cache import cache

from ...Models.teacher import Teacher
from django.db.models import Count
import rest_framework.response as RestReponses
from rest_framework import status
from ...Models.course import Course
from ...Serializers.teacher import TeacherSerializer


class TeacherCountCoursesView(RestViews.APIView):
    serializer_class = TeacherSerializer

    def get(self, request):
        page = int(request.GET.get('page', 1))

        teachers = Teacher.objects.filter(
            id__lte = 1000
        ).annotate(
            courses_count = Count('courses')
        ).order_by(
            '-courses_count'
        )[page * PAGE_SIZE - 9:page * PAGE_SIZE]

        serializer = TeacherSerializer(teachers, many = True, exclude_fields = ['courses'])
        data = {
            'count': Teacher.objects.count(),
            'next': True if (page * PAGE_SIZE < Teacher.objects.count()) else None,
            'previous': True if (page > 1) else None,
            'results': serializer.data
        }
        
        return RestReponses.Response(data, status = status.HTTP_200_OK)