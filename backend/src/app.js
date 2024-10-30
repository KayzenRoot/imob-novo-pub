const express = require("express");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authMiddleware = require("./middlewares/authMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const authRouter = require("./routers/authRouter");
const propertyRouter = require("./routers/propertyRouter");
const blogRouter = require("./routers/blogRouter");
const profileController = require("./controllers/profileController");
const userController = require("./controllers/userController");

const app = express();
app.use(helmet(), morgan("dev"), express.json(), express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);

app.use("/auth", authRouter);
app.get("/profile", authMiddleware, profileController.getUser);
app.post("/profile", userController.newUser);
app.use("/property", propertyRouter);
app.use("/blog", blogRouter);

app.use(errorMiddleware, (req, res) =>
	res.status(404).json({ message: "Rota não encontrada." })
);

module.exports = app;
