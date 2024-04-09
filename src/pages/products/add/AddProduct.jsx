import React, { useState } from "react";
import Input2 from "../../../widgets/input2/Input2";
import Button from "../../../widgets/button/Button";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../store/products/products.actions";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../../features/auth/AuthForm";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (let key in product) {
      if (!product[key]) {
        alert("Some inputs are empty!");
        return;
      }
    }
    dispatch(createProduct(product));
    setProduct({
      title: "",
      description: "",
      price: "",
      image: "",
    });
    navigate("/");
    // console.log(product);
  }

  return (
    <AuthForm>
      <form className="formStyles" onSubmit={handleSubmit}>
        <h2>Create product</h2>
        <Input2 onChange={handleChange} name="title" value={product.title} />
        <Input2
          onChange={handleChange}
          name="description"
          value={product.description}
        />
        <Input2 onChange={handleChange} name="price" value={product.price} />
        <Input2 onChange={handleChange} name="image" value={product.image} />
        <Button>Add product</Button>
      </form>
    </AuthForm>
  );
};

export default AddProduct;
