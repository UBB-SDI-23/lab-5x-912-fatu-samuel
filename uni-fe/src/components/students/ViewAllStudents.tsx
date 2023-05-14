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
import { Paginator } from "../ui-components/Pagination";


const ViewAllStudents = () => {

    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    const [totalRows, setTotalRows] = useState(0)

    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setLoading(true)

        const stringUser = localStorage.getItem("user");
        const user = JSON.parse(stringUser!);
        const new_page_size = user?.page_size || 10;
        setRowsPerPage(new_page_size);

        fetch(`${API_URL}/students/?page=${page}&page_size=${new_page_size}`)
            .then(response => response.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setStudents(results);
                setTotalRows(count);
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

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const goToNextPage = () => {
        if (isLastPage) {
            return;
        }

        setPage(page + 1);
    }

    const goToPrevPage = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
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
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center"># Courses</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Added by</TableCell>
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
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{student.courses_count}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/profile/${student.added_by.id}`}>
                                                {student.added_by.username}
                                            </Link>
                                        </TableCell>
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

                    <Paginator
                        rowsPerPage={rowsPerPage}
                        totalRows={totalRows}
                        currentPage={page}
                        isFirstPage={page === 1}
                        isLastPage={isLastPage}
                        setPage={setCurrentPage}
                        goToNextPage={goToNextPage}
                        goToPrevPage={goToPrevPage}
                    />
                </>
            )
            }


        </Container >
    )
}

export default ViewAllStudents;