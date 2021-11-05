import {
  CANCEL,
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
} from "../repository/paymentRepository.js";

export const createPayment = async (request, response) => {
  try {
    const date = new Date();
    const invoice_number = `INV-${date.getTime()}`;
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
      payment_request.status = CANCEL;
    }
    const payment_result = await createPaymentRepository(payment_request);

    let trx_id_list = [];
    await request.body.transaction_id.map((value) => {
      let array = [
        value,
        invoice_number,
        request.body.created_by,
        date,
        request.body.created_by,
        date,
      ];
      trx_id_list.push(array);
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
