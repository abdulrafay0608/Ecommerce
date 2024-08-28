import React from "react";
import "./CardModule.css";

const Card = () => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="img">
          <img src="https://seoland.themeht.com/wp-content/uploads/2024/04/01-2.png" />
        </div>
        <div>
          <h4 className="card-title">Online Marketing</h4>
          <p className="card-desc">
            Get high rankings with multi-team collaboration that will help you
            optimize off-page SEO.
          </p>
        </div>
      </div>
      <div className="active card">
        <div className="img">
          <img src="https://seoland.themeht.com/wp-content/uploads/2024/04/01-2.png" />
        </div>
        <div>
          <h4 className="card-title">Online Marketing</h4>
          <p className="card-desc">
            Get high rankings with multi-team collaboration that will help you
            optimize off-page SEO.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="img">
          <img src="https://seoland.themeht.com/wp-content/uploads/2024/04/01-2.png" />
        </div>
        <div>
          <h4 className="card-title">Online Marketing</h4>
          <p className="card-desc">
            Get high rankings with multi-team collaboration that will help you
            optimize off-page SEO.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
