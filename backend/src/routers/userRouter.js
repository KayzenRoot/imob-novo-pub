const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para criar um novo usuário (sem autenticação)
router.post("/", userController.newUser);

// Rota para atualizar um usuário (com autenticação)
router.patch("/:id", authMiddleware, profileController.updateUser);

// Rota para deletar um usuário (com autenticação)
router.delete("/:id", authMiddleware, userController.deleteUser);

// Rota para buscar um usuário pelo ID (com autenticação)
router.get("/:id", authMiddleware, profileController.getUser);

// Rota para buscar todas as propriendades criadas eplo usuario logado (com autenticação)
router.get("/properties/:id", authMiddleware, profileController.getUserProperties);

// Rota para buscar todas as propriendades criadas (sem autenticação)
router.get("/properties", profileController.getAllProperties);

module.exports = router;
