import express from "express";
import {
  getCity,
  getDistrict,
  getProvince,
  getSubdistrict,
} from "../../controller/locationController.js";
import { createLog } from "../../controller/logController.js";

export const locationRouter = express.Router();

locationRouter
  .get("/get-province", getProvince, createLog)
  .post("/get-city", getCity, createLog)
  .post("/get-district", getDistrict, createLog)
  .post("/get-subdistrict", getSubdistrict, createLog);
