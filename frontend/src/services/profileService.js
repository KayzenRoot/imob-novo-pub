import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function getProfile(token) {
	const profileUrl = `${API_URL}/profile`;
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	try {
		const response = await axios.get(profileUrl, { headers });
		return response.data; // Retornando os dados da resposta
	} catch (error) {
		// Log do erro para depuração
		console.error("Erro ao buscar perfil:", error);
		// Lança o erro para ser tratado onde a função é chamada
		throw error;
	}
}

export async function updateProfile(token, profile) {
	const profileUrl = `${API_URL}/profile`;
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	const response = await axios.patch(profileUrl, profile, { headers });
	return response.data; // Retornando os dados da resposta
}

export async function getUserListings(userId, token) {
	const propertiesUrl = `${API_URL}/properties/${userId}`;
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	try {
		const response = await axios.get(propertiesUrl, { headers });
		return response.data; // Retornando os dados da resposta
	} catch (error) {
		// Log do erro para depuração
		console.error("Erro ao buscar propriedades do usuário:", error);
		// Lança o erro para ser tratado onde a função é chamada
		throw error;
	}
}

export const createUser = async (userData) => {
	const createUserUrl = `${API_URL}/profile`;

	const token = localStorage.getItem("token"); // Aqui buscamos o token do localStorage
	const config = {
		headers: {
			Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
		},
	};

	const response = await axios.post(createUserUrl, userData, config);
	return response.data;
};
