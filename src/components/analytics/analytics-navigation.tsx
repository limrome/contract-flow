// import * as React from "react";
// import { useNavigate } from "react-router-dom";

// export const AnalyticsNavigation = () => {
// 	const navigate = useNavigate();

// 	return (
// 		<div className="navigation" id="navigation">
// 			<div className="navigation__header" onClick={() => navigate("/", { replace: false })}>
// 				<button className="icon-btn" />
// 				<span className="span">Документы</span>
// 			</div>

// 			<div className="navigation__header" onClick={() => navigate("/sellers", { replace: false })}>
// 				<button className="icon-btn-seller" />
// 				<span className="span">Контрагенты</span>
// 			</div>
// 			<div
// 				className="navigation__header"
// 				onClick={() => navigate("/analitics", { replace: false })}>
// 				<button className="icon-btn-analytics" />
// 				<span className="span">Аналитика</span>
// 			</div>
// 		</div>
// 	);
// };

import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AnalyticsNavigation = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (path: string) => location.pathname === path;

	return (
		<div className="navigation" id="navigation">
			<div
				className={`navigation__header ${isActive("/") ? "active" : ""}`}
				onClick={() => navigate("/", { replace: false })}>
				<button className="icon-btn" />
				<span className="span">Документы</span>
			</div>

			<div
				className={`navigation__header ${isActive("/sellers") ? "active" : ""}`}
				onClick={() => navigate("/sellers", { replace: false })}>
				<button className="icon-btn-seller" />
				<span className="span">Контрагенты</span>
			</div>

			<div
				className={`navigation__header ${isActive("/analytics") ? "active" : ""}`}
				onClick={() => navigate("/analytics", { replace: false })}>
				<button className="icon-btn-analytics" />
				<span className="span">Аналитика</span>
			</div>
		</div>
	);
};
