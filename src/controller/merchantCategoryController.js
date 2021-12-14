import { uid } from "uid";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  createMerchantCategoryRepository,
  deleteMerchantCategoryRepository,
  getMerhcantCategoryRespository,
  updateMerchantCategoryRepository,
} from "../repository/merchantCategoryRepository.js";

export const getMerhcantCategory = async (request, response) => {
  try {
    const request_data = {
      is_active: "true",
    };
    const result = await getMerhcantCategoryRespository(request_data);
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
      id: uid(6),
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

export const updateMerchantCategory = async (request, response) => {
  try {
    const date = new Date();
    const mc_id = request.body.mc_id;
    const request_data = {
      name: request.body.name,
      updated_by: request.body.updated_by,
      updated_at: date,
    };

    const result = await updateMerchantCategoryRepository(request_data, mc_id);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const deleteMerchantCategory = async (request, response) => {
  try {
    const mc_id = request.params.mc_id;
    const request_data = {
      is_active: "false",
    };

    const result = await deleteMerchantCategoryRepository(request_data, mc_id);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
