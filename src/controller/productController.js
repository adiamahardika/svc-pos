import {
  error_RC,
  success_desc,
  success_RC,
} from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getProductRepository } from "../repository/productRepository.js";

export const getProduct = async (request, response) => {
  try {
    const request_data = {
      search: request.body.search || "",
      merchant_id: request.body.merchant_id || "",
      branch_id: request.body.branch_id || "",
      category_id: request.body.category_id || "",
    };
    const result = await getProductRepository(request_data);
    standardResponse(response, 200, success_RC, success_desc, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error, {});
  }
};
