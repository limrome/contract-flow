import * as React from "react";
import Table from "react-bootstrap/Table";
import AddCounterpartyModal from "./add-counterparty-modal";
import { useState, useEffect } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import ViewCounterpartyModal from "./view-counterparty-modal";
import EditCounterpartyModal from "./edit-counterparty-modal";
import ContractorSearch from "./contractor-search";
import { fetchCounterparties } from "../../services/api";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
export const SellersContent = ({ mainFormData }) => {
	console.log(mainFormData);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [selectedData, setSelectedData] = useState<any>({});
	const [selectedType, setSelectedType] = useState<"individual" | "company">("company");

	const [editModalOpen, setEditModalOpen] = useState(false);
	// Состояние для поиска
	const [searchQuery, setSearchQuery] = useState("");

	const [counterparties, setCounterparties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await fetchCounterparties();
				console.log("Ответ от сервера:", data); // Логируем ответ от сервера

				// Если данные пришли, сразу сохраняем их
				if (Array.isArray(data)) {
					setCounterparties(data);
				} else {
					setError("Получены некорректные данные");
				}
			} catch (e) {
				setError("Не удалось загрузить контрагентов");
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, []);

	// Фильтрация контрагентов по поисковому запросу
	const filteredCounterparties =
		counterparties && Array.isArray(counterparties)
			? counterparties.filter((counterparty) => {
					const query = searchQuery.toLowerCase();
					const matches = Object.values(counterparty).some((fieldValue) =>
						String(fieldValue).toLowerCase().includes(query)
					);
					console.log("Фильтрация:", counterparty, "Результат фильтрации:", matches); // Логируем каждый контрагент и результат фильтрации
					return matches;
			  })
			: [];

	console.log("Отфильтрованные контрагенты:", filteredCounterparties); // Логируем итоговую фильтрацию

	const EyeIcon = FaEye as React.FC<{ size?: number }>;
	const EditIcon = FaEdit as React.FC<{ size?: number }>;

	const handleSaveCounterparty = async (updatedData: any) => {
		try {
			// Получаем обновленного контрагента из ответа сервера
			const updatedCounterparty = updatedData;

			// Обновляем список контрагентов в состоянии
			setCounterparties((prevCounterparties) => {
				return prevCounterparties.map(
					(counterparty) =>
						counterparty.counterparty_id === updatedCounterparty.counterparty_id
							? updatedCounterparty // Обновляем данные этого контрагента
							: counterparty // Остальные остаются без изменений
				);
			});

			// Закрываем модальное окно
			setEditModalOpen(false);

			// Уведомление об успешном сохранении
			// alert("Контрагент успешно обновлен!");
		} catch (error) {
			console.error("Ошибка сохранения контрагента:", error);
			alert("Не удалось сохранить контрагента.");
		}
	};

	const handleDeleteCounterparty = async (counterpartyId: number) => {
		if (!window.confirm("Вы уверены, что хотите удалить контрагента?")) return;

		try {
			await axios.delete(`http://localhost:8000/api/counterparties/${counterpartyId}/`);
			setCounterparties((prevCounterparties) =>
				prevCounterparties.filter((counterparty) => counterparty.counterparty_id !== counterpartyId)
			);
			// alert("Контрагент успешно удален!");
		} catch (error) {
			console.error("Ошибка при удалении контрагента:", error);
			alert("Не удалось удалить контрагента.");
		}
	};

	return (
		<>
			<div className="content">
				<div className="paper">
					<p className="justify">
						<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
							<h2>Контрагенты</h2>
							<button className="btn" onClick={openModal}>
								Добавить контрагента
							</button>

							{isModalOpen && (
								<AddCounterpartyModal
									onClose={closeModal}
									onAdd={(newCounterparty) => {
										setCounterparties((prev) => [...prev, newCounterparty]); // добавляем нового контрагента в список
									}}
								/>
							)}
						</div>
						<ContractorSearch
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery} // Передаем setSearchQuery
							counterparties={counterparties} // передаем список контрагентов
						/>
					</p>
					<p> </p>
					<p> </p>
					<div className="content-container-table-main">
						{loading ? (
							<p>Загрузка...</p>
						) : error ? (
							<p style={{ color: "red" }}>{error}</p>
						) : (
							<Table bordered responsive>
								<thead>
									<tr className="table-header">
										<td>Наименование</td>
										<td>Почта</td>
										<td>ИНН</td>
										<td>КПП</td>
										<td>Действия</td>
									</tr>
								</thead>

								<tbody>
									{filteredCounterparties.length > 0 ? (
										filteredCounterparties.map((counterparty) => (
											<tr key={counterparty.counterparty_id}>
												<td>
													{counterparty.counterparty_type === "company"
														? counterparty.full_name
														: counterparty.full_name}
												</td>
												<td>{counterparty.email}</td>
												<td>{counterparty.inn}</td>
												<td>
													{counterparty.counterparty_type === "company" ? counterparty.kpp : "-"}
												</td>
												<td>
													<button
														className="icon-btn"
														title="Просмотреть"
														onClick={() => {
															setSelectedData(counterparty);
															setSelectedType(counterparty.counterparty_type);
															setViewModalOpen(true);
														}}>
														<EyeIcon size={15} />
													</button>
													<button
														className="icon-btn"
														title="Редактировать"
														onClick={() => {
															setSelectedData(counterparty);
															setSelectedType(counterparty.counterparty_type);
															setEditModalOpen(true);
														}}>
														<EditIcon size={14} />
													</button>
													<button
														className="icon-btn"
														title="Удалить"
														onClick={() => handleDeleteCounterparty(counterparty.counterparty_id)}>
														<FaTrash size={12} />
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="5">Контрагенты не найдены</td>
										</tr>
									)}
								</tbody>
							</Table>
						)}

						{viewModalOpen && (
							<ViewCounterpartyModal
								onClose={() => setViewModalOpen(false)}
								type={selectedType}
								data={selectedData}
							/>
						)}
						{editModalOpen && (
							<EditCounterpartyModal
								onClose={() => setEditModalOpen(false)}
								type={selectedType}
								data={selectedData}
								onSave={handleSaveCounterparty}
							/>
						)}
					</div>
					<p> </p>
				</div>
			</div>
		</>
	);
};
