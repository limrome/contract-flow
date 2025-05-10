import * as React from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import DocumentSearch from "./document-search";
import { useNavigate } from "react-router-dom";
import { RiMailSendFill } from "react-icons/ri";
import DocumentApprovalModal from "./document-approval-modal";
import { useEffect } from "react";
import axios from "axios";

const EditIcon = RiMailSendFill as React.FC<{ size?: number }>;

export const DocumentCreatorMainContent = ({ mainFormData }) => {
	const [documents, setDocuments] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const response = await axios.get("http://localhost:8000/api/documents/");
				setDocuments(response.data);
			} catch (error) {
				console.error("Ошибка при загрузке документов:", error);
			}
		};

		fetchDocuments();
	}, []);

	const openModal = (documentId: string) => {
		setSelectedDocumentId(documentId);
		setModalOpen(true);
	};
	const closeModal = () => setModalOpen(false);

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
					return true; // "allDocuments"
			}
		});

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
							{filteredDocuments.length === 0 ? (
								<tr>
									<td colSpan={4}>Документы не найдены или произошла ошибка загрузки.</td>
								</tr>
							) : (
								filteredDocuments.map((doc) => {
									const counterparty = counterparties.find(
										(c) => c.counterparty_id === doc.data.counterparty_id
									);
									const counterpartyType = counterparty?.counterparty_type;

									return (
										<tr
											key={doc.document_id}
											onClick={() => navigate(`/document/${doc.document_id}`)}>
											<td>
												{console.log("doc:", doc)}
												{console.log("Тип контрагента:", counterpartyType)}

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
