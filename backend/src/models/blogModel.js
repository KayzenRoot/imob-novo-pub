const Sequelize = require("sequelize");
const db = require("../db");

const Blog = db.define("blog", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	postImage: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	readingTime: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	tags: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

module.exports = Blog;
