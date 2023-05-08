import { Button, Card, CardContent, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';
import { API_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const RegistrationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        date_of_birth: '',
        bio: '',
        location: '',
    });

    const [code, setCode] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            const data = {
                user: {
                    username: formData.username,
                    password: formData.password
                },
                first_name: formData.firstName,
                last_name: formData.lastName,
                date_of_birth: formData.date_of_birth,
                bio: formData.bio,
                location: formData.location
            }
            const response = await axios.post(`${API_URL}/register/`, data);
            setCode(response.data['activation_code']);
        }
        catch (error: any) {
            const errors = error.response.data.user;
            for (const key in errors) {
                toast.error(`${key}: ${errors[key][0]}`);
            }
        }
    };

  return (
        <Container style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
            <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                
                {code === '' && (
                    <form onSubmit={handleSubmit}>

                        <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2, color: "whitesmoke !important" }}
                        onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                        />

                        <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        sx={{ mb: 2, color: "whitesmoke !important" }}
                        onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                        />

                        <TextField
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2, color: "whitesmoke !important" }}
                        onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
                        />

                        <TextField
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2, color: "whitesmoke !important" }}
                        onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
                        />

                        <TextField
                        id="date_of_birth"
                        label="Date of Birth"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2, color: "whitesmoke !important" }}
                        onChange={(event) => setFormData({ ...formData, date_of_birth: event.target.value })}
                        />

                        <TextField
                        id="bio"
                        label="Bio"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2, color: "whitesmoke !important" }}
                        onChange={(event) => setFormData({ ...formData, bio: event.target.value })} 
                        />

                        <TextField
                        id="location"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2, color: "whitesmoke !important" }}
                        onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                        />

                        <Button type="submit">Register</Button>

                    </form>
                )}

                {code !== '' && (
                    <div>
                        <p>Registration successful! You have 10 minutes to activate your account.</p>
                        <Button onClick={() => navigate(`/activate/${code}`)}>Activate Account</Button>
                    </div>
                )}

                <ToastContainer />
                </CardContent>
            </Card>
        </Container>
  );
};
