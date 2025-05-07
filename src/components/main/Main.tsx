import * as React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ModalProvider } from "../modal/ModalContext/ModalContext";
import Forms from "./Forms";
import { IUser } from "../user";
import Sellers from "./Sellers";
import axios from "axios";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: #e5e5e5;
	overflow: hidden;
`;

const ContentContainer = styled.div`
	padding: 40px 40px 120px 40px;
	padding-left: 304px;
	width: 100%;
	height: 100%;
	overflow: auto;
`;

interface IMainProps {
	user: IUser;
}

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
