import { host } from "../configs/index.js";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  countBranchProduct,
  createBranchProductRepository,
  deleteBranchProductRepository,
  getBranchProductRepository,
  updateBranchProductRepository,
} from "../repository/branchHasProductRepository.js";

export const getBranchProduct = async (request, response, next) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 12;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search || "",
      merchant_id: request.body.merchant_id || "",
      branch_id: request.body.branch_id || "",
      category_id: request.body.category_id || "",
      order_by: request.body.order_by || "asc",
      sort_by: request.body.sort_by || "name",
      is_active: request.body.is_active || "true",
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countBranchProduct(request_data);
    const total_pages = Math.ceil(total_data / limit);
    const result = await getBranchProductRepository(request_data);
    await result.rows.map((value) => {
      value.image = host + "assets/" + value.image;
    });

    standardResponse(
      response,
      next,
      200,
      success_RC,
      SUCCESS,
      result,
      active_page,
      total_pages,
      total_data
    );
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString(), []);
  }
};

export const createBranchProduct = async (request, response, next) => {
  try {
    const date = new Date();

    const request_data = {
      product_id: request.body.product_id,
      branch_id: request.body.branch_id,
      quantity: request.body.quantity,
      branch_price: request.body.branch_price,
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const result = await createBranchProductRepository(request_data);

    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString(), []);
  }
};

export const deleteBranchProduct = async (request, response, next) => {
  try {
    const id = request.params.id;
    const result = await deleteBranchProductRepository(id);

    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString(), []);
  }
};

export const updateBranchProduct = async (request, response, next) => {
  try {
    const id = request.params.id;
    const date = new Date();

    const request_data = {
      quantity: request.body.quantity,
      branch_price: request.body.branch_price,
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const result = await updateBranchProductRepository(request_data, id);

    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString(), []);
  }
};
