import React, { useState } from "react";
import {
  FaShoppingCart,
  FaRegBookmark,
  FaStar,
  FaFireAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
//import productImage from '../assets/images/samples-md.png'; // Adjust the path as needed
// import { eyecream } from "../assets/images/products";

const ProductCard = ({ product, handleClick }) => {
  const {
    product_title,
    available_stock,
    product_rating,
    product_price,
    image_url,
    product_description,
  } = product;

  const [quantity, setQuantity] = useState(1); // Initial quantity
  const [showQuantity, setShowQuantity] = useState(false);

  // const generateImageSrc = (product_title) => {
  //   // Remove special characters and spaces
  //   const processedTitle = product_title.replace(/[^\w\s]/gi, "").toLowerCase();
  //   // Replace spaces with nothing
  //   const imageName = processedTitle.replace(/\s+/g, "");
  //   // Construct the image source
  //   const imageSrc = `/Users/swethavoora/Desktop/spring2024/capstone/Staywell copy/frontend/src/assets/images/products/${imageName}.jpg`;
  //   console.log(imageSrc);
  //   return imageSrc; // Use .default to get the image path from the imported module
  // };
  //   const imageSrc = `/assets/images/products/${imageName}.jpg`; // Assuming the images are stored in a directory named "images" and have a .jpg extension
  //   return imageSrc;
  // };

  // Generate a unique image URL for each card
  // const image_url = `https://picsum.photos/200?${Math.random()}`;

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0 && newQuantity <= available_stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="productCard">
      <Link to={`/products/${product.id}`} className="productLink">
        <img src={image_url} alt={product_title} className="productImage" />
        {/* {console.log(generateImageSrc(product_title))} */}
        {/* Remove FaFireAlt if "fastSelling" is not included in data */}
        {/* {available_stock < 10 && (
          <FaFireAlt className={"productCard__fastSelling"} />
        )} */}

        <div className="productCard__content">
          <h3>{product_title}</h3>${product_price}
          {available_stock > 0 && available_stock < 10 ? (
            <p className="stockalert text-red-700">
              In Stock ({available_stock} left)
            </p>
          ) : available_stock <= 0 ? (
            <p className="stockalert text-red-700">Out of Stock</p>
          ) : (
            <p className="falsestockalert">In Stock</p>
          )}
          <div className="productRating">
            {[...Array(Math.floor(product_rating))].map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>
          {/* Add product description section if needed */}
          {/* <div className='productDescription'>
            <p>{product_description}</p>
          </div> */}
        </div>
      </Link>
      <button
        className="btn text-center"
        onClick={() => {
          handleClick(product);
        }}
        style={{
          display: "flex",
          backgroundColor: available_stock === 0 ? "lightcoral" : "bg-primary",
          cursor: available_stock === 0 ? "not-allowed" : "pointer",
        }}
        disabled={available_stock === 0}
      >
        {available_stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
      {/* </button> */}
    </div>
  );
};

export default ProductCard;
