from django.urls import path
from .Views.Students.students import StudentsView
from .Views.Students.student import StudentView
from .Views.Teachers.teacher import FullTeacherView
from .Views.Teachers.teachers import TeachersView
from .Views.Courses.course import FullCourseView
from .Views.Courses.courses import CoursesView
from .Views.Courses.filters import CourseFilterView
from .Views.student_course import StudentCourseView
from .Views.Students.student_avg_fee import StudentAvgFeeView
from .Views.Teachers.teacher_course import TeacherCountCoursesView
from .Views.Teachers.teacher_add_course import TeacherCoursesAddView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


urlpatterns = [
    
    path("students/", StudentsView.as_view(), name = "students"),
    path("students/<int:id>/", StudentView.as_view()),
    path("teachers/", TeachersView.as_view(), name = "teachers"),
    path("teacher/<int:id>/courses", TeacherCoursesAddView.as_view()),
    path("teachers/count/", TeacherCountCoursesView.as_view()),
    path("teachers/<int:id>/", FullTeacherView.as_view()),
    path("courses/", CoursesView.as_view(), name = "courses"),
    path("courses/<int:id>/", FullCourseView.as_view()),
    path("courses/fee/<int:fee>/", CourseFilterView.as_view(), name = "fee"),
    path("enroll/", StudentCourseView.as_view(), name = "enroll"),
    path("students/avg-fee/", StudentAvgFeeView.as_view()),
]
