// import { useState } from "react";
// import * as React from "react";
// import axios from "axios";

// interface Props {
// 	onClose: () => void;
// 	onAdd: (newCounterparty: any) => void;
// }

// const AddCounterpartyModal: React.FC<Props> = ({ onClose, onAdd }) => {
// 	const [type, setType] = useState<"individual" | "company">("individual");
// 	const [formData, setFormData] = useState({});

// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const prepareData = (formData: any, type: "individual" | "company") => {
// 		if (type === "individual") {
// 			return {
// 				full_name: formData.fullName,
// 				birth_date: formData.birthDate,
// 				passport_number: formData.passportNumber,
// 				passport_issue_date: formData.passportIssueDate,
// 				birth_place: formData.birthPlace,
// 				passport_issuer: formData.passportIssuer,
// 				passport_code: formData.passportCode,
// 				address: formData.address,
// 				inn: formData.inn,
// 				phone: formData.phone,
// 				email: formData.email,
// 				counterparty_type: "individual",
// 			};
// 		} else {
// 			return {
// 				full_name: formData.companyName,
// 				director_name: formData.directorName,
// 				legal_address: formData.legalAddress,
// 				bank_name: formData.bankName,
// 				account: formData.account,
// 				corp_account: formData.corpAccount,
// 				inn: formData.innUr,
// 				kpp: formData.kpp,
// 				ogrn: formData.ogrn,
// 				phone: formData.phoneUr,
// 				email: formData.emailUr,
// 				counterparty_type: "company",
// 			};
// 		}
// 	};

// 	const handleSubmit = async () => {
// 		try {
// 			const preparedData = prepareData(formData, type);
// 			const response = await axios.post("http://localhost:8000/api/counterparties/", preparedData);

// 			// Отправляем нового контрагента родителю
// 			onAdd(response.data);

// 			onClose(); // Закрываем модалку
// 		} catch (error) {
// 			console.error("Ошибка при добавлении контрагента:", error);
// 			alert("Ошибка при добавлении контрагента.");
// 		}
// 	};

// 	return (
// 		<div className="modal-backdrop">
// 			<div className="modal">
// 				<button className="modal__close" onClick={onClose}>
// 					×
// 				</button>
// 				<h2 className="modal__title">Добавление контрагента</h2>

// 				<div className="modal__radio-group">
// 					<label>
// 						<input
// 							type="radio"
// 							name="type"
// 							value="individual"
// 							checked={type === "individual"}
// 							onChange={() => setType("individual")}
// 						/>
// 						<span>Физическое лицо</span>
// 					</label>
// 					<label>
// 						<input
// 							type="radio"
// 							name="type"
// 							value="company"
// 							checked={type === "company"}
// 							onChange={() => setType("company")}
// 						/>
// 						<span>Юридическое лицо</span>
// 					</label>
// 				</div>

// 				{/* <form className="modal__form">
// 					{(type === "individual"
// 						? [
// 								"fullName:ФИО",
// 								"birthDate:Дата рождения",
// 								"passportNumber:Серия и номер паспорта",
// 								"passportIssueDate:Дата выдачи",
// 								"birthPlace:Место рождения",
// 								"passportIssuer:Кем выдан",
// 								"passportCode:Код подразделения",
// 								"address:Адрес",
// 								"inn:ИНН",
// 								"phone:Телефон",
// 								"email:Почта",
// 						  ]
// 						: [
// 								"companyName:Наименование",
// 								"directorName:ФИО гендиректора",
// 								"legalAddress:Юридический адрес",
// 								"bankName:Наименование банка",
// 								"account:Расчетный счет",
// 								"corpAccount:Корпоративный счет",
// 								"innUr:ИНН",
// 								"kpp:КПП",
// 								"ogrn:ОГРН",
// 								"phoneUr:Телефон",
// 								"emailUr:Почта",
// 						  ]
// 					).map((field) => {
// 						const [name, placeholder] = field.split(":");
// 						return (
// 							<input
// 								key={name}
// 								name={name}
// 								placeholder={placeholder}
// 								type={name.includes("Date") ? "date" : "text"}
// 								onChange={handleChange}
// 								className="modal__input"
// 							/>
// 						);
// 					})}
// 				</form> */}

// 				<form className="modal__form">
// 					{(type === "individual"
// 						? [
// 								"fullName:ФИО",
// 								"birthDate:Дата рождения",
// 								"passportNumber:Серия и номер паспорта",
// 								"passportIssueDate:Дата выдачи",
// 								"birthPlace:Место рождения",
// 								"issued_by:Кем выдан",
// 								"passport_code:Код подразделения",
// 								"address:Адрес",
// 								"inn:ИНН",
// 								"phone:Телефон",
// 								"email:Почта",
// 						  ]
// 						: [
// 								"companyName:Наименование",
// 								"directorName:ФИО гендиректора",
// 								"legalAddress:Юридический адрес",
// 								"bankName:Наименование банка",
// 								"account:Расчетный счет",
// 								"corpAccount:Корпоративный счет",
// 								"innUr:ИНН",
// 								"kpp:КПП",
// 								"ogrn:ОГРН",
// 								"phoneUr:Телефон",
// 								"emailUr:Почта",
// 						  ]
// 					).map((field) => {
// 						const [name, placeholder] = field.split(":");
// 						return (
// 							<input
// 								key={name}
// 								name={name}
// 								placeholder={placeholder}
// 								type={name.includes("Date") ? "date" : "text"}
// 								onChange={handleChange}
// 								className="modal__input"
// 							/>
// 						);
// 					})}
// 				</form>

// 				<div className="modal__buttons">
// 					<button className="btn btn--secondary" onClick={onClose}>
// 						Отмена
// 					</button>
// 					<button className="btn btn--primary" onClick={handleSubmit}>
// 						Добавить
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default AddCounterpartyModal;

import { useState } from "react";
import * as React from "react";
import axios from "axios";

interface Props {
	onClose: () => void;
	onAdd: (newCounterparty: any) => void;
}

const AddCounterpartyModal: React.FC<Props> = ({ onClose, onAdd }) => {
	const [type, setType] = useState<"individual" | "company">("individual");
	const [formData, setFormData] = useState<any>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async () => {
		try {
			const payload: any = {
				counterparty_type: type,
				full_name: formData.fullName || "",
				inn: formData.inn || "",
				email: formData.email || "",
				phone: formData.phone || "",
				legal_address: formData.legalAddress || "",
				director_name: formData.directorName || "",
				kpp: formData.kpp || "",
				ogrn: formData.ogrn || "",
				bank_name: formData.bankName || "",
				account: formData.account || "",
				corp_account: formData.corpAccount || "",
				passport_series: formData.passportSeries || "",
				passport_number: formData.passportNumber || "",
				issued_by: formData.passportIssuer || "",
				issue_date: formData.passportIssueDate || null,
				birth_date: formData.birthDate || null,
				birth_place: formData.birthPlace || "",
				passport_code: formData.passportCode || "",
				address: formData.address || "",
			};

			const response = await axios.post("http://localhost:8000/api/counterparties/", payload);

			onAdd(response.data); // Передаем нового контрагента в родителя
			onClose(); // Закрываем модалку
			alert("Контрагент успешно добавлен!");
		} catch (error) {
			console.error("Ошибка при добавлении контрагента:", error);
			alert("Ошибка при добавлении контрагента.");
		}
	};

	const fields =
		type === "individual"
			? [
					{ name: "fullName", placeholder: "ФИО" },
					{ name: "birthDate", placeholder: "Дата рождения", type: "date" },
					{ name: "passportSeries", placeholder: "Серия паспорта" },
					{ name: "passportNumber", placeholder: "Номер паспорта" },
					{ name: "passportIssueDate", placeholder: "Дата выдачи", type: "date" },
					{ name: "birthPlace", placeholder: "Место рождения" },
					{ name: "passportIssuer", placeholder: "Кем выдан" },
					{ name: "passportCode", placeholder: "Код подразделения" },
					{ name: "address", placeholder: "Адрес" },
					{ name: "inn", placeholder: "ИНН" },
					{ name: "phone", placeholder: "Телефон" },
					{ name: "email", placeholder: "Почта" },
			  ]
			: [
					{ name: "fullName", placeholder: "Наименование компании" },
					{ name: "directorName", placeholder: "ФИО Генерального директора" },
					{ name: "legalAddress", placeholder: "Юридический адрес" },
					{ name: "bankName", placeholder: "Наименование банка" },
					{ name: "account", placeholder: "Расчетный счет" },
					{ name: "corpAccount", placeholder: "Корпоративный счет" },
					{ name: "inn", placeholder: "ИНН" },
					{ name: "kpp", placeholder: "КПП" },
					{ name: "ogrn", placeholder: "ОГРН" },
					{ name: "phone", placeholder: "Телефон" },
					{ name: "email", placeholder: "Почта" },
			  ];

	return (
		<div className="modal-backdrop">
			<div className="modal">
				<button className="modal__close" onClick={onClose}>
					×
				</button>
				<h2 className="modal__title">Добавление контрагента</h2>

				<div className="modal__radio-group">
					<label>
						<input
							type="radio"
							name="type"
							value="individual"
							checked={type === "individual"}
							onChange={() => setType("individual")}
						/>
						<span>Физическое лицо</span>
					</label>
					<label>
						<input
							type="radio"
							name="type"
							value="company"
							checked={type === "company"}
							onChange={() => setType("company")}
						/>
						<span>Юридическое лицо</span>
					</label>
				</div>

				<form className="modal__form">
					{fields.map(({ name, placeholder, type: inputType = "text" }) => (
						<input
							key={name}
							name={name}
							placeholder={placeholder}
							type={inputType}
							onChange={handleChange}
							className="modal__input"
						/>
					))}
				</form>

				<div className="modal__buttons">
					<button className="btn btn--secondary" onClick={onClose}>
						Отмена
					</button>
					<button className="btn btn--primary" onClick={handleSubmit}>
						Добавить
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddCounterpartyModal;
