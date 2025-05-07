import * as React from "react";
import { useState } from "react";
import { PassportData } from "./passport-data";
import { PassportBuyerData } from "./passport-buyer-data";

export const SidesData = ({ handleChange, mainFormData, setMainFormData }) => {
	const [isOpenSidesSeller, setIsOpenSidesSeller] = useState(false);
	const [isOpenSidesBuyer, setIsOpenSidesBuyer] = useState(false);

	const [isOpenFaces, setIsOpenFaces] = useState(false);

	const [isOpenFacesBuyer, setIsOpenFacesBuyer] = useState(false);

	const [isOpenGenDir, setIsOpenGenDir] = useState(true);
	const [isOpenGenDirBuyer, setIsOpenGenDirBuyer] = useState(true);

	const [inputValue, setInputValue] = useState("Устава");
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const [inputValueBuyer, setInputValueBuyer] = useState("Устава");
	const [suggestionsBuyer, setSuggestionsBuyer] = useState<string[]>([]);

	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isDropdownVisibleBuyer, setIsDropdownVisibleBuyer] = useState(false);

	const [isOpenUrAddress, setIsOpenUrAddress] = useState(true);
	const [isOpenUrAddressBuyer, setIsOpenUrAddressBuyer] = useState(true);

	const [isOpenRekv, setIsOpenRekv] = useState(false);
	const [isOpenRekvBuyer, setIsOpenRekvBuyer] = useState(true);

	const data = ["Устава", "Договора", "Контракта", "Соглашения", "Протокола", "Другое"];

	// Данные для автоподсказки
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		if (value.length > 0) {
			const filteredSuggestions = data.filter((item) =>
				item.toLowerCase().includes(value.toLowerCase())
			);
			setSuggestions(filteredSuggestions);
			setIsDropdownVisible(true);
		} else {
			setIsDropdownVisible(false);
		}
	};

	// Обработчик выбора элемента из списка
	const handleSuggestionClickBuyer = (suggestionBuyer: string) => {
		setMainFormData({ ...mainFormData, suggestionBuyer: suggestionBuyer });
		setInputValueBuyer(suggestionBuyer);
		setIsDropdownVisibleBuyer(false);
	};

    // Обработчик изменения в поле ввода
	const handleInputChangeBuyer = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValueBuyer(value);
		if (value.length > 0) {
			const filteredSuggestionsBuyer = data.filter((item) =>
				item.toLowerCase().includes(value.toLowerCase())
			);
			setSuggestionsBuyer(filteredSuggestionsBuyer);
			setIsDropdownVisibleBuyer(true);
		} else {
			setIsDropdownVisibleBuyer(false);
		}
	};

	// Обработчик выбора элемента из списка
	const handleSuggestionClick = (suggestion: string) => {
		setMainFormData({ ...mainFormData, suggestion: suggestion });
		setInputValue(suggestion);
		setIsDropdownVisible(false);
	};

	return (
		<div className="formContainer">
			{/* */}

			<div className="dropdown-container-seller">
				<button
					className={`dropdown-button ${isOpenSidesSeller ? "rotated" : ""}`}
					onClick={() => setIsOpenSidesSeller(!isOpenSidesSeller)}>
					<span className="rz-text-subtitle2">Продавец</span>
				</button>
			</div>
			{isOpenSidesSeller && (
				<>
					<label>Физ. лица / Юр. лица</label>
					<div className="radioGroup">
						<label>
							<input
								type="radio"
								value="физические лица"
								checked={mainFormData.isFizFaceState === true}
								onChange={() => setMainFormData({ ...mainFormData, isFizFaceState: true })}
							/>
							Физические лица
						</label>
						<label>
							<input
								type="radio"
								value="юридические лица"
								checked={mainFormData.isFizFaceState === false}
								onChange={() => setMainFormData({ ...mainFormData, isFizFaceState: false })}
							/>
							Юридические лица
						</label>
					</div>
					{mainFormData.isFizFaceState && (
						<>
							<div className="dropdown-container-fiz">
								<button
									className={`dropdown-button ${isOpenFaces ? "rotated" : ""}`}
									onClick={() => setIsOpenFaces(!isOpenFaces)}>
									<span className="rz-text-subtitle3">Физические лица</span>
								</button>
							</div>
							{isOpenFaces && (
								<div className="formContainer1">
									{/* ФИО */}
									{mainFormData.isFizFaceState && (
										<>
											<label>ФИО</label>
											<input
												type="text"
												name="sellerFizFio"
												value={mainFormData.sellerFizFio}
												onChange={handleChange}
												placeholder="Пример: Иванов Иван Иванович"
											/>

											<label>Дата рождения</label>
											<input
												type="date"
												name="birthDate"
												value={mainFormData.birthDate}
												onChange={handleChange}
											/>
											<div className="dropdown-container-passport">
												<button
													className={`dropdown-button ${
														mainFormData.isOpenPassport ? "rotated" : ""
													}`}
													onClick={() =>
														setMainFormData({ ...mainFormData, isOpenPassport: false })
													}>
													<span className="rz-text-subtitle">Паспортные данные</span>
												</button>
											</div>
											{mainFormData.isOpenPassport && (
												<PassportData
													handleChange={handleChange}
													mainFormData={mainFormData}
													setMainFormData={setMainFormData}
												/>
											)}
											<label>ИНН</label>
											<input
												type="text"
												name="inn"
												value={mainFormData.inn}
												onChange={handleChange}
											/>
											<label>Номер телефона</label>
											<input
												type="text"
												name="numberOfPhone"
												value={mainFormData.numberOfPhone}
												onChange={handleChange}
												placeholder="Пример: 88005553535"
											/>

											<label>Email</label>
											<input
												type="text"
												name="mail"
												value={mainFormData.mail}
												onChange={handleChange}
												placeholder="Пример: limrome@yandex.ru"
											/>
										</>
									)}
								</div>
							)}
						</>
					)}
					{!mainFormData.isFizFaceState && (
						<>
							<div className="dropdown-container-ur">
								<button
									className={`dropdown-button ${isOpenFaces ? "rotated" : ""}`}
									onClick={() => setIsOpenFaces(!isOpenFaces)}>
									<span className="rz-text-subtitle3">Юридические лица</span>
								</button>
							</div>
							{isOpenFaces && (
								<div className="formContainer1">
									{/* ФИО */}
									{!mainFormData.isFizFaceState && (
										<>
											<label>Наименование</label>
											<input
												type="text"
												name="titleOfCompany"
												value={mainFormData.titleOfCompany}
												onChange={handleChange}
												placeholder="Пример: ООО «Рога и Копыта»"
											/>
											<div className="dropdown-container-gendir">
												<button
													className={`dropdown-button ${isOpenGenDir ? "rotated" : ""}`}
													onClick={() => setIsOpenGenDir(!isOpenGenDir)}>
													<span className="rz-text-subtitle4">ФИО гендиректора</span>
												</button>
											</div>
											{isOpenGenDir && (
												<>
													<div className="formContainer1">
														<input
															type="text"
															name="nameOfGenDir"
															value={mainFormData.nameOfGenDir}
															onChange={handleChange}
															placeholder="Пример: Петров Петр Петрович"
														/>
													</div>
												</>
											)}
											{/* Автоподсказка */}
											<div className="autocomplete-container">
												<label>На основании</label>
												<input
													type="text"
													value={inputValue}
													onChange={handleInputChange}
													placeholder="Введите название..."
												/>
												{isDropdownVisible && (
													<ul className="autocomplete-dropdown">
														{suggestions.map((suggestion, index) => (
															<li key={index} onClick={() => handleSuggestionClick(suggestion)}>
																{suggestion}
															</li>
														))}
													</ul>
												)}
											</div>

											<div className="dropdown-container-uradress">
												<button
													className={`dropdown-button ${isOpenUrAddress ? "rotated" : ""}`}
													onClick={() => setIsOpenUrAddress(!isOpenUrAddress)}>
													<span className="rz-text-subtitle4">Юр.адрес</span>
												</button>
											</div>
											{isOpenUrAddress && (
												<>
													<div className="formContainer1">
														<input
															type="text"
															name="urAddress"
															value={mainFormData.urAddress}
															onChange={handleChange}
														/>
													</div>
												</>
											)}

											<div className="dropdown-container-rekv">
												<button
													className={`dropdown-button ${isOpenRekv ? "rotated" : ""}`}
													onClick={() => setIsOpenRekv(!isOpenRekv)}>
													<span className="rz-text-subtitle4">Банковские реквизиты</span>
												</button>
											</div>
											{isOpenRekv && (
												<>
													<div className="formContainer1">
														<label>Наименование банка</label>
														<input
															type="text"
															name="nameOfBank"
															value={mainFormData.nameOfBank}
															onChange={handleChange}
															placeholder="Пример: ВТБ"
														/>
														<label>Расчетный счет</label>
														<input
															type="text"
															name="currAccount"
															value={mainFormData.currAccount}
															onChange={handleChange}
															placeholder="Состоит из 20 цифр"
														/>
														<label>Кор.счет</label>
														<input
															type="text"
															name="corrAccount"
															value={mainFormData.corrAccount}
															onChange={handleChange}
															placeholder="Состоит из 20 цифр"
														/>
													</div>
												</>
											)}

											<label>ИНН</label>
											<input
												type="text"
												name="urInn"
												value={mainFormData.urInn}
												onChange={handleChange}
											/>

											<label>КПП</label>
											<input
												type="text"
												name="kpp"
												value={mainFormData.kpp}
												onChange={handleChange}
											/>

											<label>ОГРН</label>
											<input
												type="text"
												name="ogrn"
												value={mainFormData.ogrn}
												onChange={handleChange}
											/>

											<label>Номер телефона</label>
											<input
												type="text"
												name="urNumberOfPhone"
												value={mainFormData.urNumberOfPhone}
												onChange={handleChange}
												placeholder="Пример: 88005553535"
											/>

											<label>Email</label>
											<input
												type="text"
												name="urMail"
												value={mainFormData.urMail}
												onChange={handleChange}
												placeholder="Пример: limrome@yandex.ru"
											/>
										</>
									)}
								</div>
							)}
						</>
					)}
				</>
			)}

			<div className="dropdown-container-buyer">
				<button
					className={`dropdown-button ${isOpenSidesBuyer ? "rotated" : ""}`}
					onClick={() => setIsOpenSidesBuyer(!isOpenSidesBuyer)}>
					<span className="rz-text-subtitle2">Покупатель</span>
				</button>
			</div>
			{isOpenSidesBuyer && (
				<>
					
						<label>Физ. лица / Юр. лица</label>
						<div className="radioGroup">
							<label>
								<input
									type="radio"
									value="физические лица"
									checked={mainFormData.isBuyerFizFace === true}
									onChange={() => setMainFormData({ ...mainFormData, isBuyerFizFace: true })}
								/>
								Физические лица
							</label>
							<label>
								<input
									type="radio"
									value="юридические лица"
									checked={mainFormData.isBuyerFizFace === false}
									onChange={() => setMainFormData({ ...mainFormData, isBuyerFizFace: false })}
								/>
								Юридические лица
							</label>
						</div>
						{mainFormData.isBuyerFizFace && (
							<>
								<div className="dropdown-container-fiz">
									<button
										className={`dropdown-button ${isOpenFacesBuyer ? "rotated" : ""}`}
										onClick={() => setIsOpenFacesBuyer(!isOpenFacesBuyer)}>
										<span className="rz-text-subtitle3">Физические лица</span>
									</button>
								</div>
								{isOpenFacesBuyer && (
									<div className="formContainer1">
										{/* ФИО */}
										{mainFormData.isBuyerFizFace && (
											<>
												<label>ФИО</label>
												<input
													type="text"
													name="buyerFizFio"
													value={mainFormData.buyerFizFio}
													onChange={handleChange}
													placeholder="Пример: Иванов Иван Иванович"
												/>
												<label>Дата рождения</label>
												<input
													type="date"
													name="buyerBirthDate"
													value={mainFormData.buyerBirthDate}
													onChange={handleChange}
												/>
												<div className="dropdown-container-passportBuyer">
													<button
														className={`dropdown-button ${
															mainFormData.isOpenPassportBuyer ? "rotated" : ""
														}`}
														onClick={() =>
															setMainFormData({ ...mainFormData, isOpenPassportBuyer: false })
														}>
														<span className="rz-text-subtitle4">Паспортные данные</span>
													</button>
												</div>
												{mainFormData.isOpenPassportBuyer && (
													<PassportBuyerData
														handleChange={handleChange}
														mainFormData={mainFormData}
														setMainFormData={setMainFormData}
													/>
												)}

												<label>ИНН</label>
												<input
													type="text"
													name="innBuyer"
													value={mainFormData.innBuyer}
													onChange={handleChange}
												/>
												<label>Номер телефона</label>
												<input
													type="text"
													name="numberOfPhoneBuyer"
													value={mainFormData.numberOfPhoneBuyer}
													onChange={handleChange}
													placeholder="Пример: 88005553535"
												/>

												<label>Email</label>
												<input
													type="text"
													name="mailBuyer"
													value={mainFormData.mailBuyer}
													onChange={handleChange}
													placeholder="Пример: limrome@yandex.ru"
												/>
											</>
										)}
									</div>
								)}
							</>
						)}
						{!mainFormData.isBuyerFizFace && (
							<>
								<div className="dropdown-container-ur">
									<button
										className={`dropdown-button ${isOpenFacesBuyer ? "rotated" : ""}`}
										onClick={() => setIsOpenFacesBuyer(!isOpenFacesBuyer)}>
										<span className="rz-text-subtitle3">Юридические лица</span>
									</button>
								</div>
								{isOpenFacesBuyer && (
									<div className="formContainer1">
										{/* ФИО */}
										{!mainFormData.isBuyerFizFace && (
											<>
												<label>Наименование</label>
												<input
													type="text"
													name="titleOfCompanyBuyer"
													value={mainFormData.titleOfCompanyBuyer}
													onChange={handleChange}
													placeholder="Пример: ООО «Рога и Копыта»"
												/>
												<div className="dropdown-container-gendirBuyer">
													<button
														className={`dropdown-button ${isOpenGenDirBuyer ? "rotated" : ""}`}
														onClick={() => setIsOpenGenDirBuyer(!isOpenGenDirBuyer)}>
														<span className="rz-text-subtitle4">ФИО гендиректора</span>
													</button>
												</div>
												{isOpenGenDirBuyer && (
													<>
														<div className="formContainer1">
															<input
																type="text"
																name="nameOfGenDirBuyer"
																value={mainFormData.nameOfGenDirBuyer}
																onChange={handleChange}
																placeholder="Пример: Петров Петр Петрович"
															/>
														</div>
													</>
												)}
												{/* Автоподсказка */}
												<div className="autocomplete-container">
													<label>На основании</label>
													<input
														type="text"
														value={inputValueBuyer}
														onChange={handleInputChangeBuyer}
														placeholder="Введите название..."
													/>
													{isDropdownVisibleBuyer && (
														<ul className="autocomplete-dropdown">
															{suggestionsBuyer.map((suggestionBuyer, index) => (
																<li
																	key={index}
																	onClick={() => handleSuggestionClickBuyer(suggestionBuyer)}>
																	{suggestionBuyer}
																</li>
															))}
														</ul>
													)}
												</div>

												<div className="dropdown-container-uradress">
													<button
														className={`dropdown-button ${isOpenUrAddressBuyer ? "rotated" : ""}`}
														onClick={() => setIsOpenUrAddressBuyer(!isOpenUrAddressBuyer)}>
														<span className="rz-text-subtitle4">Юр.адрес</span>
													</button>
												</div>
												{isOpenUrAddressBuyer && (
													<>
														<div className="formContainer1">
															<input
																type="text"
																name="urAddressBuyer"
																value={mainFormData.urAddressBuyer}
																onChange={handleChange}
															/>
														</div>
													</>
												)}

												<div className="dropdown-container-rekv">
													<button
														className={`dropdown-button ${isOpenRekvBuyer ? "rotated" : ""}`}
														onClick={() => setIsOpenRekvBuyer(!isOpenRekvBuyer)}>
														<span className="rz-text-subtitle4">Банковские реквизиты</span>
													</button>
												</div>
												{isOpenRekvBuyer && (
													<>
														<div className="formContainer1">
															<label>Наименование банка</label>
															<input
																type="text"
																name="nameOfBankBuyer"
																value={mainFormData.nameOfBankBuyer}
																onChange={handleChange}
																placeholder="Пример: ВТБ"
															/>
															<label>Расчетный счет</label>
															<input
																type="text"
																name="currAccountBuyer"
																value={mainFormData.currAccountBuyer}
																onChange={handleChange}
																placeholder="Состоит из 20 цифр"
															/>
															<label>Кор.счет</label>
															<input
																type="text"
																name="CorAccountBuyer"
																value={mainFormData.CorAccountBuyer}
																onChange={handleChange}
																placeholder="Состоит из 20 цифр"
															/>
														</div>
													</>
												)}

												<label>ИНН</label>
												<input
													type="text"
													name="urInnBuyer"
													value={mainFormData.urInnBuyer}
													onChange={handleChange}
												/>

												<label>КПП</label>
												<input
													type="text"
													name="kppBuyer"
													value={mainFormData.kppBuyer}
													onChange={handleChange}
												/>

												<label>ОГРН</label>
												<input
													type="text"
													name="ogrnBuyer"
													value={mainFormData.ogrnBuyer}
													onChange={handleChange}
												/>

												<label>Номер телефона</label>
												<input
													type="text"
													name="UrNumberOfPhoneBuyer"
													value={mainFormData.UrNumberOfPhoneBuyer}
													onChange={handleChange}
													placeholder="Пример: 88005553535"
												/>

												<label>Email</label>
												<input
													type="text"
													name="urMailBuyer"
													value={mainFormData.urMailBuyer}
													onChange={handleChange}
													placeholder="Пример: limrome@yandex.ru"
												/>
											</>
										)}
									</div>
								)}
							</>
						)}

				</>
			)}
		</div>
	);
};
