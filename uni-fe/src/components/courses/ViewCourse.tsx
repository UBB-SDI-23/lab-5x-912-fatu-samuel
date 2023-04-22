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
import { Course } from "../../models/Course";

export const ViewCourse = () => {

    const [loading, setLoading] = useState(true)
    const { courseId } = useParams();
    const [course, setCourses] = useState<Course>();

    useEffect(() => {
        fetch(`${API_URL}/courses/${courseId}/`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCourses(data)
                setLoading(false);
            });
    }, [])

    return (
        <Container>

            {loading && <CircularProgress />}

            {!loading && !course && <div>Teacher not found</div>}

            {!loading && course && (
                <Card style={{ backgroundColor: "#242424" }}>
                    <CardContent style={{ backgroundColor: "#242424" }}>
                        <TableContainer style={{ backgroundColor: "#242424" }}>
                            <Table>
                                <TableBody>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Name</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{course?.name}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Description</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{course?.description}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Fee</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{course?.fee}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Size</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{course?.size}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Teacher</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">
                                            <Link to={`/teachers/${course?.teacher?.id}`}>
                                                {course?.teacher?.name}
                                            </Link>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Students</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{course?.students?.map((course) => (
                                            <li key={course.id}>{course.name}</li>
                                        ))}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>

                    <CardActions>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${courseId}/update`}>
                            <EditIcon sx={{ color: "whitesmoke" }} />
                        </IconButton>

                        <IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${courseId}/delete`}>
                            <DeleteForeverIcon sx={{ color: "red" }} />
                        </IconButton>
                    </CardActions>
                </Card>
            )}

        </Container>
    )
}