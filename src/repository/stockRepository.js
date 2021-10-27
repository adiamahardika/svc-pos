import connection from "../configs/postgres.js";

export const createStockRespository = (request) => {
  const query = {
    text: `INSERT INTO stock(product_id, branch_id, quantity, updated_by, updated_at, created_by, created_at) VALUE($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    value: [
      request.product_id,
      request.branch_id,
      request.quantity,
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
