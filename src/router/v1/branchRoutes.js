import express from "express";
import {
  createBranch,
  deleteBranch,
  getBranch,
  updateBranch,
} from "../../controller/branchController.js";

export const branchRouter = express.Router();

branchRouter
  .post("/create-branch", createBranch)
  .put("/update-branch", updateBranch)
  .post("/get-branch", getBranch)
  .delete("/delete-branch/:branch_id", deleteBranch);
