import * as React from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const exportHTML = () => {
	var header =
		"<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
		"xmlns:w='urn:schemas-microsoft-com:office:word' " +
		"xmlns='http://www.w3.org/TR/REC-html40'>" +
		"<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
	var footer = "</body></html>";
	var sourceHTML = header + document.getElementById("source-html").innerHTML + footer;

	var source = "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(sourceHTML);
	var fileDownload = document.createElement("a");
	document.body.appendChild(fileDownload);
	fileDownload.href = source;
	fileDownload.download = "document.doc";
	fileDownload.click();
	document.body.removeChild(fileDownload);
};

export const FormLayout = () => {
	const location = useLocation();
	console.log(location);
	const isDocumentPage = location.pathname.match(/^\/document\/\d+$/);
	const isCreatorPage = location.pathname === "/creator";
	const isSellerDocumentPage = location.pathname.match(/^\/seller\/document\/\d+$/);
	return (
		<>
			<header className="app-header">
				<h2>Система по работе с договорами</h2>
				{isCreatorPage || isDocumentPage || isSellerDocumentPage ? (
					<button className="btn-export" onClick={exportHTML}>
						Export
					</button>
				) : null}
			</header>
			<div
				style={{
					paddingTop: "50px",
				}}>
				<Outlet />
			</div>
		</>
	);
};
