require("dotenv").config();

// Configurações comuns do banco de dados
const commonConfig = {
	username: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	logging: process.env.DB_LOGS === "true",
};

// Exportando configurações para diferentes ambientes
module.exports = {
	development: commonConfig,
	test: commonConfig,
	production: {
		...commonConfig,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
