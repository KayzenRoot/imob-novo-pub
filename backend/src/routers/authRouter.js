const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.doLogin); // Rota para login
router.post("/logout", authController.doLogout); // Rota para logout

module.exports = router;
