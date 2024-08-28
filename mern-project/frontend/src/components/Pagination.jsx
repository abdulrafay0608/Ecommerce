import React from "react";

const Pagination = ({ total, perPage, currentPage, setCurrentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pages.push(i);
  }
  const prevFunc = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const nextFunc = () => {
    if (total / perPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="text-center">
      <button onClick={prevFunc} className="btn btn-primary">
        Prev
      </button>
      &nbsp;
      <span className="fs-5">{currentPage}</span>
      <span className="fs-5"> of </span>
      <span className="fs-5"> {Math.ceil(total / perPage)}</span>
      &nbsp;
      <button onClick={nextFunc} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default Pagination;
