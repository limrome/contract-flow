import React, { useState, useEffect } from "react";
import { fetchCounterparties } from "../../services/counterparty-service";

interface DocumentApprovalModalProps {
	showModal: boolean;
	onClose: () => void;
	onSubmit: (counterparty: string, comment: string) => void;
}

const SellerDocumentApprovalModal: React.FC<DocumentApprovalModalProps> = ({
	showModal,
	onClose,
	onSubmit,
}) => {
	const [counterparty, setCounterparty] = useState("");
	const [comment, setComment] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);

	const [counterparties, setCounterparties] = useState([]);

	useEffect(() => {
		fetchCounterparties().then(setCounterparties).catch(console.error);
	}, []);

	const filteredCounterparties = counterparties.filter((c) => {
		const name = c.data.companyName || c.data.fullName || "";
		return name.toLowerCase().includes(counterparty.toLowerCase());
	});

	const handleSelect = (name: string) => {
		setCounterparty(name);
		setShowSuggestions(false);
	};

	const handleSubmit = () => {
		onSubmit(counterparty, comment);
		onClose();
	};

	if (!showModal) return null;

	return (
		<div className="modal-overlay-seller">
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
							onChange={(e) => {
								setCounterparty(e.target.value);
								setShowSuggestions(true);
							}}
							onFocus={() => setShowSuggestions(true)}
							onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
							autoComplete="off"
						/>
						{showSuggestions && filteredCounterparties.length > 0 && (
							<ul className="suggestion-list">
								{filteredCounterparties.map((c) => {
									const name = c.data.companyName || c.data.fullName;
									return (
										<li
											key={c.id}
											className="suggestion-item"
											onMouseDown={() => handleSelect(name)}>
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

export default SellerDocumentApprovalModal;
