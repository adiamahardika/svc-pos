import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  createBranchRepository,
  getMaxBranchNumberByMerchant,
} from "../repository/branchRepository.js";

export const createBranch = async (request, response) => {
  try {
    const date = new Date();
    const max_branch_number = await getMaxBranchNumberByMerchant(
      request.body.merchant_id
    );

    const request_data = {
      location: request.body.location,
      merchant_id: request.body.merchant_id,
      branch_address: request.body.branch_address,
      branch_number: parseInt(max_branch_number) + 1,
      provinsi: request.body.provinsi,
      kota: request.body.kota,
      kecamatan: request.body.kecamatan,
      kelurahan: request.body.kelurahan,
      kode_pos: request.body.kode_pos,
      email: request.body.email,
      phone: request.body.phone,
      fax: request.body.fax || "-",
      is_active: "true",
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };

    const result = await createBranchRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
