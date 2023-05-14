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
    Select,
    MenuItem,
    Paper,
    Checkbox,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { Course } from "../../models/Course";
import { Paginator } from "../ui-components/Pagination";
import { Student } from "../../models/Student";


export const StudentsBulk = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setLoading(true);

        const stringUser = localStorage.getItem("user");
        const user = JSON.parse(stringUser!);
        const new_page_size = user?.page_size || 10;
        setRowsPerPage(new_page_size);

        fetch(`${API_URL}/students/?page=${page}&page_size=${new_page_size}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setTotalRows(count);
                setStudents(results);
                setLoading(false);
            });
    }, [page]);

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    };

    const goToNextPage = () => {
        if (isLastPage) {
            return;
        }

        setPage(page + 1);
    };

    const goToPrevPage = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    };
    const handleRowSelection = (swimmerId: number) => {
        if (selectedRows.includes(swimmerId)) {
            setSelectedRows(selectedRows.filter((id) => id !== swimmerId));
        } else {
            setSelectedRows([...selectedRows, swimmerId]);
        }
    };

    const handleBulkDelete = () => {
        axios({
            method: 'delete',
            url: `${API_URL}/bulk/students/${selectedRows.join(",")}/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(() => {

                const stringUser = localStorage.getItem("user");
                const user = JSON.parse(stringUser!);
                const new_page_size = user?.page_size || 10;
        setRowsPerPage(new_page_size);

                fetch(`${API_URL}/students/?page=${page}&page_size=${new_page_size}`)
                    .then(res => res.json())
                    .then(data => {
                        const { count, next, prev, results } = data;
                        setIsLastPage(!next);
                        setTotalRows(count);
                        setStudents(results);
                        setLoading(false);
                    })
            })
            .catch((error) => {
                console.error("Error deleting users:", error);
            });
    };


    return (
        <Container>
            <h1>All students</h1>

            {loading && <CircularProgress />}


            {!loading && students.length == 0 && <div>No students found</div>}


            {!loading && students.length > 0 && (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">#</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Name</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={handleBulkDelete}
                                            disabled={selectedRows.length === 0}
                                        >
                                            Bulk Delete
                                        </Button>
                                    </TableCell>
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
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={selectedRows.includes(student.id)}
                                                onChange={() => handleRowSelection(student.id)}
                                            />
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
    );
};
