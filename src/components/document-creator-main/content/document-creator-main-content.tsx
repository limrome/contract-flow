import * as React from "react";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import DocumentSearch from "./document-search";
import { useNavigate } from "react-router-dom";
import { RiMailSendFill } from "react-icons/ri";
import DocumentApprovalModal from "./document-approval-modal";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";

const EditIcon = RiMailSendFill as React.FC<{ size?: number }>;

export const DocumentCreatorMainContent = ({ mainFormData }) => {
	const [documents, setDocuments] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(7); // Можно менять, например 20 или 50
	const [showAll, setShowAll] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const statusMap = {
					toBeAgreedDocuments: "На согласовании",
					agreedDocuments: "Согласован",
					notAgreedDocuments: "Не согласован",
					createdDocuments: "Ожидается согласование",
				};
				const status = statusMap[mainFormData.documentTypeState];
				const response = await axios.get("http://localhost:8000/api/documents/", {
					params: status ? { status } : {},
				});
				setDocuments(response.data);
			} catch (error) {
				console.error("Ошибка загрузки документов:", error);
			}
		};
		fetchDocuments();
	}, [mainFormData.documentTypeState]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, mainFormData.documentTypeState]);

	const filteredDocuments = documents
		.filter((doc) => {
			if (!searchQuery) return true;
			const query = searchQuery.toLowerCase();
			return Object.values(doc.data || {}).some((value) =>
				String(value).toLowerCase().includes(query)
			);
		})
		.filter((doc) => {
			switch (mainFormData.documentTypeState) {
				case "toBeAgreedDocuments":
					return doc.status === "На согласовании";
				case "agreedDocuments":
					return doc.status === "Согласован";
				case "notAgreedDocuments":
					return doc.status === "Не согласован";
				case "createdDocuments":
					return doc.status === "Ожидается согласование";
				default:
					return true;
			}
		});

	const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

	const paginatedDocuments = showAll
		? filteredDocuments
		: filteredDocuments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentDocuments = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);

	const openModal = (documentId: string) => {
		setSelectedDocumentId(documentId);
		setModalOpen(true);
	};
	const closeModal = () => setModalOpen(false);

	function formatDate(dateString) {
		if (!dateString) return "—";
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	}

	const [counterparties, setCounterparties] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8000/api/counterparties")
			.then((res) => res.json())
			.then((data) => setCounterparties(data))
			.catch((err) => console.error("Ошибка загрузки контрагентов", err));
	}, []);

	const getTitle = () => {
		switch (mainFormData.documentTypeState) {
			case "toBeAgreedDocuments":
				return "Документы на согласовании";
			case "agreedDocuments":
				return "Согласованные документы";
			case "notAgreedDocuments":
				return "Несогласованные документы";
			case "createdDocuments":
				return "Созданные документы";
			default:
				return "Все документы";
		}
	};

	const showApprovalButton = mainFormData.documentTypeState === "createdDocuments";

	return (
		<div className="content">
			<div className="paper">
				<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
					<h2>{getTitle()}</h2>
					<DocumentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				</div>

				<div className="content-container-table-main">
					<Table bordered responsive>
						<thead>
							<tr className="table-header">
								<td>Контрагенты</td>
								<td>Документы</td>
								<td>Дата</td>
								{showApprovalButton && <td>Согласование</td>}
							</tr>
						</thead>
						<tbody>
							{paginatedDocuments.length === 0 ? (
								<tr>
									<td colSpan={4}>Документы не найдены или произошла ошибка загрузки.</td>
								</tr>
							) : (
								paginatedDocuments.map((doc) => {
									const counterparty = counterparties.find(
										(c) => c.counterparty_id === doc.data.counterparty_id
									);
									const counterpartyType = counterparty?.counterparty_type;

									return (
										<tr
											key={doc.document_id}
											onClick={() => {
												if (doc.status !== "Ожидается согласование") {
													navigate(`/document/${doc.document_id}`);
												}
											}}>
											<td>
												{counterpartyType === "company"
													? doc.data?.titleOfCompanyBuyer ?? "—"
													: doc.data?.buyerFizFio ?? "—"}
											</td>
											<td>{doc.data?.contractNumber ?? "—"}</td>
											<td>{formatDate(doc?.created_at)}</td>
											{showApprovalButton && (
												<td>
													<button
														className="icon-btn"
														onClick={(e) => {
															e.stopPropagation();
															openModal(doc.document_id);
														}}
														title="На согласование">
														<EditIcon size={18} />
													</button>
												</td>
											)}
										</tr>
									);
								})
							)}
						</tbody>
					</Table>

					{totalPages > 1 && !showAll && (
						<div
							style={{
								marginTop: "16px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								gap: "8px",
								flexWrap: "wrap",
							}}>
							<button
								onClick={() => setCurrentPage(1)}
								disabled={currentPage === 1}
								style={{ padding: "6px 10px" }}>
								«
							</button>

							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								style={{ padding: "6px 10px" }}>
								←
							</button>

							{/* Номера страниц с "..." */}
							{Array.from({ length: totalPages }, (_, index) => index + 1)
								.filter((page) => {
									if (page === 1 || page === totalPages) return true;
									if (Math.abs(page - currentPage) <= 2) return true;
									return false;
								})
								.map((pageNumber, idx, arr) => {
									const prevPage = arr[idx - 1];
									const needDots = prevPage && pageNumber - prevPage > 1;
									return (
										<React.Fragment key={pageNumber}>
											{needDots && <span style={{ padding: "6px" }}>...</span>}
											<button
												onClick={() => setCurrentPage(pageNumber)}
												style={{
													padding: "6px 12px",
													backgroundColor: pageNumber === currentPage ? "#458581" : "white",
													color: pageNumber === currentPage ? "white" : "black",
													border: "1px solid #ccc",
													borderRadius: "4px",
													cursor: "pointer",
												}}>
												{pageNumber}
											</button>
										</React.Fragment>
									);
								})}

							<button
								onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
								disabled={currentPage === totalPages}
								style={{ padding: "6px 10px" }}>
								→
							</button>

							<button
								onClick={() => setCurrentPage(totalPages)}
								disabled={currentPage === totalPages}
								style={{ padding: "6px 10px" }}>
								»
							</button>
						</div>
					)}
				</div>

				<div style={{ marginTop: "10px", textAlign: "center" }}>
					<button
						onClick={() => setShowAll((prev) => !prev)}
						style={{
							padding: "8px 16px",
							backgroundColor: showAll ? "#44786c" : "#508682",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}>
						{showAll ? "Скрыть" : "Открыть все"}
					</button>
				</div>

				{showApprovalButton && (
					<DocumentApprovalModal
						showModal={modalOpen}
						onClose={closeModal}
						documentId={selectedDocumentId}
					/>
				)}
			</div>
		</div>
	);
};
