import * as React from "react";
import { useState } from "react";
import EditCounterpartyModalProfile from "./edit-counterparty-modal-profile";
import { FaEdit } from "react-icons/fa"; // Иконка для кнопки редактирования
import { useNavigate } from "react-router-dom";

export interface EmployeeProfile {
	id: number; // Уникальный идентификатор сотрудника
	type: "individual" | "company"; // Тип сотрудника
	data: {
		fullName: string;
		birthDate: string;
		passportNumber: string;
		passportIssueDate: string;
		birthPlace: string;
		passportIssuer: string;
		passportCode: string;
		address: string;
		inn: string;
		phone: string;
		email: string;
		companyName?: string; // Если это компания
		directorName?: string;
		legalAddress?: string;
		bankName?: string;
		account?: string;
		corpAccount?: string;
		innUr?: string;
		kpp?: string;
		ogrn?: string;
		phoneUr?: string;
		emailUr?: string;
	};
}

export interface SellerAccountContentProps {
	employeeData: EmployeeProfile; // Данные сотрудника
}

export const SellerAccountContent: React.FC<SellerAccountContentProps> = ({ employeeData }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		navigate("/login");
	};
	// const { type, data } = mainFormData;

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedData, setSelectedData] = useState<any>(employeeData.data);
	const [selectedType, setSelectedType] = useState<"individual" | "company">(employeeData.type);
	const [employeeId] = useState<number>(employeeData.id); // Идентификатор сотрудника

	// Функция для открытия модального окна редактирования
	const handleOpenModal = () => {
		setEditModalOpen(true);
	};

	// Обработчик сохранения данных из модального окна
	const handleSave = (updatedData: any) => {
		console.log("Сохраненные данные для сотрудника с id:", employeeId, updatedData);
		// Сохранение данных сотрудника (например, обновление в базе данных)
	};

	return (
		<div className="profile-container">
			<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				<h2 className="profile-title">Профиль</h2>
				<button className="btn btn--edit" onClick={handleOpenModal}>
					<FaEdit size={12} /> Редактировать
				</button>
			</div>

			<div className="profile-content">
				{selectedType === "individual" ? (
					<>
						<div className="profile-item">
							<label>ФИО:</label>
							<input type="text" value={selectedData.fullName} readOnly />
						</div>
						<div className="profile-item">
							<label>Дата рождения:</label>
							<input type="text" value={selectedData.birthDate} readOnly />
						</div>
						<div className="profile-item">
							<label>Паспорт:</label>
							<input type="text" value={selectedData.passportNumber} readOnly />
						</div>
						<div className="profile-item">
							<label>Дата выдачи:</label>
							<input type="text" value={selectedData.passportIssueDate} readOnly />
						</div>
						<div className="profile-item">
							<label>Кем выдан:</label>
							<input type="text" value={selectedData.passportIssuer} readOnly />
						</div>
						<div className="profile-item">
							<label>Код подразделения:</label>
							<input type="text" value={selectedData.passportCode} readOnly />
						</div>
						<div className="profile-item">
							<label>Место рождения:</label>
							<input type="text" value={selectedData.birthPlace} readOnly />
						</div>
						<div className="profile-item">
							<label>Адрес:</label>
							<input type="text" value={selectedData.address} readOnly />
						</div>
						<div className="profile-item">
							<label>ИНН:</label>
							<input type="text" value={selectedData.inn} readOnly />
						</div>
						<div className="profile-item">
							<label>Телефон:</label>
							<input type="text" value={selectedData.phone} readOnly />
						</div>
						<div className="profile-item">
							<label>Email:</label>
							<input type="text" value={selectedData.email} readOnly />
						</div>
						<div className="profile-item">
							<button className="btn" onClick={handleLogout}>
								Выйти из аккаунта
							</button>
						</div>
					</>
				) : (
					<>
						<div className="profile-item">
							<label>Компания:</label>
							<input type="text" value={selectedData.companyName} readOnly />
						</div>
						<div className="profile-item">
							<label>Директор:</label>
							<input type="text" value={selectedData.directorName} readOnly />
						</div>
						<div className="profile-item">
							<label>Юр. адрес:</label>
							<input type="text" value={selectedData.legalAddress} readOnly />
						</div>
						<div className="profile-item">
							<label>Банк:</label>
							<input type="text" value={selectedData.bankName} readOnly />
						</div>
						<div className="profile-item">
							<label>Р/С:</label>
							<input type="text" value={selectedData.account} readOnly />
						</div>
						<div className="profile-item">
							<label>К/С:</label>
							<input type="text" value={selectedData.corpAccount} readOnly />
						</div>
						<div className="profile-item">
							<label>ИНН:</label>
							<input type="text" value={selectedData.innUr} readOnly />
						</div>
						<div className="profile-item">
							<label>Адрес:</label>
							<input type="text" value={selectedData.address} readOnly />
						</div>
						<div className="profile-item">
							<label>ИНН:</label>
							<input type="text" value={selectedData.inn} readOnly />
						</div>
						<div className="profile-item">
							<label>КПП:</label>
							<input type="text" value={selectedData.kpp} readOnly />
						</div>
						<div className="profile-item">
							<label>ОГРН:</label>
							<input type="text" value={selectedData.ogrn} readOnly />
						</div>
						<div className="profile-item">
							<label>Телефон:</label>
							<input type="text" value={selectedData.phoneUr} readOnly />
						</div>
						<div className="profile-item">
							<label>Email:</label>
							<input type="text" value={selectedData.emailUr} readOnly />
						</div>
						<div className="profile-item">
							<button className="btn" onClick={handleLogout}>
								Выйти из аккаунта
							</button>
						</div>
					</>
				)}
			</div>

			{editModalOpen && (
				<EditCounterpartyModalProfile
					onClose={() => setEditModalOpen(false)}
					type={selectedType}
					data={selectedData}
					onSave={handleSave}
					//   employeeId={employeeId} // Передаем id сотрудника в модальное окно
				/>
			)}
		</div>
	);
};
