import { uid } from "uid";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  createCategoryRepository,
  deleteCategoryRepository,
  getCategoryRepository,
  getDetailCategoryRepository,
  updateCategoryRepository,
} from "../repository/categoryRepository.js";

export const getCategory = async (request, response, next) => {
  try {
    const request_data = {
      merchant_id: request.body.merchant_id || "",
      is_active: request.body.is_active || "true",
    };
    const result = await getCategoryRepository(request_data);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const createCategory = async (request, response, next) => {
  try {
    const date = new Date();
    const request_data = {
      id: uid(6),
      name: request.body.name,
      merchant_id: request.body.merchant_id,
      icon: request.body.icon,
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const check_category = await getDetailCategoryRepository(request_data);
    if (check_category.rows.length === 0) {
      const result = await createCategoryRepository(request_data);
      standardResponse(response, next, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(
        response,
        next,
        400,
        error_RC,
        "Kategori ini sudah dibuat!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const updateCategory = async (request, response, next) => {
  try {
    const date = new Date();
    const category_id = request.params.category_id;
    const request_data = {
      name: request.body.name,
      icon: request.body.icon,
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const result = await updateCategoryRepository(request_data, category_id);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const deleteCategory = async (request, response, next) => {
  try {
    const category_id = request.params.category_id;
    const request_data = {
      is_active: "false",
    };
    const result = await deleteCategoryRepository(request_data, category_id);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};
