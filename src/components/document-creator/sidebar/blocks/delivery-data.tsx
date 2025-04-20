import * as React from "react";

export const DeliveryData = ({ mainFormData, setMainFormData }) => {

	return (
		<>
			{/* Поля поставки (отображаются всегда, если выбраны КП или ДКП) */}
			<label>Поставка</label>
			<div className="radioGroup">
				<label>
					<input
						type="radio"
						name="products"
						value="products"
						checked={mainFormData.delivery === "products"}
						onChange={() => setMainFormData({ ...mainFormData, delivery: "products" }) }
					/>
					товаров
				</label>
				<label>
					<input
						type="radio"
						name="services"
						value="services"
						checked={mainFormData.delivery === "services"}
						onChange={() => setMainFormData({ ...mainFormData, delivery: "services" })}
					/>
					услуг
				</label>
				<label>
					<input
						type="radio"
						name="productsServices"
						value="productsServices"
						checked={mainFormData.delivery === "productsServices"}
						onChange={() => setMainFormData({ ...mainFormData, delivery: "productsServices"})}
					/>
					товаров и услуг
				</label>
			</div>
		</>
	);
};
