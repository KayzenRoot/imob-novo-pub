"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("users", [
			{
				name: "Clayton Nunes",
				email: "csn1985@gmail.com",
				password: bcrypt.hashSync("cdxsza987"), // Senha criptografada
				creci: "162520-F",
				phone: "19971715658",
				street: "Rua Plampona",
				city: "Indaiatuba",
				state: "SP",
				zip: "13335240",
				number: "73",
				neighborhood: "Jd Valença",
				birthdate: new Date("1985-07-05"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", { email: "csn1985@gmail.com" }, {});
	},
};
