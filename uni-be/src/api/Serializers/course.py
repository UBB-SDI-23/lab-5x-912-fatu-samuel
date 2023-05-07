from rest_framework import serializers
from ..Models.course import Course
from ..Models.teacher import Teacher
from .dynamic import DynamicFieldsModelSerializer
from django.contrib.auth.models import User

class CourseSerializer(DynamicFieldsModelSerializer):
    name = serializers.CharField(max_length = 128)
    description = serializers.CharField(max_length = 512)
    fee = serializers.IntegerField()
    size = serializers.IntegerField()
    teacher = Teacher()
    students_count = serializers.IntegerField(read_only = True)
    added_by = User()

    def validate_fee(self, value):
        if value < 0:
            raise serializers.ValidationError("Fee cannot be negative")
        return value
    
    def validate_size(self, value):
        if value < 0:
            raise serializers.ValidationError("Size cannot be negative")
        return value
    
    class Meta:
        model = Course
        fields = "__all__"
        
        