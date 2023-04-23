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
    TextField,
} from "@mui/material"; import { useEffect, useState } from "react"
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { Paginator } from "../ui-components/Pagination";
import { Course } from "../../models/Course";
import { toast } from "react-toastify";

export const FilterCoursesByFee = () => {

    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [fee, setFee] = useState(0)

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true);
        console.log(fee);
        fetchCourses();
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

    const fetchCourses = () => {
        if (fee < 0) {
            toast.error("Fee must be positive");
            return;
        }

        fetch(`${API_URL}/courses/fee/${fee}/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setCourses(results);
                setTotalRows(count);
                setLoading(false);
            });
    }

    return (
        <Container>
            <h1>Courses</h1>

            <Container>
                <TextField
                    label="Fee"
                    value={fee}
                    onChange={(event) => setFee(Number(event.target.value))}
                    sx={{ mr: 3 }}
                />
                <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => fetchCourses()}>
                    Filter
                </Button>
            </Container>


            {loading && <CircularProgress />}

            {!loading && courses.length == 0 && <div>No courses found</div>}

            {
                !loading && courses.length > 0 && (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">#</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Name</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Description</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Fee</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Size</TableCell>
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
                                            <TableCell sx={{ color: "whitesmoke" }} align="center">{course.description}</TableCell>
                                            <TableCell sx={{ color: "whitesmoke" }} align="center">{course.fee}</TableCell>
                                            <TableCell sx={{ color: "whitesmoke" }} align="center">{course.size}</TableCell>
                                            <TableCell sx={{ color: "whitesmoke" }} align="center">
                                                <IconButton
                                                    component={Link}
                                                    sx={{ mr: 3 }}
                                                    to={`/courses/${course.id}`}>
                                                    <Tooltip title="View course details" arrow>
                                                        <ReadMoreIcon color="primary" />
                                                    </Tooltip>
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
