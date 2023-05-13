from django.urls import path
from api.Views.Auth.login import LoginView
from api.Views.Auth.register import UserActivationView, UserRegistrationView
from api.Views.Courses.courses_filter import CoursesFilterView
from api.Views.Enroll.special_sc import SpecificStudentCourseView
from api.Views.Sql.Courses import CoursesSqlView, TruncateCoursesSqlView
from api.Views.Sql.Enrollments import EnrollmentsSqlView, TruncateEnrollmentsSqlView
from api.Views.Sql.Students import StudentsSqlView, TruncateStudentsSqlView
from api.Views.Sql.Teachers import TeachersSqlView, TruncateTeachersSqlView
from api.Views.Students.students_filter import StudentsFilterView

from api.Views.Teachers.teachers_filter import TeachersFilterView
from api.Views.bulk import BulkCourses, BulkStudents, BulkTeachers, BulkUsers
from api.Views.users import UpdateUserRoleView, UserDetailsView, UserList
from .Views.Students.students import StudentsView
from .Views.Students.student import StudentView
from .Views.Teachers.teacher import FullTeacherView
from .Views.Teachers.teachers import TeachersView
from .Views.Courses.course import FullCourseView
from .Views.Courses.courses import CoursesView
from .Views.Courses.filters import CourseFilterView
from .Views.Enroll.student_course import StudentCourseView
from .Views.Students.student_avg_fee import StudentAvgFeeView
from .Views.Teachers.teacher_course import TeacherCountCoursesView
from .Views.Teachers.teacher_add_course import TeacherCoursesAddView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    
    path("students/", StudentsView.as_view(), name = "students"),
    path("students/<int:id>/", StudentView.as_view()),
    path("students/filter/", StudentsFilterView.as_view(), name = "students-filter"),

    path("teachers/", TeachersView.as_view(), name = "teachers"),
    path("teacher/<int:id>/courses", TeacherCoursesAddView.as_view()),
    path("teachers/count/", TeacherCountCoursesView.as_view()),
    path("teachers/<int:id>/", FullTeacherView.as_view()),
    path("teachers/filter/", TeachersFilterView.as_view(), name = "teachers-filter"),

    path("courses/", CoursesView.as_view(), name = "courses"),
    path("courses/<int:id>/", FullCourseView.as_view()),
    path("courses/fee/<int:fee>/", CourseFilterView.as_view(), name = "fee"),
    path("courses/filter/", CoursesFilterView.as_view(), name = "courses-filter"),

    path("enroll/", StudentCourseView.as_view(), name = "enroll"),
    path("enroll/<int:id>/", SpecificStudentCourseView.as_view(), name = "enroll"),

    path("students/avg-fee/", StudentAvgFeeView.as_view()),

    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("register/", UserRegistrationView.as_view(), name="register"),
    path("activate/", UserActivationView.as_view(), name="activate-user"),

    path("profile/<str:id>/", UserDetailsView.as_view(), name="profile"),

    path("users/", UserList.as_view()),

    path("updaterole/<str:id>/", UpdateUserRoleView.as_view()),

    path("database/students/generate/", StudentsSqlView.as_view()),
    path("database/students/truncate/", TruncateStudentsSqlView.as_view()),

    path("database/courses/generate/", CoursesSqlView.as_view()),
    path("database/courses/truncate/", TruncateCoursesSqlView.as_view()),

    path("database/teachers/generate/", TeachersSqlView.as_view()),
    path("database/teachers/truncate/", TruncateTeachersSqlView.as_view()),

    path("database/enrolls/generate/", EnrollmentsSqlView.as_view()),
    path("database/enrolls/truncate/", TruncateEnrollmentsSqlView.as_view()),

    path("bulk/courses/<str:ids>/", BulkCourses.as_view()),
    path("bulk/students/<str:ids>/", BulkStudents.as_view()),
    path("bulk/teachers/<str:ids>/", BulkTeachers.as_view()),
    path("bulk/users/<str:ids>/", BulkUsers.as_view()),
]
