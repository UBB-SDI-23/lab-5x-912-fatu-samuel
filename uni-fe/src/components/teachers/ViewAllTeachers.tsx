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


const ViewAllTeachers = () => {

    const [loading, setLoading] = useState(true)
    const [teachers, setteachers] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/teachers/`)
            .then(res => res.json())
            .then(data => {
                setteachers(data);
                setLoading(false);
            });
    }, [])

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
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">#</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Name</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">CNP</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Phone number</TableCell>
                                <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="center">Operation</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {teachers.map((teacher: Teacher, index) => (
                                <TableRow key={teacher.id}>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{index + 1}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">
                                        <Link to={`/teachers/${teacher.id}`}>
                                            {teacher.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{teacher.cnp}</TableCell>
                                    <TableCell sx={{ color: "whitesmoke" }} align="center">{teacher.phone_number}</TableCell>
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
            )}


        </Container>
    )
}

export default ViewAllTeachers;