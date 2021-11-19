import express from "express";
import {
  createUserBranch,
  deleteUserBranch,
  getUserBranch,
  updateUserBranch,
} from "../../controller/userBranchController.js";

export const userBranchRouter = express.Router();

userBranchRouter
  .post("/create-user-branch", createUserBranch)
  .post("/get-user-branch", getUserBranch)
  .put("/update-user-branch", updateUserBranch)
  .delete("/delete-user-branch/:user_branch_id", deleteUserBranch);
