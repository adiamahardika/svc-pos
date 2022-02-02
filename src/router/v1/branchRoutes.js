import express from "express";
import {
  createBranch,
  deleteBranch,
  getBranch,
  updateBranch,
} from "../../controller/branchController.js";
import { createLog } from "../../controller/logController.js";

export const branchRouter = express.Router();

branchRouter
  .post("/create-branch", createBranch, createLog)
  .put("/update-branch", updateBranch, createLog)
  .post("/get-branch", getBranch, createLog)
  .delete("/delete-branch/:branch_id", deleteBranch, createLog);
