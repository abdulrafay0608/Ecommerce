import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="text-center bg-dark text-light">
        <div className="container py-5">
          <ul className="navbar-nav d-flex flex-wrap justify-content-center align-items-center gap-lg-5 gap flex-lg-row flex-column text-white">
            <li className="nav-item">
              <NavLink to={"/about"} className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/category"} className="nav-link">
                Category
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/contact"} className="nav-link">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/policy"} className="nav-link">
                Pravicy Policy
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/dashboard"} className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/cart"} className="nav-link">
                Cart <sup>(0)</sup>
              </NavLink>
            </li>
          </ul>

          <hr className="my-5 text-white" />

          <section className="mb-5">
            <div className="row d-flex justify-content-center text-white">
              <div className="col-lg-8">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center mb-5">
            <a href className="text-white me-4">
              <i className="fab fa-facebook-f" />
            </a>
            <a href className="text-white me-4">
              <i className="fab fa-twitter" />
            </a>
            <a href className="text-white me-4">
              <i className="fab fa-google" />
            </a>
            <a href className="text-white me-4">
              <i className="fab fa-instagram" />
            </a>
            <a href className="text-white me-4">
              <i className="fab fa-linkedin" />
            </a>
            <a href className="text-white me-4">
              <i className="fab fa-github" />
            </a>
          </section>
        </div>

        <div className="text-center bg-black text-white p-3">
          &copy; Created By Abdul Rafay | {new Date().getFullYear()} all
          copyright reserved. &nbsp;
        </div>
      </footer>
      {/* Footer */}
      {/* End of .container */}
    </>
  );
};

export default Footer;
