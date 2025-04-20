import React, { useState } from "react";
import { counterparties } from "../../sellers/content/sellers-content";

// Контрагенты (замените на реальные данные из компонента SellersContent)
// const counterparties = [
//   {
//     id: 1,
//     type: "company", // 👈 тип
//     data: {
//       companyName: 'ООО "Гусь и рыба"',
//       directorName: "Иванов И.И.",
//       legalAddress: "г. Москва, ул. Рыбная, д. 1",
//       bankName: "РыбБанк",
//       account: "123456789",
//       corpAccount: "987654321",
//       innUr: "8856454718",
//       kpp: "5465454646",
//       ogrn: "1027700132195",
//       phoneUr: "+7 (123) 456-78-90",
//       emailUr: "gusi@ya.ru",
//     },
//   },
//   {
//     id: 2,
//     type: "individual", // 👈 тип
//     data: {
//       fullName: "Петров П.П.",
//       birthDate: "1990-01-01",
//       passportNumber: "1234 567890",
//       passportIssueDate: "2010-01-01",
//       birthPlace: "г. Саратов",
//       passportIssuer: "УФМС России",
//       passportCode: "123-456",
//       address: "г. Саратов, ул. Лесная, д. 3",
//       inn: "9876543210",
//       phone: "+7 (999) 999-99-99",
//       email: "petrov@mail.ru",
//     },
//   },
// ];

interface DocumentApprovalModalProps {
	showModal: boolean;
	onClose: () => void;
	onSubmit: (counterparty: string, comment: string) => void;
}

const DocumentApprovalModal: React.FC<DocumentApprovalModalProps> = ({
	showModal,
	onClose,
	onSubmit,
}) => {
	const [counterparty, setCounterparty] = useState("");
	const [comment, setComment] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);

	const filteredCounterparties = counterparties.filter((c) => {
		const name = c.data.companyName || c.data.fullName || "";
		return name.toLowerCase().includes(counterparty.toLowerCase());
	});

	const handleSelect = (name: string) => {
		setCounterparty(name);
		setShowSuggestions(false);
	};

	// Обработчик отправки данных
	const handleSubmit = () => {
		onSubmit(counterparty, comment); // Отправляем контрагента и комментарий
		onClose(); // Закрываем модальное окно после отправки
	};

	if (!showModal) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h3>На согласование</h3>
					<button className="close-btn" onClick={onClose}>
						×
					</button>
				</div>
				<div className="modal-body">
					<div className="form-group">
						<label htmlFor="counterparty">Контрагент</label>
						<input
							type="text"
							id="counterparty"
							placeholder="Введите контрагента"
							value={counterparty}
							// onChange={(e) => setCounterparty(e.target.value)}
							onChange={(e) => {
								setCounterparty(e.target.value);
								setShowSuggestions(true);
							}}
							onFocus={() => setShowSuggestions(true)}
							onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // 👈 задержка, чтобы успеть кликнуть
							autoComplete="off"
						/>
						{showSuggestions && filteredCounterparties.length > 0 && (
							<ul className="suggestion-list">
								{filteredCounterparties.map((c) => {
									const name = c.data.companyName || c.data.fullName; // универсальное имя
									return (
										<li
											key={c.id}
											className="suggestion-item"
											onMouseDown={() => handleSelect(name)} // 👈 именно onMouseDown, не onClick
										>
											{name}
										</li>
									);
								})}
							</ul>
						)}
					</div>
					<div className="form-group">
						<label htmlFor="comment">Комментарий</label>
						<textarea
							id="comment"
							placeholder="Введите комментарий"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
					</div>
				</div>
				<div className="modal-footer">
					<button className="btn-secondary" onClick={onClose}>
						Закрыть
					</button>
					<button className="btn-primary" onClick={handleSubmit}>
						Отправить
					</button>
				</div>
			</div>
		</div>
	);
};

export default DocumentApprovalModal;
