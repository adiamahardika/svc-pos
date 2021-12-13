import { uid } from "uid";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  countBranch,
  createBranchRepository,
  deleteBranchRepository,
  getBranchRepository,
  getMaxBranchNumberByMerchant,
  updateBranchRepository,
} from "../repository/branchRepository.js";

export const createBranch = async (request, response) => {
  try {
    const date = new Date();
    const max_branch_number = await getMaxBranchNumberByMerchant(
      request.body.merchant_id
    );

    const request_data = {
      id: uid(6),
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
      telephone: request.body.telephone || "-",
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

export const updateBranch = async (request, response) => {
  try {
    const date = new Date();
    const branch_id = request.body.branch_id;
    const request_data = {
      location: request.body.location,
      branch_address: request.body.branch_address,
      provinsi: request.body.provinsi,
      kota: request.body.kota,
      kecamatan: request.body.kecamatan,
      kelurahan: request.body.kelurahan,
      kode_pos: request.body.kode_pos,
      email: request.body.email,
      phone: request.body.phone,
      telephone: request.body.telephone || "-",
      updated_by: request.body.updated_by,
      updated_at: date,
    };

    const result = await updateBranchRepository(request_data, branch_id);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getBranch = async (request, response) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 25;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search || "",
      merchant_id: request.body.merchant_id || "",
      order_by: request.body.order_by || "location",
      sort_by: request.body.sort_by || "asc",
      is_active: request.body.is_active || "true",
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countBranch(request_data);
    const total_pages = Math.ceil(total_data / limit);

    const result = await getBranchRepository(request_data);
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

export const deleteBranch = async (request, response) => {
  try {
    const branch_id = request.params.branch_id;
    const request_data = {
      is_active: "false",
    };

    const result = await deleteBranchRepository(request_data, branch_id);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
