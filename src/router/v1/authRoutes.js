import express from "express";
import { login, register } from "../../controller/authController.js";
import { uploadKtp } from "../../helpers/uploadFiles.js";

export const authRouter = express.Router();

authRouter.post("/register", uploadKtp, register).post("/login", login);
