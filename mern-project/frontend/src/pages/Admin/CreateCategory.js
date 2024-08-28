import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/CategoryForm";
import { Button, Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [selectId, setSelectId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllCatgory();
  }, []);

  const createCatgory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/category/create-category", {
        name,
      });
      if (data.success) {
        toast.success(`${name} is created`);
        setName("")
        getAllCatgory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

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

  const editCategory = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.put(
        `/api/category/update-category/${selectId}`,
        { name: updateName }
      );

      if (data.success) {
        toast.success(`${updateName} is updated`);
        setOpen(false);
        setSelectId(null);
        setUpdateName("");
        getAllCatgory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`/api/category/delete-category/${id}`);
      if(data.success){
        toast.success(`${data.message}`)
        getAllCatgory()
      }
      console.log(id);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
  };

  return (
    <Layout tittle={"Dashboard - Create Category"}>
      <div className="px-5 py-2">
        <div className="py-4">Create Category page</div>
        <CategoryForm
          handleSubmit={createCatgory}
          setValue={setName}
          value={name}
        />
      </div>
      <div className="p-5">
        <table className="table  w-100 rounded ">
          <thead className="fs-4 font-weight-bold  text-white">
            <tr>
              <th className="text-center w-50 border-success py-3">
                Category Name
              </th>
              <th className="text-center w-25 border-success py-3">
                Category Slug
              </th>
              <th className="text-center w-25 border-success py-3">Action</th>
            </tr>
          </thead>
          <tbody className="fs-6">
            {categories.map((items, i) => {
              return (
                <tr key={i}>
                  <td className="text-nowrap border-success p-2 text-center">
                    {items.name}
                  </td>
                  <td className="text-nowrap border-success p-2 text-center">
                    {items.slug}
                  </td>
                  <td className="text-nowrap border-success p-2 text-center">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setOpen(true);
                        setUpdateName(items.name);
                        setSelectId(items._id);
                      }}
                    >
                      Edited
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCategory(items._id)}
                    >
                      Deleted
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        title="Update Category"
        open={open}
        onCancel={() => setOpen(false)}
      >
        <CategoryForm
          value={updateName}
          setValue={setUpdateName}
          handleSubmit={editCategory}
        />
      </Modal>
    </Layout>
  );
};

export default CreateCategory;
