import axios from "axios";

const API_URL = "http://localhost:4531/api/console";

export const create = (console) => {
    return axios.post(`${API_URL}/create`, console);
}

export const getAllConsoles = () => {
    return axios.get(API_URL);
}

export const updateConsole = (console) => {
    return axios.put(`${API_URL}/update`, console);
}

export const deleteConsole = (consoleId) => {
    return axios.delete(`${API_URL}/delete/${consoleId}`);
}

export const getConsoleById = (consoleId) => {
    return axios.get(`${API_URL}/${consoleId}`);
}



