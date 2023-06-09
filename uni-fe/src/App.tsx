import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewAllStudents from './components/students/ViewAllStudents'
import ViewStudent from './components/students/ViewStudent';
import AddStudent from './components/students/AddStudent';
import { AppHome } from './components/home/AppHome';
import { DeleteStudent } from './components/students/DeleteStudent';
import { UpdateStudent } from './components/students/UpdateStudent';
import ViewStudentsAvgFee from './components/statistics/ViewStudentsAvgFee';
import { AppMenu } from './components/navigation/AppMenu';
import ViewAllTeachers from './components/teachers/ViewAllTeachers';
import AddTeacher from './components/teachers/AddTeacher';
import ViewTeacher from './components/teachers/ViewTeacher';
import { UpdateTeacher } from './components/teachers/UpdateTeacher';
import { DeleteTeacher } from './components/teachers/DeleteTeacher';
import { ViewAllCourses } from './components/courses/ViewAllCourses';
import { ViewCourse } from './components/courses/ViewCourse';
import { AddCourse } from './components/courses/AddCourse';
import { DeleteCourse } from './components/courses/DeleteCourse';
import { UpdateCourse } from './components/courses/UpdateCourse';
import { ViewEnrollments } from './components/enrollment/ViewEnrollments';
import { AddEnroll } from './components/enrollment/AddEnroll';
import { DeleteEnroll } from './components/enrollment/DeleteEnroll';
import ViewEnroll from './components/enrollment/ViewEnroll';
import { UpdateEnroll } from './components/enrollment/UpdateEnroll';
import ViewStatistics from './components/statistics/ViewStatistics';
import { ViewTeachersWCourses } from './components/statistics/ViewTeachersWCourses';
import { FilterCoursesByFee } from './components/statistics/FilterCoursesByFee';
import { RegistrationForm } from './components/auth/Register';
import { ActivateAccount } from './components/auth/Activate';
import { LoginForm } from './components/auth/Login';

function App() {

    return (
        <React.Fragment>
            <Router>

                <AppMenu />

                <Routes>
                    <Route path="" element={<AppHome />} />

                    <Route path="/students" element={<ViewAllStudents />} />
                    <Route path="/students/add" element={<AddStudent />} />
                    <Route path="/students/:studentId" element={<ViewStudent />} />
                    <Route path="/students/:studentId/update" element={<UpdateStudent />} />
                    <Route path="/students/:studentId/delete" element={<DeleteStudent />} />

                    <Route path="/statistics" element={<ViewStatistics />} />
                    <Route path="/statistics/avg-fee" element={<ViewStudentsAvgFee />} />
                    <Route path="/statistics/teachers" element={<ViewTeachersWCourses />} />
                    <Route path="/statistics/filter-fee" element={<FilterCoursesByFee />} />


                    <Route path="/teachers" element={<ViewAllTeachers />} />
                    <Route path="/teachers/add" element={<AddTeacher />} />
                    <Route path="/teachers/:teacherId" element={<ViewTeacher />} />
                    <Route path="/teachers/:teacherId/update" element={<UpdateTeacher />} />
                    <Route path="/teachers/:teacherId/delete" element={<DeleteTeacher />} />

                    <Route path="/courses" element={<ViewAllCourses />} />
                    <Route path="/courses/add" element={<AddCourse />} />
                    <Route path="/courses/:courseId" element={<ViewCourse />} />
                    <Route path="/courses/:courseId/update" element={<UpdateCourse />} />
                    <Route path="/courses/:courseId/delete" element={<DeleteCourse />} />


                    <Route path="/enrollments" element={<ViewEnrollments />} />
                    <Route path="/enrollments/add" element={<AddEnroll />} />
                    <Route path="/enrollments/:enrollId" element={<ViewEnroll />} />
                    <Route path="/enrollments/:enrollId/delete" element={<DeleteEnroll />} />
                    <Route path="/enrollments/:enrollId/update" element={<UpdateEnroll />} />

                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/activate/:activationCode" element={<ActivateAccount />} />
                    <Route path="/login" element={<LoginForm />} />

                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
