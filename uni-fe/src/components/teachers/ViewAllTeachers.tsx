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
import { Teacher } from "../../models/Teacher";
import { Paginator } from "../ui-components/Pagination";


const ViewAllTeachers = () => {

    const [loading, setLoading] = useState(true)
    const [teachers, setTeachers] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    const [totalRows, setTotalRows] = useState(0)

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true);

        fetch(`${API_URL}/teachers/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setTotalRows(count);
                setTeachers(results);
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
            <h1>All teachers</h1>

            {loading && <CircularProgress />}


            {!loading && (
                <Button sx={{}}>
                    <Link to="/teachers/add">Add teacher</Link>
                </Button>
            )}

            {!loading && teachers.length == 0 && <div>No teachers found</div>}


            {!loading && teachers.length > 0 && (
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
                                {teachers.map((teacher: Teacher, index) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/teachers/${teacher.id}`}>
                                                {teacher.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{teacher.cnp}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{teacher.phone_number}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{teacher.courses_count}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/profile/${teacher.added_by.id}`}>
                                                {teacher.added_by.username}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <IconButton
                                                component={Link}
                                                sx={{ mr: 3 }}
                                                to={`/teachers/${teacher.id}`}>
                                                <Tooltip title="View teacher details" arrow>
                                                    <ReadMoreIcon color="primary" />
                                                </Tooltip>
                                            </IconButton>

                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/${teacher.id}/update`}>
                                                <EditIcon sx={{ color: "whitesmoke" }} />
                                            </IconButton>

                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/${teacher.id}/delete`}>
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

export default ViewAllTeachers;