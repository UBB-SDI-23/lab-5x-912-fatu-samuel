import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowStudents from './components/students/students_all'
import ShowStudent from './components/students/student';
import AddStudent from './components/students/student_add';

function App() {

    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path="/students/add" element={<AddStudent />} />
                    <Route path="/students/:studentId" element={<ShowStudent />} />
                    <Route path="/students" element={<ShowStudents />} />
                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
