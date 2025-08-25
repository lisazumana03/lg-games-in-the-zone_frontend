import axios from "axios";

const API_URL = "http://localhost:4531/api/game";

export const create = (game) => {
    return axios.post(`${API_URL}/create`, game);
}

export const getAllGames = () => {
    return axios.get(API_URL);
}

export const updateGame = (game) => {
    return axios.put(`${API_URL}/update`, game);
}

export const deleteGame = (gameId) => {
    return axios.delete(`${API_URL}/delete/${gameId}`);
}