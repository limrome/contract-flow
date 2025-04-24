import axios from "axios";

// Функция для загрузки контрагентов с бэка
export const fetchCounterparties = async () => {
	const response = await axios.get("http://localhost:8000/api/counterparties/");
	return response.data;
};