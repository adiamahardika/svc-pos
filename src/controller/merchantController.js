import crypto_js from "crypto-js";
import jwt from "jsonwebtoken";
import { uid } from "uid";
import { jwt_secret_key } from "../configs/index.js";
import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { emailCheckRepository } from "../repository/authRepository.js";
import { createBankAccountRepository } from "../repository/bankAccountRepository.js";
import { createBranchRepository } from "../repository/branchRepository.js";
import {
  checkMerchantCode,
  countMerchant,
  createMerchantRepository,
  getDetailMerchantByOwnerRepository,
  getDetailMerchantRepository,
  getMerchantRepository,
  updateMerchantRepository,
} from "../repository/merchantRepository.js";

export const getMerchant = async (request, response, next) => {
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
      total_pages,
      total_data
    );
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const createMerchant = async (request, response, next) => {
  try {
    const check_merchant_by_owner = await getDetailMerchantByOwnerRepository(
      request.body.merchant.user_id
    );
    if (check_merchant_by_owner.rows.length < 1) {
      const date = new Date();
      const merchant_name = request.body.merchant.name;
      const remove_space = await merchant_name
        .replace(/\s+/g, "")
        .toUpperCase();
      const last_three = await remove_space.substring(
        remove_space.length - 3,
        remove_space.length
      );
      const check_merchant_code = await checkMerchantCode(last_three);
      let get_number = await (check_merchant_code.rows.length + 1).toString();
      if (get_number.length == 1) {
        get_number = "00" + get_number;
      } else if (get_number.length == 2) {
        get_number = "0" + get_number;
      }
      const merchant_code = last_three + get_number;

      const bank_account_req = {
        bank_id: request.body.bank_account.bank_id,
        nasabah: request.body.bank_account.nasabah,
        no_rekening: request.body.bank_account.no_rekening,
        updated_by: request.body.merchant.created_by,
        updated_at: date,
        created_by: request.body.merchant.created_by,
        created_at: date,
      };
      const ba_result = await createBankAccountRepository(bank_account_req);

      const request_data = {
        id: uid(6),
        name: merchant_name,
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
        id: uid(6),
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
        telephone: request.body.branch.telephone,
        is_active: "true",
        updated_by: request.body.merchant.created_by,
        updated_at: date,
        created_by: request.body.merchant.created_by,
        created_at: date,
      };
      const branch_result = await createBranchRepository(branch_request);

      const user_request = {
        email: request.body.user.email,
      };
      const email_check = await emailCheckRepository(user_request);
      let user_data = email_check.rows[0];
      const signature_key = crypto_js
        .MD5(user_data.merchant_id + user_data.secret_key)
        .toString();
      const token = jwt.sign(
        { merchant_id: user_data.merchant_id, signature_key: signature_key },
        jwt_secret_key,
        {
          expiresIn: "1h",
        }
      );

      delete user_data.secret_key;
      delete user_data.is_active;
      delete user_data.hash_password;
      delete user_data.created_at;
      delete user_data.created_by;
      delete user_data.updated_at;
      delete user_data.updated_by;

      result.rows[0] = {
        merchant: result.rows[0],
        branch: branch_result.rows[0],
        bank_account: ba_result.rows[0],
        user: {
          ...user_data,
          token: token,
        },
      };

      standardResponse(response, next, 200, success_RC, SUCCESS, result);
    } else {
      standardResponse(
        response,
        400,
        error_RC,
        "User ini sudah memiliki merchant!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const updateMerchant = async (request, response, next) => {
  try {
    const date = new Date();
    const merchant_id = request.body.merchant_id;
    const request_data = {
      name: request.body.name,
      npwp: request.body.npwp,
      mc_id: request.body.mc_id,
      is_active: request.body.is_active || "true",
      updated_by: request.body.updated_by,
      updated_at: date,
    };
    const result = await updateMerchantRepository(request_data, merchant_id);
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};

export const getDetailMerchant = async (request, response, next) => {
  try {
    const merchant_id = request.params.merchant_id;
    const result = await getDetailMerchantRepository(merchant_id);

    delete result.rows[0].secret_key;
    standardResponse(response, next, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, next, 400, error_RC, error.toString());
  }
};
