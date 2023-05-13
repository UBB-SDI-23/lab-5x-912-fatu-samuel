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

const AddTeacher = () => {

    const navigate = useNavigate();

    const [teacher, setTeacher] = useState({
        "name": '',
        "cnp": 0,
        "date_of_birth": '',
        "phone_number": '',
        "mail_address": '',
        "description": '',
        "added_by": 1
    });

    useEffect(() => {
    }, [])

    const addTeacher = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (!teacher.mail_address.includes("@")) {
            toast.error("Mail address must contain @");
            return;
        }

        try {
            const user_id = localStorage.getItem("user_id");
            teacher.added_by = Number(user_id);
            
            const token = localStorage.getItem("token") || "";
            if (!token) {
                toast.error("You are not logged in!");
                return;
            }

            await axios.post(`${API_URL}/teachers/`, teacher, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            
            navigate('/teachers');
        }
        catch (error: any) {
            console.log(error);
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
                        <ToastContainer />

                        <Button type="submit">Add Teacher</Button>
                    </form>

                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    )
}

export default AddTeacher;