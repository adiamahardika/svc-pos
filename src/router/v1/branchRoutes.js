import express from "express";
import { createBranch } from "../../controller/branchController.js";

export const branchRouter = express.Router();

branchRouter.post("/create-branch", createBranch);
