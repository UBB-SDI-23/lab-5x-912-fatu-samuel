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
import { Student } from "../../models/Student";
import { Teacher } from "../../models/Teacher";
import { User } from "../../models/User";


export const UsersBulk = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
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

        fetch(`${API_URL}/users/?page=${page}&page_size=${new_page_size}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setTotalRows(count);
                setUsers(results);
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
            url: `${API_URL}/bulk/users/${selectedRows.join(",")}/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(() => {

                const stringUser = localStorage.getItem("user");
                const user = JSON.parse(stringUser!);
                const new_page_size = user?.page_size || 10;
        setRowsPerPage(new_page_size);

                fetch(`${API_URL}/users/?page=${page}&page_size=${new_page_size}`)
                    .then(res => res.json())
                    .then(data => {
                        const { count, next, prev, results } = data;
                        setIsLastPage(!next);
                        setTotalRows(count);
                        setUsers(results);
                        setLoading(false);
                    })
            })
            .catch((error) => {
                console.error("Error deleting users:", error);
            });
    };


    return (
        <Container>
            <h1>All users</h1>

            {loading && <CircularProgress />}


            {!loading && users.length == 0 && <div>No users found</div>}


            {!loading && users.length > 0 && (
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
                                {users.map((user: User, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/students/${user.id}`}>
                                                {user.username}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={selectedRows.includes(user.id)}
                                                onChange={() => handleRowSelection(user.id)}
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
