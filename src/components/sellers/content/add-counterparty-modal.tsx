import React, { useState } from "react";
import axios from "axios";
import "./add-counterparty-modal.scss";

interface Props {
	onClose: () => void;
	onAdd: (newCounterparty: any) => void;
}

const AddCounterpartyModal: React.FC<Props> = ({ onClose, onAdd }) => {
	const [type, setType] = useState<"individual" | "company">("individual");
	const [form, setForm] = useState<Record<string, any>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		try {
			const payload = {
				...form,
				counterparty_type: type,
			};

			const response = await axios.post("http://localhost:8000/api/counterparties/", payload);

			onAdd(response.data);
			onClose();
			alert("Контрагент успешно добавлен!");
		} catch (error) {
			console.error("Ошибка при добавлении контрагента:", error);
			alert("Ошибка при добавлении контрагента.");
		}
	};

	const individualFields = [
		{ name: "full_name", label: "ФИО" },
		{ name: "inn", label: "ИНН" },
		{ name: "email", label: "Email" },
		{ name: "phone", label: "Телефон" },
		{ name: "passport_series", label: "Серия паспорта" },
		{ name: "passport_number", label: "Номер паспорта" },
		{ name: "issued_by", label: "Кем выдан" },
		{ name: "issue_date", label: "Дата выдачи", type: "date" },
		{ name: "birth_date", label: "Дата рождения", type: "date" },
		{ name: "birth_place", label: "Место рождения" },
		{ name: "passport_code", label: "Код подразделения" },
		{ name: "address", label: "Адрес регистрации" },
	];

	const companyFields = [
		{ name: "full_name", label: "Полное наименование" },
		{ name: "inn", label: "ИНН" },
		{ name: "email", label: "Email" },
		{ name: "phone", label: "Телефон" },
		{ name: "legal_address", label: "Юр. адрес" },
		{ name: "director_name", label: "ФИО директора" },
		{ name: "kpp", label: "КПП" },
		{ name: "ogrn", label: "ОГРН" },
		{ name: "bank_name", label: "Банк" },
		{ name: "account", label: "Расчетный счет" },
		{ name: "corp_account", label: "Кор. счет" },
	];

	const currentFields = type === "individual" ? individualFields : companyFields;

	return (
		<div className="modal-overlay-add">
			<div className="modal-content">
				<div className="modal-header">
					<h3>Добавление контрагента</h3>
				</div>

				<div className="modal-body">
					<div className="form-group">
						<label>Тип контрагента</label>
						<div style={{ display: "flex", gap: "16px" }}>
							<label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
								<input
									type="radio"
									name="type"
									value="individual"
									checked={type === "individual"}
									onChange={() => setType("individual")}
								/>
								Физическое лицо
							</label>
							<label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
								<input
									type="radio"
									name="type"
									value="company"
									checked={type === "company"}
									onChange={() => setType("company")}
								/>
								Юридическое лицо
							</label>
						</div>
					</div>

					<div className="form-grid">
						{currentFields.map(({ name, label, type: inputType = "text" }) => (
							<div className="form-group" key={name}>
								<label>{label}</label>
								<input
									type={inputType}
									name={name}
									value={form[name] || ""}
									onChange={handleChange}
								/>
							</div>
						))}
					</div>
				</div>

				<div className="modal-footer">
					<button className="btn-primary" onClick={handleSubmit}>
						Добавить
					</button>
					<button onClick={onClose}>Отмена</button>
				</div>
			</div>
		</div>
	);
};

export default AddCounterpartyModal;
