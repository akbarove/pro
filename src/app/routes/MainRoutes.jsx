import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import AddProduct from "../../pages/products/add/AddProduct";
import EditProduct from "../../pages/products/edit/EditProduct";
import AuthProvider from "../AuthProvider";
import ProfilePage from "../../pages/profile/ProfilePage";

import CartPage from "../../pages/cart/CartPage";
import LoginPage from "../../pages/auth/login/LoginPage";
import RegisterPage from "../../pages/auth/register/RegisterPage"


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/create-product" element={<AddProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<AuthProvider />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
