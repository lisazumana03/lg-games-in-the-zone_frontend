const API_URL = 'http://localhost:4515/api/question'

function getAuthHeader() {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token) return {};
    return {
        Authorization: `Bearer ${token}`
    };
}

const questionService = {
    addQuestion: async (quizId, question) => {
        const res = await axios.post(`${API_URL}/add`, { quizId, ...question }, { headers: getAuthHeader() });
        return res.data;
    },
    // ...existing code...
};

export default questionService;
