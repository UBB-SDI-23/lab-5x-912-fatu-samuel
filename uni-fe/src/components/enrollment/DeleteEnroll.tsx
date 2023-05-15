import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { API_URL } from "../../constants";

export const DeleteEnroll = () => {

    const { enrollId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await axios.delete(`${API_URL}/enroll/${enrollId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        navigate("/enrollments");
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/enrollments");
    };

    return (
        <Container>
            <Card style={{ backgroundColor: "#242424" }}>
                <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                    <IconButton component={Link} sx={{ mr: 3, color: "whitesmoke" }} to={`/students`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    Are you sure you want to remove this enrollment? This cannot be undone!
                </CardContent>
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};
