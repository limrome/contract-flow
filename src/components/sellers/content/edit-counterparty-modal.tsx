// import React, { useState } from "react";
// import { FaSave, FaTimes } from "react-icons/fa";

// interface EditCounterpartyModalProps {
// 	onClose: () => void;
// 	type: "individual" | "company";
// 	data: any; // Тип данных контрагента (например, объект с данными)
// 	onSave: (updatedData: any) => void; // Функция сохранения изменений
// }

// const EditCounterpartyModal: React.FC<EditCounterpartyModalProps> = ({
// 	onClose,
// 	type,
// 	data,
// 	onSave,
// }) => {
// 	// Состояние для редактируемых данных
// 	const [formData, setFormData] = useState(data);
//   console.log(formData);

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		console.log(`Changing ${name} to ${value}`); // Выводим в консоль имя поля и новое значение
// 		setFormData({
// 			...formData,
// 			[name]: value,
// 		});
// 	};

// 	const handleSave = () => {
// 		onSave(formData); // Сохраняем измененные данные
// 		onClose(); // Закрываем модалку после сохранения
// 	};

// 	return (
// 		<div className="modal-backdrop-edit">
// 			<div className="modal-edit">
// 				<button className="modal__close-edit" onClick={onClose}>
// 					<FaTimes size={20} />
// 				</button>
// 				<h2 className="modal__title">Редактировать контрагента</h2>
// 				<div className="modal__form-edit">
// 					{type === "company" ? (
// 						<>
// 							<div className="modal__field-edit">
// 								<label>Наименование компании</label>
// 								<input
// 									type="text"
// 									name="companyName"
// 									value={formData.companyName || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>ФИО Генерального директора</label>
// 								<input
// 									type="text"
// 									name="directorName"
// 									value={formData.directorName || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Юридический адрес</label>
// 								<input
// 									type="text"
// 									name="legalAddress"
// 									value={formData.legalAddress || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Наименование банка</label>
// 								<input
// 									type="text"
// 									name="bankName"
// 									value={formData.bankName || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Расчетный счет</label>
// 								<input
// 									type="text"
// 									name="account"
// 									value={formData.account || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Корпоративный счет</label>
// 								<input
// 									type="text"
// 									name="corpAccount"
// 									value={formData.corpAccount || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>ИНН</label>
// 								<input
// 									type="text"
// 									name="innUr"
// 									value={formData.innUr || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>КПП</label>
// 								<input
// 									type="text"
// 									name="kpp"
// 									value={formData.kpp || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>ОГРН</label>
// 								<input
// 									type="text"
// 									name="ogrn"
// 									value={formData.ogrn || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Номер телефона</label>
// 								<input
// 									type="text"
// 									name="phoneUr"
// 									value={formData.phoneUr || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Почта</label>
// 								<input
// 									type="email"
// 									name="emailUr"
// 									value={formData.emailUr || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 						</>
// 					) : (
// 						<>
// 							<div className="modal__field-edit">
// 								<label>ФИО</label>
// 								<input
// 									type="text"
// 									name="fullName"
// 									value={formData.fullName || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Дата рождения</label>
// 								<input
// 									type="date"
// 									name="birthDate"
// 									value={formData.birthDate || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Серия и номер паспорта</label>
// 								<input
// 									type="text"
// 									name="passportNumber"
// 									value={formData.passportNumber}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Дата выдачи</label>
// 								<input
// 									type="date"
// 									name="passportIssueDate"
// 									value={formData.passportIssueDate || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Место рождения</label>
// 								<input
// 									type="text"
// 									name="birthPlace"
// 									value={formData.birthPlace || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Кем выдан</label>
// 								<input
// 									type="text"
// 									name="passportIssuer"
// 									value={formData.passportIssuer || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Код подразделения</label>
// 								<input
// 									type="text"
// 									name="passportCode"
// 									value={formData.passportCode || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Адрес</label>
// 								<input
// 									type="text"
// 									name="address"
// 									value={formData.address || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>ИНН</label>
// 								<input
// 									type="text"
// 									name="inn"
// 									value={formData.inn || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Номер телефона</label>
// 								<input
// 									type="text"
// 									name="phone"
// 									value={formData.phone || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 							<div className="modal__field-edit">
// 								<label>Почта</label>
// 								<input
// 									type="email"
// 									name="email"
// 									value={formData.email || ""}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 						</>
// 					)}
// 				</div>
// 				<div className="modal__buttons-edit">
// 					<button className="btn-edit" onClick={handleSave}>
// 						<FaSave size={12} /> Сохранить
// 					</button>
// 					<button className="btn-edit btn--secondary" onClick={onClose}>
// 						Отмена
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default EditCounterpartyModal;


// import React, { useState, useEffect } from "react";
// import { FaSave, FaTimes } from "react-icons/fa";

// interface EditCounterpartyModalProps {
//   onClose: () => void;
//   type: "individual" | "company";
//   data: any; // Тип данных контрагента
//   onSave: (updatedData: any) => void; // Функция сохранения изменений
// }

// const EditCounterpartyModal: React.FC<EditCounterpartyModalProps> = ({
//   onClose,
//   type,
//   data,
//   onSave,
// }) => {
//   const [formData, setFormData] = useState<any>(data);

//   // Используем useEffect для корректной инициализации данных при изменении props
//   useEffect(() => {
// 	console.log("Received data in EditCounterpartyModal:", data);
// 	setFormData(data); // Устанавливаем данные в состояние
//   }, [data]);
  
//   console.log("Current formData:", formData); // Печатаем текущее состояние формы

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 	const { name, value } = e.target;
// 	console.log(`Changing ${name} to ${value}`); // Выводим в консоль для отладки
// 	setFormData((prevData) => ({
// 	  ...prevData,
// 	  [name]: value, // Обновляем конкретное поле
// 	}));
//   };

//   const handleSave = () => {
// 	console.log("Saved data: ", formData); // Проверка данных перед сохранением
// 	onSave(formData); // Сохраняем измененные данные
// 	onClose(); // Закрываем модалку после сохранения
//   };

//   const fields =
//     type === "company"
//       ? [
//           { name: "companyName", label: "Наименование компании", field: "full_name" },
//           { name: "directorName", label: "ФИО Генерального директора", field: "director_name" },
//           { name: "legalAddress", label: "Юридический адрес", field: "legal_address" },
//           { name: "bankName", label: "Наименование банка", field: "bank_name" },
//           { name: "account", label: "Расчетный счет", field: "account" },
//           { name: "corpAccount", label: "Корпоративный счет", field: "corp_account" },
//           { name: "innUr", label: "ИНН", field: "inn" },
//           { name: "kpp", label: "КПП", field: "kpp" },
//           { name: "ogrn", label: "ОГРН", field: "ogrn" },
//           { name: "phoneUr", label: "Номер телефона", field: "phone" },
//           { name: "emailUr", label: "Почта", field: "email" },
//         ]
//       : [
//           { name: "fullName", label: "ФИО", field: "full_name" },
//           { name: "birthDate", label: "Дата рождения", field: "birth_date" },
//           { name: "passportNumber", label: "Серия и номер паспорта", field: "passport_number" },
//           { name: "passportIssueDate", label: "Дата выдачи", field: "passport_issue_date" },
//           { name: "birthPlace", label: "Место рождения", field: "birth_place" },
//           { name: "passportIssuer", label: "Кем выдан", field: "passport_issuer" },
//           { name: "passportCode", label: "Код подразделения", field: "passport_code" },
//           { name: "address", label: "Адрес", field: "address" },
//           { name: "inn", label: "ИНН", field: "inn" },
//           { name: "phone", label: "Номер телефона", field: "phone" },
//           { name: "email", label: "Почта", field: "email" },
//         ];

//   return (
//     <div className="modal-backdrop-edit">
//       <div className="modal-edit">
//         <button className="modal__close-edit" onClick={onClose}>
//           <FaTimes size={20} />
//         </button>
//         <h2 className="modal__title">Редактировать контрагента</h2>
//         <div className="modal__form-edit">
//           {fields.map(({ name, label, field }) => (
//             <div className="modal__field-edit" key={name}>
//               <label>{label}</label>
//               <input
//                 type={name === "birthDate" || name === "passportIssueDate" ? "date" : "text"}
//                 name={name}
//                 value={formData[field] || ""}
//                 onChange={handleInputChange}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="modal__buttons-edit">
//           <button className="btn-edit" onClick={handleSave}>
//             <FaSave size={12} /> Сохранить
//           </button>
//           <button className="btn-edit btn--secondary" onClick={onClose}>
//             Отмена
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditCounterpartyModal;





















import React, { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

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

  // Используем useEffect для корректной инициализации данных при изменении props
  useEffect(() => {
    console.log("Received data in EditCounterpartyModal:", data);
    setFormData(data); // Устанавливаем данные в состояние
  }, [data]);

  // Отладочная информация
  console.log("Current formData:", formData); // Печатаем текущее состояние формы

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Выводим в консоль для отладки

    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Обновляем конкретное поле
    }));
  };

  const handleSave = () => {
    console.log("Saved data:", formData); // Проверка данных перед сохранением
    onSave(formData); // Сохраняем измененные данные
    onClose(); // Закрываем модалку после сохранения
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
          { name: "innUr", label: "ИНН", field: "inn", editable: false }, // ИНН не редактируется
          { name: "kpp", label: "КПП", field: "kpp", editable: false }, // КПП не редактируется
          { name: "ogrn", label: "ОГРН", field: "ogrn" },
          { name: "phoneUr", label: "Номер телефона", field: "phone" },
          { name: "emailUr", label: "Почта", field: "email" },
        ]
      : [
          { name: "fullName", label: "ФИО", field: "full_name" },
          { name: "birthDate", label: "Дата рождения", field: "birth_date" },
          { name: "passportNumber", label: "Серия и номер паспорта", field: "passport_number" },
          { name: "passportIssueDate", label: "Дата выдачи", field: "passport_issue_date" },
          { name: "birthPlace", label: "Место рождения", field: "birth_place" },
          { name: "passportIssuer", label: "Кем выдан", field: "passport_issuer" },
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
                name={name}
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

