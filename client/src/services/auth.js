import axios from "axios";

const server_api_url = import.meta.env.VITE_SERVER_API_URL ?? null;

export const register = async (data) => {
  return await axios.post(`${server_api_url}/register`, data);
}

export const login = async (data) => {
  return await axios.post(`${server_api_url}/login`, data);
}


