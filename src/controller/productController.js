import { uid } from "uid";
import { host } from "../configs/index.js";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { compress } from "../helpers/uploadFiles.js";
import { getDetailCategoryByIdRepository } from "../repository/categoryRepository.js";
import { createPriceRepository } from "../repository/priceRepository.js";
import {
  countProduct,
  createProductRepository,
  deleteProductRepository,
  getProductRepository,
  updateProductRepository,
} from "../repository/productRepository.js";

export const getProduct = async (request, response, next) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 12;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search || "",
      merchant_id: request.body.merchant_id || "",
      category_id: request.body.category_id || "",
      order_by: request.body.order_by || "asc",
      sort_by: request.body.sort_by || "name",
      is_active: request.body.is_active || "true",
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countProduct(request_data);
    const total_pages = Math.ceil(total_data / limit);
    const result = await getProductRepository(request_data);
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

export const createProduct = async (request, response, next) => {
  try {
    const date = new Date();
    let file_name = null;
    if (!request.file || Object.keys(request.file).length === 0) {
      file_name = "default_product.jpg";
    } else {
      await compress(request.file.path);
      file_name = request.file.filename;
    }
    const request_data = {
      id: uid(6),
      name: request.body.name ? request.body.name : "",
      merchant_id: request.body.merchant_id,
      category_id: request.body.category_id,
      image: file_name,
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const result = await createProductRepository(request_data);

    const price_request = {
      product_id: result.rows[0].id,
      starting_price: request.body.starting_price
        ? request.body.starting_price
        : 0,
      selling_price: request.body.selling_price
        ? request.body.selling_price
        : 0,
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const price_result = await createPriceRepository(price_request);

    result.rows[0] = {
      ...result.rows[0],
      image: host + "assets/" + result.rows[0].image,
      starting_price: price_result.rows[0].starting_price,
      selling_price: price_result.rows[0].selling_price,
    };

    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString(), []);
  }
};

export const updateProduct = async (request, response, next) => {
  try {
    const date = new Date();
    const product_id = request.params.product_id;
    let result = null;

    if (!request.file || Object.keys(request.file).length === 0) {
      const request_data = {
        name: request.body.name ? request.body.name : "",
        merchant_id: request.body.merchant_id,
        category_id: request.body.category_id,
        updated_by: request.body.updated_by,
        updated_at: date,
      };
      result = await updateProductRepository(request_data, product_id);
    } else {
      await compress(request.file.path);
      const request_data = {
        name: request.body.name ? request.body.name : "",
        merchant_id: request.body.merchant_id,
        category_id: request.body.category_id,
        image: request.file.filename,
        updated_by: request.body.updated_by,
        updated_at: date,
      };
      result = await updateProductRepository(request_data, product_id);
    }
    const get_category = await getDetailCategoryByIdRepository(
      request.body.category_id
    );

    const price_request = {
      product_id: request.params.product_id,
      starting_price: request.body.starting_price
        ? request.body.starting_price
        : 0,
      selling_price: request.body.selling_price
        ? request.body.selling_price
        : 0,
      updated_by: request.body.updated_by,
      updated_at: date,
      created_by: request.body.updated_by,
      created_at: date,
    };
    const price_result = await createPriceRepository(price_request);

    result.rows[0] = {
      ...result.rows[0],
      image: host + "assets/" + result.rows[0].image,
      starting_price: price_result.rows[0].starting_price,
      selling_price: price_result.rows[0].selling_price,
      category: get_category.rows[0].name,
    };

    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString(), []);
  }
};

export const deleteProduct = async (request, response, next) => {
  try {
    const product_id = request.params.product_id;
    const request_data = {
      is_active: "false",
    };
    const result = await deleteProductRepository(request_data, product_id);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString(), []);
  }
};
