import axios from "axios";

const API_URL = "http://localhost:8000/api/counterparties/";

export const fetchCounterparties = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error("Ошибка при получении контрагентов", error);
		return [];
	}
};
