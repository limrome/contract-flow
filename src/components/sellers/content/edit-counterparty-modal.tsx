import React, { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";

interface EditCounterpartyModalProps {
	onClose: () => void;
	type: "individual" | "company";
	data: any;
	onSave: (updatedData: any) => void;
}

const EditCounterpartyModal: React.FC<EditCounterpartyModalProps> = ({
	onClose,
	type,
	data,
	onSave,
}) => {
	const [formData, setFormData] = useState<any>(data);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setFormData(data);
	}, [data]);

	// Отладочная информация
	console.log("Current formData:", formData);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevData: any) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		const updatedData: any = {};

		fields.forEach(({ field }) => {
			updatedData[field] = formData[field] || null;
		});

		setIsSaving(true);
		setError("");

		try {
			const counterpartyId = formData.counterparty_id;

			if (!counterpartyId) {
				throw new Error("Не удалось получить ID контрагента.");
			}

			const response = await axios.put(
				`http://localhost:8000/api/counterparties/${counterpartyId}/`,
				updatedData
			);

			onSave(response.data);
			onClose();
		} catch (err) {
			setError("Ошибка при сохранении данных.");
			console.error("Error while saving:", err);
		} finally {
			setIsSaving(false);
		}
	};

	const fields =
		type === "company"
			? [
					{
						name: "companyName",
						label: "Наименование компании",
						field: "full_name",
						editable: true,
					},
					{
						name: "directorName",
						label: "ФИО Генерального директора",
						field: "director_name",
						editable: true,
					},
					{
						name: "legalAddress",
						label: "Юридический адрес",
						field: "legal_address",
						editable: true,
					},
					{ name: "bankName", label: "Наименование банка", field: "bank_name", editable: true },
					{ name: "account", label: "Расчетный счет", field: "account", editable: true },
					{
						name: "corpAccount",
						label: "Корпоративный счет",
						field: "corp_account",
						editable: true,
					},
					{ name: "innUr", label: "ИНН", field: "inn", editable: true },
					{ name: "kpp", label: "КПП", field: "kpp", editable: true },
					{ name: "ogrn", label: "ОГРН", field: "ogrn", editable: true },
					{ name: "phoneUr", label: "Номер телефона", field: "phone", editable: true },
					{ name: "emailUr", label: "Почта", field: "email", editable: true },
			  ]
			: [
					{ name: "fullName", label: "ФИО", field: "full_name", editable: true },
					{ name: "birthDate", label: "Дата рождения", field: "birth_date", editable: true },
					{
						name: "passportNumber",
						label: "Серия паспорта",
						field: "passport_series",
						editable: true,
					},
					{
						name: "passportNumber",
						label: "Номер паспорта",
						field: "passport_number",
						editable: true,
					},
					{ name: "passportIssueDate", label: "Дата выдачи", field: "issue_date", editable: true },
					{ name: "birthPlace", label: "Место рождения", field: "birth_place", editable: true },
					{ name: "passportIssuer", label: "Кем выдан", field: "issued_by", editable: true },
					{
						name: "passportCode",
						label: "Код подразделения",
						field: "passport_code",
						editable: true,
					},
					{ name: "address", label: "Адрес", field: "address", editable: true },
					{ name: "inn", label: "ИНН", field: "inn", editable: true },
					{ name: "phone", label: "Номер телефона", field: "phone", editable: true },
					{ name: "email", label: "Почта", field: "email", editable: true },
			  ];

	return (
		<div className="modal-backdrop-edit">
			<div className="modal-edit">
				<button className="modal__close-edit" onClick={onClose}>
					<FaTimes size={20} />
				</button>
				<h2 className="modal__title">Редактировать контрагента</h2>
				<div className="modal__form-edit">
					{fields.map(({ name, label, field, editable = true }) => (
						<div className="modal__field-edit" key={name}>
							<label>{label}</label>
							<input
								type={name === "birthDate" || name === "passportIssueDate" ? "date" : "text"}
								name={field}
								value={formData[field] || ""}
								onChange={editable ? handleInputChange : undefined}
								disabled={!editable}
							/>
						</div>
					))}
				</div>
				<div className="modal__buttons-edit">
					<button className="btn-edit" onClick={handleSave}>
						<FaSave size={12} /> Сохранить
					</button>
					<button className="btn-edit btn--secondary" onClick={onClose}>
						Отмена
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditCounterpartyModal;
