import React from "react";
import Navbar from "../widgets/navbar/Navbar";
import MainRoutes from "./routes/MainRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthDetails from "../pages/auth/AuthDetails";


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <MainRoutes />
    </div>
  );
};

export default App;
