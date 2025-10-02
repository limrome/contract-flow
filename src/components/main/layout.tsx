import * as React from "react";
import { useLocation, Outlet } from "react-router-dom";
import htmlToPdfMake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs } from "../../vfs_fonts"; // путь к твоему файлу

pdfMake.vfs = vfs;

pdfMake.fonts = {
	TimesNewRoman: {
		normal: "Times-New-Roman.ttf",
		bold: "Times-New-Roman-Bold.ttf",
		italics: "Times-New-Roman-Italic.ttf",
		bolditalics: "Times-New-Roman-Bold-Italic.ttf",
	},
};
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

// const exportPDF = () => {
// 	const html = document.getElementById("source-html")?.innerHTML;
// 	if (!html) return alert("Нет данных для экспортирования");

// 	const pdfContent = htmlToPdfMake(html, { window });
// 	const docDefinition = {
// 		content: pdfContent,
// 		defaultStyle: {
// 			font: "TimesNewRoman",
// 			fontSize: 12,
// 			alignment: "justify",
// 		},
// 		pageMargins: [40, 60, 40, 60],
// 	};

// 	pdfMake.createPdf(docDefinition).download("document.pdf");
// };

const exportPDF = () => {
	const container = document.getElementById("source-html");
	if (!container) return alert("Нет данных для экспортирования");

	let html = container.innerHTML;

	// Помечаем целевую таблицу, заменяя id на data-no-border="true"
	html = html.replace(/<table id="no-border-table"/g, '<table data-no-border="true"');

	let pdfContent = htmlToPdfMake(html, { window });

	// Рекурсивно ищем таблицы с data-no-border и отключаем у них границы
	function setNoBorderForTables(content) {
		if (Array.isArray(content)) {
			return content.map(setNoBorderForTables);
		}
		if (typeof content === "object" && content !== null) {
			if (content.table && content.table.body) {
				content.table.widths = new Array(content.table.body[0].length).fill("*");
				// pdfMake ставит свойства 'data' в 'table'?
				// К сожалению, html-to-pdfmake не всегда переносит атрибуты,
				// поэтому тут можно попробовать поискать по содержимому таблицы
				// либо по признаку, например, если в первой ячейке есть уникальный текст

				// Пример: если первая ячейка таблицы содержит "г. " (из твоей таблицы)
				if (
					content.table.body[0][0].text &&
					typeof content.table.body[0][0].text === "string" &&
					content.table.body[0][0].text.startsWith("г. ")
				) {
					content.layout = {
						hLineWidth: () => 0,
						vLineWidth: () => 0,
						paddingLeft: () => 0,
						paddingRight: () => 0,
						paddingTop: () => 0,
						paddingBottom: () => 0,
					};
					content.table.widths = new Array(content.table.body[0].length).fill("*");
				}
			}
			for (const key in content) {
				if (typeof content[key] === "object") {
					content[key] = setNoBorderForTables(content[key]);
				}
			}
			return content;
		}
		return content;
	}

	pdfContent = setNoBorderForTables(pdfContent);

	const docDefinition = {
		content: pdfContent,
		defaultStyle: {
			font: "TimesNewRoman",
			fontSize: 12,
			alignment: "justify",
		},
		pageMargins: [40, 60, 40, 60],
	};

	pdfMake.createPdf(docDefinition).download("document.pdf");
};

// const exportPDF = () => {
// 	const html = document.getElementById("source-html")?.innerHTML;
// 	if (!html) return alert("Нет данных для экспортирования");

// 	let pdfContent = htmlToPdfMake(html, { window });

// 	// Функция рекурсивно проходит по содержимому pdfContent и ищет таблицы с классом no-border
// 	function removeBordersFromNoBorderTables(content) {
// 		if (Array.isArray(content)) {
// 			return content.map(removeBordersFromNoBorderTables);
// 		}
// 		if (typeof content === "object" && content !== null) {
// 			if (content.table && content.table.body) {
// 				// Проверяем, есть ли класс no-border в стиле или class
// 				// В html-to-pdfmake класс из HTML становится атрибутом `className` в объекте
// 				// (проверь, в твоем случае это так, иначе можно искать в style)
// 				const hasNoBorderClass = content.className === "no-border";

// 				if (hasNoBorderClass) {
// 					return {
// 						...content,
// 						layout: {
// 							hLineWidth: () => 0,
// 							vLineWidth: () => 0,
// 							paddingLeft: () => 0,
// 							paddingRight: () => 0,
// 							paddingTop: () => 0,
// 							paddingBottom: () => 0,
// 						},
// 					};
// 				}
// 			}

// 			// Рекурсивно обрабатываем вложенные объекты
// 			for (const key in content) {
// 				if (typeof content[key] === "object") {
// 					content[key] = removeBordersFromNoBorderTables(content[key]);
// 				}
// 			}
// 			return content;
// 		}
// 		return content;
// 	}

// 	pdfContent = removeBordersFromNoBorderTables(pdfContent);

// 	const docDefinition = {
// 		content: pdfContent,
// 		defaultStyle: {
// 			font: "TimesNewRoman",
// 			fontSize: 12,
// 			alignment: "justify",
// 		},
// 		pageMargins: [40, 60, 40, 60],
// 	};

// 	pdfMake.createPdf(docDefinition).download("document.pdf");
// };

export const FormLayout = () => {
	const location = useLocation();
	const isDocumentPage = location.pathname.match(/^\/document\/\d+$/);
	const isCreatorPage = location.pathname === "/creator";
	const isSellerDocumentPage = location.pathname.match(/^\/seller\/document\/\d+$/);

	const [menuOpen, setMenuOpen] = React.useState(false);

	// Закрывать меню при клике вне кнопки
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".export-menu") && !target.closest(".btn-export")) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	if (!(isCreatorPage || isDocumentPage || isSellerDocumentPage))
		return (
			<>
				<header className="app-header">
					<h2>Система по работе с договорами</h2>
				</header>
				<div style={{ paddingTop: "50px" }}>
					<Outlet />
				</div>
			</>
		);

	return (
		<>
			<header className="app-header" style={{ position: "relative" }}>
				<h2>Система по работе с договорами</h2>

				<button
					className="btn-export"
					onClick={() => setMenuOpen((prev) => !prev)}
					style={{ position: "relative", zIndex: 10 }}>
					Экспорт
				</button>

				{menuOpen && (
					<div
						className="export-menu"
						style={{
							position: "absolute",
							top: "40px",
							right: "10px",
							background: "white",
							border: "1px solid #ccc",
							borderRadius: "4px",
							boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
							zIndex: 100,
						}}>
						<button
							style={{
								display: "block",
								padding: "10px 20px",
								width: "100%",
								border: "none",
								background: "none",
								textAlign: "left",
								cursor: "pointer",
							}}
							onClick={() => {
								exportHTML();
								setMenuOpen(false);
							}}>
							Экспорт в Word
						</button>
						<button
							style={{
								display: "block",
								padding: "10px 20px",
								width: "100%",
								border: "none",
								background: "none",
								textAlign: "left",
								cursor: "pointer",
							}}
							onClick={() => {
								exportPDF();
								setMenuOpen(false);
							}}>
							Экспорт в PDF
						</button>
					</div>
				)}
			</header>
			<Outlet />
		</>
	);
};
