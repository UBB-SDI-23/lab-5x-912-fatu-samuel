import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Autocomplete, Button, Card, CardActions, CardContent, Container, Link, TextField } from '@mui/material';

interface User {
    username: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    bio: string;
    location: string;
}

export const AppHome = () => {

    const [user, setUser] = useState<User>({
        username: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        bio: '',
        location: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: any = jwt_decode(token);
            const user = decoded['user'];
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

                            </CardContent>
                        </Card>
                    </Container>
                </>
            )}

        </>

    );
};