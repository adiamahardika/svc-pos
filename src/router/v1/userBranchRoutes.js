import express from "express";
import {
  createUserBranch,
  getUserBranch,
} from "../../controller/userBranchController.js";

export const userBranchRouter = express.Router();

userBranchRouter
  .post("/create-user-branch", createUserBranch)
  .post("/get-user-branch", getUserBranch);
