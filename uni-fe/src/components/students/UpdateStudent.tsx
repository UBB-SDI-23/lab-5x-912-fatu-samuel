import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateStudent = () => {

    const navigate = useNavigate();
    const { studentId } = useParams();

    const [loading, setLoading] = useState(true)
    const [student, setStudent] = useState({
        "name": '',
        "cnp": 0,
        "date_of_birth": '',
        "country": '',
        "mail_address": '',
        "phone_number": ''
    });

    useEffect(() => {
        const getStudent = async () => {
            const response = await axios.get(`${API_URL}/students/${studentId}/`);
            setStudent(response.data);
            setLoading(false);
            console.log(response.data);
        }
        getStudent();
    }, [])

    const updateStudent = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        let errored: Boolean = false;
        if (!student.mail_address.includes("@")) {
            toast.error("Mail address must contain @");
            errored = true;
        }

        if (`${student.cnp}`.length !== 13) {
            toast.error("Cnp must have 13 digits and start with 1, 2, 5 or 6");
            errored = true;
        }

        if (errored) {
            return;
        }

        try {
            await axios.put(`${API_URL}/students/${studentId}/`, student, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            navigate('/students');
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

            {!loading && !student && <div>Student not found</div>}

            {!loading && (
                <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                    <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                        <form onSubmit={updateStudent} style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                            <TextField
                                sx={{ mb: 2, color: "whitesmoke" }}
                                id="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={student.name}
                                InputProps={{
                                    style: {
                                        color: "whitesmoke"
                                    }
                                }}
                                onChange={(event) => setStudent({ ...student, name: event.target.value })}
                            />
                            <TextField
                                id="cnp"
                                label="CNP"
                                variant="outlined"
                                fullWidth
                                value={student.cnp}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                InputProps={{
                                    style: {
                                        color: "whitesmoke"
                                    }
                                }}
                                onChange={(event) => setStudent({ ...student, cnp: Number(event.target.value) })}
                            />
                            <TextField
                                id="date_of_birth"
                                label="Date of birth"
                                variant="outlined"
                                fullWidth
                                value={student.date_of_birth}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                InputProps={{
                                    style: {
                                        color: "whitesmoke"
                                    }
                                }}
                                onChange={(event) => setStudent({ ...student, date_of_birth: event.target.value })}
                            />
                            <TextField
                                id="country"
                                label="Country"
                                variant="outlined"
                                fullWidth
                                value={student.country}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                InputProps={{
                                    style: {
                                        color: "whitesmoke"
                                    }
                                }}
                                onChange={(event) => setStudent({ ...student, country: event.target.value })}
                            />
                            <TextField
                                id="mail"
                                label="Mail"
                                variant="outlined"
                                fullWidth
                                value={student.mail_address}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                InputProps={{
                                    style: {
                                        color: "whitesmoke"
                                    }
                                }}
                                onChange={(event) => setStudent({ ...student, mail_address: event.target.value })}
                            />
                            <TextField
                                id="phone_number"
                                label="Phone number"
                                variant="outlined"
                                fullWidth
                                value={student.phone_number}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                InputProps={{
                                    style: {
                                        color: "whitesmoke"
                                    }
                                }}
                                onChange={(event) => setStudent({ ...student, phone_number: event.target.value })}
                            />
                            <ToastContainer />

                            <Button type="submit" sx={{ backgroundColor: '#242424' }}>Update Student</Button>
                        </form>

                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            )
            }
        </Container >
    )
}