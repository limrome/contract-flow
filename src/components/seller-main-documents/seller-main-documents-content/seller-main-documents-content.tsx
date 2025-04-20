import * as React from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import SellerDocumentSearch from "./seller-document-search";
import { useNavigate } from "react-router-dom";
import { RiMailSendFill } from "react-icons/ri";
import SellerDocumentApprovalModal from "./seller-document-approval-modal";

const EditIcon = RiMailSendFill as React.FC<{ size?: number }>;

// Состояние для поиска

const documents = [
	{
		id: 1,
		data: {
			companyName: 'ООО "Ромашка"',
			contractNumber: "ДКП №123",
			status: "На согласовании",
			date: "13.03.25",
		},
	},
	{
		id: 2,
		data: {
			companyName: 'ООО "Одуванчики"',
			contractNumber: "ДКП №55",
			status: "Согласован",
			date: "01.04.25",
		},
	},
	{
		id: 3,
		data: {
			companyName: 'ООО "Рога и копыта"',
			contractNumber: "ДКП №1",
			status: "Не согласован",
			date: "15.02.25",
		},
	},
	{
		id: 4,
		data: {
			companyName: 'ООО "Мокрый нос"',
			contractNumber: "ДКП №122",
			status: "Ожидается согласование",
			date: "15.02.25",
		},
	},
	{
		id: 5,
		data: {
			fullName: "Петров Павел Петрович",
			contractNumber: "ДКП №1111",
			status: "Ожидается согласование",
			date: "15.03.25",
		},
	},
];

export const SellerMainDocumentsContent = ({ mainFormData }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	console.log(mainFormData);

	const [modalOpen, setModalOpen] = useState(false); // Для открытия/закрытия модала

	// Открытие модального окна
	const openModal = () => setModalOpen(true);

	// Закрытие модального окна
	const closeModal = () => setModalOpen(false);

	// Обработчик отправки
	const handleModalSubmit = (counterparty: string, comment: string) => {
		// Логика для отправки (например, отправка данных на сервер)
		console.log("Отправлено:", { counterparty, comment });
		closeModal(); // Закрыть модал после отправки
	};

	// Фильтрация контрагентов по поисковому запросу
	const filteredDocuments =
		documents && Array.isArray(documents)
			? documents.filter((document) => {
					const query = searchQuery.toLowerCase();
					return Object.values(document.data).some((fieldValue) =>
						String(fieldValue).toLowerCase().includes(query)
					);
			  })
			: []; // Если данных нет, возвращаем пустой массивF
	return (
		<>
			<div className="content-seller">
				{mainFormData.documentTypeState === "allDocuments" ? (
					<div className="paper">
						<p className="justify">
							<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
								<h2>Все документы</h2>
								<SellerDocumentSearch
									searchQuery={searchQuery}
									setSearchQuery={setSearchQuery} // Передаем setSearchQuery
								/>
							</div>
						</p>
						<p> </p>
						<p> </p>
						<div className="content-container-table-main">
							<Table bordered responsive>
								<thead>
									<tr className="table-header">
										{/* <td>Контрагенты</td> */}
										<td>Документы</td>
										<td>Статус</td>
										<td>Дата</td>
									</tr>
								</thead>
								<tbody>
									{filteredDocuments.map((doc) => (
										<tr key={doc.id} onClick={() => navigate(`/document/${doc.id}`)}>
											{/* <td>{doc.data.companyName}</td> */}
											<td>{doc.data.contractNumber}</td>
											<td>{doc.data.status}</td>
											<td>{doc.data.date}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
						<p> </p>
					</div>
				) : mainFormData.documentTypeState === "toBeAgreedDocuments" ? (
					<div className="paper">
						<p className="justify">
							<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
								<h2>Документы на согласовании</h2>
								<SellerDocumentSearch
									searchQuery={searchQuery}
									setSearchQuery={setSearchQuery} // Передаем setSearchQuery
								/>
							</div>
						</p>
						<p> </p>
						<p> </p>
						<div className="content-container-table-main">
							<Table bordered responsive>
								<thead>
									<tr className="table-header">
										<td>Контрагенты</td>
										<td>Документы</td>
										<td>Дата</td>
									</tr>
								</thead>
								<tbody>
								{filteredDocuments
										.filter((doc) => doc.data.status === "На согласовании")
										.map((doc) => (
										<tr key={doc.id} onClick={() => navigate(`/document/${doc.id}`)}>
											<td>{doc.data.companyName}</td>
											<td>{doc.data.contractNumber}</td>
											{/* <td>{doc.data.status}</td> */}
											<td>{doc.data.date}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
						<p> </p>
					</div>
				) : mainFormData.documentTypeState === "agreedDocuments" ? (
					<div className="paper">
						<p className="justify">
							<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
								<h2>Согласованные документы</h2>
								<SellerDocumentSearch
									searchQuery={searchQuery}
									setSearchQuery={setSearchQuery} // Передаем setSearchQuery
								/>
							</div>
						</p>
						<p> </p>
						<p> </p>
						<div className="content-container-table-main">
							<Table bordered responsive>
								<thead>
									<tr className="table-header">
										<td>Контрагенты</td>
										<td>Документы</td>
										<td>Дата</td>
									</tr>
								</thead>
								<tbody>
									{filteredDocuments
										.filter((doc) => doc.data.status === "Согласован")
										.map((doc) => (
											<tr key={doc.id} onClick={() => navigate(`/document/${doc.id}`)}>
												<td>{doc.data.companyName}</td>
												<td>{doc.data.contractNumber}</td>
												{/* <td>{doc.data.status}</td> */}
												<td>{doc.data.date}</td>
											</tr>
										))}
								</tbody>
							</Table>
						</div>
						<p> </p>
					</div>
				) : mainFormData.documentTypeState === "notAgreedDocuments" ? (
					<div className="paper">
						<p className="justify">
							<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
								<h2>Несогласованные документы</h2>
								<SellerDocumentSearch
									searchQuery={searchQuery}
									setSearchQuery={setSearchQuery} // Передаем setSearchQuery
								/>
							</div>
						</p>
						<p> </p>
						<p> </p>
						<div className="content-container-table-main">
							<Table bordered responsive>
								<thead>
									<tr className="table-header">
										<td>Контрагенты</td>
										<td>Документы</td>
										<td>Дата</td>
									</tr>
								</thead>
								<tbody>
									{filteredDocuments
										.filter((doc) => doc.data.status === "Не согласован")
										.map((doc) => (
											<tr key={doc.id} onClick={() => navigate(`/document/${doc.id}`)}>
												<td>{doc.data.companyName}</td>
												<td>{doc.data.contractNumber}</td>
												<td>{doc.data.date}</td>
											</tr>
										))}
								</tbody>
							</Table>
						</div>
						<p> </p>
					</div>
				): null
				//  : (
				// 	<div className="paper">
				// 		<p className="justify">
				// 			<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				// 				<h2>Созданные документы</h2>
				// 				<SellerDocumentSearch
				// 					searchQuery={searchQuery}
				// 					setSearchQuery={setSearchQuery} // Передаем setSearchQuery
				// 				/>
				// 			</div>
				// 		</p>
				// 		<p> </p>
				// 		<p> </p>
				// 		<div className="content-container-table-main">
				// 			<Table bordered responsive>
				// 				<thead>
				// 					<tr className="table-header">
				// 						<td>Контрагенты</td>
				// 						<td>Документы</td>
				// 						<td>Дата</td>
				// 						<td>Согласование</td>
				// 					</tr>
				// 				</thead>
				// 				<tbody>
				// 					{filteredDocuments
				// 						.filter((doc) => doc.data.status === "Ожидается согласование")
				// 						.map((doc) => (
				// 							<tr
				// 								key={doc.id}
				// 								// onClick={() => navigate(`/document/${doc.id}`)}
				// 							>
				// 								<td>{doc.data.companyName}</td>
				// 								<td>{doc.data.contractNumber}</td>
				// 								<td>{doc.data.date}</td>
				// 								<td>
				// 									<button className="icon-btn" title="На согласование" onClick={openModal}>
				// 										<EditIcon size={18} />
				// 									</button>
				// 								</td>
				// 							</tr>
				// 						))}
				// 				</tbody>
				// 			</Table>
				// 			<SellerDocumentApprovalModal
				// 				showModal={modalOpen}
				// 				onClose={closeModal}
				// 				onSubmit={handleModalSubmit}
				// 			/>
				// 		</div>
				// 		{/* <DocumentApprovalModal
				// 			showModal={modalOpen}
				// 			onClose={closeModal}
				// 			onSubmit={handleModalSubmit}
				// 		/> */}
				// 		<p> </p>
				// 	</div>
			//  )
			}
			</div>
		</>
	);
};
