import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

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
        <Container
            maxWidth="xs"
            sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 3,
                boxShadow: 3,
                py: 5,
                mt: 8,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "left",
                    mb: 2,
                }}
            ></Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#1976d2" }}
                >
                    Login
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 2,
                        width: "100%",
                    }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        sx={{ mb: 2 }}
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
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2, borderRadius: 2 }}
                    >
                        Login
                    </Button>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default SigninPage;
