import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { countUser, getUserRepository } from "../repository/userRepository.js";

export const getUser = async (request, response) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 12;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search || "",
      role_id: request.body.role_id || "",
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countUser(request_data);
    const total_pages = Math.ceil(total_data / limit);
    const result = await getUserRepository(request_data);

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
