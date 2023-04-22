import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import '../../App.css';
import { API_URL } from "../../constants";

const AddTeacher = () => {

    const navigate = useNavigate();

    const [teacher, setTeacher] = useState({
        "name": '',
        "cnp": 0,
        "date_of_birth": '',
        "phone_number": '',
        "mail_address": '',
        "description": ''
    });

    useEffect(() => {
    }, [])

    const addTeacher = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            await axios.post(`${API_URL}/teachers/`, teacher);
            navigate('/teachers');
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
                        <Link style={{ textAlign: "left" }} className="a-left" to="/teachers">Back</Link>
                    </Button>

                    <form onSubmit={addTeacher}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setTeacher({ ...teacher, name: event.target.value })}
                        />
                        <TextField
                            id="cnp"
                            label="CNP"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setTeacher({ ...teacher, cnp: Number(event.target.value) })}
                        />
                        <TextField
                            id="date_of_birth"
                            label="Date of birth"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setTeacher({ ...teacher, date_of_birth: event.target.value })}
                        />
                        <TextField
                            id="phone_number"
                            label="Phone number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setTeacher({ ...teacher, phone_number: event.target.value })}
                        />
                        <TextField
                            id="mail_address"
                            label="Mail Address"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setTeacher({ ...teacher, mail_address: event.target.value })}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            onChange={(event) => setTeacher({ ...teacher, description: event.target.value })}
                        />
                        <Button type="submit">Add Teacher</Button>
                    </form>

                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    )
}

export default AddTeacher;