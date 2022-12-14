import { uid } from "uid";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  createRoleRepository,
  deleteRoleRepository,
  getRoleRepository,
  updateRoleRepository,
} from "../repository/roleRepository.js";

export const getRole = async (request, response, next) => {
  try {
    const request_data = {
      search: request.body.search || "",
      is_active: request.body.is_active || "true",
    };
    const result = await getRoleRepository(request_data);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const createRole = async (request, response, next) => {
  try {
    const date = new Date();
    const request_data = {
      id: uid(6),
      name: request.body.name,
      level: request.body.level,
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const result = await createRoleRepository(request_data);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const updateRole = async (request, response, next) => {
  try {
    const date = new Date();
    const role_id = request.body.role_id;
    const request_data = {
      name: request.body.name,
      is_active: "true",
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const result = await updateRoleRepository(request_data, role_id);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const deleteRole = async (request, response, next) => {
  try {
    const role_id = request.params.role_id;
    const request_data = {
      is_active: "false",
    };
    const result = await deleteRoleRepository(request_data, role_id);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};
