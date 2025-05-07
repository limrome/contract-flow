import * as React from "react";
import "./styles.scss";
import "./EditCounterpartyModalProfile.scss";
import { SellerAccountContent } from "./content/seller-account-content";
import { SellerAccountNavigation } from "./navigation/seller-account-navigation";
import { EmployeeProfile } from "../sellerAccount/content/seller-account-content";
import { fetchCounterparties } from "../services/counterparty-service";
import { useState, useEffect } from "react";
import axios from "axios";

export const SellerAccount = () => {
	const [counterparties, setCounterparties] = useState([]);
	const [userState, setUserState] = React.useState(null);
	const [currentAccountState, setCurrentAccountState] = useState(null);

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

	useEffect(() => {
		fetchCounterparties().then(setCounterparties).catch(console.error);
	}, []);

	useEffect(() => {
		if (!counterparties || !userState) return;
		const currentCounterparty = counterparties.find((c) => c.user === userState.user_id);
		setCurrentAccountState(currentCounterparty);
	}, [userState, counterparties]);

	console.log(currentAccountState);
	return (
		<div className="seller-account-container">
			{currentAccountState && (
				<SellerAccountContent employeeData={currentAccountState as EmployeeProfile} />
			)}
			<SellerAccountNavigation />
		</div>
	);
};
