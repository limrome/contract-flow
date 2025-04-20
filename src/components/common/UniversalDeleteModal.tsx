import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ModalContext } from "../modal/ModalContext/ModalContext";

const UniversalDeleteModal = ({ title = "объект", deleteFunc, id, loading, goBack = false }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { handleModal, modal } = useContext(ModalContext) as any;
	useEffect(() => {
		if (loading === 2) {
			dispatch({ type: "HIDE_LOADER" });
			if (goBack) {
				navigate(-1);
			}
			handleModal();
		}
	}, [loading, modal]);

	const handleDeleteClick = () => {
		if (!loading) {
			deleteFunc(id);
			// handleModal();
		}
	};
	return (
		<>
			<div className="add-category-wrapper">
				<div className="modal-field-title">Удалить {title}?</div>
				<div className="modal-field-close" onClick={() => handleModal()}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M4.70701 3.29304L3.99991 2.58594L2.58569 4.00015L3.2928 4.70726L10.5857 12.0002L3.2928 19.293L2.58569 20.0002L3.99991 21.4144L4.70701 20.7073L11.9999 13.4144L19.2928 20.7073L19.9999 21.4144L21.4141 20.0002L20.707 19.293L13.4141 12.0002L20.707 4.70726L21.4141 4.00015L19.9999 2.58594L19.2928 3.29304L11.9999 10.5859L4.70701 3.29304Z"
							fill="#212121"
						></path>
					</svg>
				</div>
				<div className="modal-buttons delete">
					<button className="button action-button border-button" onClick={() => handleModal()}>
						<span>Отменить</span>
					</button>
					<button
						className={`button action-button create-category-button ${loading === 1 ? "preloader" : ""
							}`}
						onClick={() => handleDeleteClick()}
					>
						<span>Удалить</span>
					</button>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.loadingStatus.loading,
	};
};

export default connect(mapStateToProps, null)(UniversalDeleteModal);
