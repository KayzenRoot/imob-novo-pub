module.exports = (error, req, res, next) => {
	console.error("Erro: ", error); // Log do erro para análise
	if (res.headersSent) {
		return next(error); // Encaminha erro se headers já foram enviados
	}
	res.status(500).json({ message: "Erro interno do servidor." });
};
