import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

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
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default SigninPage;
