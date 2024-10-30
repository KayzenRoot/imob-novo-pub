const propertyRepository = require("../repositories/propertyRepository");

async function validatePropertyData(req, res, next) {
	const {
		title,
		description,
		salesPrice,
		rentPrice,
		category,
		typeOfProperty,
		zip,
		street,
		number,
		neighborhood,
		city,
		state,
		isRental,
		isSale,
	} = req.body;

	if (!title) {
		return res.status(400).json({ error: "O título é obrigatório." });
	}
	if (!description) {
		return res.status(400).json({ error: "A descrição é obrigatória." });
	}
	if (!salesPrice && !rentPrice) {
		return res
			.status(400)
			.json({ error: "O valor de venda ou aluguel é obrigatório." });
	}
	if (!category) {
		return res.status(400).json({ error: "A categoria é obrigatória." });
	}
	if (!typeOfProperty) {
		return res.status(400).json({ error: "O tipo de imóvel é obrigatório." });
	}
	if (!zip) {
		return res.status(400).json({ error: "O CEP é obrigatório." });
	}
	if (!street) {
		return res.status(400).json({ error: "A rua é obrigatória." });
	}
	if (!number) {
		return res.status(400).json({ error: "O número é obrigatório." });
	}
	if (!neighborhood) {
		return res.status(400).json({ error: "O bairro é obrigatório." });
	}
	if (!city) {
		return res.status(400).json({ error: "A cidade é obrigatória." });
	}
	if (!state) {
		return res.status(400).json({ error: "O estado é obrigatório." });
	}
	if (isRental === null || isSale === null) {
		return res.status(400).json({ error: "O tipo de negociação é obrigatório." });
	}

	next();
}

async function createProperty(req, res, next) {
	try {
		await validatePropertyData(req, res, next);
		const newProperty = await propertyRepository.createProperty(req.body);
		res.status(201).json(newProperty);
	} catch (error) {
		console.error("Erro ao criar propriedade:", error.message);
		res.status(500).json({ error: "Erro interno do servidor." });
	}
}

async function updateProperty(req, res, next) {
	try {
		const propertyId = req.params.id;
		const propertyData = req.body;
		const updatedProperty = await propertyRepository.updateProperty(
			propertyId,
			propertyData
		);
		res.status(200).json(updatedProperty);
	} catch (error) {
		console.error("Erro ao atualizar propriedade:", error.message);
		res.status(500).json({ error: "Erro interno do servidor." });
		next(error);
	}
}

async function deleteProperty(req, res, next) {
	try {
		const propertyId = req.params.id;
		await propertyRepository.deleteProperty(propertyId);
		res.status(200).json({ message: "Propriedade deletada com sucesso." });
	} catch (error) {
		console.error("Erro ao deletar propriedade:", error.message);
		res.status(500).json({ error: "Erro interno do servidor." });
		next(error);
	}
}

async function getAllProperty(req, res, next) {
	try {
		const properties = await propertyRepository.getAllProperty();
		res.status(200).json(properties);
	} catch (error) {
		console.error("Erro ao buscar propriedades:", error.message);
		res.status(500).json({ error: "Erro interno do servidor." });
		next(error);
	}
}

module.exports = {
	createProperty,
	updateProperty,
	deleteProperty,
	getAllProperty,
};
