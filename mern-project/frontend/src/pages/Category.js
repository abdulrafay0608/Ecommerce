import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const Category = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    getProductByCategory();
  }, [slug]);

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(`/api/product/product-category/${slug}`);
      if (data.success) {
        setAllProduct(data?.products);
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <h4 className="text-center my-3">{category.name}</h4>
        <p className="fs-6 text-center">Found Results {allProduct.length}</p>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {allProduct?.map((items, i) => {
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
