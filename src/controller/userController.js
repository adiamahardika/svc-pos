import bcrypt from "bcrypt";
import { host } from "../configs/index.js";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { compress } from "../helpers/uploadFiles.js";
import { emailCheckRepository } from "../repository/authRepository.js";
import {
  changePasswordUserRepository,
  changeUserStatusRepository,
  countUser,
  getDetailUserRepository,
  getUserRepository,
  updateUserRepository,
} from "../repository/userRepository.js";

export const getUser = async (request, response, next) => {
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
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const changePasswordUser = async (request, response, next) => {
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
    request.body.new_password = "*********";
    request.body.old_password = "*********";
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

      standardResponse(response, next, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(
        response,
        next,
        200,
        error_RC,
        "Password lama anda salah!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const updateUser = async (request, response, next) => {
  try {
    const date = new Date();
    const user_id = request.body.user_id;
    let result = null;
    if (!request.file || Object.keys(request.file).length === 0) {
      const request_data = {
        name: request.body.name,
        email: request.body.email,
        no_hp: request.body.no_hp,
        updated_by: request.body.updated_by,
        updated_at: date,
      };
      result = await updateUserRepository(request_data, user_id);
    } else {
      await compress(request.file.path);
      const request_data = {
        name: request.body.name,
        email: request.body.email,
        no_hp: request.body.no_hp,
        ktp: request.file.filename,
        updated_by: request.body.updated_by,
        updated_at: date,
      };
      result = await updateUserRepository(request_data, user_id);
    }

    delete result.rows[0].hash_password;
    result.rows[0] = {
      ...result.rows[0],
      ktp: host + "ktp/" + result.rows[0].ktp,
    };

    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const changeUserStatus = async (request, response, next) => {
  try {
    const date = new Date();
    const user_id = request.body.user_id;
    const request_data = {
      is_active: request.body.is_active,
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const result = await changeUserStatusRepository(request_data, user_id);

    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const getDetailUser = async (request, response, next) => {
  try {
    const user_id = request.params.user_id;
    const result = await getDetailUserRepository(user_id);

    delete result.rows[0].hash_password;
    result.rows[0] = {
      ...result.rows[0],
      ktp: host + "ktp/" + result.rows[0].ktp,
    };

    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};
