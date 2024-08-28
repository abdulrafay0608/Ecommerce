import React from "react";
import "./AboutModule.css";

import { HiShieldCheck } from "react-icons/hi";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";



const About = () => {
  return (
    <section>
      <div className="about-main-container">
        <div className="column-50 shape-img-bg">
          <img
            // decoding="async"
            // width={1800}
            // height={1200}
            src="https://seoland.themeht.com/wp-content/uploads/2024/04/01-2.jpg"
            // className="full-size"
            // alt
            // srcSet="https://seoland.themeht.com/wp-content/uploads/2024/04/01-2.jpg 1800w, https://seoland.themeht.com/wp-content/uploads/2024/04/01-2-300x200.jpg 300w, https://seoland.themeht.com/wp-content/uploads/2024/04/01-2-1024x683.jpg 1024w, https://seoland.themeht.com/wp-content/uploads/2024/04/01-2-768x512.jpg 768w, https://seoland.themeht.com/wp-content/uploads/2024/04/01-2-1536x1024.jpg 1536w, https://seoland.themeht.com/wp-content/uploads/2024/04/01-2-600x400.jpg 600w, https://seoland.themeht.com/wp-content/uploads/2024/04/01-2-1200x800.jpg 1200w"
            // sizes="(max-width: 1800px) 100vw, 1800px"
          />
        </div>

        <div className="column-50 about-text-container">
          <div className="about-heading">
            <div className="dote-orange"></div>
            <h6>About Us</h6>
            <div className="dote-blue"></div>
          </div>
          <h2>Everything Starts With A Marketing Agency.</h2>
          <p>
            Seoland agency makes it easy to create content that engages your
            audience by taking the guesswork out of research, strategy, and
            writing.
          </p>
          <div className="styled-list-container">
            <ul className="styled-list list-1">
              <li>
                <HiShieldCheck className="icon" /> Amazing communication.
              </li>
              <li>
                <HiShieldCheck className="icon" /> Get quality Lead click.
              </li>
            </ul>
            <ul className="styled-list list-2">
              <li>
                <HiShieldCheck className="icon" /> Best trending designing.
              </li>
              <li>
                <HiShieldCheck className="icon" /> Mitigate Business Policy.
              </li>
            </ul>
          </div>
          <Link class="discover-more" href="#">
            <span>Discover More</span>
            <span className="icon">
              <IoIosArrowRoundForward color="#000" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
