import React from "react";

import "./Pagination.css";
import { Button } from "antd";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  //                                100             10
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  const prevFunc = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextFunc = () => {
    if (totalPosts / postsPerPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination my-5">
      <button onClick={prevFunc}>Prev</button>
      {`${currentPage} of ${postsPerPage}`}
      <button onClick={nextFunc}>Next</button>
    </div>
  );
};

export default Pagination;
