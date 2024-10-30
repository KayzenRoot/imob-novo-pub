const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Token não fornecido." });

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).json({ message: "Token inválido." });
		if (!decoded.id)
			return res
				.status(401)
				.json({ message: "ID do usuário não encontrado no token." });

		res.locals.user = decoded;
		next();
	});
}

module.exports = authMiddleware;
