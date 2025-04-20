import React from 'react';
// import './ViewCounterpartyModal.scss';

interface Props {
  onClose: () => void;
  type: 'individual' | 'company';
  data: { [key: string]: string };
}

const ViewCounterpartyModal: React.FC<Props> = ({ onClose, type, data }) => {
  const fields =
    type === 'individual'
      ? [
          ['fullName', 'ФИО'],
          ['birthDate', 'Дата рождения'],
          ['passportNumber', 'Серия и номер паспорта'],
          ['passportIssueDate', 'Дата выдачи'],
          ['birthPlace', 'Место рождения'],
          ['passportIssuer', 'Кем выдан'],
          ['passportCode', 'Код подразделения'],
          ['address', 'Адрес'],
          ['inn', 'ИНН'],
          ['phone', 'Телефон'],
          ['email', 'Почта'],
        ]
      : [
          ['companyName', 'Наименование'],
          ['directorName', 'ФИО гендиректора'],
          ['legalAddress', 'Юридический адрес'],
          ['bankName', 'Наименование банка'],
          ['account', 'Расчетный счет'],
          ['corpAccount', 'Корпоративный счет'],
          ['innUr', 'ИНН'],
          ['kpp', 'КПП'],
          ['ogrn', 'ОГРН'],
          ['phoneUr', 'Телефон'],
          ['emailUr', 'Почта'],
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
