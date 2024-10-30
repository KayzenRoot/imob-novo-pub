const multer = require("multer");
const path = require("path");
const fs = require("fs");

const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const propertyId = req.params.id;
		if (!propertyId) {
			return cb(new Error("ID do imóvel não fornecido."), null);
		}

		const dir = path.join("uploads", "properties", propertyId.toString());
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		cb(null, dir);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.random().toString(36).substr(2, 9); // Gera um nome único
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

const fileFilter = (req, file, cb) => {
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Tipo de arquivo não permitido. Apenas imagens."), false);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload.array("images", 15);
