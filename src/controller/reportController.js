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
  getCOGSRepository,
  getGrossSalesRepository,
  getItemSalesSummaryRespository,
  getPaymentMethodSummaryRepository,
  getSalesByDateRepository,
  getSalesByMonthRepository,
  getSalesTypeSummaryRepository,
  getServedBySummaryRepository,
  getTotalCategorySalesSummaryRepository,
  getTotalCOGSRepository,
  getTotalItemSalesSummaryRespository,
  getTotalSalesTypeSummaryRepository,
  getTotalServedBySummaryRepository,
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

    let result = null;
    if (request.body.group_by === "YEAR") {
      result = await getSalesByMonthRepository(request_data);
    } else {
      result = await getSalesByDateRepository(request_data);
    }

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
    const total = await getTotalItemSalesSummaryRespository(request_data);

    result.rows = {
      lists: result.rows,
      total: total.rows[0],
    };
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
    const total = await getTotalCategorySalesSummaryRepository(request_data);

    result.rows = {
      lists: result.rows,
      total: total.rows[0],
    };
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
    const total = await getTotalServedBySummaryRepository(request_data);

    result.rows = {
      lists: result.rows,
      total: total.rows[0],
    };
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getSalesTypeSummary = async (request, response) => {
  try {
    const request_data = {
      branch_id: request.body.branch_id || "",
      merchant_id: request.body.merchant_id || "",
      trx_status: request.body.trx_status || "PAID",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
    };

    const result = await getSalesTypeSummaryRepository(request_data);
    const total = await getTotalSalesTypeSummaryRepository(request_data);

    result.rows = {
      lists: result.rows,
      total: total.rows[0],
    };
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};

export const getGrossProfitSummary = async (request, response) => {
  try {
    const request_data = {
      branch_id: request.body.branch_id || "",
      merchant_id: request.body.merchant_id || "",
      trx_status: request.body.trx_status || "PAID",
      start_date: request.body.start_date || "",
      end_date: request.body.end_date + " 23:59:59" || "",
    };

    const result = await getGrossSalesRepository(request_data);
    const get_cogs = await getCOGSRepository(request_data);
    const total_cogs = await getTotalCOGSRepository(request_data);

    await get_cogs.rows.map((value, index) => {
      get_cogs.rows[index] = {
        ...get_cogs.rows[index],
        gross_margin: (
          parseInt(value.selling_price) - parseInt(value.cogs)
        ).toString(),
      };
    });

    total_cogs.rows[0].total_gross_margin = (
      parseInt(result.rows[0].gross_sales) -
      parseInt(total_cogs.rows[0].total_cogs)
    ).toString();
    result.rows[0] = {
      lists: get_cogs.rows,
      total: total_cogs.rows[0],
    };
    standardResponse(response, 200, success_RC, SUCCESS, result);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
