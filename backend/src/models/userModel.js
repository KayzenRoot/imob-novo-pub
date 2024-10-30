const Sequelize = require("sequelize");
const db = require("../db");

const Users = db.define(
	"users",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false, // De acordo com a migration
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false, // De acordo com a migration
			unique: true, // O email deve ser único
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false, // De acordo com a migration
		},
		creci: {
			type: Sequelize.STRING,
			allowNull: true, // Poderia ser obrigatório dependendo das regras
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: true, // Opcional
		},
		street: {
			type: Sequelize.STRING,
			allowNull: true, // Opcional
		},
		city: {
			type: Sequelize.STRING,
			allowNull: true, // Opcional
		},
		state: {
			type: Sequelize.STRING,
			allowNull: true, // Opcional
		},
		zip: {
			type: Sequelize.STRING,
			allowNull: true, // Opcional
		},
		number: {
			type: Sequelize.STRING,
			allowNull: true, // Opcional
		},
		neighborhood: {
			type: Sequelize.STRING,
			allowNull: true, // Opcional
		},
		birthdate: {
			type: Sequelize.DATE,
			allowNull: true, // Opcional
		},
	},
	{
		timestamps: true, // Habilitar o gerenciamento automático de createdAt e updatedAt
	}
);

module.exports = Users;
