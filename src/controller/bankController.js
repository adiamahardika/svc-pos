import { error_RC, success_RC, SUCCESS } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getBankRepository } from "../repository/bankRepository.js";

export const getBank = async (request, response) => {
  try {
    const request_data = {
      search: request.body.search.toUpperCase() || "",
    };
    const result = await getBankRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
