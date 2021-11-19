import {
  CANCEL,
  cancel_RC,
  error_RC,
  PAID,
  PAYMENT_CASH,
  PAYMENT_CC,
  PAYMENT_DEBIT,
  SUCCESS,
  success_RC,
} from "../helpers/generalConstant.js";
import { parseFullDate, parseShortDate } from "../helpers/index.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getDetailBranchRepository } from "../repository/branchRepository.js";
import { getDetailMerchantRepository } from "../repository/merchantRepository.js";
import {
  createPaymentEdcRepository,
  createPaymentRepository,
  createPaymentCashRepository,
  createInvoiceHasTrxId,
  countPayment,
  getPaymentRepository,
  getDetailPaymentRepository,
  getDetailEdcRepository,
  getDetailCashRepository,
  getInvoiceHasTrx,
  countPaymentByBranchAndDate,
} from "../repository/paymentRepository.js";
import { updateTransactionStatusRepository } from "../repository/transactionRepository.js";

export const createPayment = async (request, response) => {
  try {
    if (
      parseFloat(request.body.submit_amount) >= parseFloat(request.body.amount)
    ) {
      const new_date = new Date();
      const local_date =
        parseFullDate(new_date) + " " + new_date.toLocaleTimeString();
      const count_request = {
        branch_id: request.body.branch_id,
        start: parseFullDate(new_date),
        end: parseFullDate(new_date) + " 23:59:59",
      };
      const count_result = await countPaymentByBranchAndDate(count_request);
      const detail_merchant = await getDetailMerchantRepository(
        request.body.merchant_id
      );
      const detail_branch = await getDetailBranchRepository(
        request.body.branch_id
      );
      const invoice_number =
        "INV/" +
        detail_merchant.rows[0].merchant_code +
        "/" +
        detail_branch.rows[0].branch_number +
        "/" +
        parseShortDate(new_date) +
        "/" +
        (parseInt(count_result, 10) + 1);

      const payment_request = {
        invoice_number: invoice_number,
        payment_method: request.body.payment_method.toUpperCase(),
        amount: request.body.amount,
        submit_amount: request.body.submit_amount,
        submit_amount: request.body.submit_amount,
        status: PAID,
        response_code: success_RC,
        branch_id: request.body.branch_id,
        merchant_id: request.body.merchant_id,
        updated_by: request.body.created_by,
        updated_at: new_date,
        created_by: request.body.created_by,
        created_at: new_date,
      };

      // Insert to lg_payment
      const payment_result = await createPaymentRepository(payment_request);

      let trx_id_list = [];
      await request.body.transaction_id.map(async (transaction_id) => {
        let array = [
          transaction_id,
          invoice_number,
          request.body.created_by,
          local_date,
          request.body.created_by,
          local_date,
        ];
        trx_id_list.push(array);

        const update_trx_req = {
          trx_status: PAID,
          updated_by: request.body.created_by,
          updated_at: new_date,
        };
        if (payment_request.response_code === success_RC) {
          await updateTransactionStatusRepository(
            update_trx_req,
            transaction_id
          );
        }
      });
      await createInvoiceHasTrxId(trx_id_list);

      if (
        request.body.payment_method.toUpperCase() === PAYMENT_CC ||
        request.body.payment_method.toUpperCase() === PAYMENT_DEBIT
      ) {
        const edc_request = {
          invoice_number: invoice_number,
          amount: request.body.amount,
          submit_amount: request.body.submit_amount,
          approval_code: request.body.edc.approval_code,
          bank_name: request.body.edc.bank_name,
          updated_by: request.body.created_by,
          updated_at: new_date,
          created_by: request.body.created_by,
          created_at: new_date,
        };

        const edc_result = await createPaymentEdcRepository(edc_request);
        payment_result.rows[0].detail = edc_result.rows[0];
      } else if (request.body.payment_method.toUpperCase() === PAYMENT_CASH) {
        const cash_request = {
          invoice_number: invoice_number,
          amount: request.body.amount,
          submit_amount: request.body.submit_amount,
          change: request.body.change,
          updated_by: request.body.created_by,
          updated_at: new_date,
          created_by: request.body.created_by,
          created_at: new_date,
        };

        const cash_result = await createPaymentCashRepository(cash_request);
        payment_result.rows[0].detail = cash_result.rows[0];
      }

      standardResponse(response, 200, success_RC, SUCCESS, payment_result);
    } else {
      standardResponse(
        response,
        200,
        error_RC,
        "Your submit amount is not enough!"
      );
    }
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getPayment = async (request, response) => {
  try {
    const active_page = parseInt(request.body.page);
    const limit = parseInt(request.body.limit) || 12;
    const start_index = active_page * limit;
    const request_data = {
      search: request.body.search || "",
      branch_id: request.body.branch_id || "",
      merchant_id: request.body.merchant_id || "",
      payment_method: request.body.payment_method || "",
      status: request.body.status || "",
      response_code: request.body.response_code || "",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
      order_by: request.body.order_by || "created_date",
      sort_by: request.body.sort_by || "DESC",
      start_index: start_index || 0,
      limit: limit,
    };
    const total_data = await countPayment(request_data);
    const total_pages = Math.ceil(total_data / limit);
    const result = await getPaymentRepository(request_data);

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

export const getDetailPayment = async (request, response) => {
  try {
    const invoice_number = request.query.invoice_number;
    const result = await getDetailPaymentRepository(invoice_number);

    let detail = null;
    if (
      result.rows[0].payment_method.toUpperCase() === PAYMENT_CC ||
      result.rows[0].payment_method.toUpperCase() === PAYMENT_DEBIT
    ) {
      detail = await getDetailEdcRepository(invoice_number);
    } else {
      detail = await getDetailCashRepository(invoice_number);
    }

    const transaction_list = await getInvoiceHasTrx(invoice_number);

    result.rows[0] = {
      ...result.rows[0],
      detail: detail.rows[0],
      transaction_list: transaction_list.rows,
    };

    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
