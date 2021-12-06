import { error_RC, SUCCESS, success_RC } from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { updateBankAccountRepository } from "../repository/bankAccountRepository.js";

export const updateBankAccount = async (request, response) => {
  try {
    const date = new Date();
    const ba_id = request.body.ba_id;
    const request_data = {
      bank_id: request.body.bank_id,
      nasabah: request.body.nasabah,
      no_rekening: request.body.no_rekening,
      updated_by: request.body.updated_by,
      updated_at: date,
    };

    const result = await updateBankAccountRepository(request_data, ba_id);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
