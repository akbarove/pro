import React, { useEffect } from "react";
import "./productCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct
} from "../../store/products/products.actions";
import Button from "../../widgets/button/Button";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import { addItemAsync } from "../../store/cart/cart.slice";
import axios from "axios"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsCard = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddToCart = async (id, name, price, image) => {
    try {
      const response = await axios.post("http://localhost:8007/cart", {
        id,
        name,
        price,
        image,
      });
      if (response.status >= 200 && response.status < 300) {
        dispatch(addItemAsync({ id, name, price, image }));
        toast.success("Product added to cart");
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <div className="cardList">
        {(loading || error) && <Loader />}
        {products.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt="" />
            <h2>{item.title}</h2>
            <h3>{item.price}$</h3>
            <p>{item.description}</p>
            <Link to={`/edit-product/${item.id}`}>
              <Button style={{color:"white"}} color="blue">edit</Button>
            </Link>
            <Button style={{color:"white"}}
              onClick={() => dispatch(deleteProduct(item.id))}
              color="white"
            >
              delete
            </Button>

            <Button className="korzina"
              onClick={() =>
                handleAddToCart(item.id, item.title, item.price, item.image)
              }
              color="blue"
            >
            <img style={{width:"30px"}} src="data:image/png;base64,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" alt="" />
            </Button>
          </div>
        ))}
      </div>
      <div style={{marginTop:"5%",marginLeft:"35%"}}>
      <Pagination/>
      </div>
    </div>
  );
};

export default ProductsCard;
