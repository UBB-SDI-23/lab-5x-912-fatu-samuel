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
import { Course } from "../../models/Course";
import { Paginator } from "../ui-components/Pagination";


export const ViewAllCourses = () => {

    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    const [totalRows, setTotalRows] = useState(0)

    const [rowsPerPage, setRowsPerPage] = useState(10)

    useEffect(() => {
        setLoading(true);

        const stringUser = localStorage.getItem("user");
        const user = JSON.parse(stringUser!);
        const new_page_size = user?.page_size || 10;

        fetch(`${API_URL}/courses/?page=${page}&page_size=${new_page_size}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setTotalRows(count);
                setCourses(results);
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
            <h1>All courses</h1>

            {loading && <CircularProgress />}


            {!loading && (
                <Button sx={{}}>
                    <Link to="/courses/add">Add course</Link>
                </Button>
            )}

            {!loading && courses.length == 0 && <div>No courses found</div>}


            {!loading && courses.length > 0 && (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">#</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Name</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Teacher</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center"># Students</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Added by</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Operation</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {courses.map((course: Course, index) => (
                                    <TableRow key={course.id}>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/courses/${course.id}`}>
                                                {course.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/teachers/${course.teacher.id}`}>
                                                {course.teacher.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{course.students_count}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/profile/${course.added_by.id}`}>
                                                {course.added_by.username}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <IconButton
                                                component={Link}
                                                sx={{ mr: 3 }}
                                                to={`/courses/${course.id}`}>
                                                <Tooltip title="View course details" arrow>
                                                    <ReadMoreIcon color="primary" />
                                                </Tooltip>
                                            </IconButton>

                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${course.id}/update`}>
                                                <EditIcon sx={{ color: "whitesmoke" }} />
                                            </IconButton>

                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${course.id}/delete`}>
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
