import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/UserApiSlice';
import { setCredentials } from '../slices/AuthSlice';

export default function UserLogin() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const { email, password } = formData;

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo && userInfo.is_admin === 0) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Perform your form submission logic here
            try {
                const res = await login(formData).unwrap();
                // console.log(res);
                dispatch(setCredentials({ ...res }));
                if (res.data.is_admin === 'admin') {
                    localStorage.removeItem('userInfo');
                    toast.error("Please login with user credentials");
                } else {
                    toast.success("Logged in successfully");
                    navigate('/');
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            // console.log('Form validation failed');
            toast.error("Check the details");
        }
    };

    return (
        <section className="bg-primary text-">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign In
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Email" required value={email}
                                    onChange={handleInputChange} />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required value={password}
                                    onChange={handleInputChange} />
                                {errors.password && <p className="text-red-500">{errors.password}</p>}
                            </div>
                            <p className="text-sm font-light flex justify-end text-gray-500 ">
                                <a href="/forgot-Password" className="font-medium text-secondary hover:underline">Forgot password</a>
                            </p>
                            <button type="submit" className="w-full text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</button>
                            <p className="text-sm font-light text-gray-500 ">
                                Don't have an account? <a href="/signup" className="font-medium text-secondary hover:underline">signup here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
