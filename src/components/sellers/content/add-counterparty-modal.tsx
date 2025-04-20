import { useState } from 'react';
import * as React from "react";


interface Props {
  onClose: () => void;
}

const AddCounterpartyModal: React.FC<Props> = ({ onClose }) => {
  const [type, setType] = useState<'individual' | 'company'>('individual');
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log('Submitted:', formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">Добавление контрагента</h2>

        <div className="modal__radio-group">
          <label>
            <input
              type="radio"
              name="type"
              value="individual"
              checked={type === 'individual'}
              onChange={() => setType('individual')}
            />
            <span>Физическое лицо</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="company"
              checked={type === 'company'}
              onChange={() => setType('company')}
            />
            <span>Юридическое лицо</span>
          </label>
        </div>

        <form className="modal__form">
          {(type === 'individual'
            ? [
                'fullName:ФИО',
                'birthDate:Дата рождения',
                'passportNumber:Серия и номер паспорта',
                'passportIssueDate:Дата выдачи',
                'birthPlace:Место рождения',
                'passportIssuer:Кем выдан',
                'passportCode:Код подразделения',
                'address:Адрес',
                'inn:ИНН',
                'phone:Телефон',
                'email:Почта',
              ]
            : [
                'companyName:Наименование',
                'directorName:ФИО гендиректора',
                'legalAddress:Юридический адрес',
                'bankName:Наименование банка',
                'account:Расчетный счет',
                'corpAccount:Корпоративный счет',
                'innUr:ИНН',
                'kpp:КПП',
                'ogrn:ОГРН',
                'phoneUr:Телефон',
                'emailUr:Почта',
              ]
          ).map((field) => {
            const [name, placeholder] = field.split(':');
            return (
              <input
                key={name}
                name={name}
                placeholder={placeholder}
                type={name.includes('Date') ? 'date' : 'text'}
                onChange={handleChange}
                className="modal__input"
              />
            );
          })}
        </form>

        <div className="modal__buttons">
          <button className="btn btn--secondary" onClick={onClose}>
            Отмена
          </button>
          <button className="btn btn--primary" onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCounterpartyModal;
