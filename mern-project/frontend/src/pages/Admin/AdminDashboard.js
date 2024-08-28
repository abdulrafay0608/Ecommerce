import React from "react";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout>
      Admin dashboard
      <div
        style={{ display: "flex", flexDirection: "column", fontSize: "18px" }}
      >
        <Link to={"create-category"}>Create Category</Link>
        <Link to={"create-product"}>Create Product</Link>
        <Link to={"users"}>User</Link>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
