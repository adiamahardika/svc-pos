import { error_RC, success_RC, SUCCESS } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  getCityRepository,
  getDistrictRepository,
  getProvinceRepository,
  getSubdistrictRepository,
} from "../repository/locationRepository.js";

export const getProvince = async (request, response) => {
  try {
    const result = await getProvinceRepository();
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getCity = async (request, response) => {
  try {
    const request_data = {
      prov_id: request.body.prov_id,
      prov_name: request.body.prov_name || "",
    };
    const result = await getCityRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getDistrict = async (request, response) => {
  try {
    const request_data = {
      city_id: request.body.city_id,
      city_name: request.body.city_name || "",
    };
    const result = await getDistrictRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getSubdistrict = async (request, response) => {
  try {
    const request_data = {
      dis_id: request.body.dis_id,
      dis_name: request.body.dis_name || "",
    };
    const result = await getSubdistrictRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
