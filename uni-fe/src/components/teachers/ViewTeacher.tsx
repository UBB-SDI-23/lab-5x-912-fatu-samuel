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
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { TeacherWithCourses } from "../../models/TeacherWithCourses";

const ViewTeacher = () => {

    const [loading, setLoading] = useState(true)
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState<TeacherWithCourses>();

    useEffect(() => {
        fetch(`${API_URL}/teachers/${teacherId}/`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setTeacher(data)
                setLoading(false);
            });
    }, [])

    return (
        <Container>

            {loading && <CircularProgress />}

            {!loading && !teacher && <div>Teacher not found</div>}

            {!loading && (
                <Button sx={{}}>
                    <Link className="a-left" to="/teachers">Back</Link>
                </Button>
            )}

            {!loading && teacher && (
                <Card style={{ backgroundColor: "#242424" }}>
                    <CardContent style={{ backgroundColor: "#242424" }}>
                        <TableContainer style={{ backgroundColor: "#242424" }}>
                            <Table>
                                <TableBody>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Name</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{teacher?.name}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">CNP</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{teacher?.cnp}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Date of birth</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{teacher?.date_of_birth}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Mail</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{teacher?.mail_address}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Phone number</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{teacher?.phone_number}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Description</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{teacher?.description}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Courses</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{teacher?.courses?.map((course) => (
                                            <li key={course.id}>{course.name}</li>
                                        ))}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>

                    <CardActions>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/${teacherId}/update`}>
                            <EditIcon sx={{ color: "whitesmoke" }} />
                        </IconButton>

                        <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/${teacherId}/delete`}>
                            <DeleteForeverIcon sx={{ color: "red" }} />
                        </IconButton>
                    </CardActions>
                </Card>
            )}

        </Container>
    )
}

export default ViewTeacher;