import * as React from "react";
import "./styles.scss";
import AnalyticsDashboard from "./Analitics-dashboard";
import { AnalyticsNavigation } from "./analytics-navigation";
// import "./DocumentApprovalModal.scss";

export const Analytics = () => {
	// const [mainFormData, setMainFormData] = React.useState({
	// 	isBtnContract: true,
	// 	isBtnSeller: false,
	// 	isBtnMessage: false,
	// 	isBtnAnalytics: false,
	// 	searchAll: "",
	// 	searchAgreed: "",
	// 	searchToBeAgreed: "",
	// 	searchNotAgreed: "",
	// 	documentTypeState: "allDocuments",
	// });

	return (
		<div>
			<div className="analytics-container">
				<AnalyticsDashboard	/>
				
				<AnalyticsNavigation />
			</div>
		</div>
	);
};
