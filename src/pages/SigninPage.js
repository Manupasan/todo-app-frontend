import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TextField from '@mui/material/TextField';

function SigninPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/signin", {
                username,
                password,
            });

            // Save JWT token
            localStorage.setItem("token", response.data);

            // Redirect to tasks page
            navigate("/tasks");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>

                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Box>
        </Container>
    );

}

export default SigninPage;
