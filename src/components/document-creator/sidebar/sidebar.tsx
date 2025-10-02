import * as React from "react";
import { useState, useEffect } from "react";

import { BasicInformation } from "./blocks/basic-information";
import { SidesData } from "./blocks/sides-data";
import { ItemListData } from "./blocks/item-list-data";
import { RightsObligations } from "./blocks/rights-and-obligations";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const DocumentCreatorSidebar = ({ setMainFormData, mainFormData}) => {
	const { documentId } = useParams(); // <-- получаем из URL
	const isEditMode = Boolean(documentId);
	const [isOpen, setIsOpen] = useState(true);
	const [isOpenSides, setIsOpenSides] = useState(true);
	const [isOpenItems, setIsOpenItems] = useState(false);
	const [isOpenObligations, setIsOpenObligations] = useState(true);

	const [counterparties, setCounterparties] = useState([]);
	const [selectedCounterpartyId, setSelectedCounterpartyId] = useState("");

	const navigate = useNavigate();
	console.log("isEditMode:", isEditMode);
	console.log("documentId:", documentId);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/counterparties/")
			.then((res) => setCounterparties(res.data))
			.catch((err) => console.error("Ошибка загрузки контрагентов:", err));
	}, []);

	// Загрузка данных при редактировании
	useEffect(() => {
		if (isEditMode && documentId) {
			axios
				.get(`http://localhost:8000/api/documents/${documentId}/`)
				.then((res) => {
					const doc = res.data;
					setMainFormData(doc.data);
					setSelectedCounterpartyId(String(doc.data.counterparty_id));
				})
				.catch((err) => console.error("Ошибка загрузки документа:", err));
		}
	}, [isEditMode, documentId]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setMainFormData({
			...mainFormData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleCounterpartyChange = (e) => {
		const id = e.target.value;
		setSelectedCounterpartyId(id);
		const selected = counterparties.find((c) => String(c.counterparty_id) === id);
		if (!selected) return;

		const update =
			selected.counterparty_type === "company"
				? {
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
						isBuyerFizFace: false,
				  }
				: {
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
						isBuyerFizFace: true,
				  };

		setMainFormData((prev) => ({
			...prev,
			counterparty_id: selected.counterparty_id,
			...update,
		}));
	};

	const handleSave = async () => {
		const payload = {
			user: mainFormData.user_id || null,
			counterparty: mainFormData.counterparty_id || null,
			document_type: mainFormData.documentType || "contract",
			data: mainFormData,
			status: "Ожидается согласование",
			updated_at: new Date().toISOString(),
		};

		try {
			if (isEditMode && documentId) {
				await axios.put(`http://localhost:8000/api/documents/${documentId}/`, payload);
				alert("Документ обновлён!");
			} else {
				await axios.post("http://localhost:8000/api/documents/", {
					...payload,
					created_at: new Date().toISOString(),
				});
				alert("Документ создан!");
			}
			navigate("/");
		} catch (error) {
			console.error("Ошибка при сохранении документа:", error);
			alert("Ошибка при сохранении. Проверьте консоль.");
		}
	};

	console.log(mainFormData);

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
			<button className="btn" onClick={handleSave}>
				Сохранить
			</button>
		</div>
	);
};
