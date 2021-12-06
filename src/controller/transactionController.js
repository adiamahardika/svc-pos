import {
  error_RC,
  success_RC,
  SUCCESS,
  UNPAID,
} from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  countTransaction,
  countTransactionByBranchAndDate,
  createTransactionDetailRepository,
  createTransactionHeaderRepository,
  deleteTransactionDetailRepository,
  getDetailTransactionDetailRepository,
  getDetailTransactionHeaderRepository,
  getTransactionHeaderRepository,
  getTrxHasInvoice,
  updateTransactionHeaderRepository,
  updateTransactionStatusRepository,
} from "../repository/transactionRepository.js";
import { host } from "../configs/index.js";
import { getDetailMerchantRepository } from "../repository/merchantRepository.js";
import { getDetailBranchRepository } from "../repository/branchRepository.js";
import { parseFullDate, parseShortDate } from "../helpers/index.js";

export const createTransaction = async (request, response) => {
  try {
    const new_date = new Date();
    const local_date =
      parseFullDate(new_date) + " " + new_date.toLocaleTimeString();

    const count_request = {
      branch_id: request.body.header.branch_id,
      start: parseFullDate(new_date),
      end: parseFullDate(new_date) + " 23:59:59",
    };
    let count_transaction = await countTransactionByBranchAndDate(
      count_request
    );
    const detail_merchant = await getDetailMerchantRepository(
      request.body.header.merchant_id
    );
    const detail_branch = await getDetailBranchRepository(
      request.body.header.branch_id
    );

    let get_branch_number = detail_branch.rows[0].branch_number.toString();
    if (get_branch_number.length === 1) {
      get_branch_number = "000" + get_branch_number;
    } else if (get_branch_number.length === 2) {
      get_branch_number = "00" + get_branch_number;
    } else if (get_branch_number.length === 3) {
      get_branch_number = "0" + get_branch_number;
    }

    if (count_transaction.length === 1) {
      count_transaction = "000" + (parseInt(count_transaction) + 1);
    } else if (count_transaction.length === 2) {
      count_transaction = "00" + (parseInt(count_transaction) + 1);
    } else if (count_transaction.length === 3) {
      count_transaction = "0" + (parseInt(count_transaction) + 1);
    }

    const transaction_id =
      detail_merchant.rows[0].merchant_code +
      "-" +
      get_branch_number +
      "-" +
      parseShortDate(new_date) +
      "-" +
      count_transaction;
    console.log(transaction_id);
    // const header_request = {
    //   transaction_id: transaction_id,
    //   trx_status: UNPAID,
    //   branch_id: request.body.header.branch_id,
    //   merchant_id: request.body.header.merchant_id,
    //   customer_name: request.body.header.customer_name,
    //   total_quantity: request.body.header.total_quantity,
    //   total_price: request.body.header.total_price,
    //   trx_type: request.body.header.trx_type,
    //   updated_by: request.body.header.created_by,
    //   updated_at: new_date,
    //   created_by: request.body.header.created_by,
    //   created_at: new_date,
    // };
    // // Insert to transaction_hader
    // const header_result = await createTransactionHeaderRepository(
    //   header_request
    // );

    // let detail_request = [];
    // await request.body.detail.map((value) => {
    //   let array = [
    //     transaction_id,
    //     value.product_id,
    //     value.quantity,
    //     value.price,
    //     request.body.header.created_by,
    //     local_date,
    //     request.body.header.created_by,
    //     local_date,
    //   ];
    //   detail_request.push(array);
    // });
    // // Insert to transaction_detail
    // const detail_result = await createTransactionDetailRepository(
    //   detail_request
    // );

    // header_result.rows[0].detail = detail_result.rows;

    // standardResponse(response, 200, success_RC, SUCCESS, header_result);
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
      merchant_id: request.body.merchant_id || "",
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
      total_pages,
      total_data
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

export const updateTransactionStatus = async (request, response) => {
  try {
    const date = new Date();
    const transaction_id = request.body.transaction_id;
    const request_data = {
      trx_status: request.body.trx_status.toUpperCase(),
      updated_by: request.body.updated_by,
      updated_at: date,
    };

    const result = await updateTransactionStatusRepository(
      request_data,
      transaction_id
    );
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const updateTransaction = async (request, response) => {
  try {
    const date = new Date();
    const transaction_id = request.body.header.transaction_id;
    const header_request = {
      total_quantity: request.body.header.total_quantity,
      total_price: request.body.header.total_price,
      trx_type: request.body.header.trx_type,
      updated_by: request.body.header.updated_by,
      updated_at: date,
    };
    // Update to transaction_header
    const header_result = await updateTransactionHeaderRepository(
      header_request,
      transaction_id
    );

    // Delete product list in transaction_detail
    await deleteTransactionDetailRepository(transaction_id);

    let detail_request = [];
    await request.body.detail.map((value) => {
      let array = [
        transaction_id,
        value.product_id,
        value.quantity,
        value.price,
        request.body.header.updated_by,
        date,
        request.body.header.updated_by,
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
