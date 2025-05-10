import * as React from "react";
import "./styles.scss";
import "./ViewCounterpartyModal.scss";
import "./EditCounterpartyModal.scss";
import { SellersContent } from "./content/sellers-content";
import { DocumentCreatorNavigation } from "./navigation/document-cretor-navigation";

export const SellersForDocument = () => {
	const [mainFormData, setMainFormData] = React.useState({
		isBtnContract: true,
		isBtnSeller: false,
		isBtnMessage: false,
		isBtnAnalytics: false,
		searchSeller: "",
		documentTypeState: "allDocuments",
	});

	return (
		<div className="sellers-container-doc">
			<SellersContent mainFormData={mainFormData} />
			<DocumentCreatorNavigation mainFormData={mainFormData} setMainFormData={setMainFormData} />
		</div>
	);
};
