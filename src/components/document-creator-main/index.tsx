import * as React from "react";
import "./styles.scss";
import { DocumentCreatorSidebar } from "./sidebar/document-creator-sidebar";
import { DocumentCreatorMainContent } from "./content/document-creator-main-content";

import { DocumentCreatorNavigation } from "./navigation/document-cretor-navigation";
import "./DocumentApprovalModal.scss";

export const DocumentCreatorMain = () => {
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
	});

	return (
		<div>
			<div className="document-creator-container-main">
				<DocumentCreatorSidebar
					mainFormDataDocument={mainFormData}
					setMainFormDataDocument={setMainFormData}
				/>
				<DocumentCreatorMainContent mainFormData={mainFormData} />
				<DocumentCreatorNavigation mainFormData={mainFormData} setMainFormData={setMainFormData} />
			</div>
		</div>
	);
};
