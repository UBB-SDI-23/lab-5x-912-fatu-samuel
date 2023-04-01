import { useEffect, useState } from "react";
import { API_URL } from "../../main";
import { Student } from "../../models/student";
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

export const UpdateStudent = () => {

    const navigate = useNavigate();
    const { studentId } = useParams();

    const [loading, setLoading] = useState(true)
    const [student, setStudent] = useState({
        "name": '',
        "cnp": 0,
        "date_of_birth": '',
        "country": '',
        "county": '',
        "city": '',
        "mail_address": '',
        "phone_number": ''
    });

    useEffect(() => {
        const getStudent = async () => {
            const response = await axios.get(`../../${API_URL}/students/${studentId}/`);
            setStudent(response.data);
            setLoading(false);
            console.log(response.data);
        }
        getStudent();
    }, [])

    const updateStudent = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            await axios.put(`../../${API_URL}/students/`, student);
            navigate('/students');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>

            {loading && <CircularProgress />}

            {!loading && !student && <div>Student not found</div>}

            {!loading && (
                <Button sx={{}}>
                    <Link to="/students">Back</Link>
                </Button>
            )}

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
                                onChange={(event) => setStudent({ ...student, name: event.target.value })}
                            />
                            <TextField
                                id="cnp"
                                label="CNP"
                                variant="outlined"
                                fullWidth
                                value={student.cnp}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setStudent({ ...student, cnp: Number(event.target.value) })}
                            />
                            <TextField
                                id="date_of_birth"
                                label="Date of birth"
                                variant="outlined"
                                fullWidth
                                value={student.date_of_birth}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setStudent({ ...student, date_of_birth: event.target.value })}
                            />
                            <TextField
                                id="country"
                                label="Country"
                                variant="outlined"
                                fullWidth
                                value={student.country}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setStudent({ ...student, country: event.target.value })}
                            />
                            <TextField
                                id="county"
                                label="County"
                                variant="outlined"
                                fullWidth
                                value={student.county}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setStudent({ ...student, county: event.target.value })}
                            />
                            <TextField
                                id="city"
                                label="City"
                                variant="outlined"
                                fullWidth
                                value={student.city}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setStudent({ ...student, city: event.target.value })}
                            />
                            <TextField
                                id="mail"
                                label="Mail"
                                variant="outlined"
                                fullWidth
                                value={student.mail_address}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setStudent({ ...student, mail_address: event.target.value })}
                            />
                            <TextField
                                id="phone_number"
                                label="Phone number"
                                variant="outlined"
                                fullWidth
                                value={student.phone_number}
                                sx={{ mb: 2, color: "whitesmoke" }}
                                onChange={(event) => setStudent({ ...student, phone_number: event.target.value })}
                            />
                            <Button type="submit" sx={{ backgroundColor: '#242424', color: 'whitesmoke' }}>Update Student</Button>
                        </form>

                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            )
            }
        </Container >
    )
}