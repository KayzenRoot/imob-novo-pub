const Property = require("../models/propertyModel");

module.exports = {
	createProperty: (propertyData) => Property.create(propertyData),
	updatePropertyImages: async (id, imageUrls) => {
		const property = await Property.findByPk(id);
		if (property) return property.update({ imageUrls });
		throw new Error("Property not found");
	},
	getAllProperty: () => Property.findAll(),
	updateProperty: async (id, propertyData) => {
		const property = await Property.findByPk(id);
		if (property) return property.update(propertyData);
		throw new Error("Property not found");
	},
	deleteProperty: async (id) => {
		const property = await Property.findByPk(id);
		if (property) return property.destroy();
		throw new Error("Property not found");
	},
};
