import connection from "../configs/postgres.js";
import format from "pg-format";

export const createPaymentRepository = (request) => {
  const query = {
    text: `INSERT INTO lg_payment(invoice_number, payment_method, amount, submit_amount, status, response_code, ecr, branch_id, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    values: [
      request.invoice_number,
      request.payment_method,
      request.amount,
      request.submit_amount,
      request.status,
      request.response_code,
      request.ecr,
      request.branch_id,
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
    text: `INSERT INTO lg_payment_edc(invoice_number, transaction_type, tid, mid, batch_number, issuer_name, trace_number, entry_mode, amount, total_amount, card_number, cardholder_name, date, time, approval_code, response_code, ref_number, billing_number,balance, top_up_card_number, exp_date, bank_filler, module_name, sn) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING *`,
    values: [
      request.invoice_number,
      request.transaction_type,
      request.tid,
      request.mid,
      request.batch_number,
      request.issuer_name,
      request.trace_number,
      request.entry_mode,
      request.amount,
      request.total_amount,
      request.card_number,
      request.cardholder_name,
      request.date,
      request.time,
      request.approval_code,
      request.response_code,
      request.ref_number,
      request.billing_number,
      request.balance,
      request.top_up_card_number,
      request.exp_date,
      request.bank_filler,
      request.module_name,
      request.sn,
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
      `SELECT count(*) as total_data FROM (SELECT * FROM lg_payment WHERE branch_id LIKE '%${request.branch_id}%' AND payment_method LIKE '%${request.payment_method}%' AND status LIKE '%${request.status}%' AND response_code LIKE '%${request.response_code}%') as payment WHERE invoice_number LIKE '%${request.search}%' OR amount LIKE '%${request.search}%' OR submit_amount LIKE '%${request.search}%'`,
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

export const getPaymentRepository = (request) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM (SELECT lg_payment.*, branch.name as branch_name FROM lg_payment LEFT OUTER JOIN branch ON (CAST(branch.id AS varchar(10)) = lg_payment.branch_id) WHERE branch_id LIKE '%${request.branch_id}%' AND payment_method LIKE '%${request.payment_method}%' AND status LIKE '%${request.status}%' AND response_code LIKE '%${request.response_code}%' AND lg_payment.created_at >= '${request.start_date}' AND lg_payment.created_at <= '${request.end_date}' ORDER BY ${request.order_by} ${request.sort_by} LIMIT ${request.limit} OFFSET ${request.start_index}) as payment WHERE invoice_number LIKE '%${request.search}%' OR amount LIKE '%${request.search}%' OR submit_amount LIKE '%${request.search}%'`,
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
