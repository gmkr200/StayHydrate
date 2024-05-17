import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/UserApiSlice";
import { logout } from "../slices/AuthSlice";
import { toast } from 'react-toastify';
import DisplayUsers from '../components/DisplayUsers';

function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();
    const handleLogOut = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            toast.success("Logged out successfully");
            navigate('/admin/login');
        } catch (error) {
            // console.log(error);
            toast.error(error.data.message);
        }
    }

    return (
        <div className="w-100% h-100% p-32 bg-primary flex flex-col justify-center items-center space-y-5">
            <h1 className='text-6xl'>Admin Dashboard</h1>
            <h1 className='text-3xl'>Admin: {userInfo ? userInfo.data.name : 'No admin information available'}</h1>
            <div className="row my-5">
                <button onClick={handleLogOut} className="bg-secondary px-6 py-3 rounded-lg text-xl" >Logout</button>
            </div >
            <div className="row my-5">
                <DisplayUsers />
            </div>
        </div>
    )
}

export default AdminDashboard