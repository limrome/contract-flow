import * as React from "react";
import { Outlet } from "react-router-dom";
// import {exportHTML} from "../document-creator/content"


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
	return (
		<>
			<header className="app-header">
				<h1>Система по работе с договорами</h1>
				<button className="btn-export" onClick={exportHTML}>Export</button>
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
