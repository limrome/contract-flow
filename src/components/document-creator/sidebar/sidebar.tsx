import * as React from "react";
import { useState, useEffect } from "react";

import { BasicInformation } from "./blocks/basic-information";
import { SidesData } from "./blocks/sides-data";
import { ItemListData } from "./blocks/item-list-data";
import { RightsObligations } from "./blocks/rights-and-obligations";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DocumentCreatorSidebar = ({ setMainFormData, mainFormData }) => {
	/* Основная информация */
	const [isOpen, setIsOpen] = useState(true);

	/* Стороны */
	const [isOpenSides, setIsOpenSides] = useState(true);

	/* Товары и услуги */
	const [isOpenItems, setIsOpenItems] = useState(false);

	/* Права и обязанности */
	const [isOpenObligations, setIsOpenObligations] = useState(true);

	/* Обработчик изменения состояния чекбоксов */
	// const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { name, checked } = e.target;
	// 	if (name === "kp") setMainFormData({ ...mainFormData, isKp: checked });
	// 	if (name === "dkp") setMainFormData({ ...mainFormData, isDkp: checked });
	// };

	console.log(mainFormData);
	const navigate = useNavigate();

	/* Обработчик изменения состояния полей */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type, checked } = e.target;
		setMainFormData({
			...mainFormData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const [counterparties, setCounterparties] = useState([]);
	const [selectedCounterpartyId, setSelectedCounterpartyId] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/counterparties/")
			.then((res) => {
				console.log("Данные контрагентов: ", res.data);
				setCounterparties(res.data);
			})
			.catch((err) => {
				console.error("Ошибка загрузки контрагентов:", err);
			});
	}, []);

	const handleCounterpartyChange = (e) => {
		const id = e.target.value;
		setSelectedCounterpartyId(id);

		const selected = counterparties.find((c) => String(c.counterparty_id) === id);

		console.log(selected);
		if (selected.counterparty_type === 'company') {
			setMainFormData((prev) => ({
				...prev,
				counterparty_id: selected.counterparty_id,
				titleOfCompanyBuyer: selected.full_name || "", 
				nameOfGenDirBuyer: selected.director_name || "",
				suggestionBuyer: selected.basis || "Устава",
				urAddressBuyer: selected.legal_address || "",
				nameOfBankBuyer: selected.bank_name || "",
				currAccountBuyer: selected.account || "", 
				CorAccountBuyer: selected.corp_account || "", 
				urInnBuyer: selected.inn || "",
				kppBuyer: selected.kpp || "",
				ogrnBuyer: selected.ogrn || "",
				UrNumberOfPhoneBuyer: selected.phone || "",
				urMailBuyer: selected.email || "",
				isBuyerFizFace: selected.counterparty_type === 'individual'
			}));
		}
		else if(selected.counterparty_type === 'individual'){
			setMainFormData((prev) => ({
				...prev,
				counterparty_id: selected.counterparty_id,
				buyerFizFio: selected.full_name || "",
				seriesBuyer: selected.passport_series || "",
				numberBuyer: selected.passport_number || "",
				gavenDateBuyer: selected.issue_date || "",
				placeOfBirthBuyer: selected.birth_place || "",
				whoIssuedBuyer: selected.issued_by || "",
				codeBuyer: selected.passport_code || "",
				addressBuyer: selected.birth_place || "",
				numberOfPhoneBuyer: selected.phone || "",
				mailBuyer: selected.email || "",
				innBuyer: selected.inn || "",
				buyerBirthDate: selected.birth_date || "",
				isBuyerFizFace: selected.counterparty_type === 'individual'
			}));
		}
	};

	const handleSave = async () => {
		const payload = {
			user: mainFormData.user_id || null,
			counterparty: mainFormData.counterparty_id || null,
			document_type: mainFormData.documentType || "contract",
			data: mainFormData,
			status: "Ожидается согласование",
			created_at: new Date().toISOString(),
		};

		try {
			const response = await axios.post("http://localhost:8000/api/documents/", payload); 
			console.log("Документ успешно сохранён, ID:", response.data.document_id);
			alert("Документ сохранён!");
			navigate("/");
		} catch (error) {
			console.error("Ошибка при сохранении документа:", error);
			alert("Ошибка при сохранении. Проверьте консоль.");
		}
	};

	return (
		<div className="sidebar">
			<div className="checkbox">
			<div className="formContainer">
				<label>Выберите контрагента:</label>
				<select value={selectedCounterpartyId} onChange={handleCounterpartyChange}>
					<option value="">Не выбран</option>
					{counterparties.map((cp) => (
						<option key={cp.counterparty_id} value={cp.counterparty_id}>
							{cp.full_name}
						</option>
					))}
				</select>
				</div>

				{/* Показываем кнопку, если выбраны КП или ДКП */}
				{(mainFormData.isKp || mainFormData.isDkp) && (
					<div className="dropdown-container">
						<button
							className={`dropdown-button ${isOpen ? "rotated" : ""}`}
							onClick={() => setIsOpen(!isOpen)}>
							<span className="rz-text-subtitle">Основная информация</span>
						</button>
						{isOpen && (
							<BasicInformation
								handleChange={handleChange}
								mainFormData={mainFormData}
								setMainFormData={setMainFormData}
							/>
						)}
					</div>
				)}
			</div>

			{/* Показываем кнопку, если выбраны КП или ДКП */}
			{(mainFormData.isKp || mainFormData.isDkp) && (
				<div className="dropdown-container-sides">
					<button
						className={`dropdown-button ${isOpenSides ? "rotated" : ""}`}
						onClick={() => setIsOpenSides(!isOpenSides)}>
						<span className="rz-text-subtitle2">Стороны</span>
					</button>

					{isOpenSides && (
						<SidesData
							handleChange={handleChange}
							mainFormData={mainFormData}
							setMainFormData={setMainFormData}
						/>
					)}
				</div>
			)}

			{/* Показываем кнопку, если выбраны КП или ДКП */}
			{(mainFormData.isKp || mainFormData.isDkp) && (
				<div className="dropdown-container-items">
					<button
						className={`dropdown-button ${isOpenItems ? "rotated" : ""}`}
						onClick={() => setIsOpenItems(!isOpenItems)}>
						<span className="rz-text-subtitle2">Товары/Услуги</span>
					</button>

					{isOpenItems && (
						<ItemListData
							handleChange={handleChange}
							mainFormData={mainFormData}
							setMainFormData={setMainFormData}
						/>
					)}
				</div>
			)}

			{/* Показываем кнопку, если выбраны КП или ДКП */}
			{(mainFormData.isKp || mainFormData.isDkp) && (
				<div className="dropdown-container-obligations">
					<button
						className={`dropdown-button ${isOpenObligations ? "rotated" : ""}`}
						onClick={() => setIsOpenObligations(!isOpenObligations)}>
						<span className="rz-text-subtitle2">2. Права и обязанности сторон</span>
					</button>

					{isOpenObligations && (
						<RightsObligations
							handleChange={handleChange}
							mainFormData={mainFormData}
							setMainFormData={setMainFormData}
						/>
					)}
				</div>
			)}
			<button className="btn" onClick={handleSave}>Сохранить</button>
		</div>
	);
};
