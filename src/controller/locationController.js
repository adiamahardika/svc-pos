import { error_RC, success_RC, SUCCESS } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getProvinceRepository } from "../repository/locationRepository.js";

export const getProvince = async (request, response) => {
  try {
    const result = await getProvinceRepository();
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
