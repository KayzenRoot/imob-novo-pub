"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Criando tabela de usuários
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			creci: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			street: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			city: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			state: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			zip: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			number: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			neighborhood: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			birthdate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	async down(queryInterface) {
		// Removendo tabela de usuários
		await queryInterface.dropTable("users");
	},
};
