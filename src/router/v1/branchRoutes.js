import express from "express";
import {
  createBranch,
  updateBranch,
} from "../../controller/branchController.js";

export const branchRouter = express.Router();

branchRouter
  .post("/create-branch", createBranch)
  .put("/update-branch", updateBranch);
