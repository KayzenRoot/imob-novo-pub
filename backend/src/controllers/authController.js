const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");

let loginAttempts = {};
const MAX_LOGIN_ATTEMPTS = 5;

async function doLogin(req, res) {
	const { email, password } = req.body;

	if (loginAttempts[email] >= MAX_LOGIN_ATTEMPTS) {
		return res
			.status(429)
			.json({ message: "Muitas tentativas de login. Tente novamente mais tarde." });
	}

	try {
		const user = await userRepository.getUserByEmail(email);
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET,
				{ expiresIn: parseInt(process.env.JWT_EXPIRES) }
			);
			loginAttempts[email] = 0; // Resetando tentativas de login
			return res.json({ token, email });
		}
		loginAttempts[email] = (loginAttempts[email] || 0) + 1; // Contabilizando tentativa falha
		return res.status(401).json({ message: "Email e/ou Senha Inválidos" });
	} catch (error) {
		console.error("Erro no login:", error); // Log de erro específico
		return res.status(500).json({ message: "Um erro ocorreu. Tente novamente." });
	}
}

function doLogout(req, res) {
	const token = req.headers.authorization;
	res.json({ message: "Logout realizado com sucesso" });
}

module.exports = {
	doLogin,
	doLogout,
};
