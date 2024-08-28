import { categoryModel } from "../models/categoryModel.js";
import slugify from "slugify";

export const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "All category list", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting all category",
      error,
    });
  }
};

export const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug: slug });
    res.status(200).send({
      success: true,
      message: "Get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "single category error",
      error,
    });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(401)
        .send({ success: true, message: "Name is required" });
    }

    const isExistCategory = await categoryModel.findOne({ name });
    if (isExistCategory) {
      return res.status(200).send({
        success: true,
        message: "category already exist",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category Successfully Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Successfully Update",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating category",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Delete category successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Delete category error",
      error,
    });
  }
};
