import React from "react";
import "./HeroModule.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="">
      <div className="hero-banner">
        <div className="text-container">
          <div>
            <div className="welcome-container">
              <h6>
                Welcome To
                <span className="dot dot1"></span>
                <span className="dot dot2"></span>
                <span className="dot dot3"></span>
                <span className="dot dot4"></span>
              </h6>
            </div>
            <h1 className="hero-heading">
              Digital Marketing <span className="agency">Agency</span>
            </h1>
            <p className="hero-para">
              We help ambitious businesses like yours generate more profits by
              building awareness, driving web traffic, connecting with customers
              growing.
            </p>

            <Link class="get-started" href="#">
              <span>Get Started</span>
              <span className="icon">
                <IoIosArrowRoundForward color="#000" />
              </span>
            </Link>
          </div>
        </div>
        <div className="img-container">
          <img
            src="http://seoland.themeht.com/wp-content/uploads/2024/04/01-1.png"
            alt="hero"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
