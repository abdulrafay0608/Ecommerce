import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";

const ProductDetail = () => {
  const [cart, setCart] = useCart();
  const [allProduct, setAllProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getAllProduct();
  }, [slug]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/get-product`);
      if (data.success) {
        const filter = data.products.filter((f) => f.slug == slug);
        setAllProduct(filter);
        filter.map((e) => {
          relatedRroduct(e._id, e.category._id);
          console.log();
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  const relatedRroduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/product/related-products/${pid}/${cid}`
      );
      setRelatedProduct(data.products);
      console.log(data.products);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  const addCartItem = (id) => {
    try {
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };
  return (
    <Layout>
      <div className="text-center my-3"> Product Detail</div>
      <div class="container my-5">
        {allProduct?.map((items, i) => {
          return (
            <div key={i} className="">
              <div className="d-flex justify-content-center align-items-center gap-5">
                <img
                  src={`/api/product/product-photo/${items?._id}`}
                  className="w-25 h-25 fs-6 image"
                  alt={items?.name}
                />
                <div className="w-50 p-2">
                  <h5 className="fs-2">{items?.name}</h5>
                  <p className="fs-6">{items?.description}</p>
                  <p className="fs-4 card-text">
                    <strong>${items?.price}</strong>
                  </p>
                  <p className="fs-6 card-text">
                    <strong>{items?.category.name}</strong>
                  </p>
                  <button
                    onClick={() => {
                      setCart([...cart, items]);
                      toast.success("Item Added to Cart");
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, items])
                      );
                    }}
                    className="btn btn-primary ms-1"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="text-center">Similar Product</div>
      <div className="text-center fs-6 my-5">
        {relatedProduct == 0 && "Not Found Similar Product"}
      </div>
      <div class="container row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {relatedProduct?.map((items, i) => {
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
                  <button
                    onClick={() => navigate(`/product-detail/${items.slug}`)}
                    className="btn btn-primary ms-1"
                  >
                    More Detail
                  </button>
                  <button
                    onClick={() => {
                      setCart([...cart, items]);
                      toast.success("Item Added to Cart");
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, items])
                      );
                    }}
                    className="btn btn-success ms-1"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default ProductDetail;
