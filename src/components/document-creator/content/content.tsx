import * as React from "react";
import Table from "react-bootstrap/Table";
import "../styles.scss";
import { useState } from "react";
import axios from "axios";

export const DocumentCreatorContent = ({ mainFormData }) => {
	const calcTotalProductSum = () => {
		return mainFormData.products.reduce(
			(acc, product) => acc + product.quantity_ * product.price_,
			0
		);
	};
	const calcTotalProductSumNds = () => {
		return mainFormData.products.reduce(
			(acc, product) =>
				acc +
				product.quantity_ * Number(product.price_) +
				Number(product.price_ * mainFormData.ndsPercent) / 100,
			0
		);
	};
	function numberToWords(value: number): string {
		if (value === undefined || value === null) {
			console.error("Value is undefined or null");
			return ""; // Верните пустую строку или какой-то дефолтный результат
		}

		const words = [
			"",
			"одного",
			"двух",
			"трех",
			"четырех",
			"пяти",
			"шести",
			"семи",
			"восьми",
			"девяти",
			"десяти",
			"одиннадцати",
			"двенадцати",
			"тринадцати",
			"четырнадцати",
			"пятнадцати",
			"шестнадцати",
			"семнадцати",
			"восемнадцати",
			"девятнадцати",
		];

		const tens = [
			"",
			"",
			"двадцати",
			"тридцати",
			"сорока",
			"пятидесяти",
			"шестидесяти",
			"семидесяти",
			"восьмидесяти",
			"девяноста",
		];

		if (value < 20) return words[value];
		if (value < 100) return `${tens[Math.floor(value / 10)]} ${words[value % 10]}`.trim();

		return value.toString();
	}
	const MyComponent = ({ number }: { number: number }) => (
		<>
			{number} ({numberToWords(number)})
		</>
	);

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

	return (
		<>
			<div className="content" id="source-html">
				<div className="paper">
					<p
						className="header-title"
						style={{
							height: "20px",
							textIndent: "0.25in",
							display: "block",
							textAlign: "center",
							fontWeight: "bold",
							marginBottom: "2px",
						}}>
						ДОГОВОР № {mainFormData.contractNumber}
					</p>
					<p
						className="header-title"
						style={{
							height: "20px",
							textIndent: "0.25in",
							display: "block",
							textAlign: "center",
							fontWeight: "bold",
							marginTop: "4px",
							marginBottom: "20px",
						}}>
						Купли продажи
					</p>
					<p style={{ height: "20px", textIndent: "0.25in", display: "block" }}> </p>
					<p className="justify" style={{ height: "20px", textIndent: "0.25in", display: "block" }}>
						<table style={{ width: "100%", borderCollapse: "collapse", border: "none" }}>
							<tbody>
								<tr>
									<td style={{ textAlign: "left", height: "16px" }}>г. {mainFormData.city}</td>
									<td style={{ textAlign: "right", height: "16px" }}>
										{new Date(mainFormData.contractDate)
											.toLocaleDateString("ru-RU", {
												day: "2-digit",
												month: "long",
												year: "numeric",
											})
											.replace(/^(\d+) (\w+) (\d+)$/, '"$1" $2 $3 г.')}
									</td>
								</tr>
							</tbody>
						</table>
					</p>

					{/* Продавец и покупатель - Юридические лица */}
					{mainFormData.isDkp && !mainFormData.isFizFaceState && !mainFormData.isBuyerFizFace && (
						<>
							<p
								style={{
									height: "20px",
									textIndent: "0.25in",
									display: "block",
									marginTop: "60px",
								}}>
								{mainFormData.titleOfCompany?.length
									? mainFormData.titleOfCompany
									: "______________________________________"}
								, в лице{" "}
								{mainFormData.nameOfGenDir?.length
									? "Ген. директора " + mainFormData.nameOfGenDir
									: "_____________________________________"}
								, действующего на основании{" "}
								{mainFormData.suggestion?.length
									? mainFormData.suggestion
									: "_____________________________________"}
								, именуемое в дальнейшем «Продавец», с одной стороны, и
								{mainFormData.titleOfCompanyBuyer?.length
									? mainFormData.titleOfCompanyBuyer
									: "______________________________________"}
								, в лице{" "}
								{mainFormData.nameOfGenDirBuyer?.length
									? "Ген. директора " + mainFormData.nameOfGenDirBuyer
									: "_____________________________________"}
								, действующего на основании{" "}
								{mainFormData.suggestionBuyer?.length
									? mainFormData.suggestionBuyer
									: "_____________________________________"}
								, именуемое в дальнейшем «Покупатель», с другой стороны, а вместе именуемые
								«Стороны», заключили настоящий Договор о нижеследующем:
							</p>
						</>
					)}
					{/* Продавец - физ.лицо, покупатель - юр.лицо */}
					{mainFormData.isDkp && mainFormData.isFizFaceState && !mainFormData.isBuyerFizFace && (
						<>
							<p style={{ height: "20px", textIndent: "0.25in", display: "block" }}>
								Гражданин {mainFormData.sellerFizFio?.length ? mainFormData.sellerFizFio : "___"},
								дата рождения:{" "}
								{mainFormData.birthDate?.length
									? mainFormData.birthDate.split("-").reverse().join(".") + " г."
									: "____"}
								, место рождения:{" "}
								{mainFormData.placeOfBirth?.length ? mainFormData.placeOfBirth : "___"}, поспортные
								данные: серия {mainFormData.seriess?.length ? mainFormData.seriess : "______"} №{" "}
								{mainFormData.number?.length ? mainFormData.number : "____"}, дата выдачи:{" "}
								{mainFormData.gavenDate?.length ? mainFormData.gavenDate : "____"}, кем выдан:{" "}
								{mainFormData.whoIssued?.length ? mainFormData.whoIssued : "____"}, код
								подразделения:
								{mainFormData.code?.length ? mainFormData.code : "___"}, зарегестрированный по
								адресу:
								{mainFormData.address?.length ? mainFormData.address : "___"}, именуемое в
								дальнейшем «Продавец», с одной стороны, и
								{mainFormData.titleOfCompanyBuyer?.length
									? mainFormData.titleOfCompanyBuyer
									: "______________________________________"}
								, в лице{" "}
								{mainFormData.nameOfGenDirBuyer?.length
									? "Ген. директора " + mainFormData.nameOfGenDirBuyer
									: "_____________________________________"}
								, действующего на основании{" "}
								{mainFormData.suggestionBuyer?.length
									? mainFormData.suggestionBuyer
									: "_____________________________________"}
								, именуемое в дальнейшем «Покупатель», с другой стороны, а вместе именуемые
								«Стороны», заключили настоящий Договор о нижеследующем:
							</p>
						</>
					)}
					{/* Продавец и покупатель - Физические лица */}
					{mainFormData.isDkp && mainFormData.isFizFaceState && mainFormData.isBuyerFizFace && (
						<>
							<p style={{ height: "20px", textIndent: "0.25in", display: "block" }}>
								Гражданин {mainFormData.sellerFizFio?.length ? mainFormData.sellerFizFio : "___"},
								дата рождения:{" "}
								{mainFormData.birthDate?.length
									? mainFormData.birthDate.split("-").reverse().join(".") + " г."
									: "____"}
								, место рождения:{" "}
								{mainFormData.placeOfBirth?.length ? mainFormData.placeOfBirth : "___"}, поспортные
								данные: серия {mainFormData.seriess?.length ? mainFormData.seriess : "______"} №{" "}
								{mainFormData.number?.length ? mainFormData.number : "____"}, дата выдачи:{" "}
								{mainFormData.gavenDate?.length ? mainFormData.gavenDate : "____"}, кем выдан:{" "}
								{mainFormData.whoIssued?.length ? mainFormData.whoIssued : "____"}, код
								подразделения:
								{mainFormData.code?.length ? mainFormData.code : "___"}, зарегестрированный по
								адресу:
								{mainFormData.address?.length ? mainFormData.address : "___"}, именуемое в
								дальнейшем «Продавец», с одной стороны, и Гражданин{" "}
								{mainFormData.buyerFizFio?.length ? mainFormData.buyerFizFio : "___"}, дата
								рождения:{" "}
								{mainFormData.buyerBirthDate?.length
									? mainFormData.buyerBirthDate.split("-").reverse().join(".") + " г."
									: "____"}
								, место рождения:{" "}
								{mainFormData.placeOfBirthBuyer?.length ? mainFormData.placeOfBirthBuyer : "___"},
								поспортные данные: серия{" "}
								{mainFormData.seriesBuyer?.length ? mainFormData.seriesBuyer : "______"} №{" "}
								{mainFormData.numberBuyer?.length ? mainFormData.numberBuyer : "____"}, дата выдачи:{" "}
								{mainFormData.gavenDateBuyer?.length ? mainFormData.gavenDateBuyer : "____"}, кем
								выдан: {mainFormData.whoIssuedBuyer?.length ? mainFormData.whoIssuedBuyer : "____"},
								код подразделения:
								{mainFormData.codeBuyer?.length ? mainFormData.codeBuyer : "___"},
								зарегестрированный по адресу:
								{mainFormData.addressBuyer?.length ? mainFormData.addressBuyer : "___"}, именуемое в
								дальнейшем «Покупатель», с другой стороны, а вместе именуемые «Стороны», заключили
								настоящий Договор о нижеследующем:
							</p>
						</>
					)}
					{/* Продавец - юр.лицо, покупатель - физ.лицо */}
					{mainFormData.isDkp && !mainFormData.isFizFaceState && mainFormData.isBuyerFizFace && (
						<>
							<p style={{ height: "20px", textIndent: "0.25in", display: "block" }}>
								{mainFormData.titleOfCompany?.length
									? mainFormData.titleOfCompany
									: "______________________________________"}
								, в лице{" "}
								{mainFormData.nameOfGenDir?.length
									? "Ген. директора " + mainFormData.nameOfGenDir
									: "_____________________________________"}
								, действующего на основании{" "}
								{mainFormData.suggestion?.length
									? mainFormData.suggestion
									: "_____________________________________"}
								, именуемое в дальнейшем «Продавец», с одной стороны, и Гражданин{" "}
								{mainFormData.buyerFizFio?.length ? mainFormData.buyerFizFio : "___"}, дата
								рождения:{" "}
								{mainFormData.buyerBirthDate?.length
									? mainFormData.buyerBirthDate.split("-").reverse().join(".") + " г."
									: "____"}
								, место рождения:{" "}
								{mainFormData.placeOfBirthBuyer?.length ? mainFormData.placeOfBirthBuyer : "___"},
								поспортные данные: серия{" "}
								{mainFormData.seriesBuyer?.length ? mainFormData.seriesBuyer : "______"} №{" "}
								{mainFormData.numberBuyer?.length ? mainFormData.numberBuyer : "____"}, дата выдачи:{" "}
								{mainFormData.gavenDateBuyer?.length ? mainFormData.gavenDateBuyer : "____"}, кем
								выдан: {mainFormData.whoIssuedBuyer?.length ? mainFormData.whoIssuedBuyer : "____"},
								код подразделения:
								{mainFormData.codeBuyer?.length ? mainFormData.codeBuyer : "___"},
								зарегестрированный по адресу:
								{mainFormData.addressBuyer?.length ? mainFormData.addressBuyer : "___"}, именуемое в
								дальнейшем «Покупатель», с другой стороны, а вместе именуемые «Стороны», заключили
								настоящий Договор о нижеследующем:
							</p>
						</>
					)}
					<p
						style={{
							height: "20px",
							textIndent: "0.25in",
							display: "block",
							marginBottom: "50px",
							marginTop: "50px",
						}}></p>
					<p
						className="header-title"
						style={{
							height: "20px",
							textIndent: "0.25in",
							display: "block",
							textAlign: "center",
							fontWeight: "bold",
						}}>
						1. Предмет договора
					</p>
					<p style={{ height: "15px", textIndent: "0.25in", display: "block" }}></p>
					{mainFormData.isDkp && mainFormData.delivery === "products" && (
						<>
							<p style={{ textIndent: "0.25in", display: "block", marginBottom: "1px" }}>
								1.1. По настоящему Договору Продавец обязуется передать товары в собственность
								Покупателя: (далее по тексту - Товар) в количестве и ассортименте, указанных в п.
								1.2 настоящего Договора, а Покупатель обязуется принять Товар и уплатить за него
								цену в размере и в порядке, предусмотренных Договором.
							</p>
						</>
					)}
					{mainFormData.isDkp && mainFormData.delivery === "services" && (
						<>
							<p style={{ textIndent: "0.25in", display: "block", marginBottom: "1px" }}>
								1.1. По настоящему Договору Продавец обязуется оказать услуги Покупателю: (далее по
								тексту - Товар) в количестве и ассортименте, указанных в п. 1.2 настоящего Договора,
								а Покупатель обязуется принять Товар и уплатить за него цену в размере и в порядке,
								предусмотренных Договором.
							</p>
						</>
					)}
					{mainFormData.isDkp && mainFormData.delivery === "productsServices" && (
						<>
							<p style={{ textIndent: "0.25in", display: "block", marginBottom: "1px" }}>
								1.1. По настоящему Договору Продавец обязуется передать в собственность товары и
								оказать услуги Покупателю: (далее по тексту - Товар) в количестве и ассортименте,
								указанных в п. 1.2 настоящего Договора, а Покупатель обязуется принять Товар и
								уплатить за него цену в размере и в порядке, предусмотренных Договором.
							</p>
						</>
					)}
					{mainFormData.isDkp && (
						<>
							<p style={{ textIndent: "0.25in", display: "block", marginTop: "1px" }}>
								1.2. Продавец передает Покупателю следующие Товары:
							</p>

							<div className="content-container-table">
								<Table bordered responsive>
									<thead>
										<tr>
											<td>№</td>
											<td>Наименование</td>
											<td>Кол-во</td>
											<td>Цена</td>
											<td>Стоимость</td>
										</tr>
									</thead>

									{mainFormData.ndsState === true && (
										<>
											<tbody>
												{mainFormData.products.map((item, index) => (
													<tr>
														<td>{index + 1}</td>
														<td>{item.name_?.length === 0 ? "<<!>>" : item.name_}</td>
														<td>{item.quantity_}</td>
														<td>
															{Number(item.price_) +
																Number((item.price_ * mainFormData.ndsPercent) / 100)}
														</td>
														<td>
															{Number(item.price_) +
																Number((item.price_ * mainFormData.ndsPercent) / 100) *
																	item.quantity_}
														</td>
													</tr>
												))}
												<tr>
													<td colspan="4" style={{ textAlign: "right" }}>
														Итого:{" "}
													</td>
													<td>{calcTotalProductSumNds()}</td>
												</tr>
											</tbody>
										</>
									)}
									{mainFormData.ndsState === false && (
										<>
											<tbody>
												{mainFormData.products.map((item, index) => (
													<tr>
														<td>{index + 1}</td>
														<td>{item.name_?.length === 0 ? "<<!>>" : item.name_}</td>
														<td>{item.quantity_?.length === 0 ? "<<!>>" : item.quantity_}</td>
														<td>{item.price_?.length === 0 ? "<<!>>" : item.price_}</td>
														<td>{item.price_ * item.quantity_}</td>
													</tr>
												))}
												<tr>
													<td colspan="4" style={{ textAlign: "right" }}>
														Итого:{" "}
													</td>
													<td>{calcTotalProductSum()}</td>
												</tr>
											</tbody>
										</>
									)}
								</Table>
							</div>
							<p
								className="header-title"
								style={{
									height: "20px",
									textIndent: "0.25in",
									display: "block",
									textAlign: "center",
									fontWeight: "bold",
								}}>
								2. Права и обязанности сторон
							</p>
							<p style={{ height: "20px", textIndent: "0.25in", display: "block" }}></p>
						</>
					)}
					<p style={{ height: "20px", textIndent: "0.25in", display: "block" }}>
						2.1. Продавец обязан:{" "}
					</p>
					<p
						className="obligation"
						style={{ textIndent: "0.5in", display: "block", height: "20px" }}>
						2.1.1. Передать Покупателю Товар надлежащего качества и в надлежащей упаковке в течение{" "}
						{MyComponent({ number: mainFormData.term })} дней
					</p>
					<p style={{ height: "20px", textIndent: "0.25in", display: "block" }}></p>
					<p
						className="obligation"
						style={{ textIndent: "0.5in", display: "block", height: "20px" }}>
						2.1.2. Передать Товар свободным от прав третьих лиц.{" "}
					</p>
					<p style={{ height: "20px", textIndent: "0.25in", display: "block" }}>
						2.2. Покупатель обязан:{" "}
					</p>
					<p
						className="obligation"
						style={{ textIndent: "0.5in", display: "block", height: "20px" }}>
						2.2.1. Принять Товар от Продавца в течении{" "}
						{MyComponent({ number: mainFormData.deadline })} дней.
					</p>
					<p
						className="obligation"
						style={{ textIndent: "0.5in", display: "block", height: "20px" }}>
						2.2.2. Оплатить Товар в течении {MyComponent({ number: mainFormData.deadline })} дней.
					</p>
				</div>
			</div>
		</>
	);
};
