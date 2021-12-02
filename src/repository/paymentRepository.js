import connection from "../configs/postgres.js";
import format from "pg-format";

export const createPaymentRepository = (request) => {
  const query = {
    text: `INSERT INTO lg_payment(invoice_number, payment_method, amount, submit_amount, status, response_code, branch_id, merchant_id, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    values: [
      request.invoice_number,
      request.payment_method,
      request.amount,
      request.submit_amount,
      request.status,
      request.response_code,
      request.branch_id,
      request.merchant_id,
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

export const createPaymentCashRepository = (request) => {
  const query = {
    text: `INSERT INTO lg_payment_cash(invoice_number, amount, submit_amount, change, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    values: [
      request.invoice_number,
      request.amount,
      request.submit_amount,
      request.change,
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

export const createPaymentEdcRepository = (request) => {
  const query = {
    text: `INSERT INTO lg_payment_edc(invoice_number, amount, submit_amount, approval_code, bank_name, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    values: [
      request.invoice_number,
      request.amount,
      request.submit_amount,
      request.approval_code,
      request.bank_name,
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

export const createInvoiceHasTrxId = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      format(
        `INSERT INTO invoice_has_trx(transaction_id, invoice_number, updated_by, updated_at, created_by, created_at) VALUES %L RETURNING *`,
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

export const countPayment = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM (SELECT * FROM lg_payment WHERE branch_id = '${request.branch_id}' AND merchant_id = '${request.merchant_id}' AND payment_method LIKE '%${request.payment_method}%' AND status LIKE '%${request.status}%' AND response_code LIKE '%${request.response_code}%') as payment WHERE invoice_number LIKE '%${request.search}%' OR amount LIKE '%${request.search}%' OR submit_amount LIKE '%${request.search}%'`,
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

export const getPaymentRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM (SELECT lg_payment.*, branch.location as branch_location FROM lg_payment LEFT OUTER JOIN branch ON (CAST(branch.id AS varchar(10)) = lg_payment.branch_id) WHERE branch_id = '${request.branch_id}' AND lg_payment.merchant_id = '${request.merchant_id}' AND payment_method LIKE '%${request.payment_method}%' AND status LIKE '%${request.status}%' AND response_code LIKE '%${request.response_code}%' AND lg_payment.created_at >= '${request.start_date}' AND lg_payment.created_at <= '${request.end_date}' ORDER BY ${request.order_by} ${request.sort_by} LIMIT ${request.limit} OFFSET ${request.start_index}) as payment WHERE invoice_number LIKE '%${request.search}%' OR amount LIKE '%${request.search}%' OR submit_amount LIKE '%${request.search}%'`,
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

export const getDetailPaymentRepository = (invoice_number) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT lg_payment.*, branch.location as branch_location FROM lg_payment LEFT OUTER JOIN branch ON (CAST(branch.id AS varchar(10)) = lg_payment.branch_id) WHERE invoice_number LIKE '%${invoice_number}%'`,
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

export const getDetailCashRepository = (invoice_number) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM lg_payment_cash WHERE invoice_number LIKE '%${invoice_number}%'`,
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

export const getDetailEdcRepository = (invoice_number) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM lg_payment_edc WHERE invoice_number LIKE '%${invoice_number}%'`,
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

export const getInvoiceHasTrx = (invoice_number) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM transaction_header WHERE transaction_id IN (SELECT invoice_has_trx.transaction_id FROM invoice_has_trx WHERE invoice_number LIKE '%${invoice_number}%') ORDER BY created_at DESC`,
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

export const countPaymentByBranchAndDate = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as total_data FROM lg_payment WHERE branch_id LIKE '%${request.branch_id}%' AND created_at >= '${request.start}' AND created_at <= '${request.end}'`,
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
