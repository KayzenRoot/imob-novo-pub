import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const API_URL = process.env.REACT_APP_API_URL;

export const uploadImageToFirestore = async (propertyId, file) => {
	const storageRef = ref(storage, `property/${propertyId}/${Date.now()}_${file.name}`);
	await uploadBytes(storageRef, file);
	const url = await getDownloadURL(storageRef);
	return url;
};

export const createProperty = async (token, propertyData) => {
	try {
		const response = await fetch(`${API_URL}/property`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(propertyData),
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			throw new Error(errorResponse.message || "Erro ao criar propriedade");
		}

		return await response.json();
	} catch (error) {
		console.error("Erro ao criar propriedade:", error);
		throw error;
	}
};

export const updatePropertyImages = async (token, propertyId, imageUrls) => {
	const response = await axios.put(
		`${API_URL}/property/${propertyId}`,
		{ imageUrls },
		{
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}
	);
	return response.data;
};

export const getProperties = async () => {
	const response = await axios.get(`${API_URL}/property`);
	return response.data;
};

export const getProperty = async (token, id) => {
	const headers = {
		Authorization: `Bearer ${token}`,
	};
	const response = await axios.get(`${API_URL}/property/${id}`, { headers });
	return response.data;
};

export const updateProperty = async (token, id, property) => {
	const headers = {
		Authorization: `Bearer ${token}`,
	};
	const response = await axios.put(`${API_URL}/property/${id}`, property, { headers });
	return response.data;
};

export const deleteProperty = async (token, id) => {
	const headers = {
		Authorization: `Bearer ${token}`,
	};
	const response = await axios.delete(`${API_URL}/property/${id}`, { headers });
	return response.data;
};
