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

export const getItemSalesSummaryRespository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT transaction_detail.product_id, product.name, category.name AS category_name, SUM(CAST(transaction_detail.quantity AS BIGINT)) AS item_sold, SUM(CAST(transaction_detail.quantity AS BIGINT) * CAST(transaction_detail.selling_price AS BIGINT)) AS gross_sales, SUM(CAST(transaction_detail.quantity AS BIGINT) * CAST(transaction_detail.starting_price AS BIGINT)) AS nett_sales FROM transaction_detail LEFT OUTER JOIN transaction_header ON transaction_detail.transaction_id = transaction_header.transaction_id LEFT OUTER JOIN product ON (transaction_detail.product_id = CAST(product.id AS varchar(10))) LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) WHERE transaction_header.merchant_id = '${request.merchant_id}' AND transaction_header.branch_id LIKE '%${request.branch_id}%' AND transaction_header.trx_status = '${request.trx_status}' AND transaction_detail.created_at >= '${request.start_date}' AND transaction_detail.created_at <= '${request.end_date}' GROUP BY transaction_detail.product_id, product.name, category.name`,
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

export const getTotalItemSalesSummaryRespository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT SUM(CAST(transaction_detail.quantity AS BIGINT)) AS item_sold, SUM(CAST(transaction_detail.quantity AS BIGINT) * CAST(transaction_detail.selling_price AS BIGINT)) AS gross_sales, SUM(CAST(transaction_detail.quantity AS BIGINT) * CAST(transaction_detail.starting_price AS BIGINT)) AS nett_sales FROM transaction_detail LEFT OUTER JOIN transaction_header ON transaction_detail.transaction_id = transaction_header.transaction_id LEFT OUTER JOIN product ON (transaction_detail.product_id = CAST(product.id AS varchar(10))) LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) WHERE transaction_header.merchant_id = '${request.merchant_id}' AND transaction_header.branch_id LIKE '%${request.branch_id}%' AND transaction_header.trx_status = '${request.trx_status}' AND transaction_detail.created_at >= '${request.start_date}' AND transaction_detail.created_at <= '${request.end_date}'`,
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

export const getCategorySalesSummaryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT category.id AS category_id, category.name AS category_name, SUM(CAST(transaction_detail.quantity AS BIGINT)) AS item_sold, SUM(CAST(transaction_detail.quantity AS BIGINT) * CAST(transaction_detail.selling_price AS BIGINT)) AS gross_sales, SUM(CAST(transaction_detail.quantity AS BIGINT) * CAST(transaction_detail.starting_price AS BIGINT)) AS nett_sales FROM transaction_detail LEFT OUTER JOIN transaction_header ON transaction_detail.transaction_id = transaction_header.transaction_id LEFT OUTER JOIN product ON (transaction_detail.product_id = CAST(product.id AS varchar(10))) LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) WHERE transaction_header.merchant_id = '${request.merchant_id}' AND transaction_header.branch_id LIKE '%${request.branch_id}%' AND transaction_header.trx_status = '${request.trx_status}' AND transaction_detail.created_at >= '${request.start_date}' AND transaction_detail.created_at <= '${request.end_date}' GROUP BY category.id, category.name`,
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

export const getTotalCategorySalesSummaryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT SUM(CAST(transaction_detail.quantity AS BIGINT)) AS item_sold, SUM(CAST(transaction_detail.quantity AS BIGINT) * CAST(transaction_detail.selling_price AS BIGINT)) AS gross_sales, SUM(CAST(transaction_detail.quantity AS BIGINT) * CAST(transaction_detail.starting_price AS BIGINT)) AS nett_sales FROM transaction_detail LEFT OUTER JOIN transaction_header ON transaction_detail.transaction_id = transaction_header.transaction_id LEFT OUTER JOIN product ON (transaction_detail.product_id = CAST(product.id AS varchar(10))) LEFT OUTER JOIN category ON (product.category_id = CAST(category.id AS varchar(10))) WHERE transaction_header.merchant_id = '${request.merchant_id}' AND transaction_header.branch_id LIKE '%${request.branch_id}%' AND transaction_header.trx_status = '${request.trx_status}' AND transaction_detail.created_at >= '${request.start_date}' AND transaction_detail.created_at <= '${request.end_date}'`,
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

export const getServedBySummaryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT lg_payment.created_by, COUNT(*) as total_transaction, SUM(CAST(amount AS BIGINT)) AS total_collected FROM lg_payment WHERE merchant_id = '${request.merchant_id}' AND branch_id LIKE '%${request.branch_id}%' AND status = '${request.trx_status}' AND created_at >= '${request.start_date}' AND created_at <= '${request.end_date}' GROUP BY created_by`,
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

export const getTotalServedBySummaryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total_transaction, SUM(CAST(amount AS BIGINT)) AS total_collected FROM lg_payment WHERE merchant_id = '${request.merchant_id}' AND branch_id LIKE '%${request.branch_id}%' AND status = '${request.trx_status}' AND created_at >= '${request.start_date}' AND created_at <= '${request.end_date}'`,
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

export const getSalesTypeSummaryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT transaction_header.trx_type, COUNT(*) as total_transaction, SUM(CAST(total_selling_price AS BIGINT)) AS total_collected FROM transaction_header WHERE merchant_id = '${request.merchant_id}' AND branch_id LIKE '%${request.branch_id}%' AND trx_status = '${request.trx_status}' AND created_at >= '${request.start_date}' AND created_at <= '${request.end_date}' GROUP BY trx_type`,
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

export const getTotalSalesTypeSummaryRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total_transaction, SUM(CAST(total_selling_price AS BIGINT)) AS total_collected FROM transaction_header WHERE merchant_id = '${request.merchant_id}' AND branch_id LIKE '%${request.branch_id}%' AND trx_status = '${request.trx_status}' AND created_at >= '${request.start_date}' AND created_at <= '${request.end_date}'`,
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
