import bcrypt from "bcrypt";
import { uid } from "uid";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getDetailBranchRepository } from "../repository/branchRepository.js";
import { getDetailMerchantRepository } from "../repository/merchantRepository.js";
import {
  changePasswordUserBranchRepository,
  countUserBranchByBranch,
  createUserBranchRepository,
  deleteUserBranchRepository,
  getDetailUserBranchRepository,
  getUserBranchRepository,
  updateUserBranchRepository,
} from "../repository/userBranchRepository.js";

export const createUserBranch = async (request, response) => {
  try {
    const date = new Date();
    const salt_rounds = 10;

    const hash = bcrypt.hashSync(request.body.password, salt_rounds);
    const detail_merchant = await getDetailMerchantRepository(
      request.body.merchant_id
    );
    const detail_branch = await getDetailBranchRepository(
      request.body.branch_id
    );
    let count_user_branch = await countUserBranchByBranch(
      request.body.branch_id
    );

    let get_branch_number = detail_branch.rows[0].branch_number.toString();
    if (get_branch_number.length === 1) {
      get_branch_number = "000" + get_branch_number;
    } else if (get_branch_number.length === 2) {
      get_branch_number = "00" + get_branch_number;
    } else if (get_branch_number.length === 3) {
      get_branch_number = "0" + get_branch_number;
    }

    let last_user_branch = parseInt(count_user_branch) + 1;
    if (last_user_branch.toString().length === 1) {
      count_user_branch = "0" + last_user_branch;
    } else {
      count_user_branch = last_user_branch;
    }

    const user_code =
      detail_merchant.rows[0].merchant_code +
      get_branch_number +
      count_user_branch;

    const request_data = {
      id: uid(6),
      user_code: user_code,
      hash_password: hash,
      branch_id: request.body.branch_id,
      merchant_id: request.body.merchant_id,
      role_id: request.body.role_id,
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };
    const result = await createUserBranchRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getUserBranch = async (request, response) => {
  try {
    const request_data = {
      search: request.body.search || "",
      merchant_id: request.body.merchant_id || "",
      branch_id: request.body.branch_id || "",
      role_id: request.body.role_id || "",
      is_active: request.body.is_active || "true",
    };
    const result = await getUserBranchRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const updateUserBranch = async (request, response) => {
  try {
    const date = new Date();
    const user_branch_id = request.body.user_branch_id;
    const request_data = {
      role_id: request.body.role_id,
      is_active: request.body.is_active || "true",
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const result = await updateUserBranchRepository(
      request_data,
      user_branch_id
    );
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const deleteUserBranch = async (request, response) => {
  try {
    const user_branch_id = request.params.user_branch_id;
    const request_data = {
      is_active: "false",
    };

    const result = await deleteUserBranchRepository(
      request_data,
      user_branch_id
    );
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const changePasswordUserBranch = async (request, response) => {
  try {
    const date = new Date();
    const user_code = request.body.user_code;
    let request_data = {
      new_password: request.body.new_password,
      old_password: request.body.old_password,
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const user_check = await getDetailUserBranchRepository(user_code);
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
      const result = await changePasswordUserBranchRepository(
        request_data,
        user_code
      );
      standardResponse(response, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(response, 200, error_RC, "Password lama anda salah!");
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
