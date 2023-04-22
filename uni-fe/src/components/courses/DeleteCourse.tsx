import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { API_URL } from "../../constants";

export const DeleteCourse = () => {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await axios.delete(`${API_URL}/courses/${courseId}/`);
        navigate("/courses");
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/courses");
    };

    return (
        <Container>
            <Card style={{ backgroundColor: "#242424" }}>
                <CardContent style={{ backgroundColor: "#242424", color: "whitesmoke" }}>
                    <IconButton component={Link} sx={{ mr: 3, color: "whitesmoke" }} to={`/courses`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    Are you sure you want to delete this course? This cannot be undone!
                </CardContent>
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};
