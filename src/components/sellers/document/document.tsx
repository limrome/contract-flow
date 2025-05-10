import React, { useEffect, useState } from "react";
import { DocumentCreatorContent } from "../../document-creator/content/content";
import { useParams } from "react-router-dom";
import "./document.scss";
import axios from "axios";

export const Document = () => {
	const params = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDocument = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/api/documents/${params.id}/`);
				setData(response.data);
			} catch (err) {
				console.error("Ошибка загрузки документа:", err);
				setError("Ошибка загрузки документа");
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchDocument();
		}
	}, [params.id]);

	return (
		<div className="form-document">
			<div className="document-creator-container">
				{loading && <p>Загрузка документа...</p>}
				{error && <p>{error}</p>}
				{!loading && data && <DocumentCreatorContent mainFormData={data.data} />}
			</div>
		</div>
	);
};
