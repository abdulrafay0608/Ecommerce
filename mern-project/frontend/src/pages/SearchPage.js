import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/Layout";

const SearchPage = () => {
  const [value, setValue] = useSearch();
  console.log(value);
  return (
    <Layout title="Search Results">
      <div className="container ">
        <div className="text-center">
          <h1>Search Results </h1>
          <h6 className="">
            {value?.results.length < 1
              ? "No Not Fount"
              : `Found ${value?.results.length} Product`}
          </h6>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {value?.results.map((items, i) => {
              return (
                <div key={i} className="col">
                  <div className=" card">
                    <img
                      src={`/api/product/product-photo/${items?._id}`}
                      className="fs-6 image"
                      alt={items?.name}
                    />
                    <div className="p-2">
                      <h5 className="fs-5">{items?.name}</h5>
                      <p className="text-truncate-1-lines fs-6">
                        {items?.description}
                      </p>
                      <p className="fs-6 card-text">
                        <strong>${items?.price}</strong>
                      </p>
                      <p className="fs-6 card-text">
                        <strong>{items?.category.name}</strong>
                      </p>
                      <button className="btn btn-primary ms-1">
                        More Detail
                      </button>
                      <button className="btn btn-success ms-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
