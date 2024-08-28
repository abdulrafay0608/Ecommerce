import axios from "axios";
import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

export const Input = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/product/search/${value.keyword}`);
      setValue({ ...value, results: data });

      console.log(data);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={value.keyword}
        onChange={(e) => setValue({ ...value, keyword: e.target.value })}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};
