import * as React from "react";

export const ItemListData = ({ handleChange, mainFormData, setMainFormData }) => {
	// Добавление нового товара
	const addProduct = () => {
		setMainFormData({
			...mainFormData,
			products: [
				...mainFormData.products,
				{ id: Date.now(), name_: "", quantity_: 1, price_: " " },
			],
		});
	};

	// Удаление товара по id
	const removeProduct = (id: number) => {
		setMainFormData({
			...mainFormData,
			products: mainFormData.products.filter((product) => product.id !== id),
		});
	};

	const handleChangeProduct = (id, field, value) => {
		setMainFormData({
			...mainFormData,
			products: mainFormData.products.map((product) =>
				product.id === id ? { ...product, [field]: value } : product
			),
		});
	};

	const handleCheckboxChangeNds = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		if (name === "nds") setMainFormData({ ...mainFormData, ndsState: checked });
	};

	return (
		<div className="formContainer">
			{/* */}

			<div className="dropdown-container-itemlist">
				<button
					className={`dropdown-button-item ${mainFormData.isOpenItemsList ? "rotated" : ""}`}
					onClick={() => setMainFormData({ ...mainFormData, isOpenItemsList: true })}></button>
			</div>
			{mainFormData.isOpenItemsList && (
				<>
					{mainFormData.products.map((product) => (
						<div key={product.id}>
							<button className="remove-button" onClick={() => removeProduct(product.id)}>
								✖
							</button>
							<label>Наименование</label>
							<input
								type="text"
								name={`name_${product.id}`}
								value={product.name_}
								onChange={(e) => handleChangeProduct(product.id, "name_", e.target.value)}
								placeholder="Введите наименование"
							/>
							<label>Количество</label>
							<input
								type="number"
								name={`quantity_${product.id}`}
								value={product.quantity_}
								onChange={(e) => handleChangeProduct(product.id, "quantity_", e.target.value)}
								placeholder="Введите количество"
							/>
							<label>Цена</label>
							<input
								type="number"
								name={`price_${product.id}`}
								value={product.price_}
								onChange={(e) => handleChangeProduct(product.id, "price_", e.target.value)}
								placeholder="Введите цену"
							/>
						</div>
					))}

					{/* Кнопка добавления нового товара всегда внизу */}
					<button className="add-button" onClick={addProduct}>
						✚ Добавить
					</button>
				</>
			)}

			<div className="checkbox">
				<label>
					<input
						type="checkbox"
						name="nds"
						checked={mainFormData.ndsState}
						onChange={handleCheckboxChangeNds}
					/>
					<span className="checkmark">Цена с НДС</span>
				</label>
			</div>
			{mainFormData.ndsState && (
				<>
					<label>Процент НДС</label>
					<input
						type="number"
						name="ndsPercent"
						value={mainFormData.ndsPercent}
						onChange={handleChange}
					/>
				</>
			)}
		</div>
	);
};
