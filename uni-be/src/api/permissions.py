from typing import Any, cast

from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import APIView


class HasEditPermissionOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request: Request, view: APIView, obj: Any) -> bool:
        print("has_permission")
        if request.method in permissions.SAFE_METHODS:
            return True

        user = request.user
        if type(user) != User:
            return False

        if not hasattr(user, "profile"):
            return False

        if user.profile.role == "regular": 
            # todo: de crapa, pune cast la bool
            return obj.added_by == request.user

        # Moderators and admins can edit everything
        return True
    


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request: Request, view: APIView) -> bool:
        if request.method in permissions.SAFE_METHODS:
            return True

        user = request.user
        if type(user) != User:
            return False

        if not hasattr(user, "profile"):
            return False
        
        return user.profile.role == "admin" 
