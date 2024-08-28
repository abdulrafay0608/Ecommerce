import React from "react";
import { NavLink } from "react-router-dom";
import { CiShoppingTag } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { Input } from "./Input";
import { useCategory } from "../hooks/useCategory";
import { useCart } from "../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const logOutFunc = () => {
    toast.success("logout Successfully");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-light">
        <div className="container">
          <NavLink to={"/"} className="navbar-brand">
            <CiShoppingTag size={28} /> Ecommerce App
          </NavLink>

          <Input />
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaBars color="#fff" />
          </button>
          <div
            className="collapse navbar-collapse text-white"
            id="navbarTogglerDemo01"
          >
            <ul className="navbar-nav text-white ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="user nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={"/category"}
                >
                  Categories
                </NavLink>
                <ul className="bg-dark px-2 dropdown-menu">
                  {categories.map((c, i) => {
                    return (
                      <li key={i}>
                        <NavLink
                          to={`/category/${c.slug}`}
                          className="nav-link dropdown-item"
                        >
                          {c.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to={"/contact"} className="nav-link">
                  Contact
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/sign-up"} className="nav-link">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/sign-in"} className="nav-link">
                      Sign In
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="user nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user.name}
                  </NavLink>
                  <ul className="bg-dark px-2 dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="nav-link dropdown-item"
                        href="#"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/dashboard/user/profile"}
                        className="nav-link dropdown-item"
                        href="#"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={logOutFunc}
                        to={"/sign-in"}
                        className="dropdown-item nav-link"
                      >
                        LogOut
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item">
                <NavLink to={"/cart"} className="nav-link">
                  Cart <sup>({cart.length})</sup>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
