import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Função para realizar o login
export async function doLogin(email, password) {
	try {
		const loginUrl = `${API_URL}/auth/login`; // Corrigido para incluir /login na rota
		const response = await axios.post(loginUrl, { email, password });
		return response.data; // Retorna os dados da resposta
	} catch (error) {
		console.error("Erro ao realizar login:", error);
		throw error; // Propaga o erro para ser tratado onde a função é chamada
	}
}

// Função para realizar o logout
export async function doLogout(token) {
	try {
		const logoutUrl = `${API_URL}/auth/logout`; // Corrigido para incluir /logout na rota
		const headers = { Authorization: `Bearer ${token}` };
		const response = await axios.post(logoutUrl, {}, { headers });
		return response.data; // Retorna os dados da resposta
	} catch (error) {
		console.error("Erro ao realizar logout:", error);
		throw error; // Propaga o erro para ser tratado onde a função é chamada
	}
}

// Função para atualizar o perfil do usuário
export async function updateProfile(token, email, password) {
	try {
		const updateProfileUrl = `${API_URL}/profile`; // Corrigido para incluir /profile na rota
		const headers = { Authorization: `Bearer ${token}` };
		const response = await axios.patch(
			updateProfileUrl,
			{ email, password },
			{ headers }
		);
		return response.data; // Retorna os dados da resposta
	} catch (error) {
		console.error("Erro ao atualizar perfil:", error);
		throw error; // Propaga o erro para ser tratado onde a função é chamada
	}
}
