import React from 'react';
// import './ViewCounterpartyModal.scss';

interface Props {
  onClose: () => void;
  type: 'individual' | 'company';
  data: { [key: string]: string };
}

const ViewCounterpartyModal: React.FC<Props> = ({ onClose, type, data }) => {
  const fields =
    type === "individual"
      ? [
          ["full_name", "ФИО"],
          ["birth_date", "Дата рождения"],
          ["passport_number", "Серия и номер паспорта"],
          ["issue_date", "Дата выдачи"],
          ["birth_place", "Место рождения"],
          ["issued_by", "Кем выдан"],
          ["passport_code", "Код подразделения"],
          ["address", "Адрес"],
          ["inn", "ИНН"],
          ["phone", "Телефон"],
          ["email", "Почта"],
        ]
      : [
          ["full_name", "Наименование компании"],
          ["director_name", "ФИО гендиректора"],
          ["legal_address", "Юридический адрес"],
          ["bank_name", "Банк"],
          ["account", "Расчетный счёт"],
          ["corp_account", "Корпоративный счёт"],
          ["inn", "ИНН"],
          ["kpp", "КПП"],
          ["ogrn", "ОГРН"],
          ["phone", "Телефон"],
          ["email", "Почта"],
        ];

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>×</button>
        <h2 className="modal__title">Карточка контрагента</h2>

        <div className="modal__form">
          {fields.map(([key, label]) => (
            <div className="modal__field" key={key}>
              <label>{label}</label>
              <input value={data[key] || ''} readOnly />
            </div>
          ))}
        </div>

        <div className="modal__buttons">
          <button className="btn btn--secondary" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCounterpartyModal;
