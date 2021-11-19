import bcrypt from "bcrypt";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getDetailBranchRepository } from "../repository/branchRepository.js";
import { getDetailMerchantRepository } from "../repository/merchantRepository.js";
import {
  countUserBranchByBranch,
  createUserBranchRepository,
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
    const count_user_branch = await countUserBranchByBranch(
      request.body.branch_id
    );
    const user_code =
      detail_merchant.rows[0].merchant_code +
      "." +
      detail_branch.rows[0].branch_number +
      "." +
      (parseInt(count_user_branch, 10) + 1);

    const request_data = {
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
