import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Button,
} from "@mui/material"; import { useEffect, useState } from "react"
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Link } from "react-router-dom";
import { StudentWithFee } from "../../models/StudentWithFee";
import { API_URL } from "../../constants";

const ViewStudentsAvgFee = () => {

    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/students/avg-fee/`)
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
                console.log(data);
            });
    }, [])

    return (
        <Container>
            <Button
                to="/statistics/avg-fee"
                component={Link}
                sx={{ mr: 5, ":hover": { color: "#16bdd6" } }}
            >
                Students by avg fee
            </Button>

            <Button
                to="/statistics/teachers"
                component={Link}
                sx={{ mr: 5, ":hover": { color: "#16bdd6" } }}
            >
                Teachers # of courses
            </Button>

            <Button
                to="/statistics/filter-fee"
                component={Link}
                sx={{ mr: 5, ":hover": { color: "#16bdd6" } }}
            >
                Filter by fee
            </Button>
        </Container>
    )
}

export default ViewStudentsAvgFee;