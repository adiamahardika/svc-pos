import express from "express";
import {
  authentication,
  authorization,
  confirmEmail,
  confirmPhoneNumber,
  login,
  refreshToken,
  register,
  verifyEmail,
  verifyPhoneNumber,
} from "../../controller/authController.js";
import { createLog } from "../../controller/logController.js";
import { uploadKtp } from "../../helpers/uploadFiles.js";

export const authRouter = express.Router();

authRouter
  .post("/register", uploadKtp, register, createLog)
  .post("/login", login, createLog)
  .get("/refresh-token", authentication, authorization, refreshToken, createLog)
  .post("/verify-email", verifyEmail, createLog)
  .get("/confirm-email/:token", confirmEmail, createLog)
  .post("/verify-phone-number", verifyPhoneNumber, createLog)
  .post("/confirm-phone-number", confirmPhoneNumber, createLog);
