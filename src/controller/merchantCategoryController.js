import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  createMerchantCategoryRepository,
  getMerhcantCategoryRespository,
} from "../repository/merchantCategoryRepository.js";

export const getMerhcantCategory = async (request, response) => {
  try {
    const result = await getMerhcantCategoryRespository();
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const createMerchantCategory = async (request, response) => {
  try {
    const date = new Date();
    const request_data = {
      name: request.body.name,
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const result = await createMerchantCategoryRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
