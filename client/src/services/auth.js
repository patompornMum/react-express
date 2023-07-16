import axios from "axios";

export const register = async (data) =>
  await axios.post(process.env.REACT_APP_API + "/register", data);

export const login = async (data) =>
  await axios.post(process.env.REACT_APP_API + "/login", data);

export const test = async(data)=>{
    // console.log('test');
    return "123";
}