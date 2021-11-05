import express from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controller/productController.js";
import { uploadImages } from "../../helpers/uploadFiles.js";

export const productRouter = express.Router();

productRouter
  .post("/get-product", getProduct)
  .post("/create-product", uploadImages, createProduct)
  .put("/update-product/:product_id", uploadImages, updateProduct)
  .delete("/delete-product/:product_id", deleteProduct);
