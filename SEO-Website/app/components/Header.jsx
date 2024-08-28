"use client";

import React, { useState } from "react";
import "./HeaderModule.css";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { BsArrowRightCircle } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("ssss");
  };

  return (
    <>
     <div className="nav-container">
        <header>
          <nav>
            <div className="logo">
              <img src="http://seoland.themeht.com/wp-content/uploads/2024/04/logo.svg" />
            </div>
            {/*  */}
            <div className={`menu`}>
              <div className={` ${isOpen ? "bgcolor" : ""}`}></div>
              <ul className={`${isOpen ? "showMenu " : "ul"}`}>
                <MdClose
                  onClick={() => setIsOpen(false)}
                  color="#ff6004"
                  size={25}
                  className="nav-close"
                />
                <li>
                  <Link className="link" href={""}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="link" href={""}>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link className="link" href={""}>
                    Protfolio
                  </Link>
                </li>
                <li>
                  <Link className="link" href={""}>
                    about
                  </Link>
                </li>
                <li>
                  <div className="link">Services +</div>
                  <ul>
                    <li>
                      <Link className="link border-bottom-none" href={""}>
                        Seo Services
                      </Link>{" "}
                    </li>
                    <li>
                      <Link className="link border-bottom-none" href={""}>
                        Website Development
                      </Link>{" "}
                    </li>
                    <li>
                      <Link className="link border-bottom-none" href={""}>
                        App Devepolment
                      </Link>{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  <Link className="link" href={""}>
                    new
                  </Link>
                </li>
                <li>
                  <Link className="link" href={""}>
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
            {/*  */}
            <div className="let-chat">
              <div className="nav-toggle">
                <RiMenu3Fill
                  onClick={() => toggleMenu()}
                  color="#ff6004"
                  size={25}
                  className="nav-burger"
                />
              </div>
              <div className="text-icon flex justify-center items-center">
                <Link href="#" className="let-chat">
                  Let's Chat <BsArrowRightCircle className="icon" color="ff6004" />
                </Link>
              </div>
              <div className="contact">
                <img
                  src="https://seoland.themeht.com/wp-content/themes/seoland/assets/images/grid-icon.svg"
                  alt="pattern"
                />
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
 
  );
};

export default Header;
