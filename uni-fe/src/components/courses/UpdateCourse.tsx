import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, Button, Card, CardActions, CardContent, CircularProgress, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import '../../App.css';
import { API_URL } from "../../constants";
import { debounce } from "lodash";
import { Teacher } from "../../models/Teacher";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateCourse = () => {

    const navigate = useNavigate();
    const { courseId } = useParams();
    const [loading, setLoading] = useState(true)
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [course, setCourse] = useState({
        "name": '',
        "description": '',
        "fee": 0,
        "size": 0,
        "teacher": {} as Teacher
    });

    useEffect(() => {
        const getCourse = async () => {
            const response = await axios.get(`${API_URL}/courses/${courseId}/`);
            setCourse(response.data);
            setLoading(false);
        }

        getCourse();
    }, []);

    const fetchTeachers = async (input: string) => {
        const response = await axios.get(`${API_URL}/teachers/filter/?search=${input}`);
        setTeachers(response.data);
    }

    const debounceTeachers = useCallback(debounce(fetchTeachers, 500), []);

    useEffect(() => {
        return () => {
            debounceTeachers.cancel();
        };
    }, [debounceTeachers])


    const updateCourse = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        let errored: Boolean = false;
        if (course.fee < 0) {
            toast.error("Fee must be a positive number");
            errored = true;
        }

        if (course.size < 0) {
            toast.error("Size must be a positive number");
            errored = true;
        }

        if (errored) {
            return;
        }

        try {
            await axios.put(`${API_URL}/courses/${courseId}/`, {
                "name": course.name,
                "description": course.description,
                "fee": course.fee,
                "size": course.size,
                "teacher": course.teacher.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            navigate('/courses');
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

            {!loading && !course && <div>Course not found</div>}

            {!loading && (
                <Button sx={{}}>
                    <Link className="a-left" to="/courses">Back</Link>
                </Button>
            )}

            {!loading && (
                <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                    <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                        <form onSubmit={updateCourse}>
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={course.name}
                                sx={{ mb: 2, color: "whitesmoke !important" }}
                                onChange={(event) => setCourse({ ...course, name: event.target.value })}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={course.description}
                                sx={{ mb: 2, color: "whitesmoke !important" }}
                                onChange={(event) => setCourse({ ...course, description: event.target.value })}
                            />
                            <TextField
                                id="Fee"
                                label="Fee"
                                variant="outlined"
                                fullWidth
                                value={course.fee}
                                sx={{ mb: 2, color: "whitesmoke !important" }}
                                onChange={(event) => setCourse({ ...course, fee: Number(event.target.value) })}
                            />
                            <TextField
                                id="Size"
                                label="Size"
                                variant="outlined"
                                fullWidth
                                value={course.size}
                                sx={{ mb: 2, color: "whitesmoke !important" }}
                                onChange={(event) => setCourse({ ...course, size: Number(event.target.value) })}
                            />

                            <Autocomplete
                                id="teacher"
                                value={course.teacher}
                                options={teachers}
                                renderInput={(params) => <TextField {...params} label="Teacher" variant="outlined" />}
                                getOptionLabel={(option) => `${option.name} - ${option.cnp}`}
                                onInputChange={(event, value, reason) => debounceTeachers(value)}
                                onChange={(event, value) => {
                                    if (value) {
                                        setCourse({
                                            ...course, teacher: {
                                                id: value.id,
                                                name: value.name,
                                                cnp: value.cnp
                                            } as Teacher
                                        })
                                    }
                                }}

                            />

                            <ToastContainer />

                            <Button type="submit">Update Course</Button>
                        </form>

                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            )}
        </Container>
    )
}
