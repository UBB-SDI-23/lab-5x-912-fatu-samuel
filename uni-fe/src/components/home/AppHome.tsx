import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Autocomplete, Button, Card, CardActions, CardContent, Container, Link, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../constants';

interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    bio: string;
    location: string;
    page_size: number;
}

export const AppHome = () => {

    const [user, setUser] = useState<User>({
        id: 0,
        username: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        bio: '',
        location: '',
        page_size: 0
    });

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = userString !== null ? JSON.parse(userString) : null;

        if (user !== null) {
            setUser(user);
        }
    }, []);

    return (
        <>
            {user.username === '' && (
                <h1>Home page</h1>
            )}

            {user.username !== '' && (
                <>
                    <h1>Welcome, {user.username}!</h1>
                    <Container>
                        <Card style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                            <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                                <TextField
                                    id="username"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2, color: "whitesmoke !important" }}
                                    value={user.username}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2, color: "whitesmoke !important" }}
                                    value={user.first_name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2, color: "whitesmoke !important" }}
                                    value={user.last_name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="date_of_birth"
                                    label="Date of Birth"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2, color: "whitesmoke !important" }}
                                    value={user.date_of_birth}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="bio"
                                    label="Bio"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2, color: "whitesmoke !important" }}
                                    value={user.bio}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="location"
                                    label="Location"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2, color: "whitesmoke !important" }}
                                    value={user.location}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="page_sizes"
                                    label="Page Size"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2, color: "whitesmoke !important" }}
                                    value={user.page_size}
                                    type="number"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event) => {
                                        // changed
                                        const size = Number(event.target.value);
                                        if (size < 1 || size > 100) {
                                            toast.error('Page size must be between 1 and 100');
                                            return;
                                        }

                                        try {
                                            axios.put(`${API_URL}/update-page-size/${user.id}/`, {
                                                "page_size": user.page_size,
                                            }, {
                                                headers: {
                                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                }
                                            });

                                            user.page_size = size;
                                            localStorage.setItem('user', JSON.stringify(user));
                                            setUser({ ...user });
                                        } catch (error) {
                                            toast.error("Error updating page size");
                                        }


                                    }}
                                />

                            </CardContent>
                        </Card>

                        <ToastContainer />
                    </Container>
                </>
            )}

        </>

    );
};