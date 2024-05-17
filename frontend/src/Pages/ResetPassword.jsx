import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../slices/UserApiSlice'

function ResetPassword() {

    const { token } = useParams()

    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (token) {
            const response = fetch('http://localhost:8000/api/get-email/', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setUserData(data.email))
        }
    }, [])

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const { password, confirmPassword } = formData;

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                console.log(formData);
                const response = await resetPassword({ email: userData, password: formData.password, confirmPassword: formData.confirmPassword }).unwrap()
                console.log(response);
                toast.success(response.message)

            } catch (error) {

            }

        } else {
            console.log('Form validation failed');
        }
    };

    return (
        <section className="bg-primary p-2">
            <div className="flex items-center justify-center min-h-screen mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Reset Password
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>


                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " required value={password}
                                    onChange={handleInputChange} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                <input type="password" name="confirmPassword" id="confirmpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " required value={confirmPassword}
                                    onChange={handleInputChange} />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                            </div>


                            <button type="submit" className="w-full text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Reset Password</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword