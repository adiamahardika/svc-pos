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
import { standardResponse } from "../helpers/standardResponse.js";
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
} from "../repository/paymentRepository.js";
import { updateTrasactionStatusRepository } from "../repository/transactionRepository.js";

export const createPayment = async (request, response) => {
  try {
    const new_date = new Date();
    const date = new_date.toLocaleString();
    const invoice_number = `INV-${new_date.getTime()}`;
    const payment_request = {
      invoice_number: invoice_number,
      payment_method: request.body.payment_method.toUpperCase(),
      amount: request.body.amount,
      submit_amount: request.body.submit_amount,
      submit_amount: request.body.submit_amount,
      status: PAID,
      response_code: success_RC,
      ecr: "-",
      branch_id: request.body.branch_id,
      updated_by: request.body.created_by,
      updated_at: date,
      created_by: request.body.created_by,
      created_at: date,
    };

    if (
      request.body.payment_method.toUpperCase() === PAYMENT_CC ||
      request.body.payment_method.toUpperCase() === PAYMENT_DEBIT
    ) {
      payment_request.response_code = request.body.edc.response_code;
      payment_request.ecr = request.body.edc.ecr;
    } else if (
      request.body.payment_method.toUpperCase() === PAYMENT_CASH &&
      parseFloat(request.body.amount) > parseFloat(request.body.submit_amount)
    ) {
      payment_request.response_code = cancel_RC;
      payment_request.status = CANCEL;
    }
    // Insert to lg_payment
    const payment_result = await createPaymentRepository(payment_request);

    let trx_id_list = [];
    await request.body.transaction_id.map(async (transaction_id) => {
      let array = [
        transaction_id,
        invoice_number,
        request.body.created_by,
        date,
        request.body.created_by,
        date,
      ];
      trx_id_list.push(array);

      const update_trx_req = {
        trx_status: PAID,
        updated_by: request.body.created_by,
        updated_at: date,
      };
      if (payment_request.response_code === success_RC) {
        await updateTrasactionStatusRepository(update_trx_req, transaction_id);
      }
    });
    await createInvoiceHasTrxId(trx_id_list);

    if (
      request.body.payment_method.toUpperCase() === PAYMENT_CC ||
      request.body.payment_method.toUpperCase() === PAYMENT_DEBIT
    ) {
      const ecr = request.body.edc.ecr;
      const edc_request = {
        invoice_number: invoice_number,
        transaction_type: ecr.substring(0, 2),
        tid: ecr.substring(2, 10),
        mid: ecr.substring(10, 25),
        batch_number: ecr.substring(25, 31),
        issuer_name: ecr.substring(31, 46),
        trace_number: ecr.substring(46, 52),
        entry_mode: ecr.substring(58, 59),
        amount: ecr.substring(59, 71),
        total_amount: ecr.substring(71, 83),
        card_number: ecr.substring(83, 102),
        cardholder_name: ecr.substring(102, 128),
        date: ecr.substring(128, 134),
        time: ecr.substring(134, 140),
        approval_code: ecr.substring(140, 146),
        response_code: ecr.substring(146, 148),
        ref_number: ecr.substring(148, 160),
        billing_number: ecr.substring(160, 176),
        balance: ecr.substring(176, 188),
        top_up_card_number: ecr.substring(188, 207),
        exp_date: ecr.substring(207, 213),
        bank_filler: ecr.substring(213, 301),
        module_name: request.body.edc.module_name,
        sn: request.body.edc.sn,
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
        updated_at: date,
        created_by: request.body.created_by,
        created_at: date,
      };

      const cash_result = await createPaymentCashRepository(cash_request);
      payment_result.rows[0].detail = cash_result.rows[0];
    }

    standardResponse(response, 200, success_RC, SUCCESS, payment_result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString(), []);
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
    const invoice_number = request.params.invoice_number;
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
