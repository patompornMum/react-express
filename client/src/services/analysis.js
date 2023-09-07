import axios from "axios";

const server_api_url = import.meta.env.VITE_SERVER_API_URL ?? null;

export const registerHistory = async (token) => {
    return await axios.get(`${server_api_url}/analysis/registerHistory/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const feedHistory = async (token) => {
    return await axios.get(`${server_api_url}/analysis/feedHistory/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
