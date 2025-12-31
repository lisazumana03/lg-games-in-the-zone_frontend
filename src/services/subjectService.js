import { axiosInstance } from './axiosConfig';

const API_URL = 'http://localhost:4515/api/subject';

function getAuthHeader() {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token) return {};
    return {
        Authorization: `Bearer ${token}`
    };
}


export const getAllSubjects = async () => {
    try {
        const res = await axiosInstance.get(`${API_URL}/all`, { headers: getAuthHeader() });

        // Log the response for debugging
        console.log('API Response:', res);

        // Parse the response if it's a string
        let data = res.data;
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (parseError) {
                throw new Error('Failed to parse API response: Invalid JSON format');
            }
        }

        // Validate response format
        if (!Array.isArray(data)) {
            throw new Error('Unexpected response format: Expected an array of subjects');
        }

        return data;
    } catch (error) {
        console.error('Error in getAllSubjects:', error);
        throw error;
    }
};

export const createSubject = async (data) => {
    const res = await axiosInstance.post(`${API_URL}/create`, data, { headers: getAuthHeader() });
    return res.data;
};

export const updateSubject = async (id, data) => {
    const res = await axiosInstance.put(`${API_URL}/update/${id}`, data, { headers: getAuthHeader() });
    return res.data;
};

export const getSubjectById = async (id) => {
    const res = await axiosInstance.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return res.data;
};

export const deleteSubject = async (id) => {
    const res = await axiosInstance.delete(`${API_URL}/delete/${id}`, { headers: getAuthHeader() });
    return res.data;
};
