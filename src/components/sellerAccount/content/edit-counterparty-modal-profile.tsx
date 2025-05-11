import React, { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";

interface EditCounterpartyModalProps {
	onClose: () => void;
	type: "individual" | "company";
	data: any;
	onSave: (updatedData: any) => void;
}

const EditCounterpartyModalProfile: React.FC<EditCounterpartyModalProps> = ({
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
					{ label: "Наименование компании", field: "full_name" },
					{ label: "ФИО Генерального директора", field: "director_name" },
					{ label: "Юридический адрес", field: "legal_address" },
					{ label: "Наименование банка", field: "bank_name" },
					{ label: "Расчетный счет", field: "account" },
					{ label: "Корпоративный счет", field: "corp_account" },
					{ label: "ИНН", field: "inn" },
					{ label: "КПП", field: "kpp" },
					{ label: "ОГРН", field: "ogrn" },
					{ label: "Номер телефона", field: "phone" },
					{ label: "Почта", field: "email" },
			  ]
			: [
					{ label: "ФИО", field: "full_name" },
					{ label: "Дата рождения", field: "birth_date", type: "date" },
					{ label: "Серия паспорта", field: "passport_series" },
					{ label: "Номер паспорта", field: "passport_number" },
					{ label: "Дата выдачи", field: "issue_date", type: "date" },
					{ label: "Место рождения", field: "birth_place" },
					{ label: "Кем выдан", field: "issued_by" },
					{ label: "Код подразделения", field: "passport_code" },
					{ label: "Адрес", field: "address" },
					{ label: "ИНН", field: "inn" },
					{ label: "Номер телефона", field: "phone" },
					{ label: "Почта", field: "email" },
			  ];

	return (
		<div className="modal-backdrop-edit-profile">
			<div className="modal-edit">
				<button className="modal__close-edit" onClick={onClose}>
					<FaTimes size={20} />
				</button>
				<h2 className="modal__title">Редактировать</h2>
				<div className="modal__form-edit">
					{fields.map(({ label, field, type = "text" }) => (
						<div className="modal__field-edit" key={field}>
							<label>{label}</label>
							<input
								type={type}
								name={field}
								value={formData[field] || ""}
								onChange={handleInputChange}
							/>
						</div>
					))}
					<div className="modal__buttons-edit">
						{error && <div className="error-message">{error}</div>}
						<button className="btn-edit" onClick={handleSave} disabled={isSaving}>
							<FaSave size={12} /> {isSaving ? "Сохраняем..." : "Сохранить"}
						</button>
						<button className="btn--secondary" onClick={onClose}>
							Отмена
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCounterpartyModalProfile;
