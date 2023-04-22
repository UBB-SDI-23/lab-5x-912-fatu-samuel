import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SchoolIcon from '@mui/icons-material/School';

export const AppMenu = () => {

    const location = useLocation();
    const path = location.pathname;

    return (
        <Box>
            <AppBar >
                <Toolbar>

                    <Button
                        variant={path == "/students" ? "outlined" : "text"}
                        to="/students"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={< SchoolIcon />}>
                        Students
                    </Button>
                    <Button
                        variant={path == "/teachers" ? "outlined" : "text"}
                        to="/teachers"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<LocalLibraryIcon />}>
                        Teachers
                    </Button>
                    <Button
                        variant={path.startsWith("/students/avg-fee") ? "outlined" : "text"}
                        to="/students/avg-fee"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<BarChartOutlinedIcon />}>
                        Statistics
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}