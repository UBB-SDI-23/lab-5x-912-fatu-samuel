import { Button, Card, CardContent, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';
import { API_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const data = {
                username: formData.username,
                password: formData.password
            }
            const response = await axios.post(`${API_URL}/login/`, data);
            const access_token = response.data['access'];
            localStorage.setItem('token', access_token);
            navigate(`/`);
        }
        catch (error: any) {
            if (error.response.status === 401) {
                toast.error("Incorrect username or password");
            }
            else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <Container style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
            <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
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
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            type="password"
                            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                        />

                        <Button type="submit">Login</Button>
                    </form>

                    <ToastContainer />
                </CardContent>
            </Card>
        </Container>
    );
};