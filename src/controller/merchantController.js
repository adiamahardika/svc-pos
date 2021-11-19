import { uid } from "uid";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { createBankAccountRepository } from "../repository/bankAccountRepository.js";
import {
  createBranchRepository,
  getBranchByMerchantId,
} from "../repository/branchRepository.js";
import {
  checkMerchantCode,
  countMerchant,
  createMerchantRepository,
  getDetailMerchantRepository,
  getMerchantRepository,
  updateMerchantRepository,
} from "../repository/merchantRepository.js";

export const getMerchant = async (request, response) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 25;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search,
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countMerchant(request_data);
    const total_pages = Math.ceil(total_data / limit);
    const result = await getMerchantRepository(request_data);

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

export const createMerchant = async (request, response) => {
  try {
    const date = new Date();
    const merchant_code = request.body.merchant.merchant_code.toUpperCase();
    const check_merchant_code = await checkMerchantCode(merchant_code);
    if (check_merchant_code.rows.length === 0) {
      const bank_account_req = {
        bank_name: request.body.bank_account.bank_name,
        nasabah: request.body.bank_account.nasabah,
        no_rekening: request.body.bank_account.no_rekening,
        updated_by: request.body.merchant.created_by,
        updated_at: date,
        created_by: request.body.merchant.created_by,
        created_at: date,
      };
      const ba_result = await createBankAccountRepository(bank_account_req);

      const request_data = {
        name: request.body.merchant.name,
        owner: request.body.merchant.user_id,
        npwp: request.body.merchant.npwp,
        mc_id: request.body.merchant.mc_id,
        ba_id: ba_result.rows[0].id,
        merchant_code: merchant_code,
        secret_key: merchant_code + "-" + uid(8),
        is_active: "true",
        updated_by: request.body.merchant.created_by,
        updated_at: date,
        created_by: request.body.merchant.created_by,
        created_at: date,
      };
      const result = await createMerchantRepository(request_data);

      const branch_request = {
        location: request.body.branch.location,
        merchant_id: result.rows[0].id,
        branch_address: request.body.branch.branch_address,
        branch_number: 1,
        provinsi: request.body.branch.provinsi,
        kota: request.body.branch.kota,
        kecamatan: request.body.branch.kota,
        kelurahan: request.body.branch.kelurahan,
        kode_pos: request.body.branch.kode_pos,
        email: request.body.branch.email,
        phone: request.body.branch.phone,
        fax: request.body.branch.fax,
        is_active: "true",
        updated_by: request.body.merchant.created_by,
        updated_at: date,
        created_by: request.body.merchant.created_by,
        created_at: date,
      };
      const branch_result = await createBranchRepository(branch_request);

      result.rows[0] = {
        merchant: result.rows[0],
        branch: branch_result.rows[0],
        bank_account: ba_result.rows[0],
      };

      standardResponse(response, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(
        response,
        200,
        error_RC,
        "Another merchant already use that merchant_code!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const updateMerchant = async (request, response) => {
  try {
    const date = new Date();
    const merchant_id = request.body.merchant_id;
    const request_data = {
      name: request.body.name,
      npwp: request.body.npwp,
      is_active: request.body.is_active || "true",
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const result = await updateMerchantRepository(request_data, merchant_id);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getDetailMerchant = async (request, response) => {
  try {
    const merchant_id = request.params.merchant_id;
    const result = await getDetailMerchantRepository(merchant_id);
    const branch_result = await getBranchByMerchantId(merchant_id);

    result.rows[0] = {
      ...result.rows[0],
      branch_list: branch_result.rows,
    };

    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
