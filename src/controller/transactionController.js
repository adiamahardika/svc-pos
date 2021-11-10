import {
  error_RC,
  success_RC,
  SUCCESS,
  UNPAID,
} from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  countTransaction,
  createTransactionDetailRepository,
  createTransactionHeaderRepository,
  getDetailTransactionDetailRepository,
  getDetailTransactionHeaderRepository,
  getTransactionHeaderRepository,
  getTrxHasInvoice,
} from "../repository/transactionRepository.js";
import { uid } from "uid";
import { host } from "../configs/index.js";

export const createTransaction = async (request, response) => {
  try {
    const new_date = new Date();
    const date = new_date.toLocaleString();
    const transaction_id = uid(16);
    const header_request = {
      transaction_id: transaction_id,
      trx_status: UNPAID,
      branch_id: request.body.header.branch_id,
      customer_name: request.body.header.customer_name,
      total_quantity: request.body.header.total_quantity,
      total_price: request.body.header.total_price,
      trx_type: request.body.header.trx_type,
      updated_by: request.body.header.created_by,
      updated_at: date,
      created_by: request.body.header.created_by,
      created_at: date,
    };
    // Insert to transaction_hader
    const header_result = await createTransactionHeaderRepository(
      header_request
    );

    let detail_request = [];
    await request.body.detail.map((value) => {
      let array = [
        transaction_id,
        value.product_id,
        value.quantity,
        value.price,
        request.body.header.created_by,
        date,
        request.body.header.created_by,
        date,
      ];
      detail_request.push(array);
    });
    // Insert to transaction_detail
    const detail_result = await createTransactionDetailRepository(
      detail_request
    );

    header_result.rows[0].detail = detail_result.rows;

    standardResponse(response, 200, success_RC, SUCCESS, header_result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getTransaction = async (request, response) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 12;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search || "",
      branch_id: request.body.branch_id || "",
      trx_type: request.body.trx_type || "",
      trx_status: request.body.trx_status || "",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
      order_by: request.body.order_by || "created_date",
      sort_by: request.body.sort_by || "DESC",
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countTransaction(request_data);
    const total_pages = Math.ceil(total_data / limit);
    const result = await getTransactionHeaderRepository(request_data);

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

export const getDetailTransaction = async (request, response) => {
  try {
    const transaction_id = request.params.transaction_id;

    const result = await getDetailTransactionHeaderRepository(transaction_id);
    const detail_result = await getDetailTransactionDetailRepository(
      transaction_id
    );
    const payment_list = await getTrxHasInvoice(transaction_id);

    await detail_result.rows.map((value) => {
      value.product_image = host + "assets/" + value.product_image;
    });
    result.rows[0] = {
      ...result.rows[0],
      detail: detail_result.rows,
      payment_list: payment_list.rows,
    };

    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
