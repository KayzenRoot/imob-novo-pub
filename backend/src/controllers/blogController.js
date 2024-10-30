const blogRepository = require("../repositories/blogRepository");

async function createBlog(req, res, next) {
	const blogData = req.body;

	try {
		const newBlog = await blogRepository.createBlog(blogData);
		res.status(201).json({ message: "Blog criado com sucesso", blog: newBlog });
	} catch (error) {
		console.error("Erro ao criar blog:", error);
		res.status(500).json({ message: "Erro ao criar blog." });
	}
}

async function updateBlog(req, res, next) {
	const blogId = req.params.id; // ID do blog a ser atualizado
	const blogData = req.body;

	try {
		const existingBlog = await blogRepository.getBlog(blogId);
		if (!existingBlog) {
			return res.status(404).json({ message: "Blog não encontrado." });
		}

		await blogRepository.updateBlog({ ...blogData, id: blogId });
		const updatedBlog = await blogRepository.getBlog(blogId);

		res.status(200).json({ message: "Blog atualizado com sucesso", blog: updatedBlog });
	} catch (error) {
		console.error("Erro ao atualizar blog:", error);
		res.status(500).json({ message: "Erro ao atualizar blog." });
	}
}

async function deleteBlog(req, res, next) {
	const blogId = req.params.id; // ID do blog a ser deletado

	try {
		const deletedRows = await blogRepository.deleteBlog(blogId);
		if (deletedRows === 0) {
			return res.status(404).json({ message: "Blog não encontrado." });
		}

		res.status(204).end(); // Resposta sem conteúdo
	} catch (error) {
		console.error("Erro ao deletar blog:", error);
		res.status(500).json({ message: "Erro ao deletar blog." });
	}
}

async function getBlog(req, res, next) {
	const blogId = req.params.id; // ID do blog a ser buscado

	try {
		const blog = await blogRepository.getBlog(blogId);
		if (!blog) {
			return res.status(404).json({ message: "Blog não encontrado." });
		}

		res.status(200).json(blog);
	} catch (error) {
		console.error("Erro ao buscar blog:", error);
		res.status(500).json({ message: "Erro ao buscar blog." });
	}
}

async function getAllBlogs(req, res, next) {
	try {
		const blogs = await blogRepository.getAllBlogs();
		res.status(200).json(blogs);
	} catch (error) {
		console.error("Erro ao buscar blogs:", error);
		res.status(500).json({ message: "Erro ao buscar blogs." });
	}
}

module.exports = {
	createBlog,
	updateBlog,
	deleteBlog,
	getBlog,
	getAllBlogs,
};
