import { useEffect, useState } from "react";
import { API_URL } from "../../main";
import { Student } from "../../models/student";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const AddStudent = () => {

    const navigate = useNavigate();

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

    }, [])

    const addStudent = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            console.log('HUH?????');
            await axios.post(`../${API_URL}/students/`, student);
            navigate('/students');
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
                        <Link to="/students">Back</Link>
                    </Button>

                    <form onSubmit={addStudent}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke" }}
                            onChange={(event) => setStudent({ ...student, name: event.target.value })}
                        />
                        <TextField
                            id="cnp"
                            label="CNP"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke" }}
                            onChange={(event) => setStudent({ ...student, cnp: Number(event.target.value) })}
                        />
                        <TextField
                            id="date_of_birth"
                            label="Date of birth"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke" }}
                            onChange={(event) => setStudent({ ...student, date_of_birth: event.target.value })}
                        />
                        <TextField
                            id="country"
                            label="Country"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke" }}
                            onChange={(event) => setStudent({ ...student, country: event.target.value })}
                        />
                        <TextField
                            id="county"
                            label="County"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke" }}
                            onChange={(event) => setStudent({ ...student, county: event.target.value })}
                        />
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke" }}
                            onChange={(event) => setStudent({ ...student, city: event.target.value })}
                        />
                        <TextField
                            id="mail"
                            label="Mail"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke" }}
                            onChange={(event) => setStudent({ ...student, mail_address: event.target.value })}
                        />
                        <TextField
                            id="phone_number"
                            label="Phone number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke" }}
                            onChange={(event) => setStudent({ ...student, phone_number: event.target.value })}
                        />
                        <Button type="submit">Add Student</Button>
                    </form>

                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    )
}

export default AddStudent;