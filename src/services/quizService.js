import { axiosInstance } from './axiosConfig';

const API_URL = '/api/quiz';

function getAuthHeader() {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token) return {};
    return {
        Authorization: `Bearer ${token}`
    };
}

const quizService = {
	getAll: async () => {
		const res = await axiosInstance.get(API_URL);
		return res.data;
	},
	getById: async (id) => {
		const res = await axiosInstance.get(`${API_URL}/${id}`);
		return res.data;
	},
	create: async (quiz) => {
		const res = await axiosInstance.post(`${API_URL}/create`, quiz);
		return res.data;
	},
	delete: async (id) => {
		await axiosInstance.delete(`${API_URL}/delete/${id}`);
	},
	getResults: async (id) => {
        const res = await axiosInstance.get(`${API_URL}/${id}/results`, { headers: getAuthHeader() });
        return res.data;
    },
};

export default quizService;