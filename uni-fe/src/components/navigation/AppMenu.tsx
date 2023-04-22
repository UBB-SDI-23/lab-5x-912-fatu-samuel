import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';

export const AppMenu = () => {

    const location = useLocation();
    const path = location.pathname;

    return (
        <Box>
            <AppBar >
                <Toolbar>

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
                        variant={path.startsWith("/students/avg-fee") ? "outlined" : "text"}
                        to="/students/avg-fee"
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