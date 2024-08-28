import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, [allProduct]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/get-product");
      console.log(data);
      if (data.success) {
        setAllProduct(data.products);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  return (
    <Layout>
      <div class="container mt-4">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {allProduct.map((items, i) => {
            return (
              <Link to={`update-product/${items.slug}`}>
                <div class="col">
                  <div className="card h-50">
                    <img
                      src={`/api/product/product-photo/${items._id}`}
                      className="fs-6 image"
                      alt={items.name}
                    />
                    <div className="p-2">
                      <h5 className="fs-5">{items.name}</h5>
                      <p className="fs-6 text-truncate-1-lines">{items.description}</p>
                      <p className="fs-6 card-text">
                        <strong>PRK: {items.price}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
