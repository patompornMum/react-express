import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar'

const MainLayout = () => {
    return (
        <>
            <HeaderBar/>
            <Outlet/>
        </>
    )
}

export default MainLayout