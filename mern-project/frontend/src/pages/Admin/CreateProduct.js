import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // getAllProduct();
    getAllCatgory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const product = new FormData();
      product.append("name", title);
      product.append("description", description);
      product.append("price", price);
      product.append("quantity", quantity);
      product.append("category", category);
      product.append("photo", photo);
      const { data } = await axios.post("/api/product/create-product", product);
      if (data.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  // const getAllProduct = async () => {
  //   try {
  //     const { data } = await axios.post("/api/product/create-product", {});
  //     // if (data.success) {
  //     //   setCategories(data?.category);
  //     // }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //     console.log(`Something went wrong ${error}`);
  //   }
  // };

  const getAllCatgory = async () => {
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

  return (
    <Layout title={"Dashboard - Create Product"}>
      <form onSubmit={handleCreate} className="px-5">
        <div className="py-2">
          <div className="py-4">Create Products page</div>

          <Select
            className="btn-outline-primary form-select mb-3"
            onChange={(value) => {
              setCategory(value);
            }}
            variant={false}
            placeholder="Select your category"
            showSearch
            size="large"
          >
            {categories.map((c, i) => {
              return (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              );
            })}
          </Select>
        </div>

        <div className="mb-3">
          <label className="btn btn-outline-secondary w-100">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          <div>
            <img
              src={`${
                photo == ""
                  ? "https://lh3.googleusercontent.com/proxy/7ckj0fo00gv57VZ5B1D8vP-mHfMWfqaFpo3xZzjwuoNOVuffIWMVMzA_0xcuC7UCNFC3sc4vOLsu6NT7Uu0IV8onv7cjdOvuehp7bVUjF41nFYqrR0tftW5SZ7U06RHjnmJgiXAtRhBg_A"
                  : URL.createObjectURL(photo)
              }`}
              height={"150px"}
              width={"150px"}
              className="rounded-3 img img-responsive"
            />
          </div>
        </div>

        <div className="mb-3">
          <input
            placeholder="Write a product Title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </div>
        <textarea
          placeholder="Write a Product Description"
          rows={3}
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
          className="form-control mb-3"
        ></textarea>
        <div className="mb-3">
          <input
            placeholder="Write a product price"
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Write a product Quantity"
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            required
          />
        </div>
        <Select
          className="btn-outline-primary form-select mb-3"
          onChange={(e) => {
            setShipping(e);
          }}
          variant={false}
          placeholder="Select your Shipping"
          showSearch
          size="large"
        >
          <Option value="0">Yes</Option>
          <Option value="1">No</Option>
        </Select>
        <button className="btn btn-primary">Create Product</button>
      </form>
    </Layout>
  );
};

export default CreateProduct;
