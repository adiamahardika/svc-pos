import bcrypt from "bcrypt";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { emailCheckRepository } from "../repository/authRepository.js";
import { changePasswordUserBranchRepository } from "../repository/userBranchRepository.js";
import {
  changePasswordUserRepository,
  countUser,
  getUserRepository,
} from "../repository/userRepository.js";

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
      total_pages,
      total_data
    );
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const changePasswordUser = async (request, response) => {
  try {
    const date = new Date();
    let request_data = {
      email: request.body.email,
      new_password: request.body.new_password,
      old_password: request.body.old_password,
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const user_check = await emailCheckRepository(request_data);
    const match = await bcrypt.compare(
      request_data.old_password,
      user_check.rows[0].hash_password
    );
    if (match) {
      const salt_rounds = 10;
      const hash = bcrypt.hashSync(request_data.new_password, salt_rounds);
      request_data = {
        ...request_data,
        hash_password: hash,
      };
      const result = await changePasswordUserRepository(
        request_data,
        request_data.email
      );
      standardResponse(response, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(
        response,
        200,
        error_RC,
        "Your old password is invalid!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
