const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para criar um novo blog (com autenticação)
router.post("/", authMiddleware, blogController.createBlog);

// Rota para buscar todos os blogs (sem autenticação)
router.get("/", blogController.getAllBlogs);

// Rota para atualizar um blog existente (com autenticação)
router.patch("/:id", authMiddleware, blogController.updateBlog);

// Rota para deletar um blog (com autenticação)
router.delete("/:id", authMiddleware, blogController.deleteBlog);

// Rota para buscar um blog pelo ID (sem autenticação)
router.get("/:id", blogController.getBlog);

module.exports = router;
