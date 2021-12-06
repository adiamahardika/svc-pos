import express from "express";
import { getCity, getProvince } from "../../controller/locationController.js";

export const locationRouter = express.Router();

locationRouter.get("/get-province", getProvince).post("/get-city", getCity);
