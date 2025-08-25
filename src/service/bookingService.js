import axios from "axios";

const API_URL = "http://localhost:4531/api/booking";

export const create = (booking) => {
    return axios.post(`${API_URL}/create`, booking);
}

export const getAllBookings = () => {
    return axios.get(API_URL);
}

export const updateConsole = (booking) => {
    return axios.put(`${API_URL}/update`, booking);
}

export const deleteConsole = (bookingId) => {
    return axios.delete(`${API_URL}/delete/${bookingId}`);
}

export const getConsoleById = (bookingId) => {
    return axios.get(`${API_URL}/${bookingId}`);
}
