import * as React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./ModalContext/ModalContext";
import "./modal.scss";
// вызов hanldeModal без аргументов инциирует вызов данной функции со значением по умолчанию
// Данный финт используется для закрытия модального окна

const Modal = () => {
    const modalRoot = document.querySelector('#modal-root');
    let { modalContent, handleModal, modal } = React.useContext(ModalContext); // пользуемся деструктуризацией

    const handleModalClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (event.target === document.getElementById('mainModalWrap')) {
            handleModal();
        }
    }
    // проверка на активность модального окна
    if (modal && modalRoot !== null) {
        // модальное окно примитивное и главной целью было показать навыки использования возможностей react'a
        return ReactDOM.createPortal(
            <div
                className="main-modal" onClick={(e) => handleModalClick(e)} id='mainModalWrap'>
                <div className="modal-content" id="modalContent">
                    {/* содержимое модального окна */}
                    {modalContent}
                </div>
            </div>,
            // обращаемся к корневому блоку, делая модальное окно глобальным
            // В index.html так же не забываем указать блок с указанным идентификатором
            modalRoot
        );
    } else return null;
};


export default Modal;