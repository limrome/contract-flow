import * as React from "react";
import "./styles.scss";
import { DocumentCreatorSidebar } from "./sidebar/sidebar";
import { DocumentCreatorContent } from "./content/content";

export const DocumentCreator = () => {
	const [mainFormData, setMainFormData] = React.useState({
		isKp: false,
		isDkp: true,
		contractNumber: "",
		contractDate: new Date().toISOString().split("T")[0],
		city: "",
		chooseFromList: false,
		delivery: "products", // products, services, productsServices
		sellerFizFio: "",

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
		titleOfCompany: "",
		nameOfGenDir: "",
		currAccount: "",
		nameOfBank: "",
		corrAccount: "",
		urInn: "",
		kpp: "",
		ogrn: "",
		urNumberOfPhone: "",
		urMail: "",
		buyerBirthDate: "",
		numberOfPhoneBuyer: "",
		mailBuyer: "",
		innBuyer: "",
		titleOfCompanyBuyer: "",
		nameOfGenDirBuyer: "",
		urAddress: "",
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
