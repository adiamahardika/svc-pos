import express from "express";
import {
  getCity,
  getDistrict,
  getProvince,
  getSubdistrict,
} from "../../controller/locationController.js";

export const locationRouter = express.Router();

locationRouter
  .get("/get-province", getProvince)
  .post("/get-city", getCity)
  .post("/get-district", getDistrict)
  .post("/get-subdistrict", getSubdistrict);
