import React, { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";

interface EditCounterpartyModalProps {
	onClose: () => void;
	type: "individual" | "company";
	data: any; // Тип данных контрагента
	onSave: (updatedData: any) => void; // Функция сохранения изменений
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
		setFormData(data); // Устанавливаем данные в состояние
	}, [data]);

	// Отладочная информация
	console.log("Current formData:", formData); // Печатаем текущее состояние формы

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevData: any) => ({
			...prevData,
			[name]: value,
		}));
	};


	const handleSave = async () => {
		const updatedData: any = {};

		// Собираем данные
		fields.forEach(({ field }) => {
			updatedData[field] = formData[field] || null;
		});

		// Запрещаем сохранение при текущем процессе
		setIsSaving(true);
		setError("");

		try {
			const counterpartyId = formData.counterparty_id; // Получаем ID контрагента из formData

			if (!counterpartyId) {
				throw new Error("Не удалось получить ID контрагента.");
			}

			// Отправка данных на сервер через axios
			const response = await axios.put(
				`http://localhost:8000/api/counterparties/${counterpartyId}/`, // Используем counterparty_id для запроса
				updatedData
			);
      
			// После успешного ответа, вызываем функцию onSave, чтобы обновить состояние на фронте
			onSave(response.data); // Обновленные данные с сервера
			onClose(); // Закрываем модальное окно

			// alert("Данные успешно сохранены!");
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
					{ name: "companyName", label: "Наименование компании", field: "full_name" },
					{ name: "directorName", label: "ФИО Генерального директора", field: "director_name" },
					{ name: "legalAddress", label: "Юридический адрес", field: "legal_address" },
					{ name: "bankName", label: "Наименование банка", field: "bank_name" },
					{ name: "account", label: "Расчетный счет", field: "account" },
					{ name: "corpAccount", label: "Корпоративный счет", field: "corp_account" },
					{ name: "innUr", label: "ИНН", field: "inn" }, 
					{ name: "kpp", label: "КПП", field: "kpp" },
					{ name: "ogrn", label: "ОГРН", field: "ogrn" },
					{ name: "phoneUr", label: "Номер телефона", field: "phone" },
					{ name: "emailUr", label: "Почта", field: "email" },
			  ]
			: [
					{ name: "fullName", label: "ФИО", field: "full_name" },
					{ name: "birthDate", label: "Дата рождения", field: "birth_date" },
					{ name: "passportNumber", label: "Серия паспорта", field: "passport_series" },
					{ name: "passportNumber", label: "Номер паспорта", field: "passport_number" },
					{ name: "passportIssueDate", label: "Дата выдачи", field: "issue_date" },
					{ name: "birthPlace", label: "Место рождения", field: "birth_place" },
					{ name: "passportIssuer", label: "Кем выдан", field: "issued_by" },
					{ name: "passportCode", label: "Код подразделения", field: "passport_code" },
					{ name: "address", label: "Адрес", field: "address" },
					{ name: "inn", label: "ИНН", field: "inn" },
					{ name: "phone", label: "Номер телефона", field: "phone" },
					{ name: "email", label: "Почта", field: "email" },
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
								disabled={!editable} // Если поле не редактируется, делаем его недоступным
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
