import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const blogService = {
	createBlog: async (blogData) => {
		const response = await axios.post(API_URL, blogData);
		return response.data;
	},

	updateBlog: async (blogId, blogData) => {
		const response = await axios.patch(`${API_URL}/${blogId}`, blogData);
		return response.data;
	},

	deleteBlog: async (blogId) => {
		await axios.delete(`${API_URL}/${blogId}`);
	},

	getBlog: async (blogId) => {
		const response = await axios.get(`${API_URL}/${blogId}`);
		return response.data;
	},
};

export default blogService;
