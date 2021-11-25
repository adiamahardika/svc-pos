import express from "express";
import {
  authentication,
  authorization,
} from "../../controller/authController.js";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controller/productController.js";
import { uploadImages } from "../../helpers/uploadFiles.js";

export const productRouter = express.Router();

productRouter
  .post("/get-product", authentication, authorization, getProduct)
  .post(
    "/create-product",
    authentication,
    authorization,
    uploadImages,
    createProduct
  )
  .put(
    "/update-product/:product_id",
    authentication,
    authorization,
    uploadImages,
    updateProduct
  )
  .delete(
    "/delete-product/:product_id",
    authentication,
    authorization,
    deleteProduct
  );
