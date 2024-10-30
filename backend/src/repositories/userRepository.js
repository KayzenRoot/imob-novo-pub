const userModel = require("../models/userModel");

// Função para obter um usuário pelo email
function getUserByEmail(email) {
	return userModel.findOne({ where: { email } });
}

// Função para criar um novo usuário
function createUser(user) {
	return userModel.create(user);
}

// Função para deletar um usuário pelo ID
async function deleteUser(userId) {
	const result = await userModel.destroy({
		where: { id: userId },
	});
	return result; // Retorna o número de registros deletados (0 ou 1)
}

// Função para obter todos os usuários
function getAllUsers() {
	return userModel.findAll(); // Retorna todos os usuários
}

module.exports = {
	getUserByEmail,
	createUser,
	deleteUser,
	getAllUsers,
};
