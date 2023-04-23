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
import { Enrollment } from "../../models/Enrollment";

const ViewStudent = () => {

    const [loading, setLoading] = useState(true)
    const { enrollId } = useParams();
    const [enroll, setEnroll] = useState<Enrollment>();

    useEffect(() => {
        fetch(`${API_URL}/enroll/${enrollId}/`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setEnroll(data)
                setLoading(false);
            });
    }, [])

    return (
        <Container>

            {loading && <CircularProgress />}

            {!loading && !enroll && <div>Student not found</div>}

            {!loading && enroll && (
                <Card style={{ backgroundColor: "#242424" }}>
                    <CardContent style={{ backgroundColor: "#242424" }}>
                        <TableContainer style={{ backgroundColor: "#242424" }}>
                            <Table>
                                <TableBody>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Student</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{enroll?.studentName}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Course</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{enroll?.courseName}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Lab Grade</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{enroll?.final_lab_score}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">Exam Grade</TableCell>
                                        <TableCell sx={{ color: "whitesmoke", fontWeight: "bold" }} align="left">{enroll?.final_exam_score}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>

                    <CardActions>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/enrollments/${enrollId}/update`}>
                            <EditIcon sx={{ color: "whitesmoke" }} />
                        </IconButton>

                        <IconButton component={Link} sx={{ mr: 3 }} to={`/enrollments/${enrollId}/delete`}>
                            <DeleteForeverIcon sx={{ color: "red" }} />
                        </IconButton>
                    </CardActions>
                </Card>
            )}

        </Container>
    )
}

export default ViewStudent;