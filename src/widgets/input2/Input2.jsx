import React from "react";
import "./input2.css";

const Input = ({ value, onChange, type, name }) => {
  return (
    <div className="inputGroup">
      <input onChange={onChange} name={name} value={value} type={type} />
      <label htmlFor="name">{name}</label>
    </div>
  );
};

export default Input;
