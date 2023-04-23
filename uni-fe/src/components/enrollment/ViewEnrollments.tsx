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
import { Enrollment } from "../../models/Enrollment";
import { Paginator } from "../ui-components/Pagination";


export const ViewEnrollments = () => {

    const [loading, setLoading] = useState(true)
    const [enrollments, setCourses] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    const [totalRows, setTotalRows] = useState(0)

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true);

        fetch(`${API_URL}/enroll/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setCourses(results);
                setTotalRows(count);
                setLoading(false);
            });
    }, [page])

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
            <h1>All enrollments</h1>

            {loading && <CircularProgress />}


            {!loading && (
                <Button sx={{}}>
                    <Link to="/enrollments/add">Enroll Student</Link>
                </Button>
            )}

            {!loading && enrollments.length == 0 && <div>No enrollments found</div>}


            {!loading && enrollments.length > 0 && (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">#</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Student</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Course</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Operation</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {enrollments.map((enrollment: Enrollment, index) => (
                                    <TableRow key={enrollment.id}>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/enrollments/${enrollment.id}`}>
                                                {(page - 1) * rowsPerPage + index + 1}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/students/${enrollment.student}`}>
                                                {enrollment.student.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/courses/${enrollment.course}`}>
                                                {enrollment.course.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <IconButton
                                                component={Link}
                                                sx={{ mr: 3 }}
                                                to={`/enrollments/${enrollment.id}`}>
                                                <Tooltip title="View enrollment details" arrow>
                                                    <ReadMoreIcon color="primary" />
                                                </Tooltip>
                                            </IconButton>

                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/enrollments/${enrollment.id}/update`}>
                                                <EditIcon sx={{ color: "whitesmoke" }} />
                                            </IconButton>

                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/enrollments/${enrollment.id}/delete`}>
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
            )}


        </Container>
    )
}
