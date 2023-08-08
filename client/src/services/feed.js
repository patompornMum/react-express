import axios from "axios";

const server_api_url = import.meta.env.VITE_SERVER_API_URL ?? null;

export const list = async (token) => {
    return await axios.get(`${server_api_url}/feed`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const create = async (token, data) => {
    return await axios.post(`${server_api_url}/feed`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// export const deleteUser = async (token, id) => {
//     return await axios.delete(`${server_api_url}/user/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
// }
