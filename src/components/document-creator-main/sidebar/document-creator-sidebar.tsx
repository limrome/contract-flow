import * as React from "react";
import { useNavigate } from "react-router-dom";

export const DocumentCreatorSidebar = ({ setMainFormDataDocument, mainFormDataDocument }) => {
	const navigate = useNavigate();

	const handleDocumentTypeChangeClick = (key: string) => {
		setMainFormDataDocument({ ...mainFormDataDocument, documentTypeState: key });
	};

	const documentTypes = [
		{ key: "allDocuments", label: "Все документы" },
		{ key: "toBeAgreedDocuments", label: "На согласовании" },
		{ key: "agreedDocuments", label: "Согласованные" },
		{ key: "notAgreedDocuments", label: "Несогласованные" },
		{ key: "createdDocuments", label: "Созданные" },
	];

	return (
		<div className="sidebar">
			<div className="contracts-container-all">
				<button className="add-button-contract" onClick={() => navigate("/creator")}>
					+ Новый документ
				</button>
			</div>

			{documentTypes.map(({ key, label }) => (
				<button
					key={key}
					className={`dropdown-button ${
						mainFormDataDocument.documentTypeState === key ? "active" : ""
					}`}
					onClick={() => handleDocumentTypeChangeClick(key)}>
					<span className="rz-text-subtitle">{label}</span>
				</button>
			))}
		</div>
	);
};
