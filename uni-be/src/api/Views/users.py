from django.db.models import Count
from rest_framework import generics

from api.Models.userprofile import UserProfile
from api.Serializers.userprofile import UserProfileSerializer
from api.Serializers.users import UserDetailSerializer



class UserDetail(generics.RetrieveAPIView[UserProfile]):
    queryset = UserProfile.objects.all().annotate(
        movie_count=Count("user__teacher", distinct=True),
        actor_count=Count("user__student", distinct=True),
        director_count=Count("user__course", distinct=True),
    )
    serializer_class = UserDetailSerializer
    lookup_field = "user_id"
