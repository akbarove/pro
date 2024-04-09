import React from "react";
import styles from "./button.css";

const Button = ({ children, onClick, className, color, style }) => {
  const colorClass = [
    color === "red" ? styles.red : "",
    color === "green" ? styles.green : "",
    color === "blue" ? styles.blue : "",
  ].join(" ");
  return (
    <button
      style={style}
      className={`${colorClass}  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
