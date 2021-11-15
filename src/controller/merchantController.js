import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  checkMerchantCode,
  countMerchant,
  createMerchantRepository,
  getMerchantRepository,
  updateMerchantRepository,
} from "../repository/merchantRepository.js";

export const getMerchant = async (request, response) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 25;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search,
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countMerchant(request_data);
    const total_pages = Math.ceil(total_data / limit);
    const result = await getMerchantRepository(request_data);

    standardResponse(
      response,
      200,
      success_RC,
      SUCCESS,
      result,
      active_page,
      total_pages
    );
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const createMerchant = async (request, response) => {
  try {
    const date = new Date();
    const request_data = {
      name: request.body.name,
      owner: request.body.user_id,
      merchant_code: request.body.merchant_code.toUpperCase(),
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const check_merchant_code = await checkMerchantCode(
      request.body.merchant_code
    );
    if (check_merchant_code.rows.length === 0) {
      const result = await createMerchantRepository(request_data);
      standardResponse(response, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(
        response,
        200,
        error_RC,
        "Another merchant already use that merchant_code!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const updateMerchant = async (request, response) => {
  try {
    const date = new Date();
    const merchant_id = request.body.merchant_id;
    const request_data = {
      name: request.body.name,
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const result = await updateMerchantRepository(request_data, merchant_id);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
