import express from "express";
import { login, register } from "../../controller/authController.js";

export const authRouter = express.Router();

authRouter.post("/register", register).post("/login", login);
