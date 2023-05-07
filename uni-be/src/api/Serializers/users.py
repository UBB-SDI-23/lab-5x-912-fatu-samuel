from rest_framework import serializers

from api.Models.userprofile import UserProfile
from .dynamic import DynamicFieldsModelSerializer
from django.contrib.auth.models import User

class UserSerializer(DynamicFieldsModelSerializer):
  
    def validate_password(self, value):
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError('Password must contain at least one digit.')
        
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError('Password must contain at least one uppercase letter.')

        return value

    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "id"
        )


class UserDetailSerializer(DynamicFieldsModelSerializer):
    username = serializers.SerializerMethodField()
    teacher_count = serializers.IntegerField(read_only = True)
    course_count = serializers.IntegerField(read_only = True)
    student_count = serializers.IntegerField(read_only = True)

    def get_username(self, user_profile: UserProfile) -> str:
        return user_profile.user_id

    class Meta:
        model = UserProfile
        fields = (
            "username",
            "first_name",
            "last_name",
            "date_of_birth",
            "bio",
            "location",
            "teacher_count",
            "course_count",
            "student_count",
        )