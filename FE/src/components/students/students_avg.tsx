import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Button,
} from "@mui/material"; import { useEffect, useState } from "react"
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Student } from "../../models/student";
import { API_URL } from "../../main";
import { Link } from "react-router-dom";
import { StudentFee } from "../../models/student_fee";

const ShowStudentsAvgFee = () => {

    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch(`/${API_URL}/students/avg-fee/`)
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
                console.log(data);
            });
    }, [])

    return (
        <Container>
            <h1>Students ordered by avg fee</h1>

            {loading && <CircularProgress />}

            {!loading && students.length == 0 && <div>No students found</div>}

            {!loading && students.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">#</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Name</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">CNP</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Phone number</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Avg fee</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Operation</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {students.map((student: StudentFee, index) => (
                                <TableRow key={student.id}>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{index + 1}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">
                                        <Link to={`/students/${student.id}`}>
                                            {student.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{student.cnp}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{student.phone_number}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{student.avg_fee == 0 ? 0 : student.avg_fee}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/students/${student.id}`}>
                                            <Tooltip title="View student details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            )}


        </Container>
    )
}

export default ShowStudentsAvgFee;