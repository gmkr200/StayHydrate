import React from 'react'

function Brands() {
    const slides = [
        {
            url: 'src/assets/images/img1.png',
        },
        {
            url: 'src/assets/images/img2.png',
        },
        {
            url: 'src/assets/images/img3.png',
        },
        {
            url: 'src/assets/images/img4.png',
        },
        {
            url: 'src/assets/images/img5.png',
        },
        {
            url: 'src/assets/images/img6.png',
        },
        {
            url: 'src/assets/images/img7.png',
        },
        {
            url: 'src/assets/images/img8.png',
        },
        {
            url: 'src/assets/images/img9.png',
        },
        {
            url: 'src/assets/images/img10.png',
        },
        {
            url: 'src/assets/images/img11.png',
        },
        {
            url: 'src/assets/images/img12.png',
        },
    ];

    return (
        <div className='bg-primary w-full'>
            <div className='max-w-[1400px] w-full mx-auto py-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
                <h1 className='text-2xl sm:text-3xl text-center font-extravagant mb-6'>
                    Brands We Trust
                </h1>
                <section>
                    <div className="container mx-auto flex justify-center"> {/* Added justify-center here */}
                        <div className="flex flex-wrap -m-2 sm:m-0">
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {slides.map((slide, slideIndex) => (
                                    <div key={slideIndex} className="card rounded-md overflow-hidden shadow-md">
                                        <img
                                            src={slide.url}
                                            alt={`Slide ${slideIndex + 1}`}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
    
}


// export default Brands