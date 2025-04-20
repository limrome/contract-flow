import * as React from "react";
import { useState } from "react";

import { BasicInformation } from "./blocks/basic-information";
import { SidesData } from "./blocks/sides-data";
import { ItemListData } from "./blocks/item-list-data";
import { RightsObligations } from "./blocks/rights-and-obligations";

export const DocumentCreatorSidebar = ({ setMainFormData, mainFormData }) => {
	/* Основная информация */
	const [isOpen, setIsOpen] = useState(true);

	/* Стороны */
	const [isOpenSides, setIsOpenSides] = useState(true);

	/* Товары и услуги */
	const [isOpenItems, setIsOpenItems] = useState(false);

	/* Права и обязанности */
	const [isOpenObligations, setIsOpenObligations] = useState(true);

	/* Обработчик изменения состояния чекбоксов */
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		if (name === "kp") setMainFormData({ ...mainFormData, isKp: checked });
		if (name === "dkp") setMainFormData({ ...mainFormData, isDkp: checked });
	};

	console.log(mainFormData);

	/* Обработчик изменения состояния полей */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type, checked } = e.target;
		setMainFormData({
			...mainFormData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	return (
		<div className="sidebar">
			<div className="checkbox">
				{/* <label>
					<input
						type="checkbox"
						name="kp"
						checked={mainFormData.isKp}
						onChange={handleCheckboxChange}
					/>
					<span className="checkmark">КП</span>
				</label> */}

				{/* <div className="new-string"></div>

				<label>
					<input
						type="checkbox"
						name="dkp"
						checked={mainFormData.isDkp}
						onChange={handleCheckboxChange}
					/>
					<span className="checkmark">ДКП</span>
				</label> */}

				{/* Показываем кнопку, если выбраны КП или ДКП */}
				{(mainFormData.isKp || mainFormData.isDkp) && (
					<div className="dropdown-container">
						<button
							className={`dropdown-button ${isOpen ? "rotated" : ""}`}
							onClick={() => setIsOpen(!isOpen)}>
							<span className="rz-text-subtitle">Основная информация</span>
						</button>
						{/* Форма (Основная информация) отображается, если блок открыт */}
						{isOpen && (
							<BasicInformation
								handleChange={handleChange}
								mainFormData={mainFormData}
								setMainFormData={setMainFormData}
							/>
						)}
					</div>
				)}
			</div>

			{/* Показываем кнопку, если выбраны КП или ДКП */}
			{(mainFormData.isKp || mainFormData.isDkp) && (
				<div className="dropdown-container-sides">
					<button
						className={`dropdown-button ${isOpenSides ? "rotated" : ""}`}
						onClick={() => setIsOpenSides(!isOpenSides)}>
						<span className="rz-text-subtitle2">Стороны</span>
					</button>

					{/* Форма отображается, если блок открыт */}
					{isOpenSides && (
						<SidesData
							handleChange={handleChange}
							mainFormData={mainFormData}
							setMainFormData={setMainFormData}
						/>
					)}
				</div>
			)}

			{/* Показываем кнопку, если выбраны КП или ДКП */}
			{(mainFormData.isKp || mainFormData.isDkp) && (
				<div className="dropdown-container-items">
					<button
						className={`dropdown-button ${isOpenItems ? "rotated" : ""}`}
						onClick={() => setIsOpenItems(!isOpenItems)}>
						<span className="rz-text-subtitle2">Товары/Услуги</span>
					</button>

					{/* Форма отображается, если блок открыт */}
					{isOpenItems && (
						<ItemListData
							handleChange={handleChange}
							mainFormData={mainFormData}
							setMainFormData={setMainFormData}
						/>
					)}
				</div>
			)}

			{/* Показываем кнопку, если выбраны КП или ДКП */}
			{(mainFormData.isKp || mainFormData.isDkp) && (
				<div className="dropdown-container-obligations">
					<button
						className={`dropdown-button ${isOpenObligations ? "rotated" : ""}`}
						onClick={() => setIsOpenObligations(!isOpenObligations)}>
						<span className="rz-text-subtitle2">2. Права и обязанности сторон</span>
					</button>

					{/* Форма отображается, если блок открыт */}
					{isOpenObligations && (
						<RightsObligations
							handleChange={handleChange}
							mainFormData={mainFormData}
							setMainFormData={setMainFormData}
						/>
					)}
				</div>
			)}
		</div>
	);
};
