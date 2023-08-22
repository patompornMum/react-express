import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { newOline } from '../store/socketSlice';

import io from 'socket.io-client';

//URL PUBLIC SERVER URL, SOCKET URL
const { VITE_SERVER_SOCKET_URL: server_socket_url } = import.meta.env;

const MainLayout = () => {

    //redux
    const { user: reduxUser } = useSelector((state) => ({ ...state }));
    const token = reduxUser.info.token;
    const user_id = reduxUser.info.id;

    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(server_socket_url, {
            auth: {
                token: 'auth token'
            },
            query: {
                userId: user_id
            }
        })
        socket.on('userOnline', (respData) => {
            dispatch(newOline(respData));
        })
        // console.log('start')
        return () => {
            socket.disconnect();
            // console.log('clean')
        }
    }, []);

    return (
        <>
            <HeaderBar />
            <Outlet />
        </>
    )
}

export default MainLayout