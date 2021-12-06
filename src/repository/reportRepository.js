import connection from "../configs/postgres.js";

export const getGrossSalesRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT SUM(CAST(amount AS BIGINT)) AS gross_sales FROM lg_payment WHERE merchant_id = '${request.merchant_id}' AND branch_id LIKE '%${request.branch_id}%' AND status = '${request.trx_status}' AND created_at >= '${request.start_date}' AND created_at <= '${request.end_date}'`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error(error));
        } else {
          resolve(result);
        }
      }
    );
  });
};
