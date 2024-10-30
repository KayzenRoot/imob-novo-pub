const Blog = require("../models/blogModel");

async function createBlog(blog) {
	return await Blog.create(blog);
}

async function updateBlog(blog) {
	return await Blog.update(blog, { where: { id: blog.id } });
}

async function deleteBlog(id) {
	return await Blog.destroy({ where: { id } });
}

async function getBlog(id) {
	return await Blog.findOne({ where: { id } });
}

module.exports = {
	createBlog,
	updateBlog,
	deleteBlog,
	getBlog,
};
