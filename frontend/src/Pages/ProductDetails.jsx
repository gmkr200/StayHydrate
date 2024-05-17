import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";

const ProductDetails = ({ handleProductClick }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Use cartItems instead of cart

  // const image_src = `https://picsum.photos/200?${Math.random()}`;


//   useEffect(() => {
//     if (productId) {
//         const fetchProductDetails = async () => {
//             try {
                
//                 const response = await fetch(
//                     `http://localhost:8000/productsApi/${productId}`
//                 );
//                 const data = await response.json();
//                 setProduct(data[0]);
//             } catch (error) {
//                 console.error("Error fetching product details:", error);
//             }
//         };
//         fetchProductDetails();
//     }
// }, [productId]);




  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/productsApi/${productId}`
        );
        const data = await response.json();
        setProduct(data[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      setCartItems([...cartItems, product]);
      handleProductClick(product); // Pass the product to the parent component's handler
    }
  };

  return (
    <div>
      {/* <Navbar cartCount={cartItems.length} /> */}
      <div className="product-details-container">
        <div className="heading"></div>
        {product ? (
          <div className="product-details">
            <div className="product-heading">
              {" "}
              <h1>Product Details</h1>
            </div>

            <p>{product.product_title}</p>
            <p> {product.product_description}</p>
            <p>Available Stock: {product.available_stock}</p>
            <p>Rating: {product.product_rating}</p>
            <p>Sold By: {product.sold_by}</p>
            <p>Brand: {product.brand}</p>
            <div className="price">
              {" "}
              <p> {product.product_price} $</p>
            </div>
            <div className="product-image">
              <img src={product.image_url} alt={product.product_title} />
            </div>
            <button
              className="add-to-cart-btn"
              disabled={product.available_stock === 0}
              onClick={handleAddToCart}
              style={{
                backgroundColor:
                  product.available_stock === 0 ? "lightcoral" : "bg-primary",
                cursor:
                  product.available_stock === 0 ? "not-allowed" : "pointer",
              }}
            >
              {product.available_stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            {/* </button> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {/* Moved the "Add to Cart" button to the bottom */}
      </div>
    </div>
  );
};

export default ProductDetails;
