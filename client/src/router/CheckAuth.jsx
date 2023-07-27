import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
// import Notfound404 from '../components/page/Notfound404';

export const CheckAuth = ({ redirectPath = "/", role = null, children }) => {

    const {user} = useSelector((state)=>({...state}));
    const roleUser = user.info.role ?? null;

    const token = localStorage.getItem("token");
    

    //check token localStorage
    if(!token){
        return <Navigate to={redirectPath}/>
    }

    //check role (redux)
    if(role===null || roleUser == role){
        return children
    }

    // return <Navigate to={redirectPath} />
    return "Access Denied";
}
