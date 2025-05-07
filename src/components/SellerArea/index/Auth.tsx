// import * as React from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import { AuthForm, Background } from "./wrappers";
// import { Stack } from "../../../ui-kit/layouts/Stack";
// import { Cluster } from "../../../ui-kit/layouts/Cluster";
// import { IUser } from "../../user";
// import { Input } from "../../common/Forms/Input";
// import Button from "../../../ui-kit/Button";
// import { connect } from "react-redux";
// import { postAuth } from "../../../Actions/auth-actions";

// export const Auth = ({ postAuth }) => {
//     const navigate = useNavigate();
//     const [userState, setUserState] = React.useState<Omit<IUser, "id" | "phone" | "company_name" | "name">>({
//         type: "seller",
//         email: "",
//         password: "",
//     })

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key) => {
//         const value = e.target.value;
//         setUserState({ ...userState, [key]: value })
//     }
//     function handleSaveClick(): void {
//         postAuth(userState)
//     }

//     return (
//         <Background>
//             <AuthForm>
//                 <Stack space="24px">
//                     <Cluster justify="center">
//                         {/* <img style={{ width: "64px", height: "64px", borderRadius: "16px" }} src="/images/universal/navbar/logo.png" alt="логотип" /> */}
//                     </Cluster>
//                     <Cluster justify="center">
//                         <div className="sub1">Вход в сервис</div>
//                     </Cluster>
//                     <Stack space="8px">
//                         <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Email</div>
//                         <Input type="email" name="login" placeholder="" value={userState.email} onChange={(e) => handleInputChange(e, "email")} />
//                     </Stack>

//                     <Stack space="8px">
//                         <div className="sub3" style={{ color: "rgba(104, 125, 141, 0.7)" }}>Пароль</div>
//                         <Input type="password" placeholder="" value={userState.password} onChange={(e) => handleInputChange(e, "password")} />
//                     </Stack>
//                     <Cluster justify="center">
//                         <Button variant="primary" text="Войти" disabled={userState.email.length === 0 || userState.password.length === 0 ? true : false} onClick={() => handleSaveClick()} />
//                     </Cluster>
//                     <Cluster align="center" space="6px" justify="center">
//                         <div className="sub3" style={{ color: "rgba(164, 165, 181)" }}>Ещё нет профиля?</div>
//                         <div onClick={() => navigate("/sign_up")} className="sub3" style={{ fontWeight: 600, cursor: "pointer" }}>Зарегистрироваться</div>
//                     </Cluster>
//                 </Stack>
//             </AuthForm>
//         </Background>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         loading: state.loadingStatus.loading,
//     };
// };

// const mapDispatchToProps = {
//     postAuth,
// };

// export default connect(null, mapDispatchToProps)(Auth);

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import jwt_decode from "jwt-decode";

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
			const text = await response;
			console.log("Ответ от сервера:", text);
			const data = await response;

			if (data) {
				console.log("Ответ от сервера:", text);
				localStorage.setItem("access", data.data?.token);

				window.location.href = "/";

				// Декодируем токен и сохраняем роль (и другие нужные данные)
				// const tokenDecoded = jwt_decode<{ role: string; id: number; email: string }>(
				// 	data.data.token
				// );
				// localStorage.setItem(
				// 	"user",
				// 	JSON.stringify({
				// 		role: tokenDecoded.role,
				// 		email: tokenDecoded.email,
				// 		id: tokenDecoded.id,
				// 	})
				// );

				// Переход на общее приложение — дальше маршруты разрулит Main
			} else {
				setError(data.error || "Неверный логин или пароль");
			}
		} catch (err) {
			console.error("Ошибка при логине:", err);
			setError("Произошла ошибка при входе.");
		}
	};

	return (
		<div className="auth-container">
			<h2>Вход в систему</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Электронная почта:</label>
					<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label htmlFor="password">Пароль:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && <p className="error-message">{error}</p>}
				<button type="submit">Войти</button>
			</form>
		</div>
	);
};

export default Auth;
