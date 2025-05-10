import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ModalStyles.scss";

const RegisterCounterparty = () => {
	const user_id = localStorage.getItem("user_id");
	const navigate = useNavigate();
	const [type, setType] = useState("company");
	const [form, setForm] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		try {
			const payload = {
				...form,
				user_id,
				counterparty_type: type,
			};

			const res = await fetch("http://localhost:8000/api/counterparty/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();

			if (res.ok) {
				alert("Контрагент зарегистрирован!");
				localStorage.removeItem("user_id");
				navigate("/sign_in");
			} else {
				alert(data.error || "Ошибка");
			}
		} catch (error) {
			console.error("Ошибка при регистрации контрагента:", error);
			alert("Ошибка при регистрации.");
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
		<div className="modal-overlay-reg">
			<div className="modal-content">
				<div className="modal-header">
					<h3>Данные контрагента</h3>
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
					<>
						<div className="form-grid">
							{currentFields.map(({ name, label, type: inputType = "text" }) => (
								<div className="form-group" key={name}>
									<label>{label}</label>
									<input
										name={name}
										type={inputType}
										value={form[name] || ""}
										onChange={handleChange}
									/>
								</div>
							))}
						</div>
					</>
				</div>

				<div className="modal-footer">
					<button className="btn-primary" onClick={handleSubmit}>
						Завершить регистрацию
					</button>
				</div>
			</div>
		</div>
	);
};

export default RegisterCounterparty;
