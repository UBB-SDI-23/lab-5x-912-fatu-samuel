import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    CircularProgress,
    Autocomplete,
} from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { Enrollment } from "../../models/Enrollment";
import { Student } from "../../models/Student";
import { Course } from "../../models/Course";
import { debounce } from "lodash";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateEnroll = () => {

    const navigate = useNavigate();
    const { enrollId } = useParams();

    const [loading, setLoading] = useState(true)
    const [enroll, setEnroll] = useState({
        "final_lab_score": 0,
        "final_exam_score": 0,
        "student": {} as Student,
        "course": {} as Course
    });

    useEffect(() => {
        const getEnroll = async () => {
            const response = await axios.get(`${API_URL}/enroll/${enrollId}/`);
            setEnroll(response.data);
            setLoading(false);
        }
        getEnroll();
    }, [])

    const updateEnroll = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            await axios.put(`${API_URL}/enroll/${enrollId}/`, {
                "final_lab_score": enroll.final_lab_score,
                "final_exam_score": enroll.final_exam_score,
                "student": enroll.student.id,
                "course": enroll.course.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            navigate('/enrollments');
        }
        catch (error: any) {
            const errors = error.response.data.message;
            for (const key in errors) {
                toast.error(`${key}: ${errors[key]}`);
            }
        }
    }

    return (
        <Container>

            {loading && <CircularProgress />}

            {!loading && !enroll && <div>Enrollment not found</div>}

            {!loading && (
                <Button sx={{}}>
                    <Link className="a-left" to="/enrollments">Back</Link>
                </Button>
            )}

            {!loading && (
                <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                    <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                        <form onSubmit={updateEnroll} style={{ backgroundColor: "#242424", color: "whitesmoke" }}>

                            <TextField
                                sx={{
                                    mb: 2, color: "whitesmoke"
                                }}
                                id="student"
                                label="Student"
                                variant="outlined"
                                fullWidth
                                value={enroll?.student?.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <TextField
                                sx={{ mb: 2, color: "whitesmoke" }}
                                id="course"
                                label="Course"
                                variant="outlined"
                                fullWidth
                                value={enroll?.course?.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <TextField
                                sx={{ mb: 2, color: "whitesmoke" }}
                                id="lab_grade"
                                label="Lab grade"
                                variant="outlined"
                                fullWidth
                                value={enroll?.final_lab_score}
                                onChange={(event) => setEnroll({ ...enroll, final_lab_score: Number(event.target.value) })}
                            />
                            <TextField
                                id="exam_grade"
                                label="Exam Grade"
                                variant="outlined"
                                fullWidth
                                value={enroll?.final_exam_score}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setEnroll({ ...enroll, final_exam_score: Number(event.target.value) })}
                            />
                            <ToastContainer />

                            <Button type="submit" sx={{ backgroundColor: '#242424' }}>Update Enrollment</Button>
                        </form>

                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            )
            }
        </Container >
    )
}