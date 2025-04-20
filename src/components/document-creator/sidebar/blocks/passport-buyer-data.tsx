import * as React from "react";

export const PassportBuyerData = ({ handleChange, mainFormData, setMainFormData }) => {
    return (
        <div className="formContainer1">
            <label>Серия</label>
            <input type="text" name="seriesBuyer" value={mainFormData.seriesBuyer} onChange={handleChange} placeholder="Пример: 3317" />

            <label>Номер</label>
            <input type="text" name="numberBuyer" value={mainFormData.numberBuyer} onChange={handleChange} placeholder="Пример: 331715" />

            <label>Дата выдачи</label>
            <input type="date" name="gavenDateBuyer" value={mainFormData.gavenDateBuyer} onChange={handleChange} />

            <label>Место рождения</label>
            <input type="text" name="placeOfBirthBuyer" value={mainFormData.placeOfBirthBuyer} onChange={handleChange} placeholder="Пример: г.Казань" />

            <label>Кем выдан</label>
            <input type="text" name="whoIssuedBuyer" value={mainFormData.whoIssuedBuyer} onChange={handleChange} placeholder="Пример: МВД по Республике..." />

            <label>Код подразделения</label>
            <input type="text" name="codeBuyer" value={mainFormData.codeBuyer} onChange={handleChange} placeholder="Пример: 018-558" />

            <label>Адрес</label>
            <input type="text" name="addressBuyer" value={mainFormData.addressBuyer} onChange={handleChange}  />
        </div>
    );
};
