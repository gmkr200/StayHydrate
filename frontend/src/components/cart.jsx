import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import { useCart } from "../utils/context";

const Cart = ({ cart, setCart, handleChange }) => {
  // const [cart, setCart] = useCart();
  const [price, setPrice] = useState(0);
  //   const image_url = `https://picsum.photos/200?${Math.random()}`;
  const handlePrice = () => {
    let ans = 0;
    cart.forEach((product) => {
      ans += product.amount * product.product_price;
    });

    // Limit the number of decimal places to 3
    const formattedPrice = Number(ans.toFixed(3));
    setPrice(formattedPrice);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  useEffect(() => {
    handlePrice();
  }, [cart]);

  return (
    <article className="article">
      {cart?.map((product) => (
        <div className="cart_box" key={product.id}>
          <div className="cart_img">
            <img src={product.image_url} alt={product.product_title} />
            <p>{product.product_title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(product, +1)}> + </button>
            <button>{product.amount}</button>
            <button onClick={() => handleChange(product, -1)}> - </button>
          </div>
          <div>
            <span>{product.product_price}</span>
            <button onClick={() => handleRemove(product.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>Dollar - {price}</span>
      </div>
    </article>
  );
};

export default Cart;
