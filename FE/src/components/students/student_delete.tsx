import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { API_URL } from "../../main";

export const DeleteStudent = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await axios.delete(`../../${API_URL}/students/${studentId}/`);
        navigate("/students");
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/students");
    };

    return (
        <Container>
            <Card style={{ backgroundColor: "#242424" }}>
                <CardContent style={{ backgroundColor: "#242424" }}>
                    <IconButton component={Link} sx={{ mr: 3, color: "whitesmoke" }} to={`/students`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    Are you sure you want to delete this student? This cannot be undone!
                </CardContent>
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};
