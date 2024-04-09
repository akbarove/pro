// src/components/CartProductCard.js
import React from "react";
import "./cart.css";
import { colors } from "@mui/material";

const CartProductCard = ({ name, price, image }) => {
  return (
    <div className="cart-product-card">
      <div className="cart-product-image-container">
        <img className="cart-product-image" src={image} alt={name} />
      </div>
      <div className="cart-product-details">
        <h3 className="cart-product-name">{name}</h3>
        <p className="cart-product-price">${price}</p>
      </div>
    </div>
  );
};

export default CartProductCard;
