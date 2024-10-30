const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, propertyController.createProperty);
router.patch("/:id", authMiddleware, propertyController.updateProperty);
router.delete("/:id", authMiddleware, propertyController.deleteProperty);
router.get("/", propertyController.getAllProperty);

module.exports = router;
