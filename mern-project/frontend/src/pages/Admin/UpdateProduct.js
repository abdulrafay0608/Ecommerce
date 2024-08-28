import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  console.log(category);
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/get-product/${slug}`);
      console.log(data);
      setId(data.products._id);
      //   console.log(data.products.category.name);
      setCategory(data.products.category.name);
      setTitle(data.products.name);
      setDescription(data.products.description);
      setPrice(data.products.price);
      setQuantity(data.products.quantity);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  useEffect(() => {
    // console.log(category.name);
    getAllCatgory();
    getSingleProduct();
  }, []);

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
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const product = new FormData();
      product.append("name", title);
      product.append("description", description);
      product.append("price", price);
      product.append("quantity", quantity);
      product.append("category", category);
      product.append("photo", photo);
      product.append("photo", photo);
      const { data } = await axios.put(
        `/api/product/update-product/${id}`,
        product
      );
      if (data.success) {
        toast.success("Product Update Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  const handleDeleted = async (e) => {
    e.preventDefault();
    try {
      let answer = window.prompt("you are sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(`/api/product/delete-product/${id}`);
      if (data.success) {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <form className="px-5">
        <div className="py-2">
          <div className="py-4">Create Products page</div>

          <Select
            className="btn-outline-primary form-select mb-3"
            variant={false}
            placeholder="Select your category"
            showSearch
            size="large"
            onChange={(value) => {
              setCategory(value);
            }}
            value={category}
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
        <div className="text-center mb-3">
          <div>
            <img
              src={`${
                photo == ""
                  ? `/api/product/product-photo/${id}`
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
          value={shipping ? "Yes" : "NO"}
        >
          <Option value="0">Yes</Option>
          <Option value="1">No</Option>
        </Select>
        <button onClick={handleUpdate} className="btn btn-primary">
          Update Product
        </button>
        <button onClick={handleDeleted} className="btn btn-danger mx-5">
          Deleted Product
        </button>
      </form>
    </Layout>
  );
};

export default UpdateProduct;
