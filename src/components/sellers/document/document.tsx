import React, { useEffect, useState } from "react";
import { DocumentCreatorContent } from "../../document-creator/content/content";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DocumentComments from "../../seller-main-documents/seller-main-documents-content/DocumentComments";
import { DocumentCreatorSidebar } from "../../document-creator/sidebar/sidebar";
import "./document.scss";

export const Document = () => {
	const { id } = useParams();
	const [mainFormData, setMainFormData] = useState(null);

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [comment, setComment] = useState("");
	const [editable, setEditable] = useState(false);

	const [error, setError] = useState(null);
	const [userRole, setUserRole] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserRole = async () => {
			const token = localStorage.getItem("access");
			try {
				const response = await axios.get("http://localhost:8000/api/userNew/", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUserRole(response.data.role);
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
				setMainFormData(response.data.data);
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

	const handleAction = async (status: string) => {
		const token = localStorage.getItem("access");

		try {
			await axios.post(
				`http://localhost:8000/api/add_comment/`,
				{
					comment,
					status,
					document_id: Number(id),
					is_manager: false,
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
	const handleSave = async () => {
		const token = localStorage.getItem("access");
		try {
			await axios.put(
				`http://localhost:8000/api/documents/${id}/`,
				{
					data: mainFormData, // отправляем именно это
					document_type: mainFormData.document_type || "contract", // или взять из формы
					status: mainFormData.status || "Ожидается согласование",
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			alert("Документ сохранён!");
		} catch (err) {
			console.error("Ошибка при сохранении документа:", err);
			alert("Не удалось сохранить документ.");
		}
	};

	return (
		<div className="document-layout">
			<div className="document-body">
				{loading && <p>Загрузка документа...</p>}
				{error && <p>{error}</p>}
				{!loading && data && (
					<DocumentCreatorContent
						// mainFormData={editable ? mainFormData : data.data}
						mainFormData={mainFormData || data?.data}
						setMainFormData={editable ? setMainFormData : undefined}
						editable={editable}
					/>
				)}
			</div>

			{editable && mainFormData && (
				<div className="document-sidebar">
					<DocumentCreatorSidebar
						mainFormData={mainFormData}
						setMainFormData={setMainFormData}
						isEditMode={true}
						documentId={id}
					/>
				</div>
			)}

			{data?.status !== "Согласован" && (
				<div className="document-actions">
					<h2 style={{ letterSpacing: "0.5px", fontSize: "2rem", marginBottom: "0.5rem" }}>
						Действия
					</h2>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Комментарий (необязательно)"
						rows={6}
					/>
					<div className="action-buttons">
						<button onClick={() => handleAction("Согласован")} style={{ letterSpacing: "0.5px" }}>
							Отправить
						</button>
						<button onClick={() => handleAction("Не согласован")}>Отклонить</button>
						<button onClick={() => setEditable(true)}>Редактировать</button>
						{editable && <button onClick={handleSave}>Сохранить</button>}
					</div>
					<div className="document-comments">
						<DocumentComments documentId={id} userRole={userRole} />
					</div>
				</div>
			)}
		</div>
	);
};
