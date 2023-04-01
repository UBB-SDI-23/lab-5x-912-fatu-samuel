import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import ShowStudents from './components/students/students_all'
import ShowStudent from './components/students/student';
import AddStudent from './components/students/student_add';
import { AppHome } from './components/home/app-home';

function App() {

    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<AppHome />} />
                    <Route path="/student/add" element={<AddStudent />} />
                    <Route path="/student/:studentId" element={<ShowStudent />} />
                    <Route path="/students" element={<ShowStudents />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default App
