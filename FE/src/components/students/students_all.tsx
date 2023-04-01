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
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Student } from "../../models/student";
import { API_URL } from "../../main";
import { Link } from "react-router-dom";

const ShowStudents = () => {

    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch(`/${API_URL}/students/`)
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
            });
    }, [])

    return (
        <Container>
            <h1>All students</h1>

            {loading && <CircularProgress />}

            {!loading && students.length == 0 && <div>No students found</div>}

            {!loading && (
                <Button sx={{}}>
                    <Link to="/students/add">Add student</Link>
                </Button>
            )}

            {!loading && students.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">#</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Name</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">CNP</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Phone number</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Operation</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {students.map((student: Student, index) => (
                                <TableRow key={student.id}>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{index + 1}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">
                                        <Link to={`/students/${student.id}`}>
                                            {student.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{student.cnp}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{student.phone_number}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/students/${student.id}`}>
                                            <Tooltip title="View student details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/students/${student.id}/update`}>
                                            <EditIcon sx={{ color: "whitesmoke" }} />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/students/${student.id}/delete`}>
                                            <DeleteForeverIcon sx={{ color: "red" }} />
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

export default ShowStudents;