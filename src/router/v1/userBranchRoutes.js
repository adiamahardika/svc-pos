import express from "express";
import { createUserBranch } from "../../controller/userBranchController.js";

export const userBranchRouter = express.Router();

userBranchRouter.post("/create-user-branch", createUserBranch);
