import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewAllStudents from './components/students/ViewAllStudents'
import ViewStudent from './components/students/ViewStudent';
import AddStudent from './components/students/AddStudent';
import { AppHome } from './components/home/AppHome';
import { DeleteStudent } from './components/students/DeleteStudent';
import { UpdateStudent } from './components/students/UpdateStudent';
import ViewStudentsAvgFee from './components/students/ViewStudentsAvgFee';
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

                    <Route path="/students/avg-fee" element={<ViewStudentsAvgFee />} />


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

                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
