import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

export const AppMenu = () => {

    const location = useLocation();
    const path = location.pathname;

    return (
        <Box>
            <AppBar >
                <Toolbar>
                    <IconButton
                        component={Link}
                        to="/student"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="school"
                        sx={{ mr: 2 }}>
                        <SchoolIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ mr: 5 }}>
                        Students
                    </Typography>
                    <Button
                        variant={path.startsWith("/students/avg-fee") ? "outlined" : "text"}
                        to="/students/avg-fee"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<LocalLibraryIcon />}>
                        Statistics
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}