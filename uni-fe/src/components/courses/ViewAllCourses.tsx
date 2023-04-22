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


export const ViewAllCourses = () => {

    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true);

        fetch(`${API_URL}/courses/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;

                // Check if the teacher is an integer or a dict object, if it is, call this function again
                if (!(results[0].teacher && typeof results[0].teacher === 'object')) {
                    setPage(page);
                    return;
                }

                setIsLastPage(!next);
                setCourses(results);
                setLoading(false);
            });
    }, [page])

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
            )}


        </Container>
    )
}
