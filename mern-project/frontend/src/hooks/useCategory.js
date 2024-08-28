import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

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

  return categories;
};
