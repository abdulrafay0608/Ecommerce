import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios, { all } from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setperPage] = useState(9);

  const navigate = useNavigate()

  useEffect(() => {
    getAllCategory();
    getAllProduct();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProduct();
    }
  }, [checked, radio]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/get-product");
      if (data.success) setAllProduct(data.products);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/category/get-category");
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  const handleFilter = (value, id) => {
    let updatedChecked = [...checked];
    if (value) {
      updatedChecked.push(id);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== id);
    }
    setChecked(updatedChecked);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/product/filters-product", {
        checked,
        radio,
      });
      setAllProduct(data.products);
      console.log(allProduct);
      console.log(data.products);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const finalIndex = allProduct.slice(firstIndex, lastIndex);
  return (
    <Layout tittle={"Shop Now - Ecommerce App"}>
      <div className="row col-12 mt-3">
        <div className="col-md-3 ">
          <h6 className="mx-3 fs-3 fw-bolder">Filters Product by category</h6>
          <div className="m-4 d-flex flex-column">
            {categories?.map((c) => {
              return (
                <Checkbox
                  className="my-2"
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              );
            })}
          </div>
          <h6 className="mx-3 fs-3 fw-bolder">Filter by Prices</h6>
          <div className="m-4 ">
            <Radio.Group
              className="d-flex flex-column"
              onChange={(e) => setRadio(e.target.value)}
            >
              {prices?.map((p, i) => {
                return (
                  <Radio key={p._id} className="my-2" value={p.array}>
                    {p.name}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          <h6>All Product</h6>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {finalIndex?.map((items, i) => {
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
                      <button onClick={()=>navigate(`/product-detail/${items.slug}`)} className="btn btn-primary ms-1">
                        More Detail
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {allProduct.length > 9 && (
        <Pagination
          total={allProduct.length}
          perPage={perPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </Layout>
  );
};

export default HomePage;
