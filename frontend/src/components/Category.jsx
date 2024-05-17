import React from 'react'

export default function Category() {

    const slides = [
        {
            url: 'src/assets/images/i1.png',
        },
        {
            url: 'src/assets/images/i2.png',
        },
        {
            url: 'src/assets/images/i3.png',
        },
        {
            url: 'src/assets/images/i4.png',
        },
        {
            url: 'src/assets/images/i5.png',
        },
        {
            url: 'src/assets/images/i6.png',
        },
        {
            url: 'src/assets/images/i7.png',
        },
        {
            url: 'src/assets/images/i8.png',
        },
        
    ];

    return (
        <div className='max-w-[1400px] w-full mx-auto py-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
            <h1 className='text-2xl sm:text-3xl text-center font-extravagant mb-6'>
            PERFECT TO DRINK 

            </h1>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -m-2">

                        {slides.map((slide, slideIndex) => (
                            <div className="lg:w-1/4 md:w-1/2 p-2 w-full" key={slideIndex}>
                                <a className="block relative h-49 rounded overflow-hidden">
                                    <img className="object-cover object-center w-full h-full block" src={slide.url} alt='category' />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>


    )
}
