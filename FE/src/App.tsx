import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowStudents from './components/students/students_all'
import ShowStudent from './components/students/student';
import AddStudent from './components/students/student_add';
import { AppHome } from './components/home/app-home';
import { DeleteStudent } from './components/students/student_delete';

function App() {

    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path="" element={<AppHome />} />
                    <Route path="/students/add" element={<AddStudent />} />
                    <Route path="/students/:studentId" element={<ShowStudent />} />
                    <Route path="/students/:studentId/delete" element={<DeleteStudent />} />
                    <Route path="/students/:studentId/edit" element={<DeleteStudent />} />
                    <Route path="/students" element={<ShowStudents />} />
                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
