import {
  error_RC,
  success_RC,
  SUCCESS,
  UNPAID,
} from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import {
  getBankNameSummaryRepository,
  getCategorySalesSummaryRepository,
  getGrossSalesRepository,
  getItemSalesSummaryRespository,
  getPaymentMethodSummaryRepository,
  getServedBySummaryRepository,
} from "../repository/reportRepository.js";

export const getSalesSummary = async (request, response) => {
  try {
    const request_data = {
      branch_id: request.body.branch_id || "",
      merchant_id: request.body.merchant_id || "",
      trx_status: request.body.trx_status || "PAID",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
    };

    const result = await getGrossSalesRepository(request_data);

    result.rows[0] = {
      ...result.rows[0],
      discounts: "0",
      net_sales: result.rows[0].gross_sales,
      tax: "0",
      total_collect: result.rows[0].gross_sales,
    };
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getPaymentMethodSummary = async (request, response) => {
  try {
    const request_data = {
      branch_id: request.body.branch_id || "",
      merchant_id: request.body.merchant_id || "",
      trx_status: request.body.trx_status || "PAID",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
    };
    const e_wallet = [
      {
        name: "Ovo",
        total_transaction: "0",
        total_collected: "0",
      },
      {
        name: "Go-Pay",
        total_transaction: "0",
        total_collected: "0",
      },
      {
        name: "Dana",
        total_transaction: "0",
        total_collected: "0",
      },
      {
        name: "Shopee-Pay",
        total_transaction: "0",
        total_collected: "0",
      },
    ];

    const result = await getPaymentMethodSummaryRepository(request_data);
    const bank_summary = await getBankNameSummaryRepository(request_data);

    result.rows = {
      payment_method: result.rows,
      e_wallet: e_wallet,
      edc: bank_summary.rows,
    };

    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getItemSalesSummary = async (request, response) => {
  try {
    const request_data = {
      branch_id: request.body.branch_id || "",
      merchant_id: request.body.merchant_id || "",
      trx_status: request.body.trx_status || "PAID",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
    };

    const result = await getItemSalesSummaryRespository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getCategorySalesSummary = async (request, response) => {
  try {
    const request_data = {
      branch_id: request.body.branch_id || "",
      merchant_id: request.body.merchant_id || "",
      trx_status: request.body.trx_status || "PAID",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
    };

    const result = await getCategorySalesSummaryRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getServedBySummary = async (request, response) => {
  try {
    const request_data = {
      branch_id: request.body.branch_id || "",
      merchant_id: request.body.merchant_id || "",
      trx_status: request.body.trx_status || "PAID",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
    };

    const result = await getServedBySummaryRepository(request_data);
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
