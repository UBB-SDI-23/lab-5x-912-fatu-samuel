import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import CreateIcon from '@mui/icons-material/Create';
import { User } from "../../models/User";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

export const AppMenu = () => {

    const location = useLocation();
    const path = location.pathname;

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
		const intervalId = setInterval(() => {
			const userString = localStorage.getItem('user');
            const user = userString !== null ? JSON.parse(userString) : null;

			if (user !== null) {
                setUser(user);
                return;
			}
            
            setUser({
                id: 0,
                username: '',
                first_name: '',
                last_name: '',
                date_of_birth: '',
                bio: '',
                location: '',
                page_size: 0
            });
		}, 250);
	
		return () => clearInterval(intervalId);
	  }, []);

    return (
        <Box>
            <AppBar >
                <Toolbar>

                    <Button
                        variant={path.length === 1 ? "outlined" : "text"}
                        to="/"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5, ":hover": { color: "#112350" } }}
                        startIcon={<HomeIcon />}>
                        Home
                    </Button>

                    {user.username === '' && (
                        <Button
                            variant={path.startsWith("/register") ? "outlined" : "text"}
                            to="/register"
                            component={Link}
                            color="inherit"
                            sx={{ mr: 5, ":hover": { color: "#112350" } }}
                            startIcon={<HowToRegIcon />}>
                            Register
                        </Button>
					)}

                    {user.username === '' && (
                        <Button
                            variant={path.startsWith("/login") ? "outlined" : "text"}
                            to="/login"
                            component={Link}
                            color="inherit"
                            sx={{ mr: 5, ":hover": { color: "#112350" } }}
                            startIcon={<LoginIcon />}>
                            LogIn
                        </Button>
					)}

					{user.username !== '' && (
                        <Button
                            variant={path.startsWith("/logout") ? "outlined" : "text"}
                            to="/logout"
                            component={Link}
                            color="inherit"
                            sx={{ mr: 5, ":hover": { color: "#112350" } }}
                            startIcon={<LogoutIcon />}>
                            LogOut
                        </Button>
					)}


                    <Button
                        variant={path.startsWith("/students") && !path.startsWith('/students/avg-fee') ? "outlined" : "text"}
                        to="/students"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5, ":hover": { color: "#112350" } }}
                        startIcon={< SchoolIcon />}>
                        Students
                    </Button>

                    <Button
                        variant={path.startsWith("/teachers") ? "outlined" : "text"}
                        to="/teachers"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5, ":hover": { color: "#112350" } }}
                        startIcon={<LocalLibraryIcon />}>
                        Teachers
                    </Button>

                    <Button
                        variant={path.startsWith("/courses") ? "outlined" : "text"}
                        to="/courses"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5, ":hover": { color: "#112350" } }}
                        startIcon={<ClassIcon />}>
                        Courses
                    </Button>

                    <Button
                        variant={path.startsWith("/enrollments") ? "outlined" : "text"}
                        to="/enrollments"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5, ":hover": { color: "#112350" } }}
                        startIcon={<CreateIcon />}>
                        Enrollments
                    </Button>


                    <Button
                        variant={path.startsWith("/statistics") ? "outlined" : "text"}
                        to="/statistics"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5, ":hover": { color: "#112350" } }}
                        startIcon={<BarChartOutlinedIcon />}>
                        Statistics
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}