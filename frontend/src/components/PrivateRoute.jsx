import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute() {
    const { userInfo } = useSelector((state) => state.auth)
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute