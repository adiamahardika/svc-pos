import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getMerhcantCategoryRespository } from "../repository/merchantCategoryRepository.js";

export const getMerhcantCategory = async (request, response) => {
  try {
    const result = await getMerhcantCategoryRespository();
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
