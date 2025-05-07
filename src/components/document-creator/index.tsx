import * as React from "react";
import "./styles.scss";
import { DocumentCreatorSidebar } from "./sidebar/sidebar";
import { DocumentCreatorContent } from "./content/content";
import { fetchCounterparties } from "../services/counterparty-service";
import { useState, useEffect } from "react";
import axios from "axios";

export const DocumentCreator = () => {
	const [counterparties, setCounterparties] = useState([]);
	const [userState, setUserState] = React.useState(null);
	const [currentAccountState, setCurrentAccountState] = useState(null);

	useEffect(() => {
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

	useEffect(() => {
		if (userState) {
			setMainFormData((prev) => ({
				...prev,
				user_id: userState.user_id, 
			}));
		}
	}, [userState]);

	const [mainFormData, setMainFormData] = React.useState({
		isKp: false,
		isDkp: true,
		contractNumber: "",
		contractDate: new Date().toISOString().split("T")[0],
		city: "",
		chooseFromList: false,
		delivery: "products", // products, services, productsServices
		sellerFizFio: "",
		counterparty_id: "",
		number: "",
		gavenDate: "",
		placeOfBirth: "",
		whoIssued: "",
		code: "",
		address: "",
		seriesBuyer: "",
		numberBuyer: "",
		gavenDateBuyer: "",
		placeOfBirthBuyer: "",
		whoIssuedBuyer: "",
		codeBuyer: "",
		addressBuyer: "",
		buyerFizFio: "",
		numberOfPhone: "",
		mail: "",
		inn: "",
		titleOfCompany: "ЛПДС «Лазарево»",
		nameOfGenDir: "Ахатова Раузида Харисовича",
		currAccount: "",
		nameOfBank: "",
		corrAccount: "",
		urInn: "4582468514",
		kpp: "4155471251",
		ogrn: "1027700049486",
		urNumberOfPhone: "8(800)475-45-75",
		urMail: "lazarevo@mail.ru",
		buyerBirthDate: "",
		numberOfPhoneBuyer: "",
		mailBuyer: "",
		innBuyer: "",
		titleOfCompanyBuyer: "",
		nameOfGenDirBuyer: "",
		urAddress: "Кировская обл., Уржамский р-н, с.Лазарево",
		urAddressBuyer: "",
		nameOfBankBuyer: "",
		currAccountBuyer: "",
		CorAccountBuyer: "",
		urInnBuyer: "",
		kppBuyer: "",
		ogrnBuyer: "",
		UrNumberOfPhoneBuyer: "",
		suggestion: "Устава",
		suggestionBuyer: "Устава",
		urMailBuyer: "",
		ndsPercent: 20,
		term: 5,
		deadline: 3,
		isBuyerFizFace: false,
		isFizFaceState: false,
		seriess: " ",
		isOpenPassport: true,
		isOpenPassportBuyer: true,
		ndsState: false,
		isOpenItemsList: false,
		nds: "",
		products: [],
	});

	console.log(mainFormData);

	return (
		<div className="document-creator-container">
			<DocumentCreatorSidebar setMainFormData={setMainFormData} mainFormData={mainFormData} />
			<DocumentCreatorContent mainFormData={mainFormData} />
		</div>
	);
};
