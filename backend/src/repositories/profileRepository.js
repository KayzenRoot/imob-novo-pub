const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

function getUser(id) {
	return userModel.findOne({ where: { id } });
}

async function updateUser(id, newUser) {
	const user = await getUser(id);
	if (newUser.password) {
		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(newUser.password, salt);
	}
	return user.update(newUser);
}

async function getUserProperties(userId) {
	const user = await getUser(userId);
	return user.getProperties();
}

module.exports = {
	getUser,
	updateUser,
	getUserProperties,
};
