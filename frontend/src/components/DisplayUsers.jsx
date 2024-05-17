import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DisplayUsers = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            let response = await fetch('http://localhost:8000/api/users');
            if (!response.ok) throw new Error(response.statusText);
            let userData = await response.json();
            setUsers(userData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleDisable = async (id) => {
        try {
            let response = await fetch('http://localhost:8000/api/disable-user-by-id', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });
            if (!response.ok) throw new Error(response.statusText);
            let userData = await response.json();
            console.log('Parsed Data:', userData.message);
            toast.info(userData.message);
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className='text-3xl text-center'>Display Users</h1>
            <div className='flex justify-center items-center flex-wrap m-3'>
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="flex flex-col justify-center items-center space-y-4 m-2 p-4 rounded-lg shadow-lg bg-white">
                            <h1 className='text-2xl'>{user.name}</h1>
                            <h1 className='text-lg'>{user.email}</h1>
                            <button onClick={() => handleDisable(user.id)} className='bg-secondary px-4 py-2 rounded-lg text-xl'>disable</button>
                        </div>
                    ))
                ) : (
                    <p>No users to display.</p>
                )}
            </div>
        </div>
    );
};

export default DisplayUsers;