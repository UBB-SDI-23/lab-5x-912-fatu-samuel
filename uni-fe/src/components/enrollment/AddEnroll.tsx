import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import '../../App.css';
import { API_URL } from "../../constants";
import { debounce } from "lodash";
import { Student } from "../../models/Student";
import { Course } from "../../models/Course";

export const AddEnroll = () => {

    const navigate = useNavigate();

    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourse] = useState<Course[]>([]);

    const [enrollData, setEnrollData] = useState({
        "student": 0,
        "course": 0,
        "final_lab_score": 0,
        "final_exam_score": 0
    });

    const fetchStudents = async (input: string) => {
        const response = await axios.get(`${API_URL}/students/filter/?search=${input}`);
        setStudents(response.data);
    }

    const fetchCourses = async (input: string) => {
        const response = await axios.get(`${API_URL}/courses/filter/?search=${input}`);
        setCourse(response.data);
    }

    const debounceStudents = useCallback(debounce(fetchStudents, 500), []);
    const debounceCourses = useCallback(debounce(fetchCourses, 500), []);

    useEffect(() => {
        return () => {
            debounceStudents.cancel();
            debounceCourses.cancel();
        };
    }, [debounceStudents, debounceCourses])


    const enrollStudents = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            await axios.post(`${API_URL}/enroll/`, enrollData);
            navigate('/enrollments');
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <Container>
            <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>

                    <Button sx={{}}>
                        <Link style={{ textAlign: "left" }} className="a-left" to="/enrollments">Back</Link>
                    </Button>

                    <form onSubmit={enrollStudents}>

                        <Autocomplete
                            id="student"
                            options={students}
                            renderInput={(params) => <TextField {...params} label="Student" variant="outlined" />}
                            getOptionLabel={(option) => `${option.name} - ${option.cnp}`}
                            onInputChange={(event, value, reason) => debounceStudents(value)}
                            onChange={(event, value) => {
                                if (value) {
                                    setEnrollData({ ...enrollData, student: value.id })
                                }
                            }}
                            sx={{ mb: 3, mt: 2, width: 450 }}
                        />

                        <Autocomplete
                            id="course"
                            options={courses}
                            renderInput={(params) => <TextField {...params} label="Course" variant="outlined" />}
                            getOptionLabel={(option) => `${option.name} - ${option.teacher.name}`}
                            onInputChange={(event, value, reason) => debounceCourses(value)}
                            onChange={(event, value) => {
                                if (value) {
                                    setEnrollData({ ...enrollData, course: value.id })
                                }
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Button type="submit">Enroll</Button>
                    </form>

                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    )
}
