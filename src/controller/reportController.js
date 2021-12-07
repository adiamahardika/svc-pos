import {
  error_RC,
  success_RC,
  SUCCESS,
  UNPAID,
} from "../helpers/generalConstant.js";
import { standardResponse } from "../helpers/standardResponse.js";
import { getGrossSalesRepository } from "../repository/reportRepository.js";

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
