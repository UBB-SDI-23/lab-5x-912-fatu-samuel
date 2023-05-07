import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Card, CardContent, Container, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../constants';
import { UserWithCounts } from '../../models/UserWithCounts';

export const UserProfile = () => {

    const { profileId } = useParams();

    const [user, setUser] = useState<UserWithCounts>({
        username: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        bio: '',
        location: '',
        teacher_count:0,
        student_count:0,
        course_count:0
    });

    useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch(`${API_URL}/profile/${profileId}/`);
			const user = await response.json();
			setUser(user);
		};
		fetchUser();
	}, [profileId]);

    return (
	
		<>
		{user.username === '' && (<h1>Home page</h1>)}

		{user.username !== '' && (
			<>
            <h1>Profile of {user.username}</h1>
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
                            id="FirstName"
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
                            id="teachers"
                            label="Teachers Count"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            value={user.teacher_count}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{ shrink: true }} 
                        />

                        <TextField
                            id="students"
                            label="Students Count"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            value={user.student_count}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{ shrink: true }} 
                        />  

                        <TextField
                            id="courses"
                            label="Courses Count"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, color: "whitesmoke !important" }}
                            value={user.course_count}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{ shrink: true }} 
                        />  
                    </CardContent>
                </Card>
            </Container>
            </>)}
	</>
    );
};