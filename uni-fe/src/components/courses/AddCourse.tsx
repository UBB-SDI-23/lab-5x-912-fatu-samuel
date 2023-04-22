import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import '../../App.css';
import { API_URL } from "../../constants";
import { Teacher } from "../../models/Teacher";
import { debounce } from "lodash";

export const AddCourse = () => {

    const navigate = useNavigate();

    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const [course, setCourse] = useState({
        "name": '',
        "description": '',
        "fee": 0,
        "size": 0,
        "teacher": 0
    });

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

    const addStudent = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            await axios.post(`${API_URL}/courses/`, course);
            navigate('/courses');
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
                        <Link style={{ textAlign: "left" }} className="a-left" to="/courses">Back</Link>
                    </Button>

                    <form onSubmit={addStudent}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setCourse({ ...course, name: event.target.value })}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setCourse({ ...course, description: event.target.value })}
                        />
                        <TextField
                            id="Fee"
                            label="Fee"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setCourse({ ...course, fee: Number(event.target.value) })}
                        />
                        <TextField
                            id="Size"
                            label="Size"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setCourse({ ...course, size: Number(event.target.value) })}
                        />

                        <Autocomplete
                            id="teacher"
                            options={teachers}
                            renderInput={(params) => <TextField {...params} label="Teacher" variant="outlined" />}
                            getOptionLabel={(option) => option.name}
                            onInputChange={(event, value, reason) => debounceTeachers(value)}
                            onChange={(event, value) => {
                                if (value) {
                                    setCourse({ ...course, teacher: value.id })
                                }
                            }}

                        />

                        <Button type="submit">Add Course</Button>
                    </form>

                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    )
}
