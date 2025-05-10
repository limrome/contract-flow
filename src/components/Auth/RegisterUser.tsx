import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterUser.scss"; // подключаем стили

const RegisterUser = () => {
	const [form, setForm] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e, key) => {
		setForm({ ...form, [key]: e.target.value });
	};

	const handleSubmit = async () => {
		const res = await fetch("http://localhost:8000/api/register/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});

		const data = await res.json();
		if (res.ok) {
			localStorage.setItem("user_id", data.user_id);
			navigate("/register/counterparty");
		} else {
			alert(data.error || "Ошибка регистрации");
		}
	};

	return (
		<div className="modal-overlay-reg1">
			<div className="modal-content">
				<div className="modal-header">
					<h3>Регистрация</h3>
				</div>
				<div className="modal-body">
					<div className="form-group">
						<label>Email</label>
						<input type="email" value={form.email} onChange={(e) => handleChange(e, "email")} />
					</div>

					<div className="form-group">
						<label>Пароль</label>
						<input
							type="password"
							value={form.password}
							onChange={(e) => handleChange(e, "password")}
						/>
					</div>
				</div>

				<div className="modal-footer">
					<button
						className="btn-primary"
						onClick={handleSubmit}
						disabled={!form.email || !form.password}
						style={{
							opacity: !form.email || !form.password ? 0.5 : 1,
							cursor: !form.email || !form.password ? "not-allowed" : "pointer",
						}}>
						Продолжить
					</button>
				</div>
			</div>
		</div>
	);
};

export default RegisterUser;
