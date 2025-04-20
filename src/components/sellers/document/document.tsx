import React, { useEffect, useState } from "react";
import { DocumentCreatorContent } from "../../document-creator/content/content";
import { mockedDkpDocumentData, mockedDkpDocumentData2 } from "./mock/dkp";
import { useParams } from "react-router-dom";
import "./document.scss"	
export const Document = () => {
	const params = useParams();
	const [data, setData] = useState(null);
	console.log(params.id);

	useEffect(() => {
		if (params.id === "1") {
			setData(mockedDkpDocumentData);
		} else if (params.id === "2") {
			setData(mockedDkpDocumentData2);
		} else {
			setData(null);
		}
	}, []);
	return (
		<div className="form-document">
		<div className="document-creator-container">
			{data !== null && <DocumentCreatorContent mainFormData={data} />}
		</div>
		</div>
	);
};
