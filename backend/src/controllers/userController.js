const userRepository = require("../repositories/userRepository");

// Função para criar um novo usuário
async function newUser(req, res, next) {
	try {
		const userData = req.body;
		const newUser = await userRepository.createUser(userData);
		res.status(201).json(newUser);
	} catch (error) {
		console.error("Erro ao criar usuário:", error.message);
		res.status(500).json({ error: "Erro interno do servidor." });
		next(error);
	}
}

// Função para deletar um usuário
async function deleteUser(req, res, next) {
	try {
		const userId = req.params.id; // ID do usuário a ser deletado
		const result = await userRepository.deleteUser(userId); // Chamada ao repositório para deletar

		if (result) {
			res.status(204).send(); // Sucesso sem conteúdo (No Content)
		} else {
			res.status(404).json({ error: "Usuário não encontrado." }); // Caso o usuário não exista
		}
	} catch (error) {
		console.error("Erro ao deletar usuário:", error.message);
		res.status(500).json({ error: "Erro interno do servidor." });
		next(error);
	}
}

// Função para obter todos os usuários
async function getAllUsers(req, res, next) {
	try {
		const users = await userRepository.getAllUsers(); // Chamada ao repositório para obter todos os usuários
		res.status(200).json(users); // Retorna todos os usuários
	} catch (error) {
		console.error("Erro ao buscar usuários:", error.message);
		res.status(500).json({ error: "Erro interno do servidor." });
		next(error);
	}
}

module.exports = {
	newUser,
	deleteUser,
	getAllUsers,
};
