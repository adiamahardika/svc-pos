import {
  error_RC,
  success_desc,
  success_RC,
} from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getProductModel } from "../model/productModel.js";

export const getProduct = async (request, response) => {
  try {
    const result = await getProductModel();
    standardResponse(response, 200, success_RC, success_desc, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error, {});
  }
};
