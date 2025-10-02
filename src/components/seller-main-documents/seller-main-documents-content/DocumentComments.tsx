import React, { useState, useEffect } from "react";
import axios from "axios";

// interface DocumentCommentsProps {
// 	documentId: string;
// }

// const DocumentComments: React.FC<DocumentCommentsProps> = ({ documentId }) => {
// 	const [comments, setComments] = useState<any[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		const fetchComments = async () => {
// 			try {
// 				const response = await axios.get(
// 					`http://localhost:8000/api/comments/?document_id=${documentId}`
// 				);
// 				setComments(response.data);
// 			} catch (error) {
// 				console.error("Ошибка при загрузке комментариев:", error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchComments();
// 	}, [documentId]);

// 	if (isLoading) {
// 		return <div>Загрузка...</div>;
// 	}

// 	return (
// 		<div>
// 			<h4>Комментарии</h4>
// 			{comments.length > 0 ? (
// 				comments.map((comment: any, index: number) => (
// 					<div key={index} className="comment">
// 						<p>
// 							<strong>
// 								{comment.counterparty_name
// 									? "Контрагент: " + comment.counterparty_name
// 									: "Менеджер"}
// 							</strong>
// 						</p>
// 						<p>{comment.comment}</p>
// 						<small>{new Date(comment.created_at).toLocaleString()}</small>
// 					</div>
// 				))
// 			) : (
// 				<p>Комментариев пока нет.</p>
// 			)}
// 		</div>
// 	);
// };

// export default DocumentComments;

interface DocumentCommentsProps {
	documentId: string;
	userRole: string | null; // Передаем роль
}

const DocumentComments: React.FC<DocumentCommentsProps> = ({ documentId, userRole }) => {
	const [comments, setComments] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/comments/?document_id=${documentId}`
				);
				setComments(response.data);
			} catch (error) {
				console.error("Ошибка при загрузке комментариев:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchComments();
	}, [documentId]);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<div>
			<h4
				style={{ letterSpacing: '0.5px', fontSize: '1.1rem',  marginBottom: "0.5rem" }}>Комментарии</h4>
			{comments.length > 0 ? (
				comments.map((comment: any, index: number) => (
					<div key={index} className="comment">
						<p>
							<strong>
								{userRole === "manager"
									? !comment.is_manager
										? "Контрагент: " + comment.counterparty_name
										: "Вы"
									: !comment.is_manager
									? "Вы"
									: "Менеджер"}
							</strong>
						</p>
						<p>{comment.comment}</p>
						<small>{new Date(comment.created_at).toLocaleString()}</small>
					</div>
				))
			) : (
				<p>Комментариев пока нет.</p>
			)}
		</div>
	);
};

export default DocumentComments;
