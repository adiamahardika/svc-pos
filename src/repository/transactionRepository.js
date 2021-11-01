import connection from "../configs/postgres.js";
import format from "pg-format";

export const createTransactionHeaderRepository = (request) => {
  const query = {
    text: `INSERT INTO transaction_header(transaction_id, trx_status, branch_id, customer_name, total_quantity, updated_by, updated_at, created_by, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    values: [
      request.transaction_id,
      request.trx_status,
      request.branch_id,
      request.customer_name,
      request.total_quantity,
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
  //   const query = {
  //     text: `INSERT INTO transaction_header(transaction_id, product_id, quantity, updated_by, updated_at, created_by, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
  //     value: [
  //       request.transaction_id,
  //       request.product_id,
  //       request.quantity,
  //       request.updated_by,
  //       request.updated_at,
  //       request.created_by,
  //       request.created_by,
  //     ],
  //   };

  return new Promise((resolve, reject) => {
    connection.query(
      format(
        `INSERT INTO transaction_detail(transaction_id, product_id, quantity, updated_by, updated_at, created_by, created_at) VALUES %L RETURNING *`,
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
