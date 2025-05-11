import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DocumentCreatorContent } from "../../document-creator/content/content";
import { useNavigate } from "react-router-dom";
import DocumentComments from "./DocumentComments";

export const SellerDocumentView = () => {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [userRole, setUserRole] = useState<string | null>(null);
	const [error, setError] = useState(null);
	const [comment, setComment] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserRole = async () => {
			const token = localStorage.getItem("access");
			try {
				const response = await axios.get("http://localhost:8000/api/userNew/", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUserRole(response.data.role); // Получаем роль пользователя
			} catch (err) {
				console.error("Ошибка получения роли пользователя", err);
			}
		};

		fetchUserRole();
	}, []);
	useEffect(() => {
		const fetchDocument = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/api/documents/${id}/`);
				setData(response.data);
			} catch (err) {
				console.error("Ошибка загрузки документа:", err);
				setError("Ошибка загрузки документа");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchDocument();
		}
	}, [id]);
	const [counterpartyId, setCounterpartyId] = useState(null);

	useEffect(() => {
		const fetchCounterpartyId = async () => {
			try {
				const token = localStorage.getItem("access");
				const response = await axios.get("http://localhost:8000/api/user/", {
					headers: { Authorization: `Bearer ${token}` },
				});

				setCounterpartyId(response.data.counterparty_id); // предполагается, что API возвращает это поле
			} catch (err) {
				console.error("Ошибка получения контрагента:", err);
			}
		};

		fetchCounterpartyId();
	}, []);

	// 	const handleAction = async (status) => {
	// 		const token = localStorage.getItem("access");

	// 		try {
	// 			await axios.post(
	// 				`http://localhost:8000/api/add_comment/`, // <--- сюда, не в /documents/:id/comment/
	// 				{
	// 					comment,
	// 					status, // <--- новый статус
	// 					document_id: id,
	// 					counterparty_id: counterpartyId,
	// 				},
	// 				{
	// 					headers: { Authorization: `Bearer ${token}` },
	// 				}
	// 			);

	// 			alert("Решение отправлено!");
	// 			navigate("/");
	// 		} catch (err) {
	// 			console.error("Ошибка при отправке решения:", err);
	// 			alert("Не удалось отправить решение");
	// 		}
	// 	};

	// 	return (
	// 		<div style={{ backgroundColor: "#c8d3d1" }}>
	// 			<div style={{ marginRight: "340px", padding: "2rem" }}>
	// 				<div style={{ display: "flex", gap: "2rem", margin: "0 2rem", backgroundColor: "#c8d3d1" }}>
	// 					{/* Блок документа */}
	// 					<div
	// 						style={{
	// 							display: "flex",
	// 							flex: 3,
	// 							backgroundColor: "white",
	// 							padding: "5pt 63.7pt 5pt 85.05pt",
	// 							minHeight: "841.9pt",
	// 							borderRadius: "8px",
	// 							boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
	// 							height: "100%",
	// 							paddingTop: "80px",
	// 							marginTop: "20px",
	// 							marginBottom: "50px",
	// 						}}>
	// 						{loading && <p>Загрузка документа...</p>}
	// 						{error && <p>{error}</p>}
	// 						{!loading && data && <DocumentCreatorContent mainFormData={data.data} />}
	// 					</div>
	// 				</div>
	// 				{/* Панель с комментариями и действиями */}
	// 				<div
	// 					style={{
	// 						position: "fixed",
	// 						right: "2rem",
	// 						top: "100px",
	// 						width: "300px",
	// 						backgroundColor: "white",
	// 						height: "80%",
	// 						paddingBottom: "20px",
	// 						padding: "1rem",
	// 						border: "1px solid #ccc",
	// 						borderRadius: "8px",
	// 						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
	// 						zIndex: 1000,
	// 					}}>
	// 					<h3>Действия</h3>
	// 					<textarea
	// 						value={comment}
	// 						onChange={(e) => setComment(e.target.value)}
	// 						placeholder="Комментарий (необязательно)"
	// 						rows={6}
	// 						style={{
	// 							width: "100%",
	// 							marginBottom: "1rem",
	// 							padding: "0.5rem",
	// 							borderRadius: "8px",
	// 							border: "1px solid #ccc",
	// 							resize: "vertical",
	// 						}}
	// 					/>
	// 					<div>
	// 						<button
	// 							onClick={() => handleAction("Согласован")}
	// 							style={{
	// 								marginRight: "1rem",
	// 								padding: "0.5rem 1rem",
	// 								backgroundColor: "#5c9b9f",
	// 								color: "white",
	// 								borderRadius: "8px",
	// 								border: "none",
	// 							}}>
	// 							Согласовать
	// 						</button>
	// 						<button
	// 							onClick={() => handleAction("Не согласован")}
	// 							style={{
	// 								padding: "0.5rem 1rem",
	// 								backgroundColor: "#7f8f8c",
	// 								color: "white",
	// 								borderRadius: "8px",
	// 								border: "none",
	// 							}}>
	// 							Отклонить
	// 						</button>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// };

	const handleAction = async (status: string) => {
		const token = localStorage.getItem("access");

		try {
			await axios.post(
				`http://localhost:8000/api/add_comment/`, // <--- сюда, не в /documents/:id/comment/
				{
					comment,
					status, // <--- новый статус
					document_id: Number(id),
					is_manager: false,
					counterparty_id: counterpartyId,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			alert("Решение отправлено!");
			navigate("/");
		} catch (err) {
			console.error("Ошибка при отправке решения:", err);
			alert("Не удалось отправить решение");
		}
	};

	return (
		<div style={{ backgroundColor: "#c8d3d1" }}>
			<div style={{ marginRight: "340px", padding: "2rem" }}>
				<div style={{ display: "flex", gap: "2rem", margin: "0 2rem", backgroundColor: "#c8d3d1" }}>
					{/* Блок документа */}
					<div
						style={{
							display: "flex",
							flex: 3,
							backgroundColor: "white",
							padding: "5pt 63.7pt 5pt 85.05pt",
							minHeight: "841.9pt",
							borderRadius: "8px",
							boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
							height: "100%",
							paddingTop: "80px",
							marginTop: "20px",
							marginBottom: "50px",
						}}>
						{loading && <p>Загрузка документа...</p>}
						{error && <p>{error}</p>}
						{!loading && data && <DocumentCreatorContent mainFormData={data.data} />}
					</div>
				</div>

				{/* Панель с комментариями и действиями */}
				<div
					style={{
						position: "fixed",
						right: "2rem",
						top: "100px",
						width: "300px",
						backgroundColor: "white",
						height: "80%",
						paddingBottom: "20px",
						padding: "1rem",
						border: "1px solid #ccc",
						borderRadius: "8px",
						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
						zIndex: 1000,
					}}>
					<h3>Действия</h3>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Комментарий (необязательно)"
						rows={6}
						style={{
							width: "100%",
							marginBottom: "1rem",
							padding: "0.5rem",
							borderRadius: "8px",
							border: "1px solid #ccc",
							resize: "vertical",
						}}
					/>
					<div>
						<button
							onClick={() => handleAction("Согласован")}
							style={{
								marginRight: "1rem",
								padding: "0.5rem 1rem",
								backgroundColor: "#5c9b9f",
								color: "white",
								borderRadius: "8px",
								border: "none",
							}}>
							Согласовать
						</button>
						<button
							onClick={() => handleAction("Не согласован")}
							style={{
								padding: "0.5rem 1rem",
								backgroundColor: "#7f8f8c",
								color: "white",
								borderRadius: "8px",
								border: "none",
							}}>
							Отклонить
						</button>
					</div>
					<div
						style={{
							marginTop: "20px",
							backgroundColor: "white",
							padding: "1rem",
							borderRadius: "8px",
							// boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
						}}>
						<DocumentComments documentId={id} userRole={userRole} />{" "}
						{/* Добавляем компонент для отображения комментариев */}
					</div>
				</div>

				{/* Комментарии */}
			</div>
		</div>
	);
};
