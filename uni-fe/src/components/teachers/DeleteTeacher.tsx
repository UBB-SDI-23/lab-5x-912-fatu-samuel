import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { API_URL } from "../../constants";

export const DeleteTeacher = () => {

    const { teacherId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await axios.delete(`${API_URL}/teachers/${teacherId}/`);
        navigate("/teachers");
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/teachers");
    };

    return (
        <Container>
            <Card style={{ backgroundColor: "#242424" }}>
                <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                    <IconButton component={Link} sx={{ mr: 3, color: "whitesmoke" }} to={`/teachers`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    Are you sure you want to delete this teacher? This cannot be undone!
                </CardContent>
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};
