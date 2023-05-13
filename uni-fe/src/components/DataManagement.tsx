import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Link } from 'react-router-dom';
import { API_URL } from "../constants";

export const DataManagement = () => {

    async function runScript(table: string, type: string) {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            if (!token) {
                return;
            }
            await axios.post(`${API_URL}/database/${table}/${type}/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        } catch (error: any) {
            console.log(error.response.status);
            return;
        }
    }

    return (

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 2, columnGap: 5 }}>
            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} component={Link} sx={{ mr: 3 }} to="/bulk/students">
                Bulk delete students
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} onClick={async () => await runScript('students', 'generate')}>
                Generate students
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} onClick={async () => await runScript('students', 'truncate')}>
                Truncate students
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} component={Link} sx={{ mr: 3 }} to="/bulk/teachers">
                Bulk delete teachers
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} onClick={async () => await runScript('teachers', 'generate')}>
                Generate teachers
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} onClick={async () => await runScript('teachers', 'truncate')}>
                Truncate teachers
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} component={Link} sx={{ mr: 3 }} to="/bulk/courses">
                Bulk delete courses
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} onClick={async () => await runScript('courses', 'generate')}>
                Generate courses
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} onClick={async () => await runScript('courses', 'truncate')}>
                Truncate courses  
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} component={Link} sx={{ mr: 3 }} to="/bulk/users">
                Bulk delete users
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} onClick={async () => await runScript('enrollments', 'generate')}>
                Generate enrollments
            </Button>

            <Button style={{ color: "whitesmoke", border: '1px solid whitesmoke', width: "300px" }} onClick={async () => await runScript('enrollments', 'truncate')}>
                Truncate enrollments
            </Button>

      

        </Box>

    );
};