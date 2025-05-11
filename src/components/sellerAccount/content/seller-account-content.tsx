import * as React from "react";
import { useState } from "react";
import EditCounterpartyModalProfile from "./edit-counterparty-modal-profile";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface EmployeeProfile {
	id: number;
	counterparty_type: "individual" | "company";
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
	companyName?: string;
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
}

export interface SellerAccountContentProps {
	employeeData: EmployeeProfile;
}

export const SellerAccountContent: React.FC<SellerAccountContentProps> = ({ employeeData }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("access");
		navigate("/login");
	};

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedData, setSelectedData] = useState<any>(employeeData);
	const [selectedType, setSelectedType] = useState<"individual" | "company">(
		employeeData.counterparty_type
	);
	const [employeeId] = useState<number>(employeeData.id);

	const handleOpenModal = () => {
		setEditModalOpen(true);
	};

	const handleSave = (updatedData: any) => {
		console.log("Сохраненные данные для сотрудника с id:", employeeId, updatedData);
	};

	return (
		<div className="profile-container">
			<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				<h2 className="profile-title">Профиль</h2>
				<button className="btn-primary-ed" onClick={handleOpenModal}>
					<FaEdit size={12} /> Редактировать
				</button>
			</div>

			<div className="profile-content">
				{selectedType === "individual" ? (
					<>
						<div className="profile-item">
							<label>ФИО:</label>
							<span className="profile-value">{selectedData.full_name}</span>
						</div>
						<div className="profile-item">
							<label>Дата рождения:</label>
							<span className="profile-value">{selectedData.birth_date}</span>
						</div>
						<div className="profile-item">
							<label>Паспорт:</label>
							<span className="profile-value">{`${selectedData.passport_series} ${selectedData.passport_number}`}</span>
						</div>
						<div className="profile-item">
							<label>Дата выдачи:</label>
							<span className="profile-value">{selectedData.issue_date}</span>
						</div>
						<div className="profile-item">
							<label>Кем выдан:</label>
							<span className="profile-value">{selectedData.issued_by}</span>
						</div>
						<div className="profile-item">
							<label>Код подразделения:</label>
							<span className="profile-value">{selectedData.passport_code}</span>
						</div>
						<div className="profile-item">
							<label>Место рождения:</label>
							<span className="profile-value">{selectedData.birth_place}</span>
						</div>
						<div className="profile-item">
							<label>Адрес:</label>
							<span className="profile-value">{selectedData.address}</span>
						</div>
						<div className="profile-item">
							<label>ИНН:</label>
							<span className="profile-value">{selectedData.inn}</span>
						</div>
						<div className="profile-item">
							<label>Телефон:</label>
							<span className="profile-value">{selectedData.phone}</span>
						</div>
						<div className="profile-item">
							<label>Email:</label>
							<span className="profile-value">{selectedData.email}</span>
						</div>
					</>
				) : (
					<>
						<div className="profile-item">
							<label>Компания:</label>
							<span className="profile-value">
								{selectedData.companyName || selectedData.full_name}
							</span>
						</div>
						<div className="profile-item">
							<label>Директор:</label>
							<span className="profile-value">{selectedData.directorName}</span>
						</div>
						<div className="profile-item">
							<label>Юр. адрес:</label>
							<span className="profile-value">{selectedData.legalAddress}</span>
						</div>
						<div className="profile-item">
							<label>Банк:</label>
							<span className="profile-value">{selectedData.bankName}</span>
						</div>
						<div className="profile-item">
							<label>Р/С:</label>
							<span className="profile-value">{selectedData.account}</span>
						</div>
						<div className="profile-item">
							<label>К/С:</label>
							<span className="profile-value">{selectedData.corpAccount}</span>
						</div>
						<div className="profile-item">
							<label>ИНН:</label>
							<span className="profile-value">{selectedData.innUr || selectedData.inn}</span>
						</div>
						<div className="profile-item">
							<label>КПП:</label>
							<span className="profile-value">{selectedData.kpp}</span>
						</div>
						<div className="profile-item">
							<label>ОГРН:</label>
							<span className="profile-value">{selectedData.ogrn}</span>
						</div>
						<div className="profile-item">
							<label>Адрес:</label>
							<span className="profile-value">{selectedData.address}</span>
						</div>
						<div className="profile-item">
							<label>Телефон:</label>
							<span className="profile-value">{selectedData.phoneUr || selectedData.phone}</span>
						</div>
						<div className="profile-item">
							<label>Email:</label>
							<span className="profile-value">{selectedData.emailUr || selectedData.email}</span>
						</div>
					</>
				)}
			</div>
			<div className="profile-item1">
				<button className="btn-primary" onClick={handleLogout}>
					Выйти из аккаунта
				</button>
			</div>
			{editModalOpen && (
				<EditCounterpartyModalProfile
					onClose={() => setEditModalOpen(false)}
					type={selectedType}
					data={selectedData}
					onSave={handleSave}
				/>
			)}
		</div>
	);
};
