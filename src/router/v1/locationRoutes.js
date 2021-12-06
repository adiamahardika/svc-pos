import express from "express";
import { getProvince } from "../../controller/locationController.js";

export const locationRouter = express.Router();

locationRouter.get("/get-province", getProvince);
