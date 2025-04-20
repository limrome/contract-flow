import * as React from "react";

export const PassportData = ({ handleChange, mainFormData, setMainFormData }) => {
	return (
		<div className="formContainer1">
			<label>Серия</label>
			<input
				type="text"
				name="seriess"
				value={mainFormData.seriess}
				onChange={handleChange}
				placeholder="Пример: 3317"
			/>

			<label>Номер</label>
			<input
				type="text"
				name="number"
				value={mainFormData.number}
				onChange={handleChange}
				placeholder="Пример: 331715"
			/>

			<label>Дата выдачи</label>
			<input type="date" name="gavenDate" value={mainFormData.gavenDate} onChange={handleChange} />

			<label>Место рождения</label>
			<input
				type="text"
				name="placeOfBirth"
				value={mainFormData.placeOfBirth}
				onChange={handleChange}
				placeholder="Пример: г.Казань"
			/>

			<label>Кем выдан</label>
			<input
				type="text"
				name="whoIssued"
				value={mainFormData.whoIssued}
				onChange={handleChange}
				placeholder="Пример: МВД по Республике..."
			/>

			<label>Код подразделения</label>
			<input
				type="text"
				name="code"
				value={mainFormData.code}
				onChange={handleChange}
				placeholder="Пример: 018-558"
			/>

			<label>Адрес</label>
			<input type="text" name="address" value={mainFormData.address} onChange={handleChange} />
		</div>
	);
};
