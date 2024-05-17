import React from 'react'
import { useParams } from 'react-router-dom';
import { RiVerifiedBadgeFill } from "react-icons/ri";

function VerificationPage() {

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-primary">
                <section
                    className="w-full p-10 rounded-lg max-w-2xl shadow-lg shadow-gray-300 bg-white flex flex-col items-center justify-center space-y-5">
                    <RiVerifiedBadgeFill size={100} className='text-green-500' />
                    <h2 className='text-3xl font-bold'>Email Verified</h2>
                    <p className='text-xl'>Your email has been verified. Please Login to continue.</p>
                    <a href="/login" className='px-4 py-2 bg-secondary text-white rounded-lg'>Login</a>
                </section>
            </div>
        </>
    )
}

export default VerificationPage