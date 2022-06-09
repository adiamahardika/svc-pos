import express from "express";
import {
  authentication,
  authorization,
} from "../../controller/authController.js";
import { createLog } from "../../controller/logController.js";
import {
  getBranchProduct,
  createBranchProduct,
  deleteBranchProduct,
  updateBranchProduct,
} from "../../controller/branchHasProductController.js";

export const branchHasProductRouter = express.Router();

branchHasProductRouter
  .post("/get", authentication, authorization, getBranchProduct, createLog)
  .post(
    "/create",
    authentication,
    authorization,
    createBranchProduct,
    createLog
  )
  .put(
    "/update/:id",
    authentication,
    authorization,
    updateBranchProduct,
    createLog
  )
  .delete(
    "/delete/:id",
    authentication,
    authorization,
    deleteBranchProduct,
    createLog
  );
