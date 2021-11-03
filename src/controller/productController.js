import {
  error_RC,
  success_desc,
  success_RC,
} from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  countProduct,
  createProductRepository,
  getProductRepository,
} from "../repository/productRepository.js";

export const getProduct = async (request, response) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 12;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search || "",
      merchant_id: request.body.merchant_id || "",
      branch_id: request.body.branch_id || "",
      category_id: request.body.category_id || "",
      order_by: request.body.order_by || "name",
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countProduct(request_data);
    const total_pages = Math.ceil(total_data / limit);
    const result = await getProductRepository(request_data);
    standardResponse(
      response,
      200,
      success_RC,
      success_desc,
      result,
      active_page,
      total_pages
    );
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString(), []);
  }
};

export const createProduct = async (request, response) => {
  try {
    const date = new Date();
    const request_data = {
      name: request.body.name,
      merchant_id: request.body.merchant_id,
      category_id: request.body.category_id,
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const result = await createProductRepository(request_data);
    standardResponse(response, 200, success_RC, success_desc, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString(), []);
  }
};
