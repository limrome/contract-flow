import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { ModalProvider } from "../modal/ModalContext/ModalContext";
import Forms from "./Forms";
import Sellers from "./Sellers";
import axios from "axios";

export const Main = () => {
	const [userState, setUserState] = React.useState(null);

	React.useEffect(() => {
		axios
			.get("http://localhost:8000/api/user/")
			.then((result) => {
				setUserState(result.data);
			})
			.catch((err) => {
				alert("Ошибка авторизации");
			});
	}, []);

	if (!userState?.role) {
		return <div>Ошибка: пользователь не найден</div>;
	}

	return (
		<ModalProvider>
			<Routes>
				{userState.role === "manager" ? (
					<Route path="*" element={<Forms />} />
				) : (
					<Route path="*" element={<Sellers />} />
				)}
			</Routes>
		</ModalProvider>
	);
};

export default Main;
