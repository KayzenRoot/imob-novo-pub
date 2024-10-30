"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		// Adicionando índice único na tabela de usuários
		await queryInterface.addIndex("users", ["email", "creci"], {
			name: "users_emails_crecis_index",
			unique: true,
		});
	},

	async down(queryInterface) {
		// Removendo índice único na tabela de usuários
		await queryInterface.removeIndex("users", "users_emails_crecis_index");
	},
};
