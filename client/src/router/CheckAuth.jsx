import React from 'react'

import { Navigate } from 'react-router-dom'
// import Notfound404 from '../components/page/Notfound404';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { login as loginRedux } from '../store/userSlice';

//Service
import { tokenInfo } from '../services/auth';

export const CheckAuth = ({ redirectPath = "/", role = null, children }) => {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => ({ ...state }));
    const roleUser = user.info.role ?? null;

    const token = localStorage.getItem("token");


    //check token localStorage
    if (!token) {
        return <Navigate to={redirectPath} />
    }

    // if(user.length){
    //     // tokenInfo(token);
    //     console.log(token);
    // }else{
    //     console.log(user.info)
    // }
    if(!roleUser){
        tokenInfo(token)
            .then((res) => {
                dispatch(
                    loginRedux({
                        id:res.data.id,
                        name: res.data.username,
                        role: res.data.role,
                        token: token,
                        expToken: res.data.exp
                    })
                );
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //check role (redux)
    const roleLevel = {
        user:1,
        admin:2
    }
    if(role===null || roleLevel[roleUser] >= roleLevel[role]){
        return children;
    }

    // return <Navigate to={redirectPath} />
    return "Access Denied";
}
