import express from "express";
import { createLog } from "../../controller/logController.js";
import {
  changePasswordUserBranch,
  createUserBranch,
  deleteUserBranch,
  getUserBranch,
  updateUserBranch,
} from "../../controller/userBranchController.js";

export const userBranchRouter = express.Router();

userBranchRouter
  .post("/create-user-branch", createUserBranch, createLog)
  .post("/get-user-branch", getUserBranch, createLog)
  .put("/update-user-branch", updateUserBranch, createLog)
  .delete("/delete-user-branch/:user_branch_id", deleteUserBranch, createLog)
  .put("/change-pass-user-branch", changePasswordUserBranch, createLog);
