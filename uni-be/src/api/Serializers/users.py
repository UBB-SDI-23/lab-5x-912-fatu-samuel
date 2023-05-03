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
        )

class UserDetailSerializer(DynamicFieldsModelSerializer):
    username = serializers.CharField(max_length = 128)
    teacher_count = serializers.IntegerField(read_only = True)
    courses_count = serializers.IntegerField(read_only = True)
    students_count = serializers.IntegerField(read_only = True)

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
            "courses_count",
            "students_count",
        )