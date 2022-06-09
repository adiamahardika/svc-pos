import express from "express";
import {
  authentication,
  authorization,
} from "../../controller/authController.js";
import { createLog } from "../../controller/logController.js";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getBranchProduct,
} from "../../controller/productController.js";
import { uploadImages } from "../../helpers/uploadFiles.js";

export const productRouter = express.Router();

productRouter
  .post("/get-product", authentication, authorization, getProduct, createLog)
  .post(
    "/create-product",
    authentication,
    authorization,
    uploadImages,
    createProduct,
    createLog
  )
  .put(
    "/update-product/:product_id",
    authentication,
    authorization,
    uploadImages,
    updateProduct,
    createLog
  )
  .delete(
    "/delete-product/:product_id",
    authentication,
    authorization,
    deleteProduct,
    createLog
  )
  .post(
    "/get-branch-product",
    authentication,
    authorization,
    getBranchProduct,
    createLog
  );
