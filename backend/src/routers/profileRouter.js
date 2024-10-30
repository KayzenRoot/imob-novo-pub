const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware"); // Inclua o middleware de autenticação

// Rota para puxar o usuário (com autenticação)
router.get("/", authMiddleware, profileController.getUser);

// Rota para atualizar um usuário (com autenticação)
router.patch("/:id", authMiddleware, profileController.updateUser);

module.exports = router;
