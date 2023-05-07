from django.db.models import Count
from rest_framework import generics
import rest_framework.views as RestViews

from api.Models.userprofile import UserProfile
from api.Serializers.userprofile import UserProfileSerializer
from api.Serializers.users import UserDetailSerializer
from rest_framework import status
import rest_framework.response as RestReponses


class UserDetailsView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all().annotate(
        student_count=Count("user__student", distinct=True),
        course_count=Count("user__course", distinct=True),
        teacher_count=Count("user__teacher", distinct=True),
    )
    serializer_class = UserDetailSerializer
    lookup_field = "id"
    


