import React, { useEffect, useState } from "react";
import "./profile.css";
import ProductsCard from "../../widgets/productCard/ProductCard";
import { Link } from "react-router-dom";
import Button from "../../widgets/button/Button";
import { auth } from "../../firebas/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const MyProfilePage = () => {
  const [authUser, setAuthUset] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUset(user);
      } else {
        setAuthUset(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  return (
    <div className="body">
      <div className="profile">
        <section className="profile-simple">
          <div className="container">
            <div className="img-avatar">
              <img
                className="profile-avatar"
                alt="msdesigns"
                src="https://cdn.dribbble.com/users/1993092/avatars/normal/ff1f89f9c3c8038247fcce607a585686.jpeg?1573311855"
              />
            </div>
            <div className="content">
            {
              authUser ? (<h1 className="profile-name">{`${authUser.email}`}</h1>):(<p>you not log in</p>)
            }
              <p className="profile-locality">Chandīgarh, India</p>
              <p className="profile-specializations">
                Illustration, UI / Visual Design, UX Design / Research
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="line"></div>
      <Link to="/create-product">
        <Button
          className="addproductbtn"
          style={{ color: "black" }}
          color="green"
        >
          Create product
        </Button>
      </Link>
      <ProductsCard />
    </div>
  );
};

export default MyProfilePage;
