// import * as React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const DocumentCreatorNavigation = ({ mainFormData, setMainFormData }) => {
// 	const navigate = useNavigate();
// 	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, checked } = e.target;
// 		if (name === "btn-contract") setMainFormData({ ...mainFormData, isBtnContract: checked });
// 		if (name === "btn-seller") setMainFormData({ ...mainFormData, isBtnSeller: checked });
// 		if (name === "btn-message") setMainFormData({ ...mainFormData, isBtnMessage: checked });
// 		if (name === "btn-analytics") setMainFormData({ ...mainFormData, isBtnAnalytics: checked });
// 	};

// 	return (
// 		<div className="navigation" id="navigation">
// 			<div className="navigation__header">
// 				<input
// 					type="button"
// 					className="icon-btn"
// 					name="btn-contract"
// 					checked={mainFormData.isBtnContract}
// 					onClick={() => navigate("/")}
// 					onChange={handleCheckboxChange}
// 				/>
// 				<span className="span">Документы</span>
// 			</div>
// 			<div className="navigation__header">
// 				<input
// 					type="button"
// 					className="icon-btn-seller"
// 					name="btn-seller"
// 					checked={mainFormData.isBtnSeller}
// 					onChange={handleCheckboxChange}
// 				/>
// 				<span className="span">Контрагенты</span>
// 			</div>

// 			<div className="navigation__header">
// 				<input
// 					type="button"
// 					className="icon-btn-analytics"
// 					name="btn-analytics"
// 					checked={mainFormData.isBtnAnalytics}
// 					onChange={handleCheckboxChange}
// 				/>
// 				<span className="span">Аналитика</span>
// 			</div>
// 		</div>
// 	);
// };

import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const DocumentCreatorNavigation = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (path: string) => location.pathname === path;

	return (
		<div className="navigation" id="navigation">
			<div
				className={`navigation__header ${isActive("/") ? "active" : ""}`}
				onClick={() => navigate("/")}>
				<button className="icon-btn" />
				<span className="span">Документы</span>
			</div>

			<div
				className={`navigation__header ${isActive("/sellers") ? "active" : ""}`}
				onClick={() => navigate("/sellers")}>
				<button className="icon-btn-seller" />
				<span className="span">Контрагенты</span>
			</div>

			<div
				className={`navigation__header ${isActive("/analytics") ? "active" : ""}`}
				onClick={() => navigate("/analytics")}>
				<button className="icon-btn-analytics" />
				<span className="span">Аналитика</span>
			</div>
		</div>
	);
};
