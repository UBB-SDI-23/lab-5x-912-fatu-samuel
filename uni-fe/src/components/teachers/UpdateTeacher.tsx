import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { Teacher } from "../../models/Teacher";

export const UpdateTeacher = () => {

    const navigate = useNavigate();
    const { teacherId } = useParams();

    const [loading, setLoading] = useState(true)
    const [teacher, setTeacher] = useState({
        "name": '',
        "cnp": 0,
        "date_of_birth": '',
        "mail_address": '',
        "phone_number": '',
        "description": ''
    });

    useEffect(() => {
        const getTeacher = async () => {
            const response = await axios.get(`${API_URL}/teachers/${teacherId}/`);
            setTeacher(response.data);
            setLoading(false);
        }
        getTeacher();
    }, [])

    const updateTeacher = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            console.log(teacherId);
            await axios.put(`${API_URL}/teachers/${teacherId}/`, teacher);
            navigate('/teachers');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>

            {loading && <CircularProgress />}

            {!loading && !teacher && <div>Teacher not found</div>}

            {!loading && (
                <Button sx={{}}>
                    <Link className="a-left" to="/teachers">Back</Link>
                </Button>
            )}

            {!loading && (
                <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                    <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                        <form onSubmit={updateTeacher} style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                            <TextField
                                sx={{ mb: 2, color: "whitesmoke" }}
                                id="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={teacher?.name}
                                onChange={(event) => setTeacher({ ...teacher, name: event.target.value })}
                            />
                            <TextField
                                id="cnp"
                                label="CNP"
                                variant="outlined"
                                fullWidth
                                value={teacher?.cnp}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setTeacher({ ...teacher, cnp: Number(event.target.value) })}
                            />
                            <TextField
                                id="date_of_birth"
                                label="Date of birth"
                                variant="outlined"
                                fullWidth
                                value={teacher?.date_of_birth}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setTeacher({ ...teacher, date_of_birth: event.target.value })}
                            />
                            <TextField
                                id="mail"
                                label="Mail"
                                variant="outlined"
                                fullWidth
                                value={teacher?.mail_address}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setTeacher({ ...teacher, mail_address: event.target.value })}
                            />
                            <TextField
                                id="phone_number"
                                label="Phone number"
                                variant="outlined"
                                fullWidth
                                value={teacher?.phone_number}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setTeacher({ ...teacher, phone_number: event.target.value })}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={teacher?.description}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setTeacher({ ...teacher, description: event.target.value })}
                            />
                            <Button type="submit" sx={{ backgroundColor: '#242424' }}>Update Teacher</Button>
                        </form>

                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            )
            }
        </Container >
    )
}