import * as React from "react";
import { DeliveryData } from "./delivery-data";

export const BasicInformation = ({ handleChange, mainFormData, setMainFormData }) => {
	const cities = [
		"Москва",
		"Санкт-Петербург",
		"Новосибирск",
		"Екатеринбург",
		"Нижний Новгород",
		"Самара",
	];
	return (
		<>
			<div className="formContainer">
				{/* Поля КП */}
				{mainFormData.isKp && (
					<>
						<label>Номер КП</label>
						<input className="input_text"
							type="text"
							name="kpNumber"
							value={mainFormData.kpNumber}
							onChange={handleChange}
							placeholder="Введите номер КП"
						/>

						<label>Дата КП</label>
						<input className="input_text" type="date" name="kpDate" value={mainFormData.kpDate} onChange={handleChange} />
					</>
				)}

				{/* Поля ДКП */}
				{mainFormData.isDkp && (
					<>
						<label>Номер договора</label>
						<input className="input_text"
							type="text"
							name="contractNumber"
							value={mainFormData.contractNumber}
							onChange={handleChange}
							placeholder="Пример: 345"
						/>

						<label>Дата договора</label>
						<input className="input_text"
							type="date"
							name="contractDate"
							value={mainFormData.contractDate}
							onChange={handleChange}
						/>

						<label>
							<input className="input_text"
								type="checkbox"
								name="chooseFromList"
								checked={mainFormData.chooseFromList}
								onChange={handleChange}
							/>
							Выбрать город из списка
						</label>

						<label>Город</label>
						{mainFormData.chooseFromList ? (
							<select
								name="city"
								value={mainFormData.city}
								onChange={handleChange}
								className="select">
								<option value="">Выберите город</option>
								{cities.map((city) => (
									<option key={city} value={city}>
										{city}
									</option>
								))}
							</select>
						) : (
							<input className="input_text"
								type="text"
								name="city"
								value={mainFormData.city}
								onChange={handleChange}
								placeholder="Пример: Барнаул"
							/>
						)}
					</>
				)}

				<DeliveryData mainFormData={mainFormData} setMainFormData={setMainFormData} />
			</div>
		</>
	);
};
