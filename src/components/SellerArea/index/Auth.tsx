import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.scss";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			setError("Пожалуйста, заполните все поля.");
			return;
		}

		try {
			const response = await axios.post("http://localhost:8000/api/login/", {
				email,
				password,
			});
			console.log(response.data);

			const token = response.data.token;
			const userData = response.data.user;

			if (token && userData) {
				localStorage.setItem("access", token);

				localStorage.setItem(
					"user",
					JSON.stringify({
						userId: userData.user_id,
						role: userData.role,
						counterpartyId: userData.counterparty_id,
					})
				);
				console.log("Пробуем сохранить токен:", token);
				console.log("Из localStorage:", localStorage.getItem("access"));
				window.location.href = "/";
			} else {
				setError("Неверный логин или пароль");
			}
		} catch (err: any) {
			console.error("Ошибка при логине:", err);
			if (err.response) {
				console.error("Ответ от сервера:", err.response);
			}
			setError(
				err.response?.data?.error || "Произошла ошибка при входе. Проверьте подключение к серверу."
			);
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h3>Вход в систему</h3>
				</div>
				<form onSubmit={handleSubmit} className="modal-body">
					<div className="form-group">
						<label htmlFor="email">Электронная почта:</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Пароль:</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && (
						<p className="error-message" style={{ color: "red" }}>
							{error}
						</p>
					)}
					<div className="modal-footer">
						<button
							type="button"
							className="link-button"
							onClick={() => navigate("/register/user")}>
							Зарегистрироваться
						</button>
						<button type="submit" className="btn-primary">
							Войти
						</button>
						<button type="button" className="btn-secondary" onClick={() => navigate("/")}>
							Отмена
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Auth;
