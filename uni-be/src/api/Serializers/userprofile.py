from collections import OrderedDict
from typing import Any
from rest_framework import serializers

from django.contrib.auth.models import User
from api.Serializers.users import UserSerializer
from ..Models.userprofile import UserProfile
from .dynamic import DynamicFieldsModelSerializer

class UserProfileSerializer(DynamicFieldsModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = (
            "user",
            "first_name",
            "last_name",
            "date_of_birth",
            "bio",
            "location",
            "activation_code",
            "activation_expiry_date",
            "active",
        )

    def create(self, validated_data: OrderedDict[str, Any]) -> UserProfile:
        user_data = validated_data.pop("user")
        user = User.objects.create_user(**user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile