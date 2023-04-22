import {
    TableContainer,
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
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { Student } from "../../models/Student";


const ViewAllStudents = () => {

    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true)

        fetch(`${API_URL}/students/?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setStudents(results);
                setLoading(false);
            })
    }, [page])

    const sortStudents = () => {
        const sortedStudents = [...students].sort((a: Student, b: Student) => {
            if (a.cnp < b.cnp) {
                return -1;
            }
            if (a.cnp > b.cnp) {
                return 1;
            }
            return 0;
        })
        setStudents(sortedStudents);
    }


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

            {!loading && (
                <Button sx={{}} onClick={sortStudents}>
                    Sort students
                </Button>
            )}

            {!loading && students.length > 0 && (
                <>
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
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
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

                    <Button
                        sx={{ color: "whitesmoke", mr: 2, ":disabled": { color: "grey" } }}
                        onClick={() => setPage(page - 1)}
                        disabled={page == 1}
                    >
                        Previous page
                    </Button>

                    <Button
                        sx={{ color: "whitesmoke", mr: 2, ":disabled": { color: "grey" } }}
                        onClick={() => setPage(page + 1)}
                        disabled={isLastPage}
                    >
                        Next page
                    </Button>
                </>
            )
            }


        </Container >
    )
}

export default ViewAllStudents;