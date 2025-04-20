import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const DocumentCreatorSidebar = ({ setMainFormDataDocument, mainFormDataDocument }) => {

	const navigate = useNavigate();

	const handleDocumentTypeChangeClick = (key: string) => {
		setMainFormDataDocument({ ...mainFormDataDocument, documentTypeState: key });
	};

	return (
		<div className="sidebar">
			<div className="contracts-container-all">
				<button
					className="add-button-contract"
					onClick={() => navigate("/creator")}>
					+ Новый документ
				</button>
			</div>
			<button
				className={`dropdown-button ${
					mainFormDataDocument.documentTypeState === "allDocuments" ? "active" : ""
				}`}
				onClick={() => handleDocumentTypeChangeClick("allDocuments")}>
				<span className="rz-text-subtitle">Все документы</span>
			</button>

			<button
				className={`dropdown-button ${
					mainFormDataDocument.documentTypeState === "toBeAgreedDocuments" ? "active" : ""
				}`}
				onClick={() => handleDocumentTypeChangeClick("toBeAgreedDocuments")}>
				<span className="rz-text-subtitle">На согласовании</span>
			</button>

			<button
				className={`dropdown-button ${
					mainFormDataDocument.documentTypeState === "agreedDocuments" ? "active" : ""
				}`}
				onClick={() => handleDocumentTypeChangeClick("agreedDocuments")}>
				<span className="rz-text-subtitle">Согласованные</span>
			</button>

			<button
				className={`dropdown-button ${
					mainFormDataDocument.documentTypeState === "notAgreedDocuments" ? "active" : ""
				}`}
				onClick={() => handleDocumentTypeChangeClick("notAgreedDocuments")}>
				<span className="rz-text-subtitle">Несогласованные</span>
			</button>
			<button
				className={`dropdown-button ${
					mainFormDataDocument.documentTypeState === "craetedDocuments" ? "active" : ""
				}`}
				onClick={() => handleDocumentTypeChangeClick("cratedDocuments")}>
				<span className="rz-text-subtitle">Созданные</span>
			</button>
		</div>
	);
};
