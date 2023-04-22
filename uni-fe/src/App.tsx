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

function App() {

    return (
        <React.Fragment>
            <Router>

                <AppMenu />

                <Routes>
                    <Route path="" element={<AppHome />} />
                    <Route path="/students/add" element={<AddStudent />} />
                    <Route path="/students/:studentId" element={<ViewStudent />} />
                    <Route path="/students/:studentId/delete" element={<DeleteStudent />} />
                    <Route path="/students/:studentId/update" element={<UpdateStudent />} />
                    <Route path="/students" element={<ViewAllStudents />} />
                    <Route path="/students/avg-fee" element={<ViewStudentsAvgFee />} />


                    <Route path="/teachers" element={<ViewAllTeachers />} />
                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
