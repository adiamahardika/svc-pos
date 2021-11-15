import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getRoleRepository } from "../repository/roleRepository.js";

export const getRole = async (request, response) => {
  try {
    const request_data = {
      search: request.body.search || "",
      is_active: request.body.is_active || "true",
    };
    const result = await getRoleRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString(), []);
  }
};
