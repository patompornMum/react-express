import axios from "axios";

const server_api_url = import.meta.env.VITE_SERVER_API_URL ?? null;

export const list = async (token) => {
    return await axios.get(`${server_api_url}/user`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const changeStatus = async (token, id, data) => {
    return await axios.put(`${server_api_url}/user/changeStatus/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const deleteUser = async (token, id) => {
    return await axios.delete(`${server_api_url}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
