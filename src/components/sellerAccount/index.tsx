import * as React from "react";
import "./styles.scss";
import "./EditCounterpartyModalProfile.scss";
import { SellerAccountContent } from "./content/seller-account-content";
import { SellerAccountNavigation } from "./navigation/seller-account-navigation";
import { EmployeeProfile } from "../sellerAccount/content/seller-account-content";
// import { counterparties } from "../sellers/content/sellers-content";
import { fetchCounterparties } from "../services/counterparty-service";
import { useState, useEffect } from "react";

export const SellerAccount = () => {
	const [counterparties, setCounterparties] = useState([]);

	useEffect(() => {
		fetchCounterparties().then(setCounterparties).catch(console.error);
	}, []);
	// 👉 Получаем контрагента по ID (или просто первого, как пример)
	const currentCounterparty = counterparties.find((c) => c.id === 2);

	return (
		<div className="seller-account-container">
			<SellerAccountContent employeeData={currentCounterparty as EmployeeProfile} />
			<SellerAccountNavigation />
		</div>
	);
};
