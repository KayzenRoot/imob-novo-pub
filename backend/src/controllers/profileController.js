const profileRepository = require("../repositories/profileRepository");

async function getUser(req, res, next) {
	if (!res.locals.user) {
		return res.status(403).json({ message: "Usuário não autenticado." });
	}

	const userId = res.locals.user.id; // Atualização para usar `res.locals.user`
	const user = await profileRepository.getUser(userId);
	res.json(user);
}

async function updateUser(req, res, next) {
	if (!res.locals.user) {
		return res.status(403).json({ message: "Usuário não autenticado." });
	}

	const id = res.locals.user.id; // Atualização para usar `res.locals.user`
	const newUser = req.body;

	await profileRepository.updateUser(id, newUser);
	res.sendStatus(200);
}

async function getUserProperties(req, res, next) {
	if (!res.locals.user) {
		return res.status(403).json({ message: "Usuário não autenticado." });
	}

	const userId = res.locals.user.id; // Atualização para usar `res.locals.user`
	const properties = await profileRepository.getUserProperties(userId);
	res.json(properties);
}

async function getAllProperties(req, res, next) {
	const properties = await profileRepository.getAllProperties();
	res.json(properties);
}

module.exports = {
	getUser,
	updateUser,
	getUserProperties,
	getAllProperties,
};
