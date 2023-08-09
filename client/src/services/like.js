import axios from "axios";

const server_api_url = import.meta.env.VITE_SERVER_API_URL ?? null;

export const like = async (token, data) => {
    return await axios.post(`${server_api_url}/like`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const unlike = async (token, data) => {
    return await axios.post(`${server_api_url}/unlike`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}