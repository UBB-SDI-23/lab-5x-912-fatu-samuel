import { useEffect, useState } from "react"
import { Student } from "../../models/student";
import { API_URL } from "../../main";

const ShowStudents = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        console.log('useEffect');
        fetch(`${API_URL}/students/`)
            .then(res => res.json())
            .then(data => {
                setStudents(data)
                console.log(data);
            });
    }, [])

    if (students.length == 0) {
        return <div>No students found</div>
    }

    // use @mui/material to style the table
    return (
        <div>
            <h1>Students List</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>CNP</th>
                        <th>Date of birth</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student: Student, index) => (
                        <tr key={student.id}>
                            <td>{index}</td>
                            <td>{student.name}</td>
                            <td>{student.cnp}</td>
                            <td>{student.date_of_birth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowStudents;