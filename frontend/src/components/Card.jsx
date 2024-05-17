import React from 'react'
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";

export default function Card({ productName, productDescription, productPrice, stars, url, reviewText }) {
    return (
        <div className="card rounded-md overflow-hidden shadow-md m-2">
            <img src={url} />
            <div className="p-4 ">
                <h3 className="text-xl font-bold mb-2">{productName}</h3>
                <p className="my-1 min-h-12 text-gray-500 text-sm mb-2">{productDescription}</p>
                <p className="my-2 text-gray-700 font-bold mb-2">Price: {productPrice}</p>
                <div className='text-sm flex align-top content-start place-items-start items-start justify-start'>
                    <GoStarFill />
                    <GoStarFill />
                    <GoStarFill />
                    <GoStarFill />
                    <GoStar />
                    <span className="ml-2">{reviewText}</span>
                </div>
            </div>
        </div>
    )
}
