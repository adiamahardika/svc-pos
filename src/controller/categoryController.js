import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  createCategoryRepository,
  getCategoryRepository,
} from "../repository/categoryRepository.js";

export const getCategory = async (request, response) => {
  try {
    const request_data = {
      merchant_id: request.body.merchant_id || "",
    };
    const result = await getCategoryRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString(), []);
  }
};

export const createCategory = async (request, response) => {
  try {
    const date = new Date();
    const request_data = {
      name: request.body.name,
      merchant_id: request.body.merchant_id,
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const result = await createCategoryRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString(), []);
  }
};
