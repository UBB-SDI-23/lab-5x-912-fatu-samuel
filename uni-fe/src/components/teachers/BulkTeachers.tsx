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
import { Paginator } from "../ui-components/Pagination";
import { Teacher } from "../../models/Teacher";


export const TeachersBulk = () => {
    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true);

        const stringUser = localStorage.getItem("user");
        const user = JSON.parse(stringUser!);
        const new_page_size = user?.page_size || 10;

        fetch(`${API_URL}/teachers/?page=${page}&page_size=${new_page_size}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setTotalRows(count);
                setTeachers(results);
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
            url: `${API_URL}/bulk/teachers/${selectedRows.join(",")}/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(() => {

                const stringUser = localStorage.getItem("user");
                const user = JSON.parse(stringUser!);
                const new_page_size = user?.page_size || 10;

                fetch(`${API_URL}/teachers/?page=${page}&page_size=${new_page_size}`)
                    .then(res => res.json())
                    .then(data => {
                        const { count, next, prev, results } = data;
                        setIsLastPage(!next);
                        setTotalRows(count);
                        setTeachers(results);
                        setLoading(false);
                    })
            })
            .catch((error) => {
                console.error("Error deleting users:", error);
            });
    };


    return (
        <Container>
            <h1>All teachers</h1>

            {loading && <CircularProgress />}


            {!loading && teachers.length == 0 && <div>No teachers found</div>}


            {!loading && teachers.length > 0 && (
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
                                {teachers.map((teacher: Teacher, index) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/students/${teacher.id}`}>
                                                {teacher.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={selectedRows.includes(teacher.id)}
                                                onChange={() => handleRowSelection(teacher.id)}
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
