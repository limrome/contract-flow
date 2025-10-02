import React, { useState, useEffect } from "react";
import axios from "axios";

interface DocumentApprovalModalProps {
	showModal: boolean;
	onClose: () => void;
	documentId: string;
}

const DocumentApprovalModal: React.FC<DocumentApprovalModalProps> = ({
	showModal,
	onClose,
	documentId,
}) => {
	const [counterparty, setCounterparty] = useState(""); // Для поиска контрагента по имени
	const [counterpartyId, setCounterpartyId] = useState<string | null>(null); // Для хранения ID выбранного контрагента
	const [comment, setComment] = useState("Просьба согласовать"); // Для комментария
	const [showSuggestions, setShowSuggestions] = useState(false); // Для показа подсказок
	const [counterparties, setCounterparties] = useState<any[]>([]); // Для хранения контрагентов
	const [isLoading, setIsLoading] = useState(true); // Статус загрузки данных
	const [isSubmitting, setIsSubmitting] = useState(false); // Статус отправки комментария
	
	const status = "На согласовании";
	useEffect(() => {
		fetch("http://localhost:8000/api/counterparties")
			.then((res) => res.json())
			.then((data) => {
				console.log("Контрагенты:", data);
				setCounterparties(data);
			})
			.catch((err) => console.error("Ошибка загрузки контрагентов", err));
	}, []);

	const filteredCounterparties = counterparties.filter((c) =>
		(c.full_name || "").toLowerCase().includes(counterparty.toLowerCase())
	);
	const handleSelect = (id: string, name: string) => {
		setCounterparty(name);
		setCounterpartyId(id);
		setShowSuggestions(false);
	};

	const handleSubmit = async () => {
		if (!counterpartyId || !comment) {
			alert("Пожалуйста, выберите контрагента и введите комментарий.");
			return;
		}

		try {
			setIsSubmitting(true);
			const response = await axios.post("http://localhost:8000/api/add_comment/", {
				document_id: documentId,
				counterparty_id: counterpartyId,
				comment: comment,
				is_manager: true,
				status: status,
			});

			if (response.status === 201) {
				alert("Комментарий успешно добавлен!");
				onClose();
			}
		} catch (error) {
			console.error("Ошибка при отправке комментария:", error);
			alert("Ошибка при отправке комментария.");
		} finally {
			setIsSubmitting(false);
		}
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
							value={counterparty}
							onChange={(e) => {
								setCounterparty(e.target.value);
								setShowSuggestions(true);
							}}
							onFocus={() => setShowSuggestions(true)}
							autoComplete="off"
						/>
						{showSuggestions && filteredCounterparties.length > 0 ? (
							<ul className="suggestion-list">
								{filteredCounterparties.map((c) => {
									return (
										<li
											key={c.counterparty_id}
											className="suggestion-item"
											onMouseDown={() => handleSelect(c.counterparty_id, c.full_name)}>
											{c.full_name}
										</li>
									);
								})}
							</ul>
						) : null}
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
					<button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
						{isSubmitting ? "Отправка..." : "Отправить"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DocumentApprovalModal;
