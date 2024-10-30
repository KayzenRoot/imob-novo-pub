"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("properties", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			salesPrice: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			rentPrice: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			category: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			typeOfProperty: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			zip: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			street: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			neighborhood: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			state: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			bedrooms: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			suites: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			livingRooms: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			bathrooms: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			parkingSpaces: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			totalArea: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			builtArea: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			constructionYear: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			isRental: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			isSale: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			isCondominium: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			condominiumFee: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			iptu: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			imageUrls: {
				type: Sequelize.JSON, // Para armazenar múltiplas URLs
				allowNull: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
				onUpdate: Sequelize.NOW,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("properties");
	},
};
