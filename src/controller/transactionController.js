import {
  error_RC,
  success_RC,
  SUCCESS,
  UNPAID,
} from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  createTransactionDetailRepository,
  createTransactionHeaderRepository,
} from "../repository/transactionRepository.js";
import { uid } from "uid";

export const createTransaction = async (request, response) => {
  try {
    const date = new Date();
    const transaction_id = uid(16);
    const header_request = {
      transaction_id: transaction_id,
      trx_status: UNPAID,
      branch_id: request.body.header.branch_id,
      customer_name: request.body.header.customer_name,
      total_quantity: request.body.header.total_quantity,
      updated_by: request.body.header.created_by,
      updated_at: date,
      created_by: request.body.header.created_by,
      created_at: date,
    };
    const header_result = await createTransactionHeaderRepository(
      header_request
    );

    let detail_request = [];
    await request.body.detail.map((value) => {
      let array = [
        transaction_id,
        value.product_id,
        value.quantity,
        request.body.header.created_by,
        date,
        request.body.header.created_by,
        date,
      ];
      detail_request.push(array);
    });
    const detail_result = await createTransactionDetailRepository(
      detail_request
    );

    header_result.rows[0].detail = detail_result.rows;

    standardResponse(response, 200, success_RC, SUCCESS, header_result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString(), []);
  }
};
