import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import '../../App.css';
import { API_URL } from "../../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        "name": '',
        "cnp": 0,
        "date_of_birth": '',
        "country": '',
        "city": '',
        "mail_address": '',
        "phone_number": ''
    });

    useEffect(() => {
    }, [])

    const addStudent = async (event: { preventDefault: () => void }) => {
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
            await axios.post(`${API_URL}/students/`, student);
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
            <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                    <Button sx={{}}>
                        <Link style={{ textAlign: "left" }} className="a-left" to="/students">Back</Link>
                    </Button>

                    <form onSubmit={addStudent}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setStudent({ ...student, name: event.target.value })}
                        />
                        <TextField
                            id="cnp"
                            label="CNP"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setStudent({ ...student, cnp: Number(event.target.value) })}
                        />
                        <TextField
                            id="date_of_birth"
                            label="Date of birth"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setStudent({ ...student, date_of_birth: event.target.value })}
                        />
                        <TextField
                            id="country"
                            label="Country"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setStudent({ ...student, country: event.target.value })}
                        />
                        <TextField
                            id="mail"
                            label="Mail"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setStudent({ ...student, mail_address: event.target.value })}
                        />
                        <TextField
                            id="phone_number"
                            label="Phone number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setStudent({ ...student, phone_number: event.target.value })}
                        />
                        <ToastContainer />

                        <Button type="submit">Add Student</Button>
                    </form>

                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    )
}

export default AddStudent;