import { useEffect, useState } from "react";
import { API_URL } from "../../main";
import { Student } from "../../models/student";
import { useParams } from "react-router-dom";
import { FullStudent } from "../../models/full-student";

const ShowStudent = () => {

    const { studentId } = useParams();
    const [student, setStudent] = useState<FullStudent>();

    useEffect(() => {
        fetch(`../${API_URL}/students/${studentId}/`)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                setStudent(data)
                console.log(data);
            });
    }, [])

    if (!student) {
        return <div>No student found with the specified ID</div>
    }

    // use @mui/material to style the table
    return (
        <div>
            <h1>{student?.name}'s data</h1>
            {/* show details in a div */}
            <p>CNP: {student?.cnp}</p>
            <p>Date of birth: {student?.date_of_birth}</p>
            <p>County: {student?.county}</p>

            <p>Courses:</p>
            <ul>
                {student?.courses?.map((course) => (
                    <li key={course.id}>{course.id}</li>
                ))}
            </ul>
        </div>
    )
}

export default ShowStudent;