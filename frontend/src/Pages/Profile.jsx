import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from "../slices/UserApiSlice";
import { toast } from 'react-toastify';
import { logout } from "../slices/AuthSlice";
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const token = userInfo.token;

    const handleDisable = async () => {
        try {
            // console.log("Disable : ", userInfo);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`, // Assuming userInfo contains the token
                },
            };

            fetch('http://localhost:8000/api/disable-user', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    toast.success(data.message);
                    logoutApiCall().unwrap();
                    dispatch(logout());
                    navigate('/login')
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Display an error message using toast.error() or any other method
                });

        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);
        }
    }

    return (
        <div className="w-100% h-100% p-32 bg-primary flex flex-col justify-center items-center space-y-5">
            <h1 className='text-6xl'>User Profile</h1>
            <h1 className='text-3xl'>User: {userInfo ? userInfo.data.name : 'No admin information available'}</h1>
            <div className="row my-5">
                <button onClick={handleDisable} className="bg-secondary px-6 py-3 rounded-lg text-xl" >Disable</button>
                {
                    // Add more admin dashboard components here as needed.
                }
            </div >
        </div>
    )
}

export default Profile