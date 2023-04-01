import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { API_URL } from "../../main";
import { Student } from "../../models/student";
import { useParams } from "react-router-dom";
import { FullStudent } from "../../models/full-student";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const ShowStudent = () => {

    const [loading, setLoading] = useState(true)
    const { studentId } = useParams();
    const [student, setStudent] = useState<FullStudent>();

    useEffect(() => {
        fetch(`../${API_URL}/students/${studentId}/`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setStudent(data)
                setLoading(false);
            });
    }, [])

    return (
        <Container>

            {loading && <CircularProgress />}

            {!loading && !student && <div>Student not found</div>}

            {!loading && (
                <Button sx={{}}>
                    <Link to="/students/add">Back</Link>
                </Button>
            )}

            {!loading && student && (
                <Card style={{ backgroundColor: "#242424" }}>
                    <CardContent style={{ backgroundColor: "#242424" }}>
                        <TableContainer style={{ backgroundColor: "#242424" }}>
                            <Table>
                                <TableBody>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Name</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.name}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">CNP</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.cnp}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Date of birth</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.date_of_birth}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Country</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.country}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">County</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.county}</TableCell>
                                    </TableRow>


                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">City</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.city}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Mail</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.mail_address}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Phone number</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.phone_number}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Courses</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{student?.courses?.map((course) => (
                                            <li key={course.id}>{course.name}</li>
                                        ))}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>

                    <CardActions>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/students/${studentId}/edit`}>
                            <EditIcon sx={{ color: "whitesmoke" }} />
                        </IconButton>

                        <IconButton component={Link} sx={{ mr: 3 }} to={`/students/${studentId}/delete`}>
                            <DeleteForeverIcon sx={{ color: "red" }} />
                        </IconButton>
                    </CardActions>
                </Card>
            )}

        </Container>
    )
}

export default ShowStudent;