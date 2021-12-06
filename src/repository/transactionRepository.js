import connection from "../configs/postgres.js";
import format from "pg-format";

export const createTransactionHeaderRepository = (request) => {
  const query = {
    text: `INSERT INTO transaction_header(transaction_id, trx_status, branch_id, merchant_id, customer_name, total_quantity, total_price, trx_type, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    values: [
      request.transaction_id,
      request.trx_status,
      request.branch_id,
      request.merchant_id,
      request.customer_name,
      request.total_quantity,
      request.total_price,
      request.trx_type,
      request.updated_by,
      request.updated_at,
      request.created_by,
      request.created_at,
    ],
  };
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.log(error);
        reject(new Error(error));
      } else {
        resolve(result);
      }
    });
  });
};

export const createTransactionDetailRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      format(
        `INSERT INTO transaction_detail(transaction_id, product_id, quantity, price, updated_by, updated_at, created_by, created_at) VALUES %L RETURNING *`,
        request
      ),
      [],
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

export const updateTransactionStatusRepository = (request, id) => {
  const query = {
    text: `UPDATE transaction_header SET trx_status = $1, updated_by = $2, updated_at = $3 WHERE transaction_id = $4 RETURNING transaction_header.*`,
    values: [request.trx_status, request.updated_by, request.updated_at, id],
  };
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.log(error);
        reject(new Error(error));
      } else {
        resolve(result);
      }
    });
  });
};

export const countTransaction = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM (SELECT * FROM transaction_header WHERE branch_id LIKE '%${request.branch_id}%' AND merchant_id LIKE '%${request.merchant_id}%' AND trx_type LIKE '%${request.trx_type}%' AND trx_status LIKE '%${request.trx_status}%' AND created_at >= '${request.start_date}' AND created_at <= '${request.end_date}') as trx WHERE trx.transaction_id LIKE '%${request.search}%' OR trx.customer_name LIKE '%${request.search}%'`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error(error));
        } else {
          resolve(result.rows[0].total_data);
        }
      }
    );
  });
};

export const getTransactionHeaderRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM (SELECT transaction_header.*, branch.location as branch_location FROM transaction_header LEFT OUTER JOIN branch ON (CAST(branch.id AS varchar(10)) = transaction_header.branch_id) WHERE transaction_header.branch_id LIKE '%${request.branch_id}%' AND transaction_header.merchant_id LIKE '%${request.merchant_id}%' AND trx_type LIKE '%${request.trx_type}%' AND trx_status LIKE '${request.trx_status}%' AND transaction_header.created_at >= '${request.start_date}' AND transaction_header.created_at <= '${request.end_date}' ORDER BY ${request.order_by} ${request.sort_by} LIMIT ${request.limit} OFFSET ${request.start_index}) as trx WHERE trx.transaction_id LIKE '%${request.search}%' OR trx.customer_name LIKE '%${request.search}%'`,
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

export const getDetailTransactionHeaderRepository = (transaction_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM transaction_header WHERE transaction_id LIKE '%${transaction_id}%'`,
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

export const getDetailTransactionDetailRepository = (transaction_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT transaction_detail.*, product.name as product_name, product.image as product_image FROM transaction_detail LEFT OUTER JOIN product ON (CAST(product.id AS varchar(10)) = transaction_detail.product_id) WHERE transaction_id LIKE '%${transaction_id}%'`,
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

export const getTrxHasInvoice = (transaction_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM lg_payment WHERE invoice_number IN (SELECT invoice_has_trx.invoice_number FROM invoice_has_trx WHERE transaction_id LIKE '%${transaction_id}%') ORDER BY created_at DESC`,
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

export const updateTransactionHeaderRepository = (request, transaction_id) => {
  const query = {
    text: `UPDATE transaction_header SET total_quantity = $1, total_price = $2, updated_by = $3, updated_at = $4 WHERE transaction_id = $5 RETURNING transaction_header.*`,
    values: [
      request.total_quantity,
      request.total_price,
      request.updated_by,
      request.updated_at,
      transaction_id,
    ],
  };
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.log(error);
        reject(new Error(error));
      } else {
        resolve(result);
      }
    });
  });
};

export const deleteTransactionDetailRepository = (transaction_id) => {
  const query = {
    text: `DELETE FROM transaction_detail WHERE transaction_id = $1`,
    values: [transaction_id],
  };
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) reject(new Error(error), console.log(error));
      resolve(result);
    });
  });
};

export const countTransactionByBranchAndDate = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM transaction_header WHERE transaction_header.branch_id LIKE '%${request.branch_id}%' AND transaction_header.created_at >= '${request.start}' AND transaction_header.created_at <= '${request.end}'`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error(error));
        } else {
          resolve(result.rows[0].total_data);
        }
      }
    );
  });
};
