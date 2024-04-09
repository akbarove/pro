import React from "react";
import { BsCart2 } from "react-icons/bs";
import "./styles.css";

const CartButton = () => {
  return (
    <button className="icon-button">
      <BsCart2 className="icon" />
    </button>
  );
};

export default CartButton;
