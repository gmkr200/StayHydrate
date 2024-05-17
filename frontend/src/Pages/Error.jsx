import React from 'react'

function Error() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-primary">
                <section
                    className="w-full p-10 rounded-lg max-w-2xl shadow-lg shadow-gray-300 bg-white flex flex-col items-center justify-center space-y-5">

                    <h1 className='text-9xl font-bold text-primary'>404</h1>
                    <h2 className='text-6xl font-medium py-8'>Page not found</h2>
                    <p className='text-2xl pb-8 px-12 font-medium text-center'>Sorry, but the page you're trying to access doesn't exist.</p>
                    <a href="/" className='bg-secondary text-white font-semibold px-6 py-3 rounded-md'>Home</a>
                </section>
            </div>
        </>
    )
}

export default Error