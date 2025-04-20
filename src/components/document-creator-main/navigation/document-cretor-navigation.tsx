import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DocumentCreatorNavigation = ({ mainFormData, setMainFormData }) => {
	// 	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 		const { name, checked } = e.target;
	// 		if (name === "btn-contract") setMainFormData({ ...mainFormData, isBtnContract: checked });
	// 		if (name === "btn-seller") setMainFormData({ ...mainFormData, isBtnSeller: checked });
	// 		if (name === "btn-message") setMainFormData({ ...mainFormData, isBtnMessage: checked });
	// 		if (name === "btn-analytics") setMainFormData({ ...mainFormData, isBtnAnalytics: checked });
	// 	};
	const navigate = useNavigate();

	return (
		<div className="navigation" id="navigation">
			<div className="navigation__header" onClick={() => navigate("/", { replace: false })}>
				
				<button className="icon-btn" />
				<span className="span">Документы</span>
			</div>

			<div className="navigation__header" onClick={() => navigate("/sellers", { replace: false })}>
				<button className="icon-btn-seller" />
				<span className="span">Контрагенты</span>
			</div>
			<div className="navigation__header">
				<input
					type="button"
					className="icon-btn-analytics"
					name="btn-analytics"
					checked={mainFormData.isBtnAnalytics}
				/>
				<span className="span">Аналитика</span>
			</div>
		</div>
	);
};
