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
    TextField,
} from "@mui/material"; import { useEffect, useState } from "react"
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { Teacher } from "../../models/Teacher";
import { Paginator } from "../ui-components/Pagination";
import { UserDetails } from "../../models/UserRoles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Users = () => {

    const [loading, setLoading] = useState(true)
    const [users, setUers] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    const [totalRows, setTotalRows] = useState(0)

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
                setUers(results);
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
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Username</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Role</TableCell>
                                    <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Page size</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users.map((user: UserDetails, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Link to={`/users/${user.id}`}>
                                                {user.username}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            <Select
                                                labelId="role-selct"
                                                id="role-select"
                                                value={user.role}
                                                label=""
                                                sx={{ width: "100%", color: "whitesmoke" }}
                                                onChange={(e) => {
                                                    user.role = e.target.value;
                                                    setUers([...users]);
                                                    axios.put(`${API_URL}/updaterole/${user.id}/`, {
                                                        "role": user.role,
                                                    }, {
                                                        headers: {
                                                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                        }
                                                    });
                                                }}
                                            >
                                                <MenuItem value={"regular"}>Regular</MenuItem>
                                                <MenuItem value={"moderator"}>Moderator</MenuItem>
                                                <MenuItem value={"admin"}>Admin</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={{ color: "whitesmoke" }} align="center">
                                            {/* changed */}
                                            <TextField
                                                label="Page size"
                                                type="number"
                                                value={user.page_size}
                                                onChange={(e) => {
                                                    const size = Number(e.target.value);
                                                    if (size < 1 || size > 100) {
                                                        toast.error("Page size must be between 1 and 100");
                                                        return;
                                                    }

                                                    user.page_size = size;
                                                    setUers([...users]);
                                                    try {
                                                        axios.put(`${API_URL}/update-page-size/${user.id}/`, {
                                                            "page_size": user.page_size,
                                                        }, {
                                                            headers: {
                                                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                            }
                                                        });

                                                    } catch (error) {
                                                        toast.error("Error updating page size");
                                                    }

                                                }}
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

                    <ToastContainer />
                </>
            )}


        </Container>
    )
}

export default Users;