import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../slices/UserApiSlice';

function Forgotpassword() {

    const [formData, setFormData] = useState({
        email: ''
    });

    const [errors, setErrors] = useState({});

    const { email } = formData;

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Perform your form submission logic here
            try {
                console.log(formData);
                const res = await forgotPassword(formData).unwrap();
                toast.success(res.message);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            // console.log('Form validation failed');
            toast.error("Check the details");
        }
    };


    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-primary">
                <section
                    className="w-full p-10 rounded-lg max-w-2xl shadow-lg shadow-gray-300 bg-white flex flex-col items-center justify-center space-y-5">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Forgot Password
                    </h1>
                    <p className="text-sm font-light text-gray-500 ">
                        Please enter your email address to create a new password via email.
                    </p>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Email" required value={email}
                                onChange={handleInputChange} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>


                        <button type="submit" className="w-full text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</button>

                    </form>
                </section>
            </div>
        </>
    )
}

export default Forgotpassword