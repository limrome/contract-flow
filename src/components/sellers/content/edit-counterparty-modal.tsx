import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

interface EditCounterpartyModalProps {
	onClose: () => void;
	type: "individual" | "company";
	data: any; // Тип данных контрагента (например, объект с данными)
	onSave: (updatedData: any) => void; // Функция сохранения изменений
}

const EditCounterpartyModal: React.FC<EditCounterpartyModalProps> = ({
	onClose,
	type,
	data,
	onSave,
}) => {
	// Состояние для редактируемых данных
	const [formData, setFormData] = useState(data);
  console.log(formData);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log(`Changing ${name} to ${value}`); // Выводим в консоль имя поля и новое значение
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSave = () => {
		onSave(formData); // Сохраняем измененные данные
		onClose(); // Закрываем модалку после сохранения
	};

	return (
		<div className="modal-backdrop-edit">
			<div className="modal-edit">
				<button className="modal__close-edit" onClick={onClose}>
					<FaTimes size={20} />
				</button>
				<h2 className="modal__title">Редактировать контрагента</h2>
				<div className="modal__form-edit">
					{type === "company" ? (
						<>
							<div className="modal__field-edit">
								<label>Наименование компании</label>
								<input
									type="text"
									name="companyName"
									value={formData.companyName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>ФИО Генерального директора</label>
								<input
									type="text"
									name="directorName"
									value={formData.directorName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Юридический адрес</label>
								<input
									type="text"
									name="legalAddress"
									value={formData.legalAddress || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Наименование банка</label>
								<input
									type="text"
									name="bankName"
									value={formData.bankName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Расчетный счет</label>
								<input
									type="text"
									name="account"
									value={formData.account || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Корпоративный счет</label>
								<input
									type="text"
									name="corpAccount"
									value={formData.corpAccount || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>ИНН</label>
								<input
									type="text"
									name="innUr"
									value={formData.innUr || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>КПП</label>
								<input
									type="text"
									name="kpp"
									value={formData.kpp || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>ОГРН</label>
								<input
									type="text"
									name="ogrn"
									value={formData.ogrn || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Номер телефона</label>
								<input
									type="text"
									name="phoneUr"
									value={formData.phoneUr || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Почта</label>
								<input
									type="email"
									name="emailUr"
									value={formData.emailUr || ""}
									onChange={handleInputChange}
								/>
							</div>
						</>
					) : (
						<>
							<div className="modal__field-edit">
								<label>ФИО</label>
								<input
									type="text"
									name="fullName"
									value={formData.fullName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Дата рождения</label>
								<input
									type="date"
									name="birthDate"
									value={formData.birthDate || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Серия и номер паспорта</label>
								<input
									type="text"
									name="passportNumber"
									value={formData.passportNumber}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Дата выдачи</label>
								<input
									type="date"
									name="passportIssueDate"
									value={formData.passportIssueDate || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Место рождения</label>
								<input
									type="text"
									name="birthPlace"
									value={formData.birthPlace || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Кем выдан</label>
								<input
									type="text"
									name="passportIssuer"
									value={formData.passportIssuer || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Код подразделения</label>
								<input
									type="text"
									name="passportCode"
									value={formData.passportCode || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Адрес</label>
								<input
									type="text"
									name="address"
									value={formData.address || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>ИНН</label>
								<input
									type="text"
									name="inn"
									value={formData.inn || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Номер телефона</label>
								<input
									type="text"
									name="phone"
									value={formData.phone || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal__field-edit">
								<label>Почта</label>
								<input
									type="email"
									name="email"
									value={formData.email || ""}
									onChange={handleInputChange}
								/>
							</div>
						</>
					)}
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
