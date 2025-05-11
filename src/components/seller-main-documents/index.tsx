import * as React from "react";
import "./styles.scss";
import { SellerMainDocumentsSidebar } from "./seller-main-documents-sidebar/seller-main-documents-sidebar";
import { SellerMainDocumentsContent } from "./seller-main-documents-content/seller-main-documents-content";

import { SellerMainDocumentsNavigation } from "./seller-main-documents-navigation/seller-main-documents-navigation";
import "./SellerDocumentApprovalModal.scss";

export const SellerMainDocuments = () => {
	const [mainFormData, setMainFormData] = React.useState({
		isBtnContract: true,
		isBtnSeller: false,
		isBtnMessage: false,
		isBtnAnalytics: false,
		searchAll: "",
		searchAgreed: "",
		searchToBeAgreed: "",
		searchNotAgreed: "",
		documentTypeState: "allDocuments",
		counterpartyId: null,
	});


	return (
		<div className="seller-container-main">
			<SellerMainDocumentsSidebar
				mainFormDataDocument={mainFormData}
				setMainFormDataDocument={setMainFormData}
			/>
			<SellerMainDocumentsContent mainFormData={mainFormData}  setMainFormData={setMainFormData}/>
			<SellerMainDocumentsNavigation />
		</div>
	);
};
