import React, { useState } from "react";
import axios from "axios";

export const RegisterForm = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/register/", {
                username,
                email,
                password,
                full_name: fullName
            });
            
            // После регистрации автоматически логиним пользователя
            setIsAuthenticated(true);
        } catch (error) {
            setError("Ошибка при регистрации");
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Full Name:
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};
