import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCartAsync,
  removeItemAsync,
  selectItems,
} from "../../store/cart/cart.slice";
import CartProductCard from "../../widgets/cartcard/CartProductCard";
import "./cartpage.css";
import axios from "axios";

// URL вашего API
const API_URL = "http://localhost:8007";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Состояние для общей суммы за все продукты

  const dispatch = useDispatch();
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      const data = response.data;
      setCartItems(data);
      calculateTotalPrice(data); // После получения данных о продуктах, вычисляем общую сумму
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Функция для вычисления общей суммы за все продукты
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, curr) => acc + parseFloat(curr.price), 0); // Преобразование цен в числа перед сложением
    setTotalPrice(total);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemAsync(id));
  };

  const handleClearCart = () => {
    dispatch(clearCartAsync());
  };

  // Функция для перехода к оплате
  const handleCheckout = () => {
    // Здесь можно добавить код для перехода к странице оплаты
    console.log("Proceed to checkout");
  };

  return (
    <div>
      <h2>Cart</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <CartProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                  />
                  <button onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <p>Total Price: ${Number(totalPrice).toFixed(2)}</p>{" "}
          <button onClick={handleCheckout}>Proceed to Checkout</button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Cart;
