import express from "express";
import { isAdmin, requireSignIn } from "../middelwares/authMiddelware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productFilterController,
  productPhotoController,
  productSearchController,
  relatedProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// all product get
router.get("/get-product", getProductController);

// single product get
router.get("/get-product/:slug", getSingleProductController);

// product photo
router.get("/product-photo/:pid", productPhotoController);

// product photo
router.delete("/delete-product/:pid", deleteProductController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);


// filter product
router.post("/filters-product", productFilterController);

// search product
router.get("/search/:keyword", productSearchController);

// related product
router.get("/related-products/:pid/:cid", relatedProductController);

// category product
router.get("/product-category/:slug", productCategoryController);

export default router;
