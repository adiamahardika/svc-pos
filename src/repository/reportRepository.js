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

export const getPaymentMethodSummaryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT lg_payment.payment_method, COUNT(*) as total_transaction, SUM(CAST(amount AS BIGINT)) AS total_collected FROM lg_payment WHERE merchant_id = '${request.merchant_id}' AND branch_id LIKE '%${request.branch_id}%' AND status = '${request.trx_status}' AND created_at >= '${request.start_date}' AND created_at <= '${request.end_date}' GROUP BY payment_method`,
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

export const getBankNameSummaryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT lg_payment_edc.bank_name, COUNT(*) as total_transaction, SUM(CAST(lg_payment_edc.amount AS BIGINT)) AS total_collected FROM lg_payment_edc LEFT OUTER JOIN lg_payment ON lg_payment_edc.invoice_number = lg_payment.invoice_number WHERE lg_payment.merchant_id = '${request.merchant_id}' AND lg_payment.branch_id LIKE '%${request.branch_id}%' AND lg_payment.status = '${request.trx_status}' AND lg_payment_edc.created_at >= '${request.start_date}' AND lg_payment_edc.created_at <= '${request.end_date}' GROUP BY bank_name `,
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
